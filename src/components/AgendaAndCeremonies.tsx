"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Radio,
  Users,
} from "lucide-react";

interface Ceremony {
  id: string;
  nom: string;
  type: "Atinkindoudou" | "Yesoufifo" | "Rituel" | "Enseignement";
  date: string;
  heure: string;
  lieu: string;
  lignee: string;
  officiant: string;
  grade: string;
  description: string;
  visibilite: "Tous les adeptes" | "Initié Hounnon+" | "Famille sacrée";
}

export const AgendaAndCeremonies: React.FC<{ onJoinLive?: () => void }> = ({
  onJoinLive,
}) => {
  const [ceremonies] = useState<Ceremony[]>([
    {
      id: "cer-1",
      nom: "Grande Cérémonie d'Atinkindoudou (Baptême Spirituel)",
      type: "Atinkindoudou",
      date: "Dimanche 18 Octobre 2026",
      heure: "09:30 - 15:00",
      lieu: "Temple Principal Mantinkpon ò, Abomey-Calavi",
      lignee: "Lignée Mantinkpon ò",
      officiant: "Togbé Mintoniu bo tozé",
      grade: "Togbegan daho",
      description: "Consécration des nouveaux enfants spirituels (Hounvi). Purification rituelle, attribution du pagne cérémoniel et présentation devant l'arbre sacré.",
      visibilite: "Tous les adeptes",
    },
    {
      id: "cer-2",
      nom: "Célébration Sacrée de Yesoufifo",
      type: "Yesoufifo",
      date: "Vendredi 23 Octobre 2026",
      heure: "16:00 - 22:00",
      lieu: "Siège Suprême Ouidah / Cotonou",
      lignee: "Lignée Mantinkpon ò",
      officiant: "Togbé Mintoniu bo tozé",
      grade: "Togbegan daho",
      description: "Grande fête traditionnelle annuelle de communion, de libations ancestrales et d'offrandes d'allégresse pour l'assemblée des fidèles.",
      visibilite: "Tous les adeptes",
    },
    {
      id: "cer-3",
      nom: "Conseil Secret des Dignitaires (Fétiches Zogbé & Thron)",
      type: "Rituel",
      date: "Jeudi 29 Octobre 2026",
      heure: "20:00",
      lieu: "Sanctuaire Secret Mantinkpon ò",
      lignee: "Lignée Mantinkpon ò",
      officiant: "Hounnon Ayikodji MONSIA",
      grade: "Hounnon",
      description: "Réunion fermée de prières nocturnes réservée aux initiés détenteurs du fétiche Thron et du fétiche Zogbé.",
      visibilite: "Initié Hounnon+",
    },
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* BANNIÈRE AGENDA */}
      <div className="bg-gradient-to-r from-thron-navy via-thron-blue to-thron-navy rounded-3xl p-5 sm:p-6 text-white shadow-sacred border border-thron-gold/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-thron-gold uppercase">
              Calendrier Cultuel • Section 8.11
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1">
              Agenda des Cérémonies & Rituels
            </h2>
            <p className="text-xs text-blue-200 mt-1 max-w-md">
              Programmes des célébrations sacrées : Atinkindoudou (baptêmes), Yesoufifo et enseignements des Maîtres.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-thron-gold/20 text-thron-gold text-xs font-bold border border-thron-gold/30">
              Année Sacrée 2026
            </span>
          </div>
        </div>
      </div>

      {/* LISTE DES CÉRÉMONIES */}
      <div className="space-y-4">
        {ceremonies.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-thron-border shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    c.type === "Atinkindoudou"
                      ? "bg-amber-100 text-amber-900 border border-amber-300"
                      : c.type === "Yesoufifo"
                      ? "bg-purple-100 text-purple-900 border border-purple-300"
                      : "bg-blue-100 text-thron-blue border border-blue-200"
                  }`}
                >
                  {c.type}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Visibilité : <strong className="text-thron-navy">{c.visibilite}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                <span>{c.date}</span>
              </div>
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg text-thron-navy">
                {c.nom}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {c.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-thron-blue" />
                <span>{c.heure}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>{c.lieu}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-600">
                Officiant : <strong className="text-thron-navy">{c.officiant}</strong> ({c.grade})
              </div>

              {onJoinLive && (
                <button
                  onClick={onJoinLive}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Radio className="w-3.5 h-3.5 animate-pulse" /> Suivre en Live
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
