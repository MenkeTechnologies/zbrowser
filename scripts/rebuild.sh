#!/usr/bin/env bash
# Clean + build: remove the installed wrapper, then re-assemble the browser
# bundle (fetch base if needed + rebrand). Ported from the sibling script set.
set -euo pipefail
cd "$(dirname "$0")/.."
export APP_TITLE="ZWIRE" APP_SUB="// chromium, rebranded"
source scripts/cyberpunk.sh

cyber_banner
cyber_status "OPERATION" "REBUILD // clean + build"
echo

cyber_section "CLEAN"
command rm -rf /Applications/zwire.app dist
cyber_ok "wrapper + dist/ purged"
echo

cyber_section "BUILD"
cyber_line
bash scripts/build.sh
