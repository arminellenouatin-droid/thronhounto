# 09. IA fiable : empêcher l'invention (hallucinations)

## Le problème
Une IA répond avec assurance en citant un article de loi inexistant. Dans un domaine à risque (droit, santé, finance), c'est dangereux.

## Architecture recommandée
1. **RAG (recherche puis réponse)** : l'IA répond **uniquement à partir de sources récupérées** dans un corpus fiable et versionné (textes officiels, base interne), pas de sa mémoire.
2. **Citations obligatoires** : chaque affirmation juridique/factuelle cite un identifiant de source (`[doc_id#passage]`).
3. **Vérification après génération** (vérificateur déterministe) : extraire toutes les références citées (articles, lois, URLs, dates) et **les confronter à l'index**. Référence introuvable → supprimer l'affirmation, régénérer ou refuser.
4. **Séparation visible** dans la réponse :
   - `Vérifié` : repris d'une source citée,
   - `Interprétation` : analyse de l'IA, signalée comme telle,
   - `Non établi` : ce que les sources ne permettent pas de conclure.
5. **Abstention** : si la recherche ne trouve rien de suffisamment pertinent (seuil de score) ou si les sources se contredisent, répondre « Je ne peux pas répondre de façon fiable » + orienter vers un professionnel/source officielle.
6. **Second passage « vérificateur »** : un second appel (ou une règle de contrôle) compare réponse et sources et note le niveau de support ; en dessous d'un seuil → refus.
7. Sorties **structurées** (JSON validé par schéma) pour pouvoir contrôler automatiquement.
8. Température basse, consignes explicites (« n'invente jamais de référence »).
9. **Relecture humaine** pour les cas à fort enjeu ; avertissement clair (« information, pas un conseil juridique »).

## Sécurité spécifique IA
- **Injection de prompt** : le contenu récupéré ou saisi par l'utilisateur est une *donnée*, jamais des instructions ; ne pas donner à l'IA des outils dangereux (suppression, paiement) sans validation humaine/serveur.
- Clé API **côté serveur uniquement**, jamais dans le navigateur.
- **Limites de coût** : quota par utilisateur, rate limit, plafond mensuel, taille maximale d'entrée/sortie.
- Données personnelles : ne pas envoyer plus que nécessaire au fournisseur ; informer l'utilisateur.
- Journaliser question, sources, réponse, score (sans données sensibles superflues) pour audit et amélioration.
- Assainir la sortie avant affichage (XSS).

## Évaluation continue
Jeu de questions de référence (dont pièges : article inexistant, question hors corpus) rejoué à chaque changement de modèle/prompt ; mesurer taux de références invalides (objectif 0), taux d'abstention correcte.

## Anti-patterns
- Laisser le modèle répondre « de mémoire » sur le droit/la santé/les finances
- Afficher une citation sans l'avoir vérifiée dans le corpus
- Pas d'option « je ne sais pas »
- Clé API de l'IA dans le code front
