import { Pool, neon } from "@neondatabase/serverless";

// Récupération de l'URL de connexion Neon depuis les variables d'environnement
const connectionString = process.env.DATABASE_URL || "";

export const isDatabaseConfigured = Boolean(connectionString);

/**
 * Client SQL pour exécuter des requêtes sur Neon PostgreSQL
 */
export async function queryNeon(sqlQuery: string, params: any[] = []) {
  if (!connectionString) {
    console.warn("DATABASE_URL non configuré. Mode mémoire / mock actif.");
    return { rows: [] };
  }

  try {
    const sql = neon(connectionString);
    const rows = await (sql as any)(sqlQuery, params);
    return { rows };
  } catch (error) {
    console.error("Erreur d'exécution Neon SQL:", error);
    throw error;
  }
}
