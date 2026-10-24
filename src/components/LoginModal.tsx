"use client";

import React, { useState } from "react";
import {
  X,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { ThreeColasLogo } from "./ThreeColasLogo";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: any) => void;
  onSwitchToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onSwitchToRegister,
}) => {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("+229 97 00 11 22");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (loginMethod === "phone" && !phone.trim()) {
      setErrorMsg("Veuillez renseigner votre numéro de téléphone.");
      return;
    }
    if (loginMethod === "email" && !email.trim()) {
      setErrorMsg("Veuillez renseigner votre adresse email.");
      return;
    }
    if (!password) {
      setErrorMsg("Veuillez renseigner votre mot de passe.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      const inputVal = (loginMethod === "phone" ? phone : email).trim().toLowerCase();

      // Profils de test conformes au fichier "données de test.txt"
      let userProfile = {
        nom: "MONSIA",
        prenom: "Serge",
        titreSpirituel: "Togbé Mintoniu bo tozé",
        grade: "Togbegan daho",
        affiliation: "Maître de Lignée",
        lignee: "Mantinkpon ò",
        courant: "Thron kpeto deka alafia",
        temple: "Temple Alafia Abomey-Calavi",
        walletBalance: 450000,
        isMemberOfLignee: true,
        role: "lineage_admin",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
        email: "togbemintoniu@thronhounto.bj",
        telephone: "+2290197000101",
      };

      if (inputVal.includes("envolafrica") || inputVal.includes("95153177") || inputVal.includes("davakan") || inputVal.includes("quentin")) {
        userProfile = {
          nom: "DAVAKAN",
          prenom: "Quentin",
          titreSpirituel: "Super-Admin Suprême",
          grade: "Super-Admin SaaS",
          affiliation: "Direction Générale SaaS",
          lignee: "Toutes Lignées (42 Sièges)",
          courant: "Courants Thron Unifiés",
          temple: "Console Centrale",
          walletBalance: 3020000,
          isMemberOfLignee: true,
          role: "master_admin",
          photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
          email: "envolafrica@gmail.com",
          telephone: "+2290195153177",
        };
      } else if (inputVal.includes("dossou") || inputVal.includes("mahugnon") || inputVal.includes("96554433")) {
        userProfile = {
          nom: "DOSSOU",
          prenom: "Mahugnon",
          titreSpirituel: "Dignitaire Vendeur",
          grade: "Hounnon",
          affiliation: "Comptoir Sacré Alafia",
          lignee: "Mantinkpon ò",
          courant: "Thron kpeto deka alafia",
          temple: "Temple Alafia Abomey-Calavi",
          walletBalance: 680000,
          isMemberOfLignee: true,
          role: "seller",
          photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
          email: "hounnon.dossou@thronhounto.bj",
          telephone: "+2290196554433",
        };
      } else if (inputVal.includes("kouassi") || inputVal.includes("jean") || inputVal.includes("94112233")) {
        userProfile = {
          nom: "KOUASSI",
          prenom: "Jean",
          titreSpirituel: "Visiteur / Curieux",
          grade: "Agbilinon",
          affiliation: "Non-affilié (Visiteur)",
          lignee: "Aucune (Découverte)",
          courant: "Découverte des Trônes",
          temple: "Aucun",
          walletBalance: 0,
          isMemberOfLignee: false,
          role: "visitor",
          photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
          email: "jean.kouassi@test.com",
          telephone: "+2290194112233",
        };
      } else if (inputVal.includes("kpodekon") || inputVal.includes("bienvenu") || inputVal.includes("95223344")) {
        userProfile = {
          nom: "KPODÉKON",
          prenom: "Bienvenu",
          titreSpirituel: "Fidèle Initié",
          grade: "Hounvi",
          affiliation: "Atinkindouvi",
          lignee: "Mantinkpon ò",
          courant: "Thron kpeto deka alafia",
          temple: "Temple Alafia Abomey-Calavi",
          walletBalance: 35000,
          isMemberOfLignee: true,
          role: "member",
          photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
          email: "bienvenu.kpodekon@thronhounto.bj",
          telephone: "+2290195223344",
        };
      }

      onSuccess(userProfile);
      onClose();
    }, 600);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-thron-gold/40 p-6 sm:p-8 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* BOUTON FERMER */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LOGO & EN-TÊTE */}
        <div className="text-center mb-6">
          <div className="inline-flex justify-center mb-2">
            <ThreeColasLogo size={46} showText={false} />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-thron-navy">
            {forgotPasswordStep ? "Récupération de compte" : "Connexion à THRON HOUNTO"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {forgotPasswordStep
              ? "Recevez un code de réinitialisation sécurisé"
              : "Accédez à votre espace spirituel et vos privilèges"}
          </p>
        </div>

        {/* MESSAGE D'ERREUR */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!forgotPasswordStep ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* CHOIX DE LA MÉTHODE DE CONNEXION */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setLoginMethod("phone")}
                className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  loginMethod === "phone"
                    ? "bg-white text-thron-navy shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Téléphone</span>
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("email")}
                className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  loginMethod === "email"
                    ? "bg-white text-thron-navy shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>
            </div>

            {/* IDENTIFIANT (TÉLÉPHONE OU EMAIL) */}
            {loginMethod === "phone" ? (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Numéro de téléphone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+229 97 00 00 00"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-thron-blue/30 focus:border-thron-blue"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@thronhounto.org"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-thron-blue/30 focus:border-thron-blue"
                    required
                  />
                </div>
              </div>
            )}

            {/* MOT DE PASSE AVEC ICÔNE ŒIL */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Mot de passe
                </label>
                <button
                  type="button"
                  onClick={() => setForgotPasswordStep(true)}
                  className="text-[11px] text-thron-blue hover:text-thron-navy font-semibold hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-thron-blue/30 focus:border-thron-blue"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* BOUTON SE CONNECTER */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-thron-blue to-thron-navy hover:from-thron-navy hover:to-thron-dark text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span>Connexion en cours...</span>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-4 h-4 text-thron-gold" />
                </>
              )}
            </button>

            {/* BASCULE VERS INSCRIPTION */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-600">
                Vous n'avez pas encore de compte ?{" "}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSwitchToRegister();
                  }}
                  className="font-bold text-thron-blue hover:text-thron-navy underline"
                >
                  S'inscrire
                </button>
              </p>
            </div>
          </form>
        ) : (
          /* FORMULAIRE MOT DE PASSE OUBLIÉ */
          <div className="space-y-4">
            {!forgotSent ? (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-slate-600">
                  Renseignez votre email ou numéro de téléphone pour recevoir le lien de réinitialisation.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email ou Téléphone
                  </label>
                  <input
                    type="text"
                    placeholder="+229 97 00 00 00 ou email@thronhounto.org"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-thron-blue/30 focus:border-thron-blue"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-thron-navy hover:bg-thron-blue text-white font-bold text-xs shadow transition-colors"
                >
                  Envoyer les instructions
                </button>
                <button
                  type="button"
                  onClick={() => setForgotPasswordStep(false)}
                  className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Retour à la connexion
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-thron-navy">Instructions envoyées</h4>
                <p className="text-xs text-slate-600">
                  Un code de réinitialisation vous a été envoyé. Veuillez vérifier vos messages SMS ou vos emails.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotPasswordStep(false);
                    setForgotSent(false);
                  }}
                  className="w-full py-2 px-4 rounded-xl bg-thron-navy text-white font-bold text-xs shadow hover:bg-thron-blue transition-colors mt-2"
                >
                  Revenir à la connexion
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
