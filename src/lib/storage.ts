import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accountId = process.env.R2_ACCOUNT_ID || "";
const accessKeyId = process.env.R2_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || "";
const bucketName = process.env.R2_BUCKET_NAME || "thronhounto";
const publicUrl = process.env.R2_PUBLIC_URL || "";

// Détection de la configuration R2
export const isR2Configured = Boolean(
  accountId && accessKeyId && secretAccessKey && bucketName
);

// Initialisation du client S3 compatible Cloudflare R2
export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * Génère une URL présignée pour permettre à l'utilisateur d'uploader un fichier directement vers R2
 * @param key Chemin relatif du fichier dans le bucket (ex: "stories/123_video.mp4")
 * @param contentType Type MIME du fichier (ex: "video/mp4", "image/jpeg")
 * @param expiresIn Durée de validité en secondes (défaut: 3600 = 1h)
 */
export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<{ uploadUrl: string; fileUrl: string }> {
  if (!isR2Configured) {
    throw new Error(
      "Cloudflare R2 n'est pas encore configuré. Renseignez R2_ACCESS_KEY_ID et R2_SECRET_ACCESS_KEY dans .env.local"
    );
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn });
  const fileUrl = publicUrl ? `${publicUrl.replace(/\/$/, "")}/${key}` : `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${key}`;

  return { uploadUrl, fileUrl };
}

/**
 * Génère une URL présignée pour lire/télécharger un fichier privé
 */
export async function getPresignedDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  if (!isR2Configured) {
    throw new Error("Cloudflare R2 n'est pas configuré.");
  }

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return await getSignedUrl(r2Client, command, { expiresIn });
}

/**
 * Supprime un fichier du bucket R2
 */
export async function deleteR2Object(key: string): Promise<boolean> {
  if (!isR2Configured) return false;

  try {
    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      })
    );
    return true;
  } catch (error) {
    console.error("Erreur suppression R2:", error);
    return false;
  }
}
