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
          navy: "#050F26",
          blue: "#0A2558",
          blueLight: "#1E40AF",
          azure: "#2563EB",
          sky: "#38BDF8",
          gold: "#D4AF37",
          goldLight: "#F5E9C9",
          goldDark: "#9A7B1C",
          cream: "#F8FAFC",
          paper: "#FFFFFF",
          dark: "#0F172A",
          muted: "#64748B",
          border: "#E2E8F0",
          accent: "#D97706",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        sacred: "0 10px 30px -5px rgba(10, 37, 88, 0.15)",
        gold: "0 8px 25px -4px rgba(212, 175, 55, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
