#!/usr/bin/env bash
# Cache-bust frontend assets — N/A for hud-internal: the pages load their assets
# by bare relative path (no ?v= query signatures), and Chrome reloads unpacked
# page assets on save, so there is nothing to rotate. Kept for parity with the
# sibling script set.
cd "$(dirname "$0")/.."
export APP_TITLE="ZWIRE HUD" APP_SUB="// the cyberpunk HUD extension"
source scripts/cyberpunk.sh

cyber_banner
cyber_status "OPERATION" "CACHE BUST // (no asset signatures)"
echo

cyber_section "BUSTING CACHE SIGNATURES"
cyber_warn "pages use bare relative asset paths — no ?v= signatures to rotate"
cyber_warn "reload the extension on chrome://extensions to pick up changes"

cyber_tagline "NOTHING TO ROTATE."
cyber_line
