#!/usr/bin/env bash
# install.sh — put `zbrowser` on PATH, fetch the base browser, and (macOS)
# rebrand the base bundle's Dock name + icon in place.
#
#   scripts/install.sh [--bindir DIR]
#
# Idempotent: safe to re-run after a base upgrade.
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/.." && pwd)
BINDIR=${HOME}/.local/bin
while [[ $# -gt 0 ]]; do
  case $1 in
    --bindir) BINDIR=$2; shift 2 ;;
    *) echo "install: unknown arg $1" >&2; exit 1 ;;
  esac
done

# 1. base browser
if [[ ! -f ${ZBROWSER_STATE:-$HOME/.zbrowser}/base.path ]]; then
  "$ROOT/scripts/fetch-base.sh"
fi

# 2. launcher on PATH
mkdir -p "$BINDIR"
ln -sf "$ROOT/bin/zbrowser" "$BINDIR/zbrowser"
echo "install: linked $BINDIR/zbrowser" >&2
case ":$PATH:" in
  *":$BINDIR:"*) ;;
  *) echo "install: add $BINDIR to PATH to use \`zbrowser\`" >&2 ;;
esac

# 3. macOS: rebrand the running app's Dock presence
if [[ $(uname -s) == Darwin ]]; then
  "$ROOT/scripts/rebrand-macos.sh" || true
fi

echo "install: done — run \`zbrowser\`" >&2
