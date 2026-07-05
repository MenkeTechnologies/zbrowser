#!/usr/bin/env bash
# Purge build artifacts: the /Applications wrapper .app and any staged dist/.
# Deliberately does NOT touch the 325MB base snapshot or your profile under the
# app-data dir — that is what `nuke` is for. Ported from the sibling script set.
cd "$(dirname "$0")/.." || exit 1
export APP_TITLE="ZWIRE" APP_SUB="// chromium, rebranded"
source scripts/cyberpunk.sh
source scripts/state-dir.sh

DEST="/Applications/zwire.app"
STATE=${ZWIRE_STATE:-$(zwire_default_state)}

cyber_banner
cyber_status "OPERATION" "CLEAN // remove installed wrapper"
echo

cyber_section "DESTROYING ARTIFACTS"
if [[ -d "$DEST" ]]; then
  command rm -rf "$DEST"
  cyber_ok "removed // $DEST"
else
  cyber_warn "no wrapper at $DEST"
fi
command rm -rf dist
cyber_ok "dist/ purged"
cyber_warn "base snapshot + profile under $STATE preserved (use nuke to wipe)"

cyber_tagline "ARTIFACTS WIPED. BASE INTACT."
cyber_line
