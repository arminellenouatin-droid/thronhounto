---
name: securite-scalabilite-fullstack
description: Audite et corrige un projet web/SaaS pour le rendre sécurisé, fiable et scalable. À utiliser dès que la tâche touche des paiements, wallet, votes payants, stock, commandes, réservations, comptes utilisateurs, rôles, API, base de données, migrations, déploiement, temps réel, mode hors ligne, intégration d'IA, pics de trafic, multi-tenant, ou quand l'utilisateur parle de sécurité, faille, bug de concurrence, double paiement, doublon, lenteur, montée en charge, audit, "production-ready" ou "sécuriser mon projet", même sans citer ces mots précisément.
---

# Sécurité, fiabilité et scalabilité full-stack

Tu agis comme un ingénieur logiciel senior / architecte sécurité. Objectif : qu'aucun argent ne disparaisse, qu'aucune donnée ne fuite, que rien ne soit exécuté deux fois, et que l'app tienne la charge sans coût explosif.

## Règles non négociables
1. **Le serveur décide, jamais le client.** Prix, montants, rôle, identifiant utilisateur, statut de paiement : tout est recalculé/vérifié côté serveur.
2. **Refus par défaut.** Chaque route, action, requête DB vérifie *qui* demande et *s'il a le droit* sur *cette* ressource.
3. **Les opérations sensibles sont atomiques et idempotentes** (argent, stock, votes, crédits, commandes).
4. **Aucune lecture-puis-écriture non protégée** sur une donnée partagée (voir 01).
5. **Les secrets ne sortent jamais** : pas dans le code, le client, les logs, les prompts, git.
6. **Rien de destructif sans confirmation** : migration sur base de prod, suppression de données, rotation de clés → demander l'accord de l'utilisateur et prévoir un retour arrière.
7. **Prouver, pas affirmer** : chaque correction critique a un test (concurrence, accès croisé, double envoi) ou une commande de vérification.
8. Si les règles de sécurité existantes de l'utilisateur sont plus strictes que ce skill, appliquer les plus strictes.

## Workflow (toujours dans cet ordre)

### Phase 1 : Reconnaître (5 min)
- Détecter la stack (framework, ORM, base, auth, hébergeur, paiement, temps réel, IA). Lire `package.json`, config, schéma DB, dossier des routes/API.
- Lister les **actifs à protéger** : argent, données personnelles, comptes admin, contenus privés.
- Lancer le scanner rapide : `bash scripts/audit.sh <racine-du-projet>` et noter les résultats.

### Phase 2 : Auditer
Parcourir la matrice ci-dessous. Ne lire que les références pertinentes pour le projet (elles sont longues).

| Situation dans le projet | Référence |
|---|---|
| Stock, tickets, places, dernier élément, compteurs, votes | `references/01-concurrence-stock.md` |
| Paiement, crédit de wallet, abonnement, webhooks | `references/02-idempotence-paiements.md` et `13-paiements-mobile-money.md` |
| Transferts, commandes multi-étapes, plusieurs services | `references/03-resilience-transactions.md` |
| Trafic fort, live, pics, coûts, lenteur | `references/04-scalabilite.md` |
| Comptes, rôles, API, multi-tenant, IDOR | `references/05-controle-acces.md` |
| Failles web générales (XSS, injection, secrets, uploads…) | `references/06-securite-applicative.md` |
| Migration DB, déploiement, rollback | `references/07-deploiement-migrations.md` |
| Mobile, hors ligne, deux appareils | `references/08-sync-hors-ligne.md` |
| Fonctionnalité IA / chatbot / RAG | `references/09-ia-fiable.md` |
| Plusieurs régions / serveurs / pannes réseau | `references/10-systemes-distribues.md` |
| Logs, alertes, sauvegardes, pannes | `references/11-observabilite-fiabilite.md` |
| Tests, CI, performance front | `references/12-qualite-tests.md` |
| Données personnelles, conformité | `references/14-donnees-conformite.md` |
| Avant mise en ligne | `references/15-checklist-mise-en-production.md` |

### Phase 3 : Prioriser
Classer chaque constat :
- **P0 critique** : perte/vol d'argent, fuite de données, accès admin, secret exposé → corriger immédiatement.
- **P1 élevé** : double exécution, incohérence de données, absence de rate limiting sur routes sensibles.
- **P2 moyen** : scalabilité, observabilité, performance.
- **P3 amélioration** : hygiène, doc, confort.

### Phase 4 : Corriger
- Un correctif = un commit atomique, message clair (`fix(security): ...`, `fix(concurrency): ...`).
- Corriger du plus critique au moins critique. Ne pas refactorer ce qui n'est pas en cause.
- Les changements de schéma suivent `07-deploiement-migrations.md` (expand/contract).
- Ne jamais afficher ni committer une clé. Si une clé a fuité : la signaler, demander à l'utilisateur de la révoquer/renouveler.

### Phase 5 : Prouver
- Écrire/lancer les tests de la phase 4 (voir `12-qualite-tests.md`) : concurrence (N requêtes parallèles), accès croisé (utilisateur A vs B, tenant A vs B), double envoi (même clé d'idempotence 5 fois), webhook rejoué.
- Relancer `scripts/audit.sh` et comparer avant/après.

## Format du rapport (à écrire dans `docs/audit-securite-AAAA-MM-JJ.md`)
```
# Audit : <projet> : <date>
## Résumé (3 lignes) + score global (A à E)
## Stack détectée
## Constats
| ID | Gravité | Fichier:ligne | Problème | Impact | Correctif | Statut |
## Corrigé dans cette session / À faire / Décisions à valider par l'utilisateur
## Tests ajoutés et commandes de vérification
## Risques résiduels
```
Être honnête : si une zone n'a pas pu être vérifiée (pas d'accès à la prod, pas de tests possibles), l'écrire.

## Définition de « terminé »
- [ ] Aucun P0 ouvert, P1 corrigés ou validés explicitement par l'utilisateur
- [ ] Argent/stock/votes : transaction atomique + idempotence + test de concurrence
- [ ] Contrôle d'accès testé avec deux utilisateurs (et deux tenants si multi-tenant)
- [ ] Secrets hors du code, `.env` ignoré, historique git vérifié
- [ ] Migrations réversibles, plan de rollback écrit
- [ ] Logs + alertes + sauvegarde restaurable testée
- [ ] Rapport d'audit écrit, risques résiduels listés

## Communication avec l'utilisateur
Parler en français simple. Expliquer chaque faille avec une phrase concrète (« n'importe quel utilisateur connecté pouvait lire les commandes des autres »). Demander validation avant tout changement irréversible.
