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
  CheckCircle2,
} from "lucide-react";

interface ToolsHubProps {
  onNavigateToTree?: () => void;
  onNavigateToTogoun?: () => void;
  walletBalance?: number;
}

export const ToolsHub: React.FC<ToolsHubProps> = ({
  onNavigateToTree,
  onNavigateToTogoun,
  walletBalance = 45000,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const tools = [
    {
      id: "marketplace",
      title: "Marketplace Spirituelle",
      desc: "Produits et services sacrés certifiés de la communauté Thron (Vendeurs Hounnon+)",
      icon: ShoppingBag,
      color: "from-amber-500 to-amber-700",
      badge: "8% comm.",
    },
    {
      id: "tontines",
      title: "Tontines Communautaires",
      desc: "Épargne solidaire et tontines de temples et lignées (Grade Hounnon/Hounonsi+)",
      icon: Coins,
      color: "from-emerald-500 to-teal-700",
      badge: "Séquestre",
    },
    {
      id: "cotisations",
      title: "Cotisations & Hounto",
      desc: "Suivi des cotisations dues, rappels et paiement automatique depuis le Wallet",
      icon: CreditCard,
      color: "from-blue-600 to-indigo-800",
      badge: "Automatique",
    },
    {
      id: "dons",
      title: "Dons & Offrandes",
      desc: "Soutien aux temples, aux rituels et aux lignées ancestrales",
      icon: HeartHandshake,
      color: "from-rose-500 to-pink-700",
      badge: "Direct",
    },
    {
      id: "wallet",
      title: "Mon Portefeuille (Wallet)",
      desc: "Solde en F CFA, approvisionnement Kkiapay, retraits et historique comptable",
      icon: Wallet,
      color: "from-amber-600 to-yellow-700",
      badge: `${walletBalance.toLocaleString("fr-FR")} F CFA`,
    },
    {
      id: "agenda",
      title: "Agenda & Cérémonies",
      desc: "Programmes d activités, Atinkindoudou (baptêmes), Yesoufifo et rituels",
      icon: BookOpen,
      color: "from-purple-600 to-violet-800",
      badge: "Calendrier",
    },
    {
      id: "bibliotheque",
      title: "Bibliothèque Sacrée",
      desc: "Documents et audios d enseignements réservés aux formules Assiata",
      icon: BookOpen,
      color: "from-sky-600 to-blue-800",
      badge: "Assiata",
    },
    {
      id: "zindo",
      title: "Zindo Sacré",
      desc: "Fonctionnalité sacrée exclusive des formules Togoundaho et Assiata",
      icon: Sparkles,
      color: "from-yellow-500 to-amber-600",
      badge: "Togoundaho+",
    },
    {
      id: "analytics",
      title: "Statistiques & Audience",
      desc: "Tableaux de bord des membres, cotisations, finances et audience",
      icon: BarChart3,
      color: "from-indigo-600 to-slate-800",
      badge: "Lignée",
    },
    {
      id: "publicite",
      title: "Boost & Publicité",
      desc: "Booster un produit ou une publication (100 F pour 1 000 personnes / jour)",
      icon: Flame,
      color: "from-orange-500 to-red-600",
      badge: "100 F / 1000 p.",
    },
  ];

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
              Commandes & Services de la Lignée
            </h2>
            <p className="text-xs text-blue-200 mt-1 max-w-md">
              Gérez les finances, la marketplace, les tontines, les cérémonies et la solidarité communautaire.
            </p>
          </div>

          {/* CARTE WALLET RAPIDE */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-thron-gold/40 flex items-center gap-3">
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

      {/* GRILLE DES OUTILS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {tools.map((t) => {
          const Icon = t.icon;

          return (
            <div
              key={t.id}
              onClick={() => setActiveModal(t.id)}
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
                <span>Ouvrir l outil</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL DE PRÉSENTATION DÉTAILLÉE DE L'OUTIL SÉLECTIONNÉ */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-thron-gold/40 animate-in fade-in zoom-in-95 duration-200 text-center">
            <h4 className="font-serif font-bold text-lg text-thron-navy">
              {tools.find((t) => t.id === activeModal)?.title}
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {tools.find((t) => t.id === activeModal)?.desc}
            </p>

            <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-700 text-left space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-thron-navy">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Règles de sécurité et monétisation (Section 8)</span>
              </div>
              <p className="text-[11px] text-slate-600">
                • Commission plateforme : 8% sur les montants totaux.
                <br />
                • Gestion centralisée dans le grand livre à double entrée du Wallet.
                <br />
                • Agrégateur de paiement Kkiapay & MTN Mobile Money activé.
              </p>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full py-2.5 bg-thron-navy hover:bg-thron-blue text-white rounded-xl text-xs font-bold transition-colors"
            >
              Fermer la vue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
