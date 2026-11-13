"use client";

import React, { useEffect, useState } from "react";
import { ThreeColasLogo } from "./ThreeColasLogo";

interface PreloaderProps {
  onFinish?: () => void;
  minDurationMs?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({
  onFinish,
  minDurationMs = 1200,
}) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, 400);
    }, minDurationMs);

    return () => clearTimeout(timer);
  }, [minDurationMs, onFinish]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090A0F] text-white transition-opacity duration-400 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center animate-fade-in">
        {/* Halo radiant bleu cobalt */}
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-blue-600/20 blur-2xl animate-pulse"></div>
          <ThreeColasLogo size={100} textColor="text-white" />
        </div>

        <div className="flex flex-col items-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-widest text-white uppercase drop-shadow-md">
            THRON HOUNTO
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-blue-400 tracking-widest uppercase font-semibold">
            Communauté Mondiale de Thron
          </p>
        </div>

        {/* Barre de progression épurée bleue & blanche */}
        <div className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-gradient-to-r from-blue-700 via-blue-500 to-white rounded-full animate-indeterminate"></div>
        </div>

        <p className="text-[11px] text-slate-400 tracking-wide font-sans">
          Union souveraine des Courants, Lignées & Temples
        </p>
      </div>
    </div>
  );
};
