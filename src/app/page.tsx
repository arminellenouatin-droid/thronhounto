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
  MasterAdminDashboard,
  LineageAdminDashboard,
  SellerDashboard,
  VisitorCommunityView,
} from "@/components/RoleDashboards";
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
  Crown,
  ShoppingBag,
  Store,
  Layers,
  ArrowLeft,
  Camera,
} from "lucide-react";

// DÉFINITION DES 5 PROFILS DE TEST (CONFORME AU CAHIER DES CHARGES)
export type UserRole = "master_admin" | "lineage_admin" | "seller" | "visitor" | "member";

interface UserProfile {
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

const TEST_PROFILES: Record<UserRole, UserProfile> = {
  master_admin: {
    id: "usr-master",
    role: "master_admin",
    nom: "DAVAKAN",
    prenom: "Quentin",
    titreSpirituel: "Super-Admin Suprême",
    grade: "Super-Admin SaaS",
    affiliation: "Direction Générale SaaS",
    lignee: "Toutes Lignées (42 Sièges)",
    courant: "Courants Thron Unifiés",
    temple: "Console Centrale",
    walletBalance: 3020000,
    isMemberOfLignee: true,
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    email: "envolafrica@gmail.com",
    telephone: "+2290195153177",
  },
  lineage_admin: {
    id: "usr-lineage",
    role: "lineage_admin",
    nom: "MONSIA",
    prenom: "Serge",
    titreSpirituel: "Togbé Mintoniu bo tozé",
    grade: "Togbegan daho",
    affiliation: "Maître de Lignée",
    lignee: "Mantinkpon ò",
    courant: "Thron kpeto deka alafia",
    temple: "Temple Alafia Abomey-Calavi",
    walletBalance: 450000,
    isMemberOfLignee: true,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    email: "togbemintoniu@thronhounto.bj",
    telephone: "+2290197000101",
  },
  seller: {
    id: "usr-seller",
    role: "seller",
    nom: "DOSSOU",
    prenom: "Mahugnon",
    titreSpirituel: "Dignitaire Vendeur",
    grade: "Hounnon",
    affiliation: "Comptoir Sacré Alafia",
    lignee: "Mantinkpon ò",
    courant: "Thron kpeto deka alafia",
    temple: "Temple Alafia Abomey-Calavi",
    walletBalance: 680000,
    isMemberOfLignee: true,
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    email: "hounnon.dossou@thronhounto.bj",
    telephone: "+2290196554433",
  },
  visitor: {
    id: "usr-visitor",
    role: "visitor",
    nom: "KOUASSI",
    prenom: "Jean",
    titreSpirituel: "Visiteur / Curieux",
    grade: "Agbilinon",
    affiliation: "Non-affilié (Visiteur)",
    lignee: "Aucune (Découverte)",
    courant: "Découverte des Trônes",
    temple: "Aucun",
    walletBalance: 0,
    isMemberOfLignee: false,
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    email: "jean.kouassi@test.com",
    telephone: "+2290194112233",
  },
  member: {
    id: "usr-member",
    role: "member",
    nom: "KPODÉKON",
    prenom: "Bienvenu",
    titreSpirituel: "Fidèle Initié",
    grade: "Hounvi",
    affiliation: "Atinkindouvi",
    lignee: "Mantinkpon ò",
    courant: "Thron kpeto deka alafia",
    temple: "Temple Alafia Abomey-Calavi",
    walletBalance: 35000,
    isMemberOfLignee: true,
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    email: "bienvenu.kpodekon@thronhounto.bj",
    telephone: "+2290195223344",
  },
};

export default function Home() {
  // CONFORME AU DOCUMENT : LA PAGE D'ACCUEIL (HERO VITRINE) EST DÉSACTIVÉE AU DÉMARRAGE.
  // L'application s'ouvre DIRECTEMENT sur le réseau social Togoun.
  const [viewMode, setViewMode] = useState<"landing" | "app">("app");

  // Onglet actif : commence directement sur "togoun"
  const [activeTab, setActiveTab] = useState<NavTab>("togoun");

  // Modales
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [walletViewOpen, setWalletViewOpen] = useState(false);
  const [liveAgoraOpen, setLiveAgoraOpen] = useState(false);
  const [atinsaMessengerOpen, setAtinsaMessengerOpen] = useState(false);

  // État utilisateur connecté (par défaut : Maître de Lignée ou paramétrable via la barre de rôles)
  const [currentUser, setCurrentUser] = useState<UserProfile>(TEST_PROFILES.lineage_admin);

  // Vue sous-espace selon le rôle (ex: Boutique vendeur vs Marketplace générale, Dashboard Lignée vs Arbre)
  const [sellerViewMode, setSellerViewMode] = useState<"catalog" | "dashboard">("catalog");
  const [lineageViewMode, setLineageViewMode] = useState<"tree" | "dashboard">("tree");
  const [showPublicDemoTree, setShowPublicDemoTree] = useState(false);

  const [activeLang, setActiveLang] = useState("FR");

  // Changer de rôle instantanément (pour tester les 5 profils du cahier des charges)
  const handleSwitchRole = (newRole: UserRole) => {
    const profile = TEST_PROFILES[newRole];
    setCurrentUser(profile);
    if (!profile.isMemberOfLignee && activeTab === "lignee") {
      setShowPublicDemoTree(false);
    }
  };

  // Synchronisation Photo Profil <-> Arbre Généalogique (Consigne stricte du document)
  const handlePhotoUpdate = (newPhotoUrl: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      photoUrl: newPhotoUrl,
    }));
  };

  const handleLoginSuccess = (data: any) => {
    setCurrentUser((prev) => ({
      ...prev,
      nom: data.nom || prev.nom,
      prenom: data.prenom || prev.prenom,
      grade: data.grade || prev.grade,
      affiliation: data.affiliation || prev.affiliation,
      lignee: data.lignee || prev.lignee,
      isMemberOfLignee: true,
    }));
    setViewMode("app");
    setActiveTab("togoun");
  };

  const handleRegistrationSuccess = (data: any) => {
    const isVisiteur = data.accountType === "visiteur";
    setCurrentUser((prev) => ({
      ...prev,
      nom: data.nom || prev.nom,
      prenom: data.prenom || prev.prenom,
      grade: data.grade || (isVisiteur ? "Agbilinon" : "Hounvi"),
      affiliation: data.affiliation || prev.affiliation,
      lignee: data.lignee || "Mantinkpon ò",
      isMemberOfLignee: !isVisiteur,
      role: isVisiteur ? "visitor" : "member",
    }));
    setViewMode("app");
    setActiveTab(isVisiteur ? "togoun" : "lignee");
  };

  const handleBalanceUpdate = (newBal: number) => {
    setCurrentUser((prev) => ({ ...prev, walletBalance: newBal }));
  };

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col relative selection:bg-thron-gold/30">
      {/* 1. ÉCRAN DE PRÉCHARGEMENT BLEU CONFORME À LA SECTION 10.1 */}
      <Preloader minDurationMs={1000} />

      {/* 2. BASCULE ENTRE LANDING PAGE ET APPLICATION CONNECTÉE */}
      {viewMode === "landing" ? (
        <LandingPage
          onOpenLogin={() => setLoginOpen(true)}
          onOpenRegister={() => setRegisterOpen(true)}
          onEnterApp={() => setViewMode("app")}
        />
      ) : (
        <div className="flex-1 flex flex-col pb-20 md:pb-6">
          {/* ========================================================== */}
          {/* BARRE DE TEST MULTI-RÔLES : LES 5 COMPTES DU DOCUMENT      */}
          {/* ========================================================== */}
          <div className="bg-slate-900 text-white px-3 py-1.5 text-[11px] border-b border-white/10 flex items-center justify-between overflow-x-auto gap-2">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10px] uppercase font-black tracking-wider text-thron-gold">
                Sélecteur de Rôle (5 Comptes de Test) :
              </span>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => handleSwitchRole("master_admin")}
                className={`px-2 py-0.5 rounded-md font-bold text-[10px] transition-all cursor-pointer ${
                  currentUser.role === "master_admin"
                    ? "bg-thron-gold text-thron-navy shadow"
                    : "bg-white/10 hover:bg-white/20 text-slate-300"
                }`}
                title="Quentin DAVAKAN (+2290195153177)"
              >
                👑 Master Admin (Quentin)
              </button>

              <button
                onClick={() => handleSwitchRole("lineage_admin")}
                className={`px-2 py-0.5 rounded-md font-bold text-[10px] transition-all cursor-pointer ${
                  currentUser.role === "lineage_admin"
                    ? "bg-thron-gold text-thron-navy shadow"
                    : "bg-white/10 hover:bg-white/20 text-slate-300"
                }`}
                title="Togbé Mintoniu bo tozé - MONSIA Serge"
              >
                🏛️ Admin Lignée (Togbé)
              </button>

              <button
                onClick={() => handleSwitchRole("seller")}
                className={`px-2 py-0.5 rounded-md font-bold text-[10px] transition-all cursor-pointer ${
                  currentUser.role === "seller"
                    ? "bg-thron-gold text-thron-navy shadow"
                    : "bg-white/10 hover:bg-white/20 text-slate-300"
                }`}
                title="Hounnon Mahugnon DOSSOU (Boutique Alafia)"
              >
                🛒 Vendeur (Hounnon)
              </button>

              <button
                onClick={() => handleSwitchRole("visitor")}
                className={`px-2 py-0.5 rounded-md font-bold text-[10px] transition-all cursor-pointer ${
                  currentUser.role === "visitor"
                    ? "bg-thron-gold text-thron-navy shadow"
                    : "bg-white/10 hover:bg-white/20 text-slate-300"
                }`}
                title="Jean KOUASSI (Agbilinon - Visiteur)"
              >
                👤 Visiteur (Agbilinon)
              </button>

              <button
                onClick={() => handleSwitchRole("member")}
                className={`px-2 py-0.5 rounded-md font-bold text-[10px] transition-all cursor-pointer ${
                  currentUser.role === "member"
                    ? "bg-thron-gold text-thron-navy shadow"
                    : "bg-white/10 hover:bg-white/20 text-slate-300"
                }`}
                title="Bienvenu KPODÉKON (Hounvi)"
              >
                📿 Membre Lignée (Hounvi)
              </button>
            </div>
          </div>

          {/* EN-TÊTE OFFICIEL DE L'APPLICATION (Section 10.2) */}
          <Header
            currentLigneeName={
              currentUser.role === "master_admin"
                ? "SaaS Suprême Thron"
                : currentUser.isMemberOfLignee
                ? `Lignée ${currentUser.lignee}`
                : "Communauté Thron"
            }
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
              <span className="text-amber-200 font-medium">Session Active :</span>
              <span className="font-bold">
                {currentUser.prenom} {currentUser.nom}
              </span>
              <span className="text-thron-gold font-bold">({currentUser.grade})</span>
              {currentUser.titreSpirituel && (
                <span className="hidden sm:inline-block text-[10px] text-blue-200">
                  • {currentUser.titreSpirituel}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {currentUser.role === "master_admin" && (
                <button
                  onClick={() => {
                    setActiveTab("outils");
                    setWalletViewOpen(false);
                  }}
                  className="px-2.5 py-0.5 rounded-full bg-amber-500 hover:bg-amber-600 text-thron-navy font-black text-[10px] flex items-center gap-1 shadow cursor-pointer"
                >
                  <Crown className="w-3 h-3" />
                  <span>Console Master SaaS</span>
                </button>
              )}

              <button
                onClick={() => setLiveAgoraOpen(true)}
                className="px-2.5 py-0.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] flex items-center gap-1 shadow cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                <span>Live Agora</span>
              </button>

              <button
                onClick={() => setViewMode("landing")}
                className="text-slate-300 hover:text-white underline text-[10px] cursor-pointer"
              >
                Vitrine publique
              </button>
            </div>
          </div>

          {/* CONTENU PRINCIPAL DE L'ONGLET SÉLECTIONNÉ */}
          <div className="flex-1 w-full max-w-7xl mx-auto py-2">
            {/* 1. TOGOUN (RÉSEAU SOCIAL) */}
            {activeTab === "togoun" && <TogounFeed />}

            {/* 2. TOGNON (FIL VIDÉO SACRÉ) */}
            {activeTab === "tognon" && <TognonVideoFeed />}

            {/* 3. THRONHI (MARKETPLACE SPIRITUELLE) */}
            {activeTab === "thronhi" && (
              <div className="space-y-4">
                {currentUser.role === "seller" && (
                  <div className="max-w-4xl mx-auto px-3 sm:px-6 flex items-center justify-between bg-white rounded-2xl p-3 border border-amber-300 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Store className="w-5 h-5 text-amber-700" />
                      <span className="text-xs font-bold text-thron-navy">
                        Espace Vendeur Certifié : Comptoir Sacré Alafia
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSellerViewMode("catalog")}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          sellerViewMode === "catalog"
                            ? "bg-thron-navy text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Articles en vente
                      </button>
                      <button
                        onClick={() => setSellerViewMode("dashboard")}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          sellerViewMode === "dashboard"
                            ? "bg-thron-gold text-thron-navy shadow"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Tableau de bord Vendeur & Séquestre
                      </button>
                    </div>
                  </div>
                )}

                {currentUser.role === "seller" && sellerViewMode === "dashboard" ? (
                  <SellerDashboard />
                ) : (
                  <Marketplace />
                )}
              </div>
            )}

            {/* 4. NOUYIN (MÉDIAS, BIBLIOTHÈQUE SACRÉE ET ZINDO) */}
            {activeTab === "nouyin" && (
              <BibliothequeAndZindo
                userPlan="Assiata"
                walletBalance={currentUser.walletBalance}
              />
            )}

            {/* 5. LIGNÉE (ARBRE GÉNÉALOGIQUE TACTILE OU PAGE VISITEUR) */}
            {activeTab === "lignee" && (
              <div>
                {!currentUser.isMemberOfLignee ? (
                  /* ============================================================== */
                  /* PAGE VISITEUR OBLIGATOIRE SELON LES CONSIGNES DU DOCUMENT :    */
                  /* HERO OFFICIEL + 2 BOUTONS + 5 STATISTIQUES                     */
                  /* ============================================================== */
                  <div>
                    {showPublicDemoTree ? (
                      <div className="space-y-4">
                        <div className="max-w-4xl mx-auto px-3 sm:px-6">
                          <button
                            onClick={() => setShowPublicDemoTree(false)}
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
                          >
                            <ArrowLeft className="w-4 h-4" /> Retour aux statistiques de la communauté
                          </button>
                        </div>
                        <GenealogyTree
                          currentUserPhoto={currentUser.photoUrl}
                          onUpdatePhoto={handlePhotoUpdate}
                        />
                      </div>
                    ) : (
                      <VisitorCommunityView
                        onJoinCommunity={() => setRegisterOpen(true)}
                        onExplorePublicTree={() => setShowPublicDemoTree(true)}
                      />
                    )}
                  </div>
                ) : (
                  /* MEMBRE OU CHEF DE LIGNÉE CONNECTÉ */
                  <div className="space-y-4">
                    {currentUser.role === "lineage_admin" && (
                      <div className="max-w-4xl mx-auto px-3 sm:px-6 flex items-center justify-between bg-white rounded-2xl p-3 border border-amber-300 shadow-sm">
                        <div className="flex items-center gap-2">
                          <Crown className="w-5 h-5 text-amber-700" />
                          <span className="text-xs font-bold text-thron-navy">
                            Espace Maître de Lignée • Mantinkpon ò
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setLineageViewMode("tree")}
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              lineageViewMode === "tree"
                                ? "bg-thron-navy text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Arbre Tactile
                          </button>
                          <button
                            onClick={() => setLineageViewMode("dashboard")}
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              lineageViewMode === "dashboard"
                                ? "bg-thron-gold text-thron-navy shadow"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Gestion Lignée & Annonces
                          </button>
                        </div>
                      </div>
                    )}

                    {currentUser.role === "lineage_admin" && lineageViewMode === "dashboard" ? (
                      <LineageAdminDashboard
                        onNavigateToTree={() => setLineageViewMode("tree")}
                        onNavigateToTogoun={() => setActiveTab("togoun")}
                      />
                    ) : (
                      <GenealogyTree
                        currentUserPhoto={currentUser.photoUrl}
                        onUpdatePhoto={handlePhotoUpdate}
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 6. OUTILS (BOÎTE À OUTILS COMPLÈTE & CONSOLE MASTER ADMIN) */}
            {activeTab === "outils" && (
              <div className="space-y-4">
                {currentUser.role === "master_admin" && (
                  <div className="max-w-4xl mx-auto px-3 sm:px-6">
                    <MasterAdminDashboard onNavigateToTab={(t) => setActiveTab(t as NavTab)} />
                  </div>
                )}

                <ToolsHub
                  initialToolView={walletViewOpen ? "wallet" : null}
                  currentUserRole={currentUser.role}
                  currentUserGrade={currentUser.grade}
                  currentUserLignee={currentUser.lignee}
                  currentUserTemple={currentUser.temple}
                  walletBalance={currentUser.walletBalance}
                  onBalanceUpdate={handleBalanceUpdate}
                  onNavigateToTree={() => setActiveTab("lignee")}
                  onNavigateToTogoun={() => setActiveTab("togoun")}
                />
              </div>
            )}
          </div>

          {/* BARRE DE MENU EN BAS : STRICTEMENT DANS L'ORDRE SUIVANT :
              Togoun, Tognon, Thronhi, Nouyin, Lignée et Outils */}
          <BottomNav
            activeTab={activeTab}
            onChangeTab={(tab) => {
              setActiveTab(tab);
              if (tab !== "outils") setWalletViewOpen(false);
            }}
            isMemberOfLignee={currentUser.isMemberOfLignee}
          />
        </div>
      )}

      {/* 3. MODALE DE CONNEXION */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={handleLoginSuccess}
        onSwitchToRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />

      {/* 4. MODALE D'INSCRIPTION */}
      <RegistrationModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSuccess={handleRegistrationSuccess}
        onSwitchToLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />

      {/* 5. MODALE DE MESSAGERIE SACRÉE ATINSA */}
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
                className="p-1 rounded-full text-white/80 hover:bg-white/20 cursor-pointer"
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
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-thron-navy">Cérémonie d'Atinkindoudou</h5>
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
              className="w-full py-2.5 bg-thron-navy text-white rounded-xl text-xs font-bold hover:bg-thron-blue transition-colors cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* 8. MODALE PROFIL & SYNCHRONISATION PHOTO ARBRE */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-thron-gold/40 animate-in fade-in zoom-in-95 duration-200 text-center">
            <div className="relative w-24 h-24 rounded-full mx-auto overflow-hidden border-2 border-thron-gold mb-3 shadow group">
              <img
                src={currentUser.photoUrl}
                alt="Profil"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  const newUrl = prompt(
                    "Entrez l'URL de votre photo de profil :\n(Cette photo sera automatiquement synchronisée dans l'arbre généalogique)",
                    currentUser.photoUrl
                  );
                  if (newUrl && newUrl.trim()) {
                    handlePhotoUpdate(newUrl.trim());
                    alert("Photo de profil mise à jour et synchronisée avec l'arbre généalogique !");
                  }
                }}
                className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] font-bold transition-opacity cursor-pointer"
              >
                <Camera className="w-5 h-5 mb-0.5" />
                <span>Changer</span>
              </button>
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
              <span>Statut d'affiliation :</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {currentUser.isMemberOfLignee ? "Validé par le Maître" : "Visiteur non-affilié"}
              </span>
            </div>

            <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[10px] text-amber-900 text-left flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Synchronisation active :</strong> Toute mise à jour de photo ici est immédiatement répercutée dans l'arbre généalogique spirituel.
              </span>
            </div>

            <button
              onClick={() => setProfileOpen(false)}
              className="mt-4 w-full py-2.5 bg-thron-navy text-white rounded-xl text-xs font-bold hover:bg-thron-blue transition-colors cursor-pointer"
            >
              Fermer mon profil
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
