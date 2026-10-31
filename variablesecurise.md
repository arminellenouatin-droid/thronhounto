# GUIDE DES VARIABLES D\'ENVIRONNEMENT SÉCURISÉES POUR VERCEL
**Projet : SaaS THRON HOUNTO**
*Fichier généré conformément aux règles strictes de sécurité AGENTS.md*

Ce document détaille toutes les variables d'environnement nécessaires pour configurer et déployer votre projet sur **Vercel**.
Pour chaque variable, configurez-la dans le tableau de bord Vercel sous :
**Project Settings > Environment Variables**.

> [!IMPORTANT]
> Pour toutes les clés secrètes (SECRET_KEY, SERVICE_ROLE, DATABASE_URL), cochez impérativement la case **Sensitive** dans Vercel pour empêcher leur affichage en clair ou leur fuite dans les aperçus.

---

## 1. BASE DE DONNÉES (NEON POSTGRESQL / SUPABASE)

| Nom de la variable | Type Vercel | Description & Format attendu |
|---|---|---|
| DATABASE_URL | **Sensitive** | Chaîne de connexion PostgreSQL poolée (port 6543 ou 5432 avec ?sslmode=require). Exemple : postgresql://[user]:[password]@[host-neon-pooler].aws.neon.tech/neondb?sslmode=require |
| DIRECT_URL | **Sensitive** | Chaîne de connexion directe (sans pooling) dédiée aux migrations de schéma. Exemple : postgresql://[user]:[password]@[host-neon-direct].aws.neon.tech/neondb?sslmode=require |
| NEXT_PUBLIC_SUPABASE_URL | Standard | URL publique de votre projet Supabase. Exemple : https://[votre-id-projet].supabase.co |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Standard | Clé publique anonyme (non) sécurisée par les politiques RLS. |
| SUPABASE_SERVICE_ROLE_KEY | **Sensitive** | Clé Secrète de rôle de service (accès serveur uniquement, JAMAIS exposée côté client). |

---

## 2. AUTHENTIFICATION & SESSIONS SÉCURISÉES

| Nom de la variable | Type Vercel | Description & Format attendu |
|---|---|---|
| NEXTAUTH_SECRET | **Sensitive** | Clé secrète de 32 octets aléatoires (générée via openssl rand -base64 32). Sert à chiffrer les cookies et jetons JWT. |
| AUTH_SECRET | **Sensitive** | Alias moderne recommandé pour NextAuth v5. Même valeur que NEXTAUTH_SECRET. |
| NEXTAUTH_URL | Standard | URL canonique en production. Exemple : https://thronhounto.bj ou https://[votre-domaine].vercel.app |
| NEXT_PUBLIC_SITE_URL | Standard | URL racine publique du site utilisée pour les métadonnées OpenGraph et redirections OAuth. |

---

## 3. PAIEMENTS MONEROO & MOBILE MONEY (FLUX FINANCIERS)

| Nom de la variable | Type Vercel | Description & Format attendu |
|---|---|---|
| MONEROO_PUBLIC_KEY | Standard | Clé publique Moneroo pour l'initialisation du widget de paiement en ligne. Format : pk_live_... |
| MONEROO_SECRET_KEY | **Sensitive** | Clé secrète API Moneroo côté serveur pour valider les encaissements et retraits. Format : sk_live_... |
| MONEROO_WEBHOOK_SECRET | **Sensitive** | Secret de signature HMAC utilisé par l'API pour vérifier l'authenticité des webhooks de paiement. |

---

## 4. ENVIRONNEMENT & CONFIGURATION DE L'APPLICATION

| Nom de la variable | Type Vercel | Description & Format attendu |
|---|---|---|
| NODE_ENV | Standard | production (défini automatiquement par Vercel). |
| NEXT_PUBLIC_APP_ENV | Standard | production (ou preview pour les environnements de recette). |
| CRON_SECRET | **Sensitive** | Clé secrète utilisée pour autoriser l'exécution des tâches planifiées (prélèvement des cotisations et clôture de tontines). |
| STORAGE_BUCKET_PRIVATE | Standard | Nom du bucket privé pour documents et pièces d'identité (	hron-private-vault). |
| STORAGE_BUCKET_PUBLIC | Standard | Nom du bucket public pour miniatures et avatars (	hron-public-assets). |

---

## 5. CHECKLIST AVANT DÉPLOIEMENT EN PRODUCTION

- [ ] Toutes les clés contenant SECRET, PASSWORD ou SERVICE_ROLE sont bien marquées **Sensitive**.
- [ ] La variable DATABASE_URL pointe bien vers votre instance Neon en production avec SSL activé (sslmode=require).
- [ ] Le Webhook URL dans votre tableau de bord Moneroo est configuré vers : https://[votre-domaine]/api/webhooks/moneroo.
- [ ] Aucun secret n'est commité dans Git (le fichier .env.local est bien listé dans .gitignore).
