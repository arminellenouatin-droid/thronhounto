# 03. Résilience : crash en plein transfert, commande incohérente

## Cas 1 : un serveur tombe entre le débit de A et le crédit de B
**Solution : une seule transaction de base de données.** Débit + crédit + écriture au journal dans le même `BEGIN ... COMMIT`. Si le serveur tombe, tout est annulé (rollback), rien n'est perdu.
```sql
BEGIN;
-- verrouiller dans l'ordre des ids (évite les deadlocks)
SELECT id FROM accounts WHERE id IN ($a,$b) ORDER BY id FOR UPDATE;
UPDATE accounts SET balance = balance - $amt WHERE id=$a AND balance >= $amt;
-- vérifier rowCount = 1 sinon ROLLBACK (solde insuffisant)
UPDATE accounts SET balance = balance + $amt WHERE id=$b;
INSERT INTO ledger_entries (transfer_id, account_id, amount, direction) VALUES ...;
COMMIT;
```
+ clé d'idempotence sur le transfert (02) pour qu'un retry ne le rejoue pas.

## Journal comptable (ledger) à double entrée
- Table `ledger_entries` **en ajout seulement** (jamais d'UPDATE/DELETE) : chaque mouvement = 2 lignes (débit/crédit) dont la somme vaut 0.
- Le solde = somme des écritures (ou cache vérifié régulièrement contre la somme).
- Une correction = une écriture inverse, jamais une modification.
- Job de **réconciliation** quotidien : somme des soldes = somme des dépôts − retraits ; alerter sinon.

## Cas 2 : plusieurs services indépendants (paiement, stock, commande)
Pas de transaction possible entre services : utiliser **saga + outbox**.

### Ordre robuste
1. Créer la commande en `pending` (trace durable **avant** tout effet).
2. Réserver le stock (avec expiration, voir 01).
3. Initier le paiement (idempotent).
4. Webhook `paid` → commande `confirmed`, stock définitif. Échec/expiration → **compensation** : libérer stock, commande `cancelled`.

### Outbox
Écrire l'événement à publier **dans la même transaction** que le changement d'état (table `outbox`), un worker le publie ensuite (au moins une fois) ; les consommateurs sont **idempotents**.

### Reprise après crash
Un worker de réconciliation reprend les états intermédiaires bloqués (`pending` > X minutes) : interroge le prestataire, termine ou compense. Le client qui a payé sans commande est impossible si la commande `pending` existe avant le paiement.

## Retries
Backoff exponentiel + jitter, plafond de tentatives, **dead-letter queue** + alerte pour les cas qui échouent toujours. Timeout sur chaque appel externe.

## Anti-patterns
- Plusieurs écritures dépendantes sans transaction
- Appeler un service externe *à l'intérieur* d'une transaction de base ouverte (verrous longs)
- Effet de bord irréversible (email, débit) avant l'enregistrement durable de l'intention
- Mettre à jour un solde directement sans journal

## Tests
Simuler un crash entre deux étapes (lever une exception après le débit) : état final cohérent, pas d'argent perdu, retry sans double exécution.
