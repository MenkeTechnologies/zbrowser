/* zwire HUD — shared filtered-list page on ZGui.appShell + ZGui.dataTable.
 * Each list page (history/downloads/bookmarks) is just a config passed to
 * ZBList(cfg). fzf filter via the shell search; rows via ZGui.dataTable. */
(function () {
  'use strict';
  window.ZBList = function (cfg) {
    var FZ = window.ZGui.fzf, rows = [], query = '', regexOn = false;
    var shell = window.ZBHUD.mount({ title: cfg.title, current: cfg.current,
      filterPlaceholder: cfg.placeholder || 'filter…', onFilter: function (q, rx) { query = q; regexOn = rx; render(); } });
    var body = shell.body;

    function filtered() {
      if (!query.trim()) return rows;
      if (regexOn) {
        var re = null; try { re = new RegExp(query, 'i'); } catch (e) { re = null; }
        return re ? rows.filter(function (r) { return re.test(cfg.text(r)); }) : [];
      }
      return rows.map(function (r) { var m = FZ.fzfMatch(query, cfg.text(r)); return m ? { r: r, s: m.score } : null; })
        .filter(Boolean).sort(function (a, b) { return b.s - a.s; }).map(function (x) { return x.r; });
    }
    function render() {
      body.innerHTML = '';
      // optional toolbar (global actions) — real ZGui.button widgets.
      if (cfg.toolbar && cfg.toolbar.length && window.ZGui.button) {
        var bar = document.createElement('div');
        bar.className = 'zb-list-toolbar';
        bar.style.cssText = 'display:flex;gap:8px;margin:0 0 10px;flex-wrap:wrap;';
        cfg.toolbar.forEach(function (t) {
          var b = window.ZGui.button({ label: (t.icon ? t.icon + ' ' : '') + t.label, variant: t.variant || 'mini' });
          b.title = t.title || ''; if (t.danger) b.style.color = 'var(--accent)';
          b.addEventListener('click', function () { try { t.onClick(); } catch (e) {} });
          bar.appendChild(b);
        });
        body.appendChild(bar);
      }
      var shown = filtered();
      var host = document.createElement('div');
      body.appendChild(host);
      var foot = document.createElement('div'); foot.className = 'footer-docs';
      foot.textContent = '[ ' + shown.length + (cfg.noun ? ' ' + cfg.noun : '') + ' ]';
      body.appendChild(foot);
      if (!shown.length) { host.className = 'footer-docs'; host.textContent = '[ nothing here ]'; return; }
      // optional per-row action buttons (delete/edit/…) appended as a trailing column.
      var cols = cfg.columns;
      if (cfg.rowActions && cfg.rowActions.length && window.ZGui.button) {
        cols = cfg.columns.concat([{
          key: '__act', label: '', sortable: false, width: '1%',
          render: function (r) {
            var span = document.createElement('span'); span.style.whiteSpace = 'nowrap';
            cfg.rowActions.forEach(function (a) {
              var b = window.ZGui.button({ label: a.icon || a.label, variant: 'mini' });
              b.title = a.title || ''; if (a.danger) b.style.color = 'var(--accent)';
              b.addEventListener('click', function (e) { e.stopPropagation(); try { a.onClick(r); } catch (x) {} });
              span.appendChild(b);
            });
            return span;
          }
        }]);
      }
      window.ZGui.dataTable(host, { id: cfg.current, sortScope: cfg.current,
        columns: cols, rows: shown, rowKey: cfg.rowKey,
        onRowClick: cfg.onRowClick });
    }
    function reload() { cfg.load(function (r) { rows = r || []; render(); }); }
    reload();
    if (cfg.watch) cfg.watch(reload);
  };
})();
