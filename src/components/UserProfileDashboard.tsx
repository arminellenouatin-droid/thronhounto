"use client";

import React, { useState } from "react";
import {
  User,
  X,
  CreditCard,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Camera,
  Upload,
  Lock,
  Building2,
  Calendar,
  Layers,
  Crown,
  ShoppingBag,
  Bell,
  ChevronRight,
  Download,
  Share2,
  Send,
  Plus,
  RefreshCw,
  LogOut,
  Sliders,
  DollarSign,
  FileText,
  Key
} from "lucide-react";
import { UserRole } from "@/app/page";
import { LineageManagerConsole } from "./LineageManagerConsole";

export interface UserProfileData {
  id: string;
  role: UserRole;
  nom: string;
  prenom: string;
  titreSpirituel?: string;
  grade: string;
  affiliation: string;
  lignee: string;
  courant: string;
  temple: string;
  walletBalance: number;
  isMemberOfLignee: boolean;
  photoUrl: string;
  email: string;
  telephone: string;
}

interface UserProfileDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfileData;
  onUpdateProfile: (updated: Partial<UserProfileData>) => void;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
}

export const UserProfileDashboard: React.FC<UserProfileDashboardProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateProfile,
  onSwitchRole,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "lineage_tools" | "profile" | "wallets" | "admin" | "security">("overview");

  // Formulaire d'édition de profil
  const [editNom, setEditNom] = useState(currentUser.nom);
  const [editPrenom, setEditPrenom] = useState(currentUser.prenom);
  const [editTitre, setEditTitre] = useState(currentUser.titreSpirituel || "");
  const [editTelephone, setEditTelephone] = useState(currentUser.telephone);
  const [editEmail, setEditEmail] = useState(currentUser.email);
  const [editPhotoUrl, setEditPhotoUrl] = useState(currentUser.photoUrl);
  const [editBio, setEditBio] = useState("Gardien des traditions Alafia, dévoué au rayonnement du Trône et à la concorde de la Lignée.");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Upload photo fichier
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setEditPhotoUrl(url);
        onUpdateProfile({ photoUrl: url });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      nom: editNom,
      prenom: editPrenom,
      titreSpirituel: editTitre,
      telephone: editTelephone,
      email: editEmail,
      photoUrl: editPhotoUrl,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  if (!isOpen) return null;

  // Données financières inspirées du template Tidewell (fintech)
  const monthlyFlowData = [
    { month: "Jan", inFlow: 120000, outFlow: 45000 },
    { month: "Fév", inFlow: 180000, outFlow: 60000 },
    { month: "Mar", inFlow: 140000, outFlow: 55000 },
    { month: "Avr", inFlow: 220000, outFlow: 80000 },
    { month: "Mai", inFlow: 190000, outFlow: 75000 },
    { month: "Juin", inFlow: 310000, outFlow: 95000 },
    { month: "Juil", inFlow: 250000, outFlow: 110000 },
    { month: "Août", inFlow: 290000, outFlow: 130000 },
    { month: "Sep", inFlow: 340000, outFlow: 115000 },
    { month: "Oct", inFlow: 410000, outFlow: 140000 },
    { month: "Nov", inFlow: 380000, outFlow: 125000 },
    { month: "Déc", inFlow: 480000, outFlow: 160000 },
  ];

  const recentTransactions = [
    {
      id: "tx-1",
      titre: "Cotisation annuelle de Lignée (Dîme)",
      type: "Cotisation",
      date: "Aujourd'hui, 14:32",
      montant: -25000,
      status: "valide",
      ref: "ALF-2026-901",
    },
    {
      id: "tx-2",
      titre: "Vente Pagne Sacré de Cérémonie (Thronhi)",
      type: "Marketplace",
      date: "Hier, 18:20",
      montant: +45000,
      status: "valide",
      ref: "THR-2026-442",
    },
    {
      id: "tx-3",
      titre: "Offrande Cérémonie d'Atinkindoudou",
      type: "Offrande",
      date: "28 Octobre, 10:15",
      montant: -10000,
      status: "valide",
      ref: "DON-2026-118",
    },
    {
      id: "tx-4",
      titre: "Écoute Audio Sacrée Nouyin (24 min)",
      type: "Nouyin",
      date: "27 Octobre, 21:05",
      montant: -360,
      status: "valide",
      ref: "NOU-2026-083",
    },
    {
      id: "tx-5",
      titre: "Rechargement Wallet Mobile Money",
      type: "Recharge",
      date: "25 Octobre, 09:40",
      montant: +100000,
      status: "valide",
      ref: "REC-2026-774",
    },
    {
      id: "tx-6",
      titre: "Séquestre commande Alafia en cours",
      type: "Séquestre",
      date: "24 Octobre, 16:12",
      montant: -30000,
      status: "en_cours",
      ref: "SEQ-2026-559",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200 font-sans">
      <div className="bg-slate-50 w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[94vh]">
        
        {/* ==================================================================== */}
        {/* 1. TOP BAR ÉPURÉE TIDWELL                                             */}
        {/* ==================================================================== */}
        <div className="bg-white px-4 sm:px-6 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          {/* Breadcrumb & Identité */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-800 p-0.5 shadow-sm ring-1 ring-slate-200">
              <img
                src={currentUser.photoUrl}
                alt=""
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-black text-slate-900 text-sm sm:text-base leading-tight">
                  {currentUser.prenom} {currentUser.nom}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-extrabold uppercase border border-blue-200">
                  {currentUser.grade}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                <span>{currentUser.lignee}</span>
                <span>•</span>
                <span>{currentUser.temple}</span>
              </p>
            </div>
          </div>

          {/* Boutons d'action rapides */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("profile")}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Modifier profil</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 transition-colors cursor-pointer"
              title="Fermer l'espace de gestion"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. CORPS DU DASHBOARD : SIDEBAR GAUCHE + CANVAS CONTENU                */}
        {/* ==================================================================== */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* NAVIGATION SIDEBAR GAUCHE */}
          <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-3 sm:p-4 flex flex-row md:flex-col justify-between overflow-x-auto md:overflow-y-auto flex-shrink-0 gap-1">
            <div className="flex md:flex-col gap-1 w-full">
              <div className="hidden md:block px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Espace Personnel
              </div>

              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer whitespace-nowrap ${
                  activeTab === "overview"
                    ? "bg-thron-navy text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Vue d'ensemble (Tidewell)</span>
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer whitespace-nowrap ${
                  activeTab === "profile"
                    ? "bg-thron-navy text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profil & Identité Sacrée</span>
              </button>

              <button
                onClick={() => setActiveTab("wallets")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer whitespace-nowrap ${
                  activeTab === "wallets"
                    ? "bg-thron-navy text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>Portefeuilles & Dîmes</span>
              </button>

              <div className="hidden md:block px-3 pt-4 pb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Administration
              </div>

              {currentUser.role === "lineage_admin" && (
                <button
                  onClick={() => setActiveTab("lineage_tools")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer whitespace-nowrap ${
                    activeTab === "lineage_tools"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm"
                      : "text-blue-900 bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-blue-500" />
                    <span>Console Maître de Lignée</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-blue-50/700 text-white text-[9px] font-black">
                    11 outils
                  </span>
                </button>
              )}

              <button
                onClick={() => setActiveTab("admin")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer whitespace-nowrap ${
                  activeTab === "admin"
                    ? "bg-thron-navy text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Crown className="w-4 h-4 text-blue-500" />
                <span>Gestion du Rôle & Outils</span>
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer whitespace-nowrap ${
                  activeTab === "security"
                    ? "bg-thron-navy text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Sécurité & Sessions</span>
              </button>
            </div>

            {/* Bas de sidebar : Déconnexion & Statut */}
            <div className="hidden md:block pt-4 border-t border-slate-100 space-y-2">
              <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="font-bold block leading-none">Compte Vérifié</span>
                  <span className="text-[9px] text-emerald-700">Affiliation sacrée active</span>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Changer de compte</span>
              </button>
            </div>
          </aside>

          {/* ZONE PRINCIPALE CONTENU */}
          <main className="flex-1 p-3 sm:p-5 md:p-6 overflow-y-auto space-y-5 bg-slate-50">
            
            {/* ============================================================== */}
            {/* TAB 1 : VUE D'ENSEMBLE TIDEWELL                                 */}
            {/* ============================================================== */}
            {activeTab === "overview" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                
                {/* 3 CARTES DE STATISTIQUES AU SOMMET */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Stat 1 : Solde Global */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                      <span>Solde Consolidé Total</span>
                      <span className="p-1.5 rounded-lg bg-blue-50 text-thron-blue">
                        <Wallet className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                      {currentUser.walletBalance.toLocaleString("fr-FR")} <span className="text-xs text-slate-400 font-bold">FCFA</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+14.2% par rapport au mois dernier</span>
                    </div>
                  </div>

                  {/* Stat 2 : Dîmes & Cotisations */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                      <span>Dîmes & Cotisations 2026</span>
                      <span className="p-1.5 rounded-lg bg-blue-50/70 text-blue-600">
                        <CreditCard className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                      60 000 <span className="text-xs text-slate-400 font-bold">FCFA</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-blue-600 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Statut : À jour (100% en règle)</span>
                    </div>
                  </div>

                  {/* Stat 3 : Droits Coutumiers */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                      <span>Droits & Rangs Coutumiers</span>
                      <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                        <ShieldCheck className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                      Rang #1 <span className="text-xs text-slate-400 font-bold">{currentUser.grade}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Pouvoir d'arbitrage & vote actif</span>
                    </div>
                  </div>
                </div>

                {/* SECTION CENTRALE : MAIN BALANCE CARD + 4 WALLETS BESIDE CASH FLOW */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  
                  {/* COLONNE GAUCHE (1/3) : FILLED MAIN BALANCE CARD (PÉTROLE NOIR FINTECH) */}
                  <div className="lg:col-span-1 space-y-4">
                    <div className="bg-gradient-to-br from-[#0B1E36] via-[#0F2942] to-[#081528] rounded-3xl p-5 text-white shadow-xl border border-white/10 relative overflow-hidden flex flex-col justify-between h-[280px]">
                      {/* Motif filigrane géométrique */}
                      <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />
                      
                      <div className="relative z-10 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block">
                            Portefeuille Sacré Alafia
                          </span>
                          <span className="text-xs text-slate-300 font-medium">Compte Principal Titulaire</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                          <DollarSign className="w-4 h-4 text-blue-200" />
                        </div>
                      </div>

                      <div className="relative z-10 my-auto">
                        <span className="text-xs text-slate-400 block font-medium">Solde Courant</span>
                        <div className="text-3xl font-black text-white tracking-tight mt-0.5">
                          {currentUser.walletBalance.toLocaleString("fr-FR")} <span className="text-sm text-blue-200 font-normal">FCFA</span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                          ID : TH-2026 •••• 9812
                        </span>
                      </div>

                      {/* Boutons d'action rapides Tidewell */}
                      <div className="relative z-10 grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs font-bold">
                        <button
                          onClick={() => alert("Recharge sécurisée par Mobile Money (Moneroo) en cours d'initialisation...")}
                          className="py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/30 transition-all cursor-pointer active:scale-[0.97] font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" /> Recharger
                        </button>
                        <button
                          onClick={() => alert("Virement ou don de solidarité vers un temple initié.")}
                          className="py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" /> Virement
                        </button>
                      </div>
                    </div>

                    {/* 4 SOUS-PORTEFEUILLES TIDEWELL */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">1. Alafia Courant</span>
                        <strong className="text-sm font-black text-slate-900 block mt-0.5">
                          {currentUser.walletBalance.toLocaleString("fr-FR")} F
                        </strong>
                        <span className="text-[9px] text-emerald-600 font-bold">Disponible 24/7</span>
                      </div>

                      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">2. Caisse Dîmes</span>
                        <strong className="text-sm font-black text-slate-900 block mt-0.5">120 000 F</strong>
                        <span className="text-[9px] text-blue-600 font-bold">Lignée Mantinkpon</span>
                      </div>

                      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">3. Séquestre Thronhi</span>
                        <strong className="text-sm font-black text-slate-900 block mt-0.5">75 000 F</strong>
                        <span className="text-[9px] text-blue-600 font-bold">Ventes sécurisées</span>
                      </div>

                      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">4. Solidarité Hounto</span>
                        <strong className="text-sm font-black text-slate-900 block mt-0.5">25 000 F</strong>
                        <span className="text-[9px] text-purple-600 font-bold">Fonds d'entraide</span>
                      </div>
                    </div>
                  </div>

                  {/* COLONNE DROITE (2/3) : CASH-FLOW CHART MENSUELE TIDEWELL */}
                  <div className="lg:col-span-2 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="font-serif font-bold text-base text-slate-900">
                          Flux Financiers & Mouvements de Compte (Cash Flow)
                        </h4>
                        <p className="text-xs text-slate-500">
                          Historique annuel comparatif des entrées (bénédictions & ventes) et sorties (dîmes & achats).
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-bold">
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <span className="w-3 h-3 rounded bg-thron-blue inline-block"></span> Entrées
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <span className="w-3 h-3 rounded bg-blue-500 inline-block"></span> Sorties
                        </span>
                      </div>
                    </div>

                    {/* BAR CHART SVG / CSS INTERACTIF AVEC TOOLTIPS */}
                    <div className="h-52 flex items-end justify-between gap-1.5 pt-6 pb-2 px-2 border-b border-slate-100">
                      {monthlyFlowData.map((d, i) => {
                        const maxVal = 500000;
                        const inHeight = Math.max(12, Math.round((d.inFlow / maxVal) * 160));
                        const outHeight = Math.max(8, Math.round((d.outFlow / maxVal) * 160));

                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                            {/* Tooltip flottant au hover */}
                            <div className="absolute -top-12 bg-slate-900 text-white text-[10px] p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg">
                              <p className="font-bold text-blue-200">{d.month} 2026</p>
                              <p>+ {d.inFlow.toLocaleString()} F | - {d.outFlow.toLocaleString()} F</p>
                            </div>

                            <div className="w-full flex items-end justify-center gap-1">
                              {/* Barre Entrée */}
                              <div
                                style={{ height: `${inHeight}px` }}
                                className="w-2.5 sm:w-3.5 bg-thron-blue rounded-t group-hover:bg-blue-600 transition-colors"
                              />
                              {/* Barre Sortie */}
                              <div
                                style={{ height: `${outHeight}px` }}
                                className="w-2.5 sm:w-3.5 bg-blue-500 rounded-t group-hover:bg-blue-50/700 transition-colors"
                              />
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold mt-1">{d.month}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span>Total entrées cumulées : <strong className="text-slate-900 font-black">3 440 000 FCFA</strong></span>
                      <span>Total sorties : <strong className="text-slate-900 font-black">1 145 000 FCFA</strong></span>
                      <span className="text-emerald-600 font-black">Solde Net : +2 295 000 FCFA</span>
                    </div>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* TABLE D'ACTIVITÉS AVEC STATUS-DOT (STYLE TIDEWELL FINTECH)     */}
                {/* ============================================================== */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-base text-slate-900">
                        Dernières Transactions & Opérations Récentes
                      </h4>
                      <p className="text-xs text-slate-500">
                        Suivi en temps réel de tous les flux financiers sécurisés et certifiés sur le Trône.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab("wallets")}
                      className="text-xs text-thron-blue font-bold hover:underline flex items-center gap-1"
                    >
                      Voir tout le registre <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Tableau des transactions */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                          <th className="py-2.5 px-3">Description & Réf</th>
                          <th className="py-2.5 px-3">Catégorie</th>
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3 text-right">Montant</th>
                          <th className="py-2.5 px-3 text-center">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                        {recentTransactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-3">
                              <span className="font-bold text-slate-900 block">{tx.titre}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{tx.ref}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                                {tx.type}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-slate-500 text-[11px]">{tx.date}</td>
                            <td className="py-3 px-3 text-right font-black">
                              <span className={tx.montant > 0 ? "text-emerald-600" : "text-slate-900"}>
                                {tx.montant > 0 ? `+${tx.montant.toLocaleString()} F` : `${tx.montant.toLocaleString()} F`}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              {/* STATUS DOT DU TEMPLATE TIDEWELL */}
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                tx.status === "valide"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : "bg-blue-50 text-blue-800 border border-blue-200"
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  tx.status === "valide" ? "bg-emerald-500" : "bg-blue-500 animate-pulse"
                                }`} />
                                <span>{tx.status === "valide" ? "Validé" : "En cours"}</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ============================================================== */}
            {/* TAB LINEAGE TOOLS : CONSOLE MAÎTRE DE LIGNÉE (11 OUTILS)       */}
            {/* ============================================================== */}
            {activeTab === "lineage_tools" && (
              <div className="animate-in fade-in duration-200">
                <LineageManagerConsole
                  walletBalance={currentUser.walletBalance}
                />
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 2 : MODIFICATION COMPLÈTE DU PROFIL ET SYNCHRONISATION      */}
            {/* ============================================================== */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="font-serif font-black text-lg text-slate-900">
                      Gestion du Profil & Synchronisation Généalogique
                    </h4>
                    <p className="text-xs text-slate-500">
                      Toute modification de votre photo ou identité est immédiatement répercutée dans l'Arbre Généalogique et l'En-tête.
                    </p>
                  </div>

                  {saveSuccess && (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4" /> Enregistré avec succès !
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  
                  {/* Photo de profil avec prévisualisation et upload */}
                  <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-md flex-shrink-0">
                      <img src={editPhotoUrl} alt="Aperçu" className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <h5 className="font-bold text-slate-900 text-sm">Photo officielle de l'initié</h5>
                      <p className="text-slate-500 text-[11px]">
                        Formats acceptés : JPG, PNG ou URL directe. La photo est automatiquement propagée dans toute la lignée.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1 justify-center sm:justify-start">
                        <label className="px-3 py-2 bg-thron-navy hover:bg-thron-blue text-white rounded-xl font-bold text-xs cursor-pointer shadow-sm transition-colors flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5" /> Téléverser un fichier
                          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            const url = prompt("Coller l'URL de l'image de profil :", editPhotoUrl);
                            if (url && url.trim()) setEditPhotoUrl(url.trim());
                          }}
                          className="px-3 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl font-bold text-xs cursor-pointer"
                        >
                          Coller une URL
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Champs de données personnelles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Prénom</label>
                      <input
                        type="text"
                        value={editPrenom}
                        onChange={(e) => setEditPrenom(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-thron-navy focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nom de famille</label>
                      <input
                        type="text"
                        value={editNom}
                        onChange={(e) => setEditNom(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-thron-navy focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Titre spirituel coutumier</label>
                      <input
                        type="text"
                        value={editTitre}
                        onChange={(e) => setEditTitre(e.target.value)}
                        placeholder="Ex: Togbé Mintoniu bo tozé"
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-thron-navy focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Grade spirituel (Attribué par le Hounto)</label>
                      <input
                        type="text"
                        value={currentUser.grade}
                        disabled
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-bold cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Numéro de Téléphone (Mobile Money)</label>
                      <input
                        type="text"
                        value={editTelephone}
                        onChange={(e) => setEditTelephone(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-thron-navy focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Adresse Email</label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-thron-navy focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Biographie & Rôle spirituel</label>
                    <textarea
                      rows={3}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-thron-navy focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-thron-navy hover:bg-thron-blue text-white rounded-xl font-bold text-xs shadow transition-colors cursor-pointer"
                    >
                      Enregistrer les modifications
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 3 : PORTEFEUILLES & DÎMES COMPLÈTES                         */}
            {/* ============================================================== */}
            {activeTab === "wallets" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                  <h4 className="font-serif font-black text-lg text-slate-900">
                    Gestion Intégrale des Portefeuilles & Dépôts
                  </h4>
                  <p className="text-xs text-slate-500">
                    Chaque portefeuille est isolé et audité en temps réel avec traçabilité complète des transactions.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex justify-between items-center">
                        <strong className="text-slate-900 text-sm font-black">Portefeuille Alafia (XOF)</strong>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Principal</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">Utilisé pour les achats marketplace, dons et écoutes Nouyin.</p>
                      <div className="text-xl font-black text-slate-900">{currentUser.walletBalance.toLocaleString()} FCFA</div>
                      <button
                        onClick={() => alert("Recharge via Moneroo (MTN / Moov / Carte)")}
                        className="w-full py-2 bg-thron-navy text-white rounded-xl font-bold text-xs mt-2 hover:bg-thron-blue cursor-pointer"
                      >
                        Recharger ce portefeuille
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex justify-between items-center">
                        <strong className="text-slate-900 text-sm font-black">Dîmes & Cotisations de Lignée</strong>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">Coutumier</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">Cotisations versées pour l'entretien du temple et les cérémonies.</p>
                      <div className="text-xl font-black text-slate-900">120 000 FCFA</div>
                      <button
                        onClick={() => alert("Versement de dîme versé au Conseil des Hounnon de la Lignée.")}
                        className="w-full py-2 border border-slate-300 text-slate-700 rounded-xl font-bold text-xs mt-2 hover:bg-slate-100 cursor-pointer"
                      >
                        Effectuer un versement de Dîme
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 4 : OUTILS D'ADMINISTRATION & SÉLECTEUR DE COMPTES          */}
            {/* ============================================================== */}
            {activeTab === "admin" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5 animate-in fade-in duration-200">
                <div>
                  <h4 className="font-serif font-black text-lg text-slate-900">
                    Outils d'Administration & Gestion du Rôle ({currentUser.grade})
                  </h4>
                  <p className="text-xs text-slate-500">
                    Accédez aux commandes relatives à vos prérogatives sacrées et basculez facilement entre les profils de test.
                  </p>
                </div>

                {/* SÉLECTEUR RAPIDE DES 5 COMPTES DE TEST */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                  <span className="text-xs font-bold text-[#0A1628] uppercase tracking-wider block">
                    Bascule Rapide de Compte (5 Profils de Test)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs font-bold">
                    <button
                      onClick={() => onSwitchRole("master_admin")}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        currentUser.role === "master_admin"
                          ? "bg-thron-navy text-white border-thron-navy shadow"
                          : "bg-white text-slate-700 border-slate-200 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Crown className="w-4 h-4 text-blue-500" />
                        <span>Master Admin (Quentin)</span>
                      </div>
                      <span className="text-[10px] opacity-70 block mt-0.5">Direction Générale SaaS</span>
                    </button>

                    <button
                      onClick={() => onSwitchRole("lineage_admin")}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        currentUser.role === "lineage_admin"
                          ? "bg-thron-navy text-white border-thron-navy shadow"
                          : "bg-white text-slate-700 border-slate-200 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-blue-500" />
                        <span>Admin Lignée (Togbé)</span>
                      </div>
                      <span className="text-[10px] opacity-70 block mt-0.5">Togbegan daho • Serge MONSIA</span>
                    </button>

                    <button
                      onClick={() => onSwitchRole("seller")}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        currentUser.role === "seller"
                          ? "bg-thron-navy text-white border-thron-navy shadow"
                          : "bg-white text-slate-700 border-slate-200 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <ShoppingBag className="w-4 h-4 text-blue-600" />
                        <span>Vendeur (Hounnon)</span>
                      </div>
                      <span className="text-[10px] opacity-70 block mt-0.5">Comptoir Sacré Thronhi</span>
                    </button>

                    <button
                      onClick={() => onSwitchRole("visitor")}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        currentUser.role === "visitor"
                          ? "bg-thron-navy text-white border-thron-navy shadow"
                          : "bg-white text-slate-700 border-slate-200 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-slate-500" />
                        <span>Visiteur (Agbilinon)</span>
                      </div>
                      <span className="text-[10px] opacity-70 block mt-0.5">Public non-initié</span>
                    </button>

                    <button
                      onClick={() => onSwitchRole("member")}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        currentUser.role === "member"
                          ? "bg-thron-navy text-white border-thron-navy shadow"
                          : "bg-white text-slate-700 border-slate-200 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span>Membre Lignée (Hounvi)</span>
                      </div>
                      <span className="text-[10px] opacity-70 block mt-0.5">Initié de couvent</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 5 : SÉCURITÉ & SESSIONS                                    */}
            {/* ============================================================== */}
            {activeTab === "security" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 animate-in fade-in duration-200 text-xs">
                <h4 className="font-serif font-black text-lg text-slate-900">
                  Sécurité du Compte & Sessions Actives
                </h4>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 block font-bold">Double Authentification (2FA / OTP)</strong>
                      <span className="text-slate-500 text-[11px]">Validation par code SMS ou Token sur action financière</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Activée</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 block font-bold">Session Actuelle</strong>
                      <span className="text-slate-500 text-[11px]">Connecté depuis Cotonou, Bénin • IP 102.164.x.x</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">En ligne</span>
                  </div>

                  <button
                    onClick={() => alert("Toutes les autres sessions distantes ont été révoquées avec succès.")}
                    className="py-2.5 px-4 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    Déconnecter toutes les autres sessions actives
                  </button>
                </div>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
};
