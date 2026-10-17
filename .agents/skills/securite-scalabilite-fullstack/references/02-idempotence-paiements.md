# 02. Idempotence : le paiement fantôme

## Le problème
Réseau coupé, client qui reclique, retries automatiques : la même intention de paiement arrive 5 fois. Un seul débit doit avoir lieu.

## Mécanisme : clé d'idempotence
1. Le client génère un **UUID par intention** (au moment du clic, conservé pour tous les retries) et l'envoie (`Idempotency-Key`).
2. Table :
```sql
CREATE TABLE idempotency_keys (
  key text PRIMARY KEY,
  user_id uuid NOT NULL,
  request_hash text NOT NULL,
  status text NOT NULL CHECK (status IN ('in_progress','done','failed')),
  response jsonb,
  created_at timestamptz DEFAULT now()
);
```
3. Au début de la requête : `INSERT ... ON CONFLICT DO NOTHING`.
   - Insertion OK → traiter, puis enregistrer la réponse (`done`).
   - Clé existante + `done` → **renvoyer la réponse enregistrée**, sans retraiter.
   - Clé existante + `in_progress` → `409` (ou attendre), jamais un second traitement.
   - Même clé mais corps différent (`request_hash`) → `422`.
4. Portée : clé liée à l'utilisateur ; expiration 24-72 h.

## Côté prestataire de paiement
Transmettre aussi une clé d'idempotence / une **référence unique de transaction** générée par nous (unique en base). Ne jamais créer deux transactions pour le même panier.

## Côté interface
Désactiver le bouton après clic, afficher l'état « en cours », permettre de reprendre une transaction en attente plutôt que d'en recréer une.

## Webhooks (source de vérité du paiement)
- Vérifier la **signature** (secret partagé / HMAC) et rejeter sinon.
- Stocker `event_id` avec contrainte `UNIQUE` : un événement déjà vu est ignoré (répondre 200).
- Répondre vite (200), traiter en tâche de fond si lourd.
- Gérer les événements **dans le désordre** et **en double** (le statut ne recule jamais : `paid` ne repasse pas à `pending`).
- Re-vérifier le statut auprès du prestataire par appel serveur à serveur avant de créditer.
- Comparer **montant + devise** attendus avec ceux reçus.

## Argent : règles de modélisation
- Montants en **entiers** (plus petite unité ; XOF/XAF n'ont pas de décimales), jamais en `float`.
- Le prix vient de la base, pas du client.
- Cycle de vie explicite : `created → pending → paid | failed | expired | refunded`.
- Crédit (wallet, vote, ticket) déclenché **une seule fois** à la transition vers `paid`, dans la même transaction que le changement de statut.

## Anti-patterns
- Créditer au retour sur la page « succès » (le client peut falsifier ou ne jamais revenir)
- Webhook sans signature ni anti-rejeu
- Retry automatique sans clé d'idempotence
- Montant envoyé par le front

## Tests
Envoyer 5 fois la même requête (en parallèle) : 1 débit, 1 crédit. Rejouer un webhook 3 fois : 1 crédit. Webhook avec montant modifié : rejeté.
