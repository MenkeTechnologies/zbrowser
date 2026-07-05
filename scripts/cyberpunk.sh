#!/usr/bin/env bash
# // CYBERPUNK WRAPPER // shared styling for all scripts (ported from Audio-Haxor).
# Generic banner (no per-app ASCII): set APP_TITLE / APP_SUB before sourcing.

C='\033[1;36m'  # cyan
M='\033[1;35m'  # magenta
G='\033[1;32m'  # green
R='\033[1;31m'  # red
Y='\033[1;33m'  # yellow
D='\033[0;90m'  # dim
W='\033[1;37m'  # white
N='\033[0m'

APP_TITLE="${APP_TITLE:-ZWIRE}"
APP_SUB="${APP_SUB:-// chromium, rebranded}"

cyber_banner() {
  echo
  echo -e " ${C}▓▓▓ ${W}${APP_TITLE}${C} ▓▓▓${N}"
  echo -e " ${M}${APP_SUB}${N}"
}

cyber_status() {
  local label="$1" msg="$2"
  echo -e " ${D}┌──────────────────────────────────────────────────────┐${N}"
  echo -e " ${D}│${N} ${W}${label}:${N} ${C}${msg}${N}"
  echo -e " ${D}└──────────────────────────────────────────────────────┘${N}"
}

cyber_section() {
  echo -e "  ${D}── ${C}$1${D} ─────────────────────────────────────${N}"
}

cyber_line() {
  echo -e " ${D}░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░${N}"
}

cyber_ok() {
  echo -e "  ${G}[DONE]${N} ${D}// $1${N}"
}

cyber_fail() {
  echo -e "  ${R}[FAIL]${N} ${D}// $1${N}"
}

cyber_warn() {
  echo -e "  ${Y}[WARN]${N} ${D}// $1${N}"
}

cyber_tagline() {
  echo
  echo -e "  ${C}>>> $1 <<<${N}"
  echo
}
