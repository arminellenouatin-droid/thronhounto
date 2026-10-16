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
  Crown,
  HeartHandshake,
  Compass,
} from "lucide-react";
import {
  COURANTS_OFFICIELS,
  GRADES_HOMMES,
  GRADES_FEMMES,
  LIGNEE_MANTINKPON_O,
} from "@/lib/data";
import { ThreeColasLogo } from "./ThreeColasLogo";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: any) => void;
  onSwitchToLogin?: () => void;
}

export type RegistrationType = "agbilinon" | "hounvi" | "chef_lignee";

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onSwitchToLogin,
}) => {
  // Profil choisi : null (écran de choix), "agbilinon", "hounvi", "chef_lignee"
  const [profileType, setProfileType] = useState<RegistrationType | null>(null);

  // Étape interne (si plusieurs étapes pour Hounvi ou Chef)
  const [step, setStep] = useState<number>(1);

  // Champs d'identification de base
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+229 ");
  const [password, setPassword] = useState("");

  // Pour Hounvi (Membre de lignée)
  const [selectedCourant, setSelectedCourant] = useState(COURANTS_OFFICIELS[0].id);
  const [selectedLignee, setSelectedLignee] = useState(LIGNEE_MANTINKPON_O.nom);
  const [selectedTete, setSelectedTete] = useState(LIGNEE_MANTINKPON_O.chefActuelNom);
  const [affiliation, setAffiliation] = useState<"Hounvi" | "Assi" | "Vidjidji">("Hounvi");
  const [selectedGrade, setSelectedGrade] = useState("Atinkindouvi");
  const [roleCommunaute, setRoleCommunaute] = useState("");
  const [positionPersonnelle, setPositionPersonnelle] = useState("Membre régulier du temple Alafia");

  // Géolocalisation
  const [geoConsent, setGeoConsent] = useState(true);
  const [templeAddress, setTempleAddress] = useState("Temple Alafia, Cotonou / Calavi");
  const [coords, setCoords] = useState("6.3703° N, 2.3912° E (Bénin)");

  // Pour Chef de Lignée
  const [chefStatut, setChefStatut] = useState<"fondateur" | "heritier">("heritier");
  const [ancetreFondateur, setAncetreFondateur] = useState("Feu Mantinkpon ò Adjikanmahoutokounon MONSIA");
  const [nomLigneeCreee, setNomLigneeCreee] = useState("");
  const [nomSiegeAncestral, setNomSiegeAncestral] = useState("");
  const [nomTemplePrincipal, setNomTemplePrincipal] = useState("");

  // Écran de fin
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const resetAll = () => {
    setProfileType(null);
    setStep(1);
    setIsCompleted(false);
  };

  const handleFinishAgbilinon = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      nom,
      prenom,
      sexe,
      email,
      phone,
      accountType: "visiteur",
      titre: "Agbilinon",
      grade: "Non Initié",
      affiliation: "Agbilinon",
      lignee: null,
      status: "actif",
    });
    onClose();
  };

  const handleFinishHounvi = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompleted(true);
  };

  const handleFinishChef = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompleted(true);
  };

  const finalizeRegistration = () => {
    onSuccess({
      nom,
      prenom,
      sexe,
      email,
      phone,
      accountType: profileType === "chef_lignee" ? "chef_lignee" : "membre_lignee",
      titre: profileType === "chef_lignee" ? "Chef de Lignée" : affiliation,
      grade: profileType === "chef_lignee" ? "Togbegan daho" : (affiliation === "Hounvi" ? selectedGrade : affiliation),
      affiliation: profileType === "chef_lignee" ? "Tete" : affiliation,
      lignee: profileType === "chef_lignee" ? nomLigneeCreee || "Nouvelle Lignée" : selectedLignee,
      status: profileType === "chef_lignee" ? "actif" : "en_attente_maitre",
    });
    onClose();
    resetAll();
  };

  const gradesList = sexe === "homme" ? GRADES_HOMMES : GRADES_FEMMES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-thron-gold/40 p-6 sm:p-8 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* BOUTON FERMER */}
        <button
          onClick={() => {
            onClose();
            resetAll();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LOGO */}
        <div className="text-center mb-4">
          <div className="inline-flex justify-center mb-1">
            <ThreeColasLogo size={42} showText={false} />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-black text-thron-navy">
            Inscription à THRON HOUNTO
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Rejoignez la communauté mondiale sacrée des Courants, Lignées & Temples
          </p>
        </div>

        {/* ============================================================== */}
        {/* ÉCRAN 0 : SÉLECTION DES 3 POSSIBILITÉS D'INSCRIPTION            */}
        {/* ============================================================== */}
        {profileType === null && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 text-center font-medium">
              Veuillez choisir votre situation d'inscription dans la tradition Thron :
            </p>

            <div className="grid gap-3">
              {/* OPTION 1 : AGBILINON */}
              <button
                type="button"
                onClick={() => setProfileType("agbilinon")}
                className="p-4 rounded-2xl border-2 border-slate-200 hover:border-thron-blue bg-white hover:bg-blue-50/50 text-left transition-all group flex items-start gap-4 shadow-sm"
              >
                <div className="w-11 h-11 rounded-2xl bg-blue-100 text-thron-blue flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-thron-navy group-hover:text-thron-blue">
                      S'inscrire comme Non Initié (« Agbilinon »)
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      Visiteur
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Processus simple et direct. Accédez à toutes les publications et cérémonies publiques. Un compte <strong>Agbilinon</strong> peut devenir <strong>Hounvi</strong> après son initiation.
                  </p>
                </div>
              </button>

              {/* OPTION 2 : HOUNVI */}
              <button
                type="button"
                onClick={() => setProfileType("hounvi")}
                className="p-4 rounded-2xl border-2 border-slate-200 hover:border-thron-gold bg-white hover:bg-amber-50/40 text-left transition-all group flex items-start gap-4 shadow-sm"
              >
                <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-thron-navy group-hover:text-amber-800">
                      S'inscrire en tant que « Hounvi » (Initié / Membre)
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Affiliation
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Rattachez-vous à votre lignée ou tête de branche (Hounvi, Assi ou Vidjidji). Votre Maître spirituel validera votre demande pour activer tous vos droits spirituels.
                  </p>
                </div>
              </button>

              {/* OPTION 3 : CHEF DE LIGNÉE */}
              <button
                type="button"
                onClick={() => setProfileType("chef_lignee")}
                className="p-4 rounded-2xl border-2 border-slate-200 hover:border-purple-600 bg-white hover:bg-purple-50/40 text-left transition-all group flex items-start gap-4 shadow-sm"
              >
                <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Crown className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-thron-navy group-hover:text-purple-700">
                      S'inscrire comme Chef de Lignée (Fondateur / Héritier)
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                      Trône & Siège
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Créez votre propre lignée sur le SaaS, gérez votre arbre généalogique ascendant et descendant, et administrez vos temples rattachés.
                  </p>
                </div>
              </button>
            </div>

            {/* BASCULE VERS CONNEXION */}
            {onSwitchToLogin && (
              <div className="pt-4 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-600">
                  Vous avez déjà un compte ?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSwitchToLogin();
                    }}
                    className="font-bold text-thron-blue hover:text-thron-navy underline"
                  >
                    Se connecter
                  </button>
                </p>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* PARCOURS 1 : AGBILINON (NON INITIÉ / VISITEUR)                 */}
        {/* ============================================================== */}
        {profileType === "agbilinon" && (
          <form onSubmit={handleFinishAgbilinon} className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setProfileType(null)}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Retour
              </button>
              <span className="text-xs font-bold text-thron-blue bg-blue-50 px-2.5 py-0.5 rounded-full">
                Compte Agbilinon (Visiteur)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nom de famille
                </label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex: DOSSOU"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-thron-blue/30"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Prénom(s)
                </label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Ex: Michel"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-thron-blue/30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sexe</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSexe("homme")}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    sexe === "homme"
                      ? "border-thron-blue bg-blue-50 text-thron-blue"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  Homme
                </button>
                <button
                  type="button"
                  onClick={() => setSexe("femme")}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    sexe === "femme"
                      ? "border-thron-blue bg-blue-50 text-thron-blue"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  Femme
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-thron-blue/30"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+229 97 00 00 00"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-thron-blue/30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Au moins 8 caractères"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-thron-blue/30"
                required
              />
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800">
              💡 <strong>Note communautaire :</strong> Un compte Agbilinon vous permet de visiter le site et voir tout ce qui est public. Vous pourrez devenir Hounvi après rattachement à un Hounto.
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-thron-blue to-thron-navy text-white font-bold text-xs shadow hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Créer son compte Agbilinon</span>
              <ArrowRight className="w-4 h-4 text-thron-gold" />
            </button>
          </form>
        )}

        {/* ============================================================== */}
        {/* PARCOURS 2 : HOUNVI (MEMBRE DE LIGNÉE / INITIÉ)                */}
        {/* ============================================================== */}
        {profileType === "hounvi" && !isCompleted && (
          <form onSubmit={handleFinishHounvi} className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setProfileType(null)}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Retour
              </button>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full">
                Inscription Hounvi / Membre
              </span>
            </div>

            {/* Étape 1 : Identité */}
            {step === 1 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Nom de famille"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Prénom</label>
                    <input
                      type="text"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Prénom"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSexe("homme")}
                    className={`py-2 text-xs font-bold rounded-xl border ${
                      sexe === "homme" ? "border-amber-600 bg-amber-50 text-amber-800" : "border-slate-200"
                    }`}
                  >
                    Homme
                  </button>
                  <button
                    type="button"
                    onClick={() => setSexe("femme")}
                    className={`py-2 text-xs font-bold rounded-xl border ${
                      sexe === "femme" ? "border-amber-600 bg-amber-50 text-amber-800" : "border-slate-200"
                    }`}
                  >
                    Femme
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!nom || !prenom}
                  onClick={() => setStep(2)}
                  className="w-full py-2.5 bg-thron-navy text-white rounded-xl text-xs font-bold hover:bg-thron-blue transition-colors flex items-center justify-center gap-1"
                >
                  Suivant : Rattachement spirituel <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Étape 2 : Rattachement, Tête et Affiliation */}
            {step === 2 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Courant spirituel de Thron
                  </label>
                  <select
                    value={selectedCourant}
                    onChange={(e) => setSelectedCourant(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
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
                    Lignée & Tête de branche (qui coiffe la tête)
                  </label>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <p className="text-xs font-bold text-thron-navy">{selectedLignee}</p>
                    <p className="text-[11px] text-slate-500">
                      Maître spirituel : <strong>{selectedTete}</strong>
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Affiliation sacrée dans la généalogie
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Hounvi", "Assi", "Vidjidji"] as const).map((aff) => (
                      <button
                        key={aff}
                        type="button"
                        onClick={() => setAffiliation(aff)}
                        className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                          affiliation === aff
                            ? "border-amber-600 bg-amber-50 text-amber-900"
                            : "border-slate-200 text-slate-600"
                        }`}
                      >
                        {aff}
                      </button>
                    ))}
                  </div>
                </div>

                {affiliation === "Hounvi" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Grade ou rôle communautaire
                    </label>
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    >
                      {gradesList.map((g) => (
                        <option key={g.id} value={g.nom}>
                          {g.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Position personnelle / Rôle dans la communauté
                  </label>
                  <input
                    type="text"
                    value={positionPersonnelle}
                    onChange={(e) => setPositionPersonnelle(e.target.value)}
                    placeholder="Ex: Trésorier du temple, Hounvi de prière..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                {/* Consentement géolocalisation */}
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-[11px] text-slate-600">
                    <p className="font-semibold">Géolocalisation du Hounto / Temple</p>
                    <p className="text-slate-500">{coords} — {templeAddress}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                  >
                    Précédent
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-thron-gold text-thron-navy font-black text-xs shadow hover:opacity-95"
                  >
                    Envoyer ma demande d'affiliation
                  </button>
                </div>
              </div>
            )}
          </form>
        )}

        {/* ============================================================== */}
        {/* PARCOURS 3 : CHEF DE LIGNÉE                                    */}
        {/* ============================================================== */}
        {profileType === "chef_lignee" && !isCompleted && (
          <form onSubmit={handleFinishChef} className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setProfileType(null)}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Retour
              </button>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                Création de Lignée (Dignitaire)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nom du Dignitaire</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex: MONSIA"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Prénom spirituel</label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Ex: Mintoniu bo tozé"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Statut sur le siège</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setChefStatut("heritier")}
                  className={`py-2 text-xs font-bold rounded-xl border ${
                    chefStatut === "heritier" ? "border-purple-600 bg-purple-50 text-purple-800" : "border-slate-200"
                  }`}
                >
                  Héritier du Trône
                </button>
                <button
                  type="button"
                  onClick={() => setChefStatut("fondateur")}
                  className={`py-2 text-xs font-bold rounded-xl border ${
                    chefStatut === "fondateur" ? "border-purple-600 bg-purple-50 text-purple-800" : "border-slate-200"
                  }`}
                >
                  Fondateur de la lignée
                </button>
              </div>
            </div>

            {chefStatut === "heritier" && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fondateur historique (Généalogie au-dessus de vous)
                </label>
                <input
                  type="text"
                  value={ancetreFondateur}
                  onChange={(e) => setAncetreFondateur(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nom de la Lignée</label>
                <input
                  type="text"
                  value={nomLigneeCreee}
                  onChange={(e) => setNomLigneeCreee(e.target.value)}
                  placeholder="Ex: Lignée Dako-Zoun"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Siège ancestral</label>
                <input
                  type="text"
                  value={nomSiegeAncestral}
                  onChange={(e) => setNomSiegeAncestral(e.target.value)}
                  placeholder="Ex: Hounto Daho d'Abomey"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone personnel</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email officiel</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
            >
              <span>Enregistrer et créer la Lignée</span>
              <Crown className="w-4 h-4 text-amber-300" />
            </button>
          </form>
        )}

        {/* ============================================================== */}
        {/* ÉCRAN DE CONFIRMATION / ATTENTE VALIDATION MAÎTRE              */}
        {/* ============================================================== */}
        {isCompleted && (
          <div className="text-center py-4 space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-thron-gold flex items-center justify-center mx-auto text-amber-700 shadow-sacred">
              <Clock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-serif font-black text-lg text-thron-navy">
                Inscription enregistrée avec succès !
              </h4>
              <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                Votre demande d'affiliation sous la tête de branche{" "}
                <strong className="text-thron-navy">{selectedTete}</strong> (
                {selectedLignee}) a été transmise.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/70 border border-amber-300 rounded-2xl text-[11px] text-amber-900 text-left space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-amber-950">
                <ShieldAlert className="w-4 h-4 text-amber-700" /> Validation par le Maître spirituel :
              </p>
              <p className="text-slate-600">
                Conformément aux règles du Thron, vous attendrez la validation qui va venir de votre Maître (celui qui coiffe la tête sous laquelle vous vous trouvez). Dès validation, vous pourrez vous connecter librement.
              </p>
            </div>

            <button
              type="button"
              onClick={finalizeRegistration}
              className="w-full py-3 px-4 rounded-xl bg-thron-navy hover:bg-thron-blue text-white font-bold text-xs shadow transition-colors"
            >
              Accéder à la démonstration de l'espace
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
