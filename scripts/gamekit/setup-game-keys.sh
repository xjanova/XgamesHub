#!/usr/bin/env bash
# Give game repos their own deploy key into XMAN GAMES HUB (usage: id:Repo ...).
#   xjanova/XNova         -> /play/xnova/
#   xjanova/XNova-Breaker -> /play/breaker/
#   xjanova/TheOne        -> /play/theone/
# Per game: a new ed25519 key that can ONLY rsync into its own play/<id> folder
# (rrsync -wo -munge), proven to refuse a shell, stored as that repo's
# DEPLOY_* secrets, then deleted from this machine.
set -euo pipefail
cd "$(dirname "$0")"

ADMIN_KEY="$HOME/.ssh/thaiprompt_admin"
HOST="${XGH_HOST:?set XGH_HOST to the origin server IP (kept out of this public repo)}"
ROOT=/home/admin/domains/xmangameshub.online/public_html/play
[ -s xgh_known_hosts ] || ssh-keyscan -t ed25519 "$HOST" > xgh_known_hosts 2>/dev/null
ssh-keygen -lf xgh_known_hosts | grep -q "SHA256:gjB6mR0eu8RqxRtZKJAQtV4PpQzSOf1cg7VG8Nozm1I" \
  || { echo "host key fingerprint does not match — stopping" >&2; exit 1; }

ssh -i "$ADMIN_KEY" -o BatchMode=yes "admin@$HOST" \
  'cp -p ~/.ssh/authorized_keys ~/.ssh/authorized_keys.bak-xgh-games-$(date +%Y%m%d%H%M%S)'

[ $# -gt 0 ] || { echo "usage: $0 id:Repo [id:Repo ...]" >&2; exit 2; }
for pair in "$@"; do
  id="${pair%%:*}"; repo="xjanova/${pair##*:}"; key="xgh_game_$id"
  echo "== $id ($repo)"
  rm -f "$key" "$key.pub"
  ssh-keygen -q -t ed25519 -N "" -C "xgh-game-$id-deploy" -f "$key"
  line="restrict,command=\"/usr/bin/rrsync -wo -munge $ROOT/$id\" $(cat "$key.pub")"
  printf '%s\n' "$line" | ssh -i "$ADMIN_KEY" -o BatchMode=yes "admin@$HOST" \
    "mkdir -p '$ROOT/$id' && chmod 755 '$ROOT/$id'; if grep -q 'xgh-game-$id-deploy' ~/.ssh/authorized_keys; then sed -i '/xgh-game-$id-deploy/d' ~/.ssh/authorized_keys; fi; cat >> ~/.ssh/authorized_keys; echo '   key installed'"
  out=$(ssh -i "$key" -o IdentitiesOnly=yes -o BatchMode=yes -o UserKnownHostsFile=xgh_known_hosts \
          -o StrictHostKeyChecking=yes "admin@$HOST" "echo SHELL-OPEN" 2>&1 || true)
  if printf '%s' "$out" | grep -q SHELL-OPEN; then echo "   !! key opened a shell — stopping" >&2; exit 1; fi
  echo "   shell refused: $(printf '%s' "$out" | head -1)"
  gh secret set DEPLOY_HOST -R "$repo" -b "$HOST"
  gh secret set DEPLOY_USER -R "$repo" -b admin
  gh secret set DEPLOY_SSH_KEY -R "$repo" < "$key"
  gh secret set DEPLOY_KNOWN_HOSTS -R "$repo" < xgh_known_hosts
  rm -f "$key"
  echo "   secrets set, private key removed"
done
echo "done"
