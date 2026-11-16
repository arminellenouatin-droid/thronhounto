"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  Radio,
  Eye,
  CheckCircle2,
  Music,
  Send,
  UserPlus,
  UserCheck,
  ChevronUp,
  ChevronDown,
  Info,
  Shield,
  Flame,
  Bookmark,
  Share,
} from "lucide-react";
import { LivesAgora } from "./LivesAgora";

export interface TognonItem {
  id: string;
  isLive?: boolean;
  authorNom: string;
  authorGrade: string;
  authorPhoto: string;
  lignee: string;
  temple?: string;
  caption: string;
  songName: string;
  videoUrl: string;
  posterUrl: string;
  likes: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  liveViewers?: number;
  comments?: {
    id: string;
    authorNom: string;
    authorGrade: string;
    authorPhoto: string;
    text: string;
    timestamp: string;
    likes: number;
  }[];
}

// Pool initial composé STRICTEMENT de publications avec vidéo et de directs en cours
const INITIAL_TOGNON_ITEMS: TognonItem[] = [
  {
    id: "post-live-now",
    isLive: true,
    authorNom: "Togbé Mintoniu bo tozé",
    authorGrade: "Togbegan daho",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    lignee: "Lignée Mantinkpon 1 (Siège Central)",
    temple: "Temple Alafia Abomey-Calavi",
    caption: "🔴 EN DIRECT DU HOUNTO : Grande consécration solennelle des nouveaux initiés Atinkindouvi et prières oraculaires pour la concorde et la paix.",
    songName: "Direct Agora • Tambours Sacrés & Incantations Alafia",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-african-musicians-playing-traditional-drums-40432-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    likes: 2480,
    commentsCount: 312,
    sharesCount: 145,
    viewsCount: 6800,
    liveViewers: 1420,
    comments: [
      {
        id: "c-1",
        authorNom: "Hounvi Kpodékon",
        authorGrade: "Hounvi Initié",
        authorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        text: "Alafia grand maître ! Que les bénédictions descendent sur nous en direct 🙏",
        timestamp: "À l'instant",
        likes: 14,
      },
      {
        id: "c-2",
        authorNom: "Mahugnon DOSSOU",
        authorGrade: "Hounnon",
        authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
        text: "Gloire aux ancêtres et respect sacré au Trône Alafia !",
        timestamp: "Il y a 1 min",
        likes: 28,
      },
    ],
  },
  {
    id: "post-vid-sacred",
    isLive: false,
    authorNom: "Hounnon Mahugnon DOSSOU",
    authorGrade: "Grand Prêtre Hounnon",
    authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    lignee: "Mantinkpon 1 • Temple Calavi",
    temple: "Temple Alafia Calavi",
    caption: "Vidéo sacrée : Résonance des gongs et danses rituelles au couvent central. Regardez et partagez la grâce d'Alafia.",
    songName: "Cantique Zinli • Rites Cérémoniels Alafia",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-traditional-african-dancers-performing-outdoors-40431-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    likes: 1850,
    commentsCount: 94,
    sharesCount: 68,
    viewsCount: 5120,
    comments: [
      {
        id: "c-3",
        authorNom: "Pelagie TOSSOU",
        authorGrade: "Tassinon",
        authorPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
        text: "Quelle pureté spirituelle ! Les pas de danse vibrent avec l'énergie ancestrale.",
        timestamp: "Il y a 1 heure",
        likes: 19,
      },
    ],
  },
  {
    id: "post-live-ouidah",
    isLive: true,
    authorNom: "Dah MONSIA Gbédan",
    authorGrade: "Hounnongan daho",
    authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    lignee: "Lignée Ouidah Historique",
    temple: "Temple Racine Ouidah",
    caption: "🔴 DIRECT AGORA : Consultation collective et offrandes aux mânes des ancêtres fondateurs du culte Thron.",
    songName: "Direct Temple Ouidah • Clochettes et Gong Sacré",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-playing-drums-in-a-circle-40430-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    likes: 3120,
    commentsCount: 420,
    sharesCount: 210,
    viewsCount: 8900,
    liveViewers: 950,
    comments: [
      {
        id: "c-4",
        authorNom: "Koffi AGBOSSOU",
        authorGrade: "Hounnon do alidji",
        authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
        text: "Présent depuis Ouidah. Offrandes bénies par nos aïeux.",
        timestamp: "Il y a 3 min",
        likes: 34,
      },
    ],
  },
  {
    id: "post-vid-percussions",
    isLive: false,
    authorNom: "Hounvi Kpodékon",
    authorGrade: "Hounvi Initié",
    authorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    lignee: "Mantinkpon 1 • Couvent Allada",
    temple: "Couvent Sacré Allada",
    caption: "Démonstration des percussions sacrées et danses rituelles au couvent d'Allada. Rythmes ancestraux immortalisés.",
    songName: "Danse Rituelle • Tambours et Castagnettes",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-man-playing-a-bongo-drum-40429-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&auto=format&fit=crop&q=80",
    likes: 920,
    commentsCount: 48,
    sharesCount: 29,
    viewsCount: 2850,
    comments: [],
  },
  {
    id: "post-vid-chants-hounnon",
    isLive: false,
    authorNom: "Hounnon Houndégnon",
    authorGrade: "Hounnon Consacré",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    lignee: "Mantinkpon 1 • Temple Allada",
    temple: "Temple Royal Allada",
    caption: "Chants rituels des prêtresses Hounnon lors de la sortie sacrée d'Alafia au couvent royal.",
    songName: "Rythme Zindo Sacré • Harmonie des Temples",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-african-musicians-playing-traditional-drums-40432-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    likes: 640,
    commentsCount: 38,
    sharesCount: 19,
    viewsCount: 1890,
    comments: [],
  },
  {
    id: "post-live-vepres",
    isLive: true,
    authorNom: "Temple Central Abomey-Calavi",
    authorGrade: "Direct Cérémoniel",
    authorPhoto: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80",
    lignee: "Mantinkpon 1",
    temple: "Temple Central",
    caption: "🔴 DIRECT VÊPRES SACRÉES : Invocation de paix, de prospérité et de santé pour toute la communauté mondiale.",
    songName: "Prière du Soir • Chants et Libations",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-traditional-african-dancers-performing-outdoors-40431-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    likes: 1980,
    commentsCount: 160,
    sharesCount: 88,
    viewsCount: 4500,
    liveViewers: 680,
    comments: [],
  },
];

interface TognonVideoFeedProps {
  initialVideoId?: string | null;
  onClose: () => void;
  currentUser?: {
    nom: string;
    prenom: string;
    photoUrl?: string;
    role?: string;
    lignee?: string;
  } | null;
  onOpenLogin?: () => void;
  onOpenShareModal?: (title: string, url: string) => void;
}

export const TognonVideoFeed: React.FC<TognonVideoFeedProps> = ({
  initialVideoId,
  onClose,
  currentUser,
  onOpenLogin,
  onOpenShareModal,
}) => {
  // 1. Initialisation des éléments : si initialVideoId est fourni, placer cette vidéo EN PREMIER
  const [items, setItems] = useState<TognonItem[]>(() => {
    if (!initialVideoId) return INITIAL_TOGNON_ITEMS;
    const foundIndex = INITIAL_TOGNON_ITEMS.findIndex((item) => item.id === initialVideoId);
    if (foundIndex <= 0) return INITIAL_TOGNON_ITEMS;
    const targetItem = INITIAL_TOGNON_ITEMS[foundIndex];
    const remaining = INITIAL_TOGNON_ITEMS.filter((item) => item.id !== initialVideoId);
    return [targetItem, ...remaining];
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showPlayPauseAnim, setShowPlayPauseAnim] = useState<"play" | "pause" | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>({});
  const [followedAuthors, setFollowedAuthors] = useState<Record<string, boolean>>({});
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  // Modales & Tiroirs
  const [commentsDrawerOpen, setCommentsDrawerOpen] = useState<boolean>(false);
  const [activeCommentsItem, setActiveCommentsItem] = useState<TognonItem | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>("");

  const [authorProfileOpen, setAuthorProfileOpen] = useState<boolean>(false);
  const [selectedAuthor, setSelectedAuthor] = useState<TognonItem | null>(null);

  const [activeAgoraLive, setActiveAgoraLive] = useState<TognonItem | null>(null);
  const [copyToast, setCopyToast] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const lastTapRef = useRef<number>(0);

  // Initialisation des likes
  useEffect(() => {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
      counts[item.id] = item.likes;
    });
    setLikesCountMap((prev) => ({ ...counts, ...prev }));
  }, [items]);

  // Si initialVideoId change après le premier montage, réordonner pour mettre en premier
  useEffect(() => {
    if (initialVideoId) {
      setItems((prev) => {
        const foundIndex = prev.findIndex((i) => i.id === initialVideoId);
        if (foundIndex <= 0) return prev;
        const target = prev[foundIndex];
        const rest = prev.filter((i) => i.id !== initialVideoId);
        return [target, ...rest];
      });
      setActiveIndex(0);
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [initialVideoId]);

  // IntersectionObserver pour l'AUTOPLAY / PAUSE automatique lors du défilement vertical
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const indexAttr = entry.target.getAttribute("data-index");
          const videoId = entry.target.getAttribute("data-video-id");
          if (indexAttr === null || !videoId) return;
          const idx = parseInt(indexAttr, 10);
          const videoEl = videoRefs.current[videoId];

          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            setActiveIndex(idx);
            setIsPaused(false);
            if (videoEl) {
              videoEl.play().catch(() => {
                // Si la politique du navigateur bloque le son, rendre muet et relancer
                videoEl.muted = true;
                setIsMuted(true);
                videoEl.play().catch(() => {});
              });
            }
          } else {
            if (videoEl) {
              videoEl.pause();
            }
          }
        });
      },
      {
        root: container,
        threshold: [0.55, 0.8],
      }
    );

    const slides = container.querySelectorAll(".tognon-video-slide");
    slides.forEach((slide) => observer.observe(slide));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  // Raccourcis clavier (Flèches Haut/Bas, Espace, Mute, Echap)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (commentsDrawerOpen || authorProfileOpen || activeAgoraLive) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollSlide(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollSlide(-1);
      } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        toggleMute();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, commentsDrawerOpen, authorProfileOpen, activeAgoraLive]);

  // Faire défiler d'une diapositive vers le haut ou le bas
  const scrollSlide = (delta: number) => {
    if (!containerRef.current) return;
    const nextIndex = Math.max(0, Math.min(items.length - 1, activeIndex + delta));
    const targetEl = containerRef.current.querySelector(`[data-index="${nextIndex}"]`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toggle Play / Pause au tap
  const togglePlayPause = () => {
    const currentItem = items[activeIndex];
    if (!currentItem) return;
    const videoEl = videoRefs.current[currentItem.id];
    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl.play().catch(() => {});
      setIsPaused(false);
      setShowPlayPauseAnim("play");
    } else {
      videoEl.pause();
      setIsPaused(true);
      setShowPlayPauseAnim("pause");
    }

    setTimeout(() => {
      setShowPlayPauseAnim(null);
    }, 600);
  };

  // Toggle Mute pour toutes les vidéos
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    Object.values(videoRefs.current).forEach((v) => {
      if (v) v.muted = nextMuted;
    });
  };

  // Double-tap pour aimer (style TikTok avec cœur volant)
  const handleVideoTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap détecté !
      const currentItem = items[activeIndex];
      if (currentItem) {
        if (!likedMap[currentItem.id]) {
          toggleLike(currentItem.id);
        }
        // Ajouter un cœur volant
        const rect = e.currentTarget.getBoundingClientRect();
        let clientX = rect.width / 2;
        let clientY = rect.height / 2;
        if ("clientX" in e) {
          clientX = (e as React.MouseEvent).clientX - rect.left;
          clientY = (e as React.MouseEvent).clientY - rect.top;
        }
        const heartId = Date.now();
        setFloatingHearts((prev) => [...prev, { id: heartId, x: clientX, y: clientY }]);
        setTimeout(() => {
          setFloatingHearts((prev) => prev.filter((h) => h.id !== heartId));
        }, 800);
      }
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
      // Single tap temporisé pour basculer play/pause si pas de second tap
      setTimeout(() => {
        if (lastTapRef.current === now) {
          togglePlayPause();
          lastTapRef.current = 0;
        }
      }, DOUBLE_TAP_DELAY);
    }
  };

  // Toggle J'aime (Like)
  const toggleLike = (id: string) => {
    setLikedMap((prev) => {
      const isLiked = !!prev[id];
      const nextLiked = !isLiked;
      setLikesCountMap((c) => ({
        ...c,
        [id]: (c[id] || 0) + (nextLiked ? 1 : -1),
      }));
      return { ...prev, [id]: nextLiked };
    });
  };

  // Suivre / S'abonner à l'auteur ou à sa lignée
  const toggleFollow = (authorNom: string) => {
    setFollowedAuthors((prev) => ({
      ...prev,
      [authorNom]: !prev[authorNom],
    }));
  };

  // Défilement infini : recharge progressivement de nouvelles vidéos et directs
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 400) {
      // Charger 2 nouvelles vidéos sacrées / directs (exclusivement vidéo ou live en cours)
      const nextBatch: TognonItem[] = [
        {
          id: `tognon-infinite-${Date.now()}-1`,
          isLive: false,
          authorNom: "Temple Central Allada",
          authorGrade: "Dah Hounnongan",
          authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
          lignee: "Mantinkpon 1 • Racine Allada",
          temple: "Temple Racine",
          caption: "Chants de réjouissance sacrée et battements de gongs lors des rituels de paix Alafia.",
          songName: "Rythme Zinli Sacré • Gloire aux Aïeux",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-african-musicians-playing-traditional-drums-40432-large.mp4",
          posterUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
          likes: 780,
          commentsCount: 52,
          sharesCount: 31,
          viewsCount: 3100,
          comments: [],
        },
        {
          id: `tognon-infinite-${Date.now()}-2`,
          isLive: true,
          authorNom: "Dah Kpeto Gbedan",
          authorGrade: "Dah Hounnongan",
          authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
          lignee: "Lignée Ouidah Historique",
          temple: "Temple Central Ouidah",
          caption: "🔴 DIRECT AGORA : Veillée sacrée et bénédictions pour la protection des foyers et des familles.",
          songName: "Direct Agora • Prières d'Élévation",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-playing-drums-in-a-circle-40430-large.mp4",
          posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
          likes: 2150,
          commentsCount: 290,
          sharesCount: 140,
          viewsCount: 5800,
          liveViewers: 820,
          comments: [],
        },
      ];
      setItems((prev) => [...prev, ...nextBatch]);
    }
  };

  // Progression de la vidéo
  const handleTimeUpdate = (id: string, e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration) {
      const p = (video.currentTime / video.duration) * 100;
      setProgressMap((prev) => ({ ...prev, [id]: p }));
    }
  };

  // Ajouter un commentaire
  const handleAddComment = (itemId: string) => {
    if (!newCommentText.trim()) return;
    const authorName = currentUser ? `${currentUser.prenom} ${currentUser.nom}`.trim() : "Fidèle Initié";
    const authorPhoto = currentUser?.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";
    const authorGrade = currentUser?.role === "master_admin" ? "SaaS Master" : "Fidèle Thron";

    const newComment = {
      id: `comm-${Date.now()}`,
      authorNom: authorName,
      authorGrade: authorGrade,
      authorPhoto: authorPhoto,
      text: newCommentText.trim(),
      timestamp: "À l'instant",
      likes: 0,
    };

    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const currentComments = item.comments || [];
        return {
          ...item,
          commentsCount: item.commentsCount + 1,
          comments: [newComment, ...currentComments],
        };
      })
    );

    if (activeCommentsItem && activeCommentsItem.id === itemId) {
      setActiveCommentsItem((prev) =>
        prev
          ? {
              ...prev,
              commentsCount: prev.commentsCount + 1,
              comments: [newComment, ...(prev.comments || [])],
            }
          : null
      );
    }

    setNewCommentText("");
  };

  // Partage
  const handleShare = (item: TognonItem) => {
    if (onOpenShareModal) {
      onOpenShareModal(item.caption, window.location.href);
      return;
    }
    if (navigator.share) {
      navigator
        .share({
          title: `Tognon • ${item.authorNom}`,
          text: item.caption,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopyToast("Lien de la vidéo copié pour partage sur vos réseaux !");
      setTimeout(() => setCopyToast(null), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090A0F] text-white flex flex-col items-center justify-center overflow-hidden font-sans select-none animate-in fade-in duration-200">
      {/* Toast de copie */}
      {copyToast && (
        <div className="absolute top-20 z-50 px-4 py-2 rounded-full bg-blue-600 text-white font-bold text-xs shadow-2xl animate-in fade-in slide-in-from-top-4">
          {copyToast}
        </div>
      )}

      {/* BOUTON FLOTTANT DE RETOUR À HOUNTO (VISIBLE SUR MOBILE ET SUR GRAND ÉCRAN) */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-40">
        <button
          onClick={onClose}
          className="px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-black backdrop-blur-xl border border-white/15 shadow-2xl flex items-center gap-2 cursor-pointer transition-all active:scale-95 group hover:border-blue-500/50"
          title="Revenir au réseau Togoun / Accueil (Échap)"
        >
          <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Retour à Hounto</span>
          <span className="hidden md:inline-block text-[10px] text-slate-400 font-mono px-1.5 py-0.5 bg-white/10 rounded">
            Échap
          </span>
        </button>
      </div>

      {/* COMMANDES DE DÉFILEMENT SUR GRAND ÉCRAN (FLÈCHES HAUT / BAS) */}
      <div className="hidden lg:flex flex-col items-center gap-3 absolute right-6 top-1/2 -translate-y-1/2 z-40 text-white">
        <button
          onClick={() => scrollSlide(-1)}
          disabled={activeIndex === 0}
          className={`p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/15 transition-all shadow-xl ${
            activeIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-blue-600 hover:border-blue-400 cursor-pointer active:scale-90"
          }`}
          title="Vidéo précédente (Flèche Haut)"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <span className="text-[11px] font-mono font-bold text-slate-400">
          {activeIndex + 1}/{items.length}
        </span>
        <button
          onClick={() => scrollSlide(1)}
          disabled={activeIndex === items.length - 1}
          className={`p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/15 transition-all shadow-xl ${
            activeIndex === items.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-blue-600 hover:border-blue-400 cursor-pointer active:scale-90"
          }`}
          title="Vidéo suivante (Flèche Bas)"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* BOUTON TOGGLE SON (MUTE / UNMUTE) FLOTTANT HAUT-DROITE */}
      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-40 flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="p-2.5 sm:px-3 sm:py-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xl border border-white/15 shadow-2xl flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          title={isMuted ? "Activer le son (M)" : "Couper le son (M)"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-blue-300" />
              <span className="hidden sm:inline text-[11px] font-bold text-blue-200">Muet</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-white" />
              <span className="hidden sm:inline text-[11px] font-bold">Son actif</span>
            </>
          )}
        </button>
      </div>

      {/* CADRE SMARTPHONE VERTICAL TIKTOK (PLEIN ÉCRAN MOBILE, CADRE CENTRÉ ÉLÉGANT SUR DESKTOP) */}
      <div className="relative w-full h-full md:max-w-[430px] lg:max-w-[460px] md:h-[calc(100vh-24px)] md:my-auto md:rounded-[36px] overflow-hidden bg-black md:border md:border-white/15 md:shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between">
        {/* BANDEAU SUPÉRIEUR INTÉGRÉ AU CADRE */}
        <div className="absolute top-0 left-0 right-0 z-30 pt-4 pb-6 px-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-black tracking-wide pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Tognon • Fil Vidéo</span>
          </div>
        </div>

        {/* CONTENEUR DE DÉFILEMENT VERTICAL SNAP TIKTOK (SCROLL SNAP VERTICAL INFINI) */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none flex-1"
          style={{ scrollSnapType: "y mandatory" }}
        >
          {items.map((item, idx) => {
            const isLiked = !!likedMap[item.id];
            const likesCount = likesCountMap[item.id] || item.likes;
            const isFollowed = !!followedAuthors[item.authorNom];
            const isCurrent = activeIndex === idx;

            return (
              <div
                key={item.id}
                data-index={idx}
                data-video-id={item.id}
                className="tognon-video-slide relative w-full h-full snap-start snap-always bg-black flex flex-col justify-between overflow-hidden"
                style={{ minHeight: "100%" }}
              >
                {/* LECTEUR VIDÉO VERTICAL PLEIN ÉCRAN */}
                <div
                  className="absolute inset-0 z-0 cursor-pointer overflow-hidden flex items-center justify-center"
                  onClick={handleVideoTap}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[item.id] = el;
                    }}
                    src={item.videoUrl}
                    poster={item.posterUrl}
                    loop
                    playsInline
                    muted={isMuted}
                    onTimeUpdate={(e) => handleTimeUpdate(item.id, e)}
                    className="w-full h-full object-cover select-none"
                  />

                  {/* OVERLAYS D'OMBRE POUR LISIBILITÉ DU TEXTE */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-none" />

                  {/* ANIMATION FLOTTANTE PLAY / PAUSE AU TAP */}
                  {isCurrent && showPlayPauseAnim && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 animate-in fade-in zoom-in duration-150">
                      <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 shadow-2xl">
                        {showPlayPauseAnim === "play" ? (
                          <Play className="w-10 h-10 fill-current ml-1" />
                        ) : (
                          <Pause className="w-10 h-10 fill-current" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* CŒURS VOLANTS SUR DOUBLE-TAP */}
                  {isCurrent &&
                    floatingHearts.map((h) => (
                      <div
                        key={h.id}
                        className="absolute pointer-events-none z-30 animate-out fade-out zoom-out duration-700"
                        style={{
                          left: `${h.x - 30}px`,
                          top: `${h.y - 30}px`,
                        }}
                      >
                        <Heart className="w-16 h-16 fill-rose-500 text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
                      </div>
                    ))}
                </div>

                {/* HAUT DE VIDÉO : BADGE DU DIRECT OU STATS DE VUES */}
                <div className="relative z-20 pt-14 px-4 flex items-center justify-between pointer-events-none">
                  {item.isLive ? (
                    <div className="flex items-center gap-2 pointer-events-auto">
                      <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-black text-xs flex items-center gap-1.5 shadow-lg animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-white" />
                        EN DIRECT • EN COURS
                      </span>
                      {item.liveViewers && (
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-blue-100 text-xs font-bold border border-white/15 flex items-center gap-1 shadow">
                          <Eye className="w-3.5 h-3.5 text-blue-400" />
                          {item.liveViewers.toLocaleString()} en ligne
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="pointer-events-auto">
                      <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-slate-200 text-[11px] font-bold border border-white/10 flex items-center gap-1 shadow">
                        <Eye className="w-3 h-3 text-blue-400" />
                        {item.viewsCount.toLocaleString()} vues
                      </span>
                    </div>
                  )}
                </div>

                {/* BAS DE VIDÉO : TEXTES + RAIL DES ACTIONS VERTICALES */}
                <div className="relative z-20 pb-6 px-3.5 sm:px-4 flex items-end justify-between gap-3 pointer-events-auto">
                  {/* ZONE D'INFORMATION DE GAUCHE */}
                  <div className="flex-1 space-y-2 max-w-[78%]">
                    {/* Auteur & Lignée (Cliquable pour ouvrir le profil complet) */}
                    <button
                      onClick={() => {
                        setSelectedAuthor(item);
                        setAuthorProfileOpen(true);
                      }}
                      className="text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-black text-sm sm:text-base text-white group-hover:text-blue-300 drop-shadow transition-colors">
                          {item.authorNom}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-blue-400 fill-blue-500 flex-shrink-0" />
                      </div>
                      <span className="text-[11px] text-blue-200 font-bold block drop-shadow">
                        {item.authorGrade} • {item.lignee}
                      </span>
                    </button>

                    {/* Légende / Description de la vidéo */}
                    <p className="text-xs sm:text-sm text-white/95 leading-relaxed drop-shadow line-clamp-3">
                      {item.caption}
                    </p>

                    {/* Bandeau Audio Sacré / Musique */}
                    <div className="flex items-center gap-2 text-[11px] text-blue-100 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full w-fit max-w-full">
                      <Music className="w-3.5 h-3.5 animate-bounce flex-shrink-0 text-blue-400" />
                      <span className="truncate">{item.songName}</span>
                    </div>

                    {/* ACTION PROMINENTE POUR LES DIRECTS EN COURS */}
                    {item.isLive && (
                      <div className="pt-1">
                        <button
                          onClick={() => setActiveAgoraLive(item)}
                          className="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black text-xs shadow-xl flex items-center gap-2 cursor-pointer transition-all active:scale-95 border border-white/20 animate-pulse"
                        >
                          <Radio className="w-4 h-4" />
                          <span>Rejoindre le Direct Agora</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* RAIL VERTICAL DES INTERACTIONS À DROITE */}
                  <div className="flex flex-col items-center gap-3.5 text-white">
                    {/* AVATAR DE L'AUTEUR + BOUTON S'ABONNER */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          setSelectedAuthor(item);
                          setAuthorProfileOpen(true);
                        }}
                        className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 shadow-xl cursor-pointer hover:border-blue-400 transition-colors"
                        title="Consulter le profil de l'auteur"
                      >
                        <img
                          src={item.authorPhoto}
                          alt={item.authorNom}
                          className="w-full h-full object-cover"
                        />
                      </button>
                      <button
                        onClick={() => toggleFollow(item.authorNom)}
                        className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-white shadow-md transition-all cursor-pointer ${
                          isFollowed ? "bg-slate-700 text-slate-300" : "bg-blue-600 hover:bg-blue-500"
                        }`}
                        title={isFollowed ? "Abonné" : "S'abonner"}
                      >
                        {isFollowed ? <UserCheck className="w-3 h-3" /> : <UserPlus className="w-3 h-3" />}
                      </button>
                    </div>

                    {/* BOUTON J'AIME (HEART) */}
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="flex flex-col items-center gap-1 group cursor-pointer active:scale-125 transition-transform"
                    >
                      <div
                        className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                          isLiked
                            ? "bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.6)]"
                            : "bg-black/50 text-white hover:bg-black/70 border border-white/10"
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
                      </div>
                      <span className="text-[10px] font-bold drop-shadow">
                        {likesCount.toLocaleString()}
                      </span>
                    </button>

                    {/* BOUTON COMMENTAIRES */}
                    <button
                      onClick={() => {
                        setActiveCommentsItem(item);
                        setCommentsDrawerOpen(true);
                      }}
                      className="flex flex-col items-center gap-1 group cursor-pointer active:scale-95 transition-transform"
                    >
                      <div className="w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[10px] font-bold drop-shadow">
                        {item.commentsCount}
                      </span>
                    </button>

                    {/* BOUTON PARTAGER */}
                    <button
                      onClick={() => handleShare(item)}
                      className="flex flex-col items-center gap-1 group cursor-pointer active:scale-95 transition-transform"
                    >
                      <div className="w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all">
                        <Share2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[10px] font-bold drop-shadow">Partager</span>
                    </button>

                    {/* DISQUE VINYLE TOURNANT AVEC ICONE MUSIQUE */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-900 to-black border-2 border-white/30 flex items-center justify-center shadow-lg animate-spin [animation-duration:6s]">
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-600" />
                    </div>
                  </div>
                </div>

                {/* BARRE DE PROGRESSION EN BAS DU LECTEUR */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                  <div
                    className="h-full bg-blue-500 transition-all duration-150"
                    style={{ width: `${progressMap[item.id] || 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. TIROIR DES COMMENTAIRES (STYLE BOTTOM SHEET MODAL TIKTOK)         */}
      {/* ==================================================================== */}
      {commentsDrawerOpen && activeCommentsItem && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg mx-auto bg-slate-900 border-t border-white/20 rounded-t-3xl p-4 sm:p-5 text-white max-h-[75vh] flex flex-col justify-between shadow-2xl animate-in slide-in-from-bottom duration-200">
            {/* Entête du tiroir */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <h4 className="font-serif font-black text-sm text-white">
                  Commentaires ({activeCommentsItem.commentsCount})
                </h4>
              </div>
              <button
                onClick={() => setCommentsDrawerOpen(false)}
                className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Liste scrollable des commentaires */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3 max-h-80 pr-1">
              {(activeCommentsItem.comments && activeCommentsItem.comments.length > 0) ? (
                activeCommentsItem.comments.map((comm) => (
                  <div key={comm.id} className="flex items-start gap-3 text-xs">
                    <img
                      src={comm.authorPhoto}
                      alt={comm.authorNom}
                      className="w-8 h-8 rounded-full object-cover border border-white/20 flex-shrink-0"
                    />
                    <div className="bg-white/10 rounded-2xl p-3 flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{comm.authorNom}</span>
                        <span className="text-[10px] text-slate-400">{comm.timestamp}</span>
                      </div>
                      <span className="text-[10px] text-blue-300 font-semibold block">{comm.authorGrade}</span>
                      <p className="text-slate-100 text-xs leading-relaxed">{comm.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs space-y-1">
                  <p>Aucun commentaire pour le moment.</p>
                  <p className="text-blue-300">Soyez le premier à adresser une bénédiction ou parole de sagesse !</p>
                </div>
              )}
            </div>

            {/* Barre de saisie d'un nouveau commentaire */}
            <div className="pt-3 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment(activeCommentsItem.id)}
                placeholder="Écrire une bénédiction, parole de paix (Alafia)..."
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleAddComment(activeCommentsItem.id)}
                className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold cursor-pointer shadow-lg active:scale-95 transition-all"
                title="Publier le commentaire"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. MODALE / TIROIR DE CONSULTATION DU PROFIL DE L'AUTEUR             */}
      {/* ==================================================================== */}
      {authorProfileOpen && selectedAuthor && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md mx-auto bg-slate-900 border border-white/15 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-2xl space-y-5 animate-in slide-in-from-bottom duration-200">
            {/* Entête avec photo & fermeture */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedAuthor.authorPhoto}
                  alt={selectedAuthor.authorNom}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-xl"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif font-black text-base text-white">{selectedAuthor.authorNom}</h3>
                    <CheckCircle2 className="w-4 h-4 text-blue-400 fill-blue-500" />
                  </div>
                  <span className="text-xs text-blue-300 font-bold block">{selectedAuthor.authorGrade}</span>
                  <span className="text-[11px] text-slate-400 block">{selectedAuthor.lignee}</span>
                </div>
              </div>
              <button
                onClick={() => setAuthorProfileOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Statistiques d'audience du profil */}
            <div className="grid grid-cols-3 gap-2 py-3 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div>
                <span className="font-mono font-black text-sm text-white block">18</span>
                <span className="text-[10px] text-slate-400">Vidéos</span>
              </div>
              <div className="border-x border-white/10">
                <span className="font-mono font-black text-sm text-white block">4.8k</span>
                <span className="text-[10px] text-slate-400">Abonnés</span>
              </div>
              <div>
                <span className="font-mono font-black text-sm text-white block">24.5k</span>
                <span className="text-[10px] text-slate-400">Bénédictions</span>
              </div>
            </div>

            {/* Temple et engagements sacrés */}
            <div className="p-3 bg-blue-950/40 rounded-2xl border border-blue-500/20 text-xs text-blue-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Siège et Temple : {selectedAuthor.temple || "Temple Central Alafia"}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Gardien des traditions sacrées du Trône Thron. Diffuse régulièrement des enseignements oraculaires, cantiques Zindo et cérémonies en direct.
              </p>
            </div>

            {/* Actions du profil */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => toggleFollow(selectedAuthor.authorNom)}
                className={`w-full py-2.5 rounded-xl font-black text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                  followedAuthors[selectedAuthor.authorNom]
                    ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                {followedAuthors[selectedAuthor.authorNom] ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Abonné ✓</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>S'abonner à la Lignée</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setAuthorProfileOpen(false);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 cursor-pointer active:scale-95 transition-all text-center"
              >
                Voir sur Togoun
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. SALLE DIRECT LIVE AGORA EN MODALE INTERACTIVE                     */}
      {/* ==================================================================== */}
      {activeAgoraLive && (
        <LivesAgora onClose={() => setActiveAgoraLive(null)} />
      )}
    </div>
  );
};
