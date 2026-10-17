#!/usr/bin/env bash
# Scanner rapide de signaux de risque. Heuristique : chaque résultat est à vérifier à la main.
# Usage : bash audit.sh [dossier-du-projet]
ROOT="${1:-.}"
cd "$ROOT" || { echo "Dossier introuvable : $ROOT"; exit 1; }

EXC='--exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next --exclude-dir=dist --exclude-dir=build --exclude-dir=coverage --exclude-dir=.vercel --exclude=*.lock --exclude=package-lock.json --exclude=pnpm-lock.yaml --exclude=*.min.js --exclude=*.map'
SRC='--include=*.js --include=*.jsx --include=*.ts --include=*.tsx --include=*.mjs --include=*.cjs --include=*.py --include=*.php --include=*.sql --include=*.json --include=*.env* --include=*.yml --include=*.yaml'
TOTAL=0

scan() { # titre gravité regex [options grep]
  local title="$1" sev="$2" re="$3"; shift 3
  local out
  out=$(grep -rnIE $EXC $SRC "$@" -e "$re" . 2>/dev/null | grep -v "audit.sh" | head -15)
  if [ -n "$out" ]; then
    local n; n=$(echo "$out" | wc -l)
    TOTAL=$((TOTAL+n))
    echo; echo "[$sev] $title"; echo "$out"
  fi
}

echo "=== Audit rapide : $(pwd) ==="

# Secrets
scan "Clé/secret apparemment codé en dur" P0 "(api[_-]?key|secret|token|passwd|password|private[_-]?key)[\"' ]*[:=][ ]*[\"'][A-Za-z0-9_\-\/+=]{16,}[\"']" -i
scan "Clé connue (formats courants)" P0 "(sk_live_[0-9A-Za-z]{10,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_\-]{30,}|ghp_[0-9A-Za-z]{30,}|xox[baprs]-[0-9A-Za-z-]{10,}|-----BEGIN (RSA |EC )?PRIVATE KEY-----|eyJhbGciOi[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,})"
scan "Variable publique contenant un secret probable" P0 "(NEXT_PUBLIC|VITE|REACT_APP|EXPO_PUBLIC)_[A-Z0-9_]*(SECRET|SERVICE_ROLE|PRIVATE|PASSWORD)"
scan "service_role utilisé (vérifier : serveur uniquement)" P0 "service_role|SERVICE_ROLE"

# Fichiers sensibles suivis par git
if [ -d .git ]; then
  T=$(git ls-files 2>/dev/null | grep -E '(^|/)\.env($|\.)|\.pem$|id_rsa|\.p12$|serviceAccount.*\.json$' | grep -vE '\.example$|\.sample$')
  if [ -n "$T" ]; then echo; echo "[P0] Fichiers sensibles suivis par git (clés à révoquer si poussés)"; echo "$T"; TOTAL=$((TOTAL+1)); fi
fi
if [ -f .gitignore ]; then grep -qE '^\.env' .gitignore || { echo; echo "[P0] .gitignore sans règle .env"; TOTAL=$((TOTAL+1)); }
else echo; echo "[P1] Pas de .gitignore"; TOTAL=$((TOTAL+1)); fi

# Injection / exécution
scan "SQL construit par concaténation/template (injection possible)" P0 "(query|execute|raw|\\\$queryRawUnsafe|\\\$executeRawUnsafe)\(?[^;]*(\+ *[a-zA-Z_.]+|\\$\{[^}]+\})[^;]*(SELECT|INSERT|UPDATE|DELETE)|(SELECT|INSERT|UPDATE|DELETE)[^;\"'\`]*[\"'\`] *\+"
scan "queryRawUnsafe / executeRawUnsafe" P0 "(queryRawUnsafe|executeRawUnsafe)"
scan "eval / new Function / exec" P1 "(\beval\(|new Function\(|child_process|execSync\(|\bexec\()"
scan "Rendu HTML brut (XSS possible)" P1 "(dangerouslySetInnerHTML|\.innerHTML *=|v-html|document\.write\()"

# Crypto / auth
scan "Hash faible (MD5/SHA1) pour mots de passe/jetons" P1 "(createHash\(['\"](md5|sha1)['\"]\)|md5\(|sha1\()"
scan "Aléatoire non sûr pour jeton/code" P1 "Math\.random\(\)"
scan "Vérification TLS désactivée" P0 "(rejectUnauthorized *: *false|NODE_TLS_REJECT_UNAUTHORIZED|verify *= *False)"
scan "JWT : vérification absente ou algorithme 'none'" P0 "(jwt\.decode\(|algorithms? *: *\[?['\"]none)"
scan "Jeton/session dans localStorage" P2 "localStorage\.(setItem|getItem)\([^)]*(token|jwt|session|auth)"

# Réseau / CORS
scan "CORS ouvert à tous" P1 "(Access-Control-Allow-Origin['\"]?[:,] *['\"]\*|origin *: *['\"]\*['\"]|cors\(\))"
scan "URL http:// non chiffrée" P2 "['\"]http://[^l'\"][^'\"]*['\"]"

# Identité venant du client (IDOR / mass assignment)
scan "userId lu depuis le corps/la requête (IDOR possible)" P1 "(req\.body|body|params|searchParams)[\.\[]['\"]?(user_?[iI]d|owner_?[iI]d|account_?[iI]d|role|is_?admin|balance)"
scan "Mass assignment possible (corps passé tel quel à la base)" P1 "(create|update|insert|upsert)\(\{? *(data *: *)?(req\.body|body|await request\.json\(\))"

scan "userId/rôle/solde extrait du corps de la requête (déstructuration)" P1 "\{[^}]*(user_?[iI]d|owner_?[iI]d|account_?[iI]d|role|is_?admin|balance)[^}]*\} *= *(await +)?(req\.body|body|request\.json\(\)|params|searchParams)"
scan "Prix/montant extrait du corps de la requête (déstructuration)" P0 "\{[^}]*(price|amount|total|montant|prix)[^}]*\} *= *(await +)?(req\.body|body|request\.json\(\)|params|searchParams)"

# Montants et argent
scan "Prix/montant venant du client" P0 "(req\.body|body|searchParams|params)[\.\[]['\"]?(price|amount|total|montant|prix)"
scan "Flottants pour l'argent" P2 "parseFloat\([^)]*(price|amount|total|montant|prix|balance)"

# Concurrence : lecture puis écriture
scan "Décrément de stock/solde non atomique (lire puis écrire)" P1 "(stock|balance|solde|quantity|credits?) *(=|-=|\+=) *[a-zA-Z_.]*(stock|balance|solde|quantity|credits?)[a-zA-Z_.]* *[-+]"

# Webhooks
scan "Webhook sans trace de vérification de signature (à vérifier)" P1 "(webhook|callback|notify)[a-zA-Z/_-]*" --include=*route.ts --include=*route.js --include=*.php

# Débogage / fuites
scan "console.log de données sensibles" P2 "console\.(log|info|debug)\([^)]*(password|token|secret|apiKey|authorization|card)"
scan "Mode debug activé" P2 "(DEBUG *= *(True|true|1)|app\.debug *= *True|APP_DEBUG *= *true)"

# Dépendances
if [ -f package.json ] && command -v npm >/dev/null 2>&1 && [ -f package-lock.json ]; then
  echo; echo "[info] npm audit (résumé)"; npm audit --omit=dev 2>/dev/null | tail -8
else
  echo; echo "[info] Lancer 'npm audit' ou 'pnpm audit' manuellement pour les dépendances."
fi

echo; echo "=== Signaux relevés : $TOTAL (heuristique, vérifier chacun) ==="
echo "Rappel : ce script ne remplace ni la revue manuelle ni les tests de concurrence/accès (voir SKILL.md)."
