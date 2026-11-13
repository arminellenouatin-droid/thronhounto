"use client";

import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Sparkles,
  MapPin,
  ShieldCheck,
  Heart,
  Baby,
  Users,
  Award,
  ArrowUpRight,
  Info,
  Crown,
  GitFork,
  ArrowDown,
  Compass,
} from "lucide-react";
import {
  SpiritualNode,
  ARBRE_MANTINKPON,
  NOEUD_PERE_DIRECT,
  NOEUD_FONDATEUR,
} from "@/lib/data";

interface GenealogyTreeProps {
  onSelectMember?: (node: SpiritualNode) => void;
  currentUserPhoto?: string;
  onUpdatePhoto?: (newPhoto: string) => void;
}

export const GenealogyTree: React.FC<GenealogyTreeProps> = ({
  onSelectMember,
  currentUserPhoto,
  onUpdatePhoto,
}) => {
  // Nœud actuellement centré dans l'arbre tactile
  const [currentNode, setCurrentNode] = useState<SpiritualNode>(ARBRE_MANTINKPON);
  const [selectedChildDetail, setSelectedChildDetail] = useState<SpiritualNode | null>(null);
  const [affiliationFilter, setAffiliationFilter] = useState<"all" | "hounvi" | "assi" | "vidjidji">("all");
  const [showAncestorsHierarchy, setShowAncestorsHierarchy] = useState(false);

  // Monter vers le Père direct
  const handleGoToFather = () => {
    setCurrentNode(NOEUD_PERE_DIRECT);
  };

  // Monter vers le Grand-père / Fondateur
  const handleGoToFounder = () => {
    setCurrentNode(NOEUD_FONDATEUR);
  };

  // Redescendre vers la tête connectée (ex: Togbé Mintoniu bo tozé)
  const handleResetToSelf = () => {
    setCurrentNode(ARBRE_MANTINKPON);
  };

  // Descendre sur une tête spirituelle de hounto (Hounnon+)
  const handleDrillDownToChild = (child: SpiritualNode) => {
    setCurrentNode({
      ...child,
      pereDirectNom: currentNode.nomComplet,
      grandPereNom: currentNode.pereDirectNom || "Lignée Mantinkpon ò",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* 1. CHAÎNE HIÉRARCHIQUE SACRÉE : COURANT -> LIGNÉE -> TEMPLES */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest font-extrabold text-blue-600">
              Hiérarchie Sacrée Thron
            </span>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
            Trône & Siège Hérité
          </span>
        </div>

        {/* Représentation visuelle de la chaîne : Courants > Lignées > Temples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
          {/* Niveau 1 : Courant */}
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
              1. Courant Spirituel
            </span>
            <p className="font-bold text-[#0A1628]">Thron kpeto deka alafia</p>
            <span className="text-[10px] text-slate-500">Paix, élévation et droiture</span>
          </div>

          {/* Niveau 2 : Lignée & Maître */}
          <div className="p-2.5 rounded-2xl bg-blue-50/70 border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-700 block mb-0.5">
              2. Compte Lignée (Maître)
            </span>
            <p className="font-bold text-[#0A1628]">Lignée Mantinkpon ò</p>
            <span className="text-[10px] text-blue-900 font-medium">Héritier : Togbé Mintoniu bo tozé</span>
          </div>

          {/* Niveau 3 : Temples rattachés */}
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
              3. Temples & Hountos
            </span>
            <p className="font-bold text-[#0A1628]">Temple Alafia Calavi</p>
            <span className="text-[10px] text-slate-500">Siège principal et temples affiliés</span>
          </div>
        </div>

        {/* Bouton pour afficher la généalogie ascendance / héritage */}
        <div className="pt-1 flex items-center justify-between text-xs">
          <p className="text-[11px] text-slate-500">
            Règle sacrée : <em>« Pour être une Tête dans la généalogie, il faut forcément au moins être Hounnon (avoir un Hounto). »</em>
          </p>
          <button
            onClick={() => setShowAncestorsHierarchy(!showAncestorsHierarchy)}
            className="text-blue-600 hover:text-blue-800 font-bold underline text-[11px] flex items-center gap-1 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-blue-600" />
            {showAncestorsHierarchy ? "Masquer l'Ascendance" : "Voir l'Ascendance (Fondateurs)"}
          </button>
        </div>

        {/* Volet déroulant Ascendance Spirituelle (L'arbre vers le haut) */}
        {showAncestorsHierarchy && (
          <div className="mt-3 p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs space-y-2 animate-in fade-in duration-200">
            <h5 className="font-bold text-[#0A1628] flex items-center gap-1.5">
              <ChevronUp className="w-4 h-4 text-blue-600" />
              Ascendance Spirituelle vers le Fondateur du Siège :
            </h5>
            <div className="space-y-1.5 pl-4 border-l-2 border-blue-500 text-[11px]">
              <div>
                <strong className="text-[#0A1628]">1. Fondateur historique du Trône :</strong>{" "}
                <span className="text-slate-700 font-medium">Feu Mantinkpon ò Adjikanmahoutokounon MONSIA (Père spirituel originel)</span>
              </div>
              <div>
                <strong className="text-[#0A1628]">2. Grand Maître Spirituel intermédiaire :</strong>{" "}
                <span className="text-slate-700 font-medium">Dah MONSIA Gbèdan (Père direct)</span>
              </div>
              <div>
                <strong className="text-[#0A1628]">3. Héritier actuel coiffant le siège :</strong>{" "}
                <span className="text-blue-900 font-bold">Togbé Mintoniu bo tozé (MONSIA Serge), Togbegan daho</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. ÉCRAN LIGNÉE TACTILE : GRAND-PÈRE GAUCHE, PÈRE DROITE, CENTRE LIGNÉE */}
      <div className="relative bg-[#0A1628] text-white rounded-3xl p-4 sm:p-6 shadow-xl border border-white/10 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-blue-600/15 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-blue-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4">
          {/* GAUCHE : GRAND-PÈRE DIRECT / FONDATEUR */}
          <button
            onClick={handleGoToFounder}
            className="flex flex-col items-center group transition-transform active:scale-95 cursor-pointer btn-press"
            title="Monter vers le fondateur de la lignée"
          >
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-blue-500 p-0.5 overflow-hidden shadow-md group-hover:border-blue-400 transition-colors">
                <img
                  src={currentNode.grandPerePhoto || NOEUD_FONDATEUR.photoUrl}
                  alt="Grand-père"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow">
                <ChevronUp className="w-3.5 h-3.5" />
              </span>
            </div>
            <span className="mt-1.5 text-[10px] sm:text-xs font-semibold text-blue-200 group-hover:text-white transition-colors text-center line-clamp-1 max-w-[85px] sm:max-w-[110px]">
              {currentNode.grandPereNom || "Grand-Père"}
            </span>
            <span className="text-[9px] text-slate-400">Fondateur</span>
          </button>

          {/* CENTRE : NOM DE LA LIGNÉE ET NOMBRE TOTAL DE FIDÈLES */}
          <div className="flex-1 text-center px-1 sm:px-4">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/30 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
              Thron kpeto deka alafia
            </span>
            <h3 className="text-base sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
              Lignée Mantinkpon ò
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5 font-medium">
              <strong className="text-blue-400 font-bold">1 450</strong> fidèles dans la branche
            </p>
          </div>

          {/* DROITE : LE PÈRE DIRECT */}
          <button
            onClick={handleGoToFather}
            className="flex flex-col items-center group transition-transform active:scale-95 cursor-pointer btn-press"
            title="Monter vers le père direct"
          >
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-blue-500 p-0.5 overflow-hidden shadow-md group-hover:border-blue-400 transition-colors">
                <img
                  src={currentNode.pereDirectPhoto || NOEUD_PERE_DIRECT.photoUrl}
                  alt="Père Direct"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -bottom-1 -left-1 w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow">
                <ChevronUp className="w-3.5 h-3.5" />
              </span>
            </div>
            <span className="mt-1.5 text-[10px] sm:text-xs font-semibold text-blue-200 group-hover:text-white transition-colors text-center line-clamp-1 max-w-[85px] sm:max-w-[110px]">
              {currentNode.pereDirectNom || "Père Direct"}
            </span>
            <span className="text-[9px] text-slate-400">Père Direct</span>
          </button>
        </div>
      </div>

      {/* 3. AU MILIEU : PHOTO DE LA TÊTE CONNECTÉE AVEC NOM, PRÉNOM ET GRADE */}
      <div className="relative bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex flex-col items-center text-center">
          {/* Cadre de photo tactile */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-2xl border-2 border-blue-500/40 p-1 bg-[#0A1628]">
            <img
              src={
                currentNode.id === ARBRE_MANTINKPON.id && currentUserPhoto
                  ? currentUserPhoto
                  : currentNode.photoUrl
              }
              alt={currentNode.nomComplet}
              className="w-full h-full object-cover rounded-2xl"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent rounded-2xl"></div>

            {/* TEXTE SUR LA PHOTO : GRADE, NOM, PRÉNOM */}
            <div className="absolute bottom-3 left-3 right-3 text-white text-center">
              <span className="inline-block px-2.5 py-0.5 mb-1 text-[11px] font-extrabold uppercase tracking-wider rounded-full bg-blue-600 text-white shadow-md">
                {currentNode.grade}
              </span>
              <h4 className="font-bold text-base sm:text-lg leading-tight drop-shadow">
                {currentNode.prenom} {currentNode.nom}
              </h4>
              <p className="text-[10px] sm:text-xs text-blue-200 font-medium">
                {currentNode.titreSpirituel || "Tête de Hounto"}
              </p>
            </div>
          </div>

          {/* Bouton de synchronisation Photo Profil <-> Arbre (Consigne document) */}
          {currentNode.id === ARBRE_MANTINKPON.id && onUpdatePhoto && (
            <button
              onClick={() => {
                const newPhoto = prompt(
                  "Entrez l'URL de votre nouvelle photo de profil :\n(Elle sera automatiquement synchronisée sur votre profil et sur l'arbre généalogique)",
                  currentUserPhoto || currentNode.photoUrl
                );
                if (newPhoto && newPhoto.trim()) {
                  onUpdatePhoto(newPhoto.trim());
                  alert("Photo mise à jour et synchronisée avec succès dans l'arbre et le profil !");
                }
              }}
              className="mt-3 text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 underline cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Modifier ma photo (synchronisée Arbre & Profil)
            </button>
          )}

          {/* Localisation et Temple */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            {currentNode.temple && (
              <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                {currentNode.temple}
              </span>
            )}
            {currentNode.localisation && (
              <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                {currentNode.localisation}
              </span>
            )}
          </div>
        </div>

        {/* 4. LES TROIS COMPTEURS SACRÉS CONFIRMÉS : ASSI, VIDJIDJI, HOUNVI */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="text-center mb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Compteurs Sacrés de la Tête
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {/* ASSI (Femmes / Épouses) */}
            <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 text-center border border-slate-200 shadow-sm transition-transform hover:scale-102">
              <div className="w-8 h-8 mx-auto rounded-full bg-slate-200 text-slate-700 flex items-center justify-center mb-1.5">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#0A1628]">
                {currentNode.assiCount}
              </span>
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Assi
              </span>
              <span className="text-[10px] text-slate-500">Femmes</span>
            </div>

            {/* VIDJIDJI (Enfants Biologiques) */}
            <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 text-center border border-slate-200 shadow-sm transition-transform hover:scale-102">
              <div className="w-8 h-8 mx-auto rounded-full bg-slate-200 text-slate-700 flex items-center justify-center mb-1.5">
                <Baby className="w-4 h-4" />
              </div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#0A1628]">
                {currentNode.vidjidjiCount}
              </span>
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Vidjidji
              </span>
              <span className="text-[10px] text-slate-500">Enfants Bio</span>
            </div>

            {/* HOUNVI (Enfants Spirituels) */}
            <div className="bg-blue-50/70 rounded-2xl p-3 sm:p-4 text-center border border-blue-200 shadow-sm transition-transform hover:scale-102">
              <div className="w-8 h-8 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1.5">
                <Users className="w-4 h-4" />
              </div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-blue-600">
                {currentNode.hounviCount}
              </span>
              <span className="block text-xs font-bold text-blue-700 uppercase tracking-wider">
                Hounvi
              </span>
              <span className="text-[10px] text-slate-500">Enfants Spirituels</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. DESCENDANCE / BRANCHES INFÉRIEURES : EXPLORATION TACTILE */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-thron-border space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="font-serif font-bold text-base sm:text-lg text-thron-navy">
              Descendance Spirituelle sous cette Tête
            </h4>
            <p className="text-xs text-slate-500">
              Touchez la photo d'une tête pour descendre directement dans sa sous-branche
            </p>
          </div>

          {currentNode.id !== ARBRE_MANTINKPON.id && (
            <button
              onClick={handleResetToSelf}
              className="px-3 py-1.5 text-xs bg-thron-blue text-white rounded-full font-bold hover:bg-thron-navy transition-colors shadow-sm"
            >
              Revenir au sommet de ma Lignée
            </button>
          )}
        </div>

        {/* Filtres par affiliation */}
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setAffiliationFilter("all")}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              affiliationFilter === "all" ? "bg-thron-navy text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Tous ({currentNode.children ? currentNode.children.length : 0})
          </button>
          <button
            onClick={() => setAffiliationFilter("hounvi")}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              affiliationFilter === "hounvi" ? "bg-thron-navy text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Têtes & Hounvi
          </button>
          <button
            onClick={() => setAffiliationFilter("assi")}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              affiliationFilter === "assi" ? "bg-thron-navy text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Assi (Femmes)
          </button>
          <button
            onClick={() => setAffiliationFilter("vidjidji")}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              affiliationFilter === "vidjidji" ? "bg-thron-navy text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Vidjidji (Enfants)
          </button>
        </div>

        {/* Grille tactile des membres */}
        {currentNode.children && currentNode.children.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {currentNode.children.map((child) => {
              // Règle : pour être une tête, il faut forcément être au moins Hounnon
              const isHead = child.grade.toLowerCase().includes("hounnon");

              return (
                <div
                  key={child.id}
                  onClick={() => {
                    if (isHead) {
                      handleDrillDownToChild(child);
                    } else {
                      setSelectedChildDetail(child);
                    }
                  }}
                  className={`group relative flex flex-col items-center p-3 rounded-2xl border text-center transition-all cursor-pointer btn-press ${
                    isHead
                      ? "bg-blue-50/40 border-blue-400 hover:bg-blue-50/70 hover:shadow-md"
                      : "bg-slate-50 border-slate-200 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <div className="relative mb-2">
                    <div
                      className={`w-14 h-14 rounded-full overflow-hidden border-2 ${
                        isHead ? "border-blue-600 shadow-sm ring-2 ring-blue-400/30" : "border-slate-300"
                      }`}
                    >
                      <img
                        src={child.photoUrl}
                        alt={child.nomComplet}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    {isHead && (
                      <span
                        className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow"
                        title="Tête de hounto — touchez pour descendre"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <span className="font-bold text-xs text-[#0A1628] line-clamp-1">
                    {child.prenom} {child.nom}
                  </span>
                  <span
                    className={`mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isHead
                        ? "bg-blue-50 text-blue-800 font-extrabold border border-blue-200"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {child.grade}
                  </span>

                  {isHead && (
                    <div className="mt-2 text-[10px] text-slate-700 font-bold flex items-center gap-1">
                      <span>{child.hounviCount} Hounvi</span>
                      <span>•</span>
                      <span className="text-blue-600 flex items-center underline">
                        Descendre <ChevronDown className="w-3 h-3 ml-0.5" />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-400 text-xs">
            Aucun sous-disciple direct enregistré sous cette tête.
          </div>
        )}
      </div>

      {/* MODALE DÉTAIL DU MEMBRE */}
      {selectedChildDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border border-blue-500/20 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-blue-500 mb-3 shadow">
              <img
                src={selectedChildDetail.photoUrl}
                alt={selectedChildDetail.nomComplet}
                className="w-full h-full object-cover"
              />
            </div>
            <h5 className="font-bold text-lg text-[#0A1628]">
              {selectedChildDetail.nomComplet}
            </h5>
            <span className="inline-block mt-1 px-3 py-1 bg-[#0A1628] text-white rounded-full text-xs font-bold uppercase">
              {selectedChildDetail.grade}
            </span>
            <p className="mt-3 text-xs text-slate-600">
              Affiliation spirituelle : <strong className="text-[#0A1628]">Hounvi</strong> (enfant spirituel)
            </p>
            {selectedChildDetail.temple && (
              <p className="text-xs text-slate-500 mt-1">
                Rattaché à : {selectedChildDetail.temple}
              </p>
            )}

            <button
              onClick={() => setSelectedChildDetail(null)}
              className="mt-6 w-full py-2.5 bg-[#0A1628] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors btn-press cursor-pointer"
            >
              Fermer la fiche
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
