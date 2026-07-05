#!/usr/bin/env bash
# Dev loop: launch the zwire browser from this checkout (profile + new-tab +
# zpwrchrome + hud-internal loaded unpacked). Fetches the base snapshot on first
# run. Foreground — Ctrl-C to quit; edits to the extensions hot-reload, edits to
# a background.js need the reload ⟳ on chrome://extensions.
set -euo pipefail
cd "$(dirname "$0")/.."
export APP_TITLE="ZWIRE" APP_SUB="// chromium, rebranded"
source scripts/cyberpunk.sh

source scripts/state-dir.sh
STATE=${ZWIRE_STATE:-$(zwire_default_state)}

cyber_banner
cyber_status "OPERATION" "DEV // launch browser"
echo

cyber_section "BASE SNAPSHOT"
if [[ ! -f "$STATE/base.path" ]]; then
  cyber_warn "no base browser — fetching …"
  scripts/fetch-base.sh
fi
cyber_ok "base ready"
echo

cyber_section "LAUNCH"
cyber_line
cyber_ok "exec bin/zwire — Ctrl-C to quit"
echo
exec bin/zwire "$@"
