/* zwire HUD — Keyboard settings. Remap ALL zwire shortcuts (vim motions,
 * palette, find, tabs, marks) from one page. Overrides live in
 * chrome.storage.local 'zb_keys' { <action>: <key> }; the content scripts
 * (zvim/zpalette/zfind) merge them over the defaults in zkeys.js. Extension
 * command shortcuts have their own page (Extensions › Shortcuts). */
(function () {
  'use strict';
  var Z = window.ZGui;
  var esc = (Z.util && Z.util.escapeHtml) || function (s) { return String(s == null ? '' : s); };
  var REG = window.ZWIRE_KEYMAP || { categories: [], global: [], native: [] };
  var overrides = {};        // zb_keys
  var filter = '';
  var capturing = null;

  var shell = window.ZBHUD.mount({
    title: 'KEYBOARD', current: 'keys.html', filterPlaceholder: '>_ filter shortcuts…',
    onFilter: function (v) { filter = (v || '').toLowerCase(); render(); }
  });
  var body = shell.body;

  function keyOf(a) { return overrides[a.name] || a.def; }
  function match(a) { return !filter || (a.label + ' ' + a.name + ' ' + keyOf(a)).toLowerCase().indexOf(filter) >= 0; }
  function save(cb) { try { chrome.storage.local.set({ zb_keys: overrides }, function () { void chrome.runtime.lastError; if (cb) cb(); }); } catch (e) { if (cb) cb(); } }

  // detect a conflict: another action currently bound to the same key
  function conflict(name, key) {
    var hit = null;
    REG.categories.forEach(function (c) { c.actions.forEach(function (a) { if (a.name !== name && keyOf(a) === key) hit = a.label; }); });
    return hit;
  }

  function startCapture(chip, a) {
    if (capturing) endCapture();
    capturing = { chip: chip, a: a };
    chip.textContent = 'press a key…'; chip.classList.add('capturing');
    document.addEventListener('keydown', onCap, true);
  }
  function endCapture() { if (!capturing) return; document.removeEventListener('keydown', onCap, true); capturing = null; }
  function onCap(e) {
    if (!capturing) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (e.key === 'Escape') { endCapture(); render(); return; }
    if (['Shift', 'Control', 'Alt', 'Meta'].indexOf(e.key) >= 0) return;   // wait for the real key
    var a = capturing.a, key = e.key;
    endCapture();
    if (key === a.def) { delete overrides[a.name]; }   // back to default
    else { overrides[a.name] = key; }
    var c = conflict(a.name, key);
    save(function () { if (c && Z.toast) Z.toast('Note: "' + key + '" also runs ' + c); render(); });
  }

  function chipFor(a) {
    var cur = keyOf(a), isOver = !!overrides[a.name];
    var kbd = document.createElement('kbd');
    kbd.className = 'xt-kbd xt-kbd-edit'; kbd.tabIndex = 0; kbd.title = 'click to remap';
    kbd.textContent = cur === ' ' ? 'Space' : cur;
    kbd.addEventListener('click', function () { startCapture(kbd, a); });
    kbd.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startCapture(kbd, a); } });
    var wrap = document.createElement('span');
    wrap.appendChild(kbd);
    if (isOver) {
      var reset = document.createElement('button'); reset.className = 'zs-btn zs-btn-mini'; reset.textContent = 'reset';
      reset.style.marginLeft = '8px';
      reset.addEventListener('click', function () { delete overrides[a.name]; save(render); });
      wrap.appendChild(reset);
    }
    return wrap;
  }

  function catCard(cat) {
    var acts = cat.actions.filter(match);
    if (!acts.length) return null;
    var inner = document.createElement('div');
    inner.appendChild(el('div', 'set-h', '// ' + cat.label.toUpperCase()));
    var list = el('div', 'info-list');
    acts.forEach(function (a) {
      var row = el('div', 'info-row');
      row.appendChild(el('span', 'ik', esc(a.label)));
      var iv = el('span', 'iv'); iv.appendChild(chipFor(a));
      if (overrides[a.name]) { var d = el('span', 'sub'); d.textContent = ' default ' + a.def; iv.appendChild(d); }
      row.appendChild(iv);
      list.appendChild(row);
    });
    inner.appendChild(list);
    return Z.card({ body: inner }).el;
  }
  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }

  function render() {
    body.innerHTML = '';
    // toolbar: reset-all + extension-shortcuts link
    var bar = el('div', 'ci-toolbar');
    bar.appendChild(el('div', 'ci-hint', 'Click a key to remap · Esc cancel · press the default to clear an override. tmux split prefix is native (Ctrl-b) and fixed.'));
    var acts = el('div', 'ci-actions');
    acts.appendChild(Z.button({ label: 'RESET ALL', variant: 'mini', onClick: function () { overrides = {}; save(render); } }));
    acts.appendChild(Z.button({ label: 'EXTENSION SHORTCUTS ↗', variant: 'mini', onClick: function () { try { chrome.tabs.create({ url: chrome.runtime.getURL('pages/extensions.html') + '#shortcuts' }); } catch (e) {} } }));
    bar.appendChild(acts);
    body.appendChild(Z.card({ body: bar }).el);

    (REG.categories || []).forEach(function (c) { var card = catCard(c); if (card) body.appendChild(card); });

    // global chorded hotkeys (⌘/Ctrl + key)
    if (REG.global && REG.global.length) {
      var gcat = { label: 'Global (⌘/Ctrl +)', actions: REG.global };
      var g = catCard(gcat); if (g) body.appendChild(g);
    }
    // native, read-only
    if (REG.native && REG.native.length) {
      var inner = el('div');
      inner.appendChild(el('div', 'set-h', '// NATIVE (FIXED)'));
      var list = el('div', 'info-list');
      REG.native.forEach(function (a) {
        var row = el('div', 'info-row');
        row.appendChild(el('span', 'ik', esc(a.label)));
        row.appendChild(el('span', 'iv', '<kbd class="xt-kbd">' + esc(a.def) + '</kbd> <span class="sub">built into the fork</span>'));
        list.appendChild(row);
      });
      inner.appendChild(list);
      body.appendChild(Z.card({ body: inner }).el);
    }
  }

  try { chrome.storage.local.get('zb_keys', function (o) { void chrome.runtime.lastError; overrides = (o && o.zb_keys) || {}; render(); }); } catch (e) { render(); }
})();
