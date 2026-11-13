/**
 * Module d'initialisation et utilitaires Agora WebRTC pour le SaaS THRON HOUNTO
 */

export const AGORA_APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID || "";
export const AGORA_TEMP_TOKEN = process.env.AGORA_TEMP_TOKEN || "";

export interface AgoraLiveConfig {
  appId: string;
  channel: string;
  token?: string | null;
  uid?: string | number | null;
}

export const isAgoraConfigured = Boolean(AGORA_APP_ID);

/**
 * Crée dynamiquement une instance du client AgoraRTC côté client (évite les erreurs SSR)
 */
export async function getAgoraRTC() {
  if (typeof window === "undefined") return null;
  const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
  return AgoraRTC;
}
