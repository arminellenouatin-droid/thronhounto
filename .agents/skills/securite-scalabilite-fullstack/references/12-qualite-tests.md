# 12. Qualité, tests et performance

## Tests qui comptent le plus ici
1. **Concurrence** : N requêtes parallèles sur stock/ticket/solde/vote ; résultat exact (voir 01).
2. **Idempotence** : même requête/webhook rejoué plusieurs fois ; effet unique (02).
3. **Accès croisé** : utilisateur A vs B, tenant A vs B, non connecté, rôle insuffisant (05).
4. **Crash simulé** entre deux étapes d'une opération financière (03).
5. **Migrations** : appliquer sur copie de base ; ancienne version du code continue de fonctionner (07).
6. **E2E** (Playwright) des parcours critiques : inscription, connexion, paiement, vote, achat.
7. **Charge** (k6/Artillery) sur les routes chaudes ; seuil p95 documenté.

## Pipeline CI (portes de qualité)
lint → typecheck (TypeScript `strict`) → tests unitaires/intégration → audit des dépendances → scan de secrets → build → déploiement préprod → smoke tests. Rouge = pas de production.

## Hygiène de code
- Types stricts, validation de schéma aux frontières, pas de `any` sur les flux d'argent.
- Un seul module d'accès aux données et un seul module de paiement (pas de logique d'argent éparpillée).
- Gestion d'erreurs explicite (pas de `catch {}` vide), erreurs métier typées.
- Revue de code obligatoire pour tout ce qui touche paiement, auth, droits.
- Configuration par environnement, pas de valeurs en dur.

## Performance front et SEO (sites publics, magazines, landing pages)
- Core Web Vitals : LCP < 2,5 s, CLS < 0,1, INP < 200 ms. Images modernes (WebP/AVIF), dimensions fixes, chargement différé, polices optimisées.
- Rendu statique/ISR pour contenus publics, cache CDN.
- Métadonnées, balises Open Graph, sitemap, `robots.txt`, données structurées.
- Accessibilité de base : contrastes, textes alternatifs, navigation clavier, libellés de formulaires.
- Mobile d'abord : pages légères (réseaux lents, forfaits data limités).
