"use client";

import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  ShieldCheck,
  Image,
  Send,
  MoreHorizontal,
  Flame,
  Globe,
  Lock,
} from "lucide-react";

interface Post {
  id: string;
  authorNom: string;
  authorGrade: string;
  authorPhoto: string;
  lignee: string;
  timestamp: string;
  visibility: "public" | "lignee" | "inities";
  content: string;
  imageUrl?: string;
  likes: number;
  commentsCount: number;
  isBoosted?: boolean;
}

export const TogounFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "post-1",
      authorNom: "Togbé Mintoniu bo tozé",
      authorGrade: "Togbegan daho",
      authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      timestamp: "Il y a 2 heures",
      visibility: "lignee",
      content: "Bénédictions et paix (Alafia) à tous les dignitaires, hounnon et hounvi de la lignée Mantinkpon ò. Préparation de la grande cérémonie d'Atinkindoudou ce dimanche au temple principal. Que les forces ancestrales nous accompagnent dans la concorde et la pureté.",
      imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&auto=format&fit=crop&q=80",
      likes: 142,
      commentsCount: 28,
      isBoosted: true,
    },
    {
      id: "post-2",
      authorNom: "Hounnon Ayikodji MONSIA",
      authorGrade: "Hounnon",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      timestamp: "Hier à 16:30",
      visibility: "public",
      content: "Lancement de la nouvelle session de cotisations communautaires pour la réfection de la toiture sacrée du Hounto. Chaque adepte peut cotiser directement via son Wallet.",
      likes: 67,
      commentsCount: 12,
    },
  ]);

  const [newPostText, setNewPostText] = useState("");
  const [selectedVis, setSelectedVis] = useState<"public" | "lignee" | "inities">("lignee");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorNom: "Hounnon Ayikodji MONSIA",
      authorGrade: "Hounnon",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      lignee: "Lignée Mantinkpon ò",
      timestamp: "À l instant",
      visibility: selectedVis,
      content: newPostText,
      likes: 0,
      commentsCount: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 space-y-4">
      {/* BANNIÈRE TOGOUN (RÉSEAU SOCIAL COMMUNAUTAIRE) */}
      <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-thron-gold uppercase">
            Réseau Social Thron
          </span>
          <h2 className="font-serif text-lg font-bold text-thron-navy">
            Togoun (Peuple & Assemblée)
          </h2>
        </div>
        <span className="px-3 py-1 bg-thron-blue/10 text-thron-blue rounded-full text-xs font-bold">
          Page Lignée Mantinkpon ò
        </span>
      </div>

      {/* BOÎTE DE PUBLICATION STYLE FACEBOOK */}
      <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
        <form onSubmit={handleCreatePost}>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-thron-gold flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Exprimez-vous ou partagez un message pour l'assemblée..."
              rows={3}
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-thron-gold resize-none"
            />
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-slate-500 hover:text-thron-blue hover:bg-slate-50 rounded-lg text-xs flex items-center gap-1.5"
              >
                <Image className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Photo / Vidéo</span>
              </button>

              {/* Visibilité spirituelle */}
              <select
                value={selectedVis}
                onChange={(e) => setSelectedVis(e.target.value as any)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-600 font-medium"
              >
                <option value="public">🌐 Public (Tout le monde)</option>
                <option value="lignee">👥 Lignée Mantinkpon ò</option>
                <option value="inities">🔒 Initiés (Hounnon+)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!newPostText.trim()}
              className="px-4 py-2 bg-thron-navy hover:bg-thron-blue text-white rounded-xl text-xs font-bold disabled:opacity-40 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              Publier <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* LISTE DES PUBLICATIONS */}
      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-2xl border border-thron-border shadow-sm overflow-hidden"
          >
            {/* EN-TÊTE DU POST */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-thron-gold shadow-sm">
                  <img
                    src={post.authorPhoto}
                    alt={post.authorNom}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-thron-navy">
                      {post.authorNom}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-thron-gold/20 text-thron-dark">
                      {post.authorGrade}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{post.lignee}</span>
                    <span>•</span>
                    <span>{post.timestamp}</span>
                    <span>•</span>
                    {post.visibility === "public" && <Globe className="w-3 h-3" />}
                    {post.visibility === "lignee" && <ShieldCheck className="w-3 h-3 text-thron-blue" />}
                    {post.visibility === "inities" && <Lock className="w-3 h-3 text-amber-600" />}
                  </div>
                </div>
              </div>

              {post.isBoosted && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold border border-amber-300">
                  <Flame className="w-3 h-3 text-amber-600 fill-current" /> Boosté
                </span>
              )}
            </div>

            {/* CONTENU */}
            <div className="px-4 pb-3">
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {post.content}
              </p>
            </div>

            {/* IMAGE OPTIONNELLE */}
            {post.imageUrl && (
              <div className="w-full max-h-96 overflow-hidden bg-black">
                <img
                  src={post.imageUrl}
                  alt="Post visual"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* BARRE D'INTERACTIONS */}
            <div className="p-3 border-t border-slate-100 flex items-center justify-around text-xs font-semibold text-slate-500">
              <button
                onClick={() =>
                  setPosts(
                    posts.map((p) =>
                      p.id === post.id ? { ...p, likes: p.likes + 1 } : p
                    )
                  )
                }
                className="flex items-center gap-2 hover:text-rose-600 transition-colors py-1 px-3 rounded-lg hover:bg-rose-50"
              >
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-thron-blue transition-colors py-1 px-3 rounded-lg hover:bg-blue-50">
                <MessageCircle className="w-4 h-4" />
                <span>{post.commentsCount} com.</span>
              </button>
              <button className="flex items-center gap-2 hover:text-emerald-600 transition-colors py-1 px-3 rounded-lg hover:bg-emerald-50">
                <Share2 className="w-4 h-4" />
                <span>Partager</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
