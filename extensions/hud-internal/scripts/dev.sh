#!/usr/bin/env bash
# Dev loop for the HUD extension. A Chrome extension has no compile step — "dev"
# means: make sure the native host is installed, then load the folder unpacked.
# Chrome hot-reloads page assets on save; press the reload icon on chrome://extensions
# only after editing background.js / manifest.json.
set -euo pipefail
cd "$(dirname "$0")/.."
export APP_TITLE="ZWIRE HUD" APP_SUB="// the cyberpunk HUD extension"
source scripts/cyberpunk.sh

EXT_DIR="$(pwd)"

cyber_banner
cyber_status "OPERATION" "DEV // native host + load unpacked"
echo

cyber_section "NATIVE HOST"
bash scripts/localinstall.sh | command sed -n '/DEPLOY/,/HOST LIVE/p' | command grep -E '\[DONE\]|\[WARN\]' || true
cyber_ok "native host synced (see: pnpm localinstall)"
echo

cyber_section "LOAD UNPACKED"
cyber_line
echo
echo -e "  ${W}1.${N} open ${C}chrome://extensions${N}"
echo -e "  ${W}2.${N} toggle ${C}Developer mode${N} (top-right)"
echo -e "  ${W}3.${N} click ${C}Load unpacked${N} and select:"
echo -e "        ${W}${EXT_DIR}${N}"
echo -e "  ${W}4.${N} after editing ${D}background.js / manifest.json${N}, hit the"
echo -e "        ${C}reload ⟳${N} icon on the extension card"
echo
cyber_line
cyber_tagline "DEV SESSION READY."
