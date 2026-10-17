# 10. Systèmes distribués : deux régions, une panne réseau

## Le problème
Serveurs en Afrique et en Europe, liaison coupée ; le même solde de 1 000 € est retiré des deux côtés. Théorème CAP : pendant une partition on choisit **cohérence (C)** ou **disponibilité (A)**.

## Pour l'argent : choisir la cohérence (CP)
Mieux vaut **refuser temporairement** une opération que créer de l'argent ou la perdre. Justification à écrire (ADR, « décision d'architecture ») : risque financier et légal > inconfort de l'utilisateur.

## Options, de la plus simple à la plus complexe
1. **Un seul écrivain** (recommandé pour la plupart des projets) : une base primaire dans une région ; les autres régions lisent (réplicas) et envoient leurs écritures vers la primaire. Si la liaison tombe, les retraits sont refusés dans la région isolée, les lectures continuent (avec mention « données possiblement non à jour »).
2. **Propriétaire par compte** (sharding géographique) : chaque compte a une région « maison » qui arbitre ses écritures ; les autres régions relaient.
3. **Consensus** (Raft/Paxos : bases distribuées type CockroachDB, Spanner, etcd) : un quorum valide chaque écriture ; la minorité isolée refuse.
4. **Disponibilité contrôlée (AP borné)** : chaque région reçoit une **allocation** (ex. peut dépenser jusqu'à X du solde, partagé à l'avance) ; au-delà, refus. Risque borné + réconciliation après la panne. À réserver aux cas où l'indisponibilité est inacceptable.

## Règles
- Opérations **idempotentes** avec identifiants uniques (02), pour rejouer sans danger après la panne.
- Ne pas se fier aux horloges de plusieurs machines pour décider d'un ordre ; utiliser un séquenceur/versions/jetons de fencing.
- Détecter la partition (health checks, timeouts) et basculer en **mode dégradé documenté** (retraits suspendus, consultation seule).
- **Réconciliation** après rétablissement : comparer journaux, signaler anomalies, jamais fusion silencieuse.
- Éviter les transactions distribuées à deux phases entre régions ; préférer saga (03).
- Tester la panne (chaos test simple : couper la liaison en préprod).

## Pour un projet hébergé sur un seul fournisseur/région
Rester en **une base d'écriture** + CDN/cache pour la distribution ; n'introduire le multi-région que sur besoin avéré (latence, conformité, résilience).
