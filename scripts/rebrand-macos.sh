#!/usr/bin/env bash
# rebrand-macos.sh — rebrand the downloaded base browser bundle in place so the
# Dock, ⌘-Tab switcher, and menu bar show "zbrowser" with the cyberpunk icon
# instead of "Google Chrome for Testing".
#
# This edits only the local base bundle under $ZBROWSER_STATE/base — it never
# touches a system Chrome install. Re-run after fetch-base.sh upgrades the base.
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/.." && pwd)
STATE=${ZBROWSER_STATE:-$HOME/.zbrowser}
BASE_PATH_FILE=$STATE/base.path
ICON=$ROOT/branding/zbrowser.icns
NAME=zbrowser

[[ -f $BASE_PATH_FILE ]] || { echo "rebrand: no base installed — run fetch-base.sh" >&2; exit 1; }
BIN=$(cat "$BASE_PATH_FILE")
APP=${BIN%/Contents/MacOS/*}          # .../zbrowser-or-chrome.app
PLIST=$APP/Contents/Info.plist
[[ -f $PLIST ]] || { echo "rebrand: Info.plist not found at $PLIST" >&2; exit 1; }

pb() { /usr/libexec/PlistBuddy -c "$1" "$PLIST"; }
set_key() { pb "Set :$1 $2" 2>/dev/null || pb "Add :$1 string $2"; }

set_key CFBundleName        "$NAME"
set_key CFBundleDisplayName "$NAME"

# Swap the app icon (keep the bundle's existing icon filename so the plist
# reference stays valid).
if [[ -f $ICON ]]; then
  ICONFILE=$(pb "Print :CFBundleIconFile" 2>/dev/null || echo app.icns)
  case "$ICONFILE" in *.icns) ;; *) ICONFILE="$ICONFILE.icns" ;; esac
  cp "$ICON" "$APP/Contents/Resources/$ICONFILE"
fi

# Refresh the Finder/Dock icon cache for this bundle.
touch "$APP"
echo "rebrand: $APP -> $NAME" >&2
