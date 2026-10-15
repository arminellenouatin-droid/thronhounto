import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
  variant?: "light" | "dark" | "gold";
}

export const ThreeColasLogo: React.FC<LogoProps> = ({
  className = "",
  size = 48,
  showText = false,
  textColor = "text-white",
  variant = "gold",
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 drop-shadow-md transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Gradients pour les trois colas sacrées */}
          <linearGradient id="colaGold1" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FCE7A6" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6715" />
          </linearGradient>
          <linearGradient id="colaGold2" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#F5D061" />
            <stop offset="50%" stopColor="#C59B27" />
            <stop offset="100%" stopColor="#7B5B10" />
          </linearGradient>
          <linearGradient id="colaGold3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFEAA7" />
            <stop offset="60%" stopColor="#E2B739" />
            <stop offset="100%" stopColor="#967219" />
          </linearGradient>
          <radialGradient id="sacredHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#0A2558" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#050F26" stopOpacity="0" />
          </radialGradient>
          <filter id="sacredGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Cercle d'aura sacrée */}
        <circle cx="50" cy="50" r="46" fill="url(#sacredHalo)" />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeDasharray="2 3"
          strokeOpacity="0.6"
        />

        {/* --- COLA SUPÉRIEURE (Sommet) --- */}
        <g transform="translate(0, -2)">
          <path
            d="M50 18 C38 18 34 32 38 44 C42 54 50 56 50 56 C50 56 58 54 62 44 C66 32 62 18 50 18 Z"
            fill="url(#colaGold1)"
            stroke="#59400B"
            strokeWidth="1.2"
          />
          {/* Fissure / Lobe naturel de la cola */}
          <path
            d="M50 20 C49 30 51 40 50 54"
            stroke="#664606"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Reflet de brillance */}
          <path
            d="M44 24 C41 30 42 38 44 44"
            stroke="#FFF5D6"
            strokeWidth="1"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
        </g>

        {/* --- COLA INFÉRIEURE GAUCHE --- */}
        <g transform="rotate(-120 50 50) translate(0, -2)">
          <path
            d="M50 18 C38 18 34 32 38 44 C42 54 50 56 50 56 C50 56 58 54 62 44 C66 32 62 18 50 18 Z"
            fill="url(#colaGold2)"
            stroke="#59400B"
            strokeWidth="1.2"
          />
          <path
            d="M50 20 C49 30 51 40 50 54"
            stroke="#664606"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M44 24 C41 30 42 38 44 44"
            stroke="#FFF5D6"
            strokeWidth="1"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
        </g>

        {/* --- COLA INFÉRIEURE DROITE --- */}
        <g transform="rotate(120 50 50) translate(0, -2)">
          <path
            d="M50 18 C38 18 34 32 38 44 C42 54 50 56 50 56 C50 56 58 54 62 44 C66 32 62 18 50 18 Z"
            fill="url(#colaGold3)"
            stroke="#59400B"
            strokeWidth="1.2"
          />
          <path
            d="M50 20 C49 30 51 40 50 54"
            stroke="#664606"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M44 24 C41 30 42 38 44 44"
            stroke="#FFF5D6"
            strokeWidth="1"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
        </g>

        {/* Cœur central d'alliance sacrée */}
        <circle cx="50" cy="50" r="4.5" fill="#FCE7A6" stroke="#8A6715" strokeWidth="1" />
        <circle cx="50" cy="50" r="1.8" fill="#59400B" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif tracking-wider font-bold uppercase leading-tight ${textColor} text-base sm:text-lg`}>
            THRON HOUNTO
          </span>
          <span className="text-[10px] sm:text-xs text-thron-gold tracking-widest uppercase font-medium">
            Communauté Mondiale
          </span>
        </div>
      )}
    </div>
  );
};
