"use client";

import React, { useState, useEffect } from "react";
import {
  Crown,
  Users,
  Heart,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  Bell,
  CheckCircle2,
  AlertCircle,
  Coins,
  CreditCard,
  MessageSquare,
  Building2,
  X,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// DONNÉES DES 10 PREMIÈRES TÊTES DE LA LIGNÉE (POUR L'ANIMATION EN FONDU)
// ============================================================================
export interface LigneeHead {
  id: string;
  nomComplet: string;
  titreSpirituel: string;
  poste: string;
  grade: string;
  photoUrl: string;
  temple: string;
  biographieCourte: string;
}

export const DIX_TETES_MANTINKPON: LigneeHead[] = [
  {
    id: "t1",
    nomComplet: "MONSIA Serge",
    titreSpirituel: "Togbé Mintoniu bo tozé",
    poste: "Maître Suprême & Héritier Coiffant le Trône",
    grade: "Togbegan daho",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    temple: "Siège Central Mantinkpon ò (Abomey-Calavi)",
    biographieCourte: "Gardien suprême des traditions et des archives oraculaires de la Lignée Mantinkpon ò.",
  },
  {
    id: "t2",
    nomComplet: "Dah MONSIA Gbèdan",
    titreSpirituel: "Dah Kpeto Gbedan",
    poste: "Grand Conseiller Spirituel & Patriarche",
    grade: "Hounnongan daho",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
    temple: "Temple Historique de Ouidah",
    biographieCourte: "Père spirituel direct, veilleur des rites ancestraux et des consécrations d'Atinkindoudou.",
  },
  {
    id: "t3",
    nomComplet: "DOSSOU Mahugnon",
    titreSpirituel: "Hounnon Mahugnon Alafia",
    poste: "Responsable des Rituels & Grand Prêtre",
    grade: "Hounnon",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80",
    temple: "Temple Alafia Calavi",
    biographieCourte: "Conducteur des cérémonies d'élévation et superviseur des autels sacrés.",
  },
  {
    id: "t4",
    nomComplet: "TOSSOU Pélagie",
    titreSpirituel: "Tassinon Kpezinvi",
    poste: "Matriarche & Guide des Femmes Dignitaires (Assi)",
    grade: "Hounonsi",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    temple: "Temple de Cotonou-Est",
    biographieCourte: "Présidente de l'assemblée des Assi et protectrice du foyer rituel des femmes initiées.",
  },
  {
    id: "t5",
    nomComplet: "HOUNKPÉ Marcel",
    titreSpirituel: "Hounnongan Agbessi",
    poste: "Superviseur Général des Temples Affiliés",
    grade: "Hounnongan",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
    temple: "Temple Paix & Lumière Porto-Novo",
    biographieCourte: "Coordonnateur des 12 temples placés sous la tutelle de la lignée.",
  },
  {
    id: "t6",
    nomComplet: "ADANHOUNZO Clément",
    titreSpirituel: "Hounnon Djisso",
    poste: "Maître des Chants & Invocations Zindo",
    grade: "Hounnon",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
    temple: "Temple Alafia Calavi",
    biographieCourte: "Archiviste des hymnes sacrés et directeur des veillées nocturnes.",
  },
  {
    id: "t7",
    nomComplet: "KPONOU Justine",
    titreSpirituel: "Assi Daho Mantinkpon",
    poste: "Trésorière du Conseil des Dignitaires",
    grade: "Hounonsi",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
    temple: "Siège Central Mantinkpon ò",
    biographieCourte: "Gestionnaire du fonds d'entraide et de la tontine solidaire du trône.",
  },
  {
    id: "t8",
    nomComplet: "SOHOU Marcellin",
    titreSpirituel: "Hounnon Aligbonon",
    poste: "Conservateur du Patrimoine & Objets Sacrés",
    grade: "Hounnon",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=80",
    temple: "Sanctuaire d'Allada",
    biographieCourte: "Responsable de la purification des regalia et des cloches d'Atinsa.",
  },
  {
    id: "t9",
    nomComplet: "AVOCÈ Barnabé",
    titreSpirituel: "Hounnon Mawugnon",
    poste: "Délégué aux Relations Inter-Lignées",
    grade: "Hounnon",
    photoUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&auto=format&fit=crop&q=80",
    temple: "Temple Thron Lokossa",
    biographieCourte: "Émissaire officiel auprès des autres trônes du Courant Alafia.",
  },
  {
    id: "t10",
    nomComplet: "ZANNOU Félicien",
    titreSpirituel: "Hounnon Akovogan",
    poste: "Secrétaire Général du Trône & Registres",
    grade: "Hounnon",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
    temple: "Siège Central Mantinkpon ò",
    biographieCourte: "Enregistreur des baptêmes cultuels (Atinkindouvi) et des actes de la lignée.",
  },
];

// ============================================================================
// DONNÉES DES COURANTS & LIGNÉES ABONNÉES (POUR LE VISITEUR)
// ============================================================================
export interface SubscribedLineage {
  id: string;
  nom: string;
  courant: string;
  superieurNom: string;
  superieurTitre: string;
  superieurPhoto: string;
  formuleAbonnement: "Assiata" | "Togoundaho" | "Togounkpevi";
  localisation: string;
  nbFideles: number;
  activitesDescription: string;
  horaires: string;
  templesCount: number;
  description: string;
}

export const LIGNEES_ABONNEES: SubscribedLineage[] = [
  {
    id: "lig-1",
    nom: "Lignée Mantinkpon ò",
    courant: "Thron kpeto deka alafia",
    superieurNom: "Togbé Mintoniu bo tozé (Serge MONSIA)",
    superieurTitre: "Togbegan daho • Maître Suprême Coiffant le Trône",
    superieurPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    formuleAbonnement: "Assiata",
    localisation: "Abomey-Calavi & Ouidah, Bénin",
    nbFideles: 1450,
    activitesDescription: "Cérémonies d'Atinkindoudou, veillées de chants sacrés Zindo, oracles Alafia, soutien solidaire.",
    horaires: "Tous les dimanches 10h00 • Veillée sacrée le 1er vendredi du mois",
    templesCount: 12,
    description: "Siège historique fondé par Feu Mantinkpon ò Adjikanmahoutokounon MONSIA, garant de la pureté du trône Alafia.",
  },
  {
    id: "lig-2",
    nom: "Lignée Kpodékon Daho",
    courant: "Thron Sissè Dékpê",
    superieurNom: "Togbé Kpodékon Mawulé",
    superieurTitre: "Togbegan • Gardien des Enseignements",
    superieurPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
    formuleAbonnement: "Togoundaho",
    localisation: "Porto-Novo, Bénin",
    nbFideles: 890,
    activitesDescription: "Transmission doctrinale des chants rituels Zindo, prières de bénédiction et purifications familiales.",
    horaires: "Samedis à 16h00",
    templesCount: 6,
    description: "Lignée réputée pour sa rigueur d'initiation et la préservation mélodique des cantiques sacrés.",
  },
  {
    id: "lig-3",
    nom: "Lignée Gbémin Alafia",
    courant: "Thron Gbémin",
    superieurNom: "Dah Hounnon Gbèto",
    superieurTitre: "Hounnongan daho • Patriarche",
    superieurPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80",
    formuleAbonnement: "Assiata",
    localisation: "Cotonou & Allada, Bénin",
    nbFideles: 620,
    activitesDescription: "Rites de protection ancestrale, levée d'épreuves, cérémonies de baptêmes initiatiques.",
    horaires: "Dimanches à 09h00",
    templesCount: 4,
    description: "Pôle traditionnel d'Allada perpétuant les secrets de purification et de cohésion communautaire.",
  },
];

// ============================================================================
// PROPS DU COMPOSANT
// ============================================================================
interface LigneeLandingViewProps {
  isMember: boolean;
  currentUser?: {
    nom: string;
    prenom: string;
    grade: string;
    lignee: string;
    temple: string;
    role: string;
    photoUrl?: string;
  };
  onOpenConsultationModal?: () => void;
  onOpenDonationModal?: () => void;
  onOpenMemberRegistration?: () => void;
  onNavigateToCotisations?: () => void;
  onNavigateToTontines?: () => void;
}

export const LigneeLandingView: React.FC<LigneeLandingViewProps> = ({
  isMember,
  currentUser,
  onOpenConsultationModal,
  onOpenDonationModal,
  onOpenMemberRegistration,
  onNavigateToCotisations,
  onNavigateToTontines,
}) => {
  // Index de la tête active pour l'animation en fondu (Member Mode)
  const [activeHeadIndex, setActiveHeadIndex] = useState(0);
  const [isAutoFading, setIsAutoFading] = useState(true);

  // Modal détaillée d'une lignée pour visiteur
  const [selectedLineageForDetail, setSelectedLineageForDetail] = useState<SubscribedLineage | null>(null);

  // Activités de la lignée
  const [activities] = useState([
    {
      id: "act-1",
      titre: "Cérémonie Sacrée d'Atinkindoudou",
      type: "Baptême & Consécration",
      date: "Ce Dimanche 10h00",
      lieu: "Siège Central Mantinkpon ò",
      statut: "a_venir" as const, // 'deja_passee' | 'a_venir' | 'en_cours'
      description: "Rassemblement de tous les fidèles et postulants pour le baptême traditionnel et la bénédiction du trône.",
    },
    {
      id: "act-2",
      titre: "Rituels de Purification Yesoufifo",
      type: "Rituel Mensuel",
      date: "En ce moment même",
      lieu: "Temple Alafia Calavi",
      statut: "en_cours" as const,
      description: "Purification des autels et séances d'écoute oraculaire avec les Hounnons du temple.",
    },
    {
      id: "act-3",
      titre: "Grande Veillée de Louanges Zindo",
      type: "Chants & Cantiques",
      date: "Vendredi 10 Octobre",
      lieu: "Temple de Ouidah",
      statut: "deja_passee" as const,
      description: "Nuit de recueillement et de ferveur spirituelle sous la conduite des Tassinons et chantres.",
    },
    {
      id: "act-4",
      titre: "Consultation Oraculaire Communautaire",
      type: "Guidance Spirituelle",
      date: "Jeudi Prochain 14h00",
      lieu: "Cabinet du Maître",
      statut: "a_venir" as const,
      description: "Séance réservée aux fidèles inscrits pour les prédictions et orientations de vie.",
    },
  ]);

  // Communications officielles
  const [communications] = useState([
    {
      id: "comm-1",
      titre: "Message du Maître de Lignée sur la Fraternité et la Paix (Alafia)",
      auteur: "Togbé Mintoniu bo tozé",
      grade: "Togbegan daho",
      date: "Il y a 2 jours",
      contenu: "Chers dignitaires, initiés et fidèles du Trône Mantinkpon ò, que la clarté et la paix accompagnent vos demeures. Nous rappelons l'importance de la solidarité mutuelle et de la participation assidue aux tontines et cotisations de la communauté.",
      urgent: false,
    },
    {
      id: "comm-2",
      titre: "Appel solennel à la préparation des cérémonies de fin d'année",
      auteur: "Conseil des Sages & Hounnongans",
      grade: "Collège Spirituel",
      date: "Il y a 5 jours",
      contenu: "Tous les temples affiliés sont invités à harmoniser les calendriers d'offrandes et de dons afin d'assurer l'accueil solennel des nouveaux initiés Atinkindouvi.",
      urgent: true,
    },
  ]);

  // Carrousel des activités : index de défilement
  const [activityIndex, setActivityIndex] = useState(0);

  // Rotation automatique en fondu toutes les 6 secondes pour les 10 têtes
  useEffect(() => {
    if (!isMember || !isAutoFading) return;
    const interval = setInterval(() => {
      setActiveHeadIndex((prev) => (prev + 1) % DIX_TETES_MANTINKPON.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isMember, isAutoFading]);

  const activeHead = DIX_TETES_MANTINKPON[activeHeadIndex];

  // ==========================================================================
  // 1. CAS VISITEUR (NON-FIDÈLE)
  // ==========================================================================
  if (!isMember) {
    return (
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-10 animate-in fade-in duration-500">
        {/* HERO IMMERSIF : LES 3 COURANTS SACRÉS THRON */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0F1E36] to-[#0A1628] text-white p-6 sm:p-12 border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Alliance Sacrée des Trônes
            </div>

            <h1 className="font-sans text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400 leading-tight">
              Les 3 Courants Spirituels de la Communauté Thron
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Découvrez la richesse théologique, les lignées séculaires et les temples vivants. Choisissez une lignée d'attache pour recevoir l'initiation, demander une consultation ou faire une offrande.
            </p>

            {/* LES 3 COURANTS */}
            <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-left">
              <div className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-blue-400/30 transition-all">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 block mb-1">Courant I</span>
                <h4 className="font-bold text-base text-white">Thron kpeto deka alafia</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">Le courant originel de la paix suprême (Alafia), de la justice oraculaire et de la concorde fraternelle.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-blue-400/30 transition-all">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 block mb-1">Courant II</span>
                <h4 className="font-bold text-base text-white">Thron Sissè Dékpê</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">Branche de la pureté rituelle et de l'enseignement des cantiques sacrés Zindo.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 transition-all">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block mb-1">Courant III</span>
                <h4 className="font-bold text-base text-white">Thron Gbémin</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">Courant des traditions ancestrales, de la protection des familles et de l'enracinement.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CARROUSEL DES LIGNÉES & TEMPLES ABONNÉS */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Lignées Officielles Connectées
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0A1628]">
                Lignées & Temples Abonnés à la Plateforme
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Chaque communauté possède un compte d'abonnement actif
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {LIGNEES_ABONNEES.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                      Abonné : Formule {item.formuleAbonnement}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-blue-600" /> {item.nbFideles} fidèles
                    </span>
                  </div>

                  {/* Photo & Nom du Supérieur */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-md flex-shrink-0">
                      <img
                        src={item.superieurPhoto}
                        alt={item.superieurNom}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-600 block">Supérieur Spirituel</span>
                      <h4 className="font-bold text-sm text-[#0A1628] leading-tight">
                        {item.superieurNom}
                      </h4>
                      <span className="text-[10px] text-slate-500 line-clamp-1">{item.superieurTitre}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-[#0A1628] group-hover:text-blue-600 transition-colors">
                    {item.nom}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="truncate">{item.localisation}</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-2">
                  <button
                    onClick={onOpenMemberRegistration}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-1 cursor-pointer btn-press"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Devenir membre
                  </button>

                  <button
                    onClick={() => setSelectedLineageForDetail(item)}
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer btn-press"
                  >
                    Voir plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODALE DE PRÉSENTATION DÉTAILLÉE DU TEMPLE / LIGNÉE */}
        {selectedLineageForDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-500/20 ring-1 ring-black/5 my-6 animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedLineageForDetail(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-md flex-shrink-0">
                  <img
                    src={selectedLineageForDetail.superieurPhoto}
                    alt={selectedLineageForDetail.superieurNom}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase">
                    {selectedLineageForDetail.courant}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0A1628] mt-1">
                    {selectedLineageForDetail.nom}
                  </h3>
                  <p className="text-xs text-blue-700 font-semibold">
                    Supérieur : {selectedLineageForDetail.superieurNom} ({selectedLineageForDetail.superieurTitre})
                  </p>
                </div>
              </div>

              <div className="py-4 space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-[#0A1628] uppercase text-[11px] mb-1">
                    Présentation & Origines
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedLineageForDetail.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Localisation & Sièges</span>
                    <strong className="text-[#0A1628]">{selectedLineageForDetail.localisation}</strong>
                    <span className="text-[11px] text-slate-500 block mt-0.5">{selectedLineageForDetail.templesCount} temples rattachés</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Horaires Cultuels</span>
                    <strong className="text-[#0A1628]">{selectedLineageForDetail.horaires}</strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#0A1628] uppercase text-[11px] mb-1">
                    Activités & Rituels du Temple
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedLineageForDetail.activitesDescription}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setSelectedLineageForDetail(null);
                    if (onOpenConsultationModal) onOpenConsultationModal();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#0A1628] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer btn-press"
                >
                  <MessageSquare className="w-4 h-4 text-blue-400" /> Faire une consultation
                </button>

                <button
                  onClick={() => {
                    setSelectedLineageForDetail(null);
                    if (onOpenDonationModal) onOpenDonationModal();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow btn-press"
                >
                  <Heart className="w-4 h-4" /> Faire un don au temple
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================================================
  // 2. CAS MEMBRE (FIDÈLE DÉJÀ AFFILIÉ À SA LIGNÉE)
  // ==========================================================================
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-10 animate-in fade-in duration-500">
      {/* ==================================================================== */}
      {/* 1. ANIMATION EN FONDU DES 10 PREMIÈRES TÊTES (GRAND FORMAT AVEC NOM) */}
      {/* ==================================================================== */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0A1628] via-[#0F1E36] to-[#0A1628] text-white p-6 sm:p-10 shadow-2xl border border-white/10">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/30 text-[11px] font-black uppercase tracking-widest mb-1">
            Collège Sacré • Lignée Mantinkpon ò
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
            Les 10 Premières Têtes Spirituelles du Trône
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-lg mx-auto">
            Présentation solennelle en fondu des dignitaires et piliers initiatiques guidant notre Hounto.
          </p>
        </div>

        {/* CADRE GRAND FORMAT DE LA TÊTE ACTIVE AVEC ANIMATION EN FONDU (Framer Motion) */}
        <div className="relative max-w-xl mx-auto min-h-[460px] sm:min-h-[500px] flex flex-col justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHead.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative w-full h-[460px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-blue-500/40 p-1 bg-[#0A1628]"
            >
              <img
                src={activeHead.photoUrl}
                alt={activeHead.nomComplet}
                className="w-full h-full object-cover rounded-2xl"
              />

              {/* DÉGRADÉ D'OMBRE CINÉMATOGRAPHIQUE */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent rounded-2xl" />

              {/* EN-TÊTE DANS L'IMAGE : NOM, TITRE ET POSTE OCCUPÉ (CONSIGNE DOCUMENT) */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-extrabold shadow-md uppercase tracking-wider">
                  Tête #{activeHeadIndex + 1} / 10 • {activeHead.grade}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-blue-200 border border-white/20 text-[10px] font-bold">
                  {activeHead.temple}
                </span>
              </div>

              {/* BAS DE L'IMAGE : TITRE SPIRITUEL ET POSTE EN GRAND FORMAT */}
              <div className="absolute bottom-6 left-6 right-6 text-white text-center space-y-1">
                <span className="inline-block px-3 py-0.5 bg-blue-600/30 text-blue-200 border border-blue-400/40 rounded-full text-xs font-black uppercase tracking-wider">
                  {activeHead.poste}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-md">
                  {activeHead.nomComplet}
                </h3>
                <p className="text-sm sm:text-base text-blue-300 font-bold italic">
                  « {activeHead.titreSpirituel} »
                </p>
                <p className="text-xs text-slate-300 max-w-md mx-auto pt-1 line-clamp-2">
                  {activeHead.biographieCourte}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CONTRÔLES DU FONDU (PRÉCÉDENT / SUIVANT / PAUSE) */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => {
                setIsAutoFading(false);
                setActiveHeadIndex((prev) => (prev - 1 + DIX_TETES_MANTINKPON.length) % DIX_TETES_MANTINKPON.length);
              }}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Tête précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* INDICATEURS DES 10 TÊTES */}
            <div className="flex items-center gap-1.5">
              {DIX_TETES_MANTINKPON.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoFading(false);
                    setActiveHeadIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeHeadIndex === i ? "w-8 bg-blue-500 shadow-md" : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                  title={`Voir tête #${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setIsAutoFading(false);
                setActiveHeadIndex((prev) => (prev + 1) % DIX_TETES_MANTINKPON.length);
              }}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Tête suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. STATISTIQUES OFFICIELLES DE LA LIGNÉE (CONSIGNE DOCUMENT)         */}
      {/* ==================================================================== */}
      <div className="space-y-3">
        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Dénombrement Officiel du Trône
          </span>
          <h3 className="font-serif text-lg font-bold text-thron-navy">
            Statistiques de la Lignée Mantinkpon ò
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#0A1628] block">1 450</span>
            <span className="text-xs font-bold text-slate-700 block mt-1">Nombre de fidèles</span>
            <span className="text-[10px] text-slate-400">Arbre tactile actif</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 block">28</span>
            <span className="text-xs font-bold text-slate-700 block mt-1">Hounnons (Hn)</span>
            <span className="text-[10px] text-slate-400">Détenteurs d'un Hounto</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-800 block">6</span>
            <span className="text-xs font-bold text-slate-700 block mt-1">Hounnongan (Hng)</span>
            <span className="text-[10px] text-slate-400">Grands Dignitaires</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 block">12</span>
            <span className="text-xs font-bold text-slate-700 block mt-1">Temples rattachés</span>
            <span className="text-[10px] text-slate-400">Calavi, Ouidah, Cotonou</span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. LES DEUX BOUTONS MAJEURS : FAIRE UN DON & FAIRE UNE CONSULTATION  */}
      {/* ==================================================================== */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-lg text-[#0A1628]">
            Actions & Dévotion auprès du Trône
          </h4>
          <p className="text-xs text-slate-500">
            Soutenez les œuvres de la lignée ou sollicitez la guidance oraculaire d'un dignitaire Hounnon.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onOpenDonationModal}
            className="flex-1 sm:flex-initial px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer btn-press"
          >
            <Heart className="w-4 h-4" /> Faire un don
          </button>

          <button
            onClick={onOpenConsultationModal}
            className="flex-1 sm:flex-initial px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer btn-press"
          >
            <MessageSquare className="w-4 h-4 text-white" /> Faire une consultation
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. BLOC DES ACTIVITÉS DE LA LIGNÉE (CARROUSEL AVEC STATUTS)          */}
      {/* ==================================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Agenda & Rituels du Siège
            </span>
            <h3 className="font-bold text-xl text-[#0A1628]">
              Activités de la Lignée
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActivityIndex((prev) => (prev > 0 ? prev - 1 : activities.length - 1))}
              className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivityIndex((prev) => (prev + 1) % activities.length)}
              className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((act) => {
            const isSelected = activities[activityIndex].id === act.id;
            return (
              <div
                key={act.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-blue-500 shadow-md ring-1 ring-blue-500/20"
                    : "bg-white/80 border-slate-200 shadow-sm hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {act.type}
                    </span>

                    {/* ÉTIQUETTE DU STATUT REQUIS : passée, à venir, en cours */}
                    {act.statut === "en_cours" && (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-extrabold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                        En cours
                      </span>
                    )}
                    {act.statut === "a_venir" && (
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-extrabold">
                        À venir
                      </span>
                    )}
                    {act.statut === "deja_passee" && (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">
                        Déjà passée
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-base text-[#0A1628]">
                    {act.titre}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {act.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-semibold text-[#0A1628]">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" /> {act.date}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" /> {act.lieu}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 5. BLOC COMMUNICATION OFFICIELLE (COMMUNIQUÉS OFFICIELS)             */}
      {/* ==================================================================== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Voix du Trône
            </span>
            <h3 className="font-bold text-xl text-[#0A1628]">
              Communication Officielle de la Lignée
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {communications.map((comm) => (
            <div
              key={comm.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-extrabold uppercase">
                    {comm.grade}
                  </span>
                  <span className="font-bold text-xs text-[#0A1628]">{comm.auteur}</span>
                </div>
                <span className="text-[10px] text-slate-400">{comm.date}</span>
              </div>

              <h4 className="font-bold text-sm text-[#0A1628]">
                {comm.titre}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-2xl border border-slate-100">
                « {comm.contenu} »
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 6. BLOC COTISATIONS SUIVI DU BLOC TONTINES (ACCÈS RAPIDE)            */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BLOC COTISATIONS */}
        <div
          onClick={onNavigateToCotisations}
          className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] text-white rounded-3xl p-6 border border-white/10 shadow-md hover:shadow-xl hover:border-blue-400/40 transition-all cursor-pointer flex flex-col justify-between btn-press"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                Cotisation Libre & Fixe
              </span>
            </div>

            <h4 className="font-bold text-lg text-white">
              Cotisations du Temple & Lignée
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Participez à l'entretien du sanctuaire, aux travaux du trône et à la préparation des rituels cultuels.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-bold text-blue-300">
            <span>Gérer mes cotisations</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* BLOC TONTINES */}
        <div
          onClick={onNavigateToTontines}
          className="bg-gradient-to-br from-[#0F1E36] to-[#0A1628] text-white rounded-3xl p-6 border border-white/10 shadow-md hover:shadow-xl hover:border-blue-400/40 transition-all cursor-pointer flex flex-col justify-between btn-press"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                <Coins className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-[10px] font-bold">
                Épargne Solidaire 8%
              </span>
            </div>

            <h4 className="font-bold text-lg text-white">
              Tontines de la Lignée & Temples
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Souscrivez aux tontines rotatives lancées par les Hounnons et Hounnonsis pour financer vos projets sous séquestre.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-bold text-blue-300">
            <span>Accéder aux tontines</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
