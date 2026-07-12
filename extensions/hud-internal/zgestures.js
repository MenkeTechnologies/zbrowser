/* zwire HUD — Mouse Gestures (ports Vivaldi's mouse gestures). Hold the RIGHT
 * button and draw: Left=back, Right=forward, Up=new tab, Down-Right=close tab,
 * Up-Down=reload, Down-Up=reopen closed tab. Actions run through the zb_cmd bus.
 * Toggle on/off from the ⌘K palette ("Toggle mouse gestures", zb_gestures flag).
 *
 * The pure gesture recognizer is exposed as window.__zbGesture for tests. */
(function () {
  'use strict';

  // Reduce a point path to a compressed direction sequence (e.g. "L", "DR", "UD").
  // A new direction is only recorded once movement passes `threshold`.
  function gesture(points, threshold) {
    threshold = threshold || 30;
    points = points || [];
    if (points.length < 2) return '';
    var seq = [], last = '', px = points[0].x, py = points[0].y;
    for (var i = 1; i < points.length; i++) {
      var dx = points[i].x - px, dy = points[i].y - py;
      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) continue;
      var dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : (dy > 0 ? 'D' : 'U');
      if (dir !== last) { seq.push(dir); last = dir; }
      px = points[i].x; py = points[i].y;
    }
    return seq.join('');
  }
  var MAP = { L: 'goBack', R: 'goForward', U: 'newTab', DR: 'closeTab', UD: 'reload', DU: 'reopenTab' };
  if (typeof window !== 'undefined') { window.__zbGesture = gesture; window.__zbGestureMap = MAP; }

  if (typeof window === 'undefined' || typeof document === 'undefined' || typeof chrome === 'undefined' || !chrome.storage) return;
  if (window.__zbGesturesLoaded) return;
  window.__zbGesturesLoaded = true;

  var enabled = true, tracking = false, pts = [], drew = false;
  try {
    chrome.storage.local.get('zb_gestures', function (o) { void chrome.runtime.lastError; if (o && o.zb_gestures === false) enabled = false; });
    chrome.storage.onChanged.addListener(function (ch, area) { if (area === 'local' && ch.zb_gestures) enabled = ch.zb_gestures.newValue !== false; });
  } catch (e) {}
  function cmd(o) { try { o.n = (window.__zbTick = (window.__zbTick || 0) + 1); chrome.storage.local.set({ zb_cmd: o }); } catch (e) {} }

  document.addEventListener('mousedown', function (e) { if (e.button === 2 && enabled) { tracking = true; drew = false; pts = [{ x: e.clientX, y: e.clientY }]; } }, true);
  document.addEventListener('mousemove', function (e) { if (tracking) { pts.push({ x: e.clientX, y: e.clientY }); if (pts.length > 3) drew = true; } }, true);
  document.addEventListener('mouseup', function (e) {
    if (!tracking || e.button !== 2) return;
    tracking = false;
    var g = gesture(pts);
    if (g && MAP[g]) { drew = true; cmd({ a: MAP[g] }); }
  }, true);
  // Swallow the context menu only when a gesture was actually drawn.
  document.addEventListener('contextmenu', function (e) { if (drew) { e.preventDefault(); drew = false; } }, true);

  window.__zbGesturesToggle = function () {
    try { chrome.storage.local.get('zb_gestures', function (o) { void chrome.runtime.lastError; var on = !(o && o.zb_gestures === false); chrome.storage.local.set({ zb_gestures: !on }); }); } catch (e) {}
  };
})();
