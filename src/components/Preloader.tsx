"use client";

import React, { useEffect, useState } from "react";
import { ThreeColasLogo } from "./ThreeColasLogo";

interface PreloaderProps {
  onFinish?: () => void;
  minDurationMs?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({
  onFinish,
  minDurationMs = 1400,
}) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, 500);
    }, minDurationMs);

    return () => clearTimeout(timer);
  }, [minDurationMs, onFinish]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#050F26] via-[#0A2558] to-[#040D24] text-white transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center animate-fade-in">
        {/* Halo radiant */}
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-thron-gold/20 blur-xl animate-pulse"></div>
          <ThreeColasLogo size={110} />
        </div>

        <div className="flex flex-col items-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-thron-gold to-yellow-500 uppercase">
            THRON HOUNTO
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-blue-200 tracking-widest uppercase font-light">
            Communauté Mondiale de Thron
          </p>
        </div>

        {/* Barre de progression sacrée */}
        <div className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-gradient-to-r from-amber-400 via-thron-gold to-yellow-200 rounded-full animate-indeterminate"></div>
        </div>

        <p className="text-[11px] text-blue-300/70 tracking-wide font-sans">
          Union sacrée des Courants, Lignées & Temples
        </p>
      </div>
    </div>
  );
};
