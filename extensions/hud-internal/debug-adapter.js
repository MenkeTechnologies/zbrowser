/* zwire HUD Internal — generic zgui-component adapter for STATIC chrome:// debug
 * pages. Rebuilds token-less native pages out of real zgui components:
 *   • every native <table>  → ZGui.dataTable (sortable, cells preserved)
 *   • each heading + its content → ZGui.card (leaf sections only, nodes MOVED so
 *     the page's own JS refs survive)
 *   • lists inside cards get the zgui info-list look
 * Works across OPEN shadow roots (chrome://gpu renders inside an <info-view>
 * shadow root), injecting the needed component CSS into each root so the pieces
 * are styled across the shadow boundary (theme.js's --vars inherit in).
 *
 * Scope: only the STATIC hosts in the manifest match. LIVE/streaming pages
 * (net-internals, omnibox, tracing, discards, …) are NOT matched — replacing
 * their self-updating DOM would go stale/break, so they keep theme.js's CSS-skin.
 * util.js + data-table.js + card.js load ahead of this. Everything is wrapped in
 * try/catch: anything that can't convert is left native (CSS-skin still applies). */
(function () {
  'use strict';
  if (!window.ZGui || !window.ZGui.dataTable) return;   // deps missing — no-op
  var Z = window.ZGui;
  var seq = 0;

  // Component CSS injected into each root (Document head + every shadow root),
  // mirroring zgui-core data-table.css / card / info-list, using theme.js vars.
  var CSS =
    '.zg-datatable{width:100%;border-collapse:collapse;font-size:12px;background:var(--bg-card);}' +
    '.zg-datatable thead th{text-align:left;padding:7px 10px;background:var(--bg-secondary);border-bottom:1px solid var(--border);color:var(--text-dim);font-family:"Orbitron",sans-serif;font-size:10px;letter-spacing:1px;text-transform:uppercase;white-space:nowrap;}' +
    '.zg-datatable th.zg-dt-sortable{cursor:pointer;}' +
    '.zg-datatable th.zg-dt-sortable:hover .zg-dt-th{color:var(--cyan);}' +
    '.zg-dt-th.asc::after{content:" \\25B2";font-size:8px;color:var(--cyan);}' +
    '.zg-dt-th.desc::after{content:" \\25BC";font-size:8px;color:var(--cyan);}' +
    '.zg-datatable tbody td{padding:6px 10px;border-bottom:1px solid var(--border);color:var(--text);}' +
    '.zg-datatable tbody tr:hover{background:var(--bg-hover);}' +
    '.zg-datatable tbody tr:nth-child(even) td{background:rgba(255,255,255,0.02);}' +
    '.zg-card{background:var(--bg-card);border:1px solid var(--border);box-shadow:0 0 0 1px var(--cyan-dim),0 4px 18px rgba(0,0,0,.4);margin:12px 0;}' +
    '.zg-card-head{padding:8px 12px;border-bottom:1px solid var(--border);background:var(--bg-secondary);}' +
    '.zg-card-title{color:var(--cyan);font-family:"Orbitron",sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;}' +
    '.zg-card-body{padding:12px;color:var(--text);}' +
    '.zg-card-body ul,.zg-card-body ol{list-style:none;margin:0;padding:0;}' +
    '.zg-card-body li{padding:4px 2px;border-bottom:1px solid var(--border);color:var(--text);}' +
    '.zg-card-body li:last-child{border-bottom:none;}' +
    '.zg-card-body dt{color:var(--text-dim);} .zg-card-body dd{color:var(--text);margin:0 0 6px 0;}';

  function txt(c) { return c ? (c.textContent || '').trim() : ''; }

  function ensureCss(root) {
    try {
      var target = root.nodeType === 9 ? (root.head || root.documentElement) : root;   // 9 = Document
      if (!target || (target.querySelector && target.querySelector('style[data-zbdt]'))) return;
      var st = document.createElement('style');
      st.setAttribute('data-zbdt', '1');
      st.textContent = CSS;
      target.appendChild(st);
    } catch (e) {}
  }

  function convertTable(table, root) {
    try {
      if (table.getAttribute('data-zb-adapted')) return;
      if (table.parentElement && table.parentElement.closest('table')) return;   // nested — outer carries it

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
          render: function (r) { return r['h' + i] || ''; }
        });
      })(i);

      var bodyRows = thead
        ? Array.prototype.slice.call(table.tBodies).reduce(function (a, tb) { return a.concat(Array.prototype.slice.call(tb.rows)); }, [])
        : allRows.slice(bodyStart);

      var rows = [];
      bodyRows.forEach(function (r) {
        if (!r.cells.length) return;
        var row = {};
        for (var i = 0; i < ncols; i++) { var c = r.cells[i]; row['c' + i] = txt(c); row['h' + i] = c ? c.innerHTML : ''; }
        rows.push(row);
      });
      if (!rows.length) return;

      ensureCss(root);
      var wrap = document.createElement('div');
      wrap.className = 'zb-adapted';
      table.parentNode.insertBefore(wrap, table.nextSibling);
      Z.dataTable(wrap, { columns: columns, rows: rows, resizable: false, sortScope: 'zbadapt:' + location.host + ':' + (seq++) });
      table.setAttribute('data-zb-adapted', '1');
      table.style.display = 'none';        // keep original in DOM as fallback
    } catch (e) {}
  }

  function hasHeading(nodes) {
    return nodes.some(function (n) {
      return n.nodeType === 1 && (/^H[1-4]$/.test(n.tagName) || (n.querySelector && n.querySelector('h1,h2,h3,h4')));
    });
  }

  // Wrap each heading + the content up to the next heading into a ZGui.card.
  // Leaf sections only (never engulf a subsection); nodes are MOVED, not cloned,
  // so any page JS still references live elements.
  function sectionize(root) {
    if (!Z.card) return;
    try {
      var headings = root.querySelectorAll ? Array.prototype.slice.call(root.querySelectorAll('h1,h2,h3,h4')) : [];
      headings.forEach(function (h) {
        try {
          if (h.getAttribute('data-zb-carded')) return;
          if (h.closest && (h.closest('.zg-card') || h.closest('table') || h.closest('.zg-datatable'))) return;
          var collected = [], sib = h.nextSibling;
          while (sib) { if (sib.nodeType === 1 && /^H[1-4]$/.test(sib.tagName)) break; var nx = sib.nextSibling; collected.push(sib); sib = nx; }
          if (!collected.some(function (n) { return n.nodeType === 1; })) return;   // nothing to wrap
          if (hasHeading(collected)) return;                                        // don't engulf subsections
          ensureCss(root);
          var body = document.createElement('div');
          collected.forEach(function (n) { body.appendChild(n); });   // MOVE the nodes
          var card = Z.card({ title: txt(h), body: body });
          h.parentNode.insertBefore(card.el, h);
          h.parentNode.removeChild(h);
          card.el.setAttribute('data-zb-carded', '1');
        } catch (e) {}
      });
    } catch (e) {}
  }

  function walk(root) {
    try {
      var tables = root.querySelectorAll ? root.querySelectorAll('table:not([data-zb-adapted])') : [];
      for (var i = 0; i < tables.length; i++) convertTable(tables[i], root);
      sectionize(root);
      var els = root.querySelectorAll ? root.querySelectorAll('*') : [];
      for (var j = 0; j < els.length; j++) if (els[j].shadowRoot) walk(els[j].shadowRoot);
    } catch (e) {}
  }

  function run() { walk(document); }
  run();
  setTimeout(run, 300);
  setTimeout(run, 1200);
})();
