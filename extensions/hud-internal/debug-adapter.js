/* zwire HUD Internal — generic zgui-component adapter for STATIC chrome:// debug
 * pages. Rather than only CSS-skinning the native markup (theme.js), this swaps
 * each native <table> for a real ZGui.dataTable (sortable, HUD-styled, cells
 * preserved) so token-less debug dumps (histograms, policy, *-internals, …) read
 * as first-class HUD surfaces built from actual zgui components.
 *
 * Scope: only the STATIC hosts listed in the manifest match — LIVE/streaming
 * pages (net-internals, omnibox, tracing, …) are deliberately NOT matched, since
 * replacing their self-updating DOM would go stale or break them; those keep the
 * CSS-skin from theme.js. util.js (window.escapeHtml) + data-table.js are loaded
 * ahead of this by the manifest; the vars come from theme.js on the page :root. */
(function () {
  'use strict';
  if (!window.ZGui || !window.ZGui.dataTable) return;   // deps missing — no-op
  var Z = window.ZGui;

  function txt(c) { return c ? (c.textContent || '').trim() : ''; }

  function convert(table, idx) {
    try {
      if (table.getAttribute('data-zb-adapted')) return;
      // skip nested tables — the outer one carries them
      if (table.parentElement && table.parentElement.closest('table')) return;

      var thead = table.tHead;
      var allRows = Array.prototype.slice.call(table.rows);
      if (!allRows.length) return;

      var hdr = null, bodyStart = 0;
      if (thead && thead.rows.length) hdr = thead.rows[thead.rows.length - 1];
      else if (allRows[0].querySelector('th')) { hdr = allRows[0]; bodyStart = 1; }

      var ncols = hdr ? hdr.cells.length : 0;
      allRows.forEach(function (r) { if (r.cells.length > ncols) ncols = r.cells.length; });
      if (ncols < 1) return;

      var columns = [];
      for (var i = 0; i < ncols; i++) (function (i) {
        columns.push({
          key: 'c' + i,
          label: hdr && hdr.cells[i] ? txt(hdr.cells[i]) : ('col ' + (i + 1)),
          render: function (r) { return r['h' + i] || ''; }   // 'h' = original cell HTML (links etc. preserved)
        });
      })(i);

      var bodyRows = thead
        ? Array.prototype.slice.call(table.tBodies).reduce(function (a, tb) { return a.concat(Array.prototype.slice.call(tb.rows)); }, [])
        : allRows.slice(bodyStart);

      var rows = [];
      bodyRows.forEach(function (r) {
        if (!r.cells.length) return;
        var row = {};
        for (var i = 0; i < ncols; i++) {
          var c = r.cells[i];
          row['c' + i] = txt(c);          // sort key (text)
          row['h' + i] = c ? c.innerHTML : '';
        }
        rows.push(row);
      });
      if (!rows.length) return;

      var wrap = document.createElement('div');
      wrap.className = 'zb-adapted';
      table.parentNode.insertBefore(wrap, table.nextSibling);
      Z.dataTable(wrap, { columns: columns, rows: rows, resizable: false, sortScope: 'zbadapt:' + location.host + ':' + idx });
      table.setAttribute('data-zb-adapted', '1');
      table.style.display = 'none';        // keep the original in the DOM, just hidden
    } catch (e) { /* leave the native table (CSS-skin still applies) */ }
  }

  function run() {
    var tables = document.querySelectorAll('table:not([data-zb-adapted])');
    for (var i = 0; i < tables.length; i++) convert(tables[i], i);
  }

  run();
  // some debug pages fill their tables a beat after load — retry a couple times.
  setTimeout(run, 300);
  setTimeout(run, 1200);
})();
