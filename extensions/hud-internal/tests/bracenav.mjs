// Brace-expansion batch-navigation test (palette-cmds.js) — the zsh-faithful
// `{a,b}` / `{1..10}` URL expander + the batch-open provider that both palettes
// (New Tab + HUD web page) drive. The file is an IIFE that hangs its API off a
// `window`-like global, so it loads headless via `new Function` with no DOM/chrome.
// Assertions pin the expander (comma lists, numeric/char ranges, zero-pad, step,
// descending, nested, cartesian, escaping, literal fall-through) against known
// zsh/bash outputs, then the provider's URL gating + batch-open + per-URL rows.
import fs from 'node:fs';
import assert from 'node:assert/strict';

const src = fs.readFileSync(new URL('../palette-cmds.js', import.meta.url), 'utf8');
const root = {};
new Function('window', src)(root);
const PC = root.ZWIRE_PALETTE_CMDS;
assert.ok(PC && PC.expandBraces, 'ZWIRE_PALETTE_CMDS.expandBraces missing');
assert.ok(PC && PC.makeBraceProvider, 'ZWIRE_PALETTE_CMDS.makeBraceProvider missing');

const eq = (q, exp, m) => assert.deepEqual(PC.expandBraces(q), exp, m || q);

// ---- comma alternation (implicit-concat prefix/suffix) ----
eq('a{b,c}d', ['abd', 'acd'], 'comma list with prefix + suffix');
eq('a{b,c}', ['ab', 'ac'], 'trailing group');
eq('{b,c}d', ['bd', 'cd'], 'leading group');
eq('a{,b}c', ['ac', 'abc'], 'empty element is preserved');
eq('a{b,c,d}e', ['abe', 'ace', 'ade'], 'three-way list');

// ---- cartesian product across adjacent groups ----
eq('{a,b}{1,2}', ['a1', 'a2', 'b1', 'b2'], 'two groups cartesian, left-major');
eq('{a,b}{1..2}', ['a1', 'a2', 'b1', 'b2'], 'comma group × range group');

// ---- nested groups ----
eq('a{b,c{d,e}f}g', ['abg', 'acdfg', 'acefg'], 'nested comma group inside an alt');
eq('{a,b{c,d}}', ['a', 'bc', 'bd'], 'nested group as second alt');

// ---- numeric ranges ----
eq('{1..3}', ['1', '2', '3'], 'ascending numeric range');
eq('{3..1}', ['3', '2', '1'], 'descending numeric range');
eq('a{1..3}b', ['a1b', 'a2b', 'a3b'], 'range with prefix + suffix');
eq('{-2..2}', ['-2', '-1', '0', '1', '2'], 'range spanning negatives');

// ---- zero-padded ranges ----
eq('{01..03}', ['01', '02', '03'], 'leading zero => pad to width 2');
eq('{08..10}', ['08', '09', '10'], 'zero-pad keeps width across the ten boundary');
eq('{1..10}', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], 'no leading zero => no pad');

// ---- stepped ranges ----
eq('{1..10..3}', ['1', '4', '7', '10'], 'positive step');
eq('{0..20..5}', ['0', '5', '10', '15', '20'], 'step lands exactly on the end');
eq('{10..1..3}', ['10', '7', '4', '1'], 'descending step (magnitude only)');

// ---- character ranges ----
eq('{a..e}', ['a', 'b', 'c', 'd', 'e'], 'ascending char range');
eq('{e..a}', ['e', 'd', 'c', 'b', 'a'], 'descending char range');
eq('{A..C}', ['A', 'B', 'C'], 'uppercase char range');
eq('{a..e..2}', ['{a..e..2}'], 'zsh keeps a STEPPED char range literal (only numeric ranges step)');

// ---- literal fall-through (zsh keeps these verbatim) ----
eq('a{b}c', ['a{b}c'], 'a comma-less, range-less group stays literal');
eq('{}', ['{}'], 'empty braces are literal');
eq('a{b,c', ['a{b,c'], 'unbalanced open brace stays literal');
eq('plainword', ['plainword'], 'no braces => identity');
eq('a\\{b,c\\}d', ['a{b,c}d'], 'escaped braces are literal + unescaped');

// ---- comma precedence over range (zsh: a comma makes it a list) ----
eq('{1..3,9}', ['1..3', '9'], 'a top-level comma turns off range parsing');

// ---- provider: URL gating + batch-open + per-URL rows ----
let opened = [];
const prov = PC.makeBraceProvider({ open: (u) => opened.push(u) });

// non-brace / prose / bare word-list inputs never produce rows (no hijack).
assert.equal(prov('github').length, 0, 'no brace => no rows');
assert.equal(prov('2+3').length, 0, 'a sum yields no rows');
assert.equal(prov('{a,b,c}').length, 0, 'a bare word list (no dotted host) is not navigable => no rows');
assert.equal(prov('a{b,c}d').length, 0, 'a non-URL brace pattern yields no rows');
assert.equal(prov('site.com/{a b,c}').length, 0, 'whitespace in the input disqualifies it (URLs have none)');

// a real URL pattern expands into a pinned batch row + per-URL rows.
let rows = prov('example.com/{1..3}');
assert.equal(rows[0].label, 'Open 3 tabs', 'first row is the batch-open, count = expansion size');
assert.equal(rows[0].top, true, 'the batch row pins to the top');
assert.equal(rows.length, 4, 'batch row + one row per expanded URL');
assert.deepEqual(rows.slice(1).map((r) => r.label),
  ['https://example.com/1', 'https://example.com/2', 'https://example.com/3'],
  'each expanded token is normalized to an https URL');

// running the batch row opens every URL through open().
opened = [];
rows[0].run();
assert.deepEqual(opened, ['https://example.com/1', 'https://example.com/2', 'https://example.com/3'],
  'the batch row loops open() over all URLs');

// a per-URL row opens exactly one.
opened = [];
rows[2].run();
assert.deepEqual(opened, ['https://example.com/2'], 'a per-URL row opens a single destination');

// scheme is preserved when present; alternation across hosts works.
assert.equal(prov('http://a.com/{x,y}')[1].label, 'http://a.com/x', 'an explicit http scheme is kept as-is');
const hostRows = prov('{google,github}.com');
assert.equal(hostRows[0].label, 'Open 2 tabs', 'alternation inside the host expands');
assert.deepEqual(hostRows.slice(1).map((r) => r.label), ['https://google.com', 'https://github.com'], 'both hosts become URLs');

// duplicate expansions collapse (a pattern that yields the same URL twice).
assert.equal(prov('dup.com/{a,a}').length, 0, 'a pattern that de-dups to a single URL yields no batch');

// openMany override is used when the consumer supplies one (single batched call).
let many = null;
const prov2 = PC.makeBraceProvider({ open: () => {}, openMany: (urls) => { many = urls; } });
prov2('x.com/{1,2}')[0].run();
assert.deepEqual(many, ['https://x.com/1', 'https://x.com/2'], 'openMany receives the whole URL list in one call');

// the >=12 cap on per-URL rows still opens ALL via the batch row.
const big = prov('n.com/{1..20}');
assert.equal(big[0].label, 'Open 20 tabs', 'batch count reflects all 20 URLs');
assert.equal(big.length, 13, 'per-URL rows are capped at 12 (batch row + 12)');
opened = [];
big[0].run();
assert.equal(opened.length, 20, 'the batch row still opens all 20 despite the display cap');

console.log('brace-expansion batch navigation: all assertions passed');
