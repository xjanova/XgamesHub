#!/usr/bin/env bash
# Upload the playable web demos to https://xgameshub.xman4289.com/play/<id>/.
#
# The demos are NOT in this repo on purpose: XgamesHub (and xmanstudio, which
# serves the hub's build) are public repositories, and the game sources are not.
# Their source of truth is the game folder next to this repo:
#   ../XNova  -> /play/xnova/
#   ../TheOne -> /play/theone/
# The hub deploy (xmanstudio `sites/`) syncs without --delete, so /play/ is
# never touched by it.
#
# usage: bash scripts/deploy-demos.sh [xnova|theone ...]   (default: both)
# env:   DEPLOY_KEY  (default ~/.ssh/thaiprompt_admin)
#        DEPLOY_HOST (default admin@123.253.62.251)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
KEY="${DEPLOY_KEY:-$HOME/.ssh/thaiprompt_admin}"
HOST="${DEPLOY_HOST:-admin@123.253.62.251}"
WEBROOT="/home/admin/domains/xgameshub.xman4289.com/public_html/play"

declare -A SRC=([xnova]="XNova" [theone]="TheOne")
ids=("$@")
[ ${#ids[@]} -eq 0 ] && ids=(xnova theone)

for id in "${ids[@]}"; do
  dir="$ROOT/${SRC[$id]:?unknown demo $id}"
  [ -f "$dir/index.html" ] || { echo "missing $dir/index.html" >&2; exit 1; }
  echo "→ $id from $dir"
  # Ship only what the browser loads: no tools, notes or art sources.
  tar -C "$dir" -czf - --exclude='./tools' --exclude='./README.md' --exclude='*.py' \
      --exclude='./art_src' --exclude='./art-src' index.html manifest.webmanifest css js assets \
    | ssh -i "$KEY" -o BatchMode=yes "$HOST" \
        "set -e; tmp=\$(mktemp -d); tar -C \"\$tmp\" -xzf -; mkdir -p '$WEBROOT'; \
         rm -rf '$WEBROOT/$id.old'; [ -d '$WEBROOT/$id' ] && mv '$WEBROOT/$id' '$WEBROOT/$id.old'; \
         mv \"\$tmp\" '$WEBROOT/$id'; chmod 755 '$WEBROOT/$id'; find '$WEBROOT/$id' -type d -exec chmod 755 {} +; \
         find '$WEBROOT/$id' -type f -exec chmod 644 {} +; rm -rf '$WEBROOT/$id.old'; du -sh '$WEBROOT/$id'"
done
