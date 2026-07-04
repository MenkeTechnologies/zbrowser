```
 _________  ____   _____        ______  _____ ____  
|__  / __ )|  _ \ / _ \ \      / / ___|| ____|  _ \ 
  / /|  _ \| |_) | | | \ \ /\ / /\___ \|  _| | |_) |
 / /_| |_) |  _ <| |_| |\ V  V /  ___) | |___|  _ < 
/____|____/|_| \_\\___/  \_/\_/  |____/|_____|_| \_\
```

[![Manifest](https://img.shields.io/badge/base-chromium-05d9e8.svg)](#0x01-architecture)
[![Extensions](https://img.shields.io/badge/preloaded-zpwrchrome-ff2a6d.svg)](https://github.com/MenkeTechnologies/zpwrchrome)
[![Theme](https://img.shields.io/badge/theme-cyberpunk-d300c5.svg)](theme/)
[![Docs](https://img.shields.io/badge/docs-online-05d9e8.svg)](https://menketechnologies.github.io/zbrowser/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### `[CHROMIUM — REBRANDED — CYBERPUNK]`

> *"Chrome, with my own branding and my own extensions."*

zbrowser is a **Chromium/Blink browser, rebranded** — the `zpwrchrome` power-tool,
a cyberpunk chrome theme, and a cyberpunk new-tab page preloaded on every launch,
running against a dedicated profile so it never touches your system Chrome.

## `[0x00] WHY A REAL BLINK BASE`

`zpwrchrome` is a Manifest V3 extension that needs `userScripts`,
`declarativeNetRequestWithHostAccess`, `nativeMessaging`, `webRequest`, and a
service-worker background (`minimum_chrome_version: 127`). None of that runs on
WebKit (Tauri/Safari) or Servo — **only a real Chromium engine loads it.** So
zbrowser is built on Chromium, not a from-scratch shell.

The base is **[Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/)**
(CfT), a genuine Chromium build. This matters for one specific reason: the
`--load-extension` command-line switch — the mechanism that preloads
`zpwrchrome` — [was removed from *branded* Chrome in version 137][psa] but is
**kept in Chromium and CfT**. Stock Google Chrome can no longer be scripted this
way; CfT can.

[psa]: https://groups.google.com/a/chromium.org/g/chromium-extensions/c/1-g8EFx2BBY/m/S0ET5wPjCAAJ

## `[0x01] ARCHITECTURE`

Runtime rebrand — no source fork, nothing to compile:

| Layer | What it is |
|---|---|
| **Base** | Chrome for Testing (pinned stable), downloaded by `scripts/fetch-base.sh` |
| **Rebrand** | `scripts/rebrand-macos.sh` patches the base bundle's Dock name to `zbrowser` + cyberpunk `.icns` |
| **Theme** | `theme/` — a Chrome theme extension mapping the HUD palette onto frame / toolbar / tabs |
| **New tab** | `newtab/` — a `chrome_url_overrides.newtab` extension: neon clock, omnibox, quick-launch tiles |
| **Power-tool** | `extensions/zpwrchrome` — the MV3 extension, loaded as a submodule (reuse, not copy) |
| **Launcher** | `bin/zbrowser` — starts the base against `~/.zbrowser/profile` with all three extensions |

Why not fork Chromium source? A solo-maintained Chromium **source** fork means
re-merging security patches against a codebase that changes daily — the trap that
keeps Brave and ungoogled-chromium team-sized. The runtime rebrand delivers
"Chrome with my branding and extensions" and upgrades by swapping one binary.

## `[0x02] INSTALL`

```sh
git clone --recurse-submodules https://github.com/MenkeTechnologies/zbrowser.git
cd zbrowser
scripts/install.sh          # fetch base + link `zbrowser` on PATH + rebrand (macOS)
zbrowser                    # launch
```

`install.sh` downloads the CfT base into `~/.zbrowser/base`, symlinks
`bin/zbrowser` into `~/.local/bin`, and on macOS rebrands the base bundle's Dock
name and icon in place. Re-run after a base upgrade.

## `[0x03] USAGE`

```sh
zbrowser                         # open with the cyberpunk new tab
zbrowser https://github.com      # open a url
zbrowser --incognito             # any Chromium flag is passed through
```

State lives under `$ZBROWSER_STATE` (default `~/.zbrowser`):

| Path | Purpose |
|---|---|
| `base/` | the Chrome for Testing binary |
| `base.path` / `base.version` | resolved binary + pinned version |
| `profile/` | the dedicated user-data-dir (bookmarks, history, sessions) |

Override the base with `ZBROWSER_BASE=/path/to/chromium zbrowser`.

## `[0x04] UPDATING THE BASE`

```sh
scripts/fetch-base.sh                 # latest stable CfT
scripts/fetch-base.sh 150.0.7871.46   # pin an exact version
scripts/rebrand-macos.sh              # re-apply the rebrand after the swap
```

## `[0x05] NOTES`

- **Native messaging:** `zpwrchrome`'s `pass` and segmented-download features
  need its native host installed — see the
  [zpwrchrome](https://github.com/MenkeTechnologies/zpwrchrome) setup.
- **Developer-mode banner:** unpacked extensions loaded via `--load-extension`
  show Chromium's developer-extensions notice. It is cosmetic; the extensions
  run fully.
- **Cross-platform:** the `zbrowser` launcher works on macOS (aarch64/x64) and
  Linux (x86_64). The in-place Dock rebrand is macOS-only; on Linux the launcher
  name is the brand.

## `[0x06] LICENSE`

MIT — see [LICENSE](LICENSE).
