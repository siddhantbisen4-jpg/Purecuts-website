"use client";

import React, { useEffect, useRef } from "react";
import { Mic, MicOff, X, RotateCcw, Sparkles, Volume2, AlertCircle } from "lucide-react";

export type VoiceSearchStatus = "idle" | "listening" | "processing" | "error";

interface VoiceSearchModalProps {
  isOpen: boolean;
  status: VoiceSearchStatus;
  transcript: string;
  errorMessage?: string;
  onClose: () => void;
  onRestart: () => void;
  onSelectQuery: (query: string) => void;
}

const VOICE_HINTS = [
  "Wahl Clipper",
  "Matrix Masque",
  "Ikonic Straightener",
  "Dr. Rashel Gel",
  "L'Oréal Majirel",
  "Neck Strips",
];

export function VoiceSearchModal({
  isOpen,
  status,
  transcript,
  errorMessage,
  onClose,
  onRestart,
  onSelectQuery,
}: VoiceSearchModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Play a gentle salon chime when the modal opens in listening mode
  useEffect(() => {
    if (isOpen && status === "listening") {
      try {
        const AudioContextClass =
          window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const now = ctx.currentTime;

          // PureCuts Chime: Harmonious soft tones
          const osc1 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          osc1.type = "sine";
          osc1.frequency.setValueAtTime(523.25, now);
          gain1.gain.setValueAtTime(0.06, now);
          gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          osc1.connect(gain1);
          gain1.connect(ctx.destination);
          osc1.start(now);
          osc1.stop(now + 0.12);

          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(659.25, now + 0.08);
          gain2.gain.setValueAtTime(0.07, now + 0.08);
          gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start(now + 0.08);
          osc2.stop(now + 0.22);
        }
      } catch {
        // Silently ignore if audio context is blocked by autoplay policy
      }
    }
  }, [isOpen, status]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-search-title"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#795BCB]/20 p-6 sm:p-8 relative overflow-hidden text-center animate-in zoom-in-95 duration-200"
      >
        {/* PureCuts Signature Gradient Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6246B0] via-[#795BCB] to-amber-400" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-6 pt-1">
          {/* PureCuts Brand Pill Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#795BCB]/10 border border-[#795BCB]/25">
            <Sparkles className="w-3.5 h-3.5 text-[#795BCB]" />
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#6246B0] animate-purecuts-dot-1" />
              <span className="w-2 h-2 rounded-full bg-[#795BCB] animate-purecuts-dot-2" />
              <span className="w-2 h-2 rounded-full bg-[#9370DB] animate-purecuts-dot-3" />
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-purecuts-dot-4" />
            </div>
            <span className="text-[11px] font-extrabold tracking-wide uppercase text-[#795BCB]">
              PureCuts Voice Search
            </span>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close voice search"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-[#795BCB] hover:bg-[#795BCB]/10 active:scale-95 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Title & Subtext */}
        <div className="mb-6">
          {status === "listening" && (
            <>
              <h2
                id="voice-search-title"
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-1.5"
              >
                Listening
                <span className="inline-flex gap-1 text-[#795BCB]">
                  <span className="animate-purecuts-dot-1">.</span>
                  <span className="animate-purecuts-dot-2">.</span>
                  <span className="animate-purecuts-dot-3">.</span>
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Speak any salon product, brand, or equipment
              </p>
            </>
          )}

          {status === "processing" && (
            <>
              <h2
                id="voice-search-title"
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-1.5"
              >
                Searching
                <span className="inline-flex gap-1 text-[#795BCB]">
                  <span className="animate-purecuts-dot-1">.</span>
                  <span className="animate-purecuts-dot-2">.</span>
                  <span className="animate-purecuts-dot-3">.</span>
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Matching products in PureCuts catalog
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <h2
                id="voice-search-title"
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-2"
              >
                Didn&apos;t catch that
              </h2>
              <p className="text-xs sm:text-sm text-[#795BCB] mt-1 font-semibold flex items-center justify-center gap-1.5 px-4">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                {errorMessage || "Tap the microphone below to try speaking again"}
              </p>
            </>
          )}

          {status === "idle" && (
            <>
              <h2
                id="voice-search-title"
                className="text-2xl sm:text-3xl font-extrabold text-slate-900"
              >
                Voice Search Ready
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Tap the microphone to speak
              </p>
            </>
          )}
        </div>

        {/* =========================================================================
            PURECUTS THEME MIC INDICATOR WITH SOUND WAVE EQUALIZER & RIPPLE
           ========================================================================= */}
        <div className="relative py-4 flex flex-col items-center justify-center min-h-[170px]">
          {/* Animated concentric sound wave ripples in PureCuts Purples */}
          {status === "listening" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#795BCB]/45 bg-[#795BCB]/15 animate-purecuts-ripple-1" />
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#9370DB]/35 bg-[#9370DB]/10 animate-purecuts-ripple-2" />
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#B794F4]/25 bg-[#B794F4]/5 animate-purecuts-ripple-3" />
            </div>
          )}

          {/* Central Interactive Mic Button */}
          <button
            type="button"
            onClick={onRestart}
            aria-label={status === "listening" ? "Stop listening" : "Start voice search"}
            title={status === "listening" ? "Click to stop listening" : "Click to speak"}
            className={`relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
              status === "listening"
                ? "bg-gradient-to-tr from-[#6246B0] via-[#795BCB] to-[#9370DB] text-white shadow-2xl shadow-[#795BCB]/50 ring-8 ring-[#795BCB]/20 hover:ring-[#795BCB]/30 hover:scale-105 active:scale-95"
                : status === "processing"
                ? "bg-[#795BCB] text-white shadow-lg shadow-[#795BCB]/40 ring-8 ring-[#795BCB]/15 animate-pulse"
                : "bg-slate-100 text-slate-700 hover:bg-[#795BCB]/10 hover:text-[#795BCB] border-2 border-slate-200 ring-4 ring-slate-100 hover:scale-105 active:scale-95"
            }`}
          >
            {status === "listening" ? (
              <Mic className="w-9 h-9 sm:w-11 sm:h-11 animate-pulse text-white drop-shadow-md" />
            ) : status === "processing" ? (
              <Volume2 className="w-9 h-9 sm:w-11 sm:h-11 animate-bounce text-white drop-shadow-md" />
            ) : status === "error" ? (
              <RotateCcw className="w-8 h-8 sm:w-10 sm:h-10 text-[#795BCB]" />
            ) : (
              <MicOff className="w-8 h-8 sm:w-10 sm:h-10 text-slate-500" />
            )}
          </button>

          {/* PureCuts Sound Wave Equalizer in Purple & Amber Palette */}
          <div className="mt-6 flex items-center justify-center gap-2 h-10">
            {status === "listening" ? (
              <>
                <span className="w-1.5 rounded-full bg-[#6246B0] animate-purecuts-wave-1" />
                <span className="w-1.5 rounded-full bg-[#795BCB] animate-purecuts-wave-2" />
                <span className="w-1.5 rounded-full bg-[#9370DB] animate-purecuts-wave-3" />
                <span className="w-1.5 rounded-full bg-[#B794F4] animate-purecuts-wave-4" />
                <span className="w-1.5 rounded-full bg-amber-400 animate-purecuts-wave-5" />
              </>
            ) : (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#795BCB]/30" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#795BCB]/30" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#795BCB]/30" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#795BCB]/30" />
              </div>
            )}
          </div>
        </div>

        {/* Live Spoken Transcript Display in PureCuts Theme */}
        <div className="mt-2 min-h-[58px] flex items-center justify-center px-4 py-3 rounded-2xl bg-[#795BCB]/5 border border-[#795BCB]/15">
          {transcript ? (
            <p className="text-base sm:text-lg font-bold text-slate-900 break-words line-clamp-2">
              <span className="text-[#795BCB] mr-1">&ldquo;</span>
              {transcript}
              <span className="text-[#795BCB] ml-1">&rdquo;</span>
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-slate-500 font-medium italic">
              {status === "listening"
                ? "Listening for salon products, brands, or equipment..."
                : status === "error"
                ? "Microphone is idle. Tap mic above to try again."
                : "Say a product name like 'Wahl Clipper' or 'Matrix Masque'"}
            </p>
          )}
        </div>

        {/* Quick Suggestion Chips in PureCuts Theme */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-left">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#795BCB] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#795BCB]" />
            Try saying or tap to search:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {VOICE_HINTS.map((hint) => (
              <button
                key={hint}
                type="button"
                onClick={() => onSelectQuery(hint)}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white hover:bg-[#795BCB] text-slate-700 hover:text-white border border-[#795BCB]/25 hover:border-[#795BCB] shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>

        {/* Helpful mic permission note if error occurs */}
        {status === "error" && errorMessage?.toLowerCase().includes("block") && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900">
            <strong className="block font-bold mb-0.5 text-amber-800">How to allow microphone:</strong>
            Click the lock/settings icon next to the URL in your browser address bar and switch
            <strong> Microphone</strong> to <strong>Allow</strong>, then refresh.
          </div>
        )}
      </div>
    </div>
  );
}
