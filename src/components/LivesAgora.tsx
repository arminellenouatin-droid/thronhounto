"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Camera,
  Cast,
} from "lucide-react";
import { getAgoraRTC } from "@/lib/agora";

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
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  
  // États de connexion Agora RTC réelle
  const [agoraStatus, setAgoraStatus] = useState<"disconnected" | "connecting" | "connected" | "broadcasting">("disconnected");
  const [hasRemoteVideo, setHasRemoteVideo] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const agoraClientRef = useRef<any>(null);
  const localTracksRef = useRef<{ audioTrack: any; videoTrack: any } | null>(null);
  const remotePlayerContainerRef = useRef<HTMLDivElement>(null);
  const localPlayerContainerRef = useRef<HTMLDivElement>(null);

  // Initialisation de la connexion Agora RTC
  useEffect(() => {
    let isMounted = true;

    async function initAgora() {
      try {
        setAgoraStatus("connecting");
        const res = await fetch("/api/agora/token?channel=thron-live-mantinkpon");
        const data = await res.json();

        if (!data.success || !data.appId) {
          console.warn("Agora App ID non disponible, bascule en mode simulation.");
          if (isMounted) setAgoraStatus("disconnected");
          return;
        }

        const AgoraRTC = await getAgoraRTC();
        if (!AgoraRTC || !isMounted) return;

        // Création du client WebRTC Agora
        const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
        agoraClientRef.current = client;

        // Configuration du rôle spectateur par défaut
        await client.setClientRole("audience");

        // Écoute des flux distants (quand un Hôte ou Dignitaire diffuse)
        client.on("user-published", async (user: any, mediaType: "audio" | "video") => {
          await client.subscribe(user, mediaType);
          if (mediaType === "video" && isMounted) {
            setHasRemoteVideo(true);
            setTimeout(() => {
              if (remotePlayerContainerRef.current) {
                user.videoTrack?.play(remotePlayerContainerRef.current);
              }
            }, 100);
          }
          if (mediaType === "audio") {
            user.audioTrack?.play();
          }
        });

        client.on("user-unpublished", (user: any, mediaType: "audio" | "video") => {
          if (mediaType === "video" && isMounted) {
            setHasRemoteVideo(false);
          }
        });

        // Connexion au salon Agora avec le token
        const uid = await client.join(
          data.appId,
          data.channelName,
          data.token || null,
          null
        );

        console.log("Connecté avec succès au salon Agora RTC :", data.channelName, "UID :", uid);
        if (isMounted) {
          setAgoraStatus("connected");
        }
      } catch (err) {
        console.warn("Erreur de connexion Agora RTC (mode simulation préservé) :", err);
        if (isMounted) setAgoraStatus("disconnected");
      }
    }

    initAgora();

    // Nettoyage complet lors de la fermeture du Live
    return () => {
      isMounted = false;
      if (localTracksRef.current) {
        localTracksRef.current.audioTrack?.close();
        localTracksRef.current.videoTrack?.close();
      }
      if (agoraClientRef.current) {
        agoraClientRef.current.leave().catch(console.error);
      }
    };
  }, []);

  // Activer ou désactiver la diffusion de sa caméra / micro (Mode Hôte / Dignitaire)
  const toggleBroadcast = async () => {
    const client = agoraClientRef.current;
    if (!client) return;

    try {
      const AgoraRTC = await getAgoraRTC();
      if (!AgoraRTC) return;

      if (!isBroadcasting) {
        // Passer en rôle diffuseur (host)
        await client.setClientRole("host");
        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        localTracksRef.current = { audioTrack, videoTrack };

        await client.publish([audioTrack, videoTrack]);
        setIsBroadcasting(true);
        setAgoraStatus("broadcasting");

        if (localPlayerContainerRef.current) {
          videoTrack.play(localPlayerContainerRef.current);
        }
      } else {
        // Arrêter la diffusion locale
        if (localTracksRef.current) {
          await client.unpublish([localTracksRef.current.audioTrack, localTracksRef.current.videoTrack]);
          localTracksRef.current.audioTrack.close();
          localTracksRef.current.videoTrack.close();
          localTracksRef.current = null;
        }
        await client.setClientRole("audience");
        setIsBroadcasting(false);
        setAgoraStatus("connected");
      }
    } catch (err: any) {
      console.error("Erreur diffusion caméra/micro Agora:", err);
      alert("Accès caméra/micro non autorisé ou indisponible.");
    }
  };

  // Couper / Réactiver le micro local
  const toggleMic = () => {
    if (localTracksRef.current?.audioTrack) {
      const nextMute = !isMicMuted;
      localTracksRef.current.audioTrack.setEnabled(!nextMute);
      setIsMicMuted(nextMute);
    } else {
      setIsMicMuted(!isMicMuted);
    }
  };

  // Couper / Réactiver la vidéo locale
  const toggleVideo = () => {
    if (localTracksRef.current?.videoTrack) {
      const nextMute = !isVideoMuted;
      localTracksRef.current.videoTrack.setEnabled(!nextMute);
      setIsVideoMuted(nextMute);
    } else {
      setIsVideoMuted(!isVideoMuted);
    }
  };

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
    <div className="relative w-full max-w-lg mx-auto h-[calc(100vh-130px)] max-h-[750px] bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-blue-500/25">
      {/* CONTENEUR DU FLUX VIDÉO AGORA RTC (OU SIMULATION EN FALLBACK) */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Conteneur du flux vidéo distant Agora */}
        <div
          ref={remotePlayerContainerRef}
          className={`w-full h-full absolute inset-0 object-cover ${hasRemoteVideo ? "block" : "hidden"}`}
        />

        {/* Conteneur de la caméra locale (si on diffuse en direct) */}
        {isBroadcasting && (
          <div
            ref={localPlayerContainerRef}
            className="absolute top-16 right-3 w-28 h-40 bg-zinc-900 border-2 border-blue-500/30 rounded-xl overflow-hidden shadow-xl z-20"
          />
        )}

        {/* Arrière-plan par défaut si aucun flux distant n'est encore émis */}
        {!hasRemoteVideo && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/80"></div>
          </div>
        )}
      </div>

      {/* EN-TÊTE DU LIVE STYLE TIKTOK */}
      <div className="relative z-20 p-3 sm:p-4 flex items-center justify-between text-white">
        {/* Hôte du Live */}
        <div className="flex items-center gap-2.5 bg-black/50 backdrop-blur-md rounded-full pl-1 pr-3 py-1 border border-white/10">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-500/30">
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
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-blue-500 font-semibold">
                Enseignement Sacré Mantinkpon ò
              </span>
              {/* Badge d'état de la connexion Agora RTC */}
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                agoraStatus === "connected" || agoraStatus === "broadcasting"
                  ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/50"
                  : agoraStatus === "connecting"
                  ? "bg-blue-50/700/30 text-blue-200 border border-blue-500/50 animate-pulse"
                  : "bg-zinc-700/60 text-zinc-300"
              }`}>
                {agoraStatus === "broadcasting"
                  ? "🔴 En Direct (RTC)"
                  : agoraStatus === "connected"
                  ? "🟢 RTC Connecté"
                  : agoraStatus === "connecting"
                  ? "🟡 Liaison..."
                  : "⚪ Démo"}
              </span>
            </div>
          </div>
        </div>

        {/* Compteur Spectateurs, Bouton Diffuser & Fermer */}
        <div className="flex items-center gap-2">
          {/* Bouton pour diffuser sa propre caméra (Hôte / Dignitaire) */}
          <button
            onClick={toggleBroadcast}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shadow transition-all ${
              isBroadcasting
                ? "bg-rose-600 text-white animate-pulse"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
            title={isBroadcasting ? "Arrêter ma diffusion" : "Diffuser en direct (Caméra & Micro)"}
          >
            <Cast className="w-3.5 h-3.5" />
            <span>{isBroadcasting ? "En diffusion" : "Diffuser"}</span>
          </button>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-semibold text-white/90 border border-white/10">
            <Users className="w-3.5 h-3.5 text-blue-200" />
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
        {/* Contrôles médias si diffuseur */}
        {isBroadcasting && (
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full w-fit border border-blue-500/25 mx-auto">
            <button
              onClick={toggleMic}
              className={`p-1.5 rounded-full ${isMicMuted ? "bg-rose-600 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}
              title={isMicMuted ? "Activer le micro" : "Couper le micro"}
            >
              {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-1.5 rounded-full ${isVideoMuted ? "bg-rose-600 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}
              title={isVideoMuted ? "Activer la caméra" : "Couper la caméra"}
            >
              {isVideoMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </button>
            <span className="text-[11px] font-semibold text-blue-200">Diffusion en direct active</span>
          </div>
        )}

        {/* Liste des commentaires défilants (Style TikTok) */}
        <div className="max-h-44 overflow-y-auto space-y-2 pr-2 scrollbar-none text-xs">
          {comments.map((c) => (
            <div
              key={c.id}
              className="inline-flex items-start gap-2 bg-black/50 backdrop-blur-md rounded-2xl px-3 py-1.5 border border-white/10 max-w-[90%]"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 mt-0.5 border border-blue-500/30/60">
                <img src={c.avatar} alt={c.user} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-bold text-blue-100 text-[11px] mr-1.5">
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
              className="w-full px-3.5 py-2 rounded-full bg-black/40 text-white placeholder-white/50 text-xs border border-white/20 focus:outline-none focus:border-blue-500/30"
            />
          </form>

          {/* Demander la parole sur scène (Hand Raise) */}
          <button
            onClick={() => setHandRaised(!handRaised)}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
              handRaised
                ? "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/30"
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
