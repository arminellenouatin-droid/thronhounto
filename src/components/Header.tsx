"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Bookmark,
  Bell,
  ShoppingCart,
  BarChart3,
  User,
  Globe,
  Wallet,
  Search,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";
import { ThreeColasLogo } from "./ThreeColasLogo";

interface HeaderProps {
  currentLigneeName?: string;
  onOpenMessenger?: () => void;
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
  onOpenWallet?: () => void;
  activeLanguage?: string;
  onLanguageChange?: (lang: string) => void;
  walletBalance?: number;
  unreadCount?: number;
  userPhoto?: string;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentLigneeName = "Lignée Mantinkpon ò",
  onOpenMessenger,
  onOpenNotifications,
  onOpenProfile,
  onOpenWallet,
  activeLanguage = "FR",
  onLanguageChange,
  walletBalance = 45000,
  unreadCount = 3,
  userPhoto,
  userName,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);

  const languages = [
    { code: "FR", label: "Français", flag: "🇧🇯" },
    { code: "FON", label: "Fɔ̀ngbè", flag: "🇧🇯" },
    { code: "YOR", label: "Yorùbá", flag: "🇧🇯" },
    { code: "GUN", label: "Gùngbè", flag: "🇧🇯" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A1628]/95 backdrop-blur-xl text-white shadow-card border-b border-slate-800/80">
      {/* LIGNE PRINCIPALE DE L'EN-TÊTE SOUVERAINE BLEU / BLANC / NOIR */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* GAUCHE : LOGO 3D ET LIGNES DE TITRE OFFICIELLES */}
          <div className="flex items-center gap-3 min-w-0">
            <ThreeColasLogo size={40} textColor="text-white" />
            <div className="flex flex-col min-w-0">
              {/* Ligne 1 : Le nom de la lignée */}
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm sm:text-base md:text-lg text-white truncate tracking-wide">
                  {currentLigneeName}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] bg-blue-500/20 text-blue-300 font-semibold rounded-full border border-blue-400/30">
                  Courant Alafia
                </span>
              </div>

              {/* Ligne 2 : Titre SaaS + Communauté mondiale */}
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-300">
                <span className="font-extrabold tracking-wider text-blue-400 uppercase">
                  THRON HOUNTO
                </span>
                <span className="text-slate-500">•</span>
                <span className="truncate text-slate-300/90 font-light">
                  communauté mondiale de thron
                </span>
              </div>
            </div>
          </div>

          {/* CENTRE (DESKTOP) : RECHERCHE GLOBALE */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher personnes, temples, lignées, cérémonies..."
                className="w-full bg-white/10 text-white placeholder-slate-400 pl-9 pr-4 py-1.5 rounded-full text-xs border border-white/15 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all"
              />
            </div>
          </div>

          {/* DROITE : DRAPEAU & LANGUE + WALLET (DESKTOP) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Solde Wallet rapide épuré (Bleu Nuit / Blanc / Gris) */}
            <div className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-3 py-1 text-xs font-medium text-white transition-all shadow-sm">
              <button
                type="button"
                onClick={() => setHideBalance(!hideBalance)}
                className="p-0.5 text-blue-300 hover:text-white transition-colors btn-press"
                title={hideBalance ? "Afficher le solde" : "Masquer le solde"}
                aria-label={hideBalance ? "Afficher le solde" : "Masquer le solde"}
              >
                {hideBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={onOpenWallet}
                className="flex items-center gap-1.5 text-white hover:text-blue-300 transition-colors cursor-pointer btn-press"
                title="Accéder à mon compte Wallet"
              >
                <Wallet className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-mono font-bold tracking-tight text-[11px] sm:text-xs">
                  {hideBalance ? "•••••• F" : `${walletBalance.toLocaleString("fr-FR")} F CFA`}
                </span>
              </button>
            </div>

            {/* Sélecteur de Drapeau & Langue */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs border border-white/20 transition-all btn-press"
                aria-label="Changer de langue"
              >
                <span className="text-sm">🇧🇯</span>
                <span className="font-semibold text-[11px] text-blue-200">{activeLanguage}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#090A0F] border border-slate-700 rounded-xl shadow-2xl py-1 z-50 text-xs animate-fade-in">
                  <div className="px-3 py-1.5 text-[10px] text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider">
                    Langues officielles
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        if (onLanguageChange) onLanguageChange(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-blue-600/20 transition-colors ${
                        activeLanguage === l.code ? "text-blue-400 font-bold bg-blue-600/10" : "text-slate-200"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LIGNE DES 6 ICÔNES OFFICIELLES (DESIGN HARMONISÉ SANS OR) */}
        <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-around sm:justify-end sm:gap-5">
          {/* 1. Message Atinsa */}
          <button
            onClick={onOpenMessenger}
            className="relative p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors btn-press"
            title="Messages Atinsa"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-[#0A1628]">
                {unreadCount}
              </span>
            )}
            <span className="sr-only">Messages</span>
          </button>

          {/* 2. Favoris */}
          <button
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors btn-press"
            title="Favoris sacrés"
          >
            <Bookmark className="w-5 h-5" />
            <span className="sr-only">Favoris</span>
          </button>

          {/* 3. Notification */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors btn-press"
            title="Notifications du temple"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="sr-only">Notifications</span>
          </button>

          {/* 4. Panier */}
          <button
            className="relative p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors btn-press"
            title="Panier Marketplace spirituelle"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="sr-only">Panier</span>
          </button>

          {/* 5. Analytics */}
          <button
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors btn-press"
            title="Statistiques & Audience de la lignée"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="sr-only">Analytics</span>
          </button>

          {/* 6. Profil */}
          <button
            onClick={onOpenProfile}
            className="p-0.5 rounded-full border-2 border-blue-500/80 hover:border-blue-400 transition-all shadow-md cursor-pointer group btn-press ring-2 ring-blue-500/20"
            title="Mon Profil & Espace de Gestion"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-700 flex items-center justify-center text-white text-xs font-bold">
              {userPhoto ? (
                <img
                  src={userPhoto}
                  alt={userName || "Profil"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            <span className="sr-only">Profil</span>
          </button>
        </div>
      </div>
    </header>
  );
};
