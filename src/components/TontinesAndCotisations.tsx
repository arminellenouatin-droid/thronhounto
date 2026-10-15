"use client";

import React, { useState } from "react";
import {
  Coins,
  CreditCard,
  HeartHandshake,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface Tontine {
  id: string;
  nom: string;
  organisateur: string;
  grade: string;
  montantParMembre: number;
  frequence: "mensuelle" | "hebdomadaire";
  nbParticipantsTotal: number;
  nbInscritsActuels: number;
  dateDebut: string;
  statut: "ouverte" | "en_cours" | "terminee";
}

interface Cotisation {
  id: string;
  titre: string;
  temple: string;
  montant: number;
  echeance: string;
  statut: "paye" | "a_payer";
}

export const TontinesAndCotisations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tontines" | "cotisations" | "dons">("tontines");

  const [tontines, setTontines] = useState<Tontine[]>([
    {
      id: "t-1",
      nom: "Tontine de Solidarité du Hounto Alafia",
      organisateur: "Togbé Mintoniu bo tozé",
      grade: "Togbegan daho",
      montantParMembre: 25000,
      frequence: "mensuelle",
      nbParticipantsTotal: 12,
      nbInscritsActuels: 9,
      dateDebut: "1er Novembre 2026",
      statut: "ouverte",
    },
    {
      id: "t-2",
      nom: "Épargne Rotative des Femmes Dignitaires (Assi & Hounonsi)",
      organisateur: "Tassinon Pelagie TOSSOU",
      grade: "Tassinon",
      montantParMembre: 10000,
      frequence: "mensuelle",
      nbParticipantsTotal: 10,
      nbInscritsActuels: 10,
      dateDebut: "15 Octobre 2026",
      statut: "en_cours",
    },
  ]);

  const [cotisations] = useState<Cotisation[]>([
    {
      id: "c-1",
      titre: "Entretien du Temple & Toiture Sacrée",
      temple: "Temple Alafia Abomey-Calavi",
      montant: 5000,
      echeance: "31 Octobre 2026",
      statut: "a_payer",
    },
    {
      id: "c-2",
      titre: "Préparation de la Cérémonie d'Atinkindoudou",
      temple: "Hounto Mantinkpon ò",
      montant: 10000,
      echeance: "15 Octobre 2026",
      statut: "paye",
    },
  ]);

  const [donAmount, setDonAmount] = useState(5000);
  const [donIntention, setDonIntention] = useState("Pour la bénédiction et la paix (Alafia) de la famille");
  const [donSent, setDonSent] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* BANNIÈRE ET ONGLETS */}
      <div className="bg-gradient-to-r from-thron-navy via-thron-blue to-thron-navy rounded-3xl p-5 sm:p-6 text-white shadow-sacred border border-thron-gold/40">
        <span className="text-[10px] font-bold tracking-widest text-thron-gold uppercase">
          Solidarité & Collectes • Section 8.6, 8.7 & 8.8
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1">
          Tontines, Cotisations & Dons Sacrés
        </h2>

        {/* 3 ONGLETS */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setActiveTab("tontines")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "tontines"
                ? "bg-thron-gold text-thron-navy shadow"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Coins className="w-4 h-4" /> Tontines ({tontines.length})
          </button>
          <button
            onClick={() => setActiveTab("cotisations")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "cotisations"
                ? "bg-thron-gold text-thron-navy shadow"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <CreditCard className="w-4 h-4" /> Cotisations ({cotisations.length})
          </button>
          <button
            onClick={() => setActiveTab("dons")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "dons"
                ? "bg-thron-gold text-thron-navy shadow"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <HeartHandshake className="w-4 h-4" /> Dons & Offrandes
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* ONGLET 1 : TONTINES COMMUNAUTAIRES (Section 8.7)               */}
      {/* ============================================================== */}
      {activeTab === "tontines" && (
        <div className="space-y-4">
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-slate-700 flex items-center justify-between">
            <span>
              <strong>Règles statutaires (Section 8.7) :</strong> Seuls les dignitaires de grade minimum{" "}
              <strong>Hounnon</strong> (homme) ou <strong>Hounonsi</strong> (femme) peuvent lancer une tontine.
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px]">
              Commission 8%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tontines.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-5 border border-thron-border shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                      {t.frequence}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        t.statut === "ouverte"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-thron-blue"
                      }`}
                    >
                      {t.statut === "ouverte" ? "Adhésions ouvertes" : "En cours de rotation"}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-thron-navy">
                    {t.nom}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Initié par : <strong>{t.organisateur}</strong> ({t.grade})
                  </p>

                  <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mise par participant :</span>
                      <strong className="text-thron-navy">
                        {t.montantParMembre.toLocaleString("fr-FR")} F CFA
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Participants :</span>
                      <strong className="text-amber-700">
                        {t.nbInscritsActuels} / {t.nbParticipantsTotal} membres
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Début du cycle :</span>
                      <span className="font-semibold">{t.dateDebut}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Demande d'intégration à la tontine « ${t.nom} » envoyée à l'initiateur !`)}
                  className="w-full py-2.5 bg-thron-navy hover:bg-thron-blue text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Participer à cette tontine
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ONGLET 2 : COTISATIONS DU TEMPLE (Section 8.6)                 */}
      {/* ============================================================== */}
      {activeTab === "cotisations" && (
        <div className="space-y-4">
          <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-slate-700">
            <strong>Paiement automatique (Section 8.6) :</strong> À l'échéance d'une cotisation, le système prélève automatiquement le montant depuis votre solde Wallet.
          </div>

          <div className="space-y-3">
            {cotisations.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-sm text-thron-navy">
                      {c.titre}
                    </h4>
                    {c.statut === "paye" ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Réglé
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                        À régler
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Hounto : {c.temple} • Échéance : <strong>{c.echeance}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-serif text-lg font-black text-thron-navy">
                    {c.montant.toLocaleString("fr-FR")} F CFA
                  </span>
                  {c.statut === "a_payer" && (
                    <button
                      onClick={() => alert(`Cotisation de ${c.montant.toLocaleString("fr-FR")} F CFA payée depuis votre Wallet !`)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                    >
                      Payer maintenant
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ONGLET 3 : DONS & OFFRANDES (Section 8.8)                      */}
      {/* ============================================================== */}
      {activeTab === "dons" && (
        <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
          <div className="text-center max-w-md mx-auto">
            <HeartHandshake className="w-10 h-10 text-rose-600 mx-auto mb-2" />
            <h3 className="font-serif text-xl font-bold text-thron-navy">
              Faire une Offrande Sacrée (Don)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Soutenez le temple et les rituels de la Lignée Mantinkpon ò. Vos intentions sont portées lors des cérémonies d'Atinkindoudou.
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Montant de l'offrande en F CFA
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[2000, 5000, 10000, 25000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDonAmount(amt)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      donAmount === amt
                        ? "bg-thron-navy text-white border-thron-navy shadow"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {amt.toLocaleString("fr-FR")} F
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={donAmount}
                onChange={(e) => setDonAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-thron-navy focus:ring-2 focus:ring-thron-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Intention de prière ou bénédiction
              </label>
              <textarea
                rows={3}
                value={donIntention}
                onChange={(e) => setDonIntention(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-thron-gold resize-none"
              />
            </div>

            <button
              onClick={() => {
                setDonSent(true);
                setTimeout(() => setDonSent(false), 4000);
              }}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
            >
              Envoyer l'Offrande ({donAmount.toLocaleString("fr-FR")} F CFA)
            </button>

            {donSent && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs text-center font-bold">
                Bénédictions et paix ! Votre don a été transmis à la lignée.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
