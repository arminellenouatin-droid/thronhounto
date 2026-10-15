"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Coins,
  CreditCard,
  HeartHandshake,
  Wallet,
  BookOpen,
  GitFork,
  Users,
  BarChart3,
  Flame,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Radio,
  ArrowLeft,
} from "lucide-react";
import { WalletAndSubscriptions } from "./WalletAndSubscriptions";
import { Marketplace } from "./Marketplace";
import { TontinesAndCotisations } from "./TontinesAndCotisations";
import { AgendaAndCeremonies } from "./AgendaAndCeremonies";
import { BibliothequeAndZindo } from "./BibliothequeAndZindo";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { LivesAgora } from "./LivesAgora";

interface ToolsHubProps {
  onNavigateToTree?: () => void;
  onNavigateToTogoun?: () => void;
  walletBalance?: number;
  onBalanceUpdate?: (newBal: number) => void;
}

export const ToolsHub: React.FC<ToolsHubProps> = ({
  onNavigateToTree,
  onNavigateToTogoun,
  walletBalance = 45000,
  onBalanceUpdate,
}) => {
  // Vue active dans les outils (null = menu principal de la boîte à outils)
  const [activeToolView, setActiveToolView] = useState<string | null>(null);

  const tools = [
    {
      id: "wallet",
      title: "Portefeuille & Abonnements (Lot 2)",
      desc: "Solde FCFA, recharges Kkiapay, grand livre immuable et formules de lignée (Assiata)",
      icon: Wallet,
      color: "from-amber-600 to-yellow-700",
      badge: `${walletBalance.toLocaleString("fr-FR")} F CFA`,
    },
    {
      id: "marketplace",
      title: "Marketplace Spirituelle (Lot 6)",
      desc: "Produits et services sacrés certifiés de la communauté Thron (Vendeurs Hounnon+)",
      icon: ShoppingBag,
      color: "from-amber-500 to-amber-700",
      badge: "8% comm.",
    },
    {
      id: "tontines",
      title: "Tontines & Cotisations (Lot 5)",
      desc: "Épargne solidaire, tontines de temples et cotisations avec prélèvement automatique",
      icon: Coins,
      color: "from-emerald-500 to-teal-700",
      badge: "Séquestre",
    },
    {
      id: "lives",
      title: "Lives Agora & Formations (Lot 7)",
      desc: "Diffusions audio et vidéo en direct style TikTok pour les comptes abonnés",
      icon: Radio,
      color: "from-rose-600 to-red-700",
      badge: "En direct",
    },
    {
      id: "agenda",
      title: "Agenda, Yesoufifo & Rituels (Lot 8)",
      desc: "Calendrier cultuel officiel : Atinkindoudou (baptêmes), Yesoufifo et programmes",
      icon: BookOpen,
      color: "from-purple-600 to-violet-800",
      badge: "Calendrier",
    },
    {
      id: "bibliotheque",
      title: "Bibliothèque Sacrée & Zindo (Lot 8)",
      desc: "Documents et cantiques d'enseignements exclusifs (Formules Togoundaho & Assiata)",
      icon: Sparkles,
      color: "from-sky-600 to-blue-800",
      badge: "Assiata",
    },
    {
      id: "analytics",
      title: "Analytics & Audience (Lot 8)",
      desc: "Tableaux de bord des membres de l'arbre, cotisations, finances et audience",
      icon: BarChart3,
      color: "from-indigo-600 to-slate-800",
      badge: "Lignée",
    },
  ];

  // Si un sous-outil est ouvert, on affiche la vue dédiée
  if (activeToolView) {
    return (
      <div className="space-y-4">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => setActiveToolView(null)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à la Boîte à Outils
          </button>
        </div>

        {activeToolView === "wallet" && (
          <WalletAndSubscriptions
            initialBalance={walletBalance}
            onBalanceUpdate={onBalanceUpdate}
          />
        )}
        {activeToolView === "marketplace" && <Marketplace />}
        {activeToolView === "tontines" && <TontinesAndCotisations />}
        {activeToolView === "lives" && <LivesAgora onClose={() => setActiveToolView(null)} />}
        {activeToolView === "agenda" && (
          <AgendaAndCeremonies onJoinLive={() => setActiveToolView("lives")} />
        )}
        {activeToolView === "bibliotheque" && <BibliothequeAndZindo />}
        {activeToolView === "analytics" && <AnalyticsDashboard />}
      </div>
    );
  }

  // MENU GÉNÉRAL DE LA BOÎTE À OUTILS
  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* EN-TÊTE DE LA BOÎTE À OUTILS */}
      <div className="bg-gradient-to-r from-thron-navy via-thron-blue to-thron-navy rounded-3xl p-5 sm:p-6 text-white shadow-sacred border border-thron-gold/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-thron-gold uppercase">
              Boîte à Outils Complète • Section 8.14
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1">
              Modules & Commandes de la Lignée
            </h2>
            <p className="text-xs text-blue-200 mt-1 max-w-md">
              Tous les lots intégrés : Wallet, Marketplace, Tontines, Lives Agora, Cérémonies et Bibliothèque.
            </p>
          </div>

          {/* CARTE WALLET RAPIDE */}
          <div
            onClick={() => setActiveToolView("wallet")}
            className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-thron-gold/40 flex items-center gap-3 cursor-pointer transition-all"
            title="Cliquez pour gérer votre Wallet"
          >
            <div className="w-10 h-10 rounded-full bg-thron-gold text-thron-navy flex items-center justify-center font-bold">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-blue-200 uppercase tracking-wider block">Solde Wallet</span>
              <span className="font-serif text-lg font-bold text-amber-200">
                {walletBalance.toLocaleString("fr-FR")} F CFA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* GRILLE DES OUTILS INTERACTIFS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {tools.map((t) => {
          const Icon = t.icon;

          return (
            <div
              key={t.id}
              onClick={() => setActiveToolView(t.id)}
              className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm hover:shadow-md hover:border-thron-gold/50 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {t.badge}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-sm text-thron-navy group-hover:text-thron-blue transition-colors">
                  {t.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-thron-blue">
                <span>Ouvrir l'outil</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
