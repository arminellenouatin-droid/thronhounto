"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Lock,
  Download,
  FileText,
  Headphones,
  CheckCircle2,
  ShieldCheck,
  Star,
  Play,
  Volume2,
  Video,
  Music,
  Clock,
  Eye,
  Sliders,
  Wallet,
  ArrowRight,
  Plus,
  BarChart3,
  X,
  AlertCircle,
  Heart,
  MessageSquare,
  Share2,
  Send,
} from "lucide-react";
import { SocialShareModal } from "./SocialShareModal";

export type NouyinMediaType = "audio" | "video";

export interface NouyinItem {
  id: string;
  titre: string;
  type: NouyinMediaType;
  categorie: string;
  sousCategorie: string;
  dureeMinutes: number;
  intervenant: string;
  intervenantGrade: string;
  editeurLignee: string;
  imageUrl: string;
  nbEcoutesVues: number;
  nbTelechargements: number;
  tempsVisionnageHeures?: number; // Heures cumulées de visionnage pour les vidéos
  tempsEcouteHeures?: number;     // Heures cumulées d'écoute pour les audios
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  userLiked?: boolean;
  description: string;
  prixMinuteFCFA: number;
  prixTelechargementFCFA: number;
}

export const BibliothequeAndZindo: React.FC<{ userPlan?: string; walletBalance?: number }> = ({
  userPlan = "Assiata",
  walletBalance = 45000,
}) => {
  // Bascule principale : "audio" (MP3) ou "video" (Vidéos)
  const [mediaType, setMediaType] = useState<NouyinMediaType>("audio");

  // Onglet : "mediatheque" (catalogue public), "editeur" (espace lignée), "admin" (super admin tarifs)
  const [activeTab, setActiveTab] = useState<"mediatheque" | "editeur" | "admin">("mediatheque");

  // Filtre catégorie
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  // Quotas gratuits consommés
  const [freeAudiosUsed, setFreeAudiosUsed] = useState(2); // sur 5 max
  const [freeVideosUsed, setFreeVideosUsed] = useState(1); // sur 2 max

  // Lecteur actif
  const [activeItem, setActiveItem] = useState<NouyinItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPayModal, setShowPayModal] = useState<{ item: NouyinItem; action: "lecture" | "telechargement" } | null>(null);

  // Espace Éditeur : Déposer un média
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitre, setNewTitre] = useState("");
  const [newType, setNewType] = useState<NouyinMediaType>("audio");
  const [newCat, setNewCat] = useState("Enseignements des Fondateurs");
  const [newDuree, setNewDuree] = useState(15);
  const [newIntervenant, setNewIntervenant] = useState("Hounnon Ayikodji MONSIA");

  // Données de base
  const categories = [
    "Tous",
    "Enseignements des Fondateurs",
    "Cantiques & Louanges Sacrées",
    "Rituels & Cérémonies Yesoufifo",
    "Conseils des Hounnon",
  ];

  const [medias, setMedias] = useState<NouyinItem[]>([
    {
      id: "media-1",
      titre: "Élévation Spirituelle & Paroles d'Alafia (Récitation Sacrée)",
      type: "audio",
      categorie: "Cantiques & Louanges Sacrées",
      sousCategorie: "Chants d'Harmonie",
      dureeMinutes: 24,
      intervenant: "Togbé Mintoniu bo tozé",
      intervenantGrade: "Togbegan daho",
      editeurLignee: "Lignée Mantinkpon ò",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
      nbEcoutesVues: 3420,
      nbTelechargements: 480,
      tempsEcouteHeures: 142,
      likesCount: 890,
      commentsCount: 76,
      sharesCount: 54,
      userLiked: false,
      description: "Récitation des invocations matinales sacrées en langue fongbe avec résonance de gong et clochettes rituelles.",
      prixMinuteFCFA: 15,
      prixTelechargementFCFA: 1000,
    },
    {
      id: "media-2",
      titre: "Origines et Secrets des Fétiches Thron, Zogbé et Sacla",
      type: "audio",
      categorie: "Enseignements des Fondateurs",
      sousCategorie: "Histoire Sacrée",
      dureeMinutes: 45,
      intervenant: "Feu Mantinkpon ò Adjikanmahoutokounon MONSIA",
      intervenantGrade: "Fondateur Originel",
      editeurLignee: "Lignée Mantinkpon ò",
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
      nbEcoutesVues: 5890,
      nbTelechargements: 920,
      tempsEcouteHeures: 380,
      likesCount: 1420,
      commentsCount: 112,
      sharesCount: 98,
      userLiked: true,
      description: "Enregistrement d'archives inestimable du vénérable ancêtre fondateur détaillant l'implantation du trône sacré.",
      prixMinuteFCFA: 15,
      prixTelechargementFCFA: 1000,
    },
    {
      id: "media-3",
      titre: "Chants des Cérémonies d'Atinkindoudou au Temple Alafia",
      type: "audio",
      categorie: "Rituels & Cérémonies Yesoufifo",
      sousCategorie: "Musique Rituelle",
      dureeMinutes: 18,
      intervenant: "Chœur des Hounvis",
      intervenantGrade: "Communauté de Temple",
      editeurLignee: "Lignée Mantinkpon ò",
      imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80",
      nbEcoutesVues: 1950,
      nbTelechargements: 280,
      tempsEcouteHeures: 95,
      likesCount: 520,
      commentsCount: 38,
      sharesCount: 31,
      userLiked: false,
      description: "Polyphonies sacrées et percussions rituelles pour les cérémonies d'ouverture dominicale.",
      prixMinuteFCFA: 15,
      prixTelechargementFCFA: 1000,
    },
    {
      id: "media-4",
      titre: "Grande Cérémonie d'Atinkindoudou et Libations aux Ancêtres",
      type: "video",
      categorie: "Rituels & Cérémonies Yesoufifo",
      sousCategorie: "Vidéos de Cultes",
      dureeMinutes: 38,
      intervenant: "Togbé Mintoniu bo tozé",
      intervenantGrade: "Togbegan daho",
      editeurLignee: "Lignée Mantinkpon ò",
      imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&auto=format&fit=crop&q=80",
      nbEcoutesVues: 4120,
      nbTelechargements: 310,
      tempsVisionnageHeures: 260,
      likesCount: 1150,
      commentsCount: 95,
      sharesCount: 82,
      userLiked: false,
      description: "Captation vidéo haute définition des offrandes sacrées et des danses d'allégresse au Hounto principal.",
      prixMinuteFCFA: 35,
      prixTelechargementFCFA: 2000,
    },
    {
      id: "media-5",
      titre: "Exhortation Solennelle sur la Pureté Morale et la Vérité",
      type: "video",
      categorie: "Conseils des Hounnon",
      sousCategorie: "Prêches d'Alafia",
      dureeMinutes: 22,
      intervenant: "Hounnon Ayikodji MONSIA",
      intervenantGrade: "Hounnon",
      editeurLignee: "Lignée Mantinkpon ò",
      imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
      nbEcoutesVues: 2650,
      nbTelechargements: 195,
      tempsVisionnageHeures: 148,
      likesCount: 730,
      commentsCount: 44,
      sharesCount: 39,
      userLiked: false,
      description: "Conseils pratiques pour la vie quotidienne, le commerce honnête et la concorde dans le foyer d'un Hounvi.",
      prixMinuteFCFA: 35,
      prixTelechargementFCFA: 2000,
    },
  ]);

  // Partage réseaux sociaux
  const [shareModalData, setShareModalData] = useState<{
    isOpen: boolean;
    title: string;
    imageUrl?: string;
    itemId?: string;
  }>({ isOpen: false, title: "" });

  // Modale de commentaires pour un média
  const [commentsModalItem, setCommentsModalItem] = useState<NouyinItem | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [mediaComments, setMediaComments] = useState<
    Record<string, { id: string; author: string; text: string; time: string }[]>
  >({
    "media-1": [
      {
        id: "cm-1",
        author: "Hounvi Mahougnon",
        text: "Ces récitations apportent une paix immense dans le cœur et la demeure. Alafia !",
        time: "Il y a 2h",
      },
      {
        id: "cm-2",
        author: "Agbilinon Dossou",
        text: "Merci à la lignée Mantinkpon pour cet enregistrement précieux.",
        time: "Il y a 5h",
      },
    ],
    "media-2": [
      {
        id: "cm-3",
        author: "Hounnon Kpodékon",
        text: "Archive inestimable de notre grand ancêtre. À écouter avec respect absolu.",
        time: "Hier",
      },
    ],
    "media-4": [
      {
        id: "cm-4",
        author: "Sodji Alafia",
        text: "Les pas de danse et les libations sont filmés avec une clarté divine.",
        time: "Il y a 1 jour",
      },
    ],
  });

  const handleToggleLike = (itemId: string) => {
    setMedias((prev) =>
      prev.map((m) => {
        if (m.id !== itemId) return m;
        const nextLiked = !m.userLiked;
        return {
          ...m,
          userLiked: nextLiked,
          likesCount: m.likesCount + (nextLiked ? 1 : -1),
        };
      })
    );
    if (activeItem && activeItem.id === itemId) {
      setActiveItem((prev) =>
        prev
          ? {
              ...prev,
              userLiked: !prev.userLiked,
              likesCount: prev.likesCount + (!prev.userLiked ? 1 : -1),
            }
          : null
      );
    }
  };

  const handleOpenShare = (item: NouyinItem) => {
    setShareModalData({
      isOpen: true,
      title: `${item.titre} - ${item.intervenant} (${item.editeurLignee})`,
      imageUrl: item.imageUrl,
      itemId: item.id,
    });
  };

  const handleAddComment = (itemId: string) => {
    if (!commentInput.trim()) return;
    const newCm = {
      id: `cm-${Date.now()}`,
      author: "MONSIA Serge (Togbegan daho)",
      text: commentInput.trim(),
      time: "À l'instant",
    };
    setMediaComments((prev) => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), newCm],
    }));
    setMedias((prev) =>
      prev.map((m) => (m.id === itemId ? { ...m, commentsCount: m.commentsCount + 1 } : m))
    );
    if (activeItem && activeItem.id === itemId) {
      setActiveItem((prev) => (prev ? { ...prev, commentsCount: prev.commentsCount + 1 } : null));
    }
    setCommentInput("");
  };

  // Filtrer par catégorie
  // Les contenus en haut sont les plus téléchargés, les plus écoutés, les plus vus (Règle §3)
  const filteredMedias = medias
    .filter(m => selectedCategory === "Tous" || m.categorie === selectedCategory)
    .sort((a, b) => (b.nbEcoutesVues + b.nbTelechargements * 2) - (a.nbEcoutesVues + a.nbTelechargements * 2));

  const handlePlayMedia = (item: NouyinItem) => {
    // Incrémenter le compteur de vues/écoutes
    setMedias((prev) =>
      prev.map((m) => (m.id === item.id ? { ...m, nbEcoutesVues: m.nbEcoutesVues + 1 } : m))
    );

    // Vérifier les quotas gratuits
    const isFreeAvailable = item.type === "audio" ? freeAudiosUsed < 5 : freeVideosUsed < 2;

    if (isFreeAvailable) {
      if (item.type === "audio") setFreeAudiosUsed(prev => prev + 1);
      else setFreeVideosUsed(prev => prev + 1);

      setActiveItem({ ...item, nbEcoutesVues: item.nbEcoutesVues + 1 });
      setIsPlaying(true);
    } else {
      // Quota dépassé : afficher modale de facturation au tarif minute
      setShowPayModal({ item, action: "lecture" });
    }
  };

  const handleDownloadClick = (item: NouyinItem) => {
    // Incrémenter le compteur de téléchargements
    setMedias((prev) =>
      prev.map((m) => (m.id === item.id ? { ...m, nbTelechargements: m.nbTelechargements + 1 } : m))
    );
    setShowPayModal({ item, action: "telechargement" });
  };

  const handleConfirmPayment = () => {
    if (!showPayModal) return;
    const { item, action } = showPayModal;
    const cost = action === "telechargement" ? item.prixTelechargementFCFA : item.prixMinuteFCFA * item.dureeMinutes;
    const editeurShare = Math.round(cost * 0.75);
    const platformShare = cost - editeurShare;

    alert(
      `Paiement validé : ${cost} FCFA débités de votre Wallet.\n• 75% (${editeurShare} FCFA) versés à l'éditeur (${item.editeurLignee})\n• 25% (${platformShare} FCFA) commission plateforme.`
    );
    setShowPayModal(null);
    if (action === "lecture") {
      setActiveItem(item);
      setIsPlaying(true);
    }
  };

  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    const created: NouyinItem = {
      id: `media-${Date.now()}`,
      titre: newTitre,
      type: newType,
      categorie: newCat,
      sousCategorie: "Enseignement Général",
      dureeMinutes: newDuree,
      intervenant: newIntervenant,
      intervenantGrade: "Hounnon",
      editeurLignee: "Lignée Mantinkpon ò",
      imageUrl: newType === "audio"
        ? "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&auto=format&fit=crop&q=80",
      nbEcoutesVues: 1,
      nbTelechargements: 0,
      tempsEcouteHeures: newType === "audio" ? 0 : undefined,
      tempsVisionnageHeures: newType === "video" ? 0 : undefined,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      userLiked: false,
      description: "Nouvel enregistrement sacré téléversé par la Lignée.",
      prixMinuteFCFA: newType === "audio" ? 15 : 35,
      prixTelechargementFCFA: newType === "audio" ? 1000 : 2000,
    };
    setMedias([created, ...medias]);
    setShowUploadModal(false);
    setNewTitre("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-3 space-y-4 font-sans">
      {/* 1. EN-TÊTE NOUYIN & BASCULE MP3 ↔ VIDÉO */}
      <div className="bg-[#0A1628] rounded-3xl p-5 sm:p-6 text-white shadow-xl border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-400/30 text-blue-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-black text-xl sm:text-2xl text-white">
                Nouyin thronton
              </h2>
            </div>
          </div>

          {/* Navigation supérieure : Catalogue, Espace Éditeur, Super-Admin */}
          <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-2xl text-xs">
            <button
              onClick={() => setActiveTab("mediatheque")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all btn-press ${
                activeTab === "mediatheque" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-white/80 hover:text-white"
              }`}
            >
              Médiathèque
            </button>
            <button
              onClick={() => setActiveTab("editeur")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all btn-press ${
                activeTab === "editeur" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-white/80 hover:text-white"
              }`}
            >
              Espace Éditeur (Lignée)
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all btn-press ${
                activeTab === "admin" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-white/80 hover:text-white"
              }`}
            >
              Tarifs & Quotas
            </button>
          </div>
        </div>
      </div>

      {/* 2. ONGLET MÉDIATHÈQUE PUBLIQUE : CARROUSEL INFINI CLASSÉ */}
      {activeTab === "mediatheque" && (
        <div className="space-y-4">
          {/* Filtres de catégories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-thron-navy text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Carrousel infini de cartes médias */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {filteredMedias.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-thron-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Miniature & Badges */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Bouton Play central */}
                  <button
                    onClick={() => handlePlayMedia(item)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform btn-press cursor-pointer"
                    title="Écouter / Visionner"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>

                  {/* Badge Durée et Type */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-300" /> {item.dureeMinutes} min
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                      item.type === "video" ? "bg-blue-600 text-white" : "bg-slate-800 text-white"
                    }`}>
                      {item.type === "video" ? "Vidéo HD" : "Audio MP3"}
                    </span>
                  </div>

                  {/* Badges Temps cumulé et Vues/Écoutes */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-white font-bold">
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm flex items-center gap-1 text-blue-300">
                      {item.type === "video" ? (
                        <>🎬 {item.tempsVisionnageHeures || 0}h visionnées</>
                      ) : (
                        <>🎧 {item.tempsEcouteHeures || 0}h écoutées</>
                      )}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm flex items-center gap-1 text-emerald-300">
                      <Eye className="w-3 h-3" /> {item.nbEcoutesVues.toLocaleString()} vues
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                      {item.categorie}
                    </span>
                    <h4 className="font-bold text-sm text-[#0A1628] line-clamp-2 mt-0.5">
                      {item.titre}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-[11px] flex items-center justify-between text-slate-600">
                    <span className="font-bold text-[#0A1628] line-clamp-1">{item.intervenant}</span>
                    <span className="text-[10px] text-slate-400">{item.editeurLignee}</span>
                  </div>

                  {/* Bandeau des compteurs détaillés (Téléchargements, Vues, Heures) */}
                  <div className="grid grid-cols-3 gap-1 py-1.5 px-2 bg-slate-50 rounded-xl border border-slate-100 text-[10px] text-slate-600 text-center font-medium">
                    <div className="flex flex-col items-center">
                      <span className="text-slate-400 text-[9px]">Téléchargés</span>
                      <strong className="text-[#0A1628] font-bold flex items-center gap-0.5">
                        <Download className="w-2.5 h-2.5 text-blue-600" /> {item.nbTelechargements}
                      </strong>
                    </div>
                    <div className="flex flex-col items-center border-x border-slate-200">
                      <span className="text-slate-400 text-[9px]">Vues / Écoutes</span>
                      <strong className="text-[#0A1628] font-bold flex items-center gap-0.5">
                        <Eye className="w-2.5 h-2.5 text-emerald-600" /> {item.nbEcoutesVues}
                      </strong>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-slate-400 text-[9px]">{item.type === "video" ? "Visionnage" : "Écoute"}</span>
                      <strong className="text-[#0A1628] font-bold flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5 text-blue-600" /> {item.type === "video" ? `${item.tempsVisionnageHeures || 0}h` : `${item.tempsEcouteHeures || 0}h`}
                      </strong>
                    </div>
                  </div>

                  {/* Barre d'interaction sociale (J'aime, Commentaires, Partage) */}
                  <div className="flex items-center justify-between py-1 border-t border-slate-100 text-slate-600">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleLike(item.id)}
                        className={`flex items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                          item.userLiked ? "text-rose-600" : "text-slate-500 hover:text-rose-600"
                        }`}
                        title="J'aime"
                      >
                        <Heart className={`w-3.5 h-3.5 ${item.userLiked ? "fill-current" : ""}`} />
                        <span>{item.likesCount}</span>
                      </button>

                      <button
                        onClick={() => setCommentsModalItem(item)}
                        className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-thron-blue transition-all cursor-pointer"
                        title="Commentaires"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{item.commentsCount}</span>
                      </button>

                      <button
                        onClick={() => handleOpenShare(item)}
                        className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-all cursor-pointer"
                        title="Partager sur les réseaux sociaux"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{item.sharesCount}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handlePlayMedia(item)}
                        className="p-1.5 px-2.5 rounded-xl bg-thron-blue hover:bg-thron-navy text-white text-[11px] font-bold flex items-center gap-1 transition-colors shadow-sm cursor-pointer"
                        title="Lire"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Lire</span>
                      </button>
                      <button
                        onClick={() => handleDownloadClick(item)}
                        className="p-1.5 px-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Télécharger"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Tarifs */}
                  <div className="pt-1.5 flex items-center justify-between border-t border-slate-100 text-[11px]">
                    <span className="text-slate-400">Tarifs :</span>
                    <span className="font-bold text-thron-navy">
                      {item.prixMinuteFCFA} F/min • {item.prixTelechargementFCFA} F
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ONGLET ESPACE ÉDITEUR (LIGNÉES & TEMPLES) */}
      {activeTab === "editeur" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-thron-navy">
                  Espace Éditeur de Médias de la Lignée
                </h3>
                <p className="text-xs text-slate-600">
                  Réservé aux comptes autorisés. Rémunération directe de 75% sur toutes les écoutes et téléchargements.
                </p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-3.5 py-2 bg-thron-blue text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" /> Déposer un Média (MP3 / Vidéo)
              </button>
            </div>

            {/* Tableau de bord financier de l'éditeur (75% / 25%) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Écoutes & Vues</span>
                <span className="text-xl font-black text-[#0A1628] mt-1 block">11 260</span>
                <span className="text-[10px] text-slate-500">Minutes consommées : 84 500 min</span>
              </div>
              <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-200">
                <span className="text-[10px] font-bold text-blue-700 uppercase block">Téléchargements Réalisés</span>
                <span className="text-xl font-black text-[#0A1628] mt-1 block">1 695</span>
                <span className="text-[10px] text-slate-500">Audios MP3 & Vidéos HD</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-700 uppercase block">Gains Nets Éditeur (75%)</span>
                <span className="text-xl font-black text-[#0A1628] mt-1 block">945 000 FCFA</span>
                <span className="text-[10px] text-blue-600 font-medium">Reversés sur votre Wallet</span>
              </div>
            </div>

            {/* Déclaration de droits */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-[#0A1628]">Partage des revenus garanti par contrat numérique :</p>
              <p className="text-[11px] leading-relaxed">
                Avant tout versement, la plateforme prélève 25% de commission technique et d'infrastructure. Les 75% restants sont crédités instantanément dans votre portefeuille FCFA avec possibilité de retrait Mobile Money.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. ONGLET RÉGLAGES TARIFS & QUOTAS (SUPER-ADMINISTRATEUR) */}
      {activeTab === "admin" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#0A1628]" />
              <h3 className="font-bold text-base text-[#0A1628]">
                Configuration des Prix & Catégories (Super-Admin)
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              Seul le compte super administrateur de tout le SaaS configure les catégories et les 4 tarifs de base applicables.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-[#0A1628] flex items-center gap-1.5">
                  <Headphones className="w-4 h-4 text-blue-600" /> Tarification Audio MP3
                </h4>
                <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                  <span className="text-slate-600">Écoute par minute :</span>
                  <strong className="text-[#0A1628]">15 FCFA / min</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Téléchargement par audio :</span>
                  <strong className="text-[#0A1628]">1 000 FCFA</strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-[#0A1628] flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-blue-600" /> Tarification Vidéo
                </h4>
                <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                  <span className="text-slate-600">Visionnage par minute :</span>
                  <strong className="text-[#0A1628]">35 FCFA / min</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Téléchargement par vidéo :</span>
                  <strong className="text-[#0A1628]">2 000 FCFA</strong>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200 text-[11px] text-blue-900">
              ⚡ <strong>Quotas gratuits actuels :</strong> 5 audios et 2 vidéos par visiteur / adepte. Modifiables à tout moment pour les futures sessions.
            </div>
          </div>
        </div>
      )}

      {/* LECTEUR ACTIF EN BAS SI UN MÉDIA EST EN COURS */}
      {activeItem && (
        <div className="fixed bottom-16 md:bottom-4 left-2 right-2 md:left-1/2 md:-translate-x-1/2 md:max-w-xl z-50 bg-[#0A1628] text-white p-3 rounded-2xl shadow-2xl border border-white/20 ring-1 ring-black/5 flex items-center justify-between animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img src={activeItem.imageUrl} alt="" className="w-10 h-10 rounded-xl object-cover" />
            <div className="overflow-hidden">
              <span className="font-bold text-xs line-clamp-1">{activeItem.titre}</span>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-blue-300 truncate">{activeItem.intervenant}</span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-400 flex items-center gap-0.5">
                  <Eye className="w-2.5 h-2.5" /> {activeItem.nbEcoutesVues}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-blue-300 flex items-center gap-0.5">
                  <Download className="w-2.5 h-2.5" /> {activeItem.nbTelechargements}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleLike(activeItem.id)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                activeItem.userLiked ? "text-rose-500" : "text-white/70 hover:text-rose-400"
              }`}
              title="J'aime"
            >
              <Heart className={`w-4 h-4 ${activeItem.userLiked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={() => handleOpenShare(activeItem)}
              className="p-1.5 rounded-full text-white/70 hover:text-emerald-400 transition-colors cursor-pointer"
              title="Partager"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md cursor-pointer btn-press"
            >
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <button onClick={() => setActiveItem(null)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODALE DE COMMENTAIRES POUR UN MÉDIA NOUYIN */}
      {commentsModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="overflow-hidden pr-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase block">Commentaires</span>
                <h4 className="font-serif font-bold text-sm text-thron-navy truncate">
                  {commentsModalItem.titre}
                </h4>
              </div>
              <button
                onClick={() => setCommentsModalItem(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Liste des commentaires */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {(mediaComments[commentsModalItem.id] || []).length === 0 ? (
                <div className="py-8 text-center text-slate-400">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>Soyez le premier à commenter cet enseignement sacré.</p>
                </div>
              ) : (
                (mediaComments[commentsModalItem.id] || []).map((cm) => (
                  <div key={cm.id} className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-thron-navy text-[11px]">{cm.author}</span>
                      <span className="text-[9px] text-slate-400">{cm.time}</span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">{cm.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Input de nouveau commentaire */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddComment(commentsModalItem.id);
              }}
              className="pt-2 border-t border-slate-100 flex items-center gap-2"
            >
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Écrire une parole de bénédiction..."
                className="flex-1 px-3 py-2 bg-slate-100 rounded-xl text-xs border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="p-2 rounded-xl bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 active:scale-[0.97] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODALE DE PARTAGE RÉSEAUX SOCIAUX & LIEN */}
      <SocialShareModal
        isOpen={shareModalData.isOpen}
        onClose={() => setShareModalData({ ...shareModalData, isOpen: false })}
        title={shareModalData.title}
        imageUrl={shareModalData.imageUrl}
        onShareSuccess={() => {
          if (shareModalData.itemId) {
            setMedias((prev) =>
              prev.map((m) =>
                m.id === shareModalData.itemId ? { ...m, sharesCount: m.sharesCount + 1 } : m
              )
            );
          }
        }}
      />

      {/* MODALE DE PAIEMENT WALLET / CONSOMMATION */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-blue-500/20 ring-1 ring-black/5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-serif font-bold text-sm text-[#0A1628]">
                {showPayModal.action === "telechargement" ? "Téléchargement Nouyin" : "Fin du quota gratuit"}
              </h4>
              <button onClick={() => setShowPayModal(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs space-y-2">
              <p className="font-bold text-[#0A1628]">{showPayModal.item.titre}</p>
              <p className="text-slate-600 text-[11px]">
                {showPayModal.action === "telechargement"
                  ? "Le fichier haute définition sera téléchargeable avec lien signé personnel."
                  : `Vos quotas gratuits pour les ${showPayModal.item.type === "audio" ? "audios (5)" : "vidéos (2)"} sont atteints. La lecture est facturée à la minute.`}
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between font-bold">
                <span>Montant à débiter :</span>
                <span className="text-blue-600 font-mono">
                  {showPayModal.action === "telechargement"
                    ? `${showPayModal.item.prixTelechargementFCFA} FCFA`
                    : `${showPayModal.item.prixMinuteFCFA * showPayModal.item.dureeMinutes} FCFA (${showPayModal.item.dureeMinutes} min)`}
                </span>
              </div>

              <div className="p-2.5 bg-blue-50/70 border border-blue-100 text-blue-900 rounded-xl text-[10px] space-y-0.5">
                <p>• 75% reversés à l'éditeur ({showPayModal.item.editeurLignee})</p>
                <p>• 25% commission d'infrastructure plateforme</p>
              </div>
            </div>

            <button
              onClick={handleConfirmPayment}
              className="w-full py-2.5 bg-[#0A1628] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow transition-colors active:scale-[0.97]"
            >
              Payer avec mon Wallet ({walletBalance.toLocaleString("fr-FR")} F dispo)
            </button>
          </div>
        </div>
      )}

      {/* MODALE DÉPÔT DE MÉDIA (ESPACE ÉDITEUR) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-blue-500/20 ring-1 ring-black/5 my-8 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-serif font-bold text-base text-[#0A1628]">Déposer un Média dans Nouyin</h4>
              <button onClick={() => setShowUploadModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateMedia} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNewType("audio")}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${newType === "audio" ? "bg-blue-50 border-blue-600 text-blue-900 shadow-sm" : "border-slate-200 text-slate-600"}`}
                >
                  Audio MP3
                </button>
                <button
                  type="button"
                  onClick={() => setNewType("video")}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${newType === "video" ? "bg-[#0A1628] border-[#0A1628] text-white shadow-sm" : "border-slate-200 text-slate-600"}`}
                >
                  Vidéo HD
                </button>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Titre de l'enseignement</label>
                <input
                  type="text"
                  value={newTitre}
                  onChange={(e) => setNewTitre(e.target.value)}
                  placeholder="Ex: Paroles de sagesse d'Atinkindoudou"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Intervenant</label>
                  <input
                    type="text"
                    value={newIntervenant}
                    onChange={(e) => setNewIntervenant(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Durée (minutes)</label>
                  <input
                    type="number"
                    value={newDuree}
                    onChange={(e) => setNewDuree(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-[11px] text-blue-900">
                Déclaration obligatoire : Je certifie détenir les droits spirituels et coutumiers sur ce fichier pour le compte de la Lignée.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0A1628] hover:bg-blue-600 text-white rounded-xl font-bold text-xs shadow transition-all active:scale-[0.97]"
              >
                Mettre en ligne dans Nouyin
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
