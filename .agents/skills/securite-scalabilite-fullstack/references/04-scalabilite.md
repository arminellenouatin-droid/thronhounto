# 04. Scalabilité : du lien viral à 1 million d'utilisateurs

## Principes
1. **Application sans état** (stateless) : sessions/jetons hors mémoire serveur, fichiers hors disque local.
2. **Ne pas calculer deux fois ce qui peut être servi tel quel** : cache à chaque niveau.
3. **Tout ce qui est lourd est asynchrone** (file de tâches).
4. **Protéger la base** : c'est le goulot n°1.
5. **Dégrader proprement** plutôt que tomber (limiter, mettre en file, simplifier).

## Couches (du plus rentable au plus coûteux)
| Couche | Actions |
|---|---|
| CDN / statique | Pages publiques en statique/ISR, images optimisées, cache longue durée sur assets versionnés |
| Cache applicatif | Redis/KV pour lectures répétées (classements, profils publics), TTL + invalidation claire |
| Base de données | Index sur colonnes filtrées/triées, éliminer les N+1, pagination par curseur (pas `OFFSET` énorme), `EXPLAIN` sur requêtes lentes, pool de connexions |
| Calcul | Tâches lourdes (emails, PDF, vidéo, IA, exports) en file avec workers |
| Lecture/écriture | Réplicas de lecture pour les lectures ; une seule base d'écriture |

## Connexions base (serverless : Vercel, etc.)
Chaque fonction ouvre sa connexion → saturation. Utiliser un **pooler** (PgBouncer / pooler du fournisseur, mode transaction), limiter la taille du pool par instance, éviter les connexions ouvertes dans des transactions longues.

## Pics de trafic
- **Rate limiting** par IP/utilisateur/route (plus strict sur login, paiement, vote, inscription).
- **File d'attente virtuelle** (« vous êtes N°… ») pour événements et ventes flash.
- **Mise en file des écritures** non critiques (analytics, notifications).
- **Pages statiques** pour les pages d'atterrissage ; l'API ne sert que le dynamique.
- Autoscaling avec **plafond de coût** et alertes de budget.
- Clients : timeouts, retries avec backoff, pas de polling agressif (préférer événements/SSE/WebSocket gérés par un service dédié).

## Temps réel et lives
- Vidéo en direct : passer par un service de streaming/CDN (HLS), jamais servir la vidéo depuis l'app.
- Compteurs live : agréger côté serveur et pousser des mises à jour **toutes les 1-2 s**, pas à chaque événement.
- Chat/WebSocket : limiter la fréquence des messages, taille maximale, modération.

## Anti-patterns
- `SELECT *` sans `LIMIT`, listes non paginées
- Boucle de requêtes dans une boucle (N+1)
- Calcul de classement à chaque requête
- Upload de gros fichiers à travers le serveur d'application (utiliser URLs signées directes vers le stockage)
- Aucun index sur les clés étrangères
- Pas de plafond de coût sur les services à l'usage (IA, SMS, email)

## Vérification
Test de charge (k6/Artillery) sur les 3 routes critiques ; observer CPU, latence p95, connexions DB, taux d'erreurs. Objectif documenté : « supporte X req/s avec p95 < Y ms ».
