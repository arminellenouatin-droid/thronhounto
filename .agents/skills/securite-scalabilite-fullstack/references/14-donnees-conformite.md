# 14. Données personnelles et conformité (bases)

Ce n'est pas un avis juridique : les lois varient selon les pays des utilisateurs (RGPD pour les résidents UE, lois nationales de protection des données en Afrique, etc.). Faire valider par un juriste.

## Principes techniques
- **Minimisation** : ne collecter que le nécessaire ; supprimer ce qui ne sert plus.
- **Consentement et information** : politique de confidentialité claire, CGU, consentement cookies/traceurs si applicable, finalité précise.
- **Droits des personnes** : pouvoir exporter et supprimer les données d'un utilisateur (procédure + fonction).
- **Durées de conservation** définies (logs, comptes inactifs, factures), purge automatique.
- **Chiffrement** en transit (HTTPS) et au repos (base, sauvegardes) ; chiffrement applicatif des champs très sensibles (pièces d'identité, numéros).
- **Pseudonymisation** dans les logs et analyses.
- **Accès** : moindre privilège, journal d'accès aux données sensibles, comptes nominatifs.
- **Sous-traitants** (hébergeur, paiement, email, IA, analytics) : liste tenue à jour, données envoyées minimales.
- **Mineurs** : vérifier si le service peut les concerner ; protections renforcées.
- **Notification d'incident** : procédure en cas de fuite (qui prévenir, délais légaux).

## Données sensibles typiques dans les projets
Pièces d'identité/KYC, numéros de téléphone, localisation, données familiales (arbres généalogiques, filiations), contenus privés (messagerie), données financières (transactions, soldes), photos. Ces données exigent isolation stricte (05), chiffrement et journal d'accès.

## Messagerie et contenus privés
Accès limité aux participants, pas de lecture par l'équipe sans motif tracé, signalement/modération avec procédure, suppression effective à la demande.
