"use client";

import React, { useState } from "react";
import {
  X,
  Phone,
  Mail,
  UserCheck,
  CheckCircle2,
  MapPin,
  ShieldAlert,
  Sparkles,
  Users,
  Clock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import {
  COURANTS_OFFICIELS,
  GRADES_HOMMES,
  GRADES_FEMMES,
  LIGNEE_MANTINKPON_O,
} from "@/lib/data";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: any) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  // Étape du parcours d'inscription (1 à 6)
  const [step, setStep] = useState<number>(1);

  // État du formulaire
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("+229 ");
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");

  // Choix profil : visiteur, membre_lignee, hounto
  const [accountType, setAccountType] = useState<"visiteur" | "membre_lignee" | "hounto">("membre_lignee");

  // Si membre/hounto
  const [selectedCourant, setSelectedCourant] = useState(COURANTS_OFFICIELS[0].id);
  const [selectedLignee, setSelectedLignee] = useState(LIGNEE_MANTINKPON_O.id);
  const [selectedTete, setSelectedTete] = useState(LIGNEE_MANTINKPON_O.chefActuelNom);
  const [affiliation, setAffiliation] = useState<"Hounvi" | "Assi" | "Vidjidji">("Hounvi");
  const [selectedGrade, setSelectedGrade] = useState("Atinkindouvi");

  // Géolocalisation
  const [geoConsent, setGeoConsent] = useState(true);
  const [templeAddress, setTempleAddress] = useState("Temple Alafia, Cotonou / Calavi");
  const [coords, setCoords] = useState("6.3703° N, 2.3912° E (Bénin)");

  if (!isOpen) return null;

  const handleNext = () => {
    // Si visiteur choisi à l'étape 2, fin directe du parcours
    if (step === 2 && accountType === "visiteur") {
      setStep(6); // Écran de confirmation directe
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleFinish = () => {
    onSuccess({
      nom,
      prenom,
      sexe,
      phone,
      email,
      accountType,
      affiliation: accountType === "visiteur" ? "Visiteur" : affiliation,
      grade: accountType === "visiteur" ? "Visiteur" : selectedGrade,
      lignee: accountType === "visiteur" ? null : LIGNEE_MANTINKPON_O.nom,
      status: accountType === "visiteur" ? "actif" : "en_attente_maitre",
    });
    onClose();
  };

  const gradesList = sexe === "homme" ? GRADES_HOMMES : GRADES_FEMMES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-thron-gold/40 p-6 sm:p-8 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* BOUTON FERMER */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* INDICATEUR D'ÉTAPES */}
        <div className="flex items-center gap-1.5 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                step >= s ? "bg-thron-gold" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* ============================================================== */}
        {/* ÉTAPE 1 : IDENTITÉ & COORDONNÉES (Téléphone ou Email)           */}
        {/* ============================================================== */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-xs font-bold text-thron-gold uppercase tracking-widest">
                Étape 1 sur 5
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-thron-navy">
                Connexion & Inscription
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Rejoignez la communauté sacrée THRON HOUNTO
              </p>
            </div>

            {/* Onglets Téléphone / Email */}
            <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMethod("phone")}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  authMethod === "phone"
                    ? "bg-white text-thron-navy shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Phone className="w-4 h-4" /> Numéro de Téléphone
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod("email")}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  authMethod === "email"
                    ? "bg-white text-thron-navy shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Mail className="w-4 h-4" /> Adresse Email
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  placeholder="Ex: Ayikodji"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-thron-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="Ex: MONSIA"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-thron-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Sexe (détermine les grades de la hiérarchie) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sexe (définit la hiérarchie initiatique)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSexe("homme")}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    sexe === "homme"
                      ? "bg-thron-blue text-white border-thron-blue"
                      : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}
                >
                  Homme (Sounnouvi)
                </button>
                <button
                  type="button"
                  onClick={() => setSexe("femme")}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    sexe === "femme"
                      ? "bg-rose-700 text-white border-rose-700"
                      : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}
                >
                  Femme (Yonouvi)
                </button>
              </div>
            </div>

            {authMethod === "phone" ? (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Numéro de téléphone (Bénin / International)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+229 97 00 00 00"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-thron-gold focus:outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Adresse Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@domaine.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-thron-gold focus:outline-none"
                />
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={!prenom || !nom}
              className="w-full py-3 mt-2 bg-thron-navy hover:bg-thron-blue text-white font-bold rounded-xl text-xs shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              Continuer <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* ÉTAPE 2 : QUESTION OBLIGATOIRE DU PARCOURS (Section 5.1)       */}
        {/* « Souhaitez-vous vous inscrire comme visiteur, membre ou       */}
        {/* hounto ? »                                                     */}
        {/* ============================================================== */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-xs font-bold text-thron-gold uppercase tracking-widest">
                Étape 2 sur 5
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-thron-navy">
                Statut d'Inscription
              </h3>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                « Souhaitez-vous vous inscrire comme visiteur, membre de lignée ou hounto ? »
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Option 1 : Visiteur */}
              <div
                onClick={() => setAccountType("visiteur")}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  accountType === "visiteur"
                    ? "border-thron-gold bg-amber-50/50 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="w-5 h-5 rounded-full border-2 border-thron-gold flex items-center justify-center mt-0.5">
                  {accountType === "visiteur" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-thron-gold" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-thron-navy">Visiteur Ordinaire</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Accès direct à tout le contenu public, actualités, annuaire et marketplace. Pas d'intégration à l'arbre.
                  </p>
                </div>
              </div>

              {/* Option 2 : Membre de lignée */}
              <div
                onClick={() => setAccountType("membre_lignee")}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  accountType === "membre_lignee"
                    ? "border-thron-gold bg-amber-50/50 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="w-5 h-5 rounded-full border-2 border-thron-gold flex items-center justify-center mt-0.5">
                  {accountType === "membre_lignee" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-thron-gold" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-thron-navy">Membre d'une Lignée</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Vous appartenez à une lignée spirituelle. Intégration à l'arbre généalogique après validation de votre Maître.
                  </p>
                </div>
              </div>

              {/* Option 3 : Hounto (Communauté / Temple) */}
              <div
                onClick={() => setAccountType("hounto")}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  accountType === "hounto"
                    ? "border-thron-gold bg-amber-50/50 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="w-5 h-5 rounded-full border-2 border-thron-gold flex items-center justify-center mt-0.5">
                  {accountType === "hounto" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-thron-gold" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-thron-navy">Hounto (Assemblée de Temple)</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Responsable ou tête d'assemblée cultuelle (minimum Hounnon). Gestion de disciples et cotisations.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-thron-navy hover:bg-thron-blue text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                Continuer <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ÉTAPE 3 : CHOIX DU COURANT, LIGNÉE ET TÊTE DE GÉNÉALOGIE       */}
        {/* ============================================================== */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-xs font-bold text-thron-gold uppercase tracking-widest">
                Étape 3 sur 5
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-thron-navy">
                Rattachement Spirituel
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Choisissez votre Courant, Lignée et Tête de généalogie
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Courant Spirituel Thron
              </label>
              <select
                value={selectedCourant}
                onChange={(e) => setSelectedCourant(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-thron-gold bg-white"
              >
                {COURANTS_OFFICIELS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nom}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lignée sacrée de rattachement
              </label>
              <select
                value={selectedLignee}
                onChange={(e) => setSelectedLignee(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-thron-gold bg-white"
              >
                <option value={LIGNEE_MANTINKPON_O.id}>
                  {LIGNEE_MANTINKPON_O.nom} (Fondateur : {LIGNEE_MANTINKPON_O.fondateurNom})
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tête de généalogie dont vous dépendez
              </label>
              <input
                type="text"
                value={selectedTete}
                onChange={(e) => setSelectedTete(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-thron-gold bg-white"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                C'est ce Maître qui recevra votre notification et validera votre compte.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(2)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-thron-navy hover:bg-thron-blue text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                Continuer <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ÉTAPE 4 : AFFILIATION (Hounvi, Assi, Vidjidji) & GRADE         */}
        {/* ============================================================== */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-xs font-bold text-thron-gold uppercase tracking-widest">
                Étape 4 sur 5
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-thron-navy">
                Affiliation & Grade
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Indiquez votre nature d'affiliation dans l'arbre
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Type d'affiliation à la tête
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAffiliation("Hounvi")}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                    affiliation === "Hounvi"
                      ? "bg-thron-blue text-white border-thron-blue shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  <span className="block font-black">Hounvi</span>
                  <span className="text-[10px] font-normal opacity-80">Enfant spirituel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAffiliation("Assi")}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                    affiliation === "Assi"
                      ? "bg-rose-700 text-white border-rose-700 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  <span className="block font-black">Assi</span>
                  <span className="text-[10px] font-normal opacity-80">Femme / Épouse</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAffiliation("Vidjidji")}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                    affiliation === "Vidjidji"
                      ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  <span className="block font-black">Vidjidji</span>
                  <span className="text-[10px] font-normal opacity-80">Enfant biologique</span>
                </button>
              </div>
            </div>

            {/* Si Hounvi ou tête : Choix du Grade initiatique */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Grade ou Rôle joué dans la communauté
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-thron-gold bg-white"
              >
                {gradesList.map((g) => (
                  <option key={g.id} value={g.nom}>
                    {g.nom} {g.estTeteEligible ? "(Éligible Tête de Hounto)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(3)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-thron-navy hover:bg-thron-blue text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                Continuer <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ÉTAPE 5 : GÉOLOCALISATION & VALIDATION (Section 7)             */}
        {/* "Obligatoire à partir du grade de Hounnon"                     */}
        {/* ============================================================== */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-xs font-bold text-thron-gold uppercase tracking-widest">
                Étape 5 sur 5
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-thron-navy">
                Localisation du Temple
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Permet de localiser le temple lors des cérémonies et visites rituelles
              </p>
            </div>

            <div className="bg-amber-50 rounded-2xl p-4 border border-thron-gold/30">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <span className="font-bold text-thron-navy">
                    Obligation statutaire dès le grade Hounnon :
                  </span>{" "}
                  Pour les cérémonies etYesoufifo, votre assemblée doit être géolocalisée.
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Adresse ou Temple principal
              </label>
              <input
                type="text"
                value={templeAddress}
                onChange={(e) => setTempleAddress(e.target.value)}
                placeholder="Ex: Hounto Alafia, Quartier Zogbo, Cotonou"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-thron-gold bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Coordonnées GPS estimées
              </label>
              <input
                type="text"
                value={coords}
                readOnly
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
              <input
                type="checkbox"
                checked={geoConsent}
                onChange={(e) => setGeoConsent(e.target.checked)}
                className="rounded text-thron-blue focus:ring-thron-gold"
              />
              <span>J'autorise la localisation de mon temple pour la communauté Thron</span>
            </label>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(4)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                Finaliser l'inscription <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ÉTAPE 6 : CONFIRMATION & ATTENTE VALIDATION PAR LE MAÎTRE      */}
        {/* ============================================================== */}
        {step === 6 && (
          <div className="space-y-4 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-thron-gold mx-auto flex items-center justify-center shadow">
              {accountType === "visiteur" ? (
                <CheckCircle2 className="w-9 h-9 text-emerald-600" />
              ) : (
                <Clock className="w-9 h-9 text-amber-600 animate-pulse" />
              )}
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-thron-navy">
              {accountType === "visiteur"
                ? "Bienvenue dans THRON HOUNTO !"
                : "Demande Transmise au Maître Spirituel"}
            </h3>

            {accountType === "visiteur" ? (
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                Votre compte visiteur est immédiatement actif. Vous pouvez explorer les courants, les lignées, les actualités et la marketplace.
              </p>
            ) : (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2 text-left">
                <p>
                  <strong>Félicitations {prenom} {nom}</strong>, votre affiliation sous la tête{" "}
                  <strong className="text-thron-blue">{selectedTete}</strong> (Lignée Mantinkpon ò) a été enregistrée avec succès.
                </p>
                <p className="text-slate-500 text-[11px]">
                  Conformément aux règles de l'arbre généalogique (Section 5.1), votre Maître doit valider formellement votre rattachement avant que votre fiche n'apparaisse en ligne.
                </p>
              </div>
            )}

            <button
              onClick={handleFinish}
              className="w-full py-3 bg-thron-navy hover:bg-thron-blue text-white font-bold rounded-xl text-xs shadow-md transition-all"
            >
              Accéder à l'application
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
