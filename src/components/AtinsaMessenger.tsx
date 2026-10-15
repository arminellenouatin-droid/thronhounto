"use client";

import React, { useState } from "react";
import {
  Send,
  Mic,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  Search,
  Users,
  Circle,
  Play,
} from "lucide-react";

interface Message {
  id: string;
  sender: "me" | "other";
  text?: string;
  audioDuration?: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  isGroup?: boolean;
  isOnline?: boolean;
  grade?: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export const AtinsaMessenger: React.FC = () => {
  const [conversations] = useState<Conversation[]>([
    {
      id: "c-1",
      name: "Togbé Mintoniu bo tozé",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      grade: "Togbegan daho",
      isOnline: true,
      lastMessage: "Que la bénédiction d Alafia repose sur votre temple.",
      time: "10:45",
      unread: 2,
    },
    {
      id: "c-2",
      name: "Assemblée Hounto Mantinkpon ò",
      avatar: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&auto=format&fit=crop&q=80",
      isGroup: true,
      lastMessage: "Rappel : Réunion de tontine communautaire demain 18h.",
      time: "Hier",
      unread: 0,
    },
    {
      id: "c-3",
      name: "Hounnon Mahugnon DOSSOU",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
      grade: "Hounnon",
      isOnline: false,
      lastMessage: "Bien reçu, je serai présent pour le rituel.",
      time: "Lundi",
      unread: 0,
    },
  ]);

  const [activeConv, setActiveConv] = useState<Conversation>(conversations[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "other",
      text: "Bonjour mon Hounnon. Avez-vous préparé la liste des aspirants pour la cérémonie d Atinkindoudou ?",
      timestamp: "10:40",
      status: "read",
    },
    {
      id: "m-2",
      sender: "me",
      text: "Oui mon Maître Togbé. 14 enfants spirituels (Hounvi) sont prêts et ont rempli leurs formalités.",
      timestamp: "10:42",
      status: "read",
    },
    {
      id: "m-3",
      sender: "other",
      audioDuration: "0:24",
      timestamp: "10:44",
      status: "read",
    },
    {
      id: "m-4",
      sender: "other",
      text: "Que la bénédiction d Alafia repose sur votre temple.",
      timestamp: "10:45",
      status: "read",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: "me",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages([...messages, newMsg]);
    setInputMessage("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-2 h-[calc(100vh-140px)] max-h-[700px] flex rounded-2xl overflow-hidden border border-thron-border bg-white shadow-sacred">
      {/* COLONNE GAUCHE : LISTE DES DISCUSSIONS (Style WhatsApp) */}
      <div className="w-full sm:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
        {/* En-tête de la liste */}
        <div className="p-3 bg-thron-navy text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-sm">Atinsa (Messagerie)</h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-thron-gold/20 text-thron-gold font-bold">
            Arbre à palabre
          </span>
        </div>

        {/* Barre de recherche */}
        <div className="p-2 bg-white border-b border-slate-200">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher une discussion..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-100 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-thron-gold"
            />
          </div>
        </div>

        {/* Liste des discussions */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveConv(c)}
              className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-colors ${
                activeConv.id === c.id ? "bg-amber-50/70 border-l-4 border-thron-gold" : ""
              }`}
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-200">
                  <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                </div>
                {c.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="font-bold text-xs text-thron-navy truncate">{c.name}</h4>
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">{c.lastMessage}</p>
              </div>

              {c.unread > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {c.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* COLONNE DROITE : FENÊTRE DE CHAT (WhatsApp style) */}
      <div className="hidden sm:flex flex-1 flex-col bg-[#EFEAE2]">
        {/* EN-TÊTE DU CHAT AVEC ÉTIQUETTE EN LIGNE CONFIRMÉE */}
        <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-thron-gold">
                <img src={activeConv.avatar} alt={activeConv.name} className="w-full h-full object-cover" />
              </div>
              {activeConv.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
              )}
            </div>

            <div>
              <h4 className="font-bold text-xs text-thron-navy">{activeConv.name}</h4>
              <div className="flex items-center gap-1.5 text-[10px]">
                {activeConv.isOnline ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <Circle className="w-2 h-2 fill-current" /> en ligne
                  </span>
                ) : (
                  <span className="text-slate-400">vu aujourd hui à 10:45</span>
                )}
                {activeConv.grade && (
                  <>
                    <span className="text-slate-300">•</span>
                    <span className="text-thron-gold font-semibold">{activeConv.grade}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <button className="p-2 hover:bg-slate-100 rounded-full">
              <Phone className="w-4 h-4 text-thron-blue" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full">
              <Video className="w-4 h-4 text-thron-blue" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ZONE DES MESSAGES */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2 shadow-sm text-xs leading-relaxed ${
                  m.sender === "me"
                    ? "bg-[#D9FDD3] text-slate-800 rounded-tr-none"
                    : "bg-white text-slate-800 rounded-tl-none"
                }`}
              >
                {/* Note vocale */}
                {m.audioDuration ? (
                  <div className="flex items-center gap-3 py-1">
                    <button className="w-8 h-8 rounded-full bg-thron-blue text-white flex items-center justify-center">
                      <Play className="w-4 h-4 ml-0.5" />
                    </button>
                    <div className="flex flex-col">
                      <div className="w-28 h-1 bg-slate-300 rounded-full overflow-hidden">
                        <div className="w-12 h-full bg-thron-blue" />
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1">Note vocale ({m.audioDuration})</span>
                    </div>
                  </div>
                ) : (
                  <p>{m.text}</p>
                )}

                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                  <span>{m.timestamp}</span>
                  {m.sender === "me" && (
                    <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BARRE DE SAISIE */}
        <form
          onSubmit={handleSendMessage}
          className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <button type="button" className="p-2 text-slate-400 hover:text-slate-600">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 px-3 py-2 bg-slate-100 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-thron-gold"
          />
          <button type="button" className="p-2 text-slate-400 hover:text-slate-600">
            <Mic className="w-4 h-4" />
          </button>
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-2 bg-thron-blue text-white rounded-xl hover:bg-thron-navy disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
