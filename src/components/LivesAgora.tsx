"use client";

import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Users,
  Sparkles,
  Radio,
  X,
  Send,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Hand,
  Gift,
} from "lucide-react";

interface LiveComment {
  id: string;
  user: string;
  grade: string;
  avatar: string;
  text: string;
}

export const LivesAgora: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [viewerCount, setViewerCount] = useState(342);
  const [heartsCount, setHeartsCount] = useState(1850);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number }[]>([]);
  const [comments, setComments] = useState<LiveComment[]>([
    {
      id: "1",
      user: "Mahugnon DOSSOU",
      grade: "Hounnon",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
      text: "Alafia à toute l'assemblée sacrée 🙏",
    },
    {
      id: "2",
      user: "Pelagie TOSSOU",
      grade: "Tassinon",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      text: "Que la bénédiction du Trône repose sur nous !",
    },
    {
      id: "3",
      user: "Koffi AGBOSSOU",
      grade: "Hounnon do alidji",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      text: "Enseignement très profond sur le respect des ancêtres.",
    },
  ]);

  const [inputComment, setInputComment] = useState("");
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [handRaised, setHandRaised] = useState(false);

  // Animation des cœurs flottants lorsqu'on appuie sur le bouton Cœur
  const triggerHeart = () => {
    setHeartsCount((prev) => prev + 1);
    const newHeart = {
      id: Date.now() + Math.random(),
      left: 60 + Math.random() * 30, // Entre 60% et 90% de la largeur
    };
    setFloatingHearts((prev) => [...prev.slice(-15), newHeart]);
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputComment.trim()) return;

    const newC: LiveComment = {
      id: Date.now().toString(),
      user: "Ayikodji MONSIA",
      grade: "Hounnon",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      text: inputComment,
    };

    setComments((prev) => [...prev, newC]);
    setInputComment("");
  };

  return (
    <div className="relative w-full max-w-lg mx-auto h-[calc(100vh-130px)] max-h-[750px] bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-thron-gold/40">
      {/* ARRIÈRE-PLAN VIDÉO DU LIVE (Simulation Agora RTC) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/80"></div>
      </div>

      {/* EN-TÊTE DU LIVE STYLE TIKTOK */}
      <div className="relative z-20 p-3 sm:p-4 flex items-center justify-between text-white">
        {/* Hôte du Live */}
        <div className="flex items-center gap-2.5 bg-black/50 backdrop-blur-md rounded-full pl-1 pr-3 py-1 border border-white/10">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-thron-gold">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
              alt="Hôte"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-xs">Togbé Mintoniu</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <span className="text-[10px] text-thron-gold font-semibold">
              Enseignement Sacré Mantinkpon ò
            </span>
          </div>
        </div>

        {/* Compteur Spectateurs & Badge En Direct */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-[11px] font-bold shadow">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>EN DIRECT</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-semibold text-white/90 border border-white/10">
            <Users className="w-3.5 h-3.5 text-amber-300" />
            <span>{viewerCount}</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* CŒURS FLOTTANTS ANIMÉS */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {floatingHearts.map((h) => (
          <div
            key={h.id}
            style={{ left: `${h.left}%` }}
            className="absolute bottom-20 animate-fade-in transition-all duration-1000 text-rose-500 drop-shadow"
          >
            <Heart className="w-7 h-7 fill-current transform scale-125" />
          </div>
        ))}
      </div>

      {/* ZONE BASSE : COMMENTAIRES DÉFILANTS + BARRE D'ACTIONS */}
      <div className="relative z-20 p-3 sm:p-4 space-y-3">
        {/* Liste des commentaires défilants (Style TikTok) */}
        <div className="max-h-44 overflow-y-auto space-y-2 pr-2 scrollbar-none text-xs">
          {comments.map((c) => (
            <div
              key={c.id}
              className="inline-flex items-start gap-2 bg-black/50 backdrop-blur-md rounded-2xl px-3 py-1.5 border border-white/10 max-w-[90%]"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 mt-0.5 border border-thron-gold/60">
                <img src={c.avatar} alt={c.user} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-bold text-amber-200 text-[11px] mr-1.5">
                  {c.user}
                </span>
                <span className="px-1.5 py-0.2 bg-white/20 text-[9px] rounded font-medium text-white mr-1.5">
                  {c.grade}
                </span>
                <span className="text-white/90 text-[11px]">{c.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* BARRE D'INTERACTIONS DU LIVE */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/15">
          {/* Formulaire de saisie du message */}
          <form onSubmit={handleSendComment} className="flex-1 flex items-center">
            <input
              type="text"
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
              placeholder="Dire quelque chose de bienveillant..."
              className="w-full px-3.5 py-2 rounded-full bg-black/40 text-white placeholder-white/50 text-xs border border-white/20 focus:outline-none focus:border-thron-gold"
            />
          </form>

          {/* Demander la parole sur scène (Hand Raise) */}
          <button
            onClick={() => setHandRaised(!handRaised)}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
              handRaised
                ? "bg-amber-500 text-thron-navy border-amber-300 shadow-gold"
                : "bg-black/40 text-white border-white/20 hover:bg-black/60"
            }`}
            title="Demander la parole au Maître"
          >
            <Hand className="w-4 h-4" />
          </button>

          {/* Bouton Cœurs interactif (Génère des cœurs flottants) */}
          <button
            onClick={triggerHeart}
            className="p-2.5 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white shadow-lg active:scale-125 transition-transform flex items-center gap-1"
            title="Envoyer des bénédictions"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-bold">{heartsCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
