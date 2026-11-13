"use client";

import React, { useState } from "react";
import {
  Sparkles,
  GitFork,
  Users,
  PlaySquare,
  MessageCircle,
  ShoppingBag,
  Coins,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Download,
  Globe,
  Heart,
  ChevronDown,
} from "lucide-react";
import { ThreeColasLogo } from "./ThreeColasLogo";
import { COURANTS_OFFICIELS, SUBSCRIPTION_PLANS, LIGNEE_MANTINKPON_O } from "@/lib/data";

interface LandingPageProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenRegister,
  onOpenLogin,
  onEnterApp,
}) => {
  const [billingPeriod, setBillingPeriod] = useState<"mois" | "an">("mois");
  const [selectedCourant, setSelectedCourant] = useState(COURANTS_OFFICIELS[0]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* ============================================================== */}
      {/* 1. EN-TÊTE DE LA LANDING PAGE                                   */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-[#0A1628]/95 backdrop-blur-md text-white shadow-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <ThreeColasLogo size={42} showText={true} />

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide">
            <a href="#courants" className="hover:text-blue-400 transition-colors">
              Les 3 Courants
            </a>
            <a href="#arbre" className="hover:text-blue-400 transition-colors">
              Arbre Généalogique
            </a>
            <a href="#modules" className="hover:text-blue-400 transition-colors">
              Modules & Réseau
            </a>
            <a href="#tarifs" className="hover:text-blue-400 transition-colors">
              Abonnements
            </a>
            <a href="#lignee" className="hover:text-blue-400 transition-colors">
              Lignée Mantinkpon ò
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white/90 hover:text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all btn-press"
            >
              Se connecter
            </button>
            <button
              onClick={onOpenRegister}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 btn-press"
            >
              S'inscrire <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. SECTION HÉROS : UNION DES COURANTS & LIGNÉES THRON          */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1628] via-[#0F1E36] to-[#0A1628] text-white pt-20 pb-28 px-4 sm:px-6 text-center">
        {/* Lueur diffuse d'énergie sacrée */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Plateforme Officielle SaaS de la Communauté Thron</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            L'Alliance Sacrée des{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
              Courants, Lignées & Temples
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Découvrez THRON HOUNTO : l'arbre généalogique spirituel tactile, le réseau social
            Togoun, le fil vidéo Tognon, la messagerie Atinsa, les tontines, cotisations et la
            marketplace réservée aux dignitaires initiés.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 btn-press"
            >
              Rejoindre mon Hounto <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2 btn-press"
            >
              Consulter l'Arbre Démo
            </button>
          </div>

          {/* Statistiques clés */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10">
            <div className="p-3">
              <span className="block text-2xl sm:text-3xl font-extrabold text-blue-400">3</span>
              <span className="text-xs text-slate-400">Courants Sacrés</span>
            </div>
            <div className="p-3">
              <span className="block text-2xl sm:text-3xl font-extrabold text-blue-400">100k+</span>
              <span className="text-xs text-slate-400">Capacité Cible</span>
            </div>
            <div className="p-3">
              <span className="block text-2xl sm:text-3xl font-extrabold text-blue-400">11</span>
              <span className="text-xs text-slate-400">Grades Initiatiques</span>
            </div>
            <div className="p-3">
              <span className="block text-2xl sm:text-3xl font-extrabold text-blue-400">8%</span>
              <span className="text-xs text-slate-400">Commission Fixe</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. LES 3 COURANTS CONFIRMÉS (Section 3.1)                      */}
      {/* ============================================================== */}
      <section id="courants" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Hiérarchie Suprême • Section 3.1
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0A1628] mt-1.5 tracking-tight">
            Les Trois Courants Sacrés de Thron
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Définis par l'application, ils constituent le sommet de la structure spirituelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURANTS_OFFICIELS.map((c) => (
            <div
              key={c.id}
              className={`rounded-3xl p-7 border transition-all ${
                c.id === "alafia"
                  ? "bg-gradient-to-b from-blue-50/70 via-white to-white border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/20"
                  : "bg-white border-slate-200/90 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0A1628] text-white flex items-center justify-center font-bold text-xl mb-5 shadow-sm">
                {c.nom.charAt(6).toUpperCase()}
              </div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Courant Officiel
              </span>
              <h3 className="font-bold text-lg text-[#0A1628] mb-2">
                {c.nom}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {c.description}
              </p>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Lignées actives</span>
                <strong className="text-[#0A1628]">{c.ligneesCount} lignées</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. LA LIGNÉE DE RÉFÉRENCE : MANTINKPON Ò (Section 3.3)         */}
      {/* ============================================================== */}
      <section id="lignee" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                Lignée de Référence Test • Section 3.3
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0A1628] leading-tight tracking-tight">
                Lignée Mantinkpon ò
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                Positionnée au plan le plus élevé de l'application sous le courant{" "}
                <strong className="text-[#0A1628]">Thron kpéto déka alafia</strong>.
                Fondée par le vénérable ancêtre{" "}
                <strong className="text-[#0A1628]">
                  Feu Mantinkpon ò Adjikanmahoutokounon MONSIA
                </strong>
                , la lignée est aujourd'hui coiffée par{" "}
                <strong className="text-[#0A1628]">
                  Togbé Mintoniu bo tozé (MONISA Serge)
                </strong>
                , Togbegan daho.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Arbre tracé vers le haut jusqu'au fondateur et vers le bas vers les Hounvi</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Validation stricte des affiliations par le Maître spirituel</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Formule Assiata active avec communauté de 1 450 membres</span>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={onEnterApp}
                  className="px-6 py-3 rounded-xl bg-[#0A1628] hover:bg-blue-900 text-white text-xs font-bold transition-all flex items-center gap-2 btn-press shadow-md"
                >
                  Explorer l'Arbre de Mantinkpon ò <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-tr from-[#0A1628] via-[#0F1E36] to-[#1E40AF] p-6 text-white shadow-xl border border-white/10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full border-2 border-blue-400 overflow-hidden shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
                      alt="Togbé Mintoniu"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-400 uppercase tracking-wider font-bold">
                      Chef Actuel Suprême
                    </span>
                    <h4 className="font-bold text-base">
                      Togbé Mintoniu bo tozé
                    </h4>
                    <span className="text-xs text-slate-300">MONISA Serge • Togbegan daho</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Courant :</span>
                    <span className="font-bold text-blue-200">Thron kpeto deka alafia</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Fondateur ancestral :</span>
                    <span className="font-bold">Feu Mantinkpon ò MONSIA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Compteurs sacrés :</span>
                    <span className="font-bold text-blue-300">7 Assi • 18 Vidjidji • 350 Hounvi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. FORMULES D'ABONNEMENT CONFIRMÉES (Section 9.1)              */}
      {/* Togounkpevi (5 000 F), Togoundaho (10 000 F), Assiata (20 000 F) */}
      {/* ============================================================== */}
      <section id="tarifs" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Monétisation Officielle • Section 9.1
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0A1628] mt-1.5 tracking-tight">
            Abonnements pour les Lignées
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Chaque compte de lignée est souscrit par son Maître selon le grade et le nombre de fidèles.
          </p>

          {/* Toggle Mensuel / Annuel */}
          <div className="mt-6 inline-flex items-center p-1 bg-slate-200 rounded-full text-xs font-bold">
            <button
              onClick={() => setBillingPeriod("mois")}
              className={`px-4 py-1.5 rounded-full transition-all btn-press ${
                billingPeriod === "mois" ? "bg-[#0A1628] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Par Mois
            </button>
            <button
              onClick={() => setBillingPeriod("an")}
              className={`px-4 py-1.5 rounded-full transition-all btn-press ${
                billingPeriod === "an" ? "bg-[#0A1628] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Par An (12 mois)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const price = billingPeriod === "mois" ? plan.prixMoisFCFA : plan.prixAnFCFA;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all ${
                  plan.isPopular
                    ? "bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 scale-102 ring-1 ring-blue-600/20"
                    : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                    Recommandé Grande Communauté
                  </span>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="font-bold text-xl text-[#0A1628]">
                      {plan.nom}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {plan.signification}
                    </p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <span className="text-3xl sm:text-4xl font-black text-[#0A1628]">
                      {price.toLocaleString("fr-FR")}
                    </span>
                    <span className="text-xs text-slate-500 ml-1.5">
                      F CFA / {billingPeriod === "mois" ? "mois" : "an"}
                    </span>
                    <div className="mt-2 text-[11px] font-semibold text-blue-600">
                      Capacité : {plan.membresMax}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Grade requis : <strong>{plan.gradeRequis}</strong>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs text-slate-600">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenRegister}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all btn-press ${
                    plan.isPopular
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  Souscrire cette formule
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. PIED DE PAGE RÉGLEMENTAIRE (Section 10.4 & 14)               */}
      {/* ============================================================== */}
      <footer className="bg-[#0A1628] text-white pt-14 pb-10 border-t border-white/10 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-xs">
            <div className="space-y-3">
              <ThreeColasLogo size={36} showText={true} />
              <p className="text-slate-400 leading-relaxed text-[11px]">
                SaaS communautaire souverain pour les Courants, Lignées et Temples de Thron.
                Arbre spirituel, réseau social Togoun, vidéos Tognon et messagerie Atinsa.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3.5 text-xs">
                Fonctionnalités
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li>Arbre généalogique tactile</li>
                <li>Réseau social Togoun</li>
                <li>Fil vidéo Tognon</li>
                <li>Messagerie Atinsa</li>
                <li>Marketplace spirituelle (8%)</li>
                <li>Tontines & Cotisations</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3.5 text-xs">
                Protection des données (Bénin)
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Conforme au Code du Numérique de la République du Bénin et aux dispositions de l'APDP.
                Consentement obligatoire pour l'affiliation et la géolocalisation des hountos.
              </p>
              <div className="mt-3 text-[10px] text-blue-300 font-medium">
                Paiements sécurisés par Kkiapay & MTN Mobile Money
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3.5 text-xs">
                Application Installable
              </h4>
              <p className="text-slate-300 text-[11px] mb-3">
                Installez THRON HOUNTO en Progressive Web App (PWA) sur votre mobile ou ordinateur.
              </p>
              <button
                onClick={onOpenRegister}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold text-xs flex items-center gap-2 transition-all btn-press shadow-md"
              >
                <Download className="w-4 h-4" /> Installer l'App
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
            <span>© 2026 THRON HOUNTO. Tous droits sacrés réservés.</span>
            <div className="flex gap-5">
              <span className="hover:text-white cursor-pointer transition-colors">Conditions d'Utilisation</span>
              <span className="hover:text-white cursor-pointer transition-colors">Politique de Confidentialité</span>
              <span className="hover:text-white cursor-pointer transition-colors">Mentions Légales</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
