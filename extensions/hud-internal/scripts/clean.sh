#!/usr/bin/env bash
# Purge build artifacts (dist/ zips + python bytecode caches). Ported from the
# sibling script set; adapted for a Chrome extension (no cargo target dir).
cd "$(dirname "$0")/.."
export APP_TITLE="ZWIRE HUD" APP_SUB="// the cyberpunk HUD extension"
source scripts/cyberpunk.sh

cyber_banner
cyber_status "OPERATION" "CLEAN // purge build artifacts"
echo

cyber_section "DESTROYING CACHES"
BEFORE=$(du -sh dist 2>/dev/null | awk '{print $1}' || echo "0B")
command rm -rf dist
command find . -name '__pycache__' -type d -not -path './lib/zgui-core/*' \
  -exec rm -rf {} + 2>/dev/null || true
cyber_ok "freed ${BEFORE} // dist/ + __pycache__"

cyber_tagline "MEMORY WIPED. READY FOR FRESH BUILD."
cyber_line
