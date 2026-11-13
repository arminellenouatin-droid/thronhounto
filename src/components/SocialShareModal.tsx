"use client";

import React, { useState } from "react";
import {
  X,
  Share2,
  Copy,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Sparkles,
} from "lucide-react";

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
  imageUrl?: string;
  onShareSuccess?: () => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  title,
  url,
  imageUrl = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
  onShareSuccess,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "https://thronhounto.bj");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`Thron Hounto : ${title}`);

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      if (onShareSuccess) onShareSuccess();
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Thron Hounto : ${title}`,
          text: title,
          url: shareUrl,
        });
        if (onShareSuccess) onShareSuccess();
        onClose();
      } catch (err) {
        // Annulation ou non supporté
      }
    }
  };

  const socialNetworks = [
    {
      name: "WhatsApp",
      color: "bg-[#25D366] hover:bg-[#20ba59] text-white",
      icon: "💬",
      link: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "Facebook",
      color: "bg-[#1877F2] hover:bg-[#166fe5] text-white",
      icon: "f",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X (Twitter)",
      color: "bg-black hover:bg-neutral-800 text-white",
      icon: "𝕏",
      link: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "Telegram",
      color: "bg-[#229ED9] hover:bg-[#1e8ec3] text-white",
      icon: "✈️",
      link: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      color: "bg-[#0A66C2] hover:bg-[#095196] text-white",
      icon: "in",
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-blue-500/25 text-slate-800 my-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center text-thron-navy">
            <Share2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-thron-navy">
              Partager la publication
            </h3>
            <p className="text-xs text-slate-500">
              Diffusez la bénédiction et la sagesse du Trône
            </p>
          </div>
        </div>

        {/* APERÇU DE LA PUBLICATION ET DES MÉTADONNÉES AVEC MINIATURE */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 mb-4 flex items-center gap-3">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0 border border-slate-300">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Métadonnées OpenGraph configurées
            </span>
            <p className="text-xs font-bold text-thron-navy truncate mt-0.5">
              {title}
            </p>
            <span className="text-[10px] text-slate-400 block truncate">
              {shareUrl}
            </span>
          </div>
        </div>

        {/* BOUTONS DES RÉSEAUX SOCIAUX */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {socialNetworks.map((net) => (
            <a
              key={net.name}
              href={net.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (onShareSuccess) onShareSuccess();
              }}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${net.color}`}
            >
              <span className="font-serif font-black">{net.icon}</span>
              <span>{net.name}</span>
            </a>
          ))}
        </div>

        {/* COPIER LE LIEN DIRECT & PARTAGE SYSTÈME */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 font-mono truncate"
            />
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-thron-navy hover:bg-thron-blue text-white"
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copier</span>
                </>
              )}
            </button>
          </div>

          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Partager via mon téléphone (Applis installées)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
