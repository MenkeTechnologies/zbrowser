// zgui-core/modal.js — the base modal/dialog system, the keystone the other dialogs sit on.
// Emits the canonical `.modal-overlay > .modal-content > (.modal-header, .modal-body, .modal-footer)`
// structure (distilled from Audio-Haxor) so ZGui.modalDrag auto-enhances every modal, and so
// the 14 apps stop rebuilding overlay/ESC/backdrop plumbing. window.ZGui.modal.
//
//   ZGui.modal.open({
//       title, body,            // body: string (HTML) | Node
//       actions: [{ label, primary?, danger?, close?=true, onClick(api) }],
//       small?, className?, id?, dismissable?=true, onClose?
//   }) -> { el, overlay, body, footer, close() }
//
// Every modal is draggable (grab the header) and resizable (edge handles), built in — pass `id`
// to persist that modal's size/position across opens (keyed by the overlay id). If an app also
// loads the standalone modal-drag.js, its observer enhances first and this defers (via _dragInit).
//
//   ZGui.modal.confirm({ title, message, okLabel?, cancelLabel? })  -> Promise<boolean>
//   ZGui.modal.prompt({ title, message, value?, okLabel?, cancelLabel?, placeholder? }) -> Promise<string|null>
//
// ESC closes the top-most modal; backdrop click closes unless dismissable:false.
(function () {
    "use strict";

    const esc = window.escapeHtml || function (s) {
        const d = document.createElement("div");
        d.textContent = s == null ? "" : String(s);
        return d.innerHTML;
    };

    // Resolve user-facing text through the i18n bridge when present (pass an i18n key to translate,
    // else the literal/default shows). See i18n.js.
    const tr = (v, d) => { const s = v == null ? d : v; return (window.ZGui && window.ZGui.i18n) ? window.ZGui.i18n.t(s) : s; };

    const stack = [];

    // ---- built-in drag (via header) + resize (edge handles). Self-contained port of modal-drag.js
    // so a modal is movable/resizable from modal.js alone. Geometry persists per overlay id.
    const EDGE_CURSOR = { n: "ns-resize", s: "ns-resize", e: "ew-resize", w: "ew-resize", ne: "nesw-resize", sw: "nesw-resize", nw: "nwse-resize", se: "nwse-resize" };
    let _drag = null, _resize = null, _dragDocWired = false;
    function _pstore() { return window.prefs || { getItem(k) { try { return localStorage.getItem(k); } catch { return null; } }, setItem(k, v) { try { localStorage.setItem(k, v); } catch { /* quota */ } } }; }
    function _modalKey(modal) { const o = modal.closest(".modal-overlay"); return (o && o.id) || modal.id || ""; }
    function _saveGeo(modal) { const k = _modalKey(modal); if (!k) return; const r = modal.getBoundingClientRect(); _pstore().setItem("modal_" + k, JSON.stringify({ left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) })); }
    function _restoreGeo(modal) {
        const k = _modalKey(modal); if (!k) return; const raw = _pstore().getItem("modal_" + k); if (!raw) return;
        try {
            const g = JSON.parse(raw);
            if (g.left < 0 || g.top < 0 || g.left > window.innerWidth - 100 || g.top > window.innerHeight - 50 || g.width < 200 || g.height < 100) return;
            const o = modal.closest(".modal-overlay"); if (o) { o.style.alignItems = "flex-start"; o.style.justifyContent = "flex-start"; }
            modal.style.position = "fixed"; modal.style.left = g.left + "px"; modal.style.top = g.top + "px"; modal.style.width = g.width + "px"; modal.style.height = g.height + "px"; modal.style.margin = "0"; modal.style.maxWidth = "none"; modal.style.maxHeight = "none";
            const b = modal.querySelector(".modal-body"); if (b) { const hh = (modal.querySelector(".modal-header") || {}).offsetHeight || 50; b.style.maxHeight = (g.height - hh - 10) + "px"; }
        } catch { /* corrupt geometry */ }
    }
    function enhanceDragResize(modal) {
        if (!modal || modal._dragInit) return; modal._dragInit = true;
        ["n", "s", "e", "w", "ne", "nw", "se", "sw"].forEach(function (edge) { const h = document.createElement("div"); h.className = "modal-resize modal-resize-" + edge; h.dataset.modalResize = edge; modal.appendChild(h); });
        _restoreGeo(modal);
        const header = modal.querySelector(".modal-header");
        if (header) {
            header.style.cursor = "move";
            header.addEventListener("mousedown", function (e) {
                if (e.target.closest(".modal-close, button, input, select, textarea")) return;
                if (e.button !== 0) return; e.preventDefault();
                const r = modal.getBoundingClientRect(), o = modal.closest(".modal-overlay"); if (o) { o.style.alignItems = "flex-start"; o.style.justifyContent = "flex-start"; }
                modal.style.position = "fixed"; modal.style.left = r.left + "px"; modal.style.top = r.top + "px"; modal.style.margin = "0"; modal.style.width = r.width + "px";
                document.body.style.userSelect = "none"; document.body.style.cursor = "move";
                _drag = { modal, sx: e.clientX, sy: e.clientY, ol: r.left, ot: r.top };
            });
        }
        modal.addEventListener("mousedown", function (e) {
            const h = e.target.closest("[data-modal-resize]"); if (!h) return; e.preventDefault(); e.stopPropagation();
            const r = modal.getBoundingClientRect(), o = modal.closest(".modal-overlay"); if (o) { o.style.alignItems = "flex-start"; o.style.justifyContent = "flex-start"; }
            modal.style.position = "fixed"; modal.style.left = r.left + "px"; modal.style.top = r.top + "px"; modal.style.margin = "0"; modal.style.width = r.width + "px"; modal.style.height = r.height + "px"; modal.style.maxWidth = "none"; modal.style.maxHeight = "none";
            document.body.style.userSelect = "none"; document.body.style.cursor = EDGE_CURSOR[h.dataset.modalResize] || "";
            _resize = { modal, edge: h.dataset.modalResize, sx: e.clientX, sy: e.clientY, ol: r.left, ot: r.top, ow: r.width, oh: r.height };
        });
        if (!_dragDocWired) {
            _dragDocWired = true;
            document.addEventListener("mousemove", function (e) {
                if (_drag) { const s = _drag; s.modal.style.left = (s.ol + e.clientX - s.sx) + "px"; s.modal.style.top = (s.ot + e.clientY - s.sy) + "px"; }
                if (_resize) {
                    const s = _resize, dx = e.clientX - s.sx, dy = e.clientY - s.sy, minW = 300, minH = 200; let left = s.ol, top = s.ot, w = s.ow, h = s.oh;
                    if (s.edge.includes("e")) w = Math.max(minW, s.ow + dx);
                    if (s.edge.includes("w")) { w = Math.max(minW, s.ow - dx); left = s.ol + s.ow - w; }
                    if (s.edge.includes("s")) h = Math.max(minH, s.oh + dy);
                    if (s.edge.includes("n")) { h = Math.max(minH, s.oh - dy); top = s.ot + s.oh - h; }
                    s.modal.style.left = left + "px"; s.modal.style.top = top + "px"; s.modal.style.width = w + "px"; s.modal.style.height = h + "px";
                    const b = s.modal.querySelector(".modal-body"); if (b) { const hh = (s.modal.querySelector(".modal-header") || {}).offsetHeight || 50; b.style.maxHeight = (h - hh - 10) + "px"; }
                }
            });
            document.addEventListener("mouseup", function () {
                if (_drag) _saveGeo(_drag.modal); if (_resize) _saveGeo(_resize.modal);
                if (_drag || _resize) { document.body.style.userSelect = ""; document.body.style.cursor = ""; }
                _drag = null; _resize = null;
            });
        }
    }

    function open(opts) {
        opts = opts || {};
        const overlay = document.createElement("div");
        overlay.className = "modal-overlay modal-visible";
        if (opts.id) overlay.id = opts.id;   // stable id → drag/resize geometry persists across opens

        const content = document.createElement("div");
        content.className = "modal-content" + (opts.small ? " modal-small" : "") + (opts.className ? " " + opts.className : "");

        // header
        const header = document.createElement("div");
        header.className = "modal-header";
        const h = document.createElement("h2");
        h.textContent = opts.title || "";
        const closeBtn = document.createElement("button");
        closeBtn.className = "modal-close";
        closeBtn.type = "button";
        closeBtn.title = "Close";
        closeBtn.innerHTML = "&#10005;";
        header.appendChild(h);
        header.appendChild(closeBtn);

        // body
        const body = document.createElement("div");
        body.className = "modal-body";
        if (opts.body != null) {
            if (typeof opts.body === "string") body.innerHTML = opts.body;
            else body.appendChild(opts.body);
        }

        content.appendChild(header);
        content.appendChild(body);

        // footer (only when actions are supplied)
        let footer = null;
        if (opts.actions && opts.actions.length) {
            footer = document.createElement("div");
            footer.className = "modal-footer";
            opts.actions.forEach(function (a) {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "zs-btn" + (a.primary ? " zs-btn-primary" : "") + (a.danger ? " zs-btn-danger" : "");
                btn.textContent = a.label || "";
                btn.addEventListener("click", function () {
                    let keepOpen = false;
                    if (typeof a.onClick === "function") keepOpen = a.onClick(api) === false ? false : keepOpen;
                    if (a.close !== false) close();
                });
                footer.appendChild(btn);
            });
            content.appendChild(footer);
        }

        overlay.appendChild(content);
        document.body.appendChild(overlay);

        // Make it draggable + resizable. If the standalone modal-drag.js is loaded its observer will
        // enhance too, but its _dragInit guard makes that a no-op; calling here means modal.js needs
        // no external dependency to be movable/resizable.
        try {
            if (window.ZGui && window.ZGui.modalDrag && window.ZGui.modalDrag.init && window.ZGui.modalDrag.init !== enhanceDragResize) window.ZGui.modalDrag.init(content);
            else enhanceDragResize(content);
        } catch (e) { /* enhancement is best-effort */ }

        let closed = false;
        function close() {
            if (closed) return;
            closed = true;
            const i = stack.indexOf(api);
            if (i >= 0) stack.splice(i, 1);
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            if (typeof opts.onClose === "function") opts.onClose();
        }

        closeBtn.addEventListener("click", close);
        if (opts.dismissable !== false) {
            overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
        }

        const api = { el: content, overlay: overlay, body: body, footer: footer, close: close };
        stack.push(api);
        return api;
    }

    // ESC closes the top-most modal. CAPTURE phase + stopImmediatePropagation so it preempts a
    // host's document-level overlay-Escape handler — otherwise closing a modal opened inside an
    // embedded view's overlay would ALSO close that overlay (both listeners sit on `document`, and
    // plain stopPropagation doesn't stop a sibling listener on the same node).
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && stack.length) {
            const top = stack[stack.length - 1];
            e.preventDefault();
            e.stopImmediatePropagation();
            top.close();
        }
    }, true);

    function confirm(opts) {
        opts = opts || {};
        return new Promise(function (resolve) {
            let answered = false;
            const m = open({
                title: tr(opts.title, "Confirm"),
                small: true,
                body: `<p class="modal-message">${esc(opts.message || "")}</p>`,
                actions: [
                    { label: tr(opts.okLabel, "OK"), primary: true, onClick: function () { answered = true; resolve(true); } },
                    { label: tr(opts.cancelLabel, "Cancel"), onClick: function () { answered = true; resolve(false); } },
                ],
                onClose: function () { if (!answered) resolve(false); },
            });
            void m;
        });
    }

    function prompt(opts) {
        opts = opts || {};
        return new Promise(function (resolve) {
            let answered = false;
            const input = document.createElement("input");
            input.type = "text";
            input.className = "zs-input modal-prompt-input";
            input.value = opts.value || "";
            if (opts.placeholder) input.placeholder = opts.placeholder;
            const wrap = document.createElement("div");
            if (opts.message) {
                const p = document.createElement("p");
                p.className = "modal-message";
                p.textContent = opts.message;
                wrap.appendChild(p);
            }
            wrap.appendChild(input);
            const m = open({
                title: tr(opts.title, "Input"),
                small: true,
                body: wrap,
                actions: [
                    { label: tr(opts.okLabel, "OK"), primary: true, onClick: function () { answered = true; resolve(input.value); } },
                    { label: tr(opts.cancelLabel, "Cancel"), onClick: function () { answered = true; resolve(null); } },
                ],
                onClose: function () { if (!answered) resolve(null); },
            });
            input.addEventListener("keydown", function (e) {
                if (e.key === "Enter") { e.preventDefault(); answered = true; resolve(input.value); m.close(); }
            });
            requestAnimationFrame(function () { try { input.focus(); input.select(); } catch { /* detached */ } });
        });
    }

    // Self-inject this component's stylesheet once, so it works from the JS alone (no
    // manifest/all.css step needed). Idempotent + prepended so a consumer's own CSS wins.
    (function(){var _c="\n  from { opacity: 0; transform: translateY(4px); }\n  to { opacity: 1; transform: translateY(0); }\n  from { opacity: 0; transform: scale(0.9) translateY(-10px); }\n  to { opacity: 1; transform: scale(1) translateY(0); }\n\n/* ===================== drag / resize handles (modal-drag.js) ===================== */\n.modal-resize { position: absolute; z-index: 10; }\n.modal-resize-n { top: -4px; left: 14px; right: 14px; height: 8px; cursor: ns-resize; }\n.modal-resize-s { bottom: -4px; left: 14px; right: 14px; height: 8px; cursor: ns-resize; }\n.modal-resize-e { top: 14px; right: -4px; bottom: 14px; width: 8px; cursor: ew-resize; }\n.modal-resize-w { top: 14px; left: -4px; bottom: 14px; width: 8px; cursor: ew-resize; }\n.modal-resize-ne { top: -4px; right: -4px; width: 18px; height: 18px; cursor: nesw-resize; }\n.modal-resize-nw { top: -4px; left: -4px; width: 18px; height: 18px; cursor: nwse-resize; }\n.modal-resize-se { bottom: -4px; right: -4px; width: 18px; height: 18px; cursor: nwse-resize; }\n.modal-resize-sw { bottom: -4px; left: -4px; width: 18px; height: 18px; cursor: nesw-resize; }\n\n/* ===================== help overlay grid (help-overlay.js) ===================== */\n.help-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 24px; }\n.help-section h3 {\n  font-size: 12px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  color: var(--cyan);\n  margin-bottom: 10px;\n  padding-bottom: 6px;\n  border-bottom: 1px solid var(--border);\n}\n.help-row { display: flex; justify-content: space-between; gap: 12px; padding: 4px 0; font-size: 12px; color: var(--text-dim); }\n.help-row span { text-align: right; }\n.help-row kbd, .help-row code {\n  font-size: 11px;\n  font-family: \"Share Tech Mono\", monospace;\n  color: var(--cyan);\n  background: var(--bg-secondary);\n  border: 1px solid var(--border);\n  border-radius: 3px;\n  padding: 1px 5px;\n  white-space: nowrap;\n}\n\n/* ---- full modal styling ported verbatim from Audio-Haxor (incl. list-picker variants: body-list / list-entries / filter-count / row-inline / wide / loading) ---- */\n\n\n/* Frosted glass effect for overlays — must follow `--bg-card` (light theme was ignored when this used fixed dark rgba). */\n.modal-content, .ctx-menu, .palette-box {\n    backdrop-filter: blur(12px) saturate(1.4);\n    -webkit-backdrop-filter: blur(12px) saturate(1.4);\n    background: color-mix(in srgb, var(--bg-card) 92%, transparent) !important;\n}\n    .modal-content, .ctx-menu, .palette-box {\n        background: var(--bg-card) !important;\n    }\n\n/* Wet glass highlight + frosted glass on all interactive panels */\n.modal-content, .hm-card, .walker-tile,\n.plugin-card, .fav-item, .note-card, .tag-manager-card, .sp-item,\n.shortcut-row, .ctx-menu, .palette-box, .audio-now-playing {\n    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 50%);\n}\n\n/* Frosted glass on overlays */\n.modal-content, .ctx-menu, .palette-box, .audio-now-playing {\n    backdrop-filter: blur(12px) saturate(1.4);\n    -webkit-backdrop-filter: blur(12px) saturate(1.4);\n}\n\n/* Modal entrance - only animate when visible */\n.modal-overlay.modal-visible {\n    animation: modal-fade-in 0.2s ease-out;\n}\n\n.modal-overlay.modal-visible .modal-content {\n    animation: modal-zoom-in 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n}\n\n/* Modal overlay — hidden by default, shown via .modal-visible class */\n.modal-overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 25000;\n    background: rgba(0, 0, 0, 0.7);\n    display: none;\n    align-items: center;\n    justify-content: center;\n}\n.modal-overlay.modal-visible {\n    display: flex !important;\n    animation: fadeIn 0.2s ease-out;\n}\n\n.modal-content {\n    background: var(--bg-primary);\n    border: 1px solid var(--cyan);\n    box-shadow: 0 0 40px var(--cyan-glow);\n    max-width: 700px;\n    width: 90%;\n    max-height: 80vh;\n    overflow: hidden;\n    border-radius: 2px;\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    animation: modal-zoom-in 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), neon-border-glow 2.5s ease-in-out infinite 0.3s;\n}\n\n.modal-small {\n    max-width: 480px;\n}\n\n.modal-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 16px 20px;\n    border-bottom: 1px solid var(--border);\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);\n}\n\n.modal-header h2 {\n    font-family: 'Orbitron', sans-serif;\n    font-size: 14px;\n    color: var(--cyan);\n    text-transform: uppercase;\n    letter-spacing: 2px;\n}\n\n.modal-close {\n    background: transparent;\n    border: 1px solid var(--border);\n    color: var(--text-muted);\n    font-size: 14px;\n    width: 28px;\n    height: 28px;\n    cursor: pointer;\n    border-radius: 2px;\n}\n\n.modal-close:hover {\n    color: var(--red);\n    border-color: var(--red);\n}\n\n.modal-body {\n    padding: 20px;\n    overflow-y: auto;\n    flex: 1;\n}\n\n/* Blacklist / whitelist list modals — explicit classes instead of inline\n   style=\"display:flex\" which release WebKit strips on plain divs.\n   Ref: feedback_tauri_build_differences.md */\n.modal-body-list {\n    padding: 16px;\n    display: block;\n    max-height: 60vh;\n    overflow: hidden;\n}\n.modal-row-inline {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    margin-bottom: 12px;\n}\n.modal-input-flex {\n    flex: 1 1 auto;\n    min-width: 0;\n    padding: 8px;\n    background: var(--bg-secondary);\n    border: 1px solid var(--border);\n    color: var(--text);\n    font-size: 12px;\n    font-family: inherit;\n    border-radius: 2px;\n}\n.modal-filter-count {\n    font-size: 11px;\n    color: var(--text-dim);\n    min-width: 60px;\n    flex: 0 0 auto;\n}\n.modal-list-desc {\n    font-size: 12px;\n    color: var(--text-dim);\n    padding-bottom: 8px;\n    margin-bottom: 12px;\n    border-bottom: 1px solid var(--border);\n}\n.modal-list-entries {\n    overflow-y: auto;\n    background: var(--bg-secondary);\n    border: 1px solid var(--border);\n    padding: 8px;\n    font-family: monospace;\n    font-size: 11px;\n    min-height: 200px;\n    max-height: 400px;\n    margin-bottom: 12px;\n}\n.modal-list-loading { color: var(--text-dim); }\n.modal-row-footer {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n.modal-footer-count {\n    font-size: 11px;\n    color: var(--text-dim);\n}\n\n.modal-wide {\n    max-width: 640px;\n}\n\n/* Genre rules dashboard — all colors via classes, no inline styles.\n   Uses --border (not --border-color), hardcoded fallbacks for release WebKit. */\n#genreRulesModal .modal-content {\n    max-width: 95vw !important;\n    width: 95vw !important;\n    max-height: 95vh !important;\n    height: 95vh !important;\n}\n#genreRulesModal .modal-body {\n    overflow-y: auto !important;\n    max-height: calc(90vh - 60px) !important;\n    padding: 12px !important;\n}\n.smart-playlist-modal .modal-header h2 {\n    font-family: 'Orbitron', 'Share Tech Mono', monospace;\n    font-size: 14px;\n    text-transform: uppercase;\n    letter-spacing: 3px;\n    color: var(--cyan);\n    text-shadow: 0 0 8px var(--cyan-glow);\n}\n\n.fb-bulk-rename-footer .modal-footer-count {\n    margin-right: auto;\n}\n\n#dupModal .modal-close {\n    flex-shrink: 0;\n}\n\n/* Override modal-header padding when used on player toolbar */\n.np-toolbar.modal-header {\n    padding: 6px 12px;\n}\n\nbody.no-neon-glow .modal-content {\n    box-shadow: 0 0 20px var(--cyan-glow);\n}";try{if(typeof document!=="undefined"&&!document.getElementById("zg-modal-css")){var _s=document.createElement("style");_s.id="zg-modal-css";_s.textContent=_c;var _h=document.head||document.documentElement;_h.insertBefore(_s,_h.firstChild);}}catch(_e){}})();
    window.ZGui = window.ZGui || {};
    window.ZGui.modal = { open: open, confirm: confirm, prompt: prompt, stack: stack };
    // Expose the built-in enhancer under the standard name so consumers (dock-panel, floating-dock)
    // that call ZGui.modalDrag work even when the standalone modal-drag.js isn't loaded. If that file
    // loads later it overwrites this with its own (functionally equivalent) implementation.
    if (!window.ZGui.modalDrag) window.ZGui.modalDrag = { init: enhanceDragResize };
})();
