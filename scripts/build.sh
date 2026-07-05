#!/usr/bin/env bash
# Assemble the zwire browser bundle: fetch the base Chromium snapshot if it is
# missing, then rebrand it in place (Dock name + cyberpunk icon). There is no
# compile step — zwire runs a prebuilt Blink base against a fixed extension set —
# so "build" == "make sure a rebranded base bundle exists and is current".
set -euo pipefail
cd "$(dirname "$0")/.."
export APP_TITLE="ZWIRE" APP_SUB="// chromium, rebranded"
source scripts/cyberpunk.sh

STATE=${ZWIRE_STATE:-$HOME/.zwire}
BASE_PATH_FILE="$STATE/base.path"

cyber_banner
cyber_status "OPERATION" "BUILD // assemble browser bundle"
echo

cyber_section "BASE SNAPSHOT"
if [[ ! -f "$BASE_PATH_FILE" ]]; then
  cyber_warn "no base recorded — fetching …"
  scripts/fetch-base.sh
fi
BIN="$(cat "$BASE_PATH_FILE")"
APP="${BIN%/Contents/MacOS/*}"
if [[ ! -d "$APP" ]]; then
  cyber_warn "recorded base missing — refetching …"
  scripts/fetch-base.sh
  BIN="$(cat "$BASE_PATH_FILE")"; APP="${BIN%/Contents/MacOS/*}"
fi
cyber_ok "base // $APP"
echo

cyber_section "REBRAND"
if [[ "$(uname -s)" == "Darwin" ]]; then
  scripts/rebrand-macos.sh || cyber_warn "rebrand reported a non-fatal issue"
  cyber_ok "Dock name + icon applied"
else
  cyber_warn "rebrand is macOS-only — skipped"
fi
echo
cyber_line

if [[ -d "$APP" ]]; then
  SIZE=$(du -sh "$APP" | awk '{print $1}')
  cyber_ok "browser ready // ${SIZE} // $APP"
  cyber_tagline "BUILD COMPLETE."
else
  cyber_fail "no browser bundle produced"
  exit 1
fi
