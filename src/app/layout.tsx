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
  openGraph: {
    title: "THRON HOUNTO — Plateforme Spirituelle & Communauté Mondiale",
    description: "Rejoignez la communauté Thron, découvrez les 3 Courants Sacrés, consultez les Hounnons et participez aux tontines et cérémonies.",
    url: "https://thronhounto.bj",
    siteName: "THRON HOUNTO",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "THRON HOUNTO — Alliance Sacrée des Trônes",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THRON HOUNTO — Plateforme Spirituelle Mondiale",
    description: "Plateforme communautaire Thron : Réseau Togoun, Vidéos Tognon, Marketplace Thronhi et Lignées ancestrales.",
    images: ["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=630&fit=crop&q=80"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
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
      <body className="antialiased min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-600/20 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
