"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Users,
  Send,
  Eye,
  CheckCircle2,
  Music,
} from "lucide-react";

export interface VideoLiveItem {
  id: string;
  isLive?: boolean;
  authorNom: string;
  authorGrade: string;
  authorPhoto: string;
  lignee: string;
  caption: string;
  songName: string;
  videoUrl: string;
  posterUrl: string;
  likes: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  liveViewers?: number;
}

const DEFAULT_VIDEOS_LIVES: VideoLiveItem[] = [
  {
    id: "vl-live-1",
    isLive: true,
    authorNom: "Togbé Mintoniu bo tozé",
    authorGrade: "Togbegan daho",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    lignee: "Lignée Mantinkpon 1 (Siège Central)",
    caption: "🔴 EN DIRECT DU HOUNTO : Grande consécration des nouveaux initiés Atinkindouvi et prières oraculaires pour la paix.",
    songName: "Direct Live Agora • Sonorités Sacrées du Trône",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-african-musicians-playing-traditional-drums-40432-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    likes: 2480,
    commentsCount: 312,
    sharesCount: 145,
    viewsCount: 6800,
    liveViewers: 1420,
  },
  {
    id: "vl-vid-1",
    isLive: false,
    authorNom: "Hounnon Mahugnon DOSSOU",
    authorGrade: "Hounnon",
    authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    lignee: "Lignée Mantinkpon 1 • Temple Calavi",
    caption: "Chants d'allégresse et battements de tambours rituels lors de la cérémonie Alafia. Que la concorde règne sur tous les foyers.",
    songName: "Cantique Sacré Alafia • Rythme Zinli Traditionnel",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-traditional-african-dancers-performing-outdoors-40431-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    likes: 1850,
    commentsCount: 94,
    sharesCount: 68,
    viewsCount: 4210,
  },
  {
    id: "vl-live-2",
    isLive: true,
    authorNom: "Dah MONSIA Gbédan",
    authorGrade: "Hounnongan daho",
    authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    lignee: "Lignée Ouidah Historique",
    caption: "🔴 DIRECT AGORA : Consultation collective et offrandes aux mânes des ancêtres fondateurs du culte Thron.",
    songName: "Direct Temple Ouidah • Clochettes et Gong Sacré",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-playing-drums-in-a-circle-40430-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    likes: 3120,
    commentsCount: 420,
    sharesCount: 210,
    viewsCount: 8900,
    liveViewers: 950,
  },
  {
    id: "vl-vid-2",
    isLive: false,
    authorNom: "Hounvi Kpodékon",
    authorGrade: "Hounvi Initié",
    authorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    lignee: "Mantinkpon 1",
    caption: "Apprentissage des pas de danse sacrée et des rythmes cérémoniels au couvent central. Fierté de nos racines !",
    songName: "Danse Rituelle • Tambours et Castagnettes",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-man-playing-a-bongo-drum-40429-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&auto=format&fit=crop&q=80",
    likes: 920,
    commentsCount: 48,
    sharesCount: 29,
    viewsCount: 2850,
  },
];

interface TogounVideoImmersionViewProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenShareModal?: (title: string, url: string) => void;
}

export const TogounVideoImmersionView: React.FC<TogounVideoImmersionViewProps> = ({
  isOpen,
  onClose,
  onOpenShareModal,
}) => {
  const [items, setItems] = useState<VideoLiveItem[]>(DEFAULT_VIDEOS_LIVES);
  const [activeVideoId, setActiveVideoId] = useState<string>(DEFAULT_VIDEOS_LIVES[0].id);
  const [isMuted, setIsMuted] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>({});
  const [commentsDrawerOpen, setCommentsDrawerOpen] = useState(false);
  const [activeCommentsItem, setActiveCommentsItem] = useState<VideoLiveItem | null>(null);
  const [commentText, setCommentText] = useState("");
  const [liveChatMessages, setLiveChatMessages] = useState<Record<string, string[]>>({
    "vl-live-1": [
      "Alafia à tout le Hounto ! 🙏",
      "Que les bénédictions reposent sur nous",
      "Très belle cérémonie en direct !",
      "Présent depuis Cotonou",
    ],
    "vl-live-2": [
      "Gloire aux ancêtres 🌿",
      "Bénédictions reçues avec respect",
      "Ouidah en force !",
    ],
  });

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initialisation des likes
  useEffect(() => {
    const initCounts: Record<string, number> = {};
    items.forEach((item) => {
      initCounts[item.id] = item.likes;
    });
    setLikesCountMap(initCounts);
  }, [items]);

  // Observer pour détecter la vidéo active au centre de l'écran et déclencher l'AUTOPLAY
  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute("data-video-id");
          if (!videoId) return;

          const videoEl = videoRefs.current[videoId];
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            setActiveVideoId(videoId);
            if (videoEl) {
              videoEl.play().catch(() => {
                // Autoplay policy fallback: mute and play
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
        threshold: [0.55, 0.8],
      }
    );

    const videoCards = document.querySelectorAll(".togoun-video-card");
    videoCards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, [isOpen, items]);

  // Scroll infini automatique : quand on approche de la fin, générer plus de vidéos
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 400) {
      // Charger plus de vidéos automatiquement
      const newItems: VideoLiveItem[] = [
        {
          id: `vl-auto-${Date.now()}-1`,
          isLive: false,
          authorNom: "Hounnon Houndégnon",
          authorGrade: "Hounnon",
          authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
          lignee: "Mantinkpon 1 • Temple Allada",
          caption: "Chants rituels des prêtresses Hounnon lors de la sortie sacrée d'Alafia.",
          songName: "Rythme Zindo Sacré • Harmonie des Temples",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-african-musicians-playing-traditional-drums-40432-large.mp4",
          posterUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
          likes: 640,
          commentsCount: 38,
          sharesCount: 19,
          viewsCount: 1890,
        },
        {
          id: `vl-auto-${Date.now()}-2`,
          isLive: true,
          authorNom: "Temple Central Abomey-Calavi",
          authorGrade: "Direct Cérémoniel",
          authorPhoto: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80",
          lignee: "Mantinkpon 1",
          caption: "🔴 DIRECT VÊPRES SACRÉES : Invocation de paix, de prospérité et de santé pour toute la communauté mondiale.",
          songName: "Prière du Soir • Chants et Libations",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-traditional-african-dancers-performing-outdoors-40431-large.mp4",
          posterUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
          likes: 1980,
          commentsCount: 160,
          sharesCount: 88,
          viewsCount: 4500,
          liveViewers: 680,
        },
      ];
      setItems((prev) => [...prev, ...newItems]);
    }
  };

  const handleToggleLike = (id: string) => {
    setLikedMap((prev) => {
      const isCurrentlyLiked = !!prev[id];
      const nextLiked = !isCurrentlyLiked;
      setLikesCountMap((c) => ({
        ...c,
        [id]: (c[id] || 0) + (nextLiked ? 1 : -1),
      }));
      return { ...prev, [id]: nextLiked };
    });
  };

  const handleAddComment = (videoId: string) => {
    if (!commentText.trim()) return;
    setLiveChatMessages((prev) => ({
      ...prev,
      [videoId]: [...(prev[videoId] || []), commentText.trim()],
    }));
    setCommentText("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* ==================================================================== */}
      {/* 1. EN-TÊTE ÉPURÉ DE SORTIE (SANS L'ENTÊTE NORMAL DU SITE)            */}
      {/* ==================================================================== */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 py-3 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
            title="Fermer et revenir à la page d'accueil"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold text-xs pr-1">Fermer / Accueil</span>
          </button>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 border border-blue-500/25 text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Togoun • Vidéos & Lives
          </span>
        </div>

        {/* Indicateurs en direct & Mute audio */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/90 text-white text-[11px] font-bold shadow animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            <span>EN DIRECT</span>
          </div>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              Object.values(videoRefs.current).forEach((v) => {
                if (v) v.muted = !isMuted;
              });
            }}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all cursor-pointer"
            title={isMuted ? "Activer le son" : "Couper le son"}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-blue-200" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. CONTENEUR SCROLL INFINI TIKTOK / REELS VERTICAL (AUTOPLAY)        */}
      {/* ==================================================================== */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {items.map((item) => {
          const isLiked = !!likedMap[item.id];
          const likesCount = likesCountMap[item.id] || item.likes;
          const isCurrentActive = activeVideoId === item.id;

          return (
            <div
              key={item.id}
              data-video-id={item.id}
              className="togoun-video-card relative w-full h-screen max-w-lg mx-auto snap-center bg-neutral-950 flex flex-col justify-between overflow-hidden"
            >
              {/* LECTEUR VIDÉO AVEC LECTURE AUTOMATIQUE */}
              <div className="absolute inset-0 z-0">
                <video
                  ref={(el) => {
                    videoRefs.current[item.id] = el;
                  }}
                  src={item.videoUrl}
                  poster={item.posterUrl}
                  loop
                  playsInline
                  muted={isMuted}
                  className="w-full h-full object-cover"
                />

                {/* OVERLAYS D'OMBRE */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85 pointer-events-none" />
              </div>

              {/* BOUTON PLAY/PAUSE AU CENTRE AU CLIC */}
              <button
                onClick={() => {
                  const el = videoRefs.current[item.id];
                  if (el) {
                    if (el.paused) el.play();
                    else el.pause();
                  }
                }}
                className="absolute inset-0 z-10 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/10 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white">
                  {videoRefs.current[item.id]?.paused ? (
                    <Play className="w-8 h-8 fill-current ml-1" />
                  ) : (
                    <Pause className="w-8 h-8 fill-current" />
                  )}
                </div>
              </button>

              {/* HAUT DE VIDÉO : BADGE LIVE OU ÉDITEUR */}
              <div className="relative z-20 pt-16 px-4 flex items-center justify-between">
                {item.isLive ? (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      LIVE AGORA
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-blue-100 text-xs font-bold border border-white/20 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {item.liveViewers?.toLocaleString()} spectateurs
                    </span>
                  </div>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-slate-200 text-[10px] font-bold border border-white/10 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-blue-400" />
                    {item.viewsCount.toLocaleString()} vues
                  </span>
                )}
              </div>

              {/* BAS DE VIDÉO : INFORMATIONS + ACTIONS LATÉRALES */}
              <div className="relative z-20 pb-8 px-4 flex items-end justify-between gap-4">
                {/* GAUCHE : DIGNITAIRE, LIGNÉE, LÉGENDE & CHAT EN DIRECT */}
                <div className="flex-1 space-y-2 max-w-[78%]">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.authorPhoto}
                      alt={item.authorNom}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/30 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif font-black text-sm text-white drop-shadow">
                          {item.authorNom}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-500" />
                      </div>
                      <span className="text-[10px] text-blue-200 font-bold block">
                        {item.authorGrade} • {item.lignee}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-white/95 leading-relaxed drop-shadow line-clamp-3">
                    {item.caption}
                  </p>

                  {/* BANDEAU MUSIQUE / CHANT SACRÉ */}
                  <div className="flex items-center gap-2 text-[11px] text-blue-100 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full w-fit max-w-full">
                    <Music className="w-3.5 h-3.5 animate-bounce flex-shrink-0" />
                    <span className="truncate">{item.songName}</span>
                  </div>

                  {/* MESSAGES DE CHAT EN DIRECT EN SURIMPRESSION (POUR LES LIVES) */}
                  {item.isLive && liveChatMessages[item.id] && (
                    <div className="space-y-1 pt-1 max-h-24 overflow-y-hidden mask-gradient-b">
                      {liveChatMessages[item.id].slice(-3).map((msg, i) => (
                        <div
                          key={i}
                          className="text-[11px] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl text-slate-100 max-w-full truncate border border-white/10"
                        >
                          <span className="font-bold text-blue-200 mr-1.5">Fidèle :</span>
                          <span>{msg}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* DROITE : BOUTONS D'INTERACTIONS VERTICALES (J'AIME, COMMENTER, PARTAGER) */}
                <div className="flex flex-col items-center gap-4 text-white">
                  {/* J'aime */}
                  <button
                    onClick={() => handleToggleLike(item.id)}
                    className="flex flex-col items-center gap-1 group cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                        isLiked
                          ? "bg-rose-600 text-white shadow-lg scale-110"
                          : "bg-black/50 text-white hover:bg-black/70"
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${isLiked ? "fill-white" : ""}`} />
                    </div>
                    <span className="text-[10px] font-bold drop-shadow">
                      {likesCount.toLocaleString()}
                    </span>
                  </button>

                  {/* Commentaires */}
                  <button
                    onClick={() => {
                      setActiveCommentsItem(item);
                      setCommentsDrawerOpen(true);
                    }}
                    className="flex flex-col items-center gap-1 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md flex items-center justify-center transition-all">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-bold drop-shadow">
                      {item.commentsCount}
                    </span>
                  </button>

                  {/* Partage sur les réseaux */}
                  <button
                    onClick={() => {
                      if (onOpenShareModal) {
                        onOpenShareModal(item.caption, window.location.href);
                      } else {
                        if (navigator.share) {
                          navigator.share({
                            title: item.authorNom,
                            text: item.caption,
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert("Lien de la vidéo copié pour partage sur vos réseaux !");
                        }
                      }
                    }}
                    className="flex flex-col items-center gap-1 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md flex items-center justify-center transition-all">
                      <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-bold drop-shadow">Partager</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* 3. TIROIR DES COMMENTAIRES / CHAT EN DIRECT EN DIRECT                */}
      {/* ==================================================================== */}
      {commentsDrawerOpen && activeCommentsItem && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg mx-auto bg-slate-900 border-t border-white/20 rounded-t-3xl p-4 sm:p-5 text-white max-h-[70vh] flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="font-serif font-bold text-sm text-blue-500 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                {activeCommentsItem.isLive ? "Chat en Direct Live Agora" : "Commentaires de la communauté"}
              </h4>
              <button
                onClick={() => setCommentsDrawerOpen(false)}
                className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Liste des messages */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5 max-h-80 pr-1">
              {(liveChatMessages[activeCommentsItem.id] || []).map((msg, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-[10px] flex-shrink-0">
                    F
                  </div>
                  <div className="bg-white/10 rounded-2xl p-2.5 flex-1">
                    <span className="font-bold text-blue-200 block text-[10px]">Fidèle Thron</span>
                    <p className="text-slate-100 text-xs mt-0.5">{msg}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Saisie */}
            <div className="pt-3 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment(activeCommentsItem.id)}
                placeholder="Écrire un message de paix ou bénédiction..."
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
              <button
                onClick={() => handleAddComment(activeCommentsItem.id)}
                className="p-2.5 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 cursor-pointer shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
