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
  FileText,
  Upload,
  Download,
  AlertTriangle,
  Lock,
  Building2,
  Share2,
  Check,
  X
} from "lucide-react";

interface Tontine {
  id: string;
  nom: string;
  typeEntite: "lignee" | "temple";
  nomEntite: string;
  templeAffilie?: string;
  organisateur: string;
  grade: string;
  quotePart: number;
  montantTotalARamasser: number;
  periodicite: "hebdomadaire" | "bimensuelle" | "mensuelle";
  nbParticipantsAttendus: number;
  nbParticipantsInscrits: number;
  dateDemarrage: string;
  statut: "ouverte" | "en_cours" | "terminee" | "bloquee";
  categoriesEligibles: string[];
  bureau: {
    president: string;
    secretaire: string;
    tresorier: string;
  };
  reglementDocumentNom?: string;
  aDesPlaintes?: boolean;
}

interface Cotisation {
  id: string;
  titre: string;
  templeOuLignee: string;
  isLibre: boolean;
  montantFixe?: number;
  echeance: string;
  statut: "paye" | "a_payer";
}

interface DonEffectue {
  id: string;
  referenceRecu: string;
  montant: number;
  typeDon: "ponctuel" | "recurrent";
  destinataire: string;
  intention: string;
  date: string;
}

interface TontinesAndCotisationsProps {
  currentUserRole?: string;
  currentUserGrade?: string;
  currentUserLignee?: string;
  currentUserTemple?: string;
  userWalletBalance?: number;
  onBalanceUpdate?: (newBal: number) => void;
  onAnnounceToTogoun?: (announcement: string) => void;
}

export const TontinesAndCotisations: React.FC<TontinesAndCotisationsProps> = ({
  currentUserRole = "lineage_admin",
  currentUserGrade = "Hounnon",
  currentUserLignee = "Mantinkpon ò",
  currentUserTemple = "Temple Alafia Abomey-Calavi",
  userWalletBalance = 45000,
  onBalanceUpdate,
  onAnnounceToTogoun,
}) => {
  const [activeTab, setActiveTab] = useState<"tontines" | "cotisations" | "dons">("tontines");

  // Liste des tontines
  const [tontines, setTontines] = useState<Tontine[]>([
    {
      id: "t-1",
      nom: "Tontine de Solidarité du Trône Alafia",
      typeEntite: "lignee",
      nomEntite: "Lignée Mantinkpon ò",
      organisateur: "Togbé Mintoniu bo tozé",
      grade: "Togbegan daho",
      quotePart: 25000,
      montantTotalARamasser: 300000,
      periodicite: "mensuelle",
      nbParticipantsAttendus: 12,
      nbParticipantsInscrits: 9,
      dateDemarrage: "1er Novembre 2026",
      statut: "ouverte",
      categoriesEligibles: ["Hounnon", "Hounvi", "Assi", "Dignitaires"],
      bureau: {
        president: "Togbé Mintoniu bo tozé (Togbegan daho)",
        secretaire: "Dah MONSIA Gbèdan",
        tresorier: "Hounnon Mahugnon DOSSOU",
      },
      reglementDocumentNom: "Statuts_Tontine_Alafia_Signe.pdf",
    },
    {
      id: "t-2",
      nom: "Épargne Rotative du Temple Calavi (Réservée membres)",
      typeEntite: "temple",
      nomEntite: "Temple Alafia Abomey-Calavi",
      templeAffilie: "Temple Alafia Abomey-Calavi",
      organisateur: "Hounonsi Pelagie TOSSOU",
      grade: "Hounonsi",
      quotePart: 10000,
      montantTotalARamasser: 100000,
      periodicite: "mensuelle",
      nbParticipantsAttendus: 10,
      nbParticipantsInscrits: 10,
      dateDemarrage: "15 Octobre 2026",
      statut: "en_cours",
      categoriesEligibles: ["Membres affiliés au Temple Calavi"],
      bureau: {
        president: "Hounonsi Pelagie TOSSOU",
        secretaire: "Sohou Marcellin",
        tresorier: "Kpodékon Justine",
      },
      reglementDocumentNom: "Reglement_Interieur_Calavi_2026.pdf",
    },
  ]);

  // Modal création tontine
  const [createTontineOpen, setCreateTontineOpen] = useState(false);
  const [newTontineName, setNewTontineName] = useState("");
  const [newTontineEntityType, setNewTontineEntityType] = useState<"lignee" | "temple">("lignee");
  const [newTontineTemple, setNewTontineTemple] = useState("Temple Alafia Abomey-Calavi");
  const [newTontinePart, setNewTontinePart] = useState(20000);
  const [newTontineExpectedCount, setNewTontineExpectedCount] = useState(10);
  const [newTontinePeriodicity, setNewTontinePeriodicity] = useState<"hebdomadaire" | "bimensuelle" | "mensuelle">("mensuelle");
  const [newTontineStartDate, setNewTontineStartDate] = useState("2026-11-15");
  const [newTontinePresident, setNewTontinePresident] = useState("Hounnon Mahugnon DOSSOU");
  const [newTontineSecretary, setNewTontineSecretary] = useState("Dah MONSIA Gbèdan");
  const [newTontineTreasurer, setNewTontineTreasurer] = useState("Hounvi Bienvenu KPODÉKON");
  const [newTontineCategories, setNewTontineCategories] = useState("Membres initiés, Dignitaires et Assi");
  const [newTontineRulesFileName, setNewTontineRulesFileName] = useState("Reglement_Tontine_Hounto_2026.pdf");
  const [creationNotificationMsg, setCreationNotificationMsg] = useState<string | null>(null);

  // Vérification de grade pour création : au moins Hounnon ou Hounonsi
  const isGradeEligibleToCreate =
    currentUserGrade === "Hounnon" ||
    currentUserGrade === "Hounonsi" ||
    currentUserGrade === "Togbegan daho" ||
    currentUserGrade === "Hounnongan" ||
    currentUserRole === "master_admin";

  // Simulation état blocage si plaintes
  const [isEntityBlocked, setIsEntityBlocked] = useState(false);

  // Soumission de la création de tontine
  const handleCreateTontine = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isGradeEligibleToCreate) {
      alert("Erreur statutaire : Aucune personne en dehors des Hounnon ou Hounonsi au moins ne peut lancer une tontine dans l'application !");
      return;
    }

    if (isEntityBlocked) {
      alert("Création impossible : Cette entité a fait l'objet de plaintes lors d'un précédent cycle et est actuellement bloquée par la modération SaaS !");
      return;
    }

    // Règle du document : il faut payer 1 part pour ouvrir le compte de la tontine
    if (userWalletBalance < newTontinePart) {
      alert(`Solde insuffisant : Pour lancer la tontine, vous devez payer 1 part obligatoire (${newTontinePart.toLocaleString("fr-FR")} F CFA) pour ouvrir le compte. Votre solde actuel est de ${userWalletBalance.toLocaleString("fr-FR")} F CFA.`);
      return;
    }

    // Débiter 1 part
    const newBal = userWalletBalance - newTontinePart;
    if (onBalanceUpdate) onBalanceUpdate(newBal);

    const totalToCollect = newTontinePart * newTontineExpectedCount;

    const created: Tontine = {
      id: `t-${Date.now()}`,
      nom: newTontineName,
      typeEntite: newTontineEntityType,
      nomEntite: newTontineEntityType === "lignee" ? currentUserLignee : newTontineTemple,
      templeAffilie: newTontineEntityType === "temple" ? newTontineTemple : undefined,
      organisateur: `${currentUserGrade} initiateur`,
      grade: currentUserGrade,
      quotePart: newTontinePart,
      montantTotalARamasser: totalToCollect,
      periodicite: newTontinePeriodicity,
      nbParticipantsAttendus: newTontineExpectedCount,
      nbParticipantsInscrits: 1, // Le créateur a payé sa 1ère part
      dateDemarrage: newTontineStartDate,
      statut: "ouverte",
      categoriesEligibles: [newTontineCategories],
      bureau: {
        president: newTontinePresident,
        secretaire: newTontineSecretary,
        tresorier: newTontineTreasurer,
      },
      reglementDocumentNom: newTontineRulesFileName,
    };

    setTontines([created, ...tontines]);

    // Règle : Si temple qui lance, notification envoyée au leader de la lignée
    let notificationText = `Tontine créée avec succès ! Votre 1ère part de ${newTontinePart.toLocaleString("fr-FR")} F CFA a été débitée pour l'ouverture du compte.`;
    if (newTontineEntityType === "temple") {
      notificationText += ` Notification officielle transmise au Maître de la Lignée ${currentUserLignee} qui coiffe le temple.`;
    }
    notificationText += ` L'annonce est automatiquement publiée sur la page de la Lignée sur le réseau social Togoun !`;

    if (onAnnounceToTogoun) {
      onAnnounceToTogoun(`[NOUVELLE TONTINE OFFICIELLE] ${created.nom} lancée par ${created.nomEntite}. Montant de la part : ${created.quotePart.toLocaleString("fr-FR")} F CFA.`);
    }

    setCreationNotificationMsg(notificationText);
    setTimeout(() => {
      setCreateTontineOpen(false);
      setCreationNotificationMsg(null);
      setNewTontineName("");
    }, 4000);
  };

  // Liste des Cotisations
  const [cotisations, setCotisations] = useState<Cotisation[]>([
    {
      id: "c-1",
      titre: "Entretien du Temple & Toiture Sacrée (Cotisation Fixe)",
      templeOuLignee: "Temple Alafia Abomey-Calavi",
      isLibre: false,
      montantFixe: 5000,
      echeance: "31 Octobre 2026",
      statut: "a_payer",
    },
    {
      id: "c-2",
      titre: "Préparation de la Cérémonie d'Atinkindoudou (Cotisation Libre)",
      templeOuLignee: "Lignée Mantinkpon ò",
      isLibre: true,
      echeance: "15 Novembre 2026",
      statut: "a_payer",
    },
    {
      id: "c-3",
      titre: "Rénovation du Trône Ancestral",
      templeOuLignee: "Lignée Mantinkpon ò",
      isLibre: false,
      montantFixe: 10000,
      echeance: "15 Octobre 2026",
      statut: "paye",
    },
  ]);

  const [customCotisationAmount, setCustomCotisationAmount] = useState<Record<string, number>>({
    "c-2": 3500,
  });

  const handlePayCotisation = (cotisationId: string, montant: number) => {
    if (userWalletBalance < montant) {
      alert(`Solde insuffisant dans votre portefeuille (${userWalletBalance.toLocaleString("fr-FR")} F CFA). Rechargez votre compte pour régler cette cotisation.`);
      return;
    }
    const newBal = userWalletBalance - montant;
    if (onBalanceUpdate) onBalanceUpdate(newBal);

    setCotisations((prev) =>
      prev.map((c) => (c.id === cotisationId ? { ...c, statut: "paye" as const } : c))
    );
    alert(`Cotisation de ${montant.toLocaleString("fr-FR")} F CFA réglée avec succès depuis votre Wallet ! Une commission de 8% (${(montant * 0.08).toLocaleString("fr-FR")} F) a été allouée aux opérations du SaaS.`);
  };

  // Dons
  const [donAmount, setDonAmount] = useState(5000);
  const [donType, setDonType] = useState<"ponctuel" | "recurrent">("ponctuel");
  const [donDestinataire, setDonDestinataire] = useState<string>("Lignée Mantinkpon ò");
  const [donIntention, setDonIntention] = useState("Pour la bénédiction et la paix (Alafia) du foyer");
  const [donsHistorique, setDonsHistorique] = useState<DonEffectue[]>([
    {
      id: "don-1",
      referenceRecu: "REC-THRON-2026-9041",
      montant: 10000,
      typeDon: "ponctuel",
      destinataire: "Lignée Mantinkpon ò",
      intention: "Offrande de grâce pour la naissance",
      date: "12 Octobre 2026",
    },
  ]);
  const [selectedReceipt, setSelectedReceipt] = useState<DonEffectue | null>(null);

  const handleSendDon = (e: React.FormEvent) => {
    e.preventDefault();
    if (userWalletBalance < donAmount) {
      alert(`Solde insuffisant pour faire ce don (${userWalletBalance.toLocaleString("fr-FR")} F CFA).`);
      return;
    }

    const newBal = userWalletBalance - donAmount;
    if (onBalanceUpdate) onBalanceUpdate(newBal);

    const ref = `REC-THRON-${Date.now().toString().slice(-6)}`;
    const nouveauDon: DonEffectue = {
      id: `d-${Date.now()}`,
      referenceRecu: ref,
      montant: donAmount,
      typeDon: donType,
      destinataire: donDestinataire,
      intention: donIntention,
      date: new Date().toLocaleDateString("fr-FR"),
    };

    setDonsHistorique([nouveauDon, ...donsHistorique]);
    setSelectedReceipt(nouveauDon);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* BANNIÈRE ET ONGLETS */}
      <div className="bg-gradient-to-r from-thron-navy via-thron-blue to-thron-navy rounded-3xl p-5 sm:p-6 text-white shadow-sacred border border-thron-gold/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-thron-gold uppercase">
              Solidarité, Épargne & Offrandes Sacrées
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1">
              Tontines, Cotisations & Dons
            </h2>
            <p className="text-xs text-blue-200 mt-0.5">
              Système de tontines certifié avec commission fixe de 8%, cotisations libres ou fixes et reçus cultuels.
            </p>
          </div>

          {isGradeEligibleToCreate && (
            <button
              onClick={() => setCreateTontineOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-thron-gold hover:from-amber-600 hover:to-amber-400 text-thron-navy font-bold text-xs shadow-gold transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Lancer une Tontine
            </button>
          )}
        </div>

        {/* 3 ONGLETS */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("tontines")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "tontines"
                ? "bg-thron-gold text-thron-navy shadow"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Coins className="w-4 h-4" /> Tontines ({tontines.length})
          </button>
          <button
            onClick={() => setActiveTab("cotisations")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "cotisations"
                ? "bg-thron-gold text-thron-navy shadow"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <CreditCard className="w-4 h-4" /> Cotisations ({cotisations.length})
          </button>
          <button
            onClick={() => setActiveTab("dons")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "dons"
                ? "bg-thron-gold text-thron-navy shadow"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <HeartHandshake className="w-4 h-4" /> Dons & Reçus ({donsHistorique.length})
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* ONGLET 1 : TONTINES                                            */}
      {/* ============================================================== */}
      {activeTab === "tontines" && (
        <div className="space-y-4">
          {/* Règles strictes rappelées */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-slate-700 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                Règles Statutaires Obligatoires (NOUVELLS CORRECTIONS) :
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold text-[10px]">
                Commission SaaS 8%
              </span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
              <li>Lancement réservé <strong>exclusivement aux Lignées ou Temples</strong> (restreint aux membres pour un temple).</li>
              <li>Grade minimum exigé : <strong>Hounnon</strong> ou <strong>Hounonsi</strong>.</li>
              <li>Paiement obligatoire de <strong>1 part</strong> pour ouvrir le compte de la tontine.</li>
              <li>Notification automatique au leader de la lignée en cas de création par un temple.</li>
              <li>Toute tontine se terminant par des plaintes entraîne le <strong>blocage de l'entité</strong>.</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tontines.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-5 border border-thron-border shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                      {t.periodicite} • {t.typeEntite === "lignee" ? "Lignée" : "Temple"}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        t.statut === "ouverte"
                          ? "bg-emerald-100 text-emerald-800"
                          : t.statut === "bloquee"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-blue-100 text-thron-blue"
                      }`}
                    >
                      {t.statut === "ouverte"
                        ? "Adhésions ouvertes"
                        : t.statut === "bloquee"
                        ? "Bloquée (Plaintes)"
                        : "En rotation"}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-thron-navy">
                    {t.nom}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Entité organisatrice : <strong className="text-thron-navy">{t.nomEntite}</strong>
                  </p>

                  {/* Bureau de la tontine */}
                  <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mise par part :</span>
                      <strong className="text-thron-navy">
                        {t.quotePart.toLocaleString("fr-FR")} F CFA
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Montant total à ramasser :</span>
                      <strong className="text-emerald-700">
                        {t.montantTotalARamasser.toLocaleString("fr-FR")} F CFA
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Membres inscrits :</span>
                      <strong className="text-amber-700">
                        {t.nbParticipantsInscrits} / {t.nbParticipantsAttendus} participants
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Date de démarrage :</span>
                      <span className="font-semibold">{t.dateDemarrage}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                      <strong>Bureau désigné :</strong>
                      <div className="text-[10px] text-slate-500 mt-0.5 space-y-0.5">
                        <p>👑 Président : {t.bureau.president}</p>
                        <p>✍️ Secrétaire : {t.bureau.secretaire}</p>
                        <p>💼 Trésorier : {t.bureau.tresorier}</p>
                      </div>
                    </div>

                    {t.reglementDocumentNom && (
                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-thron-blue">
                        <span className="flex items-center gap-1 font-medium">
                          <FileText className="w-3.5 h-3.5" /> {t.reglementDocumentNom}
                        </span>
                        <button
                          onClick={() => alert(`Téléchargement des statuts et règlement intérieur de la tontine : ${t.reglementDocumentNom}`)}
                          className="text-[10px] font-bold text-amber-700 hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <Download className="w-3 h-3" /> Lire le règlement
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => {
                      if (userWalletBalance < t.quotePart) {
                        alert(`Solde insuffisant pour cotiser (${userWalletBalance.toLocaleString("fr-FR")} F CFA). Rechargez votre portefeuille.`);
                        return;
                      }
                      const newBal = userWalletBalance - t.quotePart;
                      if (onBalanceUpdate) onBalanceUpdate(newBal);
                      alert(`Souscription confirmée à « ${t.nom} » ! Votre quote-part de ${t.quotePart.toLocaleString("fr-FR")} F CFA a été débitée sous séquestre.`);
                    }}
                    className="w-full py-2.5 bg-thron-navy hover:bg-thron-blue text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Souscrire & Payer la part ({t.quotePart.toLocaleString("fr-FR")} F CFA)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ONGLET 2 : COTISATIONS DU TEMPLE & LIGNÉE                      */}
      {/* ============================================================== */}
      {activeTab === "cotisations" && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-slate-700 space-y-1">
            <strong>Modalités des Cotisations :</strong>
            <p className="text-[11px] text-slate-600">
              Créées par les Lignées ou Temples pour des besoins cultuels spécifiques. Une cotisation peut être à <strong>montant fixe</strong> ou <strong>libre</strong> (vous choisissez librement le montant à apporter). Une commission de 8% s'applique pour le fonctionnement de la plateforme.
            </p>
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
                    {c.isLibre && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                        Montant Libre
                      </span>
                    )}
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
                    Bénéficiaire : <strong>{c.templeOuLignee}</strong> • Échéance : <strong>{c.echeance}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {c.isLibre ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="500"
                        step="500"
                        value={customCotisationAmount[c.id] || 2000}
                        onChange={(e) =>
                          setCustomCotisationAmount({
                            ...customCotisationAmount,
                            [c.id]: Number(e.target.value),
                          })
                        }
                        className="w-24 px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-right"
                      />
                      <span className="text-xs text-slate-500">F CFA</span>
                      {c.statut === "a_payer" && (
                        <button
                          onClick={() => handlePayCotisation(c.id, customCotisationAmount[c.id] || 2000)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
                        >
                          Contribuer
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg font-black text-thron-navy">
                        {c.montantFixe?.toLocaleString("fr-FR")} F CFA
                      </span>
                      {c.statut === "a_payer" && (
                        <button
                          onClick={() => handlePayCotisation(c.id, c.montantFixe || 0)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
                        >
                          Payer
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ONGLET 3 : DONS, OFFRANDES & REÇUS                              */}
      {/* ============================================================== */}
      {activeTab === "dons" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <div className="text-center max-w-md mx-auto">
              <HeartHandshake className="w-10 h-10 text-rose-600 mx-auto mb-2" />
              <h3 className="font-serif text-xl font-bold text-thron-navy">
                Faire un Don ou Offrande Sacrée
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Offrande ponctuelle ou récurrente avec délivrance automatique d'un reçu officiel et prière de remerciement.
              </p>
            </div>

            <form onSubmit={handleSendDon} className="max-w-md mx-auto space-y-4 pt-2">
              {/* Type de don */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDonType("ponctuel")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    donType === "ponctuel" ? "bg-thron-navy text-white border-thron-navy" : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  Don Ponctuel
                </button>
                <button
                  type="button"
                  onClick={() => setDonType("recurrent")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    donType === "recurrent" ? "bg-thron-navy text-white border-thron-navy" : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  Don Récurrent (Mensuel)
                </button>
              </div>

              {/* Destinataire */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Destinataire</label>
                <select
                  value={donDestinataire}
                  onChange={(e) => setDonDestinataire(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                >
                  <option value="Lignée Mantinkpon ò">Lignée Mantinkpon ò (Siège)</option>
                  <option value="Temple Alafia Abomey-Calavi">Temple Alafia Abomey-Calavi</option>
                  <option value="Fondation Caritative Thron Hounto">Fondation Caritative Thron Hounto</option>
                </select>
              </div>

              {/* Montant */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Montant du don (F CFA)</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[2000, 5000, 10000, 25000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDonAmount(amt)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        donAmount === amt ? "bg-rose-600 text-white border-rose-600" : "bg-slate-50 text-slate-700 border-slate-200"
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
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-thron-navy"
                />
              </div>

              {/* Intention */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Intention de bénédiction ou prière</label>
                <textarea
                  rows={2}
                  value={donIntention}
                  onChange={(e) => setDonIntention(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors cursor-pointer"
              >
                Confirmer l'Offrande ({donAmount.toLocaleString("fr-FR")} F CFA)
              </button>
            </form>
          </div>

          {/* Reçu et remerciement modal/card */}
          {selectedReceipt && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-3xl p-6 border-2 border-thron-gold shadow-md text-xs space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-serif font-bold text-base text-thron-navy">Reçu Officiel d'Offrande Spirituelle</span>
                </div>
                <span className="font-mono text-[11px] font-bold text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full">
                  {selectedReceipt.referenceRecu}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Bénéficiaire :</span>
                  <strong className="text-thron-navy">{selectedReceipt.destinataire}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Montant apporté :</span>
                  <strong className="text-emerald-700 font-serif text-sm">{selectedReceipt.montant.toLocaleString("fr-FR")} F CFA</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Nature de l'offrande :</span>
                  <span className="font-semibold">{selectedReceipt.typeDon === "ponctuel" ? "Offrande ponctuelle" : "Engagement récurrent mensuel"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Date d'émission :</span>
                  <span>{selectedReceipt.date}</span>
                </div>
              </div>

              <div className="p-3 bg-white/80 rounded-2xl border border-amber-200 text-slate-700">
                <strong className="text-amber-900 block mb-1">Message de Bénédiction du Trône :</strong>
                <p className="italic text-[11px]">
                  « Que les mânes de nos ancêtres et la bienveillance de Thron kpeto deka alafia accordent paix, santé et prospérité à votre foyer. Vos intentions sont sanctifiées. »
                </p>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => alert(`Reçu ${selectedReceipt.referenceRecu} téléchargé en PDF sécurisé.`)}
                  className="px-4 py-2 bg-thron-navy text-white rounded-xl font-bold text-xs flex items-center gap-1.5 hover:bg-thron-blue transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Télécharger mon reçu PDF
                </button>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* MODALE DE CRÉATION DE TONTINE STRICTE (NOUVELLS CORRECTIONS)   */}
      {/* ============================================================== */}
      {createTontineOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl border border-thron-gold/50 my-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-thron-gold" />
                <h3 className="font-serif font-bold text-base text-thron-navy">
                  Lancer une Tontine Sacrée
                </h3>
              </div>
              <button
                onClick={() => setCreateTontineOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTontine} className="mt-4 space-y-4 text-xs">
              {/* Type d'entité */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Structure organisatrice autorisée *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewTontineEntityType("lignee")}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all text-left flex items-center gap-2 cursor-pointer ${
                      newTontineEntityType === "lignee"
                        ? "bg-thron-navy text-white border-thron-navy"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Lignée entière</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTontineEntityType("temple")}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all text-left flex items-center gap-2 cursor-pointer ${
                      newTontineEntityType === "temple"
                        ? "bg-thron-navy text-white border-thron-navy"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Temple (Membres seuls)</span>
                  </button>
                </div>
                {newTontineEntityType === "temple" && (
                  <p className="mt-1 text-[11px] text-amber-700 font-semibold">
                    * Règle sacrée : Le leader de la Lignée qui coiffe ce temple recevra automatiquement une notification officielle de lancement.
                  </p>
                )}
              </div>

              {/* Nom */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nom de la tontine *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Épargne Fraternelle du Temple Alafia"
                  value={newTontineName}
                  onChange={(e) => setNewTontineName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-thron-gold"
                />
              </div>

              {/* Montant Quote-part et Périodicité */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Montant de la quote-part (F CFA) *
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    required
                    value={newTontinePart}
                    onChange={(e) => setNewTontinePart(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-thron-navy"
                  />
                  <span className="text-[10px] text-slate-400">
                    1 part sera débitée immédiatement pour l'ouverture.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Périodicité *</label>
                  <select
                    value={newTontinePeriodicity}
                    onChange={(e) => setNewTontinePeriodicity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  >
                    <option value="hebdomadaire">Hebdomadaire</option>
                    <option value="bimensuelle">Bimensuelle (tous les 15 jours)</option>
                    <option value="mensuelle">Mensuelle</option>
                  </select>
                </div>
              </div>

              {/* Nombre de participants & Montant total à ramasser */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nombre de personnes attendues *
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="100"
                    required
                    value={newTontineExpectedCount}
                    onChange={(e) => setNewTontineExpectedCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Montant total à ramasser (Calculé)
                  </label>
                  <div className="w-full px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-black text-emerald-700">
                    {(newTontinePart * newTontineExpectedCount).toLocaleString("fr-FR")} F CFA
                  </div>
                </div>
              </div>

              {/* Date démarrage & Catégories éligibles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date de démarrage *</label>
                  <input
                    type="date"
                    required
                    value={newTontineStartDate}
                    onChange={(e) => setNewTontineStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Catégories de personnes éligibles *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTontineCategories}
                    onChange={(e) => setNewTontineCategories(e.target.value)}
                    placeholder="Ex : Hounvi, Dignitaires, Assi..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
              </div>

              {/* Bureau de la tontine (Président, Secrétaire, Trésorier) */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-thron-navy block text-[11px] uppercase tracking-wide">
                  Bureau de Gestion de la Tontine (Obligatoire)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Président</label>
                    <input
                      type="text"
                      required
                      value={newTontinePresident}
                      onChange={(e) => setNewTontinePresident(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Secrétaire</label>
                    <input
                      type="text"
                      required
                      value={newTontineSecretary}
                      onChange={(e) => setNewTontineSecretary(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Trésorier</label>
                    <input
                      type="text"
                      required
                      value={newTontineTreasurer}
                      onChange={(e) => setNewTontineTreasurer(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Règlement intérieur (Upload) */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Règlement Intérieur & Statuts (Consultation libre avant adhésion) *
                </label>
                <div className="p-3 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-thron-gold" />
                    <div>
                      <span className="text-[11px] font-bold text-slate-700 block">
                        {newTontineRulesFileName}
                      </span>
                      <span className="text-[10px] text-slate-400">PDF, Word ou Texte (Max 5Mo)</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNewTontineRulesFileName("Statuts_Tontine_Hounto_Valide.pdf")}
                    className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-slate-700 font-semibold text-[11px] hover:bg-slate-50 cursor-pointer"
                  >
                    Remplacer
                  </button>
                </div>
              </div>

              {/* Récapitulatif paiement ouverture */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-[11px] text-amber-900 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Paiement de la 1ère part obligatoire pour ouvrir le compte :</span>
                  <span>{newTontinePart.toLocaleString("fr-FR")} F CFA</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Solde de votre portefeuille disponible :</span>
                  <span>{userWalletBalance.toLocaleString("fr-FR")} F CFA</span>
                </div>
              </div>

              {creationNotificationMsg && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold space-y-1 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{creationNotificationMsg}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateTontineOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-thron-navy hover:bg-thron-blue text-white font-bold shadow-md cursor-pointer"
                >
                  Ouvrir le compte & Payer 1 part ({newTontinePart.toLocaleString("fr-FR")} F CFA)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
