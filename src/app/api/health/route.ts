import { isDbConnected } from "@/db";
import { isFirebaseConfigured } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    ok: true,
    status: "healthy",
    firebase: isFirebaseConfigured ? "connected" : "offline",
    postgres: isDbConnected ? "connected" : "offline",
    timestamp: new Date().toISOString(),
  });
}

