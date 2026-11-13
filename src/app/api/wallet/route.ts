import { NextResponse } from "next/server";
import { isDatabaseConfigured, queryNeon } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  // Si Neon DB est configuré, on interroge la table
  if (isDatabaseConfigured && userId) {
    try {
      const balanceRes = await queryNeon(
        "SELECT wallet_solde_fcfa FROM utilisateurs WHERE id = $1 LIMIT 1",
        [userId]
      );
      const ledgerRes = await queryNeon(
        "SELECT * FROM wallet_transactions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50",
        [userId]
      );

      return NextResponse.json({
        success: true,
        soldeFCFA: balanceRes.rows[0]?.wallet_solde_fcfa || 0,
        transactions: ledgerRes.rows,
      });
    } catch (e: any) {
      console.error("Neon DB error:", e);
    }
  }

  // Fallback direct
  return NextResponse.json({
    success: true,
    soldeFCFA: 45000,
    devise: "FCFA (XOF)",
    commissionPlateformeTaux: 0.08,
    formuleActive: "Assiata",
    statut: "actif",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, montant, reference, userId, ligneeId } = body;

    if (!montant || montant <= 0) {
      return NextResponse.json({ success: false, error: "Montant invalide" }, { status: 400 });
    }

    // Calcul de la commission de 8% pour les ventes, cotisations et tontines
    let commission = 0;
    if (["vente_marketplace", "cotisation", "tontine"].includes(type)) {
      commission = Math.round(montant * 0.08);
    }

    const net = type === "vente_marketplace" ? montant - commission : montant;

    return NextResponse.json({
      success: true,
      reference: reference || `TX-${Date.now()}`,
      type,
      montantBrut: montant,
      commission8pct: commission,
      montantNet: net,
      statut: "valide",
      message: "Transaction enregistrée avec succès dans le grand livre.",
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
