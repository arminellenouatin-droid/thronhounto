import { NextResponse } from "next/server";
import { isR2Configured, getPresignedUploadUrl } from "@/lib/storage";

// Types MIME autorisés pour le SaaS Thron Hounto
const ALLOWED_MIME_TYPES = new Set([
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  // Vidéos (Tognon, Stories)
  "video/mp4",
  "video/webm",
  "video/quicktime",
  // Audios (Chants sacrés, enseignements Nouyin)
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  "audio/m4a",
  // Documents (Règlements tontines, textes sacrés Zindo)
  "application/pdf",
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filename, contentType, folder = "uploads" } = body;

    if (!filename || !contentType) {
      return NextResponse.json(
        { success: false, error: "Nom de fichier et type MIME requis" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(contentType)) {
      return NextResponse.json(
        { success: false, error: `Type de fichier non autorisé : ${contentType}` },
        { status: 400 }
      );
    }

    // Nettoyage du nom de fichier pour éviter les attaques par traversée de chemin
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueKey = `${folder.replace(/[^a-zA-Z0-9_-]/g, "")}/${Date.now()}_${sanitizedFilename}`;

    if (!isR2Configured) {
      // Si les clés d'accès R2 ne sont pas encore renseignées, on renvoie une URL mockée sécurisée
      return NextResponse.json({
        success: true,
        mockMode: true,
        key: uniqueKey,
        uploadUrl: null,
        fileUrl: `https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80`,
        message: "Mode simulation actif : renseignez R2_ACCESS_KEY_ID et R2_SECRET_ACCESS_KEY pour le stockage direct.",
      });
    }

    // Génération de l'URL présignée Cloudflare R2
    const { uploadUrl, fileUrl } = await getPresignedUploadUrl(uniqueKey, contentType);

    return NextResponse.json({
      success: true,
      key: uniqueKey,
      uploadUrl,
      fileUrl,
    });
  } catch (error: any) {
    console.error("Erreur API Upload R2:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Erreur interne de stockage" },
      { status: 500 }
    );
  }
}
