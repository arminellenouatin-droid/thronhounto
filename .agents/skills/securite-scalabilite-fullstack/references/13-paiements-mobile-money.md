# 13. Paiements Mobile Money, agrégateurs et cartes (contexte Afrique)

Les détails exacts (champs, signatures, codes de statut, frais) dépendent du prestataire (Orange Money, MTN MoMo, Moov, Wave, CinetPay, FedaPay, PayDunya, Flutterwave, Paystack, Stripe…) : **lire sa documentation officielle** et ne jamais deviner. Les principes ci-dessous sont communs.

## Flux sûr
1. Le client clique « Payer » → le **serveur** crée une transaction `pending` en base avec une **référence unique** (générée par nous) et le **montant lu en base** (jamais du client).
2. Le serveur appelle le prestataire (avec cette référence) et renvoie le lien/ordre de paiement.
3. Le client paie (redirection, USSD, application mobile).
4. Le prestataire notifie par **webhook/callback** → on vérifie la signature, puis on **re-vérifie** le statut par un appel serveur à serveur (API de vérification de transaction).
5. Si `paid` + montant + devise + référence conformes → transition `pending → paid` **une seule fois**, dans une transaction DB, et crédit de l'effet (vote, ticket, wallet, abonnement).
6. La page de retour (« merci ») n'est qu'un affichage : elle **n'accorde rien** ; elle lit l'état en base.

## Cas particuliers fréquents
- **Callback en retard, en double, jamais reçu** → job de réconciliation : interroger les transactions `pending` > N minutes (puis marquer `expired`/`failed` après un délai défini).
- **Client qui ferme l'application** en plein paiement ou dont le réseau coupe → l'état se règle via webhook/réconciliation, pas via le navigateur.
- **Paiement reçu après expiration** → règle claire (rembourser ou honorer) + alerte, jamais d'état silencieux.
- **Montant différent** (frais déduits, erreur) → ne pas créditer automatiquement : marquer « à vérifier ».
- **Devise** : XOF/XAF sans décimales, stocker en entiers ; ne jamais convertir côté client.
- **Numéros de téléphone** : normaliser (format international), valider avant envoi ; limiter les tentatives (coût et fraude).
- **Frais** : décider qui les supporte, les stocker séparément dans le journal.

## Wallet et retraits
- Le wallet est un **journal à double entrée** (03), pas une colonne `balance` modifiée à la main.
- Retrait : vérifier solde dans la transaction, créer la demande `pending`, **plafonds** par jour/montant, **validation manuelle** au-delà d'un seuil, 2FA, délai de sécurité après changement de numéro/mot de passe.
- Paiement sortant (payout) idempotent avec référence unique ; réconciliation avec le relevé du prestataire.
- Traçabilité complète (qui, quand, depuis quelle IP/appareil).

## Votes payants et compétitions
- Un vote = ligne **ajout-seul** liée à un paiement `paid` (ou à un crédit de vote consommé atomiquement).
- Anti-fraude : limiter par compte/appareil/IP selon règles du concours, détecter rafales et comptes jumeaux, bloquer l'auto-vote abusif, possibilité d'**annuler/invalider** des votes avec trace.
- Classement calculé depuis les votes validés, publié via cache (1-2 s), gel de clôture horodaté côté serveur.
- Transparence : règles publiées, audit possible.

## Tontines, cotisations, marketplace
- Chaque cotisation = écriture comptable liée à un cycle ; interdiction de payer deux fois le même cycle (contrainte d'unicité).
- Marketplace : **séquestre (escrow)** : l'argent reste bloqué jusqu'à confirmation de livraison ; litiges tracés.
- États explicites et irréversibles (pas de retour en arrière sans écriture inverse).

## Conformité financière (à valider avec un professionnel)
Selon l'activité, des obligations peuvent exister (agrément, KYC, lutte anti-blanchiment, déclaration). Le code doit permettre : identification de l'utilisateur à partir d'un seuil, plafonds, journal complet. **Ne pas lancer de service de monnaie électronique ou de collecte d'épargne sans avis juridique local.**
