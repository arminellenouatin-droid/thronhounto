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
} from "lucide-react";
import {
  SpiritualNode,
  ARBRE_MANTINKPON,
  NOEUD_PERE_DIRECT,
  NOEUD_FONDATEUR,
} from "@/lib/data";

interface GenealogyTreeProps {
  onSelectMember?: (node: SpiritualNode) => void;
}

export const GenealogyTree: React.FC<GenealogyTreeProps> = ({
  onSelectMember,
}) => {
  // Navigation dans l'arbre : nœud actuellement centré
  const [currentNode, setCurrentNode] = useState<SpiritualNode>(ARBRE_MANTINKPON);
  const [selectedChildDetail, setSelectedChildDetail] = useState<SpiritualNode | null>(null);
  const [showAncestorsView, setShowAncestorsView] = useState(false);

  // Monter vers le Père direct
  const handleGoToFather = () => {
    setCurrentNode(NOEUD_PERE_DIRECT);
  };

  // Monter vers le Grand-père / Fondateur
  const handleGoToFounder = () => {
    setCurrentNode(NOEUD_FONDATEUR);
  };

  // Redescendre vers l'utilisateur de base
  const handleResetToSelf = () => {
    setCurrentNode(ARBRE_MANTINKPON);
  };

  // Descendre sur un enfant spirituel (Hounvi de grade Hounnon+)
  const handleDrillDownToChild = (child: SpiritualNode) => {
    setCurrentNode({
      ...child,
      pereDirectNom: currentNode.nomComplet,
      grandPereNom: currentNode.pereDirectNom || "Lignée Mantinkpon ò",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* BANNIÈRE DE LA LIGNÉE SACRÉE & FIL D'ARIANE */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 sm:p-4 border border-thron-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest font-bold text-thron-blue">
              Arbre Généalogique Tactile
            </span>
          </div>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-thron-navy">
            Lignée Mantinkpon ò
          </h2>
        </div>

        {currentNode.id !== ARBRE_MANTINKPON.id && (
          <button
            onClick={handleResetToSelf}
            className="px-3 py-1.5 text-xs bg-thron-blue text-white rounded-full font-medium hover:bg-thron-navy transition-colors shadow-sm flex items-center gap-1"
          >
            Revenir à mon niveau
          </button>
        )}
      </div>

      {/* ============================================================== */}
      {/* 6.2 ÉCRAN LIGNÉE CONFORME : EN HAUT LES DEUX MINIATURES        */}
      {/* Le père direct à droite, le grand-père à gauche, au centre     */}
      {/* le nom de la lignée et le nombre de fidèles.                   */}
      {/* ============================================================== */}
      <div className="relative bg-gradient-to-r from-[#050F26] via-[#0A2558] to-[#050F26] text-white rounded-3xl p-4 sm:p-6 shadow-sacred border border-thron-gold/40 overflow-hidden">
        {/* Motifs sacrés en arrière-plan */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-thron-gold/10 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-blue-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4">
          {/* GAUCHE : LE GRAND-PÈRE DIRECT / FONDATEUR */}
          <button
            onClick={handleGoToFounder}
            className="flex flex-col items-center group transition-transform active:scale-95"
            title="Cliquez pour monter au fondateur"
          >
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-thron-gold p-0.5 overflow-hidden shadow-gold group-hover:border-amber-300 transition-colors">
                <img
                  src={currentNode.grandPerePhoto || NOEUD_FONDATEUR.photoUrl}
                  alt="Grand-père"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-thron-gold text-thron-navy rounded-full text-[10px] font-bold flex items-center justify-center shadow">
                <ChevronUp className="w-3.5 h-3.5" />
              </span>
            </div>
            <span className="mt-1.5 text-[10px] sm:text-xs font-semibold text-amber-200 group-hover:text-white transition-colors text-center line-clamp-1 max-w-[85px] sm:max-w-[110px]">
              {currentNode.grandPereNom || "Grand-Père"}
            </span>
            <span className="text-[9px] text-blue-200/70">Grand-Père</span>
          </button>

          {/* CENTRE : NOM DE LA LIGNÉE ET NOMBRE DE FIDÈLES */}
          <div className="flex-1 text-center px-1 sm:px-4">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-thron-gold/20 text-thron-gold border border-thron-gold/40 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
              Courant Thron kpéto déka alafia
            </span>
            <h3 className="font-serif text-base sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-thron-gold">
              Mantinkpon ò
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 mt-0.5 font-medium">
              <strong className="text-thron-gold font-bold">1 450</strong> fidèles enregistrés
            </p>
          </div>

          {/* DROITE : LE PÈRE DIRECT */}
          <button
            onClick={handleGoToFather}
            className="flex flex-col items-center group transition-transform active:scale-95"
            title="Cliquez pour monter au père direct"
          >
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-thron-gold p-0.5 overflow-hidden shadow-gold group-hover:border-amber-300 transition-colors">
                <img
                  src={currentNode.pereDirectPhoto || NOEUD_PERE_DIRECT.photoUrl}
                  alt="Père Direct"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -bottom-1 -left-1 w-5 h-5 bg-thron-gold text-thron-navy rounded-full text-[10px] font-bold flex items-center justify-center shadow">
                <ChevronUp className="w-3.5 h-3.5" />
              </span>
            </div>
            <span className="mt-1.5 text-[10px] sm:text-xs font-semibold text-amber-200 group-hover:text-white transition-colors text-center line-clamp-1 max-w-[85px] sm:max-w-[110px]">
              {currentNode.pereDirectNom || "Père Direct"}
            </span>
            <span className="text-[9px] text-blue-200/70">Père Direct</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* AU MILIEU EN GRAND : LA PHOTO DE LA PERSONNE CONNECTÉE         */}
      {/* avec son nom, prénom et grade sur la photo.                    */}
      {/* ============================================================== */}
      <div className="relative bg-white rounded-3xl p-5 sm:p-8 shadow-sacred border border-thron-border overflow-hidden">
        <div className="flex flex-col items-center text-center">
          {/* Cadre de photo majestueux en grand */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-thron-gold p-1 bg-gradient-to-b from-thron-gold via-thron-navy to-thron-blue">
            <img
              src={currentNode.photoUrl}
              alt={currentNode.nomComplet}
              className="w-full h-full object-cover rounded-2xl"
            />

            {/* Dégradé sombre pour lisibilité du texte sur la photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent rounded-2xl"></div>

            {/* TEXTE OBLIGATOIRE SUR LA PHOTO : NOM, PRÉNOM ET GRADE */}
            <div className="absolute bottom-3 left-3 right-3 text-white text-center">
              <span className="inline-block px-2.5 py-0.5 mb-1 text-[11px] font-extrabold uppercase tracking-wider rounded-full bg-thron-gold text-thron-navy shadow">
                {currentNode.grade}
              </span>
              <h4 className="font-serif font-bold text-base sm:text-lg leading-tight drop-shadow">
                {currentNode.prenom} {currentNode.nom}
              </h4>
              <p className="text-[10px] sm:text-xs text-amber-200/90 font-medium">
                {currentNode.titreSpirituel || "Tête de Hounto"}
              </p>
            </div>
          </div>

          {/* Localisation et Temple du dignitaire */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            {currentNode.temple && (
              <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-thron-blue" />
                {currentNode.temple}
              </span>
            )}
            {currentNode.localisation && (
              <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {currentNode.localisation}
              </span>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* EN DESSOUS : LES TROIS COMPTEURS SACRÉS CONFIRMÉS              */}
        {/* Femmes (Assi), Enfants bio (Vidjidji), Enfants spir (Hounvi)  */}
        {/* ============================================================== */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="text-center mb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Compteurs Sacrés de la Tête
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {/* 1. ASSI (Femmes / Épouses) */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50/50 rounded-2xl p-3 sm:p-4 text-center border border-rose-200/70 shadow-sm transition-transform hover:scale-102">
              <div className="w-8 h-8 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-1.5">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-rose-900">
                {currentNode.assiCount}
              </span>
              <span className="block text-xs font-bold text-rose-700 uppercase tracking-wider">
                Assi
              </span>
              <span className="text-[10px] text-slate-500">Épouses</span>
            </div>

            {/* 2. VIDJIDJI (Enfants Biologiques) */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-3 sm:p-4 text-center border border-amber-200/70 shadow-sm transition-transform hover:scale-102">
              <div className="w-8 h-8 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-1.5">
                <Baby className="w-4 h-4" />
              </div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-amber-900">
                {currentNode.vidjidjiCount}
              </span>
              <span className="block text-xs font-bold text-amber-700 uppercase tracking-wider">
                Vidjidji
              </span>
              <span className="text-[10px] text-slate-500">Enfants Bio</span>
            </div>

            {/* 3. HOUNVI (Enfants Spirituels / Baptisés) */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-3 sm:p-4 text-center border border-blue-200/70 shadow-sm transition-transform hover:scale-102">
              <div className="w-8 h-8 mx-auto rounded-full bg-blue-100 text-thron-blue flex items-center justify-center mb-1.5">
                <Users className="w-4 h-4" />
              </div>
              <span className="block text-2xl sm:text-3xl font-extrabold text-thron-blue">
                {currentNode.hounviCount}
              </span>
              <span className="block text-xs font-bold text-thron-blueLight uppercase tracking-wider">
                Hounvi
              </span>
              <span className="text-[10px] text-slate-500">Enfants Spirituels</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESCENDANCE / BRANCHES INFÉRIEURES : EXPLORATION TACTILE       */}
      {/* "En cliquant sur la photo d'une tête, on descend directement"  */}
      {/* ============================================================== */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-thron-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-serif font-bold text-base sm:text-lg text-thron-navy">
              Branches & Disciples (Hounvi)
            </h4>
            <p className="text-xs text-slate-500">
              Touchez un baptisé ou une tête pour explorer sa descendance spirituelle
            </p>
          </div>
          <span className="px-2.5 py-1 text-xs bg-slate-100 text-thron-navy font-bold rounded-full">
            {currentNode.children ? currentNode.children.length : 0} directs
          </span>
        </div>

        {currentNode.children && currentNode.children.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {currentNode.children.map((child) => {
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
                  className={`group relative flex flex-col items-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    isHead
                      ? "bg-amber-50/40 border-thron-gold/60 hover:bg-amber-50 hover:shadow-md"
                      : "bg-slate-50 border-slate-200 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {/* Photo miniature */}
                  <div className="relative mb-2">
                    <div
                      className={`w-14 h-14 rounded-full overflow-hidden border-2 ${
                        isHead ? "border-thron-gold shadow-sm" : "border-slate-300"
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
                        className="absolute -bottom-1 -right-1 w-5 h-5 bg-thron-blue text-thron-gold rounded-full text-[10px] font-bold flex items-center justify-center shadow"
                        title="Tête de hounto - touchez pour descendre"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Nom et grade */}
                  <span className="font-bold text-xs text-thron-navy line-clamp-1">
                    {child.prenom} {child.nom}
                  </span>
                  <span
                    className={`mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isHead
                        ? "bg-thron-gold/20 text-thron-dark"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {child.grade}
                  </span>

                  {/* Compteurs rapides si tête */}
                  {isHead && (
                    <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1.5 font-medium">
                      <span>{child.hounviCount} Hounvi</span>
                      <span>•</span>
                      <span className="text-thron-blue font-bold flex items-center">
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

      {/* POPUP DÉTAIL DU MEMBRE */}
      {selectedChildDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border border-thron-gold/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-thron-gold mb-3 shadow">
              <img
                src={selectedChildDetail.photoUrl}
                alt={selectedChildDetail.nomComplet}
                className="w-full h-full object-cover"
              />
            </div>
            <h5 className="font-serif font-bold text-lg text-thron-navy">
              {selectedChildDetail.nomComplet}
            </h5>
            <span className="inline-block mt-1 px-3 py-1 bg-thron-blue text-thron-gold rounded-full text-xs font-bold uppercase">
              {selectedChildDetail.grade}
            </span>
            <p className="mt-3 text-xs text-slate-600">
              Affiliation spirituelle : <strong className="text-thron-navy">Hounvi</strong> (enfant spirituel)
            </p>
            {selectedChildDetail.temple && (
              <p className="text-xs text-slate-500 mt-1">
                Rattaché à : {selectedChildDetail.temple}
              </p>
            )}

            <button
              onClick={() => setSelectedChildDetail(null)}
              className="mt-6 w-full py-2.5 bg-thron-navy text-white rounded-xl text-xs font-bold hover:bg-thron-blue transition-colors"
            >
              Fermer la fiche
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
