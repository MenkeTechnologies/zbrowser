#!/usr/bin/env bash
# Clean + build. Ported from the sibling script set (adapted to the zip package).
set -euo pipefail
cd "$(dirname "$0")/.."
export APP_TITLE="ZWIRE HUD" APP_SUB="// the cyberpunk HUD extension"
source scripts/cyberpunk.sh

cyber_banner
cyber_status "OPERATION" "REBUILD // clean + build"
echo

cyber_section "CLEAN"
command rm -rf dist
cyber_ok "dist/ purged"
echo

cyber_section "BUILD"
cyber_line
bash scripts/build.sh
