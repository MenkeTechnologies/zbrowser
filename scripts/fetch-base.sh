#!/usr/bin/env bash
# fetch-base.sh — download the base browser for zbrowser.
#
# Uses Chrome for Testing (CfT): a real Chromium/Blink build that still honors
# the --load-extension command-line switch (removed from *branded* Chrome in
# 137, kept in Chromium/CfT). This is what lets zbrowser preload zpwrchrome.
#
#   scripts/fetch-base.sh [VERSION]
#
# VERSION defaults to the current stable channel. The resolved binary path is
# written to $ZBROWSER_STATE/base.path (read by bin/zbrowser); the version is
# recorded in base.version for reproducibility.
set -euo pipefail

STATE=${ZBROWSER_STATE:-$HOME/.zbrowser}
BASE_DIR=$STATE/base
mkdir -p "$BASE_DIR"

# Host platform -> CfT platform id.
os=$(uname -s); arch=$(uname -m)
case "$os/$arch" in
  Darwin/arm64)          PLAT=mac-arm64 ;;
  Darwin/x86_64)         PLAT=mac-x64 ;;
  Linux/x86_64|Linux/amd64) PLAT=linux64 ;;
  *) echo "fetch-base: unsupported platform $os/$arch" >&2; exit 1 ;;
esac

VERSION=${1:-}
if [[ -z $VERSION ]]; then
  VERSION=$(curl -fsSL "https://googlechromelabs.github.io/chrome-for-testing/LATEST_RELEASE_STABLE")
fi
[[ -n $VERSION ]] || { echo "fetch-base: could not resolve version" >&2; exit 1; }

URL="https://storage.googleapis.com/chrome-for-testing-public/${VERSION}/${PLAT}/chrome-${PLAT}.zip"
ZIP=$STATE/chrome-${PLAT}.zip

echo "fetch-base: downloading Chrome for Testing ${VERSION} (${PLAT})" >&2
curl -fSL --progress-bar "$URL" -o "$ZIP"

rm -rf "${BASE_DIR:?}/chrome-${PLAT}"
unzip -q -o "$ZIP" -d "$BASE_DIR"
rm -f "$ZIP"

# Resolve the executable inside the extracted tree.
case "$PLAT" in
  mac-*)  BIN=$(find "$BASE_DIR/chrome-${PLAT}" -type f -path '*Contents/MacOS/*' -name 'Google Chrome for Testing' | head -1) ;;
  linux64) BIN="$BASE_DIR/chrome-${PLAT}/chrome" ;;
esac

[[ -n ${BIN:-} && -x $BIN ]] || { echo "fetch-base: binary not found after unzip" >&2; exit 1; }

printf '%s\n' "$BIN"     > "$STATE/base.path"
printf '%s\n' "$VERSION" > "$STATE/base.version"
echo "fetch-base: installed -> $BIN" >&2
