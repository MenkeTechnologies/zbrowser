// zgui-core/powerline.js — tmux/powerline status bar pinned to the bottom, a
// shared component. LEFT: sig · C-b prefix (lights when tmux arms) · scheme · tmux
// windows · VIM. RIGHT: CPU · MEM · SWAP · DISK · IO · NET · LOAD · UP · TEMP ·
// BATT · LAN · WAN · host · clock. Full powerline chevrons (► left half, ◄ right
// half), alternating shade blocks. window.ZGui.powerline.
//
// Ported from zwire's zstatus.js and generalized: the data is host-supplied via
// ZGui.powerline.init(cfg), so a Tauri app polls a `sys_stats` command while a
// browser extension can feed it from chrome.storage — same bar either way. Theme
// tracks the host's live CSS vars (scheme + light/dark aware), so no per-scheme
// var injection is needed.
//
//   ZGui.powerline.init({
//     sig:       'ZO',                       // 2-char brand block (default 'ZG')
//     sysStats:  () => Promise<obj|null>,    // {cpu,mem,swap,disk,io,net,load,uptime,temp,batt,lip,pip,host}
//                                            //   default: Tauri invoke('sys_stats')
//     tmuxStatus:() => obj,                  // default: ZGui.tmux.status()
//     vimMode:   () => 'vim'|'off',          // optional VIM segment
//     scheme:    () => string,               // default: ZGui.colorscheme.current()
//   })
//   ZGui.powerline.tmux(status) / .arm() / .vim() / .toggle() / .visible()
(function () {
  "use strict";
  if (window.__zgPowerlineLoaded) return;
  window.__zgPowerlineLoaded = true;

  var CFG = {}, bar, clockTimer, sysTimer;
  var PREFS_KEY = "zg.powerline";      // localStorage visibility flag

  function tauri() { return (typeof window !== "undefined" && window.__TAURI__ && window.__TAURI__.core) ? window.__TAURI__.core : null; }
  function seg(cls, html) { var s = document.createElement("span"); s.className = "seg " + (cls || ""); s.innerHTML = html; return s; }
  function L(t) { return '<span class="k">' + t + "</span> "; }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function build() {
    if (bar) return;
    bar = document.createElement("div"); bar.id = "zg-powerline";
    var sig = document.createElement("span"); sig.className = "sig"; sig.textContent = (CFG.sig || "ZG"); bar.appendChild(sig);
    bar.appendChild(seg("pfx", '<span class="prefix" data-prefix title="tmux prefix: Ctrl-b (or ⌥b), then % split · o/←→ focus · x close · ? help">C-b</span>'));
    bar.appendChild(seg("scheme", '<span class="scheme" data-scheme>—</span>'));
    bar.appendChild(seg("tmux", '<span class="tmux" data-tmux></span>'));
    bar.appendChild(seg("vim", '<span class="vim" data-vim>VIM</span>'));
    bar.appendChild(seg("flex", ""));
    // ── system segments (from the sysStats provider) ──
    bar.appendChild(seg("cpu", L("CPU") + "<span data-cpu>–</span>"));
    bar.appendChild(seg("mem", L("MEM") + "<span data-mem>–</span>"));
    bar.appendChild(seg("swap", L("SWP") + "<span data-swap>–</span>"));
    bar.appendChild(seg("disk", L("DSK") + "<span data-disk>–</span>"));
    bar.appendChild(seg("io", L("IO") + "<span data-io>–</span>"));
    bar.appendChild(seg("net", L("NET") + "<span data-net>–</span>"));
    bar.appendChild(seg("load", L("LD") + "<span data-load>–</span>"));
    bar.appendChild(seg("up", L("UP") + "<span data-up>–</span>"));
    bar.appendChild(seg("temp", L("°") + "<span data-temp>–</span>"));
    bar.appendChild(seg("batt", "<span data-batt>–</span>"));
    bar.appendChild(seg("lan", L("LAN") + "<span data-lip>–</span>"));
    bar.appendChild(seg("wan", L("WAN") + "<span data-pip>…</span>"));
    bar.appendChild(seg("host", L("@") + "<span data-host>–</span>"));
    bar.appendChild(seg("clock", '<span class="clock" data-clock>--</span>'));
    document.body.appendChild(bar);
    powerline();
    tick(); clearInterval(clockTimer); clockTimer = setInterval(tick, 1000);
    refreshVim(); refreshScheme(); refreshTmux(tmuxSource());
    startSys();
  }
  function destroy() { if (clockTimer) clearInterval(clockTimer); if (sysTimer) clearInterval(sysTimer); if (bar) bar.remove(); bar = null; }

  // tag every non-special segment as a powerline block: alternating shade, ► before
  // the flex spacer / ◄ after it.
  function powerline() {
    var kids = [].slice.call(bar.children), spacer = -1;
    kids.forEach(function (k, i) { if (k.classList.contains("flex")) spacer = i; });
    var lc = 1, rc = 0;
    kids.forEach(function (k, i) {
      if (k.classList.contains("sig") || k.classList.contains("flex") || k.classList.contains("pfx")) return;
      if (spacer >= 0 && i > spacer) { k.classList.add("plr", "s" + (rc % 2)); rc++; }
      else { k.classList.add("pll", "s" + (lc % 2)); lc++; }
    });
  }

  /* ---- formatters (from zstatus.js) ---- */
  function fb(n) { if (n == null) return "–"; var u = ["B", "K", "M", "G", "T"], i = 0; n = +n; while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; } return (n >= 100 || i === 0 ? Math.round(n) : n.toFixed(1)) + u[i]; }
  function fr(n) { return n == null ? "–" : fb(n) + "/s"; }
  function fup(s) { if (s == null) return "–"; s = +s; var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60); return (d ? d + "d " : "") + (h ? h + "h " : "") + m + "m"; }
  function p2(n) { return (n < 10 ? "0" : "") + n; }
  function tick() { var el = bar && bar.querySelector("[data-clock]"); if (!el) return; var d = new Date(); el.textContent = p2(d.getMonth() + 1) + "-" + p2(d.getDate()) + " " + p2(d.getHours()) + ":" + p2(d.getMinutes()) + ":" + p2(d.getSeconds()); }
  function setTxt(sel, t) { var e = bar && bar.querySelector(sel); if (e) e.textContent = t; }

  function refreshSys(s) {
    if (!bar || !s) return;
    setTxt("[data-cpu]", s.cpu == null ? "–" : s.cpu + "%");
    setTxt("[data-mem]", s.mem ? fb(s.mem.u) + "/" + fb(s.mem.t) : "–");
    setTxt("[data-swap]", s.swap ? fb(s.swap.u) + "/" + fb(s.swap.t) : "–");
    setTxt("[data-disk]", s.disk ? s.disk.p + "%" : "–");
    setTxt("[data-io]", s.io ? ("R" + fr(s.io.r) + " W" + fr(s.io.w)) : "–");
    setTxt("[data-net]", s.net ? ("↑" + fr(s.net.up) + " ↓" + fr(s.net.down)) : "–");
    setTxt("[data-load]", s.load ? s.load.join(" ") : "–");
    setTxt("[data-up]", fup(s.uptime));
    // batt = {p, c, ac} — all monochrome, no colour emoji so the bar stays uniform in the mono font:
    // c = actively charging (⎓ DC current), ac = on external/AC but not charging (⏻ power symbol),
    // neither = on battery (no glyph, just the %). Provider (zwire-host) derives c/ac.
    setTxt("[data-batt]", s.batt ? ((s.batt.c ? "⎓" : (s.batt.ac ? "⏻" : "")) + s.batt.p + "%") : "–");
    setTxt("[data-lip]", s.lip || "–");
    setTxt("[data-pip]", s.pip || "…");
    setTxt("[data-host]", s.host || "–");
    var tseg = bar.querySelector(".seg.temp");
    if (tseg) tseg.style.display = (s.temp != null ? "" : "none");
    if (s.temp != null) setTxt("[data-temp]", s.temp + "°C");
    // Hide WAN unless the provider supplies a public IP, so the bar doesn't carry a dead '…' block.
    var wan = bar.querySelector(".seg.wan"); if (wan) wan.style.display = s.pip ? "" : "none";
  }
  // The stats provider: CFG.sysStats(), else the Tauri `sys_stats` command, else none.
  function statsProvider() {
    if (typeof CFG.sysStats === "function") return CFG.sysStats;
    var t = tauri(); if (t) return function () { return t.invoke("sys_stats"); };
    return null;
  }
  function startSys() {
    if (sysTimer) { clearInterval(sysTimer); sysTimer = null; }
    var prov = statsProvider(); if (!prov) return;   // no backend → system segments stay '–'
    function poll() { try { Promise.resolve(prov()).then(refreshSys).catch(function () {}); } catch (e) {} }
    poll(); sysTimer = setInterval(poll, 2000);
  }

  // tmux window/pane segment — pushed by ZGui.tmux via ZGui.powerline.tmux(status).
  function tmuxSource() { try { if (typeof CFG.tmuxStatus === "function") return CFG.tmuxStatus(); var z = window.ZGui; return (z && z.tmux && z.tmux.status) ? z.tmux.status() : null; } catch (e) { return null; } }
  function refreshTmux(st) {
    var el = bar && bar.querySelector("[data-tmux]"); if (!el) return;
    if (!st || !st.windows || !st.windows.length) { el.innerHTML = ""; return; }
    var html = "";
    if (st.sess) html += '<span class="tsess" title="tmux session">⬢ ' + esc(st.sess) + "</span>";
    var aw = st.windows[st.active];
    if (aw && aw.name) html += '<span class="twin-name" title="active window">' + esc(aw.name) + "</span>";
    html += st.windows.map(function (w, i) { return '<span class="win' + (i === st.active ? " act" : "") + '">' + i + "·" + w.panes + (w.zoom ? "Z" : "") + "</span>"; }).join("");
    if (st.anySync) html += '<span class="sync" title="synchronize-panes on">⇄</span>';
    el.innerHTML = html;
  }

  // Prefix indicator — lit when the tmux prefix (Ctrl-b/⌥b) arms, off after 1.6s.
  var prefixTimer;
  function litPrefix() { var el = bar && bar.querySelector("[data-prefix]"); if (!el) return; el.classList.add("on"); clearTimeout(prefixTimer); prefixTimer = setTimeout(function () { if (el) el.classList.remove("on"); }, 1600); }

  function refreshVim() {
    var el = bar && bar.querySelector("[data-vim]"); if (!el) return;
    var on = typeof CFG.vimMode === "function" ? (CFG.vimMode() === "vim") : false;
    el.parentNode.style.display = on ? "" : "none";
  }
  function refreshScheme() {
    var el = bar && bar.querySelector("[data-scheme]"); if (!el) return;
    var name = "";
    try { if (typeof CFG.scheme === "function") name = CFG.scheme() || ""; } catch (e) {}
    if (!name) { try { name = (window.ZGui && ZGui.colorscheme && ZGui.colorscheme.current && ZGui.colorscheme.current()) || ""; } catch (e) {} }
    if (!name) { try { name = localStorage.getItem("colorScheme") || ""; } catch (e) {} }
    el.textContent = name || "—";
  }

  /* ---- visibility toggle (persisted, mirrors zwire's zb_status) ---- */
  function enabled() { try { return localStorage.getItem(PREFS_KEY) !== "0"; } catch (e) { return true; } }
  function setEnabled(v) { try { localStorage.setItem(PREFS_KEY, v ? "1" : "0"); } catch (e) {} }
  function apply(on) { if (on) { build(); } else destroy(); }

  // ---- public API ----
  function init(cfg) {
    CFG = cfg || {};
    if (bar) {   // already auto-built with defaults → apply the host's providers/sig live
      if (CFG.sig) { var s = bar.querySelector(".sig"); if (s) s.textContent = CFG.sig; }
      refreshVim(); refreshScheme(); refreshTmux(tmuxSource()); startSys();
    }
    return api;
  }
  var api = {
    init: init,
    tmux: refreshTmux,             // ZGui.tmux pushes {sess,windows,active,anySync} here on render
    arm: litPrefix,                // ZGui.tmux calls this when the prefix arms
    vim: refreshVim,               // host calls this when its vim mode toggles
    toggle: function () { var v = !enabled(); setEnabled(v); apply(v); return v; },
    visible: function () { return !!bar; }
  };
  // Self-inject this component's stylesheet once, so it works from the JS alone (no
  // manifest/all.css step needed). Idempotent + prepended so a consumer's own CSS wins.
  (function(){var _c="/* zoffice powerline status bar — ported from zwire zstatus.js's BAR_CSS. Full\n * powerline chevrons (► left half via ::after, ◄ right half via ::before) with\n * alternating shade blocks (s0/s1). Uses zoffice's global scheme vars directly\n * (already light/dark aware), so no per-scheme injection like zwire needed. */\n\n#zg-powerline {\n  position: fixed;\n  left: 0; right: 0; bottom: 0;\n  height: 22px;\n  z-index: 9990;                 /* above app chrome + the tmux overlay (8500); below zgui modals (25000) / toasts (30000) */\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n  gap: 0;\n  font: 11px/22px \"Share Tech Mono\", Monaco, monospace;\n  color: var(--text, #c8f5ff);\n  background: color-mix(in srgb, var(--bg-primary, #0a0a12) 90%, transparent);\n  border-top: 1px solid var(--border, #1b2b3a);\n  box-shadow: 0 -6px 18px rgba(0, 0, 0, .35);\n  backdrop-filter: blur(3px);\n  user-select: none;\n}\n#zg-powerline .seg { display: flex; align-items: center; gap: 4px; padding: 0 8px; height: 100%; white-space: nowrap; }\n#zg-powerline .k { color: var(--text-muted, #6b7b8a); }\n#zg-powerline .flex { flex: 1; min-width: 0; }\n#zg-powerline .scheme { color: var(--accent, #ff2a6d); text-transform: uppercase; letter-spacing: 1px; }\n#zg-powerline .vim { color: var(--green, #3bf58a); letter-spacing: 1px; }\n#zg-powerline .clock { color: var(--accent, #ff2a6d); }\n#zg-powerline .prefix { letter-spacing: 1px; }\n\n/* tmux window segment */\n#zg-powerline .tmux .tsess { color: var(--magenta, #ff2e97); font-weight: 700; margin-right: 8px; }\n#zg-powerline .tmux .twin-name { color: var(--cyan, #05d9e8); margin-right: 8px; }\n#zg-powerline .tmux .win { margin-right: 6px; color: var(--text-muted, #6b7b8a); }\n#zg-powerline .tmux .win.act { color: var(--cyan, #05d9e8); font-weight: 700; }\n#zg-powerline .tmux .sync { color: var(--cyan, #05d9e8); margin-left: 2px; }\n\n/* ── powerline ──  sig (cyan) ► then alternating shade blocks */\n#zg-powerline .sig { background: var(--cyan, #05d9e8); color: var(--bg-primary, #0a0a12); font-weight: bold; padding: 0 8px; position: relative; letter-spacing: 1px; }\n#zg-powerline .sig::after { content: \"\"; position: absolute; left: 100%; top: 0; z-index: 3; border-top: 11px solid transparent; border-bottom: 11px solid transparent; border-left: 9px solid var(--cyan, #05d9e8); }\n/* C-b prefix block (dim → accent when armed) */\n#zg-powerline .seg.pfx { position: relative; background: var(--bg-card, #12121c); color: var(--text-muted, #6b7b8a); padding-left: 13px; transition: background .12s, color .12s; }\n#zg-powerline .seg.pfx::after { content: \"\"; position: absolute; left: 100%; top: 0; z-index: 3; border-top: 11px solid transparent; border-bottom: 11px solid transparent; border-left: 9px solid var(--bg-card, #12121c); transition: border-color .12s; }\n#zg-powerline .seg.pfx:has(.prefix.on) { background: var(--accent, #ff2a6d); color: var(--bg-primary, #0a0a12); }\n#zg-powerline .seg.pfx:has(.prefix.on)::after { border-left-color: var(--accent, #ff2a6d); }\n/* left powerline (► after each), alternating shades */\n#zg-powerline .pll { position: relative; padding-left: 14px; }\n#zg-powerline .pll.s0 { background: var(--bg-card, #12121c); }\n#zg-powerline .pll.s1 { background: var(--bg-secondary, #161622); }\n#zg-powerline .pll::after { content: \"\"; position: absolute; left: 100%; top: 0; z-index: 3; border-top: 11px solid transparent; border-bottom: 11px solid transparent; border-left: 9px solid transparent; }\n#zg-powerline .pll.s0::after { border-left-color: var(--bg-card, #12121c); }\n#zg-powerline .pll.s1::after { border-left-color: var(--bg-secondary, #161622); }\n/* right powerline (◄ before each), alternating shades */\n#zg-powerline .plr { position: relative; padding-right: 14px; }\n#zg-powerline .plr.s0 { background: var(--bg-card, #12121c); }\n#zg-powerline .plr.s1 { background: var(--bg-secondary, #161622); }\n#zg-powerline .plr::before { content: \"\"; position: absolute; right: 100%; top: 0; z-index: 3; border-top: 11px solid transparent; border-bottom: 11px solid transparent; border-right: 9px solid transparent; }\n#zg-powerline .plr.s0::before { border-right-color: var(--bg-card, #12121c); }\n#zg-powerline .plr.s1::before { border-right-color: var(--bg-secondary, #161622); }\n\n";try{if(typeof document!=="undefined"&&!document.getElementById("zg-powerline-css")){var _s=document.createElement("style");_s.id="zg-powerline-css";_s.textContent=_c;var _h=document.head||document.documentElement;_h.insertBefore(_s,_h.firstChild);}}catch(_e){}})();
  window.ZGui = window.ZGui || {};
  window.ZGui.powerline = api;

  // Also light the prefix directly on Ctrl-B (belt and braces — matches zwire).
  document.addEventListener("keydown", function (e) { if (e.ctrlKey && !e.metaKey && !e.altKey && (e.key === "b" || e.key === "B")) litPrefix(); }, true);
  // Re-sync scheme text on theme changes (theme-sync.js drives colorscheme.apply).
  try { if (window.ZGui && ZGui.colorscheme && ZGui.colorscheme.onApply) ZGui.colorscheme.onApply(function () { refreshScheme(); }); } catch (e) {}

  function boot() { if (enabled()) apply(true); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
