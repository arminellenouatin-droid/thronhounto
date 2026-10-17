# 06. Sécurité applicative (OWASP et au-delà)

À fusionner avec les règles de sécurité déjà définies par l'utilisateur : en cas de conflit, la règle la plus stricte gagne.

## Secrets
- Variables d'environnement par environnement (dev/préprod/prod), jamais dans le code ni dans git. `.env*` dans `.gitignore`.
- Vérifier l'**historique git** (clé déjà commitée = clé compromise : la révoquer et la remplacer, ne pas seulement supprimer le fichier).
- Variables exposées au navigateur (`NEXT_PUBLIC_`, `VITE_`, etc.) : **uniquement des valeurs publiques**.
- Scanner les secrets en CI (gitleaks / trufflehog). Rotation périodique.
- Ne jamais coller une clé dans un prompt, un ticket, un log.

## Injection
- Requêtes **paramétrées** / ORM, jamais de concaténation de chaînes SQL.
- Pas d'`eval`, `exec`, `child_process` avec entrée utilisateur ; valider les noms de fichiers et chemins (path traversal).
- Valider toute entrée à la frontière (schémas zod/valibot) : type, longueur, format, bornes. Rejeter, ne pas « nettoyer ».

## XSS / contenu
- Échapper par défaut (frameworks modernes) ; **bannir** `dangerouslySetInnerHTML`/`innerHTML` sauf contenu assaini (DOMPurify).
- **CSP** stricte, `frame-ancestors` (anti clickjacking).
- Contenu riche (articles, commentaires) : assainir à l'écriture **et** à l'affichage.

## Authentification et sessions
- Mots de passe : argon2id ou bcrypt (coût adapté), jamais MD5/SHA1/SHA256 nus. Longueur minimale, vérification contre mots de passe fuités si possible.
- Cookies de session : `HttpOnly`, `Secure`, `SameSite=Lax/Strict`. Pas de jeton dans `localStorage` si évitable.
- JWT : algorithme imposé, expiration courte, refresh tokens révocables et rotatifs, vérification de signature **et** `aud`/`iss`.
- Limiter les tentatives de connexion (rate limit + verrouillage progressif), messages identiques (pas d'énumération d'emails).
- Réinitialisation : jeton aléatoire, usage unique, expiration courte, invalide les sessions.
- 2FA pour admin et pour retraits/actions financières.
- Code OTP/SMS : expiration, limite d'essais, limite d'envois (coût SMS !).

## CSRF, CORS, redirections
- CSRF : cookies `SameSite` + jeton CSRF pour actions à effet.
- CORS : liste blanche d'origines explicites, jamais `*` avec identifiants.
- Open redirect : valider les URLs de redirection (liste blanche).
- SSRF : si le serveur télécharge des URLs fournies, interdire IP privées/metadata, limiter les schémas.

## En-têtes et transport
HTTPS partout, HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, CSP. Cookies `Secure`.

## Rate limiting et abus (logique métier)
Limites par IP + compte + route sur : login, inscription, réinitialisation, OTP, paiement, vote, commentaires, recherche, envoi de messages. Anti-bot (Turnstile/hCaptcha) sur formulaires publics et votes. Détecter l'abus (multi-comptes, mêmes appareils, rafales).

## Uploads
Vérifier taille, type MIME **et** signature du fichier (magic bytes), renommer (jamais le nom d'origine), stocker hors du dossier web, bucket privé + URLs signées, retirer EXIF/GPS des images, limiter le nombre/jour. Jamais servir un upload avec son type déclaré sans contrôle.

## Dépendances
Verrouiller (`package-lock`), `npm audit` / Dependabot / Renovate, retirer les paquets inutiles, relire les nouvelles dépendances (typosquatting), épingler les versions des scripts CDN (+ SRI).

## Erreurs et logs
Pas de stack trace ni de message SQL côté client ; message générique + identifiant d'erreur. Ne jamais journaliser mots de passe, jetons, numéros de carte/téléphone en clair.

## Webhooks entrants
Signature vérifiée, horodatage + anti-rejeu, secret par fournisseur, liste d'IP si disponible.

## Administration
Panel admin sur chemin non évident **et** protégé réellement (rôle + 2FA + journal d'audit), actions sensibles (suppression, remboursement, export) avec confirmation et trace.

## Checklist rapide
- [ ] Aucun secret dans le dépôt ni le bundle client
- [ ] Requêtes paramétrées partout
- [ ] CSP + en-têtes de sécurité actifs
- [ ] Rate limit sur les routes sensibles
- [ ] Validation de schéma à chaque entrée
- [ ] Uploads contrôlés et privés
- [ ] `npm audit` sans critique ouverte
- [ ] Journal d'audit des actions admin/financières
