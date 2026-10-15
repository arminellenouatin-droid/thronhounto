"use client";

import React, { useState } from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  History,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Download,
  Calendar,
  Lock,
  Flame,
  X,
  Smartphone,
} from "lucide-react";
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from "@/lib/data";

interface Transaction {
  id: string;
  reference: string;
  date: string;
  type: "recharge" | "abonnement" | "vente" | "cotisation" | "retrait";
  label: string;
  montantBrut: number;
  commission8pct: number;
  montantNet: number;
  soldeApres: number;
  statut: "succes" | "en_attente";
}

interface WalletAndSubscriptionsProps {
  initialBalance?: number;
  ligneeName?: string;
  currentGrade?: string;
  onBalanceUpdate?: (newBalance: number) => void;
}

export const WalletAndSubscriptions: React.FC<WalletAndSubscriptionsProps> = ({
  initialBalance = 45000,
  ligneeName = "Lignée Mantinkpon ò",
  currentGrade = "Togbegan daho",
  onBalanceUpdate,
}) => {
  // Solde dynamique du wallet
  const [balance, setBalance] = useState<number>(initialBalance);

  // Formule active de la lignée
  const [activePlanId, setActivePlanId] = useState<"Togounkpevi" | "Togoundaho" | "Assiata">("Assiata");
  const [billingCycle, setBillingCycle] = useState<"mensuel" | "annuel">("mensuel");
  const [autoRenew, setAutoRenew] = useState(true);
  const [nextBillingDate, setNextBillingDate] = useState("15 Novembre 2026");

  // Option API privée Assiata (100 000 F CFA)
  const [hasPrivateApiOption, setHasPrivateApiOption] = useState(false);
  const [privateApiOperator, setPrivateApiOperator] = useState<"KKIAPAY" | "MTN">("KKIAPAY");

  // Modales
  const [rechargeModalOpen, setRechargeModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [planChangeModalOpen, setPlanChangeModalOpen] = useState(false);

  // Formulaire Recharge Kkiapay
  const [rechargeAmount, setRechargeAmount] = useState<number>(10000);
  const [momoOperator, setMomoOperator] = useState<"MTN" | "MOOV" | "CELTIIS">("MTN");
  const [momoPhone, setMomoPhone] = useState("+229 97 12 34 56");
  const [isProcessingKkiapay, setIsProcessingKkiapay] = useState(false);
  const [paymentSuccessNotice, setPaymentSuccessNotice] = useState<string | null>(null);

  // Formulaire Retrait
  const [withdrawAmount, setWithdrawAmount] = useState<number>(5000);
  const [withdrawPhone, setWithdrawPhone] = useState("+229 97 12 34 56");
  const [withdrawNotice, setWithdrawNotice] = useState<string | null>(null);

  // Grand livre (Ledger immuable)
  const [ledger, setLedger] = useState<Transaction[]>([
    {
      id: "tx-1",
      reference: "KKIA-PAY-984210",
      date: "15 Oct 2026, 14:20",
      type: "recharge",
      label: "Approvisionnement Wallet via MTN Mobile Money",
      montantBrut: 50000,
      commission8pct: 0,
      montantNet: 50000,
      soldeApres: 65000,
      statut: "succes",
    },
    {
      id: "tx-2",
      reference: "SUB-ASSIATA-001",
      date: "15 Oct 2026, 14:25",
      type: "abonnement",
      label: "Prélèvement Abonnement Lignée Assiata (Mensuel)",
      montantBrut: 20000,
      commission8pct: 0,
      montantNet: -20000,
      soldeApres: 45000,
      statut: "succes",
    },
    {
      id: "tx-3",
      reference: "MKT-VENTE-772",
      date: "14 Oct 2026, 18:30",
      type: "vente",
      label: "Vente Marketplace : Pagne Blanc Cérémoniel Thron",
      montantBrut: 18500,
      commission8pct: 1480, // 8%
      montantNet: 17020,
      soldeApres: 45000,
      statut: "succes",
    },
  ]);

  // Exécution du Rechargement Kkiapay
  const handleExecuteKkiapayRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (rechargeAmount < 500) {
      alert("Le montant minimum de rechargement est de 500 F CFA.");
      return;
    }

    setIsProcessingKkiapay(true);

    setTimeout(() => {
      const newBal = balance + rechargeAmount;
      const ref = `KKIA-${Date.now().toString().slice(-6)}`;

      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        reference: ref,
        date: "À l'instant",
        type: "recharge",
        label: `Recharge via Kkiapay (${momoOperator} ${momoPhone})`,
        montantBrut: rechargeAmount,
        commission8pct: 0,
        montantNet: rechargeAmount,
        soldeApres: newBal,
        statut: "succes",
      };

      setBalance(newBal);
      setLedger([newTx, ...ledger]);
      if (onBalanceUpdate) onBalanceUpdate(newBal);

      setIsProcessingKkiapay(false);
      setRechargeModalOpen(false);
      setPaymentSuccessNotice(`Recharge réussie de ${rechargeAmount.toLocaleString("fr-FR")} F CFA sur votre Wallet ! Référence : ${ref}`);

      setTimeout(() => setPaymentSuccessNotice(null), 5000);
    }, 1500);
  };

  // Exécution de la demande de Retrait
  const handleExecuteWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount < 2000) {
      alert("Le montant minimum de retrait est de 2 000 F CFA.");
      return;
    }
    if (withdrawAmount > balance) {
      alert("Solde insuffisant dans votre Wallet.");
      return;
    }

    const newBal = balance - withdrawAmount;
    const ref = `RET-${Date.now().toString().slice(-6)}`;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      reference: ref,
      date: "À l'instant",
      type: "retrait",
      label: `Demande de retrait vers ${momoOperator} (${withdrawPhone})`,
      montantBrut: withdrawAmount,
      commission8pct: 0,
      montantNet: -withdrawAmount,
      soldeApres: newBal,
      statut: "succes",
    };

    setBalance(newBal);
    setLedger([newTx, ...ledger]);
    if (onBalanceUpdate) onBalanceUpdate(newBal);

    setWithdrawModalOpen(false);
    setWithdrawNotice(`Demande de retrait de ${withdrawAmount.toLocaleString("fr-FR")} F CFA enregistrée. Traitement sous 24h par le système comptable.`);
    setTimeout(() => setWithdrawNotice(null), 5000);
  };

  // Changement de formule d'abonnement
  const handleSelectPlan = (plan: SubscriptionPlan) => {
    const cost = billingCycle === "mensuel" ? plan.prixMoisFCFA : plan.prixAnFCFA;
    if (balance < cost) {
      alert(`Solde insuffisant dans votre Wallet (${balance.toLocaleString("fr-FR")} F CFA disponible). Veuillez recharger au moins ${cost.toLocaleString("fr-FR")} F CFA.`);
      return;
    }

    const newBal = balance - cost;
    const ref = `SUB-${plan.id.toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      reference: ref,
      date: "À l'instant",
      type: "abonnement",
      label: `Souscription Formule Lignée ${plan.nom} (${billingCycle})`,
      montantBrut: cost,
      commission8pct: 0,
      montantNet: -cost,
      soldeApres: newBal,
      statut: "succes",
    };

    setBalance(newBal);
    setActivePlanId(plan.id);
    setLedger([newTx, ...ledger]);
    if (onBalanceUpdate) onBalanceUpdate(newBal);
    setPlanChangeModalOpen(false);

    alert(`Formule ${plan.nom} activée avec succès pour la ${ligneeName} !`);
  };

  // Souscription à l'Option API privée (100 000 F CFA)
  const handleSubscribePrivateApi = () => {
    if (balance < 100000) {
      alert(`Pour activer l'accès API de paiement privé, votre solde Wallet doit être d'au moins 100 000 F CFA (Solde actuel : ${balance.toLocaleString("fr-FR")} F).`);
      return;
    }

    const newBal = balance - 100000;
    const ref = `API-PRIV-${Date.now().toString().slice(-4)}`;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      reference: ref,
      date: "À l'instant",
      type: "abonnement",
      label: "Frais d'accès API Privée de Paiement Lignée Assiata",
      montantBrut: 100000,
      commission8pct: 0,
      montantNet: -100000,
      soldeApres: newBal,
      statut: "succes",
    };

    setBalance(newBal);
    setHasPrivateApiOption(true);
    setLedger([newTx, ...ledger]);
    if (onBalanceUpdate) onBalanceUpdate(newBal);

    alert("Option API privée de paiement débloquée pour votre Lignée ! Vous pouvez désormais connecter vos propres clés marchandes.");
  };

  const activePlan = SUBSCRIPTION_PLANS.find((p) => p.id === activePlanId) || SUBSCRIPTION_PLANS[2];

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* NOTIFICATIONS DE SUCCÈS TEMPORAIRES */}
      {paymentSuccessNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{paymentSuccessNotice}</span>
        </div>
      )}

      {withdrawNotice && (
        <div className="bg-blue-50 border border-blue-300 text-thron-blue p-4 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
          <Clock className="w-5 h-5 text-thron-blue flex-shrink-0" />
          <span>{withdrawNotice}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. CARTE MAJESTUEUSE DU WALLET & SOLDE FCFA                    */}
      {/* ============================================================== */}
      <div className="bg-gradient-to-r from-thron-navy via-thron-blue to-thron-navy rounded-3xl p-6 sm:p-8 text-white shadow-sacred border border-thron-gold/40 relative overflow-hidden">
        {/* Lueur sacrée en arrière-plan */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-thron-gold/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-bold text-thron-gold uppercase tracking-widest">
                Portefeuille Électronique Sacré • Section 8.9
              </span>
            </div>
            <div className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
              {balance.toLocaleString("fr-FR")} <span className="text-xl sm:text-2xl text-thron-gold">F CFA</span>
            </div>
            <p className="text-xs text-blue-200">
              Devise officielle : <strong>Franc CFA (XOF)</strong> • Titulaire : <strong>{ligneeName}</strong>
            </p>
          </div>

          {/* Boutons d'action du Wallet */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setRechargeModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-thron-gold text-thron-navy font-black text-xs shadow-gold hover:scale-105 transition-all flex items-center gap-2"
            >
              <ArrowDownLeft className="w-4 h-4" /> Recharger via Kkiapay
            </button>
            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4" /> Demander un Retrait
            </button>
          </div>
        </div>

        {/* Bilan Rapide des Garanties Financières */}
        <div className="mt-8 pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-blue-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Grand livre à double entrée (Idempotent)</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-300" />
            <span>Paiements Kkiapay (MTN, Moov, Celtiis)</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-sky-400" />
            <span>Prélèvements automatiques à échéance</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. GESTION DE L'ABONNEMENT DE LA LIGNÉE (Section 9.1)          */}
      {/* ============================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-thron-border shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-thron-gold uppercase">
              Formule de la Lignée • Section 9.1
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-thron-navy">
              Abonnement Actif : <span className="text-thron-blue">{activePlan.nom}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {activePlan.signification} • Prochaine échéance le{" "}
              <strong className="text-thron-navy">{nextBillingDate}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPlanChangeModalOpen(true)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-thron-navy text-xs font-bold rounded-xl transition-colors"
            >
              Changer de Formule
            </button>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full border border-emerald-300">
              ● Statut Actif
            </span>
          </div>
        </div>

        {/* DÉTAILS DE LA FORMULE ET PRELEVEMENT AUTOMATIQUE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Tarif souscrit :</span>
              <strong className="font-serif text-base text-thron-navy">
                {(billingCycle === "mensuel" ? activePlan.prixMoisFCFA : activePlan.prixAnFCFA).toLocaleString("fr-FR")} F CFA / {billingCycle === "mensuel" ? "mois" : "an"}
              </strong>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Capacité membres :</span>
              <span className="font-bold text-thron-blue">{activePlan.membresMax}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Grade requis du chef :</span>
              <span className="font-bold text-amber-700">{activePlan.gradeRequis}</span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-700">Prélèvement automatique</span>
                <span className="text-[10px] text-slate-400">Prélève l'abonnement sur le Wallet à l'échéance</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRenew}
                  onChange={(e) => setAutoRenew(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

          {/* OPTION API DE PAIEMENT PRIVÉE (Section 9.2 pour Assiata) */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-5 border border-thron-gold/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600" />
                <h4 className="font-bold text-xs text-thron-navy uppercase tracking-wider">
                  Option API de Paiement Privé
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-thron-gold/20 text-thron-dark text-[10px] font-bold">
                Assiata Uniquement
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Permet à la lignée d'encaisser directement les cotisations et ventes sur ses propres clés API Kkiapay ou MTN Mobile Money (Frais d'accès unique : 100 000 F CFA).
            </p>

            {hasPrivateApiOption ? (
              <div className="p-3 bg-white rounded-xl border border-emerald-300 text-xs space-y-2">
                <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Option API Activée</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span>Passerelle dédiée :</span>
                  <select
                    value={privateApiOperator}
                    onChange={(e) => setPrivateApiOperator(e.target.value as any)}
                    className="font-bold bg-slate-100 rounded px-2 py-1 text-xs"
                  >
                    <option value="KKIAPAY">Kkiapay Privé</option>
                    <option value="MTN">MTN Mobile Money Direct</option>
                  </select>
                </div>
              </div>
            ) : (
              <button
                onClick={handleSubscribePrivateApi}
                className="w-full py-2.5 bg-thron-navy hover:bg-thron-blue text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
              >
                Activer l'Option API (100 000 F CFA)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. CALCULATEUR DES COMMISSIONS (8%) & RÈGLES FINANCIÈRES       */}
      {/* ============================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-thron-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-thron-gold uppercase">
              Moteur Financier • Section 9.3
            </span>
            <h3 className="font-serif text-xl font-bold text-thron-navy">
              Moteur des Commissions de 8 %
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
            Commission Fixe : 8%
          </span>
        </div>

        <p className="text-xs text-slate-600">
          Une commission automatique de 8% est prélevée sur le montant total des ventes marketplace, des cotisations et des tontines.
        </p>

        {/* Décomposition visuelle transparente */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-thron-navy block">Exemple Vente Marketplace :</span>
            <div className="flex justify-between">
              <span className="text-slate-500">Prix de l'article sacré :</span>
              <strong className="text-slate-800">10 000 F CFA</strong>
            </div>
            <div className="flex justify-between text-amber-700">
              <span>Commission plateforme (8%) :</span>
              <strong>- 800 F CFA</strong>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 text-emerald-700 font-bold">
              <span>Crédit net versé au vendeur :</span>
              <span>9 200 F CFA</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-thron-navy block">Exemple Cotisation de Temple :</span>
            <div className="flex justify-between">
              <span className="text-slate-500">Montant de la cotisation :</span>
              <strong className="text-slate-800">5 000 F CFA</strong>
            </div>
            <div className="flex justify-between text-amber-700">
              <span>Commission plateforme (8%) :</span>
              <strong>- 400 F CFA</strong>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 text-emerald-700 font-bold">
              <span>Net crédité au Hounto :</span>
              <span>4 600 F CFA</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. GRAND LIVRE COMPTABLE IMMUABLE (Ledger à double entrée)     */}
      {/* ============================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-thron-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-thron-blue" />
            <h3 className="font-serif text-xl font-bold text-thron-navy">
              Grand Livre Comptable (Ledger)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {ledger.length} écritures enregistrées
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Date & Réf.</th>
                <th className="py-3 px-3">Opération</th>
                <th className="py-3 px-3 text-right">Montant Brut</th>
                <th className="py-3 px-3 text-right">Comm. (8%)</th>
                <th className="py-3 px-3 text-right">Montant Net</th>
                <th className="py-3 px-3 text-right">Solde Après</th>
                <th className="py-3 px-3 text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ledger.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-800 block">{tx.date}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{tx.reference}</span>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700">
                    {tx.label}
                  </td>
                  <td className="py-3 px-3 text-right font-medium">
                    {tx.montantBrut.toLocaleString("fr-FR")} F
                  </td>
                  <td className="py-3 px-3 text-right text-amber-700 font-medium">
                    {tx.commission8pct > 0 ? `-${tx.commission8pct.toLocaleString("fr-FR")} F` : "—"}
                  </td>
                  <td className={`py-3 px-3 text-right font-bold ${tx.montantNet > 0 ? "text-emerald-600" : "text-slate-800"}`}>
                    {tx.montantNet > 0 ? `+${tx.montantNet.toLocaleString("fr-FR")}` : tx.montantNet.toLocaleString("fr-FR")} F
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-thron-navy">
                    {tx.soldeApres.toLocaleString("fr-FR")} F
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {tx.statut === "succes" ? "Validé" : "En cours"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1 : RECHARGE KKIAPAY (Widget & Mobile Money)             */}
      {/* ============================================================== */}
      {rechargeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-thron-gold/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-thron-gold" />
                <h4 className="font-serif font-bold text-base text-thron-navy">
                  Recharger mon Portefeuille Kkiapay
                </h4>
              </div>
              <button
                onClick={() => setRechargeModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteKkiapayRecharge} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Montant à recharger en F CFA
                </label>
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base font-bold text-thron-navy focus:ring-2 focus:ring-thron-gold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Choisir l'opérateur Mobile Money
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["MTN", "MOOV", "CELTIIS"] as const).map((op) => (
                    <button
                      key={op}
                      type="button"
                      onClick={() => setMomoOperator(op)}
                      className={`py-2.5 rounded-xl font-bold border transition-all ${
                        momoOperator === op
                          ? "bg-thron-navy text-white border-thron-navy shadow"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Numéro de téléphone Mobile Money
                </label>
                <input
                  type="tel"
                  value={momoPhone}
                  onChange={(e) => setMomoPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-thron-gold"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
                Paiement sécurisé par la passerelle officielle <strong>Kkiapay Bénin</strong>. Un message de validation USSD vous sera envoyé sur votre téléphone.
              </div>

              <button
                type="submit"
                disabled={isProcessingKkiapay}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {isProcessingKkiapay ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Connexion Kkiapay en cours...
                  </>
                ) : (
                  <>Payer {rechargeAmount.toLocaleString("fr-FR")} F CFA</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2 : DEMANDE DE RETRAIT DU WALLET                         */}
      {/* ============================================================== */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-thron-gold/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-thron-blue" />
                <h4 className="font-serif font-bold text-base text-thron-navy">
                  Demander un Retrait de Fonds
                </h4>
              </div>
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleExecuteWithdrawal} className="py-4 space-y-4 text-xs">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-slate-700">
                Solde actuel : <strong>{balance.toLocaleString("fr-FR")} F CFA</strong> • Minimum de retrait : <strong>2 000 F CFA</strong>.
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Montant à retirer
                </label>
                <input
                  type="number"
                  min="2000"
                  max={balance}
                  step="500"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base font-bold text-thron-navy focus:ring-2 focus:ring-thron-gold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Numéro Mobile Money destinataire
                </label>
                <input
                  type="tel"
                  value={withdrawPhone}
                  onChange={(e) => setWithdrawPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-thron-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-thron-navy hover:bg-thron-blue text-white font-bold rounded-xl text-xs shadow-md transition-colors"
              >
                Confirmer la demande ({withdrawAmount.toLocaleString("fr-FR")} F CFA)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3 : SÉLECTEUR DE CHANGEMENT DE FORMULE D'ABONNEMENT      */}
      {/* ============================================================== */}
      {planChangeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl border border-thron-gold/40 animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="font-serif font-bold text-lg text-thron-navy">
                Choisir une Formule d'Abonnement pour la Lignée
              </h4>
              <button
                onClick={() => setPlanChangeModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-4 rounded-2xl border-2 flex flex-col justify-between ${
                    activePlanId === plan.id
                      ? "border-thron-gold bg-amber-50/40 shadow-sm"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div>
                    <h5 className="font-serif font-bold text-base text-thron-navy">{plan.nom}</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">{plan.signification}</p>
                    <div className="font-serif text-lg font-black text-thron-navy my-2">
                      {(billingCycle === "mensuel" ? plan.prixMoisFCFA : plan.prixAnFCFA).toLocaleString("fr-FR")} F
                      <span className="text-[10px] text-slate-400 font-normal"> / {billingCycle === "mensuel" ? "mois" : "an"}</span>
                    </div>
                    <span className="text-[10px] font-bold text-thron-blue block mb-2">{plan.membresMax}</span>
                    <p className="text-[10px] text-slate-600 mb-3">Grade requis : <strong>{plan.gradeRequis}</strong></p>
                  </div>

                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                      activePlanId === plan.id
                        ? "bg-thron-gold text-thron-navy shadow"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                  >
                    {activePlanId === plan.id ? "Formule Active" : "Choisir"}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPlanChangeModalOpen(false)}
              className="w-full py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
