#!/usr/bin/env bash
# Total annihilation: wipe every build artifact AND uninstall the native host
# from every Chrome-family browser, then rebuild + reinstall from scratch.
# Ported from the sibling script set.
set -uo pipefail
cd "$(dirname "$0")/.."
export APP_TITLE="ZWIRE HUD" APP_SUB="// the cyberpunk HUD extension"
source scripts/cyberpunk.sh

HOST_NAME="com.zwire.hud"

cyber_banner
cyber_status "OPERATION" "NUKE // wipe host + artifacts, reinstall"
echo

cyber_section "UNINSTALL NATIVE HOST"
if [[ "$(uname -s)" == "Darwin" ]]; then
  BASE="$HOME/Library/Application Support"
else
  BASE="$HOME/.config"
fi
removed=0
while IFS= read -r m; do
  command rm -f "$m" && { cyber_ok "removed // $m"; removed=$((removed + 1)); }
done < <(command find "$BASE" -type f -name "${HOST_NAME}.json" \
           -path '*/NativeMessagingHosts/*' 2>/dev/null)
[[ "$removed" == "0" ]] && cyber_warn "no installed host manifests found"
echo

cyber_section "CLEAN BUILD ARTIFACTS"
command rm -rf dist
command find . -name '__pycache__' -type d -not -path './lib/zgui-core/*' \
  -exec rm -rf {} + 2>/dev/null || true
cyber_ok "dist/ + __pycache__ destroyed"
echo

cyber_section "REBUILD FROM SCRATCH"
cyber_line
bash scripts/build.sh || { cyber_fail "build failed"; cyber_tagline "LAUNCH ABORTED"; exit 1; }
echo

cyber_section "REINSTALL NATIVE HOST"
cyber_line
bash scripts/localinstall.sh
cyber_tagline "NUCLEAR LAUNCH SUCCESSFUL"
