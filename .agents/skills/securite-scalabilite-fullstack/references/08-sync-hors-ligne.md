# 08. Plusieurs appareils, mode hors ligne, conflits

## Le problème
Deux téléphones hors ligne modifient la même donnée (budget 500 → 300 et 500 → 700). Au retour du réseau, qui gagne ? **Jamais d'écrasement silencieux.**

## Choisir la stratégie selon la donnée
| Type de donnée | Stratégie |
|---|---|
| Argent, soldes, stock | **Ne pas synchroniser l'état, synchroniser des opérations** (« dépense de 20 », « +5 en stock ») stockées en journal ajout-seul ; le solde se recalcule |
| Champ simple (budget, nom) | Version de base + détection de conflit, puis choix utilisateur ou règle explicite |
| Texte collaboratif | CRDT / OT (Yjs, Automerge) |
| Listes/ensembles | Fusion par union avec identifiants uniques, marqueurs de suppression (tombstones) |
| Préférences peu critiques | Dernier écrit gagne (LWW) **avec horloge serveur**, documenté |

## Détection de conflit (verrouillage optimiste)
- Chaque enregistrement a `version` (ou `updated_at` serveur).
- Le client envoie `base_version` avec sa modification.
- Serveur : si `base_version` ≠ version courante → **`409 Conflict`** avec valeur serveur ; ne pas écraser.
- Interface : proposer « Garder ma version / Garder l'autre / Fusionner » avec historique.

## Règles
- **Horloge du serveur** pour l'ordre, jamais l'heure du téléphone (modifiable, décalée).
- Chaque opération client porte un **identifiant unique** (UUID) : la synchro est idempotente (rejouer ne duplique pas).
- File d'envoi locale persistante, avec retries et backoff.
- Historique/audit des changements (qui, quand, ancienne → nouvelle valeur) pour pouvoir expliquer et annuler.
- Suppressions logiques (`deleted_at`) pendant la fenêtre de synchro.
- Les actions **financières critiques** (paiement, vente en caisse) : acceptées hors ligne seulement si l'on tolère le risque, avec numéro de ticket local unique, réconciliation à la reconnexion, plafonds hors ligne.

## Cas d'un point de vente (caisse) hors ligne
Numérotation locale par appareil (`device_id` + compteur), ventes envoyées comme opérations, stock réconcilié à la reconnexion avec alerte en cas de stock négatif, jamais de suppression silencieuse de vente.

## Tests
Simuler deux clients hors ligne, modifier la même donnée, reconnecter : conflit détecté, aucune perte, résultat explicable.
