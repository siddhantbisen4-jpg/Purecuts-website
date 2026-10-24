"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";
import { UserProfile } from "@/lib/types";

interface AuthContextType {
  firebaseUser: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isSalonOwner: boolean;
  salonRegion: "pune" | "outside-pune";
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  registerWithEmail: (email: string, pass: string, profileData: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  saveSalonProfile: (profileData: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setDemoUser: (profile: UserProfile | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "purecuts_auth_profile";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load cached profile on startup and listen for custom events
  const loadProfile = () => {
    try {
      const cached =
        localStorage.getItem(LOCAL_STORAGE_KEY) ||
        localStorage.getItem("purecuts_user");
      if (cached) {
        const parsed = JSON.parse(cached);
        const isPune =
          parsed.region === "pune" ||
          parsed.pincode?.startsWith("411") ||
          (parsed.city && parsed.city.toLowerCase().includes("pune"));

        const mapped: UserProfile = {
          uid: parsed.uid || parsed.id || "local-user",
          name: parsed.name,
          phone: parsed.phone,
          email: parsed.email,
          accountType:
            parsed.accountType === "salon_owner"
              ? "salon_owner"
              : "local_customer",
          salonDetails: {
            salonName: parsed.salonName || parsed.salonDetails?.salonName,
            gstin:
              parsed.gstNumber ||
              parsed.gstin ||
              parsed.salonDetails?.gstin,
            udyamNumber:
              parsed.udyamNumber || parsed.salonDetails?.udyamNumber,
            address:
              parsed.address ||
              parsed.addressLine ||
              parsed.salonDetails?.address,
            city: parsed.city || parsed.salonDetails?.city,
            state: parsed.state || parsed.salonDetails?.state,
            pincode: parsed.pincode || parsed.salonDetails?.pincode,
            region: parsed.region || (isPune ? "pune" : "outside-pune"),
            isVerified: true,
          },
        };
        setProfile(mapped);
      }
    } catch {}
  };

  useEffect(() => {
    loadProfile();
    const handleAuthChange = () => loadProfile();
    window.addEventListener("purecuts-auth-change", handleAuthChange);
    window.addEventListener("purecuts-auth-changed", handleAuthChange);
    return () => {
      window.removeEventListener("purecuts-auth-change", handleAuthChange);
      window.removeEventListener("purecuts-auth-changed", handleAuthChange);
    };
  }, []);

  // Sync profile to localStorage for persistence
  const updateProfileLocally = (newProfile: UserProfile | null) => {
    setProfile(newProfile);
    try {
      if (newProfile) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProfile));
        localStorage.setItem("purecuts_user", JSON.stringify(newProfile));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        localStorage.removeItem("purecuts_user");
      }
      window.dispatchEvent(new Event("purecuts-auth-change"));
    } catch {}
  };

  // Listen to Firebase Auth state
  useEffect(() => {
    if (!auth || !isFirebaseConfigured) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user && db) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data() as UserProfile;
            updateProfileLocally(data);
          } else {
            // New user without firestore doc yet
            const basicProfile: UserProfile = {
              uid: user.uid,
              email: user.email || undefined,
              phone: user.phoneNumber || undefined,
              accountType: "local_customer",
            };
            updateProfileLocally(basicProfile);
          }
        } catch (err) {
          console.error("Error fetching Firestore user profile:", err);
        }
      } else if (!user) {
        // If logged out from Firebase
        if (isFirebaseConfigured) {
          updateProfileLocally(null);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login with Email
  const loginWithEmail = async (email: string, pass: string) => {
    if (!auth || !isFirebaseConfigured) {
      return { success: false, error: "Firebase is not configured yet. Please set .env.local keys." };
    }
    try {
      setIsLoading(true);
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      if (db) {
        const docSnap = await getDoc(doc(db, "users", cred.user.uid));
        if (docSnap.exists()) {
          updateProfileLocally(docSnap.data() as UserProfile);
        }
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to sign in." };
    } finally {
      setIsLoading(false);
    }
  };

  // Register with Email
  const registerWithEmail = async (
    email: string,
    pass: string,
    profileData: Partial<UserProfile>
  ) => {
    if (!auth || !isFirebaseConfigured) {
      return { success: false, error: "Firebase is not configured yet. Please set .env.local keys." };
    }
    try {
      setIsLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      const newProfile: UserProfile = {
        uid: cred.user.uid,
        email,
        name: profileData.name || "",
        phone: profileData.phone || "",
        accountType: profileData.accountType || "local_customer",
        salonDetails: profileData.salonDetails,
        createdAt: new Date().toISOString(),
      };

      if (db) {
        await setDoc(doc(db, "users", cred.user.uid), newProfile);
      }
      updateProfileLocally(newProfile);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Registration failed." };
    } finally {
      setIsLoading(false);
    }
  };

  // Save / Update Salon Profile
  const saveSalonProfile = async (profileData: Partial<UserProfile>) => {
    try {
      const merged: UserProfile = {
        ...(profile || { uid: "demo-user", accountType: "salon_owner" }),
        ...profileData,
      };

      if (profile?.uid && db && isFirebaseConfigured) {
        await updateDoc(doc(db, "users", profile.uid), profileData as any);
      }
      updateProfileLocally(merged);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to save profile." };
    }
  };

  // Logout
  const logout = async () => {
    try {
      if (auth && isFirebaseConfigured) {
        await signOut(auth);
      }
      updateProfileLocally(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const isSalonOwner = profile?.accountType === "salon_owner";
  const salonRegion = profile?.salonDetails?.region || "pune";

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        profile,
        isLoading,
        isSalonOwner,
        salonRegion,
        loginWithEmail,
        registerWithEmail,
        saveSalonProfile,
        logout,
        setDemoUser: updateProfileLocally,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
