"use client";

import React from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Wallet,
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export const AnalyticsDashboard: React.FC<{ ligneeName?: string }> = ({
  ligneeName = "Lignée Mantinkpon ò",
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* BANNIÈRE ANALYTICS */}
      <div className="bg-gradient-to-r from-thron-navy via-thron-blue to-thron-navy rounded-3xl p-5 sm:p-6 text-white shadow-sacred border border-thron-gold/40">
        <span className="text-[10px] font-bold tracking-widest text-thron-gold uppercase">
          Tableaux de Bord & Audience • Section 8.13
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1">
          Statistiques de la {ligneeName}
        </h2>
        <p className="text-xs text-blue-200 mt-1 max-w-md">
          Suivi de l'accroissement des disciples, des cotisations de temple et des performances d'audience.
        </p>
      </div>

      {/* CARTES D'INDICATEURS CLÉS (KPIs) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Disciples</span>
            <Users className="w-4 h-4 text-thron-blue" />
          </div>
          <span className="font-serif text-2xl font-black text-thron-navy">1 450</span>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +14% ce mois
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Hounvi</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <span className="font-serif text-2xl font-black text-thron-navy">350</span>
          <span className="text-[10px] text-slate-500 block mt-1">Baptisés dans l'arbre</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Cotisations Encaissées</span>
            <Wallet className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="font-serif text-2xl font-black text-thron-navy">1 240 000 F</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">Taux de recouvrement : 92%</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Ventes Marketplace</span>
            <ShoppingBag className="w-4 h-4 text-purple-600" />
          </div>
          <span className="font-serif text-2xl font-black text-thron-navy">474 000 F</span>
          <span className="text-[10px] text-amber-700 font-bold block mt-1">Commission retenue : 37 920 F</span>
        </div>
      </div>

      {/* RÉPARTITION DÉMOGRAPHIQUE DE L'ARBRE GÉNÉALOGIQUE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-thron-navy">
            Structure des Membres de la Lignée
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Enfants Spirituels (Hounvi)</span>
                <span>350 (62%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-thron-blue rounded-full w-[62%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Enfants Biologiques (Vidjidji)</span>
                <span>120 (21%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[21%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Femmes & Épouses (Assi & Hounonsi)</span>
                <span>95 (17%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full w-[17%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-thron-navy">
            Temples Rattachés & Hountos
          </h3>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3 rounded-2xl bg-slate-50 flex items-center justify-between">
              <div>
                <strong className="block text-thron-navy">Temple Principal Alafia (Ouidah)</strong>
                <span className="text-[11px] text-slate-400">Siège suprême ancestral</span>
              </div>
              <span className="font-bold text-thron-blue">820 adeptes</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 flex items-center justify-between">
              <div>
                <strong className="block text-thron-navy">Temple Zogbé (Abomey-Calavi)</strong>
                <span className="text-[11px] text-slate-400">Dirigé par Hounnon Ayikodji</span>
              </div>
              <span className="font-bold text-thron-blue">480 adeptes</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 flex items-center justify-between">
              <div>
                <strong className="block text-thron-navy">Temple Sacla (Porto-Novo)</strong>
                <span className="text-[11px] text-slate-400">En cours de consécration</span>
              </div>
              <span className="font-bold text-thron-blue">150 adeptes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
