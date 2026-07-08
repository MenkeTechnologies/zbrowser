/* zwire HUD Bookmarks (replaces chrome://bookmarks) — full CRUD on chrome.bookmarks:
 * browse (fzf/regex), open, ADD bookmark, ADD folder, EDIT, DELETE. Dialogs use
 * ZGui.modal + ZGui.textfield; row/toolbar actions use ZGui.button — all zgui-core.
 * (Folder move/reorg is the one native feature not exposed here — a tree editor.) */
(function () {
  'use strict';
  var Z = window.ZGui;

  function walk(nodes, path, out) {
    (nodes || []).forEach(function (n) {
      if (n.url) out.push({ title: n.title || n.url, url: n.url, path: path, id: n.id });
      else if (n.children) walk(n.children, path ? path + ' / ' + (n.title || '') : (n.title || ''), out);
    });
  }

  function field(label, value) {
    var wrap = document.createElement('div'); wrap.style.margin = '0 0 10px';
    var l = document.createElement('div'); l.textContent = label;
    l.style.cssText = 'font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--text-dim);margin:0 0 4px';
    wrap.appendChild(l);
    var f = Z.textfield({ value: value || '' });
    wrap.appendChild(f.el);
    return { wrap: wrap, get: function () { var i = f.el.querySelector('input,textarea'); return i ? i.value.trim() : ''; } };
  }

  function dialog(title, init, isFolder, onSave) {
    var t = field('Title', init.title || '');
    var u = isFolder ? null : field('URL', init.url || '');
    var body = document.createElement('div'); body.appendChild(t.wrap); if (u) body.appendChild(u.wrap);
    Z.modal.open({
      title: title, small: true, body: body,
      actions: [
        { label: 'Cancel', close: true },
        { label: 'Save', primary: true, onClick: function (api) { onSave(t.get(), u ? u.get() : null); api.close(); } }
      ]
    });
  }

  ZBList({
    title: 'BOOKMARKS', current: 'bookmarks.html', placeholder: 'filter bookmarks…', noun: 'bookmarks',
    load: function (cb) { chrome.bookmarks.getTree(function (tree) { var out = []; walk(tree, '', out); cb(out); }); },
    watch: function (reload) {
      if (chrome.bookmarks.onCreated) { chrome.bookmarks.onCreated.addListener(reload); chrome.bookmarks.onRemoved.addListener(reload); chrome.bookmarks.onChanged.addListener(reload); }
      if (chrome.bookmarks.onMoved) chrome.bookmarks.onMoved.addListener(reload);
    },
    rowKey: function (b) { return b.id; },
    toolbar: [
      { icon: '＋', label: 'Add bookmark', onClick: function () { dialog('Add bookmark', {}, false, function (title, url) { if (!url) return; chrome.bookmarks.create({ title: title || url, url: url }); }); } },
      { icon: '📁', label: 'Add folder', onClick: function () { dialog('Add folder', {}, true, function (title) { if (!title) return; chrome.bookmarks.create({ title: title }); }); } }
    ],
    rowActions: [
      { icon: '✎', title: 'Edit', onClick: function (b) { dialog('Edit bookmark', { title: b.title, url: b.url }, false, function (title, url) { chrome.bookmarks.update(b.id, { title: title, url: url }); }); } },
      { icon: '✕', title: 'Delete', danger: true, onClick: function (b) { chrome.bookmarks.remove(b.id, function () { void chrome.runtime.lastError; }); } }
    ],
    columns: [
      { key: 'path', label: 'Folder', width: '240px', render: function (b) { return b.path || '—'; } },
      { key: 'title', label: 'Title', render: function (b) { return b.title; } },
      { key: 'url', label: 'URL', render: function (b) { var a = document.createElement('a'); a.href = b.url; a.textContent = b.url; a.style.color = 'var(--cyan)'; return a; } }
    ],
    text: function (b) { return b.title + ' ' + b.url; },
    onRowClick: function (b) { chrome.tabs.create({ url: b.url }); }
  });
})();
