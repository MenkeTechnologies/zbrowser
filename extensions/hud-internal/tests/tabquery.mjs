// Tab-query engine test (palette-cmds.js) — the `tabs:` boolean query language +
// bulk-op provider that both palettes (New Tab + HUD web page) drive. The file is
// an IIFE that hangs its API off a `window`-like global, so it loads headless via
// `new Function` with no DOM/chrome. Assertions pin the parser, the matcher (text /
// field / flag predicates + AND/OR/NOT), duplicate detection, and the provider's
// bulk-action + focus rows.
import fs from 'node:fs';
import assert from 'node:assert/strict';

const src = fs.readFileSync(new URL('../palette-cmds.js', import.meta.url), 'utf8');
const root = {};
new Function('window', src)(root);
const PC = root.ZWIRE_PALETTE_CMDS;
assert.ok(PC && PC.makeTabQueryProvider, 'ZWIRE_PALETTE_CMDS.makeTabQueryProvider missing');

const now = 1_700_000_000_000;
const min = (m) => now - m * 60000;
const tabs = [
  { id: 1, title: 'GitHub · PR', url: 'https://github.com/a/b/pull/1', pinned: true, active: true, status: 'complete', lastAccessed: min(60) },
  { id: 2, title: 'YouTube', url: 'https://www.youtube.com/watch?v=x', audible: true, status: 'complete', lastAccessed: min(2) },
  { id: 3, title: 'GitHub Issues', url: 'https://github.com/a/b/issues', discarded: true, status: 'complete', lastAccessed: min(10) },
  { id: 4, title: 'Docs', url: 'https://github.com/a/b/pull/1', mutedInfo: { muted: true }, status: 'loading', lastAccessed: min(1) },
  { id: 5, title: 'Example', url: 'http://example.com/', status: 'complete', lastAccessed: min(120) }
];
// ids(query) -> sorted matching tab ids for `tabs: <query>`.
const ids = (q) => PC.filterTabs(tabs, PC.parseTabQuery('tabs: ' + q), now).map((t) => t.id).sort((a, b) => a - b);
const eq = (a, b, m) => assert.deepEqual(a, b, m);

// ---- parseTabQuery: sigil detection ----
assert.equal(PC.parseTabQuery('github'), null, 'no sigil => not a tab query');
assert.equal(PC.parseTabQuery('2+3'), null, 'a sum is not a tab query');
assert.ok(PC.parseTabQuery('tab: x'), '`tab:` is accepted');
assert.ok(PC.parseTabQuery('TABS: x'), 'sigil is case-insensitive');
eq(PC.parseTabQuery('tabs:').clauses, [[]], 'bare `tabs:` yields one empty clause');

// ---- bare `tabs:` = every tab ----
eq(ids(''), [1, 2, 3, 4, 5], 'bare tabs: matches all');

// ---- text predicates (title + url substring) + implicit AND ----
eq(ids('github'), [1, 3, 4], 'text matches title OR url');
eq(ids('github issues'), [3], 'two words = implicit AND');
eq(ids('title:docs'), [4], 'title: field');
eq(ids('url:watch'), [2], 'url: field');
eq(ids('host:youtube.com'), [2], 'host: field');
eq(ids('by:github.com'), [1, 3, 4], 'by: is a host alias');

// ---- NOT / negation prefixes ----
eq(ids('github NOT issues'), [1, 4], 'NOT excludes');
eq(ids('github -issues'), [1, 4], '-prefix negates');
eq(ids('-github'), [2, 5], 'leading -word negates a bare term');
eq(ids('!github'), [2, 5], '!-prefix negates');

// ---- OR (top-level) ----
eq(ids('youtube OR issues'), [2, 3], 'OR unions clauses');
eq(ids('audible OR pinned'), [1, 2], 'OR across flags');

// ---- flag predicates ----
eq(ids('audible'), [2], 'audible flag');
eq(ids('playing'), [2], 'playing = audible alias');
eq(ids('pinned'), [1], 'pinned flag');
eq(ids('discarded'), [3], 'discarded flag');
eq(ids('asleep'), [3], 'asleep = discarded alias');
eq(ids('muted'), [4], 'muted flag reads mutedInfo');
eq(ids('loading'), [4], 'loading reads status');
eq(ids('active'), [1], 'active flag');
eq(ids('http'), [5], 'http matches only http://');
eq(ids('https'), [1, 2, 3, 4], 'https excludes http://');

// ---- duplicate-URL detection (whole-set context) ----
eq(ids('dup'), [1, 4], 'dup finds tabs sharing a normalized URL');
eq(ids('dup NOT pinned'), [4], 'dup composes with NOT');

// ---- time predicates over lastAccessed ----
eq(ids('older:30'), [1, 5], 'older:N = idle minutes >= N');
eq(ids('newer:5'), [2, 4], 'newer:N = idle minutes < N');

// ---- unknown field matches nothing (a typo can't select everything) ----
eq(ids('bogus:x'), [], 'unknown field predicate matches no tab');

// ---- provider: bulk-op rows + focus rows + adapters fire ----
let closed = null, reloaded = null, focused = null;
const prov = PC.makeTabQueryProvider({
  getTabs: () => tabs, now: () => now,
  focus: (t) => { focused = t; }, close: (ts) => { closed = ts; }, reload: (ts) => { reloaded = ts; }
});
assert.equal(prov('github').length, 0, 'a non-sigil query yields no tab rows (never hijacks normal input)');
assert.equal(prov('2+3').length, 0, 'a sum yields no tab rows');

let rows = prov('tabs: github');
assert.equal(rows[0].label, 'Close 3 tabs', 'first row is the bulk-close, count = matches');
assert.equal(rows[0].top, true, 'the close row pins to the top');
rows[0].run();
assert.equal(closed.length, 3, 'running the close row passes all 3 matches to close()');

const rel = rows.find((r) => /^Reload/.test(r.label));
assert.ok(rel && rel.label === 'Reload 3 tabs', 'a reload bulk-op row is present when reload() is injected');
rel.run();
assert.equal(reloaded.length, 3, 'running the reload row passes the matches to reload()');

const foc = rows.find((r) => /^Focus:/.test(r.label));
assert.ok(foc, 'per-match focus rows are present');
foc.run();
assert.ok(focused && focused.id, 'running a focus row passes a single tab to focus()');

assert.equal(prov('tabs: youtube')[0].label, 'Close 1 tab', 'count is singularized for one match');
assert.match(prov('tabs: zzznope')[0].label, /No tabs match/, 'zero matches => a single info row');
assert.equal(prov('tabs:')[0].label, 'Close 5 tabs', 'bare tabs: targets every tab');

// reload row is omitted when the consumer injects no reload() adapter (e.g. a
// read-only surface) — never advertise an op the backend can't perform.
const prov2 = PC.makeTabQueryProvider({ getTabs: () => tabs, now: () => now, focus: () => {}, close: () => {} });
assert.ok(!prov2('tabs: github').some((r) => /^Reload/.test(r.label)), 'no reload adapter => no reload row');

console.log('tab-query engine: all assertions passed');
