# 15. Checklist avant mise en production

## Argent et données critiques
- [ ] Opérations d'argent/stock/votes : transactions atomiques, idempotence, tests de concurrence
- [ ] Webhooks : signature vérifiée, événements dédupliqués, re-vérification serveur à serveur
- [ ] Journal comptable ajout-seul + réconciliation planifiée
- [ ] Aucune valeur sensible (prix, rôle, solde) acceptée du client

## Accès
- [ ] Contrôle d'accès testé (A vs B, tenant A vs B, non connecté)
- [ ] RLS/isolation tenant actifs, clé `service_role` jamais côté client
- [ ] Admin : rôle + 2FA + journal d'audit
- [ ] Liste blanche de champs modifiables

## Sécurité
- [ ] Secrets hors du code/bundle/historique git ; clés de test ≠ clés de prod
- [ ] CSP + HSTS + en-têtes ; HTTPS forcé
- [ ] Rate limiting + anti-bot sur login, inscription, OTP, vote, paiement
- [ ] Uploads contrôlés (type, taille, privé, URLs signées)
- [ ] `npm audit`/scan de secrets sans critique

## Scalabilité
- [ ] Index et pagination ; pas de N+1 sur routes chaudes
- [ ] Pooler de connexions configuré
- [ ] Cache/CDN actifs ; pages publiques statiques
- [ ] Tâches lourdes en file ; plafonds de coût et alertes de budget
- [ ] Test de charge réalisé, objectif chiffré

## Exploitation
- [ ] Logs structurés, suivi d'erreurs, alertes, supervision uptime
- [ ] Sauvegardes automatiques **restauration testée**
- [ ] Plan de rollback écrit ; migrations rétro-compatibles
- [ ] Runbooks (paiement bloqué, clé compromise, base saturée)
- [ ] Environnements dev/préprod/prod séparés

## Conformité
- [ ] Politique de confidentialité/CGU, consentement si besoin
- [ ] Export/suppression des données utilisateur possible
- [ ] Conservation et purge définies
