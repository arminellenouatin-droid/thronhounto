"use client";

import React, { useState, useEffect } from "react";
import { Preloader } from "@/components/Preloader";
import { Header } from "@/components/Header";
import { BottomNav, NavTab } from "@/components/BottomNav";
import { GenealogyTree } from "@/components/GenealogyTree";
import { TogounFeed } from "@/components/TogounFeed";
import { TognonVideoFeed } from "@/components/TognonVideoFeed";
import { TogounVideoImmersionView } from "@/components/TogounVideoImmersionView";
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
import { LigneeLandingView } from "@/components/LigneeLandingView";
import { SocialShareModal } from "@/components/SocialShareModal";
import { UserProfileDashboard } from "@/components/UserProfileDashboard";
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
  Heart,
  Link2,
  Copy,
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
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  // Vidéo initiale pour Tognon (deep-linking depuis Togoun)
  const [tognonInitialVideoId, setTognonInitialVideoId] = useState<string | null>(null);
  const [shareModalData, setShareModalData] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: "",
    url: "",
  });

  // État de l'URL visible et synchronisée de la page
  const [currentPageUrl, setCurrentPageUrl] = useState<string>("");
  const [urlCopied, setUrlCopied] = useState<boolean>(false);

  // Synchronisation avec l'URL du navigateur au montage et gestion des liens directs (?tab=...)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as NavTab;
      const validTabs: NavTab[] = ["togoun", "tognon", "thronhi", "nouyin", "lignee", "outils"];
      const targetTab = tabParam && validTabs.includes(tabParam) ? tabParam : "togoun";
      if (targetTab !== "togoun") {
        setActiveTab(targetTab);
      }
      const initialUrl = `${window.location.origin}/?tab=${targetTab}`;
      setCurrentPageUrl(initialUrl);
      window.history.replaceState({ tab: targetTab }, "", `/?tab=${targetTab}`);

      const handlePopState = (e: PopStateEvent) => {
        const p = new URLSearchParams(window.location.search);
        const t = (p.get("tab") as NavTab) || e.state?.tab;
        if (t && validTabs.includes(t)) {
          setActiveTab(t);
          setCurrentPageUrl(`${window.location.origin}/?tab=${t}`);
        }
      };

      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, []);

  const handleTabChange = (tab: NavTab) => {
    if (tab === "tognon") {
      setTognonInitialVideoId(null);
    }
    setActiveTab(tab);
    if (tab !== "outils") setWalletViewOpen(false);

    if (typeof window !== "undefined") {
      const newUrl = `${window.location.origin}/?tab=${tab}`;
      window.history.pushState({ tab }, "", `/?tab=${tab}`);
      setCurrentPageUrl(newUrl);
    }
  };

  const handleCopyPageUrl = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(currentPageUrl || (typeof window !== "undefined" ? `${window.location.origin}/?tab=${activeTab}` : "https://thronhounto.bj"));
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    }
  };

  // État utilisateur connecté : null au chargement (mode visiteur par défaut sans utilisateur pré-connecté)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Vue sous-espace selon le rôle (ex: Boutique vendeur vs Marketplace générale, Dashboard Lignée vs Arbre)
  const [sellerViewMode, setSellerViewMode] = useState<"catalog" | "dashboard">("catalog");
  const [lineageViewMode, setLineageViewMode] = useState<"tree" | "dashboard" | "landing">("landing");
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
    setCurrentUser((prev) => (prev ? { ...prev, photoUrl: newPhotoUrl } : null));
  };

  const handleLoginSuccess = (data: any) => {
    setCurrentUser({
      id: data.id || "usr-" + Date.now(),
      role: data.role || "visitor",
      nom: data.nom || "Utilisateur",
      prenom: data.prenom || "",
      titreSpirituel: data.titreSpirituel || (data.role === "visitor" ? "Visiteur / Curieux" : "Fidèle Initié"),
      grade: data.grade || (data.role === "visitor" ? "Agbilinon" : "Hounvi"),
      affiliation: data.affiliation || (data.role === "visitor" ? "Non-affilié" : "Fidèle Initié"),
      lignee: data.lignee || (data.role === "visitor" ? "Aucune" : "Mantinkpon ò"),
      courant: data.courant || "Thron kpeto deka alafia",
      temple: data.temple || "",
      walletBalance: data.walletBalance !== undefined ? data.walletBalance : 0,
      isMemberOfLignee: data.isMemberOfLignee !== undefined ? data.isMemberOfLignee : data.role !== "visitor",
      photoUrl: data.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      email: data.email || "",
      telephone: data.telephone || "",
    });
    setViewMode("app");
    // Redirection directe vers le tableau de bord ou vue selon le rôle
    if (data.role === "master_admin") {
      setActiveTab("outils");
    } else if (data.role === "seller") {
      setActiveTab("thronhi");
      setSellerViewMode("dashboard");
    } else if (data.role === "lineage_admin") {
      setActiveTab("lignee");
      setLineageViewMode("dashboard");
    } else if (data.role === "visitor") {
      setActiveTab("togoun");
    } else {
      setActiveTab("lignee");
      setLineageViewMode("landing");
    }
  };

  const handleRegistrationSuccess = (data: any) => {
    const isVisiteur = data.accountType === "visiteur";
    setCurrentUser({
      id: "usr-" + Date.now(),
      nom: data.nom || "Initié",
      prenom: data.prenom || "",
      titreSpirituel: isVisiteur ? "Visiteur / Curieux" : "Fidèle Initié",
      grade: data.grade || (isVisiteur ? "Agbilinon" : "Hounvi"),
      affiliation: data.affiliation || (isVisiteur ? "Visiteur Non-affilié" : "Communauté"),
      lignee: data.lignee || (isVisiteur ? "Aucune" : "Mantinkpon ò"),
      courant: data.courant || "Thron kpeto deka alafia",
      temple: data.temple || "Temple Alafia",
      walletBalance: 0,
      isMemberOfLignee: !isVisiteur,
      role: isVisiteur ? "visitor" : "member",
      photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
      email: data.email || "",
      telephone: data.phone || "",
    });
    setViewMode("app");
    setActiveTab(isVisiteur ? "togoun" : "lignee");
  };

  const handleBalanceUpdate = (newBal: number) => {
    setCurrentUser((prev) => (prev ? { ...prev, walletBalance: newBal } : null));
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col relative selection:bg-blue-600/20 selection:text-blue-900">
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
          {/* EN-TÊTE OFFICIEL DE L'APPLICATION (Masqué en mode plein écran Vidéo / Tognon) */}
          {activeTab !== "tognon" && (
            <Header
              isLoggedIn={currentUser !== null}
              currentLigneeName={
                !currentUser
                  ? undefined
                  : currentUser.role === "master_admin"
                  ? "SaaS Suprême Thron"
                  : currentUser.isMemberOfLignee
                  ? `Lignée ${currentUser.lignee}`
                  : "Communauté Thron"
              }
              courantName={currentUser?.courant}
              onOpenLogin={() => setLoginOpen(true)}
              onOpenRegister={() => setRegisterOpen(true)}
              onOpenMessenger={() => {
                if (!currentUser) setLoginOpen(true);
                else setAtinsaMessengerOpen(true);
              }}
              onOpenNotifications={() => {
                if (!currentUser) setLoginOpen(true);
                else setNotificationsOpen(true);
              }}
              onOpenProfile={() => {
                if (!currentUser) setLoginOpen(true);
                else setProfileOpen(true);
              }}
              onOpenWallet={() => {
                if (!currentUser) {
                  setLoginOpen(true);
                } else {
                  setActiveTab("outils");
                  setWalletViewOpen(true);
                }
              }}
              activeLanguage={activeLang}
              onLanguageChange={(l) => setActiveLang(l)}
              walletBalance={currentUser?.walletBalance ?? 0}
              userPhoto={currentUser?.photoUrl}
              userName={currentUser ? `${currentUser.prenom} ${currentUser.nom}` : undefined}
            />
          )}

          {/* BANDEAU DU LIEN OFFICIEL DE LA PAGE ACTUELLE (PERMALIEN VISIBLE & COPIE) */}
          {activeTab !== "tognon" && (
            <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 pt-2 pb-1 font-sans">
              <div className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Link2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide hidden sm:inline flex-shrink-0">
                    Lien de la page :
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-blue-700 font-semibold truncate select-all bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                    {currentPageUrl || (typeof window !== "undefined" ? `${window.location.origin}/?tab=${activeTab}` : `https://thronhounto.bj/?tab=${activeTab}`)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPageUrl}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 flex-shrink-0 shadow-sm"
                  title="Copier le lien direct de cette page"
                >
                  {urlCopied ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-white" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-white" />
                      <span>Copier le lien</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* CONTENU PRINCIPAL DE L'ONGLET SÉLECTIONNÉ */}
          <div className="flex-1 w-full max-w-7xl mx-auto py-2">
            {/* 1. TOGOUN (RÉSEAU SOCIAL) */}
            {activeTab === "togoun" && (
              <TogounFeed
                onOpenVideoImmersion={(videoId) => {
                  setTognonInitialVideoId(videoId || null);
                  handleTabChange("tognon");
                }}
                currentUser={currentUser}
                onOpenLogin={() => setLoginOpen(true)}
              />
            )}

            {/* 2. TOGNON (FIL VIDÉO SACRÉ & LIVES PLEIN ÉCRAN DÉDIÉ AVEC DÉFILEMENT INFINI ET AUTOPLAY STYLE TIKTOK) */}
            {activeTab === "tognon" && (
              <TognonVideoFeed
                initialVideoId={tognonInitialVideoId}
                onClose={() => {
                  setTognonInitialVideoId(null);
                  handleTabChange("togoun");
                }}
                currentUser={currentUser}
                onOpenLogin={() => setLoginOpen(true)}
                onOpenShareModal={(title, url) => {
                  setShareModalData({ isOpen: true, title, url });
                }}
              />
            )}

            {/* 3. THRONHI (MARKETPLACE SPIRITUELLE) */}
            {activeTab === "thronhi" && (
              <div className="space-y-4">
                {currentUser?.role === "seller" && (
                  <div className="max-w-4xl mx-auto px-3 sm:px-6 flex items-center justify-between bg-white/95 backdrop-blur-sm rounded-2xl p-3 border border-blue-200 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Store className="w-5 h-5 text-blue-600" />
                      <span className="text-xs font-bold text-[#0A1628]">
                        Espace Vendeur Certifié : Comptoir Sacré Alafia
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSellerViewMode("catalog")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer btn-press ${
                          sellerViewMode === "catalog"
                            ? "bg-[#0A1628] text-white shadow"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Articles en vente
                      </button>
                      <button
                        onClick={() => setSellerViewMode("dashboard")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer btn-press ${
                          sellerViewMode === "dashboard"
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Tableau de bord Vendeur & Séquestre
                      </button>
                    </div>
                  </div>
                )}

                {currentUser?.role === "seller" && sellerViewMode === "dashboard" ? (
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
                walletBalance={currentUser?.walletBalance ?? 0}
              />
            )}

            {/* 5. LIGNÉE (LANDING PAGE DE LA LIGNÉE / COURANTS SACRÉS SELON LES CONSIGNES STRICTES) */}
            {activeTab === "lignee" && (
              <div className="space-y-4">
                {/* Barre de navigation interne pour les fidèles et dignitaires de la lignée */}
                {currentUser?.isMemberOfLignee && (
                  <div className="max-w-5xl mx-auto px-3 sm:px-6 flex items-center justify-between bg-white/95 backdrop-blur-sm rounded-2xl p-2.5 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-blue-600" />
                      <span className="text-xs font-bold text-[#0A1628]">
                        {currentUser?.role === "lineage_admin"
                          ? `Espace Maître de Lignée • ${currentUser.lignee}`
                          : `Lignée Sacrée • ${currentUser.lignee}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setLineageViewMode("landing")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer btn-press ${
                          lineageViewMode === "landing"
                            ? "bg-[#0A1628] text-white shadow"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Landing Lignée
                      </button>

                      <button
                        onClick={() => setLineageViewMode("tree")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer btn-press ${
                          lineageViewMode === "tree"
                            ? "bg-[#0A1628] text-white shadow"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Arbre Tactile
                      </button>

                      {currentUser?.role === "lineage_admin" && (
                        <button
                          onClick={() => setLineageViewMode("dashboard")}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer btn-press ${
                            lineageViewMode === "dashboard"
                              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          Gestion & Annonces
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Affichage du mode sélectionné */}
                {currentUser?.isMemberOfLignee && lineageViewMode === "tree" ? (
                  <GenealogyTree
                    currentUserPhoto={currentUser?.photoUrl}
                    onUpdatePhoto={handlePhotoUpdate}
                  />
                ) : currentUser?.isMemberOfLignee && lineageViewMode === "dashboard" && currentUser?.role === "lineage_admin" ? (
                  <LineageAdminDashboard
                    onNavigateToTree={() => setLineageViewMode("tree")}
                    onNavigateToTogoun={() => setActiveTab("togoun")}
                  />
                ) : (
                  <LigneeLandingView
                    isMember={Boolean(currentUser?.isMemberOfLignee)}
                    currentUser={currentUser || undefined}
                    onOpenConsultationModal={() => {
                      if (!currentUser) setLoginOpen(true);
                      else setConsultationModalOpen(true);
                    }}
                    onOpenDonationModal={() => {
                      if (!currentUser) setLoginOpen(true);
                      else setDonationModalOpen(true);
                    }}
                    onOpenMemberRegistration={() => setRegisterOpen(true)}
                    onNavigateToCotisations={() => {
                      setActiveTab("outils");
                      setWalletViewOpen(false);
                    }}
                    onNavigateToTontines={() => {
                      setActiveTab("outils");
                      setWalletViewOpen(false);
                    }}
                  />
                )}
              </div>
            )}

            {/* 6. OUTILS (BOÎTE À OUTILS COMPLÈTE & CONSOLE MASTER ADMIN) */}
            {activeTab === "outils" && (
              <div className="space-y-4">
                {currentUser?.role === "master_admin" && (
                  <div className="max-w-4xl mx-auto px-3 sm:px-6">
                    <MasterAdminDashboard onNavigateToTab={(t) => setActiveTab(t as NavTab)} />
                  </div>
                )}

                <ToolsHub
                  initialToolView={walletViewOpen ? "wallet" : null}
                  currentUserRole={currentUser?.role}
                  currentUserGrade={currentUser?.grade}
                  currentUserLignee={currentUser?.lignee}
                  currentUserTemple={currentUser?.temple}
                  walletBalance={currentUser?.walletBalance ?? 0}
                  onBalanceUpdate={handleBalanceUpdate}
                  onNavigateToTree={() => setActiveTab("lignee")}
                  onNavigateToTogoun={() => setActiveTab("togoun")}
                />
              </div>
            )}
          </div>

          {/* BARRE DE MENU EN BAS : STRICTEMENT DANS L'ORDRE SUIVANT (Masquée en mode vidéo immersion) :
              Togoun, Tognon, Thronhi, Nouyin, Lignée et Outils */}
          {activeTab !== "tognon" && (
            <BottomNav
              activeTab={activeTab}
              onChangeTab={handleTabChange}
              isMemberOfLignee={Boolean(currentUser?.isMemberOfLignee)}
            />
          )}
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
          <div className="relative w-full max-w-3xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-blue-500/30 ring-1 ring-black/5">
            <div className="bg-[#0A1628] text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-600/30 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                </div>
                <h4 className="font-sans font-bold text-sm tracking-wide">Messagerie Sacrée Atinsa</h4>
              </div>
              <button
                onClick={() => setAtinsaMessengerOpen(false)}
                className="p-1.5 rounded-full text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-blue-500/20 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-bold text-base text-[#0A1628]">
                  Notifications du Hounto
                </h4>
              </div>
              <button
                onClick={() => setNotificationsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#0A1628]">Cérémonie d'Atinkindoudou</h5>
                  <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                    Rassemblement prévu ce dimanche 10h au temple principal Mantinkpon ò.
                  </p>
                  <span className="text-[10px] text-blue-600/70 font-semibold mt-1 block">Il y a 1 heure</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Wallet className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#0A1628]">Échéance de Cotisation</h5>
                  <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                    Prélèvement automatique de la cotisation mensuelle exécuté avec succès (5 000 F CFA).
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Hier</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setNotificationsOpen(false)}
              className="w-full py-3 bg-[#0A1628] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer btn-press"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* 8. MODALE PROFIL & ESPACE WORKSPACE DASHBOARD TIDEWELL COMPLET */}
      {profileOpen && currentUser && (
        <UserProfileDashboard
          isOpen={profileOpen}
          onClose={() => setProfileOpen(false)}
          currentUser={currentUser}
          onUpdateProfile={(updated) => {
            setCurrentUser((prev) => (prev ? { ...prev, ...updated } : null));
          }}
          onSwitchRole={(newRole) => {
            handleSwitchRole(newRole);
          }}
          onLogout={() => {
            setProfileOpen(false);
            setCurrentUser(null);
          }}
        />
      )}

      {/* 9. MODALE DE CONSULTATION SPIRITUELLE */}
      {consultationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-500/20 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setConsultationModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#0A1628]">
                  Consultation Oraculaire Thron
                </h3>
                <p className="text-xs text-slate-500">
                  Prenez rendez-vous avec un Dignitaire Hounnon de la Lignée
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Votre demande de consultation a été transmise avec succès au Dignitaire !");
                setConsultationModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Sélectionner le Dignitaire Référent
                </label>
                <select className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option>Togbé Mintoniu bo tozé (Togbegan daho - Siège Central)</option>
                  <option>Dah MONSIA Gbédan (Patriarche - Ouidah)</option>
                  <option>Hounnon Mahugnon DOSSOU (Grand Prêtre - Calavi)</option>
                  <option>Hounnon Houndégnon (Temple Alafia)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Motif spirituel de la consultation
                </label>
                <select className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option>Guidance d'orientation & Bénédiction de vie</option>
                  <option>Protection spirituelle familiale (Alafia)</option>
                  <option>Préparation aux rites d'Atinkindoudou</option>
                  <option>Purification & Dénouement d'entraves</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Mode de consultation souhaité
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <label className="p-3 rounded-xl border border-blue-500 bg-blue-50/70 flex items-center gap-2 cursor-pointer font-bold text-blue-900 transition-all">
                    <input type="radio" name="consult_type" defaultChecked className="accent-blue-600" />
                    <span>Présentiel au Temple</span>
                  </label>
                  <label className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2 cursor-pointer font-bold text-slate-700 hover:border-slate-300 transition-all">
                    <input type="radio" name="consult_type" className="accent-blue-600" />
                    <span>Visiophonie Atinsa</span>
                  </label>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Offrande rituelle de consultation
                  </span>
                  <span className="font-bold text-base text-[#0A1628]">10 000 FCFA</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-bold">
                  Portefeuille ou Mobile Money
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 transition-all cursor-pointer btn-press"
                >
                  Confirmer et Réserver ma Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 10. MODALE DE DON & OFFRANDE SACRÉE */}
      {donationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-300 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setDonationModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-thron-navy">
                  Faire un Don au Temple & Trône
                </h3>
                <p className="text-xs text-slate-500">
                  Soutenez les œuvres caritatives, cultuelles et la communauté
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Votre don a été reçu et enregistré sous séquestre avec bénédiction du Trône !");
                setDonationModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Affectation du don
                </label>
                <select className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800">
                  <option>Entretien du Sanctuaire & Lampes Perpétuelles</option>
                  <option>Soutien aux Orphelins & Veuves du Trône</option>
                  <option>Travaux d'Extension du Temple Central</option>
                  <option>Offrande d'Action de Grâce Alafia</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Montant de l'offrande (FCFA)
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {["2000", "5000", "10000", "25000"].map((montant) => (
                    <button
                      key={montant}
                      type="button"
                      className="py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-rose-400 hover:bg-rose-50/50 font-bold text-slate-700 text-center transition-colors cursor-pointer"
                    >
                      {montant} F
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Ou saisir un montant libre (ex: 50 000)"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Moyen de paiement sécurisé
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="p-3 rounded-xl border border-rose-300 bg-rose-50/50 flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input type="radio" name="pay_mode" defaultChecked className="accent-rose-600" />
                    <span>Mobile Money (Moneroo)</span>
                  </label>
                  <label className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input type="radio" name="pay_mode" className="accent-rose-600" />
                    <span>Portefeuille Sacré</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-xl font-bold shadow-md hover:from-rose-700 hover:to-rose-800 transition-all cursor-pointer"
                >
                  Faire mon Don avec Bénédiction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* 9. MODALE DE PARTAGE RÉSEAUX SOCIAUX */}
      {shareModalData.isOpen && (
        <SocialShareModal
          isOpen={shareModalData.isOpen}
          onClose={() => setShareModalData({ isOpen: false, title: "", url: "" })}
          title={shareModalData.title}
          url={shareModalData.url}
        />
      )}
    </main>
  );
}
