"use client";

import React, { useState } from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
  variant?: "light" | "dark" | "blue";
}

export const ThreeColasLogo: React.FC<LogoProps> = ({
  className = "",
  size = 48,
  showText = false,
  textColor = "text-thron-navy",
  variant = "blue",
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Rotation 3D subtile max 15 deg
    setRotate({ x: -(y / (rect.height / 2)) * 12, y: (x / (rect.width / 2)) * 12 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
      className={`inline-flex items-center gap-3 select-none cursor-pointer group ${className}`}
    >
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.06 : 1})`,
          transition: isHovered
            ? "transform 80ms ease-out"
            : "transform 400ms cubic-bezier(0.23, 1, 0.32, 1)",
          transformStyle: "preserve-3d",
        }}
        className="relative flex-shrink-0"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <defs>
            {/* Gradients souverains : Bleu Cobalt, Bleu Royal et Noir Profond */}
            <linearGradient id="colaBlue1" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#0A1628" />
            </linearGradient>
            <linearGradient id="colaBlue2" x1="0%" y1="20%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="60%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#090A0F" />
            </linearGradient>
            <linearGradient id="colaBlue3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#0A1628" />
            </linearGradient>

            {/* Aura bleutée délicate */}
            <radialGradient id="sacredAuraBlue" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
              <stop offset="65%" stopColor="#1E40AF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0A1628" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Halo circulaire d'harmonie */}
          <circle cx="50" cy="50" r="46" fill="url(#sacredAuraBlue)" />
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="#2563EB"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            strokeOpacity="0.5"
          />

          {/* --- COLA SUPÉRIEURE (Sommet) --- */}
          <g transform="translate(0, -2)">
            <path
              d="M50 18 C38 18 34 32 38 44 C42 54 50 56 50 56 C50 56 58 54 62 44 C66 32 62 18 50 18 Z"
              fill="url(#colaBlue1)"
              stroke="#0A1628"
              strokeWidth="1.2"
            />
            {/* Lobe central */}
            <path
              d="M50 20 C49 30 51 40 50 54"
              stroke="#090A0F"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Reflet de brillance blanc pur */}
            <path
              d="M44 24 C41 30 42 38 44 44"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.8"
            />
          </g>

          {/* --- COLA INFÉRIEURE GAUCHE --- */}
          <g transform="rotate(-120 50 50) translate(0, -2)">
            <path
              d="M50 18 C38 18 34 32 38 44 C42 54 50 56 50 56 C50 56 58 54 62 44 C66 32 62 18 50 18 Z"
              fill="url(#colaBlue2)"
              stroke="#0A1628"
              strokeWidth="1.2"
            />
            <path
              d="M50 20 C49 30 51 40 50 54"
              stroke="#090A0F"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M44 24 C41 30 42 38 44 44"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.8"
            />
          </g>

          {/* --- COLA INFÉRIEURE DROITE --- */}
          <g transform="rotate(120 50 50) translate(0, -2)">
            <path
              d="M50 18 C38 18 34 32 38 44 C42 54 50 56 50 56 C50 56 58 54 62 44 C66 32 62 18 50 18 Z"
              fill="url(#colaBlue3)"
              stroke="#0A1628"
              strokeWidth="1.2"
            />
            <path
              d="M50 20 C49 30 51 40 50 54"
              stroke="#090A0F"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M44 24 C41 30 42 38 44 44"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.8"
            />
          </g>

          {/* Point central d'alliance sacrée : Blanc Pur et Bleu Cobalt */}
          <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="2" fill="#0A1628" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-serif tracking-wider font-extrabold uppercase leading-tight ${textColor} text-base sm:text-lg`}
          >
            THRON HOUNTO
          </span>
          <span className="text-[10px] sm:text-xs text-blue-600 font-semibold tracking-wider">
            SaaS Communautaire & Spirituel
          </span>
        </div>
      )}
    </div>
  );
};
