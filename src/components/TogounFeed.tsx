"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Pause,
  Volume2,
  VolumeX,
  Bookmark,
  Share,
  ShieldAlert,
  ArrowRight,
  Filter,
  Plus,
  Video,
  Music,
  FileText,
  Download,
  Radio,
  Camera,
  Upload,
  Loader2,
} from "lucide-react";
import { SocialShareModal } from "./SocialShareModal";
import { TogounVideoImmersionView } from "./TogounVideoImmersionView";

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
  videoUrl?: string;
  audioUrl?: string;
  audioTitle?: string;
  documentUrl?: string;
  documentName?: string;
  documentSize?: string;
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
  viewsCount: number;
  isBoosted?: boolean;
}

export interface StoryItem {
  id: string;
  authorNom: string;
  authorPhoto: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  caption?: string;
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

interface TogounFeedProps {
  onOpenVideoImmersion?: () => void;
}

export const TogounFeed: React.FC<TogounFeedProps> = ({ onOpenVideoImmersion }) => {
  // Navigation interne Togoun : Fil, Pages de lignée, Groupes, Modération
  const [activeSubTab, setActiveSubTab] = useState<"fil" | "pages" | "groupes" | "moderation">("fil");
  const [feedFilter, setFeedFilter] = useState<"tout" | "lignee" | "booste">("tout");

  // Mode immersion Vidéos & Lives plein écran
  const [videoImmersionOpen, setVideoImmersionOpen] = useState(false);

  // ==========================================================================
  // 1. ÉTAT DES STORIES (PHOTOS ET VIDÉOS 100% FONCTIONNELLES)
  // ==========================================================================
  const [stories, setStories] = useState<StoryItem[]>([
    {
      id: "st-1",
      authorNom: "Togbé Mintoniu",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      mediaUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&auto=format&fit=crop&q=80",
      mediaType: "image",
      caption: "Bénédiction matinale d'Alafia sur le trône sacré",
      timestamp: "Il y a 3h",
      isViewed: false,
    },
    {
      id: "st-2",
      authorNom: "Hounnon Mahugnon",
      authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-african-musicians-playing-traditional-drums-40432-large.mp4",
      mediaType: "video",
      caption: "Préparation des percussions pour le culte de dimanche",
      timestamp: "Il y a 5h",
      isViewed: false,
    },
    {
      id: "st-3",
      authorNom: "Temple Alafia",
      authorPhoto: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80",
      mediaUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
      mediaType: "image",
      caption: "Accueil solennel des nouveaux fidèles Atinkindouvi",
      timestamp: "Il y a 8h",
      isViewed: true,
    },
  ]);

  const [activeStoryViewer, setActiveStoryViewer] = useState<StoryItem | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [storyVideoMuted, setStoryVideoMuted] = useState(false);

  // Modale d'ajout de Story
  const [showCreateStoryModal, setShowCreateStoryModal] = useState(false);
  const [storyCaption, setStoryCaption] = useState("");
  const [storyMediaType, setStoryMediaType] = useState<"image" | "video">("image");
  const [storyMediaUrl, setStoryMediaUrl] = useState<string>(
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80"
  );
  const storyFileInputRef = useRef<HTMLInputElement | null>(null);

  // Progression de la story visualisée
  useEffect(() => {
    if (!activeStoryViewer) {
      setStoryProgress(0);
      return;
    }
    setStoryProgress(0);
    const duration = activeStoryViewer.mediaType === "video" ? 15000 : 5000;
    const interval = 50;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Passer à la story suivante si possible
          const currentIndex = stories.findIndex((s) => s.id === activeStoryViewer.id);
          if (currentIndex < stories.length - 1) {
            setActiveStoryViewer(stories[currentIndex + 1]);
          } else {
            setActiveStoryViewer(null);
          }
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeStoryViewer, stories]);

  // ==========================================================================
  // 2. ÉTAT DES PUBLICATIONS DU FIL D'ACTUALITÉ
  // ==========================================================================
  const [posts, setPosts] = useState<TogounPost[]>([
    {
      id: "post-1",
      authorNom: "Togbé Mintoniu bo tozé",
      authorGrade: "Togbegan daho",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon 1",
      temple: "Temple Alafia Abomey-Calavi",
      timestamp: "Il y a 2 heures",
      audience: "lignee",
      content: "Bénédictions et paix (Alafia) à tous les dignitaires, hounnon et hounvi de la lignée Mantinkpon 1. Préparation de la grande cérémonie d'Atinkindoudou ce dimanche au temple principal. Que les forces ancestrales nous accompagnent dans la concorde et la pureté.",
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
              authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
              text: "Soyez bénis mon enfant, les ancêtres veillent.",
              timestamp: "Il y a 30 min",
              likes: 12,
            },
          ],
        },
      ],
      sharesCount: 19,
      viewsCount: 3420,
      isBoosted: true,
    },
    {
      id: "post-vid-sacred",
      authorNom: "Hounnon Mahugnon DOSSOU",
      authorGrade: "Grand Prêtre Hounnon",
      authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      lignee: "Mantinkpon 1",
      temple: "Temple Alafia Calavi",
      timestamp: "Il y a 3 heures",
      audience: "public",
      content: "Vidéo sacrée : Résonance des gongs et danses rituelles au couvent central. Regardez et partagez la grâce d'Alafia.",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-african-musicians-playing-traditional-drums-40432-large.mp4",
      reactions: { like: 145, love: 68, solidarity: 52, haha: 0, wow: 28, sad: 0, angry: 0 },
      userReaction: "like",
      comments: [],
      sharesCount: 42,
      viewsCount: 5120,
      isBoosted: false,
    },
    {
      id: "post-audio-sacred",
      authorNom: "Chœur des Hounvis Alafia",
      authorGrade: "Chorale Sacrée",
      authorPhoto: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
      lignee: "Mantinkpon 1",
      timestamp: "Hier à 18:00",
      audience: "public",
      content: "Chant liturgique Zindo : Écoutez l'enregistrement sacré des cantiques d'ouverture dominicale.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      audioTitle: "Cantique d'Harmonie et de Paix Alafia (Fongbe)",
      reactions: { like: 72, love: 35, solidarity: 29, haha: 0, wow: 14, sad: 0, angry: 0 },
      comments: [],
      sharesCount: 18,
      viewsCount: 2890,
    },
    {
      id: "post-doc-sacred",
      authorNom: "Secrétariat Général du Trône",
      authorGrade: "Direction Liturgique",
      authorPhoto: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80",
      lignee: "Conseil Suprême",
      timestamp: "Hier à 11:20",
      audience: "public",
      content: "Document Officiel : Guide liturgique et calendrier des grandes fêtes de fin d'année du culte Thron 2026. Téléchargeable pour tous les temples.",
      documentUrl: "#",
      documentName: "Calendrier_Liturgique_Thron_2026.pdf",
      documentSize: "2.4 Mo • Document PDF Officiel",
      reactions: { like: 98, love: 45, solidarity: 40, haha: 0, wow: 9, sad: 0, angry: 0 },
      comments: [],
      sharesCount: 31,
      viewsCount: 4100,
    },
    {
      id: "post-poll-sacred",
      authorNom: "Temple Alafia Officiel",
      authorGrade: "Page Temple",
      authorPhoto: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon 1",
      timestamp: "Il y a 6 heures",
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
      viewsCount: 1650,
    },
  ]);

  // Formulaire de création de publication
  const [newPostText, setNewPostText] = useState("");
  const [selectedAudience, setSelectedAudience] = useState<TogounAudience>("public");
  const [isSecretPost, setIsSecretPost] = useState(false);
  const [selectedBg, setSelectedBg] = useState<string | null>(null);
  const [showBgSelector, setShowBgSelector] = useState(false);

  // Fichiers attachés à la publication
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [attachedVideo, setAttachedVideo] = useState<string | null>(null);
  const [attachedAudio, setAttachedAudio] = useState<{ url: string; title: string } | null>(null);
  const [attachedDocument, setAttachedDocument] = useState<{ url: string; name: string; size: string } | null>(null);

  // Sondage
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["Option 1", "Option 2"]);

  // Refs pour les inputs fichiers réels
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement | null>(null);
  const docInputRef = useRef<HTMLInputElement | null>(null);

  // Interactions post
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [activeReactionPickerPostId, setActiveReactionPickerPostId] = useState<string | null>(null);

  // Modale de partage enrichi (WhatsApp, Facebook, X, etc.)
  const [shareModalData, setShareModalData] = useState<{
    isOpen: boolean;
    title: string;
    postId: string;
    imageUrl?: string;
  }>({
    isOpen: false,
    title: "",
    postId: "",
  });

  // Modale de signalement
  const [reportModalPost, setReportModalPost] = useState<TogounPost | null>(null);
  const [reportReason, setReportReason] = useState("Divulgation de secret sacré ou rituel réservé");
  const [reportSent, setReportSent] = useState(false);
  const [reportedItems, setReportedItems] = useState([
    {
      id: "rep-1",
      postId: "post-99",
      author: "Compte Suspect",
      motif: "Propos diffamatoires sur un Hounnon",
      date: "Il y a 2h",
      status: "en_attente",
    },
  ]);

  // Scroll infini
  const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);

  // Observer pour le scroll infini du fil d'actualité
  useEffect(() => {
    const sentinel = bottomSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMorePosts) {
          setIsLoadingMorePosts(true);
          setTimeout(() => {
            const morePosts: TogounPost[] = [
              {
                id: `post-infinite-${Date.now()}-1`,
                authorNom: "Hounnon Ayikodji MONSIA",
                authorGrade: "Hounnon Gardien",
                authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
                lignee: "Mantinkpon 1",
                timestamp: "Il y a 1 jour",
                audience: "public",
                content: "Les cinq règles sacrées du silence rituel au sanctuaire : Paix, Respect, Dévotion, Vérité et Charité envers les orphelins.",
                bgGradient: "from-emerald-600 to-teal-800",
                reactions: { like: 62, love: 31, solidarity: 25, haha: 0, wow: 8, sad: 0, angry: 0 },
                comments: [],
                sharesCount: 12,
                viewsCount: 1980,
              },
              {
                id: `post-infinite-${Date.now()}-2`,
                authorNom: "Dah Kpeto Gbedan",
                authorGrade: "Hounnongan daho",
                authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
                lignee: "Lignée Ouidah",
                timestamp: "Il y a 2 jours",
                audience: "public",
                content: "Grande veillée d'offrandes d'huile de palme et de cola blanc pour la fertilité des terres et l'abondance de nos familles.",
                images: ["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80"],
                reactions: { like: 88, love: 49, solidarity: 37, haha: 1, wow: 15, sad: 0, angry: 0 },
                comments: [],
                sharesCount: 24,
                viewsCount: 3120,
              },
            ];
            setPosts((prev) => [...prev, ...morePosts]);
            setIsLoadingMorePosts(false);
          }, 800);
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isLoadingMorePosts]);

  // ==========================================================================
  // GESTION DES FICHIERS ET UPLOADS LOCAUX
  // ==========================================================================
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedImage(event.target?.result as string);
        setAttachedVideo(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedVideo(event.target?.result as string);
        setAttachedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedAudio({
          url: event.target?.result as string,
          title: file.name.replace(/\.[^/.]+$/, ""),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeKB = (file.size / 1024).toFixed(1);
      const sizeText = file.size > 1048576 ? `${(file.size / 1048576).toFixed(1)} Mo` : `${sizeKB} Ko`;
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedDocument({
          url: event.target?.result as string,
          name: file.name,
          size: `${sizeText} • Document`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Ajout de Story
  const handlePublishStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyMediaUrl) return;

    const newStory: StoryItem = {
      id: `st-${Date.now()}`,
      authorNom: "MONSIA Serge",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      mediaUrl: storyMediaUrl,
      mediaType: storyMediaType,
      caption: storyCaption || undefined,
      timestamp: "À l'instant",
      isViewed: false,
    };

    setStories([newStory, ...stories]);
    setShowCreateStoryModal(false);
    setStoryCaption("");
  };

  // Publication d'un Post dans le fil
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const hasMedia = attachedImage || attachedVideo || attachedAudio || attachedDocument;
    const hasPoll = showPollCreator && pollQuestion.trim();
    if (!newPostText.trim() && !hasMedia && !hasPoll) return;

    const newPost: TogounPost = {
      id: `post-${Date.now()}`,
      authorNom: "MONSIA Serge",
      authorGrade: "Togbegan daho",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon 1",
      timestamp: "À l'instant",
      audience: selectedAudience,
      isSecret: isSecretPost,
      content: newPostText,
      bgGradient: selectedBg || undefined,
      images: attachedImage ? [attachedImage] : undefined,
      videoUrl: attachedVideo || undefined,
      audioUrl: attachedAudio?.url || undefined,
      audioTitle: attachedAudio?.title || undefined,
      documentUrl: attachedDocument?.url || undefined,
      documentName: attachedDocument?.name || undefined,
      documentSize: attachedDocument?.size || undefined,
      poll: hasPoll
        ? {
            question: pollQuestion,
            options: pollOptions.filter((o) => o.trim()).map((opt) => ({ text: opt, votes: 0 })),
            totalVotes: 0,
          }
        : undefined,
      reactions: { like: 1, love: 0, solidarity: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
      userReaction: "like",
      comments: [],
      sharesCount: 0,
      viewsCount: 1,
    };

    setPosts([newPost, ...posts]);

    // Reset du formulaire
    setNewPostText("");
    setSelectedBg(null);
    setShowBgSelector(false);
    setShowPollCreator(false);
    setPollQuestion("");
    setAttachedImage(null);
    setAttachedVideo(null);
    setAttachedAudio(null);
    setAttachedDocument(null);
  };

  // Réagir à un post
  const handleReact = (postId: string, reaction: ReactionType) => {
    setPosts((prev) =>
      prev.map((p) => {
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
      })
    );
    setActiveReactionPickerPostId(null);
  };

  // Voter dans un sondage
  const handleVotePoll = (postId: string, optIndex: number) => {
    setPosts((prev) =>
      prev.map((p) => {
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
      })
    );
  };

  // Ajouter un commentaire
  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      authorNom: "MONSIA Serge",
      authorGrade: "Togbegan daho",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      text: commentInput,
      timestamp: "À l'instant",
      likes: 0,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return { ...p, comments: [...p.comments, newComment] };
      })
    );
    setCommentInput("");
  };

  const filteredPosts = posts.filter((p) => {
    if (feedFilter === "lignee") return p.audience === "lignee" || p.lignee.includes("Mantinkpon");
    if (feedFilter === "booste") return p.isBoosted;
    return true;
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 py-3 space-y-4 font-sans">
      {/* ==================================================================== */}
      {/* 1. EN-TÊTE TOGOUN & BANDEAU VIDÉOS & LIVES PLEIN ÉCRAN               */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-thron-border shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></span>
            <h2 className="font-serif text-lg font-black text-thron-navy">
              Togoun (Réseau Social Thron)
            </h2>
          </div>

          {/* Bouton d'accès au mode immersion Vidéos & Lives */}
          <button
            onClick={() => {
              if (onOpenVideoImmersion) onOpenVideoImmersion();
              else setVideoImmersionOpen(true);
            }}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 animate-pulse"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Vidéos & Lives</span>
          </button>
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
          {/* ==================================================================== */}
          {/* 2. BARRE DES STORIES 24H AVEC CRÉATION PHOTO & VIDÉO OPÉRATIONNELLE  */}
          {/* ==================================================================== */}
          <div className="bg-white rounded-3xl p-3 border border-thron-border shadow-sm overflow-x-auto">
            <div className="flex items-center gap-3 min-w-max pb-1">
              {/* Bouton Créer une story INTERACTIF */}
              <div
                onClick={() => setShowCreateStoryModal(true)}
                className="relative w-20 h-32 rounded-2xl bg-gradient-to-b from-blue-50 to-slate-100 border-2 border-dashed border-thron-blue/40 flex flex-col items-center justify-center p-2 text-center cursor-pointer hover:border-thron-blue hover:bg-blue-100/50 transition-all flex-shrink-0 group shadow-sm active:scale-95"
              >
                <div className="w-8 h-8 rounded-full bg-thron-blue text-white flex items-center justify-center mb-1 shadow group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-thron-navy leading-tight">
                  Ajouter Story
                </span>
                <span className="text-[8px] text-slate-500 font-medium mt-0.5">Photo/Vidéo</span>
              </div>

              {/* Liste des stories avec badge et type */}
              {stories.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setActiveStoryViewer(st)}
                  className="relative w-20 h-32 rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 group shadow-sm transition-transform active:scale-95 border border-slate-200"
                >
                  {st.mediaType === "video" ? (
                    <video src={st.mediaUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <img src={st.mediaUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30"></div>

                  {/* Badge type vidéo */}
                  {st.mediaType === "video" && (
                    <div className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white">
                      <Video className="w-2.5 h-2.5" />
                    </div>
                  )}

                  {/* Avatar de l'auteur */}
                  <div
                    className={`absolute top-2 left-2 w-7 h-7 rounded-full p-0.5 border-2 ${
                      st.isViewed ? "border-slate-400" : "border-amber-400"
                    }`}
                  >
                    <img src={st.authorPhoto} alt="" className="w-full h-full object-cover rounded-full" />
                  </div>

                  <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] font-bold text-white line-clamp-1 drop-shadow">
                    {st.authorNom}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ==================================================================== */}
          {/* 3. FORMULAIRE DE PUBLICATION COMPLET (TOUT TYPE : TEXTE, PHOTO, VIDÉO, SON, DOC, SONDAGE) */}
          {/* ==================================================================== */}
          <div className="bg-white rounded-3xl p-4 border border-thron-border shadow-sm space-y-3">
            {/* Header du créateur */}
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                alt="Moi"
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div className="flex-1">
                <span className="font-bold text-xs text-thron-navy block">MONSIA Serge (Togbegan daho)</span>
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
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
                      isSecretPost ? "bg-amber-500 text-thron-navy shadow" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Lock className="w-3 h-3" />
                    <span>Contenu Secret</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Zone de saisie avec support des fonds colorés */}
            <form onSubmit={handleCreatePost} className="space-y-3">
              <div
                className={`rounded-2xl transition-all ${
                  selectedBg
                    ? `bg-gradient-to-br ${selectedBg} p-6 text-white min-h-[140px] flex items-center justify-center text-center font-bold text-base`
                    : "p-1"
                }`}
              >
                <textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Partagez une bénédiction, une cérémonie, un enseignement ou un rituel..."
                  rows={selectedBg ? 3 : 2}
                  className={`w-full bg-transparent resize-none border-none focus:outline-none text-xs sm:text-sm font-medium ${
                    selectedBg ? "text-white placeholder-white/70 text-center font-bold text-sm" : "text-slate-800"
                  }`}
                />
              </div>

              {/* APERÇUS DES FICHIERS ATTACHÉS EN COURS DE CRÉATION */}
              {/* Image attachée */}
              {attachedImage && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-56 bg-slate-900">
                  <img src={attachedImage} alt="Aperçu" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setAttachedImage(null)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Vidéo attachée */}
              {attachedVideo && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-black">
                  <video src={attachedVideo} controls className="w-full max-h-56 object-contain" />
                  <button
                    type="button"
                    onClick={() => setAttachedVideo(null)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Audio attaché */}
              {attachedAudio && (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <Music className="w-5 h-5 text-amber-700 flex-shrink-0" />
                    <div className="truncate">
                      <span className="font-bold text-thron-navy block truncate">{attachedAudio.title}</span>
                      <span className="text-[10px] text-slate-500">Fichier audio prêt à la publication</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedAudio(null)}
                    className="p-1 rounded-full text-slate-400 hover:bg-amber-100 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Document attaché */}
              {attachedDocument && (
                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-5 h-5 text-thron-blue flex-shrink-0" />
                    <div className="truncate">
                      <span className="font-bold text-thron-navy block truncate">{attachedDocument.name}</span>
                      <span className="text-[10px] text-slate-500">{attachedDocument.size}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedDocument(null)}
                    className="p-1 rounded-full text-slate-400 hover:bg-blue-100 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Sondage si activé */}
              {showPollCreator && (
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-thron-navy flex items-center gap-1">
                      <BarChart2 className="w-4 h-4 text-thron-blue" /> Créer un Sondage
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPollCreator(false)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
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
                    className="text-[11px] text-thron-blue font-bold hover:underline cursor-pointer"
                  >
                    + Ajouter une option
                  </button>
                </div>
              )}

              {/* Fonds colorés */}
              {showBgSelector && (
                <div className="flex items-center gap-2 pt-1 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setSelectedBg(null)}
                    className="w-7 h-7 rounded-full border-2 border-slate-300 bg-white text-[10px] flex items-center justify-center font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                  {COLOR_GRADIENTS.map((grad, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedBg(grad)}
                      className={`w-7 h-7 rounded-full bg-gradient-to-br ${grad} border-2 cursor-pointer ${
                        selectedBg === grad ? "border-amber-400 scale-110" : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Inputs fichiers cachés pour l'upload réel */}
              <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageFileChange} />
              <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoFileChange} />
              <input ref={audioInputRef} type="file" accept="audio/*" className="hidden" onChange={handleAudioFileChange} />
              <input ref={docInputRef} type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={handleDocFileChange} />

              {/* BARRE D'OUTILS ET BOUTONS DE PUBLICATION */}
              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 text-xs gap-2">
                <div className="flex flex-wrap items-center gap-1">
                  {/* Photo */}
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-500" />
                    <span className="hidden sm:inline">Photo</span>
                  </button>

                  {/* Vidéo */}
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    <Video className="w-4 h-4 text-purple-600" />
                    <span className="hidden sm:inline">Vidéo</span>
                  </button>

                  {/* Audio */}
                  <button
                    type="button"
                    onClick={() => audioInputRef.current?.click()}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    <Music className="w-4 h-4 text-amber-600" />
                    <span className="hidden sm:inline">Son</span>
                  </button>

                  {/* Document */}
                  <button
                    type="button"
                    onClick={() => docInputRef.current?.click()}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="hidden sm:inline">Document</span>
                  </button>

                  {/* Sondage */}
                  <button
                    type="button"
                    onClick={() => setShowPollCreator(!showPollCreator)}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    <BarChart2 className="w-4 h-4 text-indigo-600" />
                    <span className="hidden sm:inline">Sondage</span>
                  </button>

                  {/* Couleur */}
                  <button
                    type="button"
                    onClick={() => setShowBgSelector(!showBgSelector)}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    <Palette className="w-4 h-4 text-pink-600" />
                    <span className="hidden sm:inline">Couleur</span>
                  </button>
                </div>

                {/* Bouton Publier */}
                <button
                  type="submit"
                  disabled={
                    !newPostText.trim() &&
                    !attachedImage &&
                    !attachedVideo &&
                    !attachedAudio &&
                    !attachedDocument &&
                    !pollQuestion.trim()
                  }
                  className="py-2 px-5 rounded-xl bg-thron-blue hover:bg-thron-navy text-white font-bold text-xs shadow disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Publier</span>
                  <Send className="w-3.5 h-3.5 text-thron-gold" />
                </button>
              </div>
            </form>
          </div>

          {/* ==================================================================== */}
          {/* 4. FILTRES DU FIL D'ACTUALITÉ                                        */}
          {/* ==================================================================== */}
          <div className="flex items-center justify-between px-2 text-xs">
            <span className="font-bold text-slate-500">Fil d'actualité :</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setFeedFilter("tout")}
                className={`px-3 py-1 rounded-full font-bold text-[11px] cursor-pointer ${
                  feedFilter === "tout" ? "bg-thron-navy text-white" : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                Tout voir
              </button>
              <button
                onClick={() => setFeedFilter("lignee")}
                className={`px-3 py-1 rounded-full font-bold text-[11px] cursor-pointer ${
                  feedFilter === "lignee" ? "bg-thron-navy text-white" : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                🏛️ Ma Lignée
              </button>
              <button
                onClick={() => setFeedFilter("booste")}
                className={`px-3 py-1 rounded-full font-bold text-[11px] cursor-pointer ${
                  feedFilter === "booste" ? "bg-amber-500 text-thron-navy" : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                ⚡ Boostés
              </button>
            </div>
          </div>

          {/* ==================================================================== */}
          {/* 5. LISTE DES PUBLICATIONS DU FIL TOGOUN                             */}
          {/* ==================================================================== */}
          <div className="space-y-4">
            {filteredPosts.map((post) => {
              const totalReactionsCount = Object.values(post.reactions).reduce((a, b) => a + b, 0);

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-thron-border shadow-sm space-y-3 transition-shadow hover:shadow-md"
                >
                  {/* Badge boosté */}
                  {post.isBoosted && (
                    <div className="flex items-center justify-between pb-2 border-b border-amber-200/50 text-[10px] text-amber-900 font-bold">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-600" />
                        PUBLICATION BOOSTÉE (100 F / 1000 PERSONNES)
                      </span>
                      <span className="text-slate-400">Sponsorisé par le Hounto</span>
                    </div>
                  )}

                  {/* En-tête de la publication */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.authorPhoto} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-thron-navy">{post.authorNom}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <span className="font-semibold text-amber-700">{post.authorGrade}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                          <span>•</span>
                          <span className="font-medium">
                            {post.audience === "public" ? "🌍 Public" : post.audience === "lignee" ? "🏛️ Lignée" : "👑 Hounnon+"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setReportModalPost(post)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-full hover:bg-slate-100 transition-colors"
                      title="Signaler la publication"
                    >
                      <Flag className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Avertissement de secret sacré */}
                  {post.isSecret && (
                    <div className="p-2.5 bg-amber-50 rounded-2xl border border-amber-300 flex items-center gap-2 text-[11px] text-amber-950 font-bold">
                      <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
                      <span>Enseignement Secret — Réservé au grade habilité. Partage externe interdit.</span>
                    </div>
                  )}

                  {/* Corps de la publication */}
                  {post.bgGradient ? (
                    <div
                      className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${post.bgGradient} text-white font-serif font-bold text-center text-sm sm:text-base leading-relaxed shadow-inner`}
                    >
                      {post.content}
                    </div>
                  ) : (
                    post.content && (
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-line">
                        {post.content}
                      </p>
                    )
                  )}

                  {/* RENDU VIDÉO */}
                  {post.videoUrl && (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-black shadow-sm">
                      <video src={post.videoUrl} controls playsInline className="w-full max-h-96 object-contain" />
                    </div>
                  )}

                  {/* RENDU AUDIO / SON */}
                  {post.audioUrl && (
                    <div className="p-4 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border border-amber-300 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-thron-navy">
                        <Music className="w-4 h-4 text-amber-700" />
                        <span>{post.audioTitle || "Enregistrement liturgique sacré"}</span>
                      </div>
                      <audio controls src={post.audioUrl} className="w-full h-10 rounded-xl" />
                    </div>
                  )}

                  {/* RENDU DOCUMENT */}
                  {post.documentUrl && (
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs hover:border-thron-blue transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-thron-blue flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="truncate">
                          <strong className="text-thron-navy block truncate">{post.documentName || "Document du Trône"}</strong>
                          <span className="text-[10px] text-slate-500">{post.documentSize || "PDF"}</span>
                        </div>
                      </div>
                      <a
                        href={post.documentUrl}
                        download
                        onClick={(e) => {
                          if (post.documentUrl === "#") {
                            e.preventDefault();
                            alert("Téléchargement du document officiel lancé !");
                          }
                        }}
                        className="px-3 py-1.5 bg-thron-navy hover:bg-thron-blue text-white rounded-xl font-bold text-[11px] flex items-center gap-1 flex-shrink-0 transition-colors shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Télécharger</span>
                      </a>
                    </div>
                  )}

                  {/* RENDU SONDAGE */}
                  {post.poll && (
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                      <h5 className="font-bold text-thron-navy">{post.poll.question}</h5>
                      <div className="space-y-1.5">
                        {post.poll.options.map((opt, idx) => {
                          const pct =
                            post.poll!.totalVotes > 0 ? Math.round((opt.votes / post.poll!.totalVotes) * 100) : 0;
                          const isSelected = post.poll!.userVotedIndex === idx;

                          return (
                            <button
                              key={idx}
                              onClick={() => handleVotePoll(post.id, idx)}
                              className={`w-full relative overflow-hidden p-2 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                                isSelected ? "border-thron-blue bg-blue-50/70 font-bold" : "border-slate-200 bg-white hover:bg-slate-100"
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

                  {/* ============================================================== */}
                  {/* COMPTEUR DE RÉACTIONS, COMMENTAIRES, PARTAGES & VUES           */}
                  {/* ============================================================== */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 font-bold">
                      <span>👍❤️ {totalReactionsCount}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* COMPTEUR DE VUES EXIGÉ PAR L'UTILISATEUR */}
                      <span className="flex items-center gap-1 font-semibold text-slate-500">
                        <Eye className="w-3.5 h-3.5 text-blue-500" />
                        {post.viewsCount.toLocaleString()} vues
                      </span>
                      <span>•</span>
                      <button
                        onClick={() => setOpenCommentsPostId(openCommentsPostId === post.id ? null : post.id)}
                        className="hover:underline cursor-pointer"
                      >
                        {post.comments.length} commentaires
                      </button>
                      <span>•</span>
                      <span>{post.sharesCount} partages</span>
                    </div>
                  </div>

                  {/* Barre d'action : Réagir, Commenter, Partager */}
                  <div className="relative flex items-center justify-between pt-1 border-t border-slate-100 text-xs font-bold text-slate-600">
                    {/* Bouton Réagir avec palette */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveReactionPickerPostId(activeReactionPickerPostId === post.id ? null : post.id)
                        }
                        className={`py-2 px-3 rounded-xl hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer ${
                          post.userReaction ? REACTIONS_MAP[post.userReaction].color : "text-slate-600"
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
                              className="text-xl hover:scale-125 transition-transform p-1 cursor-pointer"
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
                      className="py-2 px-3 rounded-xl hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Commenter</span>
                    </button>

                    {/* BOUTON PARTAGER EXÉCUTANT LA MODALE SOCIALE ET LES LIENS ENRICHIS */}
                    <button
                      disabled={post.isSecret}
                      onClick={() => {
                        setShareModalData({
                          isOpen: true,
                          title: post.content.slice(0, 100) || "Enseignement sacré Thron Hounto",
                          postId: post.id,
                          imageUrl: post.images?.[0] || undefined,
                        });
                      }}
                      className={`py-2 px-3 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors ${
                        post.isSecret ? "opacity-40 cursor-not-allowed" : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Partager</span>
                    </button>
                  </div>

                  {/* Section des commentaires */}
                  {openCommentsPostId === post.id && (
                    <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
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
                          className="p-2 bg-thron-blue text-white rounded-full hover:bg-thron-navy cursor-pointer shadow"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Liste des commentaires */}
                      <div className="space-y-2">
                        {post.comments.map((c) => (
                          <div key={c.id} className="space-y-1.5 text-xs">
                            <div className="flex items-start gap-2">
                              <img src={c.authorPhoto} alt="" className="w-7 h-7 rounded-full object-cover" />
                              <div className="bg-slate-100 rounded-2xl p-2.5 max-w-[85%]">
                                <span className="font-bold text-thron-navy block text-[11px]">{c.authorNom}</span>
                                <p className="text-slate-800 text-xs mt-0.5">{c.text}</p>
                              </div>
                            </div>

                            {c.replies &&
                              c.replies.map((rep) => (
                                <div key={rep.id} className="flex items-start gap-2 pl-8">
                                  <img src={rep.authorPhoto} alt="" className="w-6 h-6 rounded-full object-cover" />
                                  <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-2 max-w-[85%]">
                                    <span className="font-bold text-thron-blue block text-[10px]">
                                      {rep.authorNom} ({rep.authorGrade})
                                    </span>
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

            {/* SENTINELLE DU SCROLL INFINI DU FIL D'ACTUALITÉ */}
            <div ref={bottomSentinelRef} className="py-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              {isLoadingMorePosts ? (
                <>
                  <Loader2 className="w-4 h-4 text-thron-blue animate-spin" />
                  <span>Chargement d'autres publications sacrées...</span>
                </>
              ) : (
                <span className="text-[11px] text-slate-400">✨ Vous êtes à jour dans votre fil communautaire</span>
              )}
            </div>
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

            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/40 border border-amber-300 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-thron-navy">Page Officielle : Lignée Mantinkpon 1</h4>
                  <p className="text-xs text-slate-500">Coiffée par Togbé Mintoniu bo tozé</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                  ✓ Membre de branche
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span>
                  <strong>1 450</strong> membres
                </span>
                <span>•</span>
                <span>
                  <strong>3 200</strong> suiveurs extérieurs
                </span>
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
              Les groupes sont ouverts à tous les adeptes pour échanger sur la spiritualité, la musique rituelle et l'entraide.
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
            </div>
          </div>
        </div>
      )}

      {/* SOUS-ONGLET 4 : MODÉRATION */}
      {activeSubTab === "moderation" && (
        <div className="space-y-3">
          <div className="bg-white rounded-3xl p-5 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-700">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-serif font-bold text-base text-thron-navy">File de Modération & Signalements</h3>
            </div>
            <div className="space-y-2">
              {reportedItems.map((rep) => (
                <div key={rep.id} className="p-3.5 bg-rose-50/60 border border-rose-200 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-900">{rep.author}</span>
                    <span className="text-[10px] text-slate-500">{rep.date}</span>
                  </div>
                  <p className="text-slate-700 text-xs">
                    <strong>Motif :</strong> {rep.motif}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODALE D'AJOUT DE STORY (PHOTO OU VIDÉO OPÉRATIONNELLE À 100%)       */}
      {/* ==================================================================== */}
      {showCreateStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-thron-gold/40 text-slate-800 my-6 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowCreateStoryModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
                <Camera className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-thron-navy">
                  Ajouter une Story Thron (24h)
                </h3>
                <p className="text-xs text-slate-500">
                  Partagez une photo ou courte vidéo éphémère avec vos fidèles
                </p>
              </div>
            </div>

            <form onSubmit={handlePublishStory} className="space-y-4 text-xs">
              {/* Choix Photo ou Vidéo */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStoryMediaType("image")}
                  className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    storyMediaType === "image"
                      ? "bg-thron-navy text-white shadow"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-emerald-400" />
                  <span>Story Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStoryMediaType("video")}
                  className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    storyMediaType === "video"
                      ? "bg-thron-navy text-white shadow"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Video className="w-4 h-4 text-purple-400" />
                  <span>Story Vidéo</span>
                </button>
              </div>

              {/* Input fichier caché pour story */}
              <input
                ref={storyFileInputRef}
                type="file"
                accept={storyMediaType === "video" ? "video/*" : "image/*"}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setStoryMediaUrl(event.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              {/* Bouton pour importer depuis l'appareil */}
              <button
                type="button"
                onClick={() => storyFileInputRef.current?.click()}
                className="w-full py-3 border-2 border-dashed border-slate-300 hover:border-thron-blue rounded-2xl flex items-center justify-center gap-2 text-slate-600 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4 text-thron-blue" />
                <span>Importer {storyMediaType === "video" ? "une vidéo" : "une photo"} depuis l'appareil</span>
              </button>

              {/* Prévisualisation du média sélectionné */}
              <div className="relative w-36 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-thron-gold shadow-md bg-black">
                {storyMediaType === "video" ? (
                  <video src={storyMediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={storyMediaUrl} alt="Aperçu" className="w-full h-full object-cover" />
                )}
                <span className="absolute bottom-1 left-1 right-1 text-[9px] text-center bg-black/60 text-white rounded py-0.5 font-bold">
                  Aperçu Story
                </span>
              </div>

              {/* Légende facultative */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Légende ou bénédiction (facultatif)
                </label>
                <input
                  type="text"
                  value={storyCaption}
                  onChange={(e) => setStoryCaption(e.target.value)}
                  placeholder="Ex: Cérémonie Alafia de ce matin..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-thron-gold text-thron-navy rounded-xl font-bold shadow-md hover:from-amber-600 hover:to-amber-400 transition-all cursor-pointer"
                >
                  Publier ma Story (Visible 24h)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* VISIONNEUSE PLEIN ÉCRAN DE STORY (IMAGE OU VIDÉO AVEC PROGRESSION)   */}
      {/* ==================================================================== */}
      {activeStoryViewer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm h-[560px] rounded-3xl overflow-hidden bg-black flex flex-col justify-between p-4 shadow-2xl border border-white/20">
            {/* Barre de progression continue */}
            <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-thron-gold h-full transition-all duration-75"
                style={{ width: `${storyProgress}%` }}
              />
            </div>

            {/* En-tête de la story */}
            <div className="flex items-center justify-between text-white mt-2 z-10">
              <div className="flex items-center gap-2">
                <img
                  src={activeStoryViewer.authorPhoto}
                  alt=""
                  className="w-8 h-8 rounded-full border border-amber-400 object-cover"
                />
                <div>
                  <span className="font-bold text-xs block">{activeStoryViewer.authorNom}</span>
                  <span className="text-[10px] text-slate-300">{activeStoryViewer.timestamp}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeStoryViewer.mediaType === "video" && (
                  <button
                    onClick={() => setStoryVideoMuted(!storyVideoMuted)}
                    className="p-1.5 rounded-full bg-white/20 text-white cursor-pointer"
                  >
                    {storyVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}
                <button
                  onClick={() => setActiveStoryViewer(null)}
                  className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Corps du média : Image ou Vidéo */}
            <div className="flex-1 flex items-center justify-center my-4 overflow-hidden rounded-2xl relative">
              {activeStoryViewer.mediaType === "video" ? (
                <video
                  src={activeStoryViewer.mediaUrl}
                  autoPlay
                  playsInline
                  loop
                  muted={storyVideoMuted}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={activeStoryViewer.mediaUrl} alt="" className="w-full h-full object-cover" />
              )}

              {/* Légende si présente */}
              {activeStoryViewer.caption && (
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md text-white p-2.5 rounded-xl text-xs text-center font-medium">
                  {activeStoryViewer.caption}
                </div>
              )}
            </div>

            <div className="text-center text-white/70 text-[10px]">
              Touchez pour passer à la story suivante
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODALE DE PARTAGE ENRICHI SUR RÉSEAUX SOCIAUX & LIEN                 */}
      {/* ==================================================================== */}
      <SocialShareModal
        isOpen={shareModalData.isOpen}
        onClose={() => setShareModalData({ ...shareModalData, isOpen: false })}
        title={shareModalData.title}
        imageUrl={shareModalData.imageUrl}
        onShareSuccess={() => {
          setPosts((prev) =>
            prev.map((p) => {
              if (p.id !== shareModalData.postId) return p;
              return { ...p, sharesCount: p.sharesCount + 1 };
            })
          );
        }}
      />

      {/* ==================================================================== */}
      {/* MODALE PLEIN ÉCRAN DES VIDÉOS & LIVES TOGOUN (SANS ENTÊTE)           */}
      {/* ==================================================================== */}
      {videoImmersionOpen && (
        <TogounVideoImmersionView
          isOpen={videoImmersionOpen}
          onClose={() => setVideoImmersionOpen(false)}
          onOpenShareModal={(t, u) =>
            setShareModalData({
              isOpen: true,
              title: t,
              postId: "video-immersion",
            })
          }
        />
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
              <button
                onClick={() => setReportModalPost(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
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
                    <label
                      key={i}
                      className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer"
                    >
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
                  onClick={() => {
                    setReportSent(true);
                    setTimeout(() => {
                      setReportModalPost(null);
                      setReportSent(false);
                    }, 1500);
                  }}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow transition-colors cursor-pointer"
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
