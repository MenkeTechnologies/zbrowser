/* zwire newtab — tmux CARRIER host. Chrome won't inject hud-internal's overlay
 * content script onto a chrome-extension:// page, so a saved layout whose panes
 * are all new-tab pages has no http/https/file page to carry the overlay. This
 * page (tmux.html) IS that carrier: it ships its own copy of the zgui-core tmux
 * overlay and drives it exactly like hud-internal's ztmux-config.js, but seeds the
 * session from its URL hash (#zbtmux=<encoded session>) because chrome.storage is
 * per-extension and the sessions live in hud-internal's storage, not ours.
 *
 * hud-internal/background.js opens us at chrome-extension://<newtab>/tmux.html
 * #zbtmux=<encodeURIComponent(JSON.stringify(session))>; we decode it, hand it to
 * ZGui.tmux as its one saved session, and attach it. Panes are same-origin
 * new-tab iframes (name 'zbtmux'), so newtab/tmux-pane.js runs inside each and
 * forwards the prefix + synced keystrokes up here — same protocol as the http path. */
(function () {
  'use strict';
  if (window.top !== window) return;              // panes are iframes; only the carrier top-frame hosts the overlay
  if (window.__ztmuxCfgLoaded) return; window.__ztmuxCfgLoaded = true;

  // our own new-tab is what a fresh/empty pane opens (same page chrome://newtab redirects to).
  var NEWTAB = 'chrome-extension://' + chrome.runtime.id + '/newtab.html';
  function looksUrl(q) { return /^[a-z][a-z0-9+.\-]*:\/\//i.test(q) || (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(q) && q.indexOf(' ') < 0); }
  function normalizeUrl(v) {
    v = (v || '').trim(); if (!v || v === 'about:blank') return NEWTAB;
    if (/^[a-z][a-z0-9+.\-]*:\/\//i.test(v)) return v;
    if (looksUrl(v)) return 'https://' + v;
    return 'https://www.google.com/search?q=' + encodeURIComponent(v);
  }
  function hostLabel(url) { try { return (url && url !== NEWTAB) ? new URL(normalizeUrl(url)).hostname.replace(/^www\./, '') : 'newtab'; } catch (e) { return 'newtab'; } }

  // The per-pane chrome (address bar + framed page). zgui-core's tmux.css self-injects
  // the tiling geometry; this is the same 12 lines ztmux-config.css carries on the http path.
  (function injectPaneCss() {
    if (document.getElementById('ztx-pane-css')) return;
    var css = '#zg-tmux .ztx-pane{display:flex;flex-direction:column;width:100%;height:100%;min-width:0;min-height:0;}' +
      '#zg-tmux .ztx-addr{flex:0 0 auto;height:22px;padding:2px 8px;box-sizing:border-box;background:var(--bg-card,#0a0d16);color:var(--text,#c8d2e0);border:none;border-bottom:1px solid var(--border,#1a2436);outline:none;font:12px "Share Tech Mono",Monaco,monospace;}' +
      '#zg-tmux .ztx-addr::placeholder{color:var(--text-muted,#5a6b82);}' +
      '#zg-tmux .ztx-fr{flex:1 1 auto;width:100%;border:0;background:#fff;}';
    try { var s = document.createElement('style'); s.id = 'ztx-pane-css'; s.textContent = css; (document.head || document.documentElement).appendChild(s); } catch (e) {}
  })();

  // Build a pane: an address bar + a framed web page, into the element ZGui.tmux hands us.
  function mountPane(bodyEl, ref) {
    bodyEl.textContent = '';
    var url = (ref && ref.url) || NEWTAB;
    var wrap = document.createElement('div'); wrap.className = 'ztx-pane';
    var addr = document.createElement('input'); addr.className = 'ztx-addr'; addr.spellcheck = false;
    addr.placeholder = 'url or search …'; addr.value = (url && url !== NEWTAB) ? url : '';
    var fr = document.createElement('iframe'); fr.className = 'ztx-fr'; fr.name = 'zbtmux';
    fr.setAttribute('allow', 'clipboard-read; clipboard-write; fullscreen');
    fr.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads allow-top-navigation-by-user-activation allow-storage-access-by-user-activation allow-presentation');
    fr.src = normalizeUrl(url);
    function go(u) { u = normalizeUrl(u); ref.url = u; fr.src = u; try { fr.focus(); } catch (e) {} }
    addr.addEventListener('keydown', function (e) { e.stopPropagation(); if (e.key === 'Enter') go(addr.value); });
    wrap.appendChild(addr); wrap.appendChild(fr); bodyEl.appendChild(wrap);
    bodyEl._ztxFrame = fr; bodyEl._ztxAddr = addr; bodyEl._ztxRef = ref;
    return ref;
  }
  function frameOf(bodyEl) { return bodyEl && bodyEl._ztxFrame; }
  function postToPane(bodyEl, msg) { var fr = frameOf(bodyEl); if (fr) try { fr.contentWindow.postMessage(Object.assign({ __zbtmux: 1 }, msg), '*'); } catch (e) {} }
  function bodyOfSource(src) {
    var frs = document.querySelectorAll('#zg-tmux iframe.ztx-fr');
    for (var i = 0; i < frs.length; i++) if (frs[i].contentWindow === src) return frs[i].closest('.zt-pane-body') || frs[i].parentNode.parentNode;
    return null;
  }

  // The session to attach rides in our hash (#zbtmux=<encoded session>) — chrome.storage
  // is per-extension, so we can't read hud-internal's zb_tmux_sessions. Hand it to
  // ZGui.tmux as its one saved session so loadSession(id) finds it.
  function hashSession() {
    try {
      var m = /[#&]zbtmux=([^&]+)/.exec(location.hash || '');
      if (!m) return null;
      var s = JSON.parse(decodeURIComponent(m[1]));
      return (s && s.id && s.windows && s.windows.length) ? s : null;
    } catch (e) { return null; }
  }
  var SESSION = hashSession();

  function prefsLoad() { return Promise.resolve({ tmuxSessions: SESSION ? [SESSION] : [] }); }
  function prefsSave(p) { try { chrome.storage.local.set({ zb_tmux_sessions: p.tmuxSessions || [] }); } catch (e) {} return Promise.resolve(); }

  function boot() {
    if (!window.ZGui || !ZGui.tmux) return;
    ZGui.tmux.init({
      prefs: { load: prefsLoad, save: prefsSave },
      prefixInEditable: true,
      openEmptyPane: function (bodyEl) { var ref = { url: NEWTAB }; mountPane(bodyEl, ref); return Promise.resolve(ref); },
      renderPane: function (bodyEl, ref) { mountPane(bodyEl, ref); },
      paneLabel: function (ref) { return hostLabel(ref && ref.url); },
      // Saved-layouts editor "set…" button: prompt for the pane's web URL. Without this the editor
      // renders panes as read-only labels (tmux.js gates the button on pickPaneRef being present).
      pickPaneRef: function (curRef) {
        if (!window.ZGui || !ZGui.modal || !ZGui.modal.prompt) return Promise.resolve(undefined);
        return ZGui.modal.prompt({
          title: "Pane URL",
          message: "Web page URL for this pane (blank = empty pane).",
          value: (curRef && curRef.url) || "",
          placeholder: "https://…"
        }).then(function (v) {
          if (v == null) return undefined;           // cancelled → leave the pane unchanged
          v = v.trim();
          return v ? { url: v } : null;              // blank → empty pane
        });
      },
      applyKey: function (bodyEl, key) { postToPane(bodyEl, { syncapply: key }); },
      setSync: function (bodyEl, on) { postToPane(bodyEl, { setSync: !!on }); },
      setStatus: function (on) { try { chrome.storage.local.set({ zb_status: !!on }); } catch (e) {} },
      copyMode: function (bodyEl) { postToPane(bodyEl, { copyMode: true }); },
      paste: function (bodyEl, text) { postToPane(bodyEl, { pasteText: text }); }
    });
    if (SESSION) attach();
  }

  // init()'s prefs load is async, so SESSIONS may not be populated on the first tick
  // (loadSession no-ops until it is). Poll until the overlay opens — the poll IS the retry.
  function attach() {
    var tries = 0;
    (function ping() {
      if (!window.ZGui || !ZGui.tmux || !ZGui.tmux.loadSession) { if (tries++ < 25) setTimeout(ping, 120); return; }
      try { ZGui.tmux.loadSession(SESSION.id); } catch (e) {}
      if (ZGui.tmux.isOpen && ZGui.tmux.isOpen()) return;
      if (tries++ < 25) setTimeout(ping, 120);
    })();
  }

  // Relay pane-forwarder messages into ZGui.tmux (the prefix is pressed INSIDE a pane).
  window.addEventListener('message', function (ev) {
    var d = ev.data; if (!d || !d.__zbtmux || !window.ZGui || !ZGui.tmux) return;
    if (d.prefix) ZGui.tmux.prefix();
    else if (d.cmdKey) ZGui.tmux.key(d.cmdKey, { ctrl: d.ctrl, alt: d.alt });
    else if (d.palette) { try { if (window.__zbPaletteOpen) window.__zbPaletteOpen(); } catch (e) {} }
    else if (d.loc) {
      var bl = bodyOfSource(ev.source);
      if (bl && bl._ztxRef) { bl._ztxRef.url = d.loc; if (bl._ztxAddr) bl._ztxAddr.value = (d.loc && d.loc !== NEWTAB) ? d.loc : ''; }
    }
    else if (d.synckey) { var b = bodyOfSource(ev.source); if (b) ZGui.tmux.relaySync(b, d.synckey); }
    else if (d.syncReq) { var bq = bodyOfSource(ev.source); if (bq && ZGui.tmux.syncOf) postToPane(bq, { setSync: ZGui.tmux.syncOf(bq) }); }
    else if (d.yank) ZGui.tmux.yank(d.yank, d.append);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
