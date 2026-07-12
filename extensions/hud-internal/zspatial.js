/* zwire HUD — Spatial Navigation (ports Vivaldi's spatial navigation). Shift+Arrow
 * moves focus to the nearest focusable element (link / button / field) in that
 * direction, geometrically — no Tab-order guessing. The focused element gets a
 * cyan outline; Enter activates it natively. Disable via zb_spatial.
 *
 * The pure direction picker is exposed as window.__zbSpatialPick for tests. */
(function () {
  'use strict';

  // Given candidate centers + the current focus center, pick the nearest one in
  // `dir`. Score = primary-axis distance + 2× cross-axis misalignment (favours
  // aligned, close targets). Returns the winning index, or -1.
  function pickInDirection(cands, from, dir) {
    var best = -1, bestScore = Infinity;
    for (var i = 0; i < (cands || []).length; i++) {
      var c = cands[i], dx = c.cx - from.cx, dy = c.cy - from.cy, primary, cross;
      if (dir === 'right') { if (dx <= 1) continue; primary = dx; cross = Math.abs(dy); }
      else if (dir === 'left') { if (dx >= -1) continue; primary = -dx; cross = Math.abs(dy); }
      else if (dir === 'down') { if (dy <= 1) continue; primary = dy; cross = Math.abs(dx); }
      else { if (dy >= -1) continue; primary = -dy; cross = Math.abs(dx); }
      var score = primary + cross * 2;
      if (score < bestScore) { bestScore = score; best = i; }
    }
    return best;
  }
  if (typeof window !== 'undefined') window.__zbSpatialPick = pickInDirection;

  if (typeof window === 'undefined' || typeof document === 'undefined' || typeof chrome === 'undefined' || !chrome.storage) return;
  if (window.__zbSpatialLoaded) return;
  window.__zbSpatialLoaded = true;

  var enabled = true;
  try {
    chrome.storage.local.get('zb_spatial', function (o) { void chrome.runtime.lastError; if (o && o.zb_spatial === false) enabled = false; });
    chrome.storage.onChanged.addListener(function (ch, area) { if (area === 'local' && ch.zb_spatial) enabled = ch.zb_spatial.newValue !== false; });
  } catch (e) {}

  var SEL = 'a[href],button,input:not([type=hidden]):not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]),[role=button],[role=link]';
  var lastEl = null;
  function ensureStyle() {
    if (document.getElementById('zb-spatial-style')) return;
    var s = document.createElement('style'); s.id = 'zb-spatial-style';
    s.textContent = '.zb-spatial-focus{outline:2px solid var(--cyan,#05d9e8) !important;outline-offset:2px !important;box-shadow:0 0 12px var(--cyan-glow,rgba(5,217,232,.5)) !important;}';
    (document.head || document.documentElement).appendChild(s);
  }
  function visibleFocusables() {
    var out = [];
    try {
      document.querySelectorAll(SEL).forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) return;
        if (r.bottom < 0 || r.top > window.innerHeight || r.right < 0 || r.left > window.innerWidth) return;   // roughly on-screen
        out.push({ el: el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 });
      });
    } catch (e) {}
    return out;
  }
  function move(dir) {
    ensureStyle();
    var cands = visibleFocusables();
    if (!cands.length) return;
    var ae = document.activeElement, from;
    if (ae && ae !== document.body && ae.getBoundingClientRect) { var r = ae.getBoundingClientRect(); from = { cx: r.left + r.width / 2, cy: r.top + r.height / 2 }; }
    else from = { cx: window.innerWidth / 2, cy: dir === 'down' ? 0 : (dir === 'up' ? window.innerHeight : window.innerHeight / 2) };
    var idx = pickInDirection(cands, from, dir);
    if (idx < 0) return;
    var pick = cands[idx].el;
    if (lastEl) try { lastEl.classList.remove('zb-spatial-focus'); } catch (e) {}
    try { pick.classList.add('zb-spatial-focus'); pick.focus({ preventScroll: false }); pick.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } catch (e) {}
    lastEl = pick;
  }
  var DIR = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
  document.addEventListener('keydown', function (e) {
    if (!enabled || !e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;
    var d = DIR[e.key]; if (!d) return;
    var ae = document.activeElement;
    if (ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName || '')) return;   // don't hijack while editing a field
    e.preventDefault(); move(d);
  }, true);

  window.__zbSpatialToggle = function () {
    try { chrome.storage.local.get('zb_spatial', function (o) { void chrome.runtime.lastError; var on = !(o && o.zb_spatial === false); chrome.storage.local.set({ zb_spatial: !on }); }); } catch (e) {}
  };
})();
