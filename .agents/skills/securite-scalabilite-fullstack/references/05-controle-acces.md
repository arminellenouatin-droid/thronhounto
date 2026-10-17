# 05. Contrôle d'accès : IDOR, rôles, multi-tenant

## Le problème (IDOR)
Utilisateur connecté change `/api/users/125` en `/api/users/126` et lit les données d'un autre. **Être authentifié ≠ être autorisé.**

## Règles
1. **Vérifier la propriété/le droit côté serveur sur chaque accès** à une ressource, dans chaque route/action/fonction, y compris `PUT`, `DELETE`, exports, fichiers, WebSockets.
2. L'identité vient de la **session/jeton vérifié**, jamais d'un `userId` envoyé dans le corps, l'URL ou un cookie modifiable.
3. **Requête scopée** : écrire `WHERE id = $1 AND owner_id = $session_user` (une seule requête) plutôt que charger puis comparer.
4. **Refus par défaut** : une route sans règle explicite est interdite.
5. **UUID non devinables** = défense en profondeur, pas une protection suffisante.
6. Réponse `404` (pas `403`) pour ne pas révéler l'existence d'une ressource privée.
7. **Liste blanche de champs** modifiables (anti mass-assignment) : un utilisateur ne peut pas envoyer `role: "admin"`, `balance`, `is_verified`.
8. Les routes admin vérifient le rôle **côté serveur** ; masquer un bouton ne protège rien.

## Modèle de rôles
Rôles minimum (`user`, `moderator`, `admin`, `superadmin`) + permissions fines pour actions sensibles (remboursement, retrait, suppression). Principe du **moindre privilège**. Changement de rôle journalisé, 2FA obligatoire pour admin.

## Multi-tenant (ex. SaaS pour plusieurs établissements)
- `tenant_id` (ou `org_id`) sur **chaque** table métier, `NOT NULL`, indexé.
- Isolation **forcée par la base** (RLS Postgres) ou par une couche d'accès unique qui injecte le `tenant_id` ; jamais laissée à la discipline de chaque requête.
- Les clés étrangères composites `(tenant_id, id)` empêchent de lier des données de deux tenants.
- Fichiers/stockage : préfixe par tenant + URLs signées courtes.
- Test : l'utilisateur du tenant A tente chaque route avec des ids du tenant B → toujours refusé.

## Supabase / Postgres RLS (si utilisé)
- **RLS activé sur toutes les tables** exposées ; sans politique = aucun accès (voulu).
- Politiques `USING` **et** `WITH CHECK` (lecture et écriture).
- `service_role` (clé secrète) : **jamais côté navigateur/mobile**, uniquement serveur. La clé `anon/publishable` est publique : la sécurité repose sur RLS.
- Vues et fonctions `SECURITY DEFINER` : vérifier qu'elles ne contournent pas RLS ; fixer `search_path`.
- Buckets de stockage privés par défaut, politiques par chemin.
- Lancer les conseillers de sécurité du fournisseur après chaque changement de schéma.

## Authentification (rappels)
Voir 06 pour mots de passe, sessions, 2FA, réinitialisation.

## Anti-patterns
- `const user = await db.user.findById(req.params.id)` sans vérifier le propriétaire
- `userId` pris dans `req.body`
- Rôle stocké dans un cookie/localStorage non signé
- Vérification d'accès uniquement dans le front
- Endpoint « debug » ou « admin » oublié en production
- Clé `service_role` dans une variable `NEXT_PUBLIC_*`

## Tests (matrice d'accès)
Pour chaque ressource : propriétaire ✅, autre utilisateur ❌, non connecté ❌, admin selon règle, autre tenant ❌. Automatiser, lancer en CI.
