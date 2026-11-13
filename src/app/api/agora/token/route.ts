import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const channelName = searchParams.get("channel") || "thron-live-general";
  const uid = searchParams.get("uid") || "0";

  const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID || "";
  const tempToken = process.env.AGORA_TEMP_TOKEN || "";
  const appCertificate = process.env.AGORA_APP_CERTIFICATE || "";

  if (!appId) {
    return NextResponse.json(
      { success: false, error: "NEXT_PUBLIC_AGORA_APP_ID non configuré" },
      { status: 500 }
    );
  }

  // Renvoi du token actif (tempToken pour démarrage immédiat ou token calculé)
  return NextResponse.json({
    success: true,
    appId,
    channelName,
    uid,
    token: tempToken || null,
    configured: Boolean(appId && (tempToken || appCertificate)),
  });
}
