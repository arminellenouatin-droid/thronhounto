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
      <header className="sticky top-0 z-40 bg-gradient-to-r from-thron-navy via-thron-blue to-thron-navy text-white shadow-sacred border-b border-thron-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <ThreeColasLogo size={42} showText={true} />

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide">
            <a href="#courants" className="hover:text-thron-gold transition-colors">
              Les 3 Courants
            </a>
            <a href="#arbre" className="hover:text-thron-gold transition-colors">
              Arbre Généalogique
            </a>
            <a href="#modules" className="hover:text-thron-gold transition-colors">
              Modules & Réseau
            </a>
            <a href="#tarifs" className="hover:text-thron-gold transition-colors">
              Abonnements
            </a>
            <a href="#lignee" className="hover:text-thron-gold transition-colors">
              Lignée Mantinkpon ò
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white hover:text-amber-200 border border-white/20 hover:border-thron-gold transition-all"
            >
              Se connecter
            </button>
            <button
              onClick={onOpenRegister}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-thron-gold hover:from-amber-300 hover:to-yellow-400 text-thron-navy text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5"
            >
              S'inscrire <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. SECTION HÉROS : UNION DES COURANTS & LIGNÉES THRON          */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-thron-navy via-thron-blue to-thron-navy text-white pt-16 pb-24 px-4 sm:px-6 text-center">
        {/* Cercles de lumière sacrée */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-thron-gold/15 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-thron-gold/20 border border-thron-gold/40 text-thron-gold text-xs font-bold uppercase tracking-wider animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plateforme Officielle SaaS de la Communauté Thron</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            L'Alliance Sacrée des{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-thron-gold to-yellow-400">
              Courants, Lignées & Temples
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-blue-100/90 leading-relaxed font-light">
            Découvrez THRON HOUNTO : l'arbre généalogique spirituel tactile, le réseau social
            Togoun, le fil vidéo Tognon, la messagerie Atinsa, les tontines, cotisations et la
            marketplace réservée aux dignitaires initiés.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-thron-gold to-yellow-500 text-thron-navy font-black text-sm shadow-gold hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Rejoindre mon Hounto <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              Consulter l'Arbre Démo
            </button>
          </div>

          {/* Statistiques clés */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10">
            <div className="p-3">
              <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-thron-gold">3</span>
              <span className="text-xs text-blue-200">Courants Sacrés</span>
            </div>
            <div className="p-3">
              <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-thron-gold">100k+</span>
              <span className="text-xs text-blue-200">Capacité Cible</span>
            </div>
            <div className="p-3">
              <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-thron-gold">11</span>
              <span className="text-xs text-blue-200">Grades Initiatiques</span>
            </div>
            <div className="p-3">
              <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-thron-gold">8%</span>
              <span className="text-xs text-blue-200">Commission Fixe</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. LES 3 COURANTS CONFIRMÉS (Section 3.1)                      */}
      {/* ============================================================== */}
      <section id="courants" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-thron-gold">
            Hiérarchie Suprême • Section 3.1
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-thron-navy mt-1">
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
              className={`rounded-3xl p-6 border transition-all ${
                c.id === "alafia"
                  ? "bg-gradient-to-b from-amber-50/80 to-white border-thron-gold shadow-md"
                  : "bg-white border-slate-200 hover:shadow-sm"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-thron-navy text-thron-gold flex items-center justify-center font-serif text-xl font-bold mb-4 shadow">
                {c.nom.charAt(6).toUpperCase()}
              </div>
              <span className="text-[10px] font-bold text-thron-blue uppercase tracking-wider block mb-1">
                Courant Officiel
              </span>
              <h3 className="font-serif font-bold text-lg text-thron-navy mb-2">
                {c.nom}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {c.description}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Lignées actives</span>
                <strong className="text-thron-navy">{c.ligneesCount} lignées</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. LA LIGNÉE DE RÉFÉRENCE : MANTINKPON Ò (Section 3.3)         */}
      {/* ============================================================== */}
      <section id="lignee" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-thron-gold/20 text-thron-dark text-xs font-bold uppercase tracking-wider mb-3">
                Lignée de Référence Test • Section 3.3
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-thron-navy leading-tight">
                Lignée Mantinkpon ò
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                Positionnée au plan le plus élevé de l'application sous le courant{" "}
                <strong className="text-thron-navy">Thron kpéto déka alafia</strong>.
                Fondée par le vénérable ancêtre{" "}
                <strong className="text-thron-navy">
                  Feu Mantinkpon ò Adjikanmahoutokounon MONSIA
                </strong>
                , la lignée est aujourd'hui coiffée par{" "}
                <strong className="text-thron-navy">
                  Togbé Mintoniu bo tozé (MONISA Serge)
                </strong>
                , Togbegan daho.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Arbre tracé vers le haut jusqu'au fondateur et vers le bas vers les Hounvi</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Validation stricte des affiliations par le Maître spirituel</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Formule Assiata active avec communauté de 1 450 membres</span>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={onEnterApp}
                  className="px-6 py-3 rounded-xl bg-thron-navy text-white text-xs font-bold hover:bg-thron-blue transition-colors flex items-center gap-2"
                >
                  Explorer l'Arbre de Mantinkpon ò <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-tr from-thron-navy to-thron-blue p-6 text-white shadow-xl border border-thron-gold/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full border-2 border-thron-gold overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
                      alt="Togbé Mintoniu"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-thron-gold uppercase tracking-wider font-bold">
                      Chef Actuel Suprême
                    </span>
                    <h4 className="font-serif font-bold text-base">
                      Togbé Mintoniu bo tozé
                    </h4>
                    <span className="text-xs text-blue-200">MONISA Serge • Togbegan daho</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Courant :</span>
                    <span className="font-bold text-amber-200">Thron kpeto deka alafia</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Fondateur ancestral :</span>
                    <span className="font-bold">Feu Mantinkpon ò MONSIA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Compteurs sacrés :</span>
                    <span className="font-bold text-thron-gold">7 Assi • 18 Vidjidji • 350 Hounvi</span>
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
      <section id="tarifs" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-thron-gold">
            Monétisation Officielle • Section 9.1
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-thron-navy mt-1">
            Abonnements pour les Lignées
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Chaque compte de lignée est souscrit par son Maître selon le grade et le nombre de fidèles.
          </p>

          {/* Toggle Mensuel / Annuel */}
          <div className="mt-6 inline-flex items-center p-1 bg-slate-200 rounded-full text-xs font-bold">
            <button
              onClick={() => setBillingPeriod("mois")}
              className={`px-4 py-1.5 rounded-full transition-all ${
                billingPeriod === "mois" ? "bg-thron-navy text-white shadow-sm" : "text-slate-600"
              }`}
            >
              Par Mois
            </button>
            <button
              onClick={() => setBillingPeriod("an")}
              className={`px-4 py-1.5 rounded-full transition-all ${
                billingPeriod === "an" ? "bg-thron-navy text-white shadow-sm" : "text-slate-600"
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
                    ? "bg-white border-2 border-thron-gold shadow-gold scale-102"
                    : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-thron-gold text-thron-navy text-[10px] font-black uppercase tracking-wider shadow">
                    Recommandé Grande Communauté
                  </span>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="font-serif text-xl font-bold text-thron-navy">
                      {plan.nom}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {plan.signification}
                    </p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <span className="font-serif text-3xl sm:text-4xl font-extrabold text-thron-navy">
                      {price.toLocaleString("fr-FR")}
                    </span>
                    <span className="text-xs text-slate-500 ml-1.5">
                      F CFA / {billingPeriod === "mois" ? "mois" : "an"}
                    </span>
                    <div className="mt-2 text-[11px] font-semibold text-thron-blue">
                      Capacité : {plan.membresMax}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Grade requis : <strong>{plan.gradeRequis}</strong>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs text-slate-600">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenRegister}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                    plan.isPopular
                      ? "bg-thron-navy hover:bg-thron-blue text-white shadow"
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
      <footer className="bg-thron-navy text-white pt-12 pb-8 border-t border-thron-gold/30 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
            <div className="space-y-3">
              <ThreeColasLogo size={36} showText={true} />
              <p className="text-blue-200/80 leading-relaxed text-[11px]">
                SaaS communautaire souverain pour les Courants, Lignées et Temples de Thron.
                Arbre spirituel, réseau social Togoun, vidéos Tognon et messagerie Atinsa.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-amber-200 uppercase tracking-wider mb-3">
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
              <h4 className="font-bold text-amber-200 uppercase tracking-wider mb-3">
                Protection des données (Bénin)
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Conforme au Code du Numérique de la République du Bénin et aux dispositions de l'APDP.
                Consentement obligatoire pour l'affiliation et la géolocalisation des hountos.
              </p>
              <div className="mt-3 text-[10px] text-amber-200/80">
                Paiements sécurisés par Kkiapay & MTN Mobile Money
              </div>
            </div>

            <div>
              <h4 className="font-bold text-amber-200 uppercase tracking-wider mb-3">
                Application Installable
              </h4>
              <p className="text-slate-300 text-[11px] mb-3">
                Installez THRON HOUNTO en Progressive Web App (PWA) sur votre mobile ou ordinateur.
              </p>
              <button
                onClick={onOpenRegister}
                className="px-4 py-2 bg-thron-blue hover:bg-blue-800 rounded-lg text-white font-bold text-xs flex items-center gap-2 border border-white/20"
              >
                <Download className="w-4 h-4" /> Installer l'App
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
            <span>© 2026 THRON HOUNTO. Tous droits sacrés réservés.</span>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer">Conditions d'Utilisation</span>
              <span className="hover:text-white cursor-pointer">Politique de Confidentialité</span>
              <span className="hover:text-white cursor-pointer">Mentions Légales</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
