/* zwire HUD — feed the shared ZGui.powerline (zgui-core) from chrome.storage,
 * replacing the bespoke zstatus.js. Top frame only. The native host writes
 * zb_sys (system stats) every ~2s and ztmux publishes zb_tmux (window/pane
 * segment + armed lamp); the theme lives in zb_scheme/zb_ui. This adapter maps
 * those chrome.storage keys onto ZGui.powerline's provider contract, and injects
 * the active scheme's CSS vars onto :root so the shared bar (which inherits the
 * host's live theme tokens) paints in the current scheme + light/dark. */
(function () {
  'use strict';
  if (window.top !== window) return;                 // top frame only, like zstatus.js

  var HUD = window.ZWIRE_HUD || {}, SCHEMES = HUD.SCHEMES || {}, VAR_KEYS = HUD.VAR_KEYS || [];
  // Light-mode neutral overrides (from zstatus.js) — merged when zb_ui.light is on.
  var LIGHT_VARS = { '--bg-primary': '#f0f2f5', '--bg-secondary': '#e4e7ec', '--bg-card': '#ffffff', '--bg-hover': '#f7f8fa', '--text': '#1e293b', '--text-dim': '#475569', '--text-muted': '#94a3b8', '--border': '#cbd5e1', '--border-glow': '#a5b4c8' };

  var schemeLabel = '', tmuxState = null;

  // Push the active scheme's vars onto :root so the shared powerline (and any
  // other zgui component) inherits the live theme, instead of the per-component
  // var injection zstatus/ztmux used.
  function applyScheme() {
    try {
      chrome.storage.local.get(['zb_scheme', 'zb_ui'], function (o) {
        void chrome.runtime.lastError;
        var name = (o && o.zb_scheme) || 'cyberpunk';
        var s = SCHEMES[name] || SCHEMES.cyberpunk || { vars: {} }, vars = {}, sv = s.vars || {}, k;
        for (k in sv) vars[k] = sv[k];
        if (o && o.zb_ui && o.zb_ui.light) for (k in LIGHT_VARS) vars[k] = LIGHT_VARS[k];
        var root = document.documentElement;
        for (var i = 0; i < VAR_KEYS.length; i++) if (vars[VAR_KEYS[i]]) root.style.setProperty(VAR_KEYS[i], vars[VAR_KEYS[i]]);
        schemeLabel = (SCHEMES[name] && SCHEMES[name].label) || name;
        reinit();   // re-run the scheme segment with the full provider set (never {} — that clears CFG)
      });
    } catch (e) {}
  }

  function sysStats() { return new Promise(function (res) { try { chrome.storage.local.get('zb_sys', function (o) { void chrome.runtime.lastError; res((o && o.zb_sys) || null); }); } catch (e) { res(null); } }); }
  function tmuxStatus() { return tmuxState; }
  function scheme() { return schemeLabel; }
  function reinit() { if (window.ZGui && ZGui.powerline && ZGui.powerline.init) ZGui.powerline.init({ sig: 'ZW', sysStats: sysStats, tmuxStatus: tmuxStatus, scheme: scheme }); }

  function boot() {
    if (!window.ZGui || !ZGui.powerline) return;
    applyScheme();
    reinit();
    try {
      chrome.storage.local.get(['zb_tmux', 'zb_status'], function (o) {
        void chrome.runtime.lastError;
        tmuxState = (o && o.zb_tmux) || null;
        if (ZGui.powerline.tmux) ZGui.powerline.tmux(tmuxState);
        if (o && o.zb_status === false && ZGui.powerline.visible()) ZGui.powerline.toggle();   // honour the hidden flag
      });
    } catch (e) {}
  }

  try {
    chrome.storage.onChanged.addListener(function (ch, area) {
      if (area !== 'local' || !window.ZGui || !ZGui.powerline) return;
      if (ch.zb_scheme || ch.zb_ui) applyScheme();
      if (ch.zb_tmux) {
        tmuxState = ch.zb_tmux.newValue || null;
        if (ZGui.powerline.tmux) ZGui.powerline.tmux(tmuxState);
        if (tmuxState && tmuxState.armed && ZGui.powerline.arm) ZGui.powerline.arm();   // light the prefix lamp
      }
      if (ch.zb_status) { var on = !(ch.zb_status.newValue === false); if (on !== ZGui.powerline.visible()) ZGui.powerline.toggle(); }
      // zb_sys is picked up by the 2s sysStats() poll — no push needed.
    });
  } catch (e) {}

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
