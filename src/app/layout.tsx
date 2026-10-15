import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THRON HOUNTO — Communauté Mondiale de Thron",
  description: "Plateforme SaaS dédiée aux Courants, Lignées et Temples de la communauté Thron. Arbre généalogique spirituel, Togoun, Tognon, Atinsa, Marketplace et Tontines.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A2558",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-slate-50 selection:bg-thron-gold/30 selection:text-thron-navy">
        {children}
      </body>
    </html>
  );
}
