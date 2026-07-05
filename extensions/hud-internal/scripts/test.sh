#!/usr/bin/env bash
# HUD extension test runner: JS syntax gate (node --check across every source +
# page script) plus a byte-compile of the Python native host. There is no Rust
# subsystem here — kept lean for parity with the sibling script set.
set -uo pipefail
cd "$(dirname "$0")/.."
export APP_TITLE="ZWIRE HUD" APP_SUB="// the cyberpunk HUD extension"
source scripts/cyberpunk.sh

cyber_banner
cyber_status "OPERATION" "TEST // syntax gate"
echo

FAIL=0

cyber_section "JS SUBSYSTEM (node --check)"
START=$(date +%s)
JS_TOTAL=0; JS_BAD=0
while IFS= read -r f; do
  JS_TOTAL=$((JS_TOTAL + 1))
  if ! node --check "$f" 2>/tmp/zwire-hud-check.$$; then
    JS_BAD=$((JS_BAD + 1)); FAIL=1
    echo -e "  ${R}✗${N} $f"
    command sed 's/^/      /' /tmp/zwire-hud-check.$$ | head -3
  fi
done < <(command find . -name '*.js' \
           -not -path './node_modules/*' -not -path './lib/zgui-core/*' \
           -not -path './dist/*' -not -path './.git/*')
command rm -f /tmp/zwire-hud-check.$$
echo -e "  ${D}checked${N} ${W}${JS_TOTAL}${N}  ${D}bad${N} ${R}${JS_BAD}${N}  ${D}// $(( $(date +%s) - START ))s${N}"
[[ "$JS_BAD" == "0" ]] && cyber_ok "JS nominal" || cyber_fail "JS compromised"
echo

cyber_section "NATIVE HOST (python compile)"
if command -v python3 >/dev/null 2>&1; then
  if python3 -m py_compile native/hud_host.py 2>/tmp/zwire-hud-py.$$; then
    cyber_ok "hud_host.py compiles"
  else
    FAIL=1; cyber_fail "hud_host.py failed to compile"
    command sed 's/^/    /' /tmp/zwire-hud-py.$$ | head -5
  fi
  command rm -f /tmp/zwire-hud-py.$$
else
  cyber_warn "python3 not found — skipping host compile"
fi
echo
cyber_line

if [[ "$FAIL" == "0" ]]; then
  cyber_tagline "ALL SYSTEMS NOMINAL."
else
  cyber_tagline "TESTS COMPROMISED."
fi
exit "$FAIL"
