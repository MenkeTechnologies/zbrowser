/* zbrowser HUD pages — shared scheme apply + picker. These are extension pages,
 * so they can call chrome.runtime.sendNativeMessage directly (source of truth =
 * ~/.zbrowser/hud-scheme via the native host). */
(function () {
  'use strict';
  var HUD = window.ZBROWSER_HUD || {};
  var SCHEMES = HUD.SCHEMES || {};
  var ORDER = HUD.ORDER || ['cyberpunk'];
  var VAR_KEYS = HUD.VAR_KEYS || [];
  var HOST = 'com.zbrowser.hud';
  var applied = null;

  function apply(name) {
    var s = SCHEMES[name]; if (!s) return;
    var vars = s.vars || {}, root = document.documentElement;
    for (var i = 0; i < VAR_KEYS.length; i++) if (vars[VAR_KEYS[i]]) root.style.setProperty(VAR_KEYS[i], vars[VAR_KEYS[i]]);
    root.setAttribute('data-hud-scheme', name);
    applied = name;
    if (window.__zbRenderPicker) window.__zbRenderPicker(name);
  }
  function getScheme(cb) {
    try {
      chrome.runtime.sendNativeMessage(HOST, { cmd: 'get' }, function (r) {
        if (chrome.runtime.lastError || !r) return cb('cyberpunk');
        cb(r.scheme || 'cyberpunk');
      });
    } catch (e) { cb('cyberpunk'); }
  }
  function setScheme(name) {
    apply(name);
    // native host -> ~/.zbrowser/hud-scheme (drives the compiled color mixer)
    try { chrome.runtime.sendNativeMessage(HOST, { scheme: name }, function () { void chrome.runtime.lastError; }); } catch (e) {}
    // storage bus -> the chrome:// theme content scripts follow live
    try { if (chrome.storage && chrome.storage.local) chrome.storage.local.set({ zb_scheme: name }); } catch (e) {}
  }

  // picker
  function buildPicker() {
    var wrap = document.createElement('div'); wrap.id = 'zbhud-picker';
    var toggle = document.createElement('button'); toggle.id = 'zbhud-toggle'; toggle.textContent = '◨ HUD';
    var panel = document.createElement('div'); panel.id = 'zbhud-panel';
    toggle.onclick = function () { panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; };
    wrap.appendChild(toggle); wrap.appendChild(panel);
    document.body.appendChild(wrap);
    window.__zbRenderPicker = function (cur) {
      panel.innerHTML = '';
      var t = document.createElement('div'); t.className = 'zbhud-title'; t.textContent = '// COLOR SCHEME'; panel.appendChild(t);
      var grid = document.createElement('div'); grid.className = 'zbhud-grid';
      ORDER.forEach(function (n) {
        var s = SCHEMES[n]; if (!s) return;
        var b = document.createElement('button'); b.className = 'zbhud-btn' + (n === cur ? ' active' : '');
        var dot = document.createElement('span'); dot.className = 'zbhud-dot';
        dot.style.background = 'linear-gradient(135deg,' + s.vars['--accent'] + ' 0 50%,' + s.vars['--cyan'] + ' 50% 100%)';
        var l = document.createElement('span'); l.textContent = s.label || n;
        b.appendChild(dot); b.appendChild(l);
        b.onclick = function () { setScheme(n); };
        grid.appendChild(b);
      });
      panel.appendChild(grid);
    };
    window.__zbRenderPicker(applied || 'cyberpunk');
  }

  window.__zbSetScheme = setScheme;
  window.__zbApplied = function () { return applied; };

  // Shared nav bar so the (untypeable) extension URLs don't matter — click to
  // move between our HUD pages. (chrome://extensions|settings|version still work
  // when typed — they redirect here.)
  // Our own HUD pages (extension URLs, linked directly).
  var PAGES = [['EXTENSIONS', 'extensions.html'], ['SETTINGS', 'settings.html'],
    ['HISTORY', 'history.html'], ['DOWNLOADS', 'downloads.html'], ['BOOKMARKS', 'bookmarks.html'],
    ['SYSTEM', 'version.html'], ['NEW TAB', 'chrome://newtab']];
  // Chrome pages we can't rewrite (native + scheme-themed). Extension pages can't
  // hyperlink chrome:// URLs (blocked), so these open through the tabs API.
  var NATIVE_PAGES = [['FLAGS', 'chrome://flags'], ['DISCARDS', 'chrome://discards'],
    ['DNS', 'chrome://net-internals/#dns'], ['PASSWORDS', 'chrome://password-manager'],
    ['GPU', 'chrome://gpu'], ['NET', 'chrome://net-internals'], ['PREFS', 'chrome://prefs-internals']];

  function navLink(label, target, cur) {
    var a = document.createElement('a');
    var isOwn = target && target.indexOf('chrome://') !== 0;
    a.className = 'xt-navlink' + (isOwn && target === cur ? ' active' : '') + (isOwn ? '' : ' native');
    a.textContent = label;
    if (isOwn) {
      a.href = chrome.runtime.getURL('pages/' + target);
    } else {
      // chrome:// (incl. newtab) — can't be hyperlinked from an extension page.
      a.href = '#';
      a.title = target;
      a.onclick = function (e) { e.preventDefault(); try { chrome.tabs.create({ url: target }); } catch (ex) {} };
    }
    return a;
  }
  function buildNav() {
    var bar = document.querySelector('.xt-topbar');
    if (!bar || bar.querySelector('.xt-nav')) return;
    var nav = document.createElement('nav'); nav.className = 'xt-nav';
    var cur = location.pathname.split('/').pop();
    PAGES.forEach(function (p) { nav.appendChild(navLink(p[0], p[1], cur)); });
    var sep = document.createElement('span'); sep.className = 'xt-nav-sep'; sep.textContent = '·';
    nav.appendChild(sep);
    NATIVE_PAGES.forEach(function (p) { nav.appendChild(navLink(p[0], p[1], cur)); });
    var search = bar.querySelector('.xt-search');
    if (search) bar.insertBefore(nav, search); else bar.appendChild(nav);
  }

  function boot() {
    getScheme(apply);
    // No floating picker — scheme is chosen from the nav's SETTINGS page.
    if (document.body) { buildNav(); }
    else document.addEventListener('DOMContentLoaded', function () { buildNav(); });
    setInterval(function () { getScheme(function (s) { if (s !== applied) apply(s); }); }, 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
