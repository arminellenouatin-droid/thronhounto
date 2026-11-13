"use client";

import React, { useState } from "react";
import {
  Crown,
  BookOpen,
  Music,
  Video,
  FileText,
  Upload,
  Radio,
  Coins,
  CreditCard,
  TrendingUp,
  BarChart3,
  Flame,
  Globe,
  Users,
  ShieldCheck,
  ShoppingBag,
  Store,
  Share2,
  Calendar,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Edit,
  Eye,
  Download,
  Lock,
  ArrowRight,
  Sparkles,
  Search,
  UserCheck,
  UserX,
  BadgePercent,
  Play,
  Layers,
  ChevronRight
} from "lucide-react";

export interface LineageManagerConsoleProps {
  onNavigateToTree?: () => void;
  onNavigateToTogoun?: () => void;
  onOpenLiveAgora?: () => void;
  walletBalance?: number;
}

export const LineageManagerConsole: React.FC<LineageManagerConsoleProps> = ({
  onNavigateToTree,
  onNavigateToTogoun,
  onOpenLiveAgora,
  walletBalance = 450000,
}) => {
  // Navigation entre les 8 grands onglets de la console du Maître de Lignée
  const [activeTab, setActiveTab] = useState<
    "overview" | "bibliotheque" | "tontines" | "lives" | "boost_annonces" | "boutique" | "arbre" | "droits"
  >("overview");

  // =========================================================================
  // 1. ÉTAT BIBLIOTHÈQUE SACRÉE (NOUYIN)
  // =========================================================================
  const [mediaList, setMediaList] = useState([
    {
      id: "med-1",
      title: "Chant Sacré Alafia • Rythme Zinli Traditionnel",
      type: "audio",
      category: "Liturgie Alafia",
      duration: "14:20",
      listens: 3420,
      downloads: 412,
      likes: 580,
      date: "12 Octobre 2026",
      access: "public",
    },
    {
      id: "med-2",
      title: "Enseignement Spirituel sur les 5 Piliers du Trône",
      type: "video",
      category: "Doctrine Initiatique",
      duration: "42:15",
      listens: 8900,
      downloads: 120,
      likes: 1420,
      date: "25 Octobre 2026",
      access: "hounnon",
    },
    {
      id: "med-3",
      title: "Guide Liturgique & Rituels de Consécration 2026 (PDF)",
      type: "document",
      category: "Documents Rituels",
      duration: "3.2 Mo",
      listens: 1850,
      downloads: 980,
      likes: 310,
      date: "02 Novembre 2026",
      access: "lignee",
    },
  ]);

  const [newMediaTitle, setNewMediaTitle] = useState("");
  const [newMediaType, setNewMediaType] = useState<"audio" | "video" | "document">("audio");
  const [newMediaAccess, setNewMediaAccess] = useState<"public" | "lignee" | "hounnon">("public");
  const [newMediaCategory, setNewMediaCategory] = useState("Liturgie Alafia");
  const [mediaPublishSuccess, setMediaPublishSuccess] = useState(false);

  const handlePublishMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaTitle.trim()) return;

    const newItem = {
      id: `med-${Date.now()}`,
      title: newMediaTitle.trim(),
      type: newMediaType,
      category: newMediaCategory,
      duration: newMediaType === "audio" ? "08:45" : newMediaType === "video" ? "25:00" : "1.8 Mo",
      listens: 0,
      downloads: 0,
      likes: 0,
      date: "À l'instant",
      access: newMediaAccess,
    };

    setMediaList([newItem, ...mediaList]);
    setNewMediaTitle("");
    setMediaPublishSuccess(true);
    setTimeout(() => setMediaPublishSuccess(false), 3000);
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm("Voulez-vous vraiment retirer ce média de votre bibliothèque de lignée ?")) {
      setMediaList(mediaList.filter((m) => m.id !== id));
    }
  };

  // =========================================================================
  // 2. ÉTAT TONTINES & COTISATIONS
  // =========================================================================
  const [tontinesList, setTontinesList] = useState([
    {
      id: "tont-1",
      nom: "Tontine d'Entraide Alafia Calavi",
      type: "tontine",
      montantPart: 25000,
      frequence: "Mensuelle",
      membresInscrits: 12,
      totalCollecte: 300000,
      prochainBeneficiaire: "Mahugnon DOSSOU",
      dateProchaine: "15 Novembre 2026",
      statut: "en_cours",
    },
    {
      id: "tont-2",
      nom: "Cotisation Rénovation Sanctuaire Central",
      type: "cotisation",
      montantPart: 10000,
      frequence: "Ponctuelle",
      membresInscrits: 48,
      totalCollecte: 480000,
      prochainBeneficiaire: "Caisse des Travaux Temple",
      dateProchaine: "30 Novembre 2026",
      statut: "en_cours",
    },
  ]);

  const [newTontineNom, setNewTontineNom] = useState("");
  const [newTontineType, setNewTontineType] = useState<"tontine" | "cotisation">("tontine");
  const [newTontineMontant, setNewTontineMontant] = useState(15000);
  const [newTontineFrequence, setNewTontineFrequence] = useState("Mensuelle");
  const [tontineCreateSuccess, setTontineCreateSuccess] = useState(false);

  const handleCreateTontine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTontineNom.trim()) return;

    const newT = {
      id: `tont-${Date.now()}`,
      nom: newTontineNom.trim(),
      type: newTontineType,
      montantPart: Number(newTontineMontant),
      frequence: newTontineFrequence,
      membresInscrits: 1,
      totalCollecte: Number(newTontineMontant),
      prochainBeneficiaire: "Premier tour attribué par tirage",
      dateProchaine: "Fin du mois",
      statut: "en_cours",
    };

    setTontinesList([newT, ...tontinesList]);
    setNewTontineNom("");
    setTontineCreateSuccess(true);
    setTimeout(() => setTontineCreateSuccess(false), 3000);
  };

  // =========================================================================
  // 3. ÉTAT LIVES AGORA & DIFFUSIONS
  // =========================================================================
  const [liveTitle, setLiveTitle] = useState("");
  const [liveScheduledDate, setLiveScheduledDate] = useState("");
  const [liveTemple, setLiveTemple] = useState("Temple Alafia Abomey-Calavi");
  const [liveLaunchedNotice, setLiveLaunchedNotice] = useState(false);

  const pastLives = [
    {
      id: "live-hist-1",
      titre: "Consécration des nouveaux initiés Atinkindouvi",
      date: "28 Octobre 2026",
      duree: "1h 45m",
      spectateursMax: 1420,
      donsRecus: "85 000 FCFA",
    },
    {
      id: "live-hist-2",
      titre: "Consultation collective du Fa & Oraisons de paix",
      date: "14 Octobre 2026",
      duree: "2h 10m",
      spectateursMax: 2150,
      donsRecus: "140 000 FCFA",
    },
  ];

  // =========================================================================
  // 4. ÉTAT BOOSTER DE PUBLICATION & ANNONCES
  // =========================================================================
  const [selectedPostToBoost, setSelectedPostToBoost] = useState("post-1");
  const [boostBudget, setBoostBudget] = useState(2500); // 2500 F = 25 000 personnes
  const [boostAudienceTarget, setBoostAudienceTarget] = useState("all");
  const [boostActivated, setBoostActivated] = useState(false);

  // Annonces & Cérémonies
  const [ceremonyNom, setCeremonyNom] = useState("");
  const [ceremonyDate, setCeremonyDate] = useState("");
  const [ceremonyTemple, setCeremonyTemple] = useState("Temple Alafia Abomey-Calavi");
  const [ceremonyDressCode, setCeremonyDressCode] = useState("Drap blanc sacré et perles Alafia");
  const [ceremonySuccess, setCeremonySuccess] = useState(false);

  // =========================================================================
  // 5. ÉTAT BOUTIQUE DE LIGNÉE & PRODUITS EN AFFILIATION
  // =========================================================================
  const [lineageProducts, setLineageProducts] = useState([
    {
      id: "prod-1",
      nom: "Drap Blanc Pur Sacré Alafia (Format Dignitaire)",
      prix: 35000,
      stock: 14,
      ventes: 28,
      commissionLignee: "100%",
    },
    {
      id: "prod-2",
      nom: "Collier de Perles Rituelles Mantinkpon Béni",
      prix: 18000,
      stock: 22,
      ventes: 45,
      commissionLignee: "100%",
    },
    {
      id: "prod-3",
      nom: "Encens Traditionnel de Purification Végétale",
      prix: 5000,
      stock: 50,
      ventes: 110,
      commissionLignee: "100%",
    },
  ]);

  const affiliateProducts = [
    {
      id: "aff-1",
      nom: "Livre Sacré : Les 42 Vérités de Thron Kpeto Deka Alafia",
      vendeur: "Éditions Suprêmes Thron",
      prix: 15000,
      commissionTaux: "25%",
      gainParVente: 3750,
      lienAffiliation: "https://thronhounto.bj/thronhi?ref=lignee-mantinkpon-livre",
    },
    {
      id: "aff-2",
      nom: "Gong Liturgique en Bronze Pur pour Temple",
      vendeur: "Forge Sacrée d'Abomey",
      prix: 45000,
      commissionTaux: "25%",
      gainParVente: 11250,
      lienAffiliation: "https://thronhounto.bj/thronhi?ref=lignee-mantinkpon-gong",
    },
  ];

  const [newProdNom, setNewProdNom] = useState("");
  const [newProdPrix, setNewProdPrix] = useState(10000);
  const [newProdStock, setNewProdStock] = useState(10);
  const [prodAddedSuccess, setProdAddedSuccess] = useState(false);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdNom.trim()) return;

    const newP = {
      id: `prod-${Date.now()}`,
      nom: newProdNom.trim(),
      prix: Number(newProdPrix),
      stock: Number(newProdStock),
      ventes: 0,
      commissionLignee: "100%",
    };

    setLineageProducts([newP, ...lineageProducts]);
    setNewProdNom("");
    setProdAddedSuccess(true);
    setTimeout(() => setProdAddedSuccess(false), 3000);
  };

  // =========================================================================
  // 6. ÉTAT ARBRE GÉNÉALOGIQUE & CRÉATION DE BRANCHES
  // =========================================================================
  const [lineageBranches, setLineageBranches] = useState([
    {
      id: "br-1",
      nomBranche: "Siège Central Mantinkpon ò (Trône Mère)",
      responsable: "Togbé Mintoniu bo tozé (Serge MONSIA)",
      temple: "Temple Alafia Abomey-Calavi",
      membresCount: 820,
      statut: "racine_principale",
    },
    {
      id: "br-2",
      nomBranche: "Branche Littorale • Cotonou & Akpakpa",
      responsable: "Dah Kpeto Gbedan",
      temple: "Temple Alafia Cotonou 1",
      membresCount: 340,
      statut: "branche_affiliee",
    },
    {
      id: "br-3",
      nomBranche: "Branche Historique d'Allada & Ouidah",
      responsable: "Hounnon Mahugnon DOSSOU",
      temple: "Temple Allada Sacré",
      membresCount: 290,
      statut: "branche_affiliee",
    },
  ]);

  const [newBranchNom, setNewBranchNom] = useState("");
  const [newBranchResponsable, setNewBranchResponsable] = useState("");
  const [newBranchTemple, setNewBranchTemple] = useState("");
  const [branchCreatedSuccess, setBranchCreatedSuccess] = useState(false);

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranchNom.trim() || !newBranchResponsable.trim()) return;

    const newBr = {
      id: `br-${Date.now()}`,
      nomBranche: newBranchNom.trim(),
      responsable: newBranchResponsable.trim(),
      temple: newBranchTemple.trim() || "Temple Affilié",
      membresCount: 1,
      statut: "branche_affiliee",
    };

    setLineageBranches([...lineageBranches, newBr]);
    setNewBranchNom("");
    setNewBranchResponsable("");
    setNewBranchTemple("");
    setBranchCreatedSuccess(true);
    setTimeout(() => setBranchCreatedSuccess(false), 3000);
  };

  // =========================================================================
  // 7. ÉTAT GROUPES & ATTRIBUTION DES DROITS
  // =========================================================================
  const [lineageGroups, setLineageGroups] = useState([
    {
      id: "grp-1",
      nom: "Cercle des Prêtres Hounnon de la Lignée",
      membres: 18,
      confidentialite: "Secret initiatique",
      animateur: "Hounnon Mahugnon DOSSOU",
    },
    {
      id: "grp-2",
      nom: "Chorale Liturgique & Chantres Zindo",
      membres: 64,
      confidentialite: "Membres Lignée",
      animateur: "Tassinon Pelagie TOSSOU",
    },
    {
      id: "grp-3",
      nom: "Jeunesse et Nouveaux Initiés Atinkindouvi",
      membres: 128,
      confidentialite: "Public Lignée",
      animateur: "Hounvi Kpodékon",
    },
  ]);

  const [newGroupNom, setNewGroupNom] = useState("");
  const [newGroupType, setNewGroupType] = useState("Membres Lignée");
  const [newGroupAnim, setNewGroupAnim] = useState("");
  const [groupCreatedSuccess, setGroupCreatedSuccess] = useState(false);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupNom.trim()) return;

    const newG = {
      id: `grp-${Date.now()}`,
      nom: newGroupNom.trim(),
      membres: 1,
      confidentialite: newGroupType,
      animateur: newGroupAnim.trim() || "Maître de Lignée",
    };

    setLineageGroups([...lineageGroups, newG]);
    setNewGroupNom("");
    setNewGroupAnim("");
    setGroupCreatedSuccess(true);
    setTimeout(() => setGroupCreatedSuccess(false), 3000);
  };

  // Membres et attribution de droits
  const [membersWithRoles, setMembersWithRoles] = useState([
    {
      id: "m-1",
      nom: "Mahugnon DOSSOU",
      grade: "Hounnon",
      temple: "Temple Calavi",
      roleAttribue: "Trésorier de Lignée & Responsable Tontines",
      droits: ["Gestion des tontines", "Encaissement des dîmes", "Accès caisse"],
    },
    {
      id: "m-2",
      nom: "Kpodékon Bienvenu",
      grade: "Hounvi",
      temple: "Temple Calavi",
      roleAttribue: "Modérateur Togoun & Relations Publiques",
      droits: ["Modération des publications", "Validation des commentaires"],
    },
    {
      id: "m-3",
      nom: "Pelagie TOSSOU",
      grade: "Tassinon",
      temple: "Temple Cotonou",
      roleAttribue: "Conservatrice Bibliothèque & Chœur Nouyin",
      droits: ["Publication audio/vidéo", "Organisation des chants"],
    },
  ]);

  return (
    <div className="space-y-6 font-sans animate-in fade-in duration-300">
      {/* ==================================================================== */}
      {/* EN-TÊTE SUPRÊME : CONSOLE DU MAÎTRE DE LIGNÉE                        */}
      {/* ==================================================================== */}
      <div className="bg-gradient-to-r from-[#0A1628] via-[#0F224A] to-[#0A1628] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-500/20 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 border border-blue-500/25 text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5" />
              Console Officielle du Responsable de Lignée
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">
              Togbé Mintoniu bo tozé • Lignée Mantinkpon ò
            </h2>
            <p className="text-xs text-blue-100/80 max-w-2xl leading-relaxed">
              Outils d'administration et de gouvernance intégrale : Bibliothèque de lignée, Tontines & cotisations, Directs Agora, Statistiques d'audience, Boost Togoun, Boutique & Affiliation 25%, Arbre généalogique et Attribution des droits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            <button
              onClick={onNavigateToTree}
              className="px-4 py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-300 transition-all shadow flex items-center gap-1.5 cursor-pointer"
            >
              <Users className="w-4 h-4" /> Arbre Tactile
            </button>
            <button
              onClick={() => {
                if (onOpenLiveAgora) onOpenLiveAgora();
                else setActiveTab("lives");
              }}
              className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all shadow flex items-center gap-1.5 cursor-pointer animate-pulse"
            >
              <Radio className="w-4 h-4" /> Studio Live Agora
            </button>
          </div>
        </div>

        {/* 8 ONGLETS DE NAVIGATION DANS LA CONSOLE DE GESTION */}
        <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap gap-1.5 text-xs font-bold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "overview" ? "bg-blue-600 text-white shadow" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Vue d'Ensemble & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab("bibliotheque")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "bibliotheque" ? "bg-blue-600 text-white shadow" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bibliothèque (Nouyin)</span>
          </button>

          <button
            onClick={() => setActiveTab("tontines")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "tontines" ? "bg-blue-600 text-white shadow" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Tontines & Cotisations</span>
          </button>

          <button
            onClick={() => setActiveTab("lives")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "lives" ? "bg-blue-600 text-white shadow" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-rose-300" />
            <span>Directs & Lives Agora</span>
          </button>

          <button
            onClick={() => setActiveTab("boost_annonces")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "boost_annonces" ? "bg-blue-600 text-white shadow" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-blue-200" />
            <span>Booster & Cérémonies</span>
          </button>

          <button
            onClick={() => setActiveTab("boutique")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "boutique" ? "bg-blue-600 text-white shadow" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Boutique & Affiliation</span>
          </button>

          <button
            onClick={() => setActiveTab("arbre")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "arbre" ? "bg-blue-600 text-white shadow" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Arbre & Branches</span>
          </button>

          <button
            onClick={() => setActiveTab("droits")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "droits" ? "bg-blue-600 text-white shadow" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Droits & Groupes</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 1. VUE D'ENSEMBLE & STATISTIQUES DU RÉSEAU SOCIAL                    */}
      {/* ==================================================================== */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Grille de statistiques clés */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
              <span className="text-xs text-slate-500 font-semibold block">Portée Réseau Social Togoun</span>
              <span className="text-2xl font-black text-thron-navy block mt-1">48 500</span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +24% ce mois
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
              <span className="text-xs text-slate-500 font-semibold block">Fidèles dans l'Arbre</span>
              <span className="text-2xl font-black text-blue-800 block mt-1">1 450</span>
              <span className="text-[10px] text-slate-500">Répartis sur 3 branches</span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
              <span className="text-xs text-slate-500 font-semibold block">Fonds Tontines & Dîmes</span>
              <span className="text-2xl font-black text-emerald-700 block mt-1">780 000 F</span>
              <span className="text-[10px] text-emerald-600 font-bold">2 tontines actives</span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
              <span className="text-xs text-slate-500 font-semibold block">Revenus Affiliation 25%</span>
              <span className="text-2xl font-black text-blue-700 block mt-1">142 500 F</span>
              <span className="text-[10px] text-blue-600 font-bold">Marketplace Thronhi</span>
            </div>
          </div>

          {/* Graphique de portée et interactions */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-thron-navy">
                  Performance de la Page de Lignée sur Togoun (30 derniers jours)
                </h3>
                <p className="text-xs text-slate-500">
                  Évolution hebdomadaire des vues de publications, visionnages de vidéos et partages.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("boost_annonces")}
                className="px-3.5 py-1.5 rounded-xl bg-blue-50/700 hover:bg-blue-600 text-thron-navy font-bold text-xs flex items-center gap-1 shadow-sm cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5" /> Booster ma page
              </button>
            </div>

            {/* Simulation barres de performance */}
            <div className="grid grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-center">
              <div className="space-y-1">
                <div className="h-24 bg-blue-100 rounded-xl relative flex items-end justify-center p-2">
                  <div className="w-full bg-thron-blue rounded-lg" style={{ height: "45%" }}></div>
                </div>
                <span className="text-[11px] font-bold text-slate-600">Semaine 1</span>
                <span className="text-[10px] text-slate-400 block">8 400 vues</span>
              </div>

              <div className="space-y-1">
                <div className="h-24 bg-blue-100 rounded-xl relative flex items-end justify-center p-2">
                  <div className="w-full bg-thron-blue rounded-lg" style={{ height: "65%" }}></div>
                </div>
                <span className="text-[11px] font-bold text-slate-600">Semaine 2</span>
                <span className="text-[10px] text-slate-400 block">12 100 vues</span>
              </div>

              <div className="space-y-1">
                <div className="h-24 bg-blue-100 rounded-xl relative flex items-end justify-center p-2">
                  <div className="w-full bg-thron-blue rounded-lg" style={{ height: "80%" }}></div>
                </div>
                <span className="text-[11px] font-bold text-slate-600">Semaine 3</span>
                <span className="text-[10px] text-slate-400 block">15 800 vues</span>
              </div>

              <div className="space-y-1">
                <div className="h-24 bg-blue-100 rounded-xl relative flex items-end justify-center p-2">
                  <div className="w-full bg-blue-50/700 rounded-lg" style={{ height: "95%" }}></div>
                </div>
                <span className="text-[11px] font-bold text-blue-900">Semaine 4 (Live)</span>
                <span className="text-[10px] text-blue-600 block">21 200 vues</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. GESTION DE LA BIBLIOTHÈQUE SACRÉE (NOUYIN)                         */}
      {/* ==================================================================== */}
      {activeTab === "bibliotheque" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Formulaire de publication sur Nouyin */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-serif font-bold text-base text-thron-navy">
                  Publier un Contenu dans la Bibliothèque de Lignée (Nouyin)
                </h3>
                <p className="text-xs text-slate-500">
                  Ajoutez un chant liturgique, un enregistrement audio de prières, une vidéo d'enseignement ou un texte sacré.
                </p>
              </div>
            </div>

            <form onSubmit={handlePublishMedia} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Titre de l'œuvre sacrée</label>
                  <input
                    type="text"
                    value={newMediaTitle}
                    onChange={(e) => setNewMediaTitle(e.target.value)}
                    placeholder="Ex: Cantique d'Harmonie et Bénédiction Alafia (Chœur Mantinkpon)"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-thron-navy"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Type de média</label>
                  <select
                    value={newMediaType}
                    onChange={(e) => setNewMediaType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-thron-navy"
                  >
                    <option value="audio">🎵 Audio Liturgique (Zindo)</option>
                    <option value="video">🎥 Vidéo d'Enseignement</option>
                    <option value="document">📄 Document / Livre PDF</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Catégorie spirituelle</label>
                  <input
                    type="text"
                    value={newMediaCategory}
                    onChange={(e) => setNewMediaCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-thron-navy"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Niveau d'accès initiatique</label>
                  <select
                    value={newMediaAccess}
                    onChange={(e) => setNewMediaAccess(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-thron-navy"
                  >
                    <option value="public">🌍 Public (Tous les visiteurs et fidèles)</option>
                    <option value="lignee">🏛️ Réservé aux Membres de la Lignée</option>
                    <option value="hounnon">👑 Secret — Dignitaires Hounnon uniquement</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <Upload className="w-4 h-4 text-thron-blue" />
                  <span>Fichier simulé prêt pour upload vers le stockage cloud sécurisé.</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-thron-navy hover:bg-thron-blue text-white rounded-xl font-bold transition-all shadow-sm cursor-pointer"
                >
                  Publier sur Nouyin
                </button>
              </div>

              {mediaPublishSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Contenu publié avec succès dans la Bibliothèque Nouyin de la Lignée !</span>
                </div>
              )}
            </form>
          </div>

          {/* Liste des médias existants de la Lignée */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-base text-thron-navy">
              Médias Actuellement Publiés par la Lignée ({mediaList.length})
            </h4>

            <div className="divide-y divide-slate-100 text-xs">
              {mediaList.map((m) => (
                <div key={m.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50/70 text-blue-600 border border-blue-200 flex items-center justify-center flex-shrink-0">
                      {m.type === "audio" ? <Music className="w-5 h-5" /> : m.type === "video" ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                    </div>
                    <div>
                      <strong className="text-thron-navy text-sm block">{m.title}</strong>
                      <span className="text-slate-500 text-[11px]">
                        {m.category} • {m.duration} • Publié le {m.date} •{" "}
                        <span className="font-semibold text-blue-600">
                          {m.access === "public" ? "Accès Libre" : m.access === "lignee" ? "Lignée Seule" : "Hounnon Secret"}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right text-[11px] text-slate-500">
                      <span className="block font-bold text-slate-800">{m.listens.toLocaleString()} écoutes</span>
                      <span>{m.downloads} téléchargements</span>
                    </div>

                    <button
                      onClick={() => handleDeleteMedia(m.id)}
                      className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Supprimer le média"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. TONTINES & COTISATIONS COUTUMIÈRES                                 */}
      {/* ==================================================================== */}
      {activeTab === "tontines" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Lancer une nouvelle tontine ou cotisation */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-serif font-bold text-base text-thron-navy">
                  Lancer une Tontine Rotative ou une Cotisation de Lignée
                </h3>
                <p className="text-xs text-slate-500">
                  Créez un cycle d'épargne solidaire entre dignitaires ou levez une cotisation pour les grands rituels du temple.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateTontine} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nom de l'opération</label>
                  <input
                    type="text"
                    value={newTontineNom}
                    onChange={(e) => setNewTontineNom(e.target.value)}
                    placeholder="Ex: Tontine Fraternelle des Hounvi Alafia"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-thron-navy focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Type d'opération financière</label>
                  <select
                    value={newTontineType}
                    onChange={(e) => setNewTontineType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-thron-navy focus:outline-none"
                  >
                    <option value="tontine">Tontine Rotative (Redistribution à chaque tour)</option>
                    <option value="cotisation">Cotisation Cérémonielle (Caisse Commune Temple)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Montant par part (F CFA)</label>
                  <input
                    type="number"
                    value={newTontineMontant}
                    onChange={(e) => setNewTontineMontant(Number(e.target.value))}
                    step="5000"
                    min="1000"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-thron-navy focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fréquence de cotisation</label>
                  <select
                    value={newTontineFrequence}
                    onChange={(e) => setNewTontineFrequence(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-thron-navy focus:outline-none"
                  >
                    <option value="Hebdomadaire">Hebdomadaire (Chaque dimanche au culte)</option>
                    <option value="Bimensuelle">Bimensuelle (Tous les 15 jours)</option>
                    <option value="Mensuelle">Mensuelle (Fin de mois)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-thron-navy hover:bg-thron-blue text-white rounded-xl font-bold transition-all shadow-sm cursor-pointer"
                >
                  Ouvrir la Tontine / Cotisation
                </button>
              </div>

              {tontineCreateSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Opération financière lancée avec succès ! Les fidèles de la lignée peuvent y souscrire.</span>
                </div>
              )}
            </form>
          </div>

          {/* Liste des tontines actives */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-base text-thron-navy">
              Cycles Actuellement en Cours dans la Lignée ({tontinesList.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {tontinesList.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                        {t.type === "tontine" ? "Tontine Rotative" : "Cotisation Temple"}
                      </span>
                      <h5 className="font-bold text-sm text-thron-navy mt-1">{t.nom}</h5>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      En cours
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Montant / Part :</span>
                      <strong className="text-slate-800">{t.montantPart.toLocaleString()} F CFA</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Total Collecté :</span>
                      <strong className="text-emerald-700">{t.totalCollecte.toLocaleString()} F CFA</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Participants :</span>
                      <strong className="text-slate-800">{t.membresInscrits} dignitaires</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Prochaine échéance :</span>
                      <strong className="text-blue-800">{t.dateProchaine}</strong>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => alert(`Rappels WhatsApp envoyés aux participants de ${t.nom}`)}
                      className="flex-1 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-bold text-[11px] cursor-pointer"
                    >
                      Envoyer Rappels
                    </button>
                    <button
                      onClick={() => alert(`Cycle et redistribution validés pour ${t.nom}`)}
                      className="flex-1 py-1.5 bg-thron-navy text-white hover:bg-thron-blue rounded-lg font-bold text-[11px] cursor-pointer"
                    >
                      Valider Clôture
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. DIRECTS & LIVES STUDIO AGORA                                      */}
      {/* ==================================================================== */}
      {activeTab === "lives" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-rose-600 animate-pulse" />
                <div>
                  <h3 className="font-serif font-bold text-base text-thron-navy">
                    Studio de Diffusion Agora • Directs Sacrés de Lignée
                  </h3>
                  <p className="text-xs text-slate-500">
                    Diffusez la liturgie et les oracles en direct pour les fidèles de la diaspora et les temples affiliés.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setLiveLaunchedNotice(true);
                  if (onOpenLiveAgora) onOpenLiveAgora();
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer active:scale-95 animate-pulse"
              >
                <Radio className="w-4 h-4" />
                <span>Démarrer un Direct Live Immédiat</span>
              </button>
            </div>

            {liveLaunchedNotice && (
              <div className="p-3 bg-rose-50 border border-rose-300 text-rose-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <Radio className="w-4 h-4 text-rose-600 flex-shrink-0 animate-pulse" />
                <span>Session Agora initialisée ! Votre diffusion en direct est active et signalée par le badge rouge sur Togoun.</span>
              </div>
            )}

            {/* Programmer un direct futur */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <span className="font-bold text-slate-800 block">Programmer une Célébration Liturgique en Direct :</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-500 text-[11px] mb-1">Titre de la retransmission</label>
                  <input
                    type="text"
                    value={liveTitle}
                    onChange={(e) => setLiveTitle(e.target.value)}
                    placeholder="Ex: Grande Veillée de Prières Alafia"
                    className="w-full p-2 bg-white rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 text-[11px] mb-1">Date et heure</label>
                  <input
                    type="datetime-local"
                    value={liveScheduledDate}
                    onChange={(e) => setLiveScheduledDate(e.target.value)}
                    className="w-full p-2 bg-white rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 text-[11px] mb-1">Temple hôte</label>
                  <input
                    type="text"
                    value={liveTemple}
                    onChange={(e) => setLiveTemple(e.target.value)}
                    className="w-full p-2 bg-white rounded-xl border border-slate-200"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => alert(`Direct programmé avec succès ! L'annonce est publiée sur Togoun pour le ${liveScheduledDate || "prochain dimanche"}.`)}
                  className="px-4 py-2 bg-thron-navy hover:bg-thron-blue text-white rounded-xl font-bold cursor-pointer"
                >
                  Programmer et Diffuser l'Annonce
                </button>
              </div>
            </div>
          </div>

          {/* Historique des Directs de la Lignée */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-base text-thron-navy">
              Historique des Directs Agora Passés
            </h4>
            <div className="divide-y divide-slate-100 text-xs">
              {pastLives.map((pl) => (
                <div key={pl.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <strong className="text-thron-navy text-sm block">{pl.titre}</strong>
                    <span className="text-slate-500 text-[11px]">Diffusé le {pl.date} • Durée : {pl.duree}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="px-2.5 py-1 bg-slate-100 rounded-full font-bold text-slate-700">
                      👥 {pl.spectateursMax} spectateurs max
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-100 rounded-full font-bold text-emerald-800">
                      💰 {pl.donsRecus} de dons
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 5. BOOSTER UNE PUBLICATION & PROGRAMMER UNE CÉRÉMONIE                */}
      {/* ==================================================================== */}
      {activeTab === "boost_annonces" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Simulateur de Boost de Publication Togoun */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-serif font-bold text-base text-thron-navy">
                  Booster une Publication de Lignée sur Togoun (100 F / 1 000 Personnes)
                </h3>
                <p className="text-xs text-slate-500">
                  Augmentez instantanément la visibilité d'un message sacré, d'un appel aux dons ou d'un événement.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sélectionner la publication à booster</label>
                  <select
                    value={selectedPostToBoost}
                    onChange={(e) => setSelectedPostToBoost(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="post-1">Bénédictions et préparation d'Atinkindoudou (Post récent)</option>
                    <option value="post-2">Appel aux dons pour la réfection du sanctuaire d'Alafia</option>
                    <option value="post-3">Vidéo des danses et percussions rituelles du couvent</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ciblage de l'audience</label>
                  <select
                    value={boostAudienceTarget}
                    onChange={(e) => setBoostAudienceTarget(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="all">🌍 Toute la communauté Thron (Bénin & International)</option>
                    <option value="initiés">📿 Dignitaires et initiés habilités</option>
                    <option value="diaspora">✈️ Diaspora et fidèles expatriés</option>
                  </select>
                </div>
              </div>

              {/* Slider de budget */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Budget alloué :</span>
                  <span className="text-base font-black text-blue-900">{boostBudget.toLocaleString()} F CFA</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="500"
                  value={boostBudget}
                  onChange={(e) => setBoostBudget(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                  <span>Portée estimée : <strong className="text-emerald-700">{(boostBudget * 10).toLocaleString()} personnes</strong></span>
                  <span>Solde disponible : <strong>{walletBalance.toLocaleString()} FCFA</strong></span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setBoostActivated(true);
                    setTimeout(() => setBoostActivated(false), 4000);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold shadow cursor-pointer flex items-center gap-2"
                >
                  <Flame className="w-4 h-4" /> Lancer la Campagne de Boost
                </button>
              </div>

              {boostActivated && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Campagne activée ! Votre publication est sponsorisée auprès de {(boostBudget * 10).toLocaleString()} fidèles.</span>
                </div>
              )}
            </div>
          </div>

          {/* Programmer une Cérémonie Sacrée */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-serif font-bold text-base text-thron-navy">
                  Programmer une Cérémonie Sacrée Officielle
                </h3>
                <p className="text-xs text-slate-500">
                  Déclarez un rituel ou une grande fête avec notification automatique sur l'Agenda des fidèles.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nom de la Cérémonie</label>
                <input
                  type="text"
                  value={ceremonyNom}
                  onChange={(e) => setCeremonyNom(e.target.value)}
                  placeholder="Ex: Grande Cérémonie d'Atinkindoudou Alafia"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Date et heure du rituel</label>
                <input
                  type="datetime-local"
                  value={ceremonyDate}
                  onChange={(e) => setCeremonyDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Temple organisateur</label>
                <input
                  type="text"
                  value={ceremonyTemple}
                  onChange={(e) => setCeremonyTemple(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tenue rituelle exigée (Dress Code)</label>
                <input
                  type="text"
                  value={ceremonyDressCode}
                  onChange={(e) => setCeremonyDressCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setCeremonySuccess(true);
                  setTimeout(() => setCeremonySuccess(false), 3000);
                }}
                className="px-6 py-2.5 bg-thron-navy hover:bg-thron-blue text-white rounded-xl font-bold text-xs cursor-pointer shadow"
              >
                Publier la Cérémonie sur l'Agenda Officiel
              </button>
            </div>

            {ceremonySuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Cérémonie inscrite à l'Agenda Sacré et notifiée à tous les membres de la lignée !</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 6. BOUTIQUE DE LIGNÉE & PRODUITS EN AFFILIATION (25%)                 */}
      {/* ==================================================================== */}
      {activeTab === "boutique" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Produits en Affiliation 25% */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BadgePercent className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-serif font-bold text-base text-thron-navy">
                    Produits Certifiés en Affiliation (Commission de 25% pour la Lignée)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Partagez ces articles auprès de vos membres. Chaque vente génère 25% de commission directe versée dans le wallet de la lignée.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {affiliateProducts.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/60 to-slate-50 border border-blue-200 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-thron-navy">{p.nom}</h4>
                      <span className="text-[11px] text-slate-500">Vendeur agréé : {p.vendeur}</span>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-600 text-white rounded-full font-black text-[10px]">
                      +25% Commission
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600">Prix public : <strong>{p.prix.toLocaleString()} F CFA</strong></span>
                    <span className="text-emerald-700 font-bold">Gain : +{p.gainParVente.toLocaleString()} F CFA / vente</span>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(p.lienAffiliation);
                      alert(`Lien d'affiliation copié !
${p.lienAffiliation}

Partagez-le sur WhatsApp ou Togoun pour toucher 25% sur chaque commande.`);
                    }}
                    className="w-full py-2 bg-thron-navy hover:bg-thron-blue text-white rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-blue-500" /> Copier mon Lien d'Affiliation
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Produits de la Boutique Propre à la Lignée */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-base text-thron-navy">
              Articles Rituels Vendus par le Comptoir de la Lignée ({lineageProducts.length})
            </h4>

            {/* Formulaire ajout article */}
            <form onSubmit={handleAddProduct} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <span className="font-bold text-slate-800 block">Mettre un nouvel article en vente :</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    value={newProdNom}
                    onChange={(e) => setNewProdNom(e.target.value)}
                    placeholder="Nom de l'article sacré..."
                    className="w-full p-2 bg-white rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={newProdPrix}
                    onChange={(e) => setNewProdPrix(Number(e.target.value))}
                    placeholder="Prix FCFA"
                    className="w-full p-2 bg-white rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    placeholder="Quantité en stock"
                    className="w-full p-2 bg-white rounded-xl border border-slate-200"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-thron-navy hover:bg-thron-blue text-white rounded-xl font-bold cursor-pointer"
                >
                  Ajouter à la Boutique
                </button>
              </div>

              {prodAddedSuccess && (
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold animate-in fade-in">
                  Article ajouté au comptoir de vente de la lignée !
                </div>
              )}
            </form>

            {/* Liste des produits en vente */}
            <div className="divide-y divide-slate-100 text-xs">
              {lineageProducts.map((lp) => (
                <div key={lp.id} className="py-3 flex justify-between items-center">
                  <div>
                    <strong className="text-thron-navy block text-sm">{lp.nom}</strong>
                    <span className="text-slate-500 text-[11px]">
                      Stock : {lp.stock} unités • {lp.ventes} ventes réalisées
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-900 block">{lp.prix.toLocaleString()} F CFA</span>
                    <span className="text-[10px] text-emerald-600 font-bold">100% revenus Lignée</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 7. ARBRE GÉNÉALOGIQUE & CRÉATION DE BRANCHES                         */}
      {/* ==================================================================== */}
      {activeTab === "arbre" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Créer une nouvelle branche dans l'arbre */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-serif font-bold text-base text-thron-navy">
                  Créer et Rapprocher une Nouvelle Branche dans l'Arbre Spirituel
                </h3>
                <p className="text-xs text-slate-500">
                  Rattachez un temple filial, un nouveau dignitaire ou une cellule géographique sous l'autorité du trône de la Lignée.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateBranch} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nom de la Branche</label>
                  <input
                    type="text"
                    value={newBranchNom}
                    onChange={(e) => setNewBranchNom(e.target.value)}
                    placeholder="Ex: Branche Atlantique • Ouidah Sud"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Dignitaire Responsable (Hounnon)</label>
                  <input
                    type="text"
                    value={newBranchResponsable}
                    onChange={(e) => setNewBranchResponsable(e.target.value)}
                    placeholder="Ex: Hounnon Agbégninou"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Temple d'Attache</label>
                  <input
                    type="text"
                    value={newBranchTemple}
                    onChange={(e) => setNewBranchTemple(e.target.value)}
                    placeholder="Ex: Temple Alafia Ouidah"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-thron-navy hover:bg-thron-blue text-white rounded-xl font-bold cursor-pointer shadow transition-colors"
                >
                  Ajouter la Branche à l'Arbre
                </button>
              </div>

              {branchCreatedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Branche spirituelle rattachée avec succès et synchronisée dans l'Arbre Généalogique tactile !</span>
                </div>
              )}
            </form>
          </div>

          {/* Liste des branches existantes */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-base text-thron-navy">
                Branches Spirituelles Actives ({lineageBranches.length})
              </h4>
              <button
                onClick={onNavigateToTree}
                className="text-xs font-bold text-thron-blue hover:underline flex items-center gap-1 cursor-pointer"
              >
                Ouvrir l'Arbre Tactile Plein Écran <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {lineageBranches.map((br) => (
                <div key={br.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        br.statut === "racine_principale" ? "bg-blue-100 text-blue-900 border border-blue-300" : "bg-blue-100 text-blue-800"
                      }`}>
                        {br.statut === "racine_principale" ? "Trône Mère" : "Branche Rattachée"}
                      </span>
                      <strong className="text-thron-navy text-sm">{br.nomBranche}</strong>
                    </div>
                    <span className="text-slate-500 text-[11px] block mt-1">
                      Responsable : <strong>{br.responsable}</strong> • {br.temple}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-slate-700 font-bold">
                      👥 {br.membresCount} fidèles
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 8. ATTRIBUTION DES DROITS & GROUPES                                  */}
      {/* ==================================================================== */}
      {activeTab === "droits" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Attribution de Droits et Rôles Spécifiques */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-serif font-bold text-base text-thron-navy">
                  Déléguer des Responsabilités & Attribuer des Droits aux Membres
                </h3>
                <p className="text-xs text-slate-500">
                  Désignez des trésoriers pour les tontines, des modérateurs pour le réseau social Togoun ou des gestionnaires de la bibliothèque.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {membersWithRoles.map((m) => (
                <div key={m.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-thron-navy text-sm">{m.nom}</strong>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold">
                        {m.grade}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-thron-blue block mt-0.5">
                      Rôle délégué : {m.roleAttribue}
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {m.droits.map((d, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-600">
                          ✓ {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const newRole = prompt(`Modifier le rôle de ${m.nom} :`, m.roleAttribue);
                      if (newRole && newRole.trim()) {
                        setMembersWithRoles(membersWithRoles.map((item) => item.id === m.id ? { ...item, roleAttribue: newRole.trim() } : item));
                        alert(`Rôle mis à jour pour ${m.nom} !`);
                      }
                    }}
                    className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    Modifier les Droits
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Créer et Gérer les Groupes de Lignée */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-base text-thron-navy">
              Groupes & Cercles de la Lignée ({lineageGroups.length})
            </h4>

            {/* Formulaire création de groupe */}
            <form onSubmit={handleCreateGroup} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <span className="font-bold text-slate-800 block">Créer un nouveau Cercle ou Groupe :</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    value={newGroupNom}
                    onChange={(e) => setNewGroupNom(e.target.value)}
                    placeholder="Nom du groupe (ex: Chorale Zindo)..."
                    className="w-full p-2 bg-white rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div>
                  <select
                    value={newGroupType}
                    onChange={(e) => setNewGroupType(e.target.value)}
                    className="w-full p-2 bg-white rounded-xl border border-slate-200"
                  >
                    <option value="Membres Lignée">Membres de la Lignée (Tous)</option>
                    <option value="Secret initiatique">Secret — Dignitaires uniquement</option>
                    <option value="Public Lignée">Public (Accessible à tous les fidèles)</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    value={newGroupAnim}
                    onChange={(e) => setNewGroupAnim(e.target.value)}
                    placeholder="Nom de l'animateur..."
                    className="w-full p-2 bg-white rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-thron-navy hover:bg-thron-blue text-white rounded-xl font-bold cursor-pointer"
                >
                  Créer le Groupe
                </button>
              </div>

              {groupCreatedSuccess && (
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold animate-in fade-in">
                  Groupe créé avec succès dans l'espace de la lignée !
                </div>
              )}
            </form>

            {/* Liste des groupes existants */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {lineageGroups.map((g) => (
                <div key={g.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <strong className="text-thron-navy text-sm font-bold block">{g.nom}</strong>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                      {g.membres} membres
                    </span>
                  </div>
                  <span className="text-slate-500 text-[11px] block">
                    Accès : <strong>{g.confidentialite}</strong>
                  </span>
                  <span className="text-slate-500 text-[11px] block">
                    Animateur : <strong>{g.animateur}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
