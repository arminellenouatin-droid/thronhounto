"use client";

import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
} from "lucide-react";

interface VideoItem {
  id: string;
  author: string;
  grade: string;
  caption: string;
  songName: string;
  likes: number;
  comments: number;
  videoPoster: string;
}

export const TognonVideoFeed: React.FC = () => {
  const [videos] = useState<VideoItem[]>([
    {
      id: "vid-1",
      author: "Hounto Mantinkpon ò",
      grade: "Temple Suprême",
      caption: "Chants sacrés et battements de tambours rituels lors de la cérémonie de bénédiction des nouveaux baptisés (Hounvi). Paix et élévation à la communauté.",
      songName: "Chant Sacré Alafia • Rythme Zinli Traditionnel",
      likes: 1240,
      comments: 89,
      videoPoster: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "vid-2",
      author: "Togbé Mintoniu bo tozé",
      grade: "Togbegan daho",
      caption: "Enseignement spirituel sur le grade de Hounnon et la responsabilité sacrée du Hounto. Joie de vivre en communauté (Tognon).",
      songName: "Parole de Sagesse Ancestrale • Togbé Mintoniu",
      likes: 852,
      comments: 64,
      videoPoster: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const currentVideo = videos[currentIndex];

  const toggleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-md mx-auto px-2 sm:px-0 py-2 h-[calc(100vh-140px)] flex flex-col items-center justify-center">
      {/* CADRE VIDÉO VERTICAL PLEIN ÉCRAN STYLE TIKTOK/REELS */}
      <div className="relative w-full h-full max-h-[720px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-between">
        {/* POSTER / SIMULATEUR DE LECTEUR VIDÉO */}
        <div
          className="absolute inset-0 bg-cover bg-center cursor-pointer"
          style={{ backgroundImage: `url(${currentVideo.videoPoster})` }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {/* OVERLAY SOMBRE */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"></div>

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm">
                <Play className="w-8 h-8 ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* EN-TÊTE DU LECTEUR */}
        <div className="relative z-10 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-thron-gold/30 text-thron-gold border border-thron-gold/40 text-[10px] font-bold uppercase tracking-wider">
              Tognon • Fil Vidéo Sacré
            </span>
          </div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* ACTIONS VERTICALES SUR LE CÔTÉ DROIT */}
        <div className="relative z-10 p-4 self-end flex flex-col items-center gap-4 text-white">
          {/* Avatar de l'auteur */}
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-thron-gold shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bouton J'aime */}
          <button
            onClick={() => toggleLike(currentVideo.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform active:scale-125 ${
                liked[currentVideo.id]
                  ? "bg-rose-600 text-white"
                  : "bg-black/40 text-white hover:bg-black/60"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  liked[currentVideo.id] ? "fill-current" : ""
                }`}
              />
            </div>
            <span className="text-[11px] font-bold drop-shadow">
              {currentVideo.likes + (liked[currentVideo.id] ? 1 : 0)}
            </span>
          </button>

          {/* Commentaires */}
          <button className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 backdrop-blur-sm">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold drop-shadow">
              {currentVideo.comments}
            </span>
          </button>

          {/* Partager */}
          <button className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 backdrop-blur-sm">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold drop-shadow">Partage</span>
          </button>
        </div>

        {/* LÉGENDE DU BAS */}
        <div className="relative z-10 p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-serif font-bold text-sm text-thron-gold">
              @{currentVideo.author}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-medium">
              {currentVideo.grade}
            </span>
          </div>
          <p className="text-xs text-white/90 line-clamp-2 leading-relaxed drop-shadow">
            {currentVideo.caption}
          </p>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-amber-200">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span className="truncate">{currentVideo.songName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
