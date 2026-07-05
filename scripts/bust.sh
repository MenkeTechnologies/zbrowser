#!/usr/bin/env bash
# Cache-bust the rebrand: macOS aggressively caches Dock/⌘-Tab icons + names by
# bundle, so after an icon/name change the old one can linger. This re-seals and
# re-registers both the base bundle and the /Applications wrapper with
# LaunchServices to force the cyberpunk icon + "zwire" name to refresh now.
set -euo pipefail
cd "$(dirname "$0")/.."
export APP_TITLE="ZWIRE" APP_SUB="// chromium, rebranded"
source scripts/cyberpunk.sh

cyber_banner
cyber_status "OPERATION" "CACHE BUST // refresh Dock icon cache"
echo

if [[ "$(uname -s)" != "Darwin" ]]; then
  cyber_warn "icon-cache bust is macOS-only — nothing to do"
  cyber_tagline "NOTHING TO ROTATE."
  exit 0
fi

LSREGISTER=/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister
STATE=${ZWIRE_STATE:-$HOME/.zwire}

cyber_section "BASE BUNDLE"
if [[ -f "$STATE/base.path" ]]; then
  BIN="$(cat "$STATE/base.path")"; APP="${BIN%/Contents/MacOS/*}"
  scripts/rebrand-macos.sh >/dev/null 2>&1 && cyber_ok "re-branded + re-signed // $APP" \
    || cyber_warn "rebrand refresh reported an issue"
else
  cyber_warn "no base installed — skipping"
fi
echo

cyber_section "/Applications WRAPPER"
if [[ -d /Applications/zwire.app ]]; then
  codesign --force --sign - /Applications/zwire.app 2>/dev/null || true
  [[ -x "$LSREGISTER" ]] && "$LSREGISTER" -f /Applications/zwire.app >/dev/null 2>&1 || true
  touch /Applications/zwire.app
  cyber_ok "re-registered // /Applications/zwire.app"
else
  cyber_warn "no /Applications wrapper (run: pnpm localinstall)"
fi
echo
cyber_line
cyber_tagline "ICON CACHE ROTATED."
