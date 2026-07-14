// zgui-core/button-bar.js — a small in-pane button bar. A core uses it to expose its OWN features
// (settings, command palette, actions) via BUTTONS instead of global keybindings, so it never fights
// the host for ⌘K (see GUI_APP_ARCHITECTURE.md). window.ZGui.buttonBar.
//   const bar = ZGui.buttonBar(coreEl);
//   bar.add("⚙", "Settings", () => mySettings.open());
//   bar.add("⌘", "Commands", () => myPalette.open());   // ZGui.palette.create({scope}) — no hotkey
(function () {
  "use strict";
  function el(t, c) { const e = document.createElement(t); if (c) e.className = c; return e; }
  function buttonBar(host, opts) {
    opts = opts || {};
    const bar = el("div", "zg-btnbar" + (opts.className ? " " + opts.className : ""));
    if (host) host.appendChild(bar);
    return {
      el: bar,
      add: function (icon, label, onClick) {
        const b = el("button", "zg-btnbar-btn");
        b.type = "button";
        b.title = label || "";
        b.setAttribute("aria-label", label || icon || "");
        b.textContent = icon;
        if (typeof onClick === "function") b.addEventListener("click", onClick);
        bar.appendChild(b);
        return b;
      },
      sep: function () { const s = el("span", "zg-btnbar-sep"); bar.appendChild(s); return s; },
    };
  }
  // Self-inject this component's stylesheet once, so it works from the JS alone (no
  // manifest/all.css step needed). Idempotent + prepended so a consumer's own CSS wins.
  (function(){var _c="/* zgui-core/button-bar.css — in-pane button bar (ZGui.buttonBar). Cyberpunk tokens with fallbacks. */\n.zg-btnbar { display: flex; align-items: center; gap: 4px; }\n.zg-btnbar-btn {\n    min-width: 28px; height: 26px; padding: 0 8px; cursor: pointer;\n    font: 600 12px/1 ui-monospace, monospace; color: var(--cyan, #05d9e8);\n    background: var(--bg-card, #11161f); border: 1px solid var(--border, rgba(5,217,232,0.3)); border-radius: 6px;\n}\n.zg-btnbar-btn:hover { background: var(--bg-hover, #1a2330); color: var(--text, #c7f9ff); }\n.zg-btnbar-sep { width: 1px; height: 18px; background: var(--border, rgba(5,217,232,0.3)); margin: 0 4px; }\n";try{if(typeof document!=="undefined"&&!document.getElementById("zg-btnbar-css")){var _s=document.createElement("style");_s.id="zg-btnbar-css";_s.textContent=_c;var _h=document.head||document.documentElement;_h.insertBefore(_s,_h.firstChild);}}catch(_e){}})();
  window.ZGui = window.ZGui || {};
  window.ZGui.buttonBar = buttonBar;
})();
