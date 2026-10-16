"use client";

import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  ShieldCheck,
  Image as ImageIcon,
  Send,
  MoreHorizontal,
  Flame,
  Globe,
  Lock,
  Users,
  Eye,
  AlertTriangle,
  Smile,
  BarChart2,
  MapPin,
  Palette,
  Flag,
  CheckCircle2,
  ThumbsUp,
  X,
  Play,
  Volume2,
  Bookmark,
  Share,
  ShieldAlert,
  ArrowRight,
  Filter,
  Plus,
} from "lucide-react";

export type TogounAudience = "public" | "abonnes" | "lignee" | "grade_hounnon" | "moi";

export type ReactionType = "like" | "love" | "solidarity" | "haha" | "wow" | "sad" | "angry";

export interface CommentItem {
  id: string;
  authorNom: string;
  authorGrade: string;
  authorPhoto: string;
  text: string;
  timestamp: string;
  likes: number;
  replies?: CommentItem[];
}

export interface TogounPost {
  id: string;
  authorNom: string;
  authorGrade: string;
  authorPhoto: string;
  lignee: string;
  temple?: string;
  timestamp: string;
  audience: TogounAudience;
  isSecret?: boolean;
  content: string;
  bgGradient?: string;
  images?: string[];
  poll?: {
    question: string;
    options: { text: string; votes: number }[];
    totalVotes: number;
    userVotedIndex?: number;
  };
  location?: string;
  reactions: Record<ReactionType, number>;
  userReaction?: ReactionType;
  comments: CommentItem[];
  sharesCount: number;
  isBoosted?: boolean;
}

export interface StoryItem {
  id: string;
  authorNom: string;
  authorPhoto: string;
  mediaUrl: string;
  timestamp: string;
  isViewed?: boolean;
}

const COLOR_GRADIENTS = [
  "from-blue-600 via-indigo-700 to-purple-800",
  "from-amber-500 via-orange-600 to-red-600",
  "from-emerald-600 to-teal-800",
  "from-[#050F26] via-[#0A2558] to-[#050F26]",
  "from-rose-600 via-pink-600 to-purple-700",
];

const REACTIONS_MAP: Record<ReactionType, { label: string; emoji: string; color: string }> = {
  like: { label: "J'aime", emoji: "👍", color: "text-blue-600" },
  love: { label: "J'adore", emoji: "❤️", color: "text-rose-600" },
  solidarity: { label: "Solidaire", emoji: "🤝", color: "text-amber-600" },
  haha: { label: "Haha", emoji: "😆", color: "text-yellow-500" },
  wow: { label: "Ouah", emoji: "😮", color: "text-amber-500" },
  sad: { label: "Triste", emoji: "😢", color: "text-blue-400" },
  angry: { label: "Grrr", emoji: "😡", color: "text-orange-600" },
};

export const TogounFeed: React.FC = () => {
  // Navigation interne Togoun : Fil, Pages de lignée, Groupes, Modération
  const [activeSubTab, setActiveSubTab] = useState<"fil" | "pages" | "groupes" | "moderation">("fil");
  const [feedFilter, setFeedFilter] = useState<"tout" | "lignee" | "booste">("tout");

  // Stories
  const [stories, setStories] = useState<StoryItem[]>([
    {
      id: "st-1",
      authorNom: "Togbé Mintoniu",
      authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      mediaUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&auto=format&fit=crop&q=80",
      timestamp: "Il y a 3h",
      isViewed: false,
    },
    {
      id: "st-2",
      authorNom: "Hounnon Ayikodji",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      mediaUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
      timestamp: "Il y a 5h",
      isViewed: false,
    },
    {
      id: "st-3",
      authorNom: "Temple Alafia",
      authorPhoto: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80",
      mediaUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
      timestamp: "Il y a 8h",
      isViewed: true,
    },
  ]);
  const [activeStoryViewer, setActiveStoryViewer] = useState<StoryItem | null>(null);

  // Publications
  const [posts, setPosts] = useState<TogounPost[]>([
    {
      id: "post-1",
      authorNom: "Togbé Mintoniu bo tozé",
      authorGrade: "Togbegan daho",
      authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      temple: "Temple Alafia Abomey-Calavi",
      timestamp: "Il y a 2 heures",
      audience: "lignee",
      content: "Bénédictions et paix (Alafia) à tous les dignitaires, hounnon et hounvi de la lignée Mantinkpon ò. Préparation de la grande cérémonie d'Atinkindoudou ce dimanche au temple principal. Que les forces ancestrales nous accompagnent dans la concorde et la pureté.",
      images: ["https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&auto=format&fit=crop&q=80"],
      location: "Hounto Daho Alafia, Calavi",
      reactions: { like: 85, love: 42, solidarity: 38, haha: 2, wow: 12, sad: 0, angry: 0 },
      userReaction: "love",
      comments: [
        {
          id: "c-1",
          authorNom: "Hounvi Kpodékon",
          authorGrade: "Hounvi",
          authorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
          text: "Alafia grand maître ! Tout le hounto d'Allada est mobilisé pour ce dimanche.",
          timestamp: "Il y a 1 heure",
          likes: 7,
          replies: [
            {
              id: "c-1-1",
              authorNom: "Togbé Mintoniu bo tozé",
              authorGrade: "Togbegan daho",
              authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
              text: "Soyez bénis mon enfant, les ancêtres veillent.",
              timestamp: "Il y a 30 min",
              likes: 12,
            },
          ],
        },
      ],
      sharesCount: 19,
      isBoosted: true,
    },
    {
      id: "post-2",
      authorNom: "Hounnon Ayikodji MONSIA",
      authorGrade: "Hounnon",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      timestamp: "Hier à 16:30",
      audience: "grade_hounnon",
      isSecret: true,
      content: "CONSEIL DES HOUNNON : Enseignement rituel secret sur la disposition des feuilles d'oracles et la récitation matinale sacrée. Réservé aux initiés de grade Hounnon minimum.",
      bgGradient: "from-[#050F26] via-[#0A2558] to-[#050F26]",
      reactions: { like: 34, love: 18, solidarity: 22, haha: 0, wow: 6, sad: 0, angry: 0 },
      comments: [],
      sharesCount: 0, // Partage interdit sur contenu secret
    },
    {
      id: "post-3",
      authorNom: "Temple Alafia Officiel",
      authorGrade: "Page Temple",
      authorPhoto: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      timestamp: "Il y a 4 heures",
      audience: "public",
      content: "Sondage communautaire pour les préparatifs du festival annuel de Thron : Quelle date convient le mieux à vos délégations de couvent ?",
      poll: {
        question: "Date idéale pour la grande assemblée annuelle",
        options: [
          { text: "Premier samedi de novembre", votes: 45 },
          { text: "Deuxième dimanche de novembre", votes: 68 },
          { text: "Dernier week-end de décembre", votes: 24 },
        ],
        totalVotes: 137,
      },
      reactions: { like: 29, love: 14, solidarity: 11, haha: 1, wow: 3, sad: 0, angry: 0 },
      comments: [],
      sharesCount: 8,
    },
  ]);

  // État de création de post
  const [newPostText, setNewPostText] = useState("");
  const [selectedAudience, setSelectedAudience] = useState<TogounAudience>("lignee");
  const [isSecretPost, setIsSecretPost] = useState(false);
  const [selectedBg, setSelectedBg] = useState<string | null>(null);
  const [showBgSelector, setShowBgSelector] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["Option 1", "Option 2"]);
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [activeReactionPickerPostId, setActiveReactionPickerPostId] = useState<string | null>(null);

  // Modale de signalement
  const [reportModalPost, setReportModalPost] = useState<TogounPost | null>(null);
  const [reportReason, setReportReason] = useState("Divulgation de secret sacré ou rituel réservé");
  const [reportSent, setReportSent] = useState(false);

  // Modération des signalements
  const [reportedItems, setReportedItems] = useState([
    {
      id: "rep-1",
      postId: "post-99",
      author: "Compte Suspect",
      motif: "Propos diffamatoires sur un Hounnon",
      date: "Il y a 2h",
      status: "en_attente",
    },
    {
      id: "rep-2",
      postId: "post-88",
      author: "Adepte Anonyme",
      motif: "Tentative d'arnaque financière",
      date: "Hier",
      status: "averti",
    },
  ]);

  // Ajouter un post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim() && !pollQuestion) return;

    const newPost: TogounPost = {
      id: `post-${Date.now()}`,
      authorNom: "Hounnon Ayikodji MONSIA",
      authorGrade: "Hounnon",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      timestamp: "À l instant",
      audience: selectedAudience,
      isSecret: isSecretPost,
      content: newPostText,
      bgGradient: selectedBg || undefined,
      reactions: { like: 1, love: 0, solidarity: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
      userReaction: "like",
      comments: [],
      sharesCount: 0,
      poll: showPollCreator && pollQuestion ? {
        question: pollQuestion,
        options: pollOptions.map(opt => ({ text: opt, votes: 0 })),
        totalVotes: 0,
      } : undefined,
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
    setSelectedBg(null);
    setShowBgSelector(false);
    setShowPollCreator(false);
    setPollQuestion("");
  };

  // Réagir à un post
  const handleReact = (postId: string, reaction: ReactionType) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const current = p.userReaction;
      const newReactions = { ...p.reactions };

      if (current) {
        newReactions[current] = Math.max(0, newReactions[current] - 1);
      }
      if (current === reaction) {
        return { ...p, userReaction: undefined, reactions: newReactions };
      } else {
        newReactions[reaction] = (newReactions[reaction] || 0) + 1;
        return { ...p, userReaction: reaction, reactions: newReactions };
      }
    }));
    setActiveReactionPickerPostId(null);
  };

  // Voter dans un sondage
  const handleVotePoll = (postId: string, optIndex: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId || !p.poll || p.poll.userVotedIndex !== undefined) return p;
      const newOpts = [...p.poll.options];
      newOpts[optIndex].votes += 1;
      return {
        ...p,
        poll: {
          ...p.poll,
          options: newOpts,
          totalVotes: p.poll.totalVotes + 1,
          userVotedIndex: optIndex,
        },
      };
    }));
  };

  // Ajouter un commentaire
  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      authorNom: "Hounnon Ayikodji MONSIA",
      authorGrade: "Hounnon",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      text: commentInput,
      timestamp: "À l instant",
      likes: 0,
    };

    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return { ...p, comments: [...p.comments, newComment] };
    }));
    setCommentInput("");
  };

  // Soumettre un signalement
  const submitReport = () => {
    if (!reportModalPost) return;
    setReportedItems(prev => [
      {
        id: `rep-${Date.now()}`,
        postId: reportModalPost.id,
        author: reportModalPost.authorNom,
        motif: reportReason,
        date: "À l instant",
        status: "en_attente",
      },
      ...prev,
    ]);
    setReportSent(true);
    setTimeout(() => {
      setReportModalPost(null);
      setReportSent(false);
    }, 1500);
  };

  const filteredPosts = posts.filter(p => {
    if (feedFilter === "lignee") return p.audience === "lignee" || p.lignee.includes("Mantinkpon");
    if (feedFilter === "booste") return p.isBoosted;
    return true;
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 py-3 space-y-4 font-sans">
      {/* 1. EN-TÊTE TOGOUN & SOUS-NAVIGATION TYPE FACEBOOK */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-thron-border shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></span>
            <h2 className="font-serif text-lg font-black text-thron-navy">
              Togoun (Réseau Social Thron)
            </h2>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-thron-blue border border-blue-200">
            Conforme Facebook 100%
          </span>
        </div>

        {/* 4 Onglets principaux : Fil, Pages de lignée, Groupes, Modération */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-2xl text-xs font-bold text-center">
          <button
            onClick={() => setActiveSubTab("fil")}
            className={`py-2 rounded-xl transition-all ${
              activeSubTab === "fil" ? "bg-white text-thron-blue shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Fil d'actualité
          </button>
          <button
            onClick={() => setActiveSubTab("pages")}
            className={`py-2 rounded-xl transition-all ${
              activeSubTab === "pages" ? "bg-white text-thron-blue shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Pages Lignées
          </button>
          <button
            onClick={() => setActiveSubTab("groupes")}
            className={`py-2 rounded-xl transition-all ${
              activeSubTab === "groupes" ? "bg-white text-thron-blue shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Groupes
          </button>
          <button
            onClick={() => setActiveSubTab("moderation")}
            className={`py-2 rounded-xl transition-all ${
              activeSubTab === "moderation" ? "bg-white text-rose-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Modération
          </button>
        </div>
      </div>

      {activeSubTab === "fil" && (
        <>
          {/* 2. BARRE DES STORIES 24H TACTILES */}
          <div className="bg-white rounded-3xl p-3 border border-thron-border shadow-sm overflow-x-auto">
            <div className="flex items-center gap-3 min-w-max pb-1">
              {/* Créer une story */}
              <div className="relative w-20 h-32 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-2 text-center cursor-pointer hover:bg-slate-200 transition-colors flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-thron-blue text-white flex items-center justify-center mb-1 shadow">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-700 leading-tight">
                  Ajouter Story
                </span>
              </div>

              {/* Liste des stories */}
              {stories.map(st => (
                <div
                  key={st.id}
                  onClick={() => setActiveStoryViewer(st)}
                  className="relative w-20 h-32 rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 group shadow-sm transition-transform active:scale-95"
                >
                  <img src={st.mediaUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                  <div className={`absolute top-2 left-2 w-7 h-7 rounded-full p-0.5 border-2 ${st.isViewed ? 'border-slate-400' : 'border-amber-400'}`}>
                    <img src={st.authorPhoto} alt="" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] font-bold text-white line-clamp-1">
                    {st.authorNom}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. FORMULAIRE DE CRÉATION DE PUBLICATION FAÇON FACEBOOK */}
          <div className="bg-white rounded-3xl p-4 border border-thron-border shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                alt="Moi"
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div className="flex-1">
                <span className="font-bold text-xs text-thron-navy block">Hounnon Ayikodji MONSIA</span>
                {/* Sélecteur d'audience */}
                <div className="flex items-center gap-2 mt-0.5">
                  <select
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value as TogounAudience)}
                    className="text-[11px] font-bold bg-slate-100 border-none rounded-full px-2.5 py-0.5 text-slate-700 cursor-pointer"
                  >
                    <option value="public">🌍 Public (Tous)</option>
                    <option value="abonnes">👥 Abonnés & Fidèles</option>
                    <option value="lignee">🏛️ Ma Lignée uniquement</option>
                    <option value="grade_hounnon">👑 Hounnon & Dignitaires</option>
                    <option value="moi">🔒 Moi uniquement</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => setIsSecretPost(!isSecretPost)}
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                      isSecretPost ? 'bg-amber-500 text-thron-navy shadow' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Lock className="w-3 h-3" />
                    <span>Contenu Secret</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Zone de texte ou fond coloré */}
            <form onSubmit={handleCreatePost} className="space-y-3">
              <div className={`rounded-2xl transition-all ${selectedBg ? `bg-gradient-to-br ${selectedBg} p-6 text-white min-h-[140px] flex items-center justify-center text-center font-bold text-base` : 'p-1'}`}>
                <textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Partagez une bénédiction, une cérémonie ou un enseignement..."
                  rows={selectedBg ? 3 : 2}
                  className={`w-full bg-transparent resize-none border-none focus:outline-none text-xs sm:text-sm font-medium ${
                    selectedBg ? 'text-white placeholder-white/70 text-center font-bold text-sm' : 'text-slate-800'
                  }`}
                />
              </div>

              {/* Créateur de sondage si activé */}
              {showPollCreator && (
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2 text-xs">
                  <span className="font-bold text-thron-navy flex items-center gap-1">
                    <BarChart2 className="w-4 h-4 text-thron-blue" /> Créer un Sondage
                  </span>
                  <input
                    type="text"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    placeholder="Question du sondage..."
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                    required
                  />
                  {pollOptions.map((opt, i) => (
                    <input
                      key={i}
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const next = [...pollOptions];
                        next[i] = e.target.value;
                        setPollOptions(next);
                      }}
                      className="w-full px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                      placeholder={`Option ${i + 1}`}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`])}
                    className="text-[11px] text-thron-blue font-bold hover:underline"
                  >
                    + Ajouter une option
                  </button>
                </div>
              )}

              {/* Sélecteur de fonds colorés */}
              {showBgSelector && (
                <div className="flex items-center gap-2 pt-1 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setSelectedBg(null)}
                    className="w-7 h-7 rounded-full border-2 border-slate-300 bg-white text-[10px] flex items-center justify-center font-bold"
                  >
                    ✕
                  </button>
                  {COLOR_GRADIENTS.map((grad, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedBg(grad)}
                      className={`w-7 h-7 rounded-full bg-gradient-to-br ${grad} border-2 ${selectedBg === grad ? 'border-amber-400 scale-110' : 'border-transparent'}`}
                    />
                  ))}
                </div>
              )}

              {/* Barre d'outils Facebook */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBgSelector(!showBgSelector)}
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 flex items-center gap-1 text-[11px] font-bold"
                  >
                    <Palette className="w-4 h-4 text-purple-600" />
                    <span className="hidden sm:inline">Couleur</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPollCreator(!showPollCreator)}
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 flex items-center gap-1 text-[11px] font-bold"
                  >
                    <BarChart2 className="w-4 h-4 text-emerald-600" />
                    <span className="hidden sm:inline">Sondage</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 flex items-center gap-1 text-[11px] font-bold"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-500" />
                    <span className="hidden sm:inline">Photo/Vidéo</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!newPostText.trim() && !pollQuestion}
                  className="py-2 px-4 rounded-xl bg-thron-blue hover:bg-thron-navy text-white font-bold text-xs shadow disabled:opacity-50 transition-all flex items-center gap-1.5"
                >
                  <span>Publier</span>
                  <Send className="w-3.5 h-3.5 text-thron-gold" />
                </button>
              </div>
            </form>
          </div>

          {/* 4. FILTRES DU FIL D'ACTUALITÉ */}
          <div className="flex items-center justify-between px-2 text-xs">
            <span className="font-bold text-slate-500">Fil d'actualité :</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setFeedFilter("tout")}
                className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                  feedFilter === "tout" ? "bg-thron-navy text-white" : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                Tout voir
              </button>
              <button
                onClick={() => setFeedFilter("lignee")}
                className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                  feedFilter === "lignee" ? "bg-thron-navy text-white" : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                🏛️ Ma Lignée
              </button>
              <button
                onClick={() => setFeedFilter("booste")}
                className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                  feedFilter === "booste" ? "bg-amber-500 text-thron-navy" : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                ⚡ Boostés
              </button>
            </div>
          </div>

          {/* 5. LISTE DES PUBLICATIONS DU FIL TOGOUN */}
          <div className="space-y-4">
            {filteredPosts.map(post => {
              const totalReactionsCount = Object.values(post.reactions).reduce((a, b) => a + b, 0);

              return (
                <div key={post.id} className="bg-white rounded-3xl p-4 sm:p-5 border border-thron-border shadow-sm space-y-3">
                  {/* Badge Boosté si applicable */}
                  {post.isBoosted && (
                    <div className="flex items-center justify-between pb-2 border-b border-amber-100 text-[10px] text-amber-800 font-bold">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        PUBLICATION BOOSTÉE (100 F / 1000 PERSONNES)
                      </span>
                      <span className="text-slate-400 font-normal">Sponsorisé</span>
                    </div>
                  )}

                  {/* En-tête de la publication */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.authorPhoto} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-bold text-xs sm:text-sm text-thron-navy">{post.authorNom}</h4>
                          <span className="text-[10px] px-2 py-0.2 bg-thron-gold/20 text-thron-dark font-extrabold rounded-full">
                            {post.authorGrade}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                          <span>{post.timestamp}</span>
                          <span>•</span>
                          <span>{post.lignee}</span>
                          <span>•</span>
                          <span className="font-bold">
                            {post.audience === "public" ? "🌍 Public" : post.audience === "lignee" ? "🏛️ Lignée" : "👑 Hounnon+"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setReportModalPost(post)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
                      title="Signaler la publication"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Avertissement de secret sacré si applicable */}
                  {post.isSecret && (
                    <div className="p-2.5 bg-amber-50 rounded-2xl border border-amber-300 flex items-center gap-2 text-[11px] text-amber-950 font-bold">
                      <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
                      <span>Enseignement Secret — Réservé au grade habilité. Partage externe interdit.</span>
                    </div>
                  )}

                  {/* Corps de la publication */}
                  {post.bgGradient ? (
                    <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${post.bgGradient} text-white font-serif font-bold text-center text-sm sm:text-base leading-relaxed shadow-inner`}>
                      {post.content}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-line">
                      {post.content}
                    </p>
                  )}

                  {/* Sondage interactif */}
                  {post.poll && (
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                      <h5 className="font-bold text-thron-navy">{post.poll.question}</h5>
                      <div className="space-y-1.5">
                        {post.poll.options.map((opt, idx) => {
                          const pct = post.poll!.totalVotes > 0 ? Math.round((opt.votes / post.poll!.totalVotes) * 100) : 0;
                          const isSelected = post.poll!.userVotedIndex === idx;

                          return (
                            <button
                              key={idx}
                              onClick={() => handleVotePoll(post.id, idx)}
                              className={`w-full relative overflow-hidden p-2 rounded-xl border text-left flex items-center justify-between transition-all ${
                                isSelected ? 'border-thron-blue bg-blue-50/70 font-bold' : 'border-slate-200 bg-white hover:bg-slate-100'
                              }`}
                            >
                              <div
                                className="absolute left-0 top-0 bottom-0 bg-thron-blue/15 transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                              <span className="relative z-10 text-xs text-slate-800">{opt.text}</span>
                              <span className="relative z-10 text-xs font-bold text-thron-navy">{pct}%</span>
                            </button>
                          );
                        })}
                      </div>
                      <span className="text-[10px] text-slate-400 block text-right">
                        {post.poll.totalVotes} votes enregistrés
                      </span>
                    </div>
                  )}

                  {/* Images */}
                  {post.images && post.images.length > 0 && (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-96">
                      <img src={post.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Compteurs de réactions et commentaires */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 font-bold">
                      <span>👍❤️ {totalReactionsCount}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setOpenCommentsPostId(openCommentsPostId === post.id ? null : post.id)} className="hover:underline">
                        {post.comments.length} commentaires
                      </button>
                      <span>•</span>
                      <span>{post.sharesCount} partages</span>
                    </div>
                  </div>

                  {/* Barre d'action : Réagir, Commenter, Partager, Booster */}
                  <div className="relative flex items-center justify-between pt-1 border-t border-slate-100 text-xs font-bold text-slate-600">
                    {/* Bouton Réagir avec palette au survol / clic */}
                    <div className="relative">
                      <button
                        onClick={() => setActiveReactionPickerPostId(activeReactionPickerPostId === post.id ? null : post.id)}
                        className={`py-2 px-3 rounded-xl hover:bg-slate-100 flex items-center gap-1.5 ${
                          post.userReaction ? REACTIONS_MAP[post.userReaction].color : 'text-slate-600'
                        }`}
                      >
                        {post.userReaction ? (
                          <>
                            <span>{REACTIONS_MAP[post.userReaction].emoji}</span>
                            <span>{REACTIONS_MAP[post.userReaction].label}</span>
                          </>
                        ) : (
                          <>
                            <ThumbsUp className="w-4 h-4" />
                            <span>J'aime</span>
                          </>
                        )}
                      </button>

                      {/* Palette des 7 réactions */}
                      {activeReactionPickerPostId === post.id && (
                        <div className="absolute left-0 -top-12 z-20 flex items-center gap-1.5 p-1.5 bg-white rounded-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
                          {(Object.keys(REACTIONS_MAP) as ReactionType[]).map((rKey) => (
                            <button
                              key={rKey}
                              onClick={() => handleReact(post.id, rKey)}
                              className="text-xl hover:scale-125 transition-transform p-1"
                              title={REACTIONS_MAP[rKey].label}
                            >
                              {REACTIONS_MAP[rKey].emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Commenter */}
                    <button
                      onClick={() => setOpenCommentsPostId(openCommentsPostId === post.id ? null : post.id)}
                      className="py-2 px-3 rounded-xl hover:bg-slate-100 flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Commenter</span>
                    </button>

                    {/* Partager (Interdit si secret) */}
                    <button
                      disabled={post.isSecret}
                      onClick={() => alert("Lien de la publication copié !")}
                      className={`py-2 px-3 rounded-xl flex items-center gap-1.5 ${
                        post.isSecret ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-100'
                      }`}
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Partager</span>
                    </button>
                  </div>

                  {/* Section des commentaires dépliée */}
                  {openCommentsPostId === post.id && (
                    <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                      {/* Saisie commentaire */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder="Écrire un commentaire fraternel..."
                          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs focus:ring-2 focus:ring-thron-blue/30"
                          onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="p-2 bg-thron-blue text-white rounded-full hover:bg-thron-navy"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Liste des commentaires */}
                      <div className="space-y-2">
                        {post.comments.map(c => (
                          <div key={c.id} className="space-y-1.5 text-xs">
                            <div className="flex items-start gap-2">
                              <img src={c.authorPhoto} alt="" className="w-7 h-7 rounded-full object-cover" />
                              <div className="bg-slate-100 rounded-2xl p-2.5 max-w-[85%]">
                                <span className="font-bold text-thron-navy block text-[11px]">{c.authorNom}</span>
                                <p className="text-slate-800 text-xs mt-0.5">{c.text}</p>
                              </div>
                            </div>

                            {/* Réponses imbriquées niveau 2 */}
                            {c.replies && c.replies.map(rep => (
                              <div key={rep.id} className="flex items-start gap-2 pl-8">
                                <img src={rep.authorPhoto} alt="" className="w-6 h-6 rounded-full object-cover" />
                                <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-2 max-w-[85%]">
                                  <span className="font-bold text-thron-blue block text-[10px]">{rep.authorNom} ({rep.authorGrade})</span>
                                  <p className="text-slate-800 text-[11px] mt-0.5">{rep.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* SOUS-ONGLET 2 : PAGES DE LIGNÉES & TEMPLES */}
      {activeSubTab === "pages" && (
        <div className="space-y-3">
          <div className="bg-white rounded-3xl p-5 border border-thron-border shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-thron-navy">Pages Officielles de Lignées & Temples</h3>
            <p className="text-xs text-slate-600">
              Chaque lignée ou temple inscrit sur le SaaS possède sa page dédiée. Ses membres sont automatiquement rattachés d'après l'arbre généalogique.
            </p>

            {/* Fiche de la page Lignée Mantinkpon ò */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/40 border border-amber-300 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-thron-navy">Page Officielle : Lignée Mantinkpon ò</h4>
                  <p className="text-xs text-slate-500">Coiffée par Togbé Mintoniu bo tozé</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                  ✓ Membre de branche
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span><strong>1 450</strong> membres</span>
                <span>•</span>
                <span><strong>3 200</strong> suiveurs extérieurs</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-thron-navy text-white text-xs font-bold rounded-xl hover:bg-thron-blue">
                  Voir la Page de Lignée
                </button>
                <button className="px-4 py-2 border border-slate-300 text-xs font-bold rounded-xl bg-white">
                  Publier au nom de la Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SOUS-ONGLET 3 : GROUPES COMMUNAUTAIRES */}
      {activeSubTab === "groupes" && (
        <div className="space-y-3">
          <div className="bg-white rounded-3xl p-5 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-thron-navy">Groupes de Discussion Thron</h3>
              <button className="px-3 py-1.5 bg-thron-blue text-white rounded-full text-xs font-bold">
                + Créer un Groupe
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Contrairement aux pages, les groupes sont ouverts à tous les adeptes après réponse aux questions d'adhésion.
            </p>

            <div className="space-y-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-thron-navy">Fraternité des Hounvi d'Allada & Calavi</h4>
                  <p className="text-[11px] text-slate-500">640 membres • 15 publications/jour</p>
                </div>
                <button className="px-3 py-1 bg-thron-navy text-white rounded-xl text-xs font-bold">
                  Rejoint ✓
                </button>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-thron-navy">Chants et Louanges Sacrées Thron</h4>
                  <p className="text-[11px] text-slate-500">1 280 membres • Groupe public</p>
                </div>
                <button className="px-3 py-1 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-thron-blue hover:text-white">
                  Rejoindre
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SOUS-ONGLET 4 : MODÉRATION ET SIGNALEMENTS */}
      {activeSubTab === "moderation" && (
        <div className="space-y-3">
          <div className="bg-white rounded-3xl p-5 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-700">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-serif font-bold text-base text-thron-navy">
                File de Modération & Signalements Togoun
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              Outils d'administration réservés aux modérateurs de plateforme et dignitaires. Application stricte de l'échelle des sanctions.
            </p>

            <div className="space-y-2">
              {reportedItems.map(rep => (
                <div key={rep.id} className="p-3.5 bg-rose-50/60 border border-rose-200 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-900">{rep.author}</span>
                    <span className="text-[10px] text-slate-500">{rep.date}</span>
                  </div>
                  <p className="text-slate-700 text-xs"><strong>Motif :</strong> {rep.motif}</p>
                  <div className="flex gap-2 pt-1">
                    <button className="px-3 py-1 bg-amber-600 text-white rounded-lg text-[10px] font-bold">
                      Avertir l'auteur
                    </button>
                    <button className="px-3 py-1 bg-rose-600 text-white rounded-lg text-[10px] font-bold">
                      Masquer la publication
                    </button>
                    <button className="px-3 py-1 border border-slate-300 bg-white text-slate-700 rounded-lg text-[10px] font-bold">
                      Ignorer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODALE VISIONNEUSE DE STORY */}
      {activeStoryViewer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
          <div className="relative w-full max-w-sm h-[500px] rounded-3xl overflow-hidden bg-black flex flex-col justify-between p-4 shadow-2xl">
            {/* Barre de progression */}
            <div className="w-full bg-white/30 h-1 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full w-2/3 animate-pulse"></div>
            </div>

            <div className="flex items-center justify-between text-white mt-2">
              <div className="flex items-center gap-2">
                <img src={activeStoryViewer.authorPhoto} alt="" className="w-8 h-8 rounded-full border border-white" />
                <span className="font-bold text-xs">{activeStoryViewer.authorNom}</span>
              </div>
              <button onClick={() => setActiveStoryViewer(null)} className="p-1 rounded-full bg-white/20 text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center my-4 overflow-hidden rounded-2xl">
              <img src={activeStoryViewer.mediaUrl} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="text-center text-white/80 text-xs">
              Touchez pour passer à la story suivante
            </div>
          </div>
        </div>
      )}

      {/* MODALE DE SIGNALEMENT D'UN CONTENU */}
      {reportModalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-rose-300 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-serif font-bold text-sm text-thron-navy flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-rose-600" />
                Signaler cette publication
              </h4>
              <button onClick={() => setReportModalPost(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            {!reportSent ? (
              <div className="space-y-3 text-xs">
                <p className="text-slate-600">
                  Aidez la communauté à préserver la sacralité et le respect des traditions :
                </p>
                <div className="space-y-1.5">
                  {[
                    "Divulgation de secret sacré ou rituel réservé",
                    "Manque de respect à un Hounnon ou Ancêtre",
                    "Tentative d'arnaque ou fausse vente",
                    "Propos haineux ou injurieux",
                  ].map((mot, i) => (
                    <label key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                      <input
                        type="radio"
                        name="reportReason"
                        checked={reportReason === mot}
                        onChange={() => setReportReason(mot)}
                      />
                      <span className="text-[11px] text-slate-700 font-medium">{mot}</span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={submitReport}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow transition-colors"
                >
                  Confirmer le signalement
                </button>
              </div>
            ) : (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-xs text-thron-navy">Signalement transmis aux modérateurs</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
