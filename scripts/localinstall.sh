#!/usr/bin/env bash
# Install zwire into /Applications, live now (macOS, unsigned local install).
#
# The heavy 325MB base bundle lives under ~/.zwire/base and is launched by
# bin/zwire with a dedicated profile + the fixed extension set (new-tab,
# zpwrchrome, hud-internal). A raw copy of that bundle into /Applications would
# launch as bare Chromium — no profile, no cyberpunk new-tab, no HUD. So instead
# we install a small LAUNCHER-WRAPPER zwire.app whose executable execs THIS
# checkout's bin/zwire: double-clicking it in /Applications opens the real zwire
# (profile + extensions + HUD) exactly like `pnpm start`.
set -euo pipefail
cd "$(dirname "$0")/.."
export APP_TITLE="ZWIRE" APP_SUB="// chromium, rebranded"
source scripts/cyberpunk.sh

ROOT="$(pwd)"
LAUNCHER="$ROOT/bin/zwire"
ICON="$ROOT/branding/zwire.icns"
VERSION="$(python3 -c 'import json;print(json.load(open("package.json"))["version"])')"
DEST="/Applications/zwire.app"

cyber_banner
cyber_status "OPERATION" "LOCALINSTALL // deploy to /Applications"
echo

cyber_section "PRE-FLIGHT"
if [[ "$(uname -s)" != "Darwin" ]]; then
  cyber_fail "localinstall is macOS-only (/Applications .app deploy)"
  exit 1
fi
if [[ ! -x "$LAUNCHER" ]]; then
  cyber_fail "missing launcher: $LAUNCHER"
  exit 1
fi
cyber_ok "launcher // $LAUNCHER"

# Ensure the base browser exists so the wrapper has something to launch.
STATE=${ZWIRE_STATE:-$HOME/.zwire}
if [[ ! -f "$STATE/base.path" ]]; then
  cyber_warn "no base browser yet — building …"
  bash scripts/build.sh >/dev/null || { cyber_fail "base build failed"; exit 1; }
fi
cyber_ok "base browser present"
echo

cyber_section "BUILD WRAPPER .app"
command rm -rf "$DEST"
mkdir -p "$DEST/Contents/MacOS" "$DEST/Contents/Resources"

# Executable: exec this checkout's launcher (LaunchServices passes no args).
cat > "$DEST/Contents/MacOS/zwire" <<EOF
#!/bin/bash
# zwire launcher wrapper — installed by scripts/localinstall.sh.
# Opens the zwire browser (profile + extensions + HUD) via the repo launcher.
exec "$LAUNCHER" "\$@"
EOF
chmod +x "$DEST/Contents/MacOS/zwire"
cyber_ok "executable -> $LAUNCHER"

# Icon.
if [[ -f "$ICON" ]]; then
  cp "$ICON" "$DEST/Contents/Resources/zwire.icns"
  cyber_ok "icon // branding/zwire.icns"
else
  cyber_warn "branding/zwire.icns not found — no custom icon"
fi

# PkgInfo + Info.plist.
printf 'APPL????' > "$DEST/Contents/PkgInfo"
cat > "$DEST/Contents/Info.plist" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key><string>zwire</string>
  <key>CFBundleDisplayName</key><string>zwire</string>
  <key>CFBundleExecutable</key><string>zwire</string>
  <key>CFBundleIdentifier</key><string>com.menketechnologies.zwire</string>
  <key>CFBundleIconFile</key><string>zwire</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleShortVersionString</key><string>${VERSION}</string>
  <key>CFBundleVersion</key><string>${VERSION}</string>
  <key>LSMinimumSystemVersion</key><string>10.15</string>
  <key>NSHighResolutionCapable</key><true/>
</dict>
</plist>
EOF
cyber_ok "Info.plist // v${VERSION}"
echo

cyber_section "SEAL + REGISTER"
# Ad-hoc sign so Gatekeeper/LaunchServices accept the fresh bundle, then refresh
# the LaunchServices icon/name cache so the Dock shows the cyberpunk icon now.
codesign --force --sign - "$DEST" 2>/dev/null && cyber_ok "ad-hoc signed" \
  || cyber_warn "ad-hoc sign failed (icon may lag)"
LSREGISTER=/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister
[[ -x "$LSREGISTER" ]] && "$LSREGISTER" -f "$DEST" >/dev/null 2>&1 && cyber_ok "LaunchServices registered" || true
touch "$DEST"
echo
cyber_line

SIZE=$(du -sh "$DEST" | awk '{print $1}')
cyber_ok "installed // ${SIZE} // $DEST"
cyber_tagline "ZWIRE DEPLOYED. LAUNCH FROM /Applications."
