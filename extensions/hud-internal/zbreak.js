/* zwire HUD — Break Mode (ports Vivaldi's Break Mode). Hides EVERY tab behind a
 * full-screen break screen so you can step away. Driven by a shared storage flag
 * (zb_break) so one command blanks every tab at once; Resume/Esc clears it
 * everywhere. Opened from the ⌘K palette ("Break mode") via window.__zbBreakOn().
 *
 * Pure: no state to test beyond the flag; this file is UI + a storage listener. */
(function () {
  'use strict';
  if (typeof window === 'undefined' || typeof document === 'undefined' || typeof chrome === 'undefined' || !chrome.storage) return;
  if (window.__zbBreakLoaded) return;
  window.__zbBreakLoaded = true;

  var screenEl = null;
  function ensureStyle() {
    if (document.getElementById('zb-break-style')) return;
    var s = document.createElement('style'); s.id = 'zb-break-style';
    s.textContent = [
      '.zb-break{position:fixed;inset:0;z-index:2147483647;background:var(--bg-primary,#05070d);',
      ' display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;',
      ' font-family:"Share Tech Mono",Monaco,monospace;backdrop-filter:blur(6px);}',
      '.zb-break h1{color:var(--cyan,#05d9e8);font-size:44px;letter-spacing:.3em;text-shadow:0 0 20px var(--cyan-glow,rgba(5,217,232,.5));margin:0;}',
      '.zb-break p{color:var(--text-dim,#7a8ba8);font-size:14px;margin:0;}',
      '.zb-break button{cursor:pointer;background:none;border:1px solid var(--cyan,#05d9e8);color:var(--cyan,#05d9e8);',
      ' border-radius:5px;padding:10px 26px;font:14px "Share Tech Mono",monospace;letter-spacing:.1em;}',
      '.zb-break button:hover{background:var(--cyan-dim,rgba(5,217,232,.15));}'
    ].join('');
    (document.head || document.documentElement).appendChild(s);
  }
  function setFlag(v) { try { chrome.storage.local.set({ zb_break: !!v }); } catch (e) {} }
  function show() {
    if (screenEl) return;
    ensureStyle();
    screenEl = document.createElement('div'); screenEl.className = 'zb-break';
    var h = document.createElement('h1'); h.textContent = 'BREAK';
    var p = document.createElement('p'); p.textContent = 'zwire is paused · press Resume or Esc';
    var b = document.createElement('button'); b.textContent = 'RESUME'; b.addEventListener('click', function () { setFlag(false); });
    screenEl.appendChild(h); screenEl.appendChild(p); screenEl.appendChild(b);
    (document.body || document.documentElement).appendChild(screenEl);
    document.documentElement.style.overflow = 'hidden';
  }
  function hide() { if (screenEl) { try { screenEl.remove(); } catch (e) {} screenEl = null; document.documentElement.style.overflow = ''; } }

  // React to the shared flag so every tab shows/hides the break screen together.
  try {
    chrome.storage.local.get('zb_break', function (o) { void chrome.runtime.lastError; if (o && o.zb_break) show(); });
    chrome.storage.onChanged.addListener(function (ch, area) { if (area === 'local' && ch.zb_break) { ch.zb_break.newValue ? show() : hide(); } });
  } catch (e) {}

  window.__zbBreakOn = function () { setFlag(true); };
  document.addEventListener('keydown', function (e) { if (screenEl && e.key === 'Escape') { e.preventDefault(); setFlag(false); } }, true);
})();
