# 01. Concurrence : dernier ticket, stock, votes, compteurs

## Le problème
Deux requêtes lisent « 1 ticket disponible », les deux écrivent « vendu ». Le code `if (stock > 0) { stock--; }` n'est **pas** sûr dès qu'il y a plus d'un serveur, ou même plusieurs requêtes concurrentes.

## Règle d'or
Laisser **la base de données** arbitrer, avec une opération atomique. Jamais « lire en JS puis écrire ».

## Solutions (du plus simple au plus avancé)

### A. UPDATE conditionnel atomique (recommandé par défaut)
```sql
UPDATE tickets
SET status='reserved', reserved_by=$1, reserved_until=now() + interval '10 minutes'
WHERE id=$2 AND status='available';
-- rowCount = 1 → gagné ; rowCount = 0 → déjà pris
```
Pour un stock numérique :
```sql
UPDATE products SET stock = stock - $qty WHERE id=$1 AND stock >= $qty;
```
+ contrainte `CHECK (stock >= 0)` en filet de sécurité.

### B. Verrou de ligne
```sql
BEGIN;
SELECT * FROM tickets WHERE id=$1 FOR UPDATE;   -- bloque les concurrents
-- vérifier puis modifier
COMMIT;
```
`FOR UPDATE SKIP LOCKED` pour distribuer des éléments à des workers sans attente.

### C. Verrouillage optimiste
Colonne `version`. `UPDATE ... SET ..., version=version+1 WHERE id=$1 AND version=$2`. Si 0 ligne → conflit → recharger/réessayer ou refuser.

### D. Contrainte d'unicité = arbitre
`UNIQUE (event_id, seat_no)`, `UNIQUE (user_id, contest_id, round)` pour « un vote par personne ». L'erreur de violation est le signal « déjà pris ».

### E. Verrou distribué (Redis, etc.)
Seulement en complément, avec expiration et jeton de fencing. Ne remplace pas A/B/C/D.

## Réservation avec paiement (le gagnant échoue à payer)
Machine à états : `available → reserved(TTL) → sold` (ou retour `available`).
1. Réserver atomiquement (A) avec expiration (10 min).
2. Lancer le paiement avec une clé d'idempotence (voir 02).
3. Succès (confirmé par webhook vérifié) → `sold`.
4. Échec/annulation/expiration → libérer (`available`). Un job planifié libère les réservations expirées ; la libération doit aussi être conditionnelle (`WHERE status='reserved' AND reserved_until < now()`).
5. Option : file d'attente / liste d'attente pour le suivant.
6. L'utilisateur voit un message clair (« Plus disponible » / « Réservé pour vous 10 min »).

## Compteurs chauds (votes, likes, vues)
- Écrire en **append-only** (table `votes`, une ligne par vote) et agréger en lecture ou via un compteur incrémenté atomiquement (`SET n = n + 1`), jamais `n = valeurLue + 1`.
- Très forte charge : compteur Redis `INCR` + persistance périodique ; ou sharder le compteur.

## Interblocage (deadlock)
Toujours verrouiller les lignes dans le même ordre (par id croissant). Prévoir une relance automatique sur erreur de deadlock/serialization.

## Niveaux d'isolation
`READ COMMITTED` suffit avec A/B/D. Utiliser `SERIALIZABLE` + relance si logique complexe multi-lignes.

## Anti-patterns à signaler
- `findOne` puis `update` séparés sur stock/solde/places
- Vérification de disponibilité côté front uniquement
- Compteur incrémenté depuis la valeur lue
- Absence de `UNIQUE` sur « une seule fois par utilisateur »
- Tâche planifiée qui peut tourner deux fois en parallèle sans verrou

## Test à écrire
Lancer 50 requêtes parallèles sur 1 ticket / 10 de stock : exactement 1 / 10 succès, stock final ≥ 0, aucune exception non gérée.
