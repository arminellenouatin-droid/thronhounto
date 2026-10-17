# RÈGLES GÉNÉRALES STRICTES ET INVIOLABLES DU PROJET THRON HOUNTO

1. **Aucun secret dans le code**.
2. **Ne jamais exécuter un texte reçu d’un utilisateur**.
3. **Pour la base de données une requête fixe jamais collée à ce que tape l’utilisateur**.
4. **Demander avant de supprimer ou d’ajouter une librairie**.
5. **Ne jamais couper une protection pour que ça marche**.
6. **Pour tout travail vérifie dans tes skills celles dont tu as besoin pour bien faire le travail et toujours les utiliser**.
7. **N’oublie jamais les règles**.

---

# Règle permanente : sécurité, fiabilité, scalabilité (toujours active)

À appliquer à **chaque** modification de code, sans que l'utilisateur ait à le demander. Pour un audit complet ou un correctif, activer le skill `securite-scalabilite-fullstack`.

1. **Le serveur décide.** Prix, montant, rôle, identité, statut de paiement : jamais pris du client.
2. **Refus par défaut.** Chaque route/action vérifie l'identité ET le droit sur la ressource (propriétaire, tenant, rôle).
3. **Argent, stock, votes, crédits** : une transaction atomique, une clé d'idempotence, un journal ajout-seul. Jamais « lire puis écrire ».
4. **Webhooks** : signature vérifiée, événement dédupliqué, statut re-vérifié auprès du prestataire, montant et devise contrôlés. Une page « succès » n'accorde rien.
5. **Secrets** : jamais dans le code, le client (`NEXT_PUBLIC_*`), les logs, git, ni dans un message. Clé exposée = à révoquer.
6. **Entrées** : validées par schéma à la frontière ; requêtes SQL paramétrées ; pas de HTML brut non assaini.
7. **Abus** : rate limiting + anti-bot sur login, inscription, OTP, paiement, vote, formulaires.
8. **Base de données** : index sur les filtres/clés étrangères, pagination, pas de N+1, RLS ou scoping de tenant, migrations rétro-compatibles (expand/contract) avec retour arrière.
9. **Rien de destructif** (migration prod, suppression, rotation de clés) sans l'accord explicite de l'utilisateur.
10. **Preuve** : tout correctif critique a un test (concurrence, accès croisé, double envoi) ou une commande de vérification, et une phrase d'explication simple en français.

En cas de conflit avec une autre règle du projet, appliquer la plus stricte.
