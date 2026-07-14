// zgui-core/toast.js — the generic toast/notification system, distilled from Audio-Haxor's
// ipc.js (showToast / recordToastHistory) + toast-history.js (viewer) + utils.js (global progress).
// Slide-in neon toasts with type variants, a capped in-memory history, a searchable history modal,
// and a top-of-window indeterminate progress bar. window.ZGui.toast.
//
//   ZGui.toast.show(message, duration?=2500, type?='', extraClass?='')
//        type: '' | 'error' | 'warning' | 'mono-paths'
//   ZGui.toast.history()           -> [{ t, message, type, duration }]
//   ZGui.toast.clearHistory()
//   ZGui.toast.showHistory() / closeHistory()   // searchable modal
//   ZGui.toast.progress.show() / hide()         // top-of-window progress bar
//
// The container and progress bar are auto-injected; no markup required in the host page.
// Consumers pass already-formatted (localized) strings — i18n stays in the app.
(function () {
    "use strict";

    const HISTORY_MAX = 500;
    window.__toastHistory = window.__toastHistory || [];

    const esc = window.escapeHtml || function (s) {
        return String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
            ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    };

    function container() {
        let c = document.getElementById("zs-toast-container");
        if (!c) {
            c = document.createElement("div");
            c.id = "zs-toast-container";
            c.className = "zs-toast-container";
            document.body.appendChild(c);
        }
        return c;
    }

    function recordHistory(message, type, duration) {
        const hist = window.__toastHistory;
        hist.push({
            t: Date.now(),
            message: String(message == null ? "" : message),
            type: type || "info",
            duration: Number(duration) || 0,
        });
        if (hist.length > HISTORY_MAX) hist.splice(0, hist.length - HISTORY_MAX);
        document.dispatchEvent(new CustomEvent("toast-history-update"));
    }

    function show(message, duration, type, extraClass) {
        duration = duration == null ? 2500 : duration;
        type = type || "";
        extraClass = extraClass || "";
        recordHistory(message, type, duration);
        if (type === "error" && window.vstUpdater && window.vstUpdater.appendLog) {
            window.vstUpdater.appendLog("TOAST_ERROR: " + message);
        }
        // When the window is backgrounded / heavy-CPU-idle, drop the slide-in (host opt-in hook).
        if (typeof window.isUiIdleHeavyCpu === "function" && window.isUiIdleHeavyCpu()) return;
        const c = container();
        const el = document.createElement("div");
        el.className = "zs-toast" + (type ? " zs-toast-" + type : "") + (extraClass ? " " + extraClass : "");
        el.textContent = message;
        const fadeStart = (duration - 300) / 1000;
        el.style.animation = `zs-toast-in 0.3s ease-out, zs-toast-out 0.3s ease-in ${fadeStart}s forwards`;
        c.appendChild(el);
        setTimeout(() => el.remove(), duration);
        return el;
    }

    // Clear any visible toasts when the window goes idle (host dispatches this event).
    document.addEventListener("ui-idle-heavy-cpu", (e) => {
        if (!e.detail || !e.detail.idle) return;
        const c = document.getElementById("zs-toast-container");
        if (c) c.innerHTML = "";
    });

    // ── top-of-window indeterminate progress bar ──
    function progressBar() {
        let p = document.getElementById("zs-global-progress");
        if (!p) {
            p = document.createElement("div");
            p.id = "zs-global-progress";
            p.className = "zs-global-progress";
            p.innerHTML = '<div class="zs-global-progress-fill"></div>';
            document.body.appendChild(p);
        }
        return p;
    }
    const progress = {
        show() { progressBar().classList.add("active"); },
        hide() { const p = document.getElementById("zs-global-progress"); if (p) p.classList.remove("active"); },
    };

    // ── searchable history viewer (self-contained modal, zs-toast-hist-* chrome) ──
    function fmtTime(ms) {
        const d = new Date(ms);
        const p = (n) => String(n).padStart(2, "0");
        return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    }
    function renderRows(rows) {
        if (!rows.length) return `<p class="zs-toast-hist-empty">No notifications yet.</p>`;
        return rows.map((e) => {
            const type = e.type || "info";
            return `<div class="zs-toast-hist-row">
              <span class="zs-toast-hist-time" title="${esc(new Date(e.t).toLocaleString())}">${esc(fmtTime(e.t))}</span>
              <span class="zs-toast-hist-badge zs-th-${esc(type)}">${esc(type)}</span>
              <span class="zs-toast-hist-msg">${esc(e.message)}</span>
            </div>`;
        }).join("");
    }
    function applyFilter() {
        const input = document.getElementById("zs-toast-hist-search");
        const list = document.getElementById("zs-toast-hist-list");
        const cnt = document.getElementById("zs-toast-hist-count");
        const tot = document.getElementById("zs-toast-hist-total");
        if (!list) return;
        const all = window.__toastHistory.slice().reverse();
        const q = input ? input.value.trim().toLowerCase() : "";
        const filtered = q
            ? all.filter((e) => e.message.toLowerCase().includes(q) || (e.type || "").toLowerCase().includes(q))
            : all;
        list.innerHTML = renderRows(filtered);
        if (cnt) cnt.textContent = String(filtered.length);
        if (tot) tot.textContent = String(all.length);
    }
    function showHistory() {
        closeHistory();
        const html = `<div class="zs-toast-hist-overlay" id="zs-toast-hist-modal">
          <div class="zs-toast-hist-box">
            <div class="zs-toast-hist-head">
              <h2>Notifications</h2>
              <button class="zs-toast-hist-close" title="Close">&times;</button>
            </div>
            <div class="zs-toast-hist-body">
              <div class="zs-toast-hist-toolbar">
                <input type="text" class="zs-input zs-toast-hist-search" id="zs-toast-hist-search"
                       placeholder="Search notifications…" autocomplete="off" spellcheck="false">
                <span class="zs-badge" id="zs-toast-hist-count">0</span>
              </div>
              <div class="zs-toast-hist-list" id="zs-toast-hist-list"></div>
              <div class="zs-toast-hist-foot">
                <span><span id="zs-toast-hist-total">0</span> entries</span>
                <button class="zs-btn zs-btn-mini zs-toast-hist-clear">Clear all</button>
              </div>
            </div>
          </div>
        </div>`;
        document.body.insertAdjacentHTML("beforeend", html);
        const modal = document.getElementById("zs-toast-hist-modal");
        applyFilter();
        const input = document.getElementById("zs-toast-hist-search");
        if (input) {
            input.addEventListener("input", applyFilter);
            requestAnimationFrame(() => { try { input.focus(); } catch { /* detached */ } });
        }
        modal.addEventListener("click", (e) => { if (e.target === modal) closeHistory(); });
        modal.querySelector(".zs-toast-hist-close").addEventListener("click", closeHistory);
        modal.querySelector(".zs-toast-hist-clear").addEventListener("click", clearHistory);
    }
    function closeHistory() {
        document.querySelectorAll("#zs-toast-hist-modal").forEach((el) => el.remove());
    }
    function clearHistory() {
        window.__toastHistory.length = 0;
        applyFilter();
    }
    document.addEventListener("toast-history-update", () => {
        if (document.getElementById("zs-toast-hist-modal")) applyFilter();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && document.getElementById("zs-toast-hist-modal")) { closeHistory(); e.stopPropagation(); }
    });

    // Self-inject this component's stylesheet once, so it works from the JS alone (no
    // manifest/all.css step needed). Idempotent + prepended so a consumer's own CSS wins.
    (function(){var _c="\n.zs-toast {\n  padding: 10px 18px;\n  border-radius: 2px;\n  font-size: 12px;\n  font-weight: 600;\n  font-family: \"Orbitron\", sans-serif;\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  color: var(--cyan);\n  border: 1px solid var(--cyan);\n  background: var(--bg-primary);\n  box-shadow: 0 0 15px var(--cyan-glow), 0 0 30px rgba(5, 217, 232, 0.1);\n  pointer-events: auto;\n}\n.zs-toast-error {\n  color: var(--red, #ff073a);\n  border-color: var(--red, #ff073a);\n  box-shadow: 0 0 15px rgba(255, 7, 58, 0.3), 0 0 30px rgba(255, 7, 58, 0.1);\n}\n.zs-toast-warning {\n  color: var(--cyan);\n  border-color: var(--cyan);\n  box-shadow: 0 0 15px var(--cyan-glow), 0 0 30px rgba(5, 217, 232, 0.1);\n  text-transform: none;\n  letter-spacing: 0.5px;\n  line-height: 1.35;\n}\n/* Path toast: keep paths literal (no uppercase), allow newlines */\n.zs-toast-mono-paths {\n  text-transform: none;\n  letter-spacing: 0.35px;\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n  font-weight: 500;\n  line-height: 1.45;\n  white-space: pre-line;\n  max-width: min(96vw, 520px);\n  word-break: break-all;\n}\n  from { opacity: 0; transform: translateX(40px); }\n  to { opacity: 1; transform: translateX(0); }\n  from { opacity: 1; transform: translateX(0); }\n  to { opacity: 0; transform: translateX(40px); }\n\n/* ===================== top-of-window progress bar ===================== */\n.zs-global-progress {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  z-index: 30000;\n  display: none;\n}\n.zs-global-progress.active { display: block; }\n.zs-global-progress-fill {\n  height: 100%;\n  background: linear-gradient(90deg, var(--cyan), var(--magenta), var(--cyan));\n  background-size: 200% 100%;\n  animation: zs-progress-indeterminate 1.5s ease-in-out infinite, zs-progress-color-shift 3s linear infinite;\n  box-shadow: 0 0 8px var(--cyan-glow);\n}\n  0% { width: 0%; margin-left: 0%; }\n  50% { width: 40%; margin-left: 30%; }\n  100% { width: 0%; margin-left: 100%; }\n  0% { background-position: 0% 0%; }\n  100% { background-position: 200% 0%; }\n\n/* ===================== history modal ===================== */\n.zs-toast-hist-overlay {\n  position: fixed; inset: 0; z-index: 31000;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex; justify-content: center; align-items: flex-start;\n  padding-top: 12vh;\n}\n.zs-toast-hist-box {\n  width: min(92vw, 560px); max-height: 70vh;\n  display: flex; flex-direction: column;\n  background: var(--bg-card, #0d0d1a);\n  border: 1px solid var(--cyan, #05d9e8);\n  box-shadow: 0 0 40px rgba(5, 217, 232, 0.15), 0 20px 60px rgba(0, 0, 0, 0.5);\n  border-radius: 6px; overflow: hidden;\n}\n.zs-toast-hist-head {\n  display: flex; align-items: center; justify-content: space-between;\n  padding: 12px 16px; border-bottom: 1px solid var(--border);\n}\n.zs-toast-hist-head h2 { margin: 0; font-size: 14px; color: var(--cyan); font-family: \"Orbitron\", sans-serif; letter-spacing: 1px; }\n.zs-toast-hist-close { background: transparent; border: none; color: var(--text-dim); cursor: pointer; font-size: 18px; }\n.zs-toast-hist-close:hover { color: var(--accent); }\n.zs-toast-hist-body { display: flex; flex-direction: column; min-height: 0; padding: 12px 16px; gap: 10px; }\n.zs-toast-hist-toolbar { display: flex; align-items: center; gap: 8px; }\n.zs-toast-hist-search { flex: 1; }\n.zs-toast-hist-list { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }\n.zs-toast-hist-empty { color: var(--text-dim); text-align: center; padding: 24px; }\n.zs-toast-hist-row {\n  display: flex; align-items: center; gap: 10px;\n  padding: 6px 8px; border: 1px solid var(--border); border-radius: 3px;\n  background: var(--bg-secondary); font-size: 12px;\n}\n.zs-toast-hist-time { color: var(--text-dim); font-family: \"Share Tech Mono\", monospace; flex-shrink: 0; }\n.zs-toast-hist-badge {\n  flex-shrink: 0; font-size: 9px; text-transform: uppercase; letter-spacing: 1px;\n  padding: 2px 6px; border-radius: 3px; border: 1px solid var(--cyan); color: var(--cyan);\n}\n.zs-toast-hist-badge.zs-th-error { border-color: var(--red, #ff073a); color: var(--red, #ff073a); }\n.zs-toast-hist-badge.zs-th-warning { border-color: var(--accent, #ff2a6d); color: var(--accent, #ff2a6d); }\n.zs-toast-hist-msg { flex: 1; color: var(--text); word-break: break-word; }\n.zs-toast-hist-foot {\n  display: flex; align-items: center; justify-content: space-between;\n  font-size: 11px; color: var(--text-dim); padding-top: 8px; border-top: 1px solid var(--border);\n}\n\n/* ---- notification toast (ported verbatim from Audio-Haxor: type variants + container + mono paths) ---- */\n\n\n/* Toast slide + glow */\n.toast {\n    animation: toast-in 0.3s ease-out, toast-glow 2s ease-in-out infinite 0.3s;\n}\n\n\n/* Toast notifications — the fixed viewport container toast.js creates as `.zs-toast-container`.\n   (Was `.toast-container`, which matched nothing, so toasts fell to the bottom of the document\n   flow instead of being pinned to the screen.) */\n.zs-toast-container {\n    position: fixed;\n    bottom: 24px;\n    left: 24px;\n    z-index: 9998;\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n    pointer-events: none;\n}\n\n\n.toast {\n    padding: 10px 18px;\n    border-radius: 2px;\n    font-size: 12px;\n    font-weight: 600;\n    font-family: 'Orbitron', sans-serif;\n    text-transform: uppercase;\n    letter-spacing: 1.5px;\n    color: var(--cyan);\n    border: 1px solid var(--cyan);\n    background: var(--bg-primary);\n    box-shadow: 0 0 15px var(--cyan-glow), 0 0 30px rgba(5, 217, 232, 0.1);\n    animation: toast-in 0.3s ease-out, toast-out 0.3s ease-in 2.2s forwards;\n    pointer-events: auto;\n}\n\n\n.toast.toast-error {\n    color: var(--red);\n    border-color: var(--red);\n    box-shadow: 0 0 15px rgba(255, 7, 58, 0.3), 0 0 30px rgba(255, 7, 58, 0.1);\n}\n\n\n.toast.toast-warning {\n    color: var(--cyan);\n    border-color: var(--cyan);\n    box-shadow: 0 0 15px var(--cyan-glow), 0 0 30px rgba(5, 217, 232, 0.1);\n    text-transform: none;\n    letter-spacing: 0.5px;\n    line-height: 1.35;\n}\n\n\n/* Folder-watch toast: paths must stay literal (no uppercase), allow newlines */\n.toast.toast-mono-paths {\n    text-transform: none;\n    letter-spacing: 0.35px;\n    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n    font-weight: 500;\n    line-height: 1.45;\n    white-space: pre-line;\n    max-width: min(96vw, 520px);\n    word-break: break-all;\n}";try{if(typeof document!=="undefined"&&!document.getElementById("zg-toast-css")){var _s=document.createElement("style");_s.id="zg-toast-css";_s.textContent=_c;var _h=document.head||document.documentElement;_h.insertBefore(_s,_h.firstChild);}}catch(_e){}})();
    window.ZGui = window.ZGui || {};
    window.ZGui.toast = {
        show: show,
        recordHistory: recordHistory,
        history() { return window.__toastHistory.slice(); },
        clearHistory: clearHistory,
        showHistory: showHistory,
        closeHistory: closeHistory,
        progress: progress,
    };
    // Back-compat globals so the optional toast hooks in drag.js / consumers resolve.
    if (typeof window.showToast !== "function") window.showToast = show;
    if (typeof window.showGlobalProgress !== "function") window.showGlobalProgress = progress.show;
    if (typeof window.hideGlobalProgress !== "function") window.hideGlobalProgress = progress.hide;
})();
