"use client";

import React, { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Header } from "@/components/Header";
import { BottomNav, NavTab } from "@/components/BottomNav";
import { GenealogyTree } from "@/components/GenealogyTree";
import { TogounFeed } from "@/components/TogounFeed";
import { TognonVideoFeed } from "@/components/TognonVideoFeed";
import { Marketplace } from "@/components/Marketplace";
import { BibliothequeAndZindo } from "@/components/BibliothequeAndZindo";
import { AtinsaMessenger } from "@/components/AtinsaMessenger";
import { ToolsHub } from "@/components/ToolsHub";
import { LandingPage } from "@/components/LandingPage";
import { RegistrationModal } from "@/components/RegistrationModal";
import { LoginModal } from "@/components/LoginModal";
import { LivesAgora } from "@/components/LivesAgora";
import {
  Bell,
  Wallet,
  User,
  X,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  MessageSquare,
} from "lucide-react";

export default function Home() {
  // Mode d'affichage : "landing" (vitrine publique) ou "app" (interface connectée)
  const [viewMode, setViewMode] = useState<"landing" | "app">("landing");

  // Onglet actif dans l'application (Togoun, Tognon, Thronhi, Nouyin, Lignée, Outils)
  const [activeTab, setActiveTab] = useState<NavTab>("togoun");

  // Modales
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [walletViewOpen, setWalletViewOpen] = useState(false);
  const [liveAgoraOpen, setLiveAgoraOpen] = useState(false);
  const [atinsaMessengerOpen, setAtinsaMessengerOpen] = useState(false);

  // État utilisateur connecté
  const [currentUser, setCurrentUser] = useState({
    nom: "MONSIA",
    prenom: "Ayikodji",
    grade: "Hounnon",
    affiliation: "Tete",
    lignee: "Mantinkpon ò",
    courant: "Thron kpeto deka alafia",
    temple: "Temple Alafia Abomey-Calavi",
    walletBalance: 45000,
    isMemberOfLignee: true,
  });

  const [activeLang, setActiveLang] = useState("FR");

  const handleLoginSuccess = (data: any) => {
    setCurrentUser((prev) => ({
      ...prev,
      nom: data.nom,
      prenom: data.prenom,
      grade: data.grade,
      affiliation: data.affiliation,
      lignee: data.lignee || "Mantinkpon ò",
      isMemberOfLignee: true,
    }));
    setViewMode("app");
    setActiveTab("togoun");
  };

  const handleRegistrationSuccess = (data: any) => {
    setCurrentUser((prev) => ({
      ...prev,
      nom: data.nom,
      prenom: data.prenom,
      grade: data.grade || (data.accountType === "visiteur" ? "Agbilinon" : "Hounvi"),
      affiliation: data.affiliation,
      lignee: data.lignee || "Mantinkpon ò",
      isMemberOfLignee: data.accountType !== "visiteur",
    }));
    setViewMode("app");
    if (data.accountType === "visiteur") {
      setActiveTab("togoun");
    } else {
      setActiveTab("lignee");
    }
  };

  const handleBalanceUpdate = (newBal: number) => {
    setCurrentUser((prev) => ({ ...prev, walletBalance: newBal }));
  };

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col relative selection:bg-thron-gold/30">
      {/* 1. ÉCRAN DE PRÉCHARGEMENT BLEU CONFORME À LA SECTION 10.1 */}
      <Preloader minDurationMs={1200} />

      {/* 2. BASCULE ENTRE LANDING PAGE ET APPLICATION CONNECTÉE */}
      {viewMode === "landing" ? (
        <LandingPage
          onOpenLogin={() => setLoginOpen(true)}
          onOpenRegister={() => setRegisterOpen(true)}
          onEnterApp={() => setViewMode("app")}
        />
      ) : (
        <div className="flex-1 flex flex-col pb-20 md:pb-6">
          {/* EN-TÊTE OFFICIEL DE L'APPLICATION (Section 10.2) */}
          <Header
            currentLigneeName={`Lignée ${currentUser.lignee}`}
            onOpenMessenger={() => setAtinsaMessengerOpen(true)}
            onOpenNotifications={() => setNotificationsOpen(true)}
            onOpenProfile={() => setProfileOpen(true)}
            onOpenWallet={() => {
              setActiveTab("outils");
              setWalletViewOpen(true);
            }}
            activeLanguage={activeLang}
            onLanguageChange={(l) => setActiveLang(l)}
            walletBalance={currentUser.walletBalance}
          />

          {/* BANDEAU DE COMMANDE RAPIDE */}
          <div className="bg-thron-navy/95 text-white px-4 py-2 text-[11px] flex items-center justify-between border-b border-white/10 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-amber-200 font-medium">Session Initié :</span>
              <span className="font-bold">{currentUser.prenom} {currentUser.nom}</span>
              <span className="text-thron-gold font-bold">({currentUser.grade})</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLiveAgoraOpen(true)}
                className="px-2.5 py-0.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] flex items-center gap-1 shadow"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                <span>Live Agora</span>
              </button>
              <button
                onClick={() => setViewMode("landing")}
                className="text-slate-300 hover:text-white underline text-[10px]"
              >
                Vitrine publique
              </button>
            </div>
          </div>

          {/* CONTENU PRINCIPAL DE L'ONGLET SÉLECTIONNÉ */}
          <div className="flex-1 w-full max-w-7xl mx-auto py-2">
            {activeTab === "togoun" && <TogounFeed />}
            {activeTab === "tognon" && <TognonVideoFeed />}
            {activeTab === "thronhi" && <Marketplace />}
            {activeTab === "nouyin" && (
              <BibliothequeAndZindo
                userPlan="Assiata"
                walletBalance={currentUser.walletBalance}
              />
            )}
            {activeTab === "lignee" && <GenealogyTree />}
            {activeTab === "outils" && (
              <ToolsHub
                walletBalance={currentUser.walletBalance}
                onBalanceUpdate={handleBalanceUpdate}
                onNavigateToTree={() => setActiveTab("lignee")}
                onNavigateToTogoun={() => setActiveTab("togoun")}
              />
            )}
          </div>

          {/* BARRE DE MENU EN BAS : STRICTEMENT DANS L'ORDRE SUIVANT :
              Togoun, Tognon, Thronhi, Nouyin, Lignée et Outils */}
          <BottomNav
            activeTab={activeTab}
            onChangeTab={(tab) => setActiveTab(tab)}
            isMemberOfLignee={currentUser.isMemberOfLignee}
          />
        </div>
      )}

      {/* 3. MODALE DE CONNEXION SÉPARÉE (Page de Login) */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={handleLoginSuccess}
        onSwitchToRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />

      {/* 4. MODALE D'INSCRIPTION (3 Parcours : Agbilinon, Hounvi, Chef de Lignée) */}
      <RegistrationModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSuccess={handleRegistrationSuccess}
        onSwitchToLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />

      {/* 5. MODALE DE MESSAGERIE SACRÉE ATINSA (OUVERTE VIA L'EN-TÊTE) */}
      {atinsaMessengerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4">
          <div className="relative w-full max-w-3xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-thron-gold/40">
            <div className="bg-thron-navy text-white px-4 py-2.5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-thron-gold" />
                <h4 className="font-serif font-bold text-sm">Messagerie Sacrée Atinsa</h4>
              </div>
              <button
                onClick={() => setAtinsaMessengerOpen(false)}
                className="p-1 rounded-full text-white/80 hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <AtinsaMessenger />
            </div>
          </div>
        </div>
      )}

      {/* 6. MODALE DE LIVE AGORA EN DIRECT */}
      {liveAgoraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4">
          <LivesAgora onClose={() => setLiveAgoraOpen(false)} />
        </div>
      )}

      {/* 7. MODALE DE NOTIFICATIONS DU TEMPLE & LIGNÉE */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-thron-gold/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-thron-gold" />
                <h4 className="font-serif font-bold text-base text-thron-navy">
                  Notifications du Hounto
                </h4>
              </div>
              <button
                onClick={() => setNotificationsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-thron-navy">Cérémonie d Atinkindoudou</h5>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Rassemblement prévu ce dimanche 10h au temple principal Mantinkpon ò.
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Il y a 1 heure</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                <Wallet className="w-4 h-4 text-thron-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-thron-navy">Échéance de Cotisation</h5>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Prélèvement automatique de la cotisation mensuelle exécuté avec succès (5 000 F CFA).
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Hier</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setNotificationsOpen(false)}
              className="w-full py-2.5 bg-thron-navy text-white rounded-xl text-xs font-bold hover:bg-thron-blue transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* 8. MODALE PROFIL & GRADE */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-thron-gold/40 animate-in fade-in zoom-in-95 duration-200 text-center">
            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-thron-gold mb-3 shadow">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                alt="Profil"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-serif font-bold text-lg text-thron-navy">
              {currentUser.prenom} {currentUser.nom}
            </h4>
            <span className="inline-block mt-1 px-3 py-1 bg-thron-gold/20 text-thron-dark rounded-full text-xs font-black uppercase tracking-wider">
              {currentUser.grade}
            </span>
            <p className="mt-2 text-xs text-slate-500 font-medium">
              Lignée : <strong className="text-thron-navy">{currentUser.lignee}</strong>
            </p>
            <p className="text-xs text-slate-500">
              Temple : {currentUser.temple}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-600">
              <span>Statut d affiliation :</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Validé par le Maître
              </span>
            </div>

            <button
              onClick={() => setProfileOpen(false)}
              className="mt-6 w-full py-2.5 bg-thron-navy text-white rounded-xl text-xs font-bold hover:bg-thron-blue transition-colors"
            >
              Fermer mon profil
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
