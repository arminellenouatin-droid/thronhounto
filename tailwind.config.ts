import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        thron: {
          // CHARTE STRICTE : BLEU, BLANC, NOIR, GRIS CLAIR
          navy: "#0A1628",          // Bleu nuit souverain
          blue: "#1E40AF",          // Bleu royal profond
          blueLight: "#2563EB",     // Bleu cobalt vibrant
          azure: "#3B82F6",         // Bleu azur éclatant
          sky: "#60A5FA",           // Bleu ciel subtil
          ice: "#EFF6FF",           // Bleu givré très doux
          
          // Mappage de neutralisation de l'or vers le bleu souverain & blanc
          gold: "#2563EB",          // Remplacé par Bleu Cobalt
          goldLight: "#EFF6FF",     // Remplacé par Bleu givré clair
          goldDark: "#1E40AF",      // Remplacé par Bleu royal
          accent: "#2563EB",        // Accent d'action primaire

          // BLANC & NOIR PURS
          white: "#FFFFFF",
          paper: "#FFFFFF",
          black: "#090A0F",
          dark: "#090A0F",
          pureBlack: "#000000",

          // GRIS CLAIR NUANCÉS
          cream: "#F8FAFC",         // Fond général doux
          slateBg: "#F8FAFC",
          surface: "#F1F5F9",       // Surfaces secondaires et champs
          border: "#E2E8F0",        // Liseré 1px fin
          borderLight: "#F1F5F9",
          muted: "#64748B",         // Gris neutre pour labels et sous-textes
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        sacred: "0 10px 30px -5px rgba(10, 22, 40, 0.08)",
        gold: "0 8px 25px -4px rgba(37, 99, 235, 0.20)",
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px -2px rgba(10, 22, 40, 0.05)",
        glowBlue: "0 0 20px rgba(37, 99, 235, 0.35)",
      },
      transitionTimingFunction: {
        "out-custom": "cubic-bezier(0.23, 1, 0.32, 1)",
        "spring": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
};

export default config;
