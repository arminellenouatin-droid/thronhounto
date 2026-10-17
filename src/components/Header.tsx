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
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-thron-navy via-thron-blue to-thron-navy text-white shadow-sacred border-b border-thron-gold/30">
      {/* LIGNE PRINCIPALE DE L'EN-TÊTE CONFORME AU CAHIER DES CHARGES */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* GAUCHE : LOGO ET LIGNES DE TITRE OFFICIELLES */}
          <div className="flex items-center gap-3 min-w-0">
            <ThreeColasLogo size={42} />
            <div className="flex flex-col min-w-0">
              {/* Ligne 1 : Le nom de la lignée */}
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm sm:text-base md:text-lg text-white truncate tracking-wide">
                  {currentLigneeName}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] bg-thron-gold/20 text-thron-gold font-medium rounded-full border border-thron-gold/40">
                  Courant Alafia
                </span>
              </div>

              {/* Ligne 2 : Titre SaaS + Communauté mondiale */}
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-blue-200">
                <span className="font-bold tracking-wider text-thron-gold uppercase">
                  THRON HOUNTO
                </span>
                <span className="text-blue-300/60">•</span>
                <span className="truncate text-blue-200/90 font-light">
                  communauté mondiale de thron
                </span>
              </div>
            </div>
          </div>

          {/* CENTRE (DESKTOP) : RECHERCHE GLOBALE */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
              <input
                type="text"
                placeholder="Rechercher personnes, temples, lignées, cérémonies..."
                className="w-full bg-white/10 text-white placeholder-blue-300/60 pl-9 pr-4 py-1.5 rounded-full text-xs border border-white/15 focus:outline-none focus:border-thron-gold transition-colors"
              />
            </div>
          </div>

          {/* DROITE : DRAPEAU & LANGUE + WALLET (DESKTOP) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Solde Wallet rapide visible sur toutes les pages avec bouton œil pour masquer/afficher */}
            <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500/20 to-thron-gold/20 border border-thron-gold/40 rounded-full px-2.5 py-1 text-xs font-medium text-thron-gold">
              <button
                type="button"
                onClick={() => setHideBalance(!hideBalance)}
                className="p-0.5 text-amber-200 hover:text-white transition-colors"
                title={hideBalance ? "Afficher le solde" : "Masquer le solde"}
                aria-label={hideBalance ? "Afficher le solde" : "Masquer le solde"}
              >
                {hideBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={onOpenWallet}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                title="Accéder à mon compte Wallet"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span className="font-bold tracking-tight text-[11px] sm:text-xs">
                  {hideBalance ? "•••••• F" : `${walletBalance.toLocaleString("fr-FR")} F CFA`}
                </span>
              </button>
            </div>

            {/* Sélecteur de Drapeau & Langue */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-xs border border-white/20 transition-colors"
                aria-label="Changer de langue"
              >
                <span className="text-sm">🇧🇯</span>
                <span className="font-semibold text-[11px] text-amber-200">{activeLanguage}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-thron-navy border border-thron-gold/40 rounded-lg shadow-xl py-1 z-50 text-xs animate-in fade-in duration-200">
                  <div className="px-3 py-1 text-[10px] text-thron-muted border-b border-white/10 font-medium uppercase">
                    Langues officielles
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        if (onLanguageChange) onLanguageChange(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-thron-blue/60 transition-colors ${
                        activeLanguage === l.code ? "text-thron-gold font-bold bg-white/5" : "text-white"
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

        {/* LIGNE DES 6 ICÔNES OBLIGATOIRES SELON LE CAHIER DES CHARGES */}
        {/* Ligne d'icônes : Message, Favoris, Notification, Panier, Analytics, Profil */}
        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-around sm:justify-end sm:gap-5">
          {/* 1. Message */}
          <button
            onClick={onOpenMessenger}
            className="relative p-2 rounded-full hover:bg-white/10 text-blue-200 hover:text-white transition-colors"
            title="Messages Atinsa"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            <span className="sr-only">Messages</span>
          </button>

          {/* 2. Favoris */}
          <button
            className="p-2 rounded-full hover:bg-white/10 text-blue-200 hover:text-white transition-colors"
            title="Favoris sacrés"
          >
            <Bookmark className="w-5 h-5" />
            <span className="sr-only">Favoris</span>
          </button>

          {/* 3. Notification */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full hover:bg-white/10 text-blue-200 hover:text-white transition-colors"
            title="Notifications du temple"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
            <span className="sr-only">Notifications</span>
          </button>

          {/* 4. Panier */}
          <button
            className="relative p-2 rounded-full hover:bg-white/10 text-blue-200 hover:text-white transition-colors"
            title="Panier Marketplace spirituelle"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="sr-only">Panier</span>
          </button>

          {/* 5. Analytics */}
          <button
            className="p-2 rounded-full hover:bg-white/10 text-blue-200 hover:text-white transition-colors"
            title="Statistiques & Audience de la lignée"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="sr-only">Analytics</span>
          </button>

          {/* 6. Profil */}
          <button
            onClick={onOpenProfile}
            className="p-1 rounded-full border border-thron-gold/50 hover:border-thron-gold transition-colors"
            title="Mon Profil & Grade"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-thron-blue to-amber-600 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
              <User className="w-4 h-4" />
            </div>
            <span className="sr-only">Profil</span>
          </button>
        </div>
      </div>
    </header>
  );
};
