"use client";

import React, { useState } from "react";
import {
  Crown,
  Users,
  Coins,
  CreditCard,
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ShoppingBag,
  Package,
  Sparkles,
  ShieldCheck,
  Bell,
  Share2
} from "lucide-react";

// ============================================================================
// 1. DASHBOARD ADMINISTRATEUR MASTER DU SAAS (QUENTIN DAVAKAN)
// ============================================================================
interface MasterAdminDashboardProps {
  onNavigateToTab?: (tab: string) => void;
}

export const MasterAdminDashboard: React.FC<MasterAdminDashboardProps> = () => {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "commissions" | "lineages" | "moderation">("overview");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* En-tête Super-Admin */}
      <div className="bg-gradient-to-r from-slate-900 via-thron-navy to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sacred border border-thron-gold/40 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-thron-gold/10 blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <Crown className="w-3.5 h-3.5 text-thron-gold" />
              SUPER-ADMINISTRATEUR MASTER DU SAAS
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-thron-gold">
              Console Suprême • Quentin DAVAKAN
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Supervision globale des 3 Courants Sacrés, 42 Lignées actives, marketplace, tontines et commissions de la plateforme.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-right min-w-[200px]">
            <span className="text-[10px] text-amber-200 uppercase tracking-widest font-bold block">
              Revenus Commissions SaaS
            </span>
            <span className="text-2xl font-black text-white block mt-0.5">
              3 020 000 <span className="text-xs text-thron-gold font-normal">F CFA</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center justify-end gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +18.4% ce mois
            </span>
          </div>
        </div>

        {/* Sous-onglets Admin */}
        <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab("overview")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeSubTab === "overview" ? "bg-thron-gold text-thron-navy shadow" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            Vue d'Ensemble
          </button>
          <button
            onClick={() => setActiveSubTab("commissions")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeSubTab === "commissions" ? "bg-thron-gold text-thron-navy shadow" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            Commissions & Finances (8% & 25%)
          </button>
          <button
            onClick={() => setActiveSubTab("lineages")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeSubTab === "lineages" ? "bg-thron-gold text-thron-navy shadow" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            Lignées & Temples (42)
          </button>
          <button
            onClick={() => setActiveSubTab("moderation")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeSubTab === "moderation" ? "bg-thron-gold text-thron-navy shadow" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            Sécurité & Gouvernance
          </button>
        </div>
      </div>

      {/* 1. OVERVIEW */}
      {activeSubTab === "overview" && (
        <div className="space-y-6">
          {/* Métriques Clés */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-thron-border shadow-sm">
              <span className="text-xs text-slate-500 font-medium block">Fidèles Inscrits</span>
              <span className="text-2xl sm:text-3xl font-black text-thron-navy block mt-1">148 520</span>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">Objectif 100k+ atteint</span>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-thron-border shadow-sm">
              <span className="text-xs text-slate-500 font-medium block">Hounnons & Hounnongan</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-700 block mt-1">2 152</span>
              <span className="text-[11px] text-slate-500 mt-1 inline-block">1 840 Hounnons • 312 Chefs</span>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-thron-border shadow-sm">
              <span className="text-xs text-slate-500 font-medium block">Courants & Lignées</span>
              <span className="text-2xl sm:text-3xl font-black text-thron-blue block mt-1">3 / 42</span>
              <span className="text-[11px] text-slate-500 mt-1 inline-block">380 Temples rattachés</span>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-thron-border shadow-sm">
              <span className="text-xs text-slate-500 font-medium block">Abonnements SaaS Lignées</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 block mt-1">38 / 42</span>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">90.5% Actifs</span>
            </div>
          </div>

          {/* Les 3 Courants Sacrés */}
          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-thron-navy">Les 3 Courants Sacrés Thron</h3>
                <p className="text-xs text-slate-500">Architecture théologique officielle de la plateforme</p>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Trônes Authentifiés
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">Courant 1</span>
                <h4 className="font-serif font-bold text-base text-thron-navy">Thron kpeto deka alafia</h4>
                <p className="text-slate-600">Courant originel de paix, tolérance et justice spirituelle. Siège principal : Lignée Mantinkpon ò.</p>
                <div className="pt-2 border-t border-amber-200/60 flex justify-between text-slate-500 font-medium">
                  <span>26 Lignées</span>
                  <strong className="text-thron-navy">98 400 Fidèles</strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <span className="text-[10px] font-bold uppercase text-blue-800 bg-blue-200/80 px-2 py-0.5 rounded-full">Courant 2</span>
                <h4 className="font-serif font-bold text-base text-thron-navy">Thron Sissè Dékpê</h4>
                <p className="text-slate-600">Branche de purification et de transmission doctrinale des chants et invocations Zindo.</p>
                <div className="pt-2 border-t border-blue-200/60 flex justify-between text-slate-500 font-medium">
                  <span>10 Lignées</span>
                  <strong className="text-thron-navy">34 200 Fidèles</strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
                <span className="text-[10px] font-bold uppercase text-purple-800 bg-purple-200/80 px-2 py-0.5 rounded-full">Courant 3</span>
                <h4 className="font-serif font-bold text-base text-thron-navy">Thron Gbémin</h4>
                <p className="text-slate-600">Courant cultuel des traditions et rites initiatiques de protection ancestrale.</p>
                <div className="pt-2 border-t border-purple-200/60 flex justify-between text-slate-500 font-medium">
                  <span>6 Lignées</span>
                  <strong className="text-thron-navy">15 920 Fidèles</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. COMMISSIONS & FINANCES */}
      {activeSubTab === "commissions" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-thron-border shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-semibold">Commission Marketplace (8%)</span>
              <span className="text-2xl font-black text-thron-navy block">1 420 000 F CFA</span>
              <p className="text-[11px] text-slate-500">Prélevée automatiquement sur 17 750 000 F CFA de ventes d'articles sacrés.</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-thron-border shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-semibold">Commission Tontines & Cotisations (8%)</span>
              <span className="text-2xl font-black text-emerald-700 block">960 000 F CFA</span>
              <p className="text-[11px] text-slate-500">Collectée lors de la redistribution des 12 000 000 F CFA d'épargne solidaire.</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-thron-border shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-semibold">Commissions d'Affiliation (25%)</span>
              <span className="text-2xl font-black text-amber-700 block">640 000 F CFA</span>
              <p className="text-[11px] text-slate-500">Distribuées aux parrains et dignitaires recruteurs d'abonnements.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm">
            <h4 className="font-serif font-bold text-base text-thron-navy mb-4">Grand Livre Financier du SaaS</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b">
                  <tr>
                    <th className="py-3 px-4">ID Transaction</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Entité</th>
                    <th className="py-3 px-4">Montant Brut</th>
                    <th className="py-3 px-4">Commission SaaS</th>
                    <th className="py-3 px-4">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-mono text-[11px]">TX-98402</td>
                    <td className="py-3 px-4 font-bold text-thron-navy">Vente Drap Sacré Alafia</td>
                    <td className="py-3 px-4">Hounnon Mahugnon</td>
                    <td className="py-3 px-4">50 000 F CFA</td>
                    <td className="py-3 px-4 font-bold text-emerald-600">+4 000 F CFA (8%)</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Encaissé</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-[11px]">TX-98399</td>
                    <td className="py-3 px-4 font-bold text-thron-navy">Cycle Tontine Alafia</td>
                    <td className="py-3 px-4">Lignée Mantinkpon ò</td>
                    <td className="py-3 px-4">300 000 F CFA</td>
                    <td className="py-3 px-4 font-bold text-emerald-600">+24 000 F CFA (8%)</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Encaissé</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-[11px]">TX-98370</td>
                    <td className="py-3 px-4 font-bold text-thron-navy">Abonnement Annuel Assiata</td>
                    <td className="py-3 px-4">Temple Calavi</td>
                    <td className="py-3 px-4">100 000 F CFA</td>
                    <td className="py-3 px-4 font-bold text-emerald-600">+100 000 F CFA (100%)</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Actif</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. LIGNÉES & TEMPLES */}
      {activeSubTab === "lineages" && (
        <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-bold text-base text-thron-navy">Liste des 42 Lignées Déclarées</h4>
            <span className="text-xs text-slate-500 font-semibold">38 abonnées, 4 en période d'essai</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded-full text-[10px] font-extrabold uppercase">Siège Actif #01</span>
                <h5 className="font-serif font-bold text-base text-thron-navy mt-1">Lignée Mantinkpon ò</h5>
                <p className="text-slate-600 text-[11px]">Héritier : Togbé Mintoniu bo tozé (MONSIA Serge) • Courant : Thron kpeto deka alafia</p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">1 450 fidèles • 12 temples affiliés</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-xs">Formule Assiata</span>
                <span className="text-slate-400 text-xs">Valide jusqu'au 31/12/2026</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 bg-slate-200 text-slate-700 rounded-full text-[10px] font-extrabold uppercase">Siège #02</span>
                <h5 className="font-serif font-bold text-base text-thron-navy mt-1">Lignée Kpodékon Daho</h5>
                <p className="text-slate-600 text-[11px]">Héritier : Togbé Kpodékon Mawulé • Courant : Thron Sissè Dékpê</p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">890 fidèles • 6 temples affiliés</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-xs">Formule Togoundaho</span>
                <span className="text-slate-400 text-xs">Valide jusqu'au 15/10/2026</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SÉCURITÉ & MODÉRATION */}
      {activeSubTab === "moderation" && (
        <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
          <h4 className="font-serif font-bold text-base text-thron-navy">Politique de Modération & Tontines Bloquées</h4>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <strong>Règle Inviolable (Consigne Document NOUVELLS CORRECTIONS) :</strong>
              <p>
                « Une lignée ou un temple qui lance une tontine qui finit avec des plaintes des participants de ladite tontine se voit bloquée et ne pourra plus lancer de tontine sur l'application. »
              </p>
              <span className="text-[11px] text-slate-600 block mt-1">
                Statut actuel : 0 lignée bloquée. Le système bloque automatiquement l'accès au formulaire de création de tontine dès réception d'un litige non résolu.
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs space-y-2">
            <h5 className="font-bold text-thron-navy flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-thron-blue" />
              Paramètres de Sécurité Actifs
            </h5>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
              <li>Isolation stricte par lignée et temple (RLS et scoping forcé).</li>
              <li>Journal immuable à double entrée pour toutes les transactions Wallet.</li>
              <li>Signature HMAC et idempotence stricte des webhooks de paiement.</li>
              <li>Séquestre (Escrow) sur la marketplace jusqu'à confirmation de livraison.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};


// ============================================================================
// 2. DASHBOARD ADMINISTRATEUR DE LIGNÉE (TOGBÉ MINTONIU BO TOZÉ)
// ============================================================================
interface LineageAdminDashboardProps {
  onNavigateToTree?: () => void;
  onNavigateToTogoun?: () => void;
}

export const LineageAdminDashboard: React.FC<LineageAdminDashboardProps> = ({
  onNavigateToTree,
  onNavigateToTogoun,
}) => {
  const [announcementText, setAnnouncementText] = useState("");
  const [announcementSent, setAnnouncementSent] = useState(false);

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    setAnnouncementSent(true);
    setTimeout(() => {
      setAnnouncementSent(false);
      setAnnouncementText("");
      if (onNavigateToTogoun) onNavigateToTogoun();
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* En-tête Chef de Lignée */}
      <div className="bg-gradient-to-r from-amber-900 via-thron-navy to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-sacred border border-thron-gold/50 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-thron-gold/20 text-thron-gold border border-thron-gold/40 text-xs font-bold">
              <Crown className="w-3.5 h-3.5" />
              MAÎTRE DE LIGNÉE • PLUS GRANDE TÊTE
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-amber-100">
              Togbé Mintoniu bo tozé (MONSIA Serge)
            </h2>
            <p className="text-xs text-amber-200/80 max-w-xl">
              Togbegan daho • Coiffant le trône de la Lignée Mantinkpon ò (Courant Thron kpeto deka alafia).
            </p>
          </div>

          <button
            onClick={onNavigateToTree}
            className="px-5 py-3 rounded-2xl bg-thron-gold text-thron-navy font-bold text-xs hover:bg-amber-300 transition-all shadow-md flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Users className="w-4 h-4" /> Consulter mon Arbre Tactile
          </button>
        </div>
      </div>

      {/* Statistiques de la Lignée */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Fidèles de la Lignée</span>
          <span className="text-2xl font-black text-thron-navy block mt-1">1 450</span>
          <span className="text-[10px] text-emerald-600 font-bold">Arbre généalogique actif</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Temples sous tutelle</span>
          <span className="text-2xl font-black text-amber-800 block mt-1">12</span>
          <span className="text-[10px] text-slate-500">Temple Calavi, Temple Cotonou...</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Demandes d'Adhésion</span>
          <span className="text-2xl font-black text-rose-600 block mt-1">3</span>
          <span className="text-[10px] text-amber-600 font-bold">À valider par le Maître</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Tontines & Cotisations</span>
          <span className="text-2xl font-black text-thron-blue block mt-1">4</span>
          <span className="text-[10px] text-slate-500">En cours de cycle</span>
        </div>
      </div>

      {/* Publication d'Annonces & Informations officielles de la Lignée */}
      <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-thron-gold" />
          <div>
            <h3 className="font-serif font-bold text-base text-thron-navy">
              Publier une Annonce Officielle de la Lignée
            </h3>
            <p className="text-xs text-slate-500">
              Selon les consignes : partagée avec les temples et passe automatiquement dans le fil d'actualité de la lignée sur Togoun.
            </p>
          </div>
        </div>

        <form onSubmit={handlePublishAnnouncement} className="space-y-3">
          <textarea
            rows={3}
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            placeholder="Exemple : Chers fidèles et dignitaires du Hounto Mantinkpon ò, la cérémonie d'Atinkindoudou se tiendra ce dimanche au temple principal..."
            className="w-full p-3.5 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-thron-gold resize-none"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Share2 className="w-4 h-4 text-emerald-600" />
              <span>Diffusion automatique : <strong>Fil Togoun • Notifications Temple • Arbre</strong></span>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-thron-navy hover:bg-thron-blue text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              Diffuser l'Annonce Officielle
            </button>
          </div>

          {announcementSent && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Annonce publiée avec succès ! Elle est désormais visible sur le réseau social Togoun.</span>
            </div>
          )}
        </form>
      </div>

      {/* Demandes d'adhésion en attente */}
      <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
        <h4 className="font-serif font-bold text-base text-thron-navy">Demandes d'Adhésion au Trône (3 en attente)</h4>
        <div className="space-y-3 text-xs">
          {[
            { nom: "SOHOU Gontran", role: "Postulant Hounvi", temple: "Temple Calavi", date: "Hier" },
            { nom: "KPONOU Justine", role: "Assi / Épouse rituelle", temple: "Siège Mantinkpon ò", date: "Il y a 3 jours" },
            { nom: "HOUNKPÉ Marcel", role: "Dignitaire Hounnon", temple: "Temple Cotonou", date: "Il y a 5 jours" },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <strong className="text-thron-navy block">{item.nom}</strong>
                <span className="text-slate-500 text-[11px]">{item.role} • {item.temple} • {item.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Adhésion de ${item.nom} validée par le Maître de Lignée ! Ajout à l'arbre généalogique.`)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-sm cursor-pointer"
                >
                  Valider
                </button>
                <button
                  onClick={() => alert(`Demande de ${item.nom} rejetée.`)}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold text-xs cursor-pointer"
                >
                  Refuser
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// ============================================================================
// 3. DASHBOARD VENDEUR MARKETPLACE (HOUNNON MAHUGNON DOSSOU)
// ============================================================================
export const SellerDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* En-tête Vendeur */}
      <div className="bg-gradient-to-r from-amber-800 via-thron-navy to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sacred border border-thron-gold/40 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
              COMPTOIR VENDEUR VÉRIFIÉ (GRADE HOUNNON+)
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-amber-100">
              Comptoir Sacré Alafia • Hounnon Mahugnon DOSSOU
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Vente certifiée d'articles et d'objets rituels consacrés sous séquestre automatique (8% commission plateforme).
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-right min-w-[200px]">
            <span className="text-[10px] text-amber-200 uppercase tracking-widest font-bold block">
              Revenus Débloqués
            </span>
            <span className="text-2xl font-black text-white block mt-0.5">
              680 000 <span className="text-xs text-thron-gold font-normal">F CFA</span>
            </span>
            <span className="text-[10px] text-amber-300 font-semibold flex items-center justify-end gap-1 mt-1">
              <Lock className="w-3 h-3" /> 85 000 F en séquestre
            </span>
          </div>
        </div>
      </div>

      {/* Statistiques Boutique */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Articles en Ligne</span>
          <span className="text-2xl font-black text-thron-navy block mt-1">18</span>
          <span className="text-[10px] text-emerald-600 font-bold">Tous certifiés conformes</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Commandes Livrées</span>
          <span className="text-2xl font-black text-emerald-700 block mt-1">34</span>
          <span className="text-[10px] text-slate-500">Fonds versés au Wallet</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">En cours de livraison</span>
          <span className="text-2xl font-black text-amber-700 block mt-1">4</span>
          <span className="text-[10px] text-amber-600 font-bold">Sous séquestre (Escrow)</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Commission Plateforme</span>
          <span className="text-2xl font-black text-thron-blue block mt-1">8 %</span>
          <span className="text-[10px] text-slate-500">Prélevée à la livraison</span>
        </div>
      </div>

      {/* Commandes sous Séquestre */}
      <div className="bg-white rounded-3xl p-6 border border-thron-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-base text-thron-navy">Commandes Récentes & Séquestre</h3>
            <p className="text-xs text-slate-500">Les fonds restent bloqués jusqu'à la confirmation de réception par l'acheteur</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Protection Acheteur / Vendeur
          </span>
        </div>

        <div className="space-y-3 text-xs">
          {[
            { id: "CMD-8831", article: "Drap Cérémoniel Blanc Brodé", acheteur: "Bienvenu KPODÉKON", prix: 35000, statut: "En livraison", escrow: true },
            { id: "CMD-8829", article: "Savon Rituel de Purification Alafia", acheteur: "Agbilinon Jean", prix: 15000, statut: "En livraison", escrow: true },
            { id: "CMD-8815", article: "Cloche Sacrée Atinsa en Bronze", acheteur: "Hounnon TOSSOU", prix: 45000, statut: "Livré & Confirmé", escrow: false },
          ].map((cmd) => (
            <div key={cmd.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-600">{cmd.id}</span>
                  <span className="font-bold text-thron-navy">{cmd.article}</span>
                </div>
                <span className="text-slate-500 text-[11px]">Client : {cmd.acheteur} • Montant : <strong>{cmd.prix.toLocaleString("fr-FR")} F CFA</strong></span>
              </div>

              <div className="flex items-center gap-3">
                {cmd.escrow ? (
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg font-bold text-[10px] flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Séquestre : {cmd.statut}
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg font-bold text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Fonds débloqués (+{(cmd.prix * 0.92).toLocaleString("fr-FR")} F)
                  </span>
                )}

                {cmd.escrow && (
                  <button
                    onClick={() => alert(`Notification envoyée à l'acheteur pour confirmer la bonne réception de la commande ${cmd.id}`)}
                    className="px-3 py-1 bg-thron-navy text-white rounded-lg font-bold text-xs hover:bg-thron-blue transition-colors cursor-pointer"
                  >
                    Notifier Client
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// ============================================================================
// 4. BANNIÈRE / PAGE POUR UTILISATEUR VISITEUR (CONFORME AUX CONSIGNES DU DOCX)
// ============================================================================
interface VisitorCommunityViewProps {
  onJoinCommunity?: () => void;
  onExplorePublicTree?: () => void;
}

export const VisitorCommunityView: React.FC<VisitorCommunityViewProps> = ({
  onJoinCommunity,
  onExplorePublicTree,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-6 space-y-6 animate-in fade-in duration-300">
      {/* 1. HERO OFFICIEL OBLIGATOIRE SELON LES CONSIGNES DU DOCUMENT */}
      <div className="relative bg-gradient-to-br from-thron-navy via-thron-blue to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-sacred border border-thron-gold/40 overflow-hidden text-center">
        <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-thron-gold/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-thron-gold/20 text-thron-gold border border-thron-gold/40 text-[11px] font-black uppercase tracking-wider">
            Plateforme Officielle SaaS de la Communauté Thron
          </span>

          <h2 className="font-serif text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-thron-gold leading-tight">
            L'Alliance Sacrée des Courants, Lignées & Temples
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl mx-auto">
            Découvrez THRON HOUNTO : l'arbre généalogique spirituel tactile, le réseau social Togoun, le fil vidéo Tognon, la messagerie Atinsa, les tontines, cotisations et la marketplace réservée aux dignitaires initiés.
          </p>

          {/* LES DEUX BOUTONS OBLIGATOIRES SPÉCIFIÉS DANS LE DOCUMENT */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onJoinCommunity}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-thron-gold hover:from-amber-600 hover:to-amber-400 text-thron-navy font-black text-xs sm:text-sm rounded-2xl shadow-gold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-thron-navy" />
              Rejoindre une communauté
            </button>

            <button
              onClick={onExplorePublicTree}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4 text-thron-gold" />
              Voir la généalogie de Thron
            </button>
          </div>
        </div>
      </div>

      {/* 2. LES 5 STATISTIQUES OBLIGATOIRES SPÉCIFIÉES DANS LE DOCUMENT */}
      <div className="space-y-3">
        <div className="text-center">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Statistiques Officielles de la Communauté
          </span>
          <h3 className="font-serif text-lg font-bold text-thron-navy">
            L'Alliance Thron en Chiffres
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {/* Stat 1 : Nombre total de fidèles inscrits */}
          <div className="col-span-2 md:col-span-1 bg-white rounded-2xl p-4 border border-thron-border shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-thron-navy block">148 520</span>
            <span className="text-[11px] font-bold text-slate-600 block mt-1">Total des fidèles inscrits</span>
            <span className="text-[9px] text-slate-400">(tous courants & lignées)</span>
          </div>

          {/* Stat 2 : Nombres de Hounnons */}
          <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-700 block">1 840</span>
            <span className="text-[11px] font-bold text-slate-600 block mt-1">Hounnons</span>
            <span className="text-[9px] text-slate-400">Têtes de Hounto</span>
          </div>

          {/* Stat 3 : Nombre de Hounnongan */}
          <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700 block">312</span>
            <span className="text-[11px] font-bold text-slate-600 block mt-1">Hounnongan</span>
            <span className="text-[9px] text-slate-400">Grands Dignitaires</span>
          </div>

          {/* Stat 4 : Nombre de courants */}
          <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-thron-blue block">3</span>
            <span className="text-[11px] font-bold text-slate-600 block mt-1">Courants Sacrés</span>
            <span className="text-[9px] text-slate-400">Trônes Reconnus</span>
          </div>

          {/* Stat 5 : Nombres de lignées */}
          <div className="bg-white rounded-2xl p-4 border border-thron-border shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-purple-700 block">42</span>
            <span className="text-[11px] font-bold text-slate-600 block mt-1">Lignées</span>
            <span className="text-[9px] text-slate-400">Sièges Authentiques</span>
          </div>
        </div>
      </div>
    </div>
  );
};
