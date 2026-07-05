/* zwire — keep the terminal overlay open across page navigation.
 * terminal.js persists visibility in per-origin localStorage, which does NOT
 * carry across different sites. This mirrors the open state into
 * chrome.storage.local ('zb_term_open') so when the overlay re-injects on the
 * next page it re-opens automatically — and the background worker reconnects the
 * same tab's PTY, so the shell session continues. */
(function () {
  'use strict';
  function setOpen(v) { try { chrome.storage.local.set({ zb_term_open: !!v }); } catch (e) {} }
  function watch() {
    var pane = document.getElementById('terminalPane');
    if (!pane) { setTimeout(watch, 150); return; }
    // observe the pane's active-state (however show/hide is triggered) and mirror it
    try {
      var obs = new MutationObserver(function () { setOpen(pane.classList.contains('active')); });
      obs.observe(pane, { attributes: true, attributeFilter: ['class'] });
    } catch (e) {}
    // auto-reopen if the terminal was open on the previous page
    try { chrome.storage.local.get('zb_term_open', function (o) { if (o && o.zb_term_open && window.showTerminal) window.showTerminal(); }); } catch (e) {}
  }
  watch();
})();
