# 11. Observabilité et fiabilité d'exploitation

## Voir ce qui se passe
- **Logs structurés** (JSON) avec identifiant de corrélation par requête, niveau, utilisateur (pseudonymisé), durée. Pas de secrets ni de données sensibles.
- **Suivi des erreurs** (Sentry ou équivalent) avec alerte sur nouvelles erreurs et pics.
- **Métriques** : taux d'erreurs, latence p50/p95/p99, trafic, saturation (CPU, mémoire, connexions DB, file d'attente) + métriques métier (paiements réussis/échoués, votes/min, inscriptions).
- **Surveillance externe** (uptime) sur pages clés et endpoint `/health` (vérifie base + dépendances, sans fuite d'information).
- **Alertes actionnables** (paiements échoués en hausse, file bloquée, erreur 5xx > seuil, coût anormal) vers un canal surveillé.
- **Journal d'audit** (qui a fait quoi, quand) pour actions admin, financières, changements de rôle.

## Sauvegardes
- Sauvegardes automatiques + **restauration à un instant donné** (PITR) si disponible.
- **Tester la restauration** régulièrement (une sauvegarde jamais restaurée n'est pas une sauvegarde).
- Définir RPO (perte de données maximale acceptée) et RTO (durée d'indisponibilité maximale).
- Sauvegarde chiffrée, hors du compte principal si possible ; fichiers/médias inclus.

## Tolérance aux pannes
- Timeouts sur tout appel externe, retries avec backoff + jitter, **circuit breaker** pour dépendances instables.
- Dégradation gracieuse : si le service d'email/IA/paiement est lent, l'app reste utilisable et l'indique.
- Tâches planifiées : verrou pour éviter l'exécution double, supervision (alerte si elle ne s'exécute pas).
- Arrêt propre des workers (terminer ou remettre en file la tâche en cours).
- Limiter les services à coût variable (SMS, email, IA, stockage) par quotas et alertes de budget.

## Exploitation
- **Runbooks** courts : « le paiement ne se confirme pas », « la base sature », « clé compromise » (étapes, qui prévenir).
- Post-mortem sans blâme après incident : cause, correctif, action préventive.
- Page de statut si audience publique.
- Gestion des secrets : rotation documentée, accès limité, journalisé.
