#!/usr/bin/env bash
# Upload the playable web demos to https://xgameshub.xman4289.com/play/<id>/.
#
# The demos are NOT in this repo on purpose: XgamesHub (and xmanstudio) are
# public repositories, and the game sources are not. Their source of truth is
# the game folder next to this repo:
#   ../XNova          -> /play/xnova/
#   ../XNova Breaker  -> /play/breaker/
#   ../TheOne         -> /play/theone/
# The hub deploy excludes /play/ (and the xmanstudio sites sync has no
# --delete), so a hub release never touches the demos.
#
# usage: bash scripts/deploy-demos.sh [xnova|breaker|theone ...]   (default: all)
# env:   DEPLOY_KEY  (default ~/.ssh/thaiprompt_admin)
#        DEPLOY_HOST (default admin@123.253.62.251)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
KEY="${DEPLOY_KEY:-$HOME/.ssh/thaiprompt_admin}"
HOST="${DEPLOY_HOST:-admin@123.253.62.251}"
WEBROOT="/home/admin/domains/xgameshub.xman4289.com/public_html/play"

declare -A SRC=([xnova]="XNova" [breaker]="XNova Breaker" [theone]="TheOne")
ids=("$@")
[ ${#ids[@]} -eq 0 ] && ids=(xnova breaker theone)

for id in "${ids[@]}"; do
  dir="$ROOT/${SRC[$id]:?unknown demo $id}"
  [ -f "$dir/index.html" ] || { echo "missing $dir/index.html" >&2; exit 1; }
  echo "→ $id from $dir"
  # Ship only what the browser loads: no tools, notes, launchers or art sources.
  parts=()
  for p in index.html manifest.webmanifest css js assets; do
    [ -e "$dir/$p" ] && parts+=("$p")
  done
  tar -C "$dir" -czf - --exclude='*.py' "${parts[@]}" \
    | ssh -i "$KEY" -o BatchMode=yes "$HOST" \
        "set -e; tmp=\$(mktemp -d); tar -C \"\$tmp\" -xzf -; mkdir -p '$WEBROOT'; \
         rm -rf '$WEBROOT/$id.old'; [ -d '$WEBROOT/$id' ] && mv '$WEBROOT/$id' '$WEBROOT/$id.old'; \
         mv \"\$tmp\" '$WEBROOT/$id'; chmod 755 '$WEBROOT/$id'; find '$WEBROOT/$id' -type d -exec chmod 755 {} +; \
         find '$WEBROOT/$id' -type f -exec chmod 644 {} +; rm -rf '$WEBROOT/$id.old'; du -sh '$WEBROOT/$id'"
done
