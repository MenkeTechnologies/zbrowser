// zgui-core/split-pane.js — a resizable two-pane split with a draggable divider, persisting the
// ratio. The need recurs across the suite (dual-pane file managers, list/detail, request/response);
// distilled from the pane-resizer pattern in zpwr-file-browser. window.ZGui.splitPane.
//
//   ZGui.splitPane.create(container, {
//       direction: 'h',     // 'h' = side-by-side (vertical divider) | 'v' = stacked
//       ratio: 0.5,         // initial fraction for the FIRST pane (0..1)
//       min: 80,            // min px per pane
//       prefsKey: 'split',  // persist the ratio
//       onResize: (ratio) => {},
//   }) -> { el, ratio(), setRatio(r) }
//
// `container` must already hold exactly two child elements (the two panes); the divider is
// inserted between them. Host may define window.prefs.
(function () {
    "use strict";

    const prefs = window.prefs || (window.prefs = {
        getItem(k) { try { return localStorage.getItem(k); } catch { return null; } },
        setItem(k, v) { try { localStorage.setItem(k, v); } catch { /* quota */ } },
    });

    // A viewport-covering shield shown WHILE a divider is dragged. Panes may be
    // cross-origin iframes, which otherwise swallow mousemove/mouseup — so without
    // this the drag "sticks" (never releases) and the pane collapses. Ported from
    // the drag shield in zwire's original ztmux.js.
    function showDragShield(cursor) {
        let s = document.getElementById("zg-drag-shield");
        if (!s) { s = document.createElement("div"); s.id = "zg-drag-shield"; }
        // class-based (no inline style — WKWebView release strips inline styles)
        s.className = "zg-drag-shield " + (cursor === "row-resize" ? "zg-shield-row" : "zg-shield-col");
        (document.body || document.documentElement).appendChild(s);
    }
    function hideDragShield() { const s = document.getElementById("zg-drag-shield"); if (s && s.parentNode) s.parentNode.removeChild(s); }

    function create(container, opts) {
        const host = typeof container === "string" ? document.querySelector(container) : container;
        if (!host) return null;
        opts = opts || {};
        const horizontal = (opts.direction || "h") !== "v";
        const min = opts.min || 80;
        const prefsKey = opts.prefsKey || "";
        const panes = [...host.children].filter((n) => n.nodeType === 1);
        if (panes.length < 2) return null;
        const a = panes[0], b = panes[1];

        let ratio = (function () {
            const saved = prefsKey ? parseFloat(prefs.getItem(prefsKey)) : NaN;
            if (!isNaN(saved) && saved > 0 && saved < 1) return saved;
            return typeof opts.ratio === "number" ? opts.ratio : 0.5;
        })();

        host.classList.add("zg-split", horizontal ? "zg-split-h" : "zg-split-v");
        const divider = document.createElement("div");
        divider.className = "zg-split-divider";
        host.insertBefore(divider, b);

        function apply() {
            a.style.flex = `0 0 ${(ratio * 100).toFixed(3)}%`;
            b.style.flex = "1 1 0";
            if (typeof opts.onResize === "function") opts.onResize(ratio);
        }
        apply();

        let dragging = false;
        divider.addEventListener("mousedown", (e) => {
            e.preventDefault();
            dragging = true;
            document.body.style.userSelect = "none";
            document.body.style.cursor = horizontal ? "col-resize" : "row-resize";
            showDragShield(horizontal ? "col-resize" : "row-resize");
        });
        document.addEventListener("mousemove", (e) => {
            if (!dragging) return;
            const rect = host.getBoundingClientRect();
            const total = horizontal ? rect.width : rect.height;
            const pos = horizontal ? e.clientX - rect.left : e.clientY - rect.top;
            let r = pos / total;
            // clamp so each pane keeps `min` px
            const minR = min / total, maxR = 1 - min / total;
            r = Math.max(minR, Math.min(maxR, r));
            if (isFinite(r)) { ratio = r; a.style.flex = `0 0 ${(ratio * 100).toFixed(3)}%`; }
        });
        document.addEventListener("mouseup", () => {
            if (!dragging) return;
            dragging = false;
            document.body.style.userSelect = "";
            document.body.style.cursor = "";
            hideDragShield();
            if (prefsKey) prefs.setItem(prefsKey, String(ratio));
            if (typeof opts.onResize === "function") opts.onResize(ratio);
        });

        return {
            el: host,
            ratio() { return ratio; },
            setRatio(r) { if (r > 0 && r < 1) { ratio = r; apply(); if (prefsKey) prefs.setItem(prefsKey, String(r)); } },
        };
    }

    // Self-inject this component's stylesheet once, so it works from the JS alone (no
    // manifest/all.css step needed). Idempotent + prepended so a consumer's own CSS wins.
    (function(){var _c="/* split-pane divider (self-injected by split-pane.js) */\n.zg-split { display: flex; min-width: 0; min-height: 0; }\n.zg-split-h { flex-direction: row; }\n.zg-split-v { flex-direction: column; }\n.zg-split > * { min-width: 0; min-height: 0; }\n.zg-split-divider { flex: 0 0 6px; background: var(--border, #1a2436); position: relative; z-index: 5; transition: background .12s, box-shadow .12s; }\n.zg-split-h > .zg-split-divider { cursor: col-resize; }\n.zg-split-v > .zg-split-divider { cursor: row-resize; }\n.zg-split-divider:hover { background: var(--cyan, #05d9e8); box-shadow: 0 0 8px var(--cyan-glow, rgba(5,217,232,.4)); }\n.zg-drag-shield { position: fixed; inset: 0; z-index: 2147483000; background: transparent; }\n.zg-drag-shield.zg-shield-col { cursor: col-resize; }\n.zg-drag-shield.zg-shield-row { cursor: row-resize; }";try{if(typeof document!=="undefined"&&!document.getElementById("zg-split-css")){var _s=document.createElement("style");_s.id="zg-split-css";_s.textContent=_c;var _h=document.head||document.documentElement;_h.insertBefore(_s,_h.firstChild);}}catch(_e){}})();
    window.ZGui = window.ZGui || {};
    window.ZGui.splitPane = { create: create };
})();
