/* zwire HUD — Periodic Reload (ports Vivaldi's periodic reload). Auto-reloads the
 * current tab on a chosen interval. The interval lives in sessionStorage, which
 * survives the reload (and is per-tab), so it keeps firing until turned Off.
 * Opened from the ⌘K palette ("Periodic reload") via window.__zbReloadOpen().
 *
 * The interval presets are exposed as window.__zbReloadPresets for tests. */
(function () {
  'use strict';

  var PRESETS = [['Off', 0], ['5s', 5000], ['10s', 10000], ['30s', 30000], ['1m', 60000], ['5m', 300000], ['15m', 900000]];
  if (typeof window !== 'undefined') window.__zbReloadPresets = PRESETS;

  if (typeof window === 'undefined' || typeof document === 'undefined') return;   // headless
  if (window.__zbReloadLoaded) return;
  window.__zbReloadLoaded = true;

  var KEY = 'zbReloadMs';
  function getMs() { try { return parseInt(sessionStorage.getItem(KEY) || '0', 10) || 0; } catch (e) { return 0; } }
  function setMs(ms) { try { if (ms > 0) sessionStorage.setItem(KEY, String(ms)); else sessionStorage.removeItem(KEY); } catch (e) {} }
  var timer = 0;
  function schedule() {
    if (timer) { clearTimeout(timer); timer = 0; }
    var ms = getMs();
    if (ms > 0) timer = setTimeout(function () { try { location.reload(); } catch (e) {} }, ms);
  }
  schedule();   // re-arm on every load (sessionStorage persists across the reload)

  var overlay = null;
  function ensureStyle() {
    if (document.getElementById('zb-reload-style')) return;
    var s = document.createElement('style'); s.id = 'zb-reload-style';
    s.textContent = [
      '.zb-rl{position:fixed;top:14vh;right:24px;z-index:2147483646;width:200px;background:var(--bg-primary,#0a0d16);',
      ' border:1px solid var(--cyan,#05d9e8);border-radius:6px;box-shadow:0 0 40px var(--cyan-glow,rgba(5,217,232,.4));',
      ' font-family:"Share Tech Mono",Monaco,monospace;overflow:hidden;}',
      '.zb-rl-hd{padding:10px 12px;border-bottom:1px solid var(--border,#1a1a3e);color:var(--cyan,#05d9e8);font-size:12px;letter-spacing:.06em;text-transform:uppercase;}',
      '.zb-rl-row{padding:8px 12px;cursor:pointer;color:var(--text,#e0f0ff);font-size:13px;display:flex;justify-content:space-between;}',
      '.zb-rl-row:hover{background:var(--bg-hover,#12172a);}',
      '.zb-rl-row.on{color:var(--cyan,#05d9e8);}'
    ].join('');
    (document.head || document.documentElement).appendChild(s);
  }
  function close() { if (overlay) { try { overlay.remove(); } catch (e) {} overlay = null; } }
  function open() {
    if (overlay) { close(); return; }
    ensureStyle();
    var cur = getMs();
    overlay = document.createElement('div'); overlay.className = 'zb-rl';
    var hd = document.createElement('div'); hd.className = 'zb-rl-hd'; hd.textContent = 'Periodic Reload'; overlay.appendChild(hd);
    PRESETS.forEach(function (p) {
      var row = document.createElement('div'); row.className = 'zb-rl-row' + (cur === p[1] ? ' on' : '');
      var l = document.createElement('span'); l.textContent = p[0]; row.appendChild(l);
      if (cur === p[1]) { var c = document.createElement('span'); c.textContent = '✓'; row.appendChild(c); }
      row.addEventListener('click', function () { setMs(p[1]); schedule(); close(); });
      overlay.appendChild(row);
    });
    (document.body || document.documentElement).appendChild(overlay);
  }
  window.__zbReloadOpen = open;
  document.addEventListener('keydown', function (e) { if (overlay && e.key === 'Escape') { e.preventDefault(); close(); } }, true);
})();
