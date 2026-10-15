"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Lock,
  Download,
  FileText,
  Headphones,
  CheckCircle2,
  ShieldCheck,
  Star,
} from "lucide-react";

interface DocumentItem {
  id: string;
  titre: string;
  type: "Texte" | "Audio" | "Rituel";
  dureeOuPages: string;
  gradeMin: string;
  description: string;
  isUnlocked: boolean;
}

export const BibliothequeAndZindo: React.FC<{ userPlan?: string }> = ({
  userPlan = "Assiata",
}) => {
  const [activeTab, setActiveTab] = useState<"bibliotheque" | "zindo">("bibliotheque");

  const isAssiata = userPlan === "Assiata";

  const documents: DocumentItem[] = [
    {
      id: "doc-1",
      titre: "Genèse et Origines Sacrées des Trois Courants de Thron",
      type: "Texte",
      dureeOuPages: "48 pages (PDF)",
      gradeMin: "Hounnon",
      description: "Traité historique et ésotérique retraçant la transmission des fétiches Thron, Zogbé, Sacla et Banguélé kéchédji depuis les ancêtres.",
      isUnlocked: isAssiata,
    },
    {
      id: "doc-2",
      titre: "Cantiques Sacrés d'Élévation et Paroles d'Alafia (Audios)",
      type: "Audio",
      dureeOuPages: "1h 14min (Master Audio)",
      gradeMin: "Atinkindouvi+",
      description: "Chants rituels authentiques en fongbe pour les veillées sacrées et les cérémonies d'Atinkindoudou.",
      isUnlocked: isAssiata,
    },
    {
      id: "doc-3",
      titre: "Code de Droiture Morale et Rituels de Purifications",
      type: "Texte",
      dureeOuPages: "32 pages (PDF)",
      gradeMin: "Hounnon do alidji",
      description: "Recueil des préceptes moraux, interdictions et règles de pureté pour les gardiens de Hounto.",
      isUnlocked: isAssiata,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* BANNIÈRE ET ONGLETS */}
      <div className="bg-gradient-to-r from-thron-navy via-thron-blue to-thron-navy rounded-3xl p-5 sm:p-6 text-white shadow-sacred border border-thron-gold/40">
        <span className="text-[10px] font-bold tracking-widest text-thron-gold uppercase">
          Enseignements & Harmonie • Section 8.13
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1">
          Bibliothèque Sacrée & Zindo
        </h2>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setActiveTab("bibliotheque")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "bibliotheque"
                ? "bg-thron-gold text-thron-navy shadow"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <BookOpen className="w-4 h-4" /> Bibliothèque (Assiata)
          </button>
          <button
            onClick={() => setActiveTab("zindo")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "zindo"
                ? "bg-thron-gold text-thron-navy shadow"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Sparkles className="w-4 h-4" /> Zindo Sacré (Togoundaho+)
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* ONGLET 1 : BIBLIOTHÈQUE SACRÉE (Réservée Assiata)              */}
      {/* ============================================================== */}
      {activeTab === "bibliotheque" && (
        <div className="space-y-4">
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>
                <strong>Accès Réservé :</strong> Inclus exclusivement dans la formule suprême <strong>Assiata</strong>.
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-thron-gold text-thron-navy font-bold text-[10px]">
              Formule Assiata Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl p-5 border border-thron-border shadow-sm flex flex-col justify-between group hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-slate-100 text-thron-blue">
                      {doc.type === "Texte" ? (
                        <FileText className="w-4 h-4" />
                      ) : (
                        <Headphones className="w-4 h-4" />
                      )}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {doc.dureeOuPages}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-thron-navy group-hover:text-thron-blue transition-colors">
                    {doc.titre}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Grade : <strong>{doc.gradeMin}</strong>
                  </span>
                  <button
                    onClick={() => alert(`Consultation autorisée pour le document : ${doc.titre}`)}
                    className="p-2 rounded-xl bg-thron-blue text-white hover:bg-thron-navy transition-colors text-xs"
                    title="Télécharger ou écouter"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ONGLET 2 : MODULE ZINDO SACRÉ (Togoundaho et Assiata)          */}
      {/* ============================================================== */}
      {activeTab === "zindo" && (
        <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
          <div className="text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-thron-gold mx-auto flex items-center justify-center mb-2 shadow">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-thron-navy">
              Espace Sacré Zindo
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Fonctionnalité exclusive de communion et d'harmonie pour les grandes assemblées (formules Togoundaho et Assiata).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2 max-w-lg mx-auto">
            <div className="font-bold text-thron-navy flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Attributions spirituelles de Zindo :</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 text-[11px] list-disc list-inside">
              <li>Cercle de concorde et de médiation entre membres d'un même Hounto.</li>
              <li>Partage des dates sacrées de jeûne et d'abstinence rituelle.</li>
              <li>Bénédiction collégiale portée par le Hounnongan daho et ses pairs.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
