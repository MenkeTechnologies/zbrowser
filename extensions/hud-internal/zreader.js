/* zwire HUD — Reader View (ports Vivaldi's Reader). Extracts the main article
 * from the page (best text-dense, low-link-density container) and shows it in a
 * clean, themed, distraction-free reading overlay. Opened from the ⌘K palette
 * ("Reader view") via window.__zbReaderOpen().
 *
 * The pure container scorer is exposed as window.__zbReaderScore for tests. */
(function () {
  'use strict';

  // Score a candidate container: paragraph text weighted down by link density,
  // boosted for semantic article/main tags. Highest score = the article body.
  function scoreContainer(c) {
    c = c || {};
    var base = (c.pText || 0) * (1 - Math.min(1, c.linkDensity || 0));
    if (c.tag === 'article' || c.tag === 'main') base *= 1.5;
    return base;
  }
  function bestOf(list) {
    var best = null, bestScore = -1;
    (list || []).forEach(function (c) { var s = scoreContainer(c); if (s > bestScore) { bestScore = s; best = c; } });
    return best;
  }
  if (typeof window !== 'undefined') { window.__zbReaderScore = scoreContainer; window.__zbReaderBest = bestOf; }

  if (typeof window === 'undefined' || typeof document === 'undefined' || typeof chrome === 'undefined') return;   // headless
  if (window.__zbReaderLoaded) return;
  window.__zbReaderLoaded = true;

  function textLen(el) { try { return (el.textContent || '').replace(/\s+/g, ' ').trim().length; } catch (e) { return 0; } }
  function linkDensity(el) { var t = textLen(el); if (!t) return 1; var lt = 0; try { el.querySelectorAll('a').forEach(function (a) { lt += textLen(a); }); } catch (e) {} return lt / t; }
  function pText(el) { var t = 0; try { el.querySelectorAll('p').forEach(function (p) { t += textLen(p); }); } catch (e) {} return t; }
  function bestContainer() {
    var els = [], seen = new Set();
    ['article', 'main', '[role=main]', '#content', '.content', '.post', '.article', '.entry', '.post-content', '.entry-content', '.markdown-body'].forEach(function (s) {
      try { document.querySelectorAll(s).forEach(function (e) { if (!seen.has(e)) { seen.add(e); els.push(e); } }); } catch (e) {}
    });
    try { document.querySelectorAll('div,section').forEach(function (e) { if (!seen.has(e) && e.querySelectorAll('p').length >= 3) { seen.add(e); els.push(e); } }); } catch (e) {}
    var scored = els.map(function (e) { return { el: e, tag: e.tagName.toLowerCase(), pText: pText(e), linkDensity: linkDensity(e) }; });
    var best = bestOf(scored);
    return (best && best.pText > 200) ? best.el : document.body;
  }

  var KEEP = { H1: 1, H2: 1, H3: 1, H4: 1, P: 1, UL: 1, OL: 1, LI: 1, BLOCKQUOTE: 1, PRE: 1, CODE: 1, FIGURE: 1, FIGCAPTION: 1, IMG: 1, EM: 1, STRONG: 1, A: 1, BR: 1 };
  function sanitize(node) {
    var out = node.cloneNode(false);
    // strip event handlers / styles / classes
    if (out.attributes) { Array.prototype.slice.call(out.attributes).forEach(function (a) { if (a.name !== 'href' && a.name !== 'src' && a.name !== 'alt') out.removeAttribute(a.name); }); }
    node.childNodes.forEach(function (ch) {
      if (ch.nodeType === 3) { out.appendChild(document.createTextNode(ch.nodeValue)); return; }
      if (ch.nodeType === 1 && KEEP[ch.tagName]) { var s = sanitize(ch); if (s) out.appendChild(s); }
    });
    return out;
  }

  var overlay = null;
  function ensureStyle() {
    if (document.getElementById('zb-reader-style')) return;
    var s = document.createElement('style'); s.id = 'zb-reader-style';
    s.textContent = [
      '.zb-reader{position:fixed;inset:0;z-index:2147483646;background:var(--bg-primary,#0a0d16);overflow-y:auto;}',
      '.zb-reader-bar{position:sticky;top:0;display:flex;justify-content:space-between;align-items:center;padding:12px 20px;',
      ' background:var(--bg-secondary,#12172a);border-bottom:1px solid var(--border,#1a1a3e);}',
      '.zb-reader-bar b{color:var(--cyan,#05d9e8);font:13px "Share Tech Mono",monospace;letter-spacing:.06em;}',
      '.zb-reader-x{cursor:pointer;background:none;border:1px solid var(--border,#1a1a3e);color:var(--text,#e0f0ff);border-radius:4px;padding:4px 12px;font:13px "Share Tech Mono",monospace;}',
      '.zb-reader-art{max-width:720px;margin:0 auto;padding:32px 24px 80px;color:var(--text,#e0f0ff);font:17px/1.7 Georgia,"Times New Roman",serif;}',
      '.zb-reader-art h1{font-size:30px;line-height:1.25;margin:0 0 8px;color:var(--text,#e0f0ff);font-family:"Share Tech Mono",monospace;}',
      '.zb-reader-art h2,.zb-reader-art h3,.zb-reader-art h4{font-family:"Share Tech Mono",monospace;color:var(--cyan,#05d9e8);margin:1.4em 0 .4em;}',
      '.zb-reader-art p{margin:0 0 1.1em;}',
      '.zb-reader-art a{color:var(--cyan,#05d9e8);}',
      '.zb-reader-art img{max-width:100%;height:auto;border-radius:4px;margin:1em 0;}',
      '.zb-reader-art pre,.zb-reader-art code{font-family:"Share Tech Mono",monospace;background:var(--bg-card,#12172a);}',
      '.zb-reader-art pre{padding:12px;border-radius:4px;overflow-x:auto;font-size:13px;}',
      '.zb-reader-art blockquote{border-left:3px solid var(--cyan,#05d9e8);margin:1em 0;padding:.2em 1em;color:var(--text-dim,#7a8ba8);}',
      '.zb-reader-meta{color:var(--text-muted,#3d4f6a);font:12px "Share Tech Mono",monospace;margin:0 0 24px;}'
    ].join('');
    (document.head || document.documentElement).appendChild(s);
  }
  function close() { if (overlay) { try { overlay.remove(); } catch (e) {} overlay = null; document.documentElement.style.overflow = ''; } }
  function open() {
    if (overlay) { close(); return; }
    ensureStyle();
    var container = bestContainer();
    overlay = document.createElement('div'); overlay.className = 'zb-reader';
    var bar = document.createElement('div'); bar.className = 'zb-reader-bar';
    var lab = document.createElement('b'); lab.textContent = 'READER'; bar.appendChild(lab);
    var x = document.createElement('button'); x.className = 'zb-reader-x'; x.textContent = 'Close (Esc)'; x.addEventListener('click', close); bar.appendChild(x);
    overlay.appendChild(bar);
    var art = document.createElement('div'); art.className = 'zb-reader-art';
    var h1 = document.createElement('h1');
    var pageH1 = document.querySelector('h1');
    h1.textContent = (pageH1 && pageH1.textContent.trim()) || document.title || 'Reader';
    art.appendChild(h1);
    var meta = document.createElement('div'); meta.className = 'zb-reader-meta';
    try { meta.textContent = location.hostname.replace(/^www\./, ''); } catch (e) {}
    art.appendChild(meta);
    try {
      container.childNodes.forEach(function (ch) {
        if (ch.nodeType === 1 && KEEP[ch.tagName]) { var s = sanitize(ch); if (s && textLen(s) > 0 || ch.tagName === 'IMG' || ch.tagName === 'FIGURE') art.appendChild(s); }
      });
    } catch (e) {}
    if (art.querySelectorAll('p,img,li').length === 0) { var p = document.createElement('p'); p.textContent = 'Could not extract an article from this page.'; art.appendChild(p); }
    overlay.appendChild(art);
    (document.body || document.documentElement).appendChild(overlay);
    document.documentElement.style.overflow = 'hidden';
  }
  window.__zbReaderOpen = open;
  document.addEventListener('keydown', function (e) { if (overlay && e.key === 'Escape') { e.preventDefault(); close(); } }, true);
})();
