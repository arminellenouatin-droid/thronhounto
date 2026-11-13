import { NextResponse } from "next/server";
import { isDatabaseConfigured, queryNeon } from "@/lib/db";
import { COURANTS_OFFICIELS, LIGNEE_MANTINKPON_O } from "@/lib/data";

export async function GET() {
  let dbStatus = "mock_mode";
  let dbTime = null;

  if (isDatabaseConfigured) {
    try {
      const res = await queryNeon("SELECT NOW() as now;");
      dbStatus = "connected";
      dbTime = res.rows[0]?.now;
    } catch (e: any) {
      dbStatus = `error: ${e.message}`;
    }
  }

  return NextResponse.json({
    status: "ok",
    app: "THRON HOUNTO",
    version: "1.0.0",
    lot: "Lot 0 & Lot 1 (MVP)",
    courantsCount: COURANTS_OFFICIELS.length,
    referenceLignee: LIGNEE_MANTINKPON_O.nom,
    database: {
      configured: isDatabaseConfigured,
      status: dbStatus,
      time: dbTime,
    },
    timestamp: new Date().toISOString(),
  });
}
