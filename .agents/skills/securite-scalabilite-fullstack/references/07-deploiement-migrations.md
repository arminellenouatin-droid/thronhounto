# 07. Déploiement et migrations sans interruption

## Le problème
Pendant le déploiement, ancienne et nouvelle version tournent **en même temps** sur la même base. Une migration brutale casse l'une des deux.

## Principe : expand / contract (changement parallèle)
Exemple : renommer ou retyper une colonne critique.
1. **Expand** : ajouter la nouvelle colonne/table (nullable ou avec valeur par défaut), sans rien retirer. Ancienne version intacte.
2. **Déployer** du code qui **écrit dans les deux** (ancienne + nouvelle) et lit l'ancienne (ou l'une avec repli sur l'autre).
3. **Backfill** : copier les données existantes **par lots** (ex. 1 000 lignes, pause entre lots), idempotent et reprenable.
4. **Basculer la lecture** vers la nouvelle colonne, surveiller.
5. **Contract** (déploiement ultérieur, après stabilité) : arrêter d'écrire l'ancienne, puis la supprimer.
Jamais « ajout + suppression + nouveau code » dans la même mise en production.

## Règles de migration sûres (Postgres)
- Index : `CREATE INDEX CONCURRENTLY` (hors transaction).
- Contraintes : ajouter `NOT VALID` puis `VALIDATE CONSTRAINT` séparément ; `NOT NULL` via contrainte `CHECK ... NOT VALID` puis validation.
- Éviter les verrous longs : définir `lock_timeout` et `statement_timeout` sur les migrations, relancer en cas d'échec.
- Pas de `ALTER COLUMN TYPE` bloquant sur grosse table : passer par nouvelle colonne + backfill.
- Chaque migration versionnée, relue, testée sur une **copie/branche** de la base avant la prod.

## Retour arrière (rollback)
- Chaque déploiement a un plan de retour écrit : revenir à la version précédente du code (rollback instantané de l'hébergeur) **fonctionne parce que** la migration est rétro-compatible.
- Sauvegarde/point de restauration juste avant toute migration risquée.
- Données supprimées = irrécupérables : différer les suppressions, archiver avant.

## Déploiement progressif
- **Feature flags** : le code nouveau est déployé désactivé, activé progressivement (1 % → 10 % → 100 %).
- Canary / blue-green si disponible ; surveiller erreurs et latence pendant le palier.
- API : versionnage ou compatibilité ascendante ; anciens clients mobiles/onglets ouverts continuent de fonctionner.
- Tâches planifiées et workers : compatibles ancienne **et** nouvelle structure pendant la transition.

## Environnements
Dev / préprod / prod séparés (bases et clés distinctes). Variables d'environnement par environnement. Déploiement prod uniquement depuis la branche principale, après CI verte.

## CI/CD minimale
lint + typecheck + tests + audit dépendances + scan de secrets → déploiement préprod → vérifications (smoke tests) → prod.

## Anti-patterns
- Migration manuelle en prod sans sauvegarde
- `DROP COLUMN` dans la même release que le code qui ne l'utilise plus
- Backfill en une seule requête géante
- Même base pour dev et prod
- Pas de moyen de revenir en arrière
