/* zwire HUD History (replaces chrome://history) — full impl on chrome.history:
 * browse (fzf/regex filter), open, DELETE a visit, and CLEAR ALL. ZGui.dataTable +
 * ZGui.button row actions + ZGui.modal confirm — all zgui-core. */
(function () {
  'use strict';
  function fmt(t) { try { var d = new Date(t); return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } }

  ZBList({
    title: 'HISTORY', current: 'history.html', placeholder: 'filter history…', noun: 'visits',
    // Pull the full store (native page shows everything); startTime 0 = all time.
    load: function (cb) { chrome.history.search({ text: '', maxResults: 50000, startTime: 0 }, function (res) { cb((res || []).sort(function (a, b) { return b.lastVisitTime - a.lastVisitTime; })); }); },
    // deleteUrl / deleteAll fire onVisitRemoved → auto-refresh.
    watch: function (reload) { if (chrome.history.onVisitRemoved) chrome.history.onVisitRemoved.addListener(reload); },
    rowKey: function (r) { return r.id || r.url; },
    toolbar: [
      { icon: '⌫', label: 'Clear all', title: 'Delete all browsing history', danger: true, onClick: function () {
        window.ZGui.modal.open({
          title: 'Clear all history', small: true,
          body: 'Permanently delete your entire browsing history? This cannot be undone.',
          actions: [
            { label: 'Cancel', close: true },
            { label: 'Delete all', danger: true, onClick: function (api) { chrome.history.deleteAll(function () {}); api.close(); } }
          ]
        });
      } }
    ],
    rowActions: [
      { icon: '✕', title: 'Delete this URL from history', danger: true, onClick: function (r) { chrome.history.deleteUrl({ url: r.url }, function () {}); } }
    ],
    columns: [
      { key: 'time', label: 'Visited', width: '180px', sortable: false, render: function (r) { return fmt(r.lastVisitTime); } },
      { key: 'title', label: 'Title', render: function (r) { return r.title || r.url; } },
      { key: 'visitCount', label: 'Visits', width: '70px', render: function (r) { return String(r.visitCount || 1); } },
      { key: 'url', label: 'URL', render: function (r) { var a = document.createElement('a'); a.href = r.url; a.textContent = r.url; a.style.color = 'var(--cyan)'; return a; } }
    ],
    text: function (r) { return (r.title || '') + ' ' + r.url; },
    onRowClick: function (r) { chrome.tabs.create({ url: r.url }); }
  });
})();
