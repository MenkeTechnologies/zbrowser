// Pane pipelines engine test (zpipes-core.js) — the pure dataflow-edge engine that
// drives the reactive runtime (ztmux-pane.js source extraction + sink apply,
// ztmux-config.js relay + cycle guard, pages/pipes.js validation). The file is an
// IIFE that hangs its API off a `window`-like global, so it loads headless via
// `new Function` with no DOM / chrome.* — whatever zpipes-core.js actually computes
// is what gets tested, no hand-rewritten mirror to drift.
//
// Assertions pin the load-bearing decisions: source extraction per kind, the stryke
// `|>` op-chain filter, JS filter, sink-message folding, the cooldown/once/dedupe
// gate, and — the one thing that can make the feature unshippable — cycle detection
// at edge creation plus the whole-graph cycle scan and the per-emission hop budget.
//
// Pure Node, deterministic. Exits non-zero on any failure.
import fs from 'node:fs';
import assert from 'node:assert/strict';

const src = fs.readFileSync(new URL('../zpipes-core.js', import.meta.url), 'utf8');
const root = {};
new Function('window', 'module', src)(root, { exports: {} });
const P = root.ZWIRE_PIPES;
assert.ok(P, 'ZWIRE_PIPES missing');

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; }
  else { fail++; console.log(`FAIL  ${name}${detail ? '  — ' + detail : ''}`); }
}
const eq = (name, got, want) => check(name, JSON.stringify(got) === JSON.stringify(want), `got ${JSON.stringify(got)} want ${JSON.stringify(want)}`);

/* -------------------------------------------------------- normalize/validate */
const base = {
  id: 'e1', name: 'docs→playground',
  source: { kind: 'selector', selector: 'pre code', urls: 'docs\\.' },
  filter: { kind: 'none', value: '' },
  sink: { kind: 'fill', selector: '#editor', urls: 'play\\.' }
};
check('normalize defaults enabled/cooldown/dedupe', (() => {
  const n = P.normalizeEdge({ name: 'x' });
  return n.enabled === true && n.cooldownMs === 1500 && n.dedupe === true && n.once === false && n.source.kind === 'selector' && n.sink.kind === 'navigate';
})());
check('validate ok on a complete edge', P.validateEdge(base).ok === true, JSON.stringify(P.validateEdge(base)));
check('validate rejects missing name', P.validateEdge({ ...base, name: '' }).ok === false);
check('validate rejects selector source w/o selector', P.validateEdge({ ...base, source: { kind: 'selector', selector: '' } }).ok === false);
check('validate rejects fill sink w/o selector', P.validateEdge({ ...base, sink: { kind: 'fill', selector: '' } }).ok === false);
check('validate rejects bad source regex', P.validateEdge({ ...base, source: { kind: 'regex', pattern: '(' } }).ok === false);
check('validate rejects bad sink url filter', P.validateEdge({ ...base, sink: { kind: 'navigate', urls: '(' } }).ok === false);
check('validate rejects unknown op in ops filter', P.validateEdge({ ...base, filter: { kind: 'ops', value: 'trim |> bogus' } }).ok === false);

/* -------------------------------------------------------------- matchUrl */
check('matchUrl empty = any', P.matchUrl('', 'https://x') === true);
check('matchUrl regex hit', P.matchUrl('github\\.com', 'https://github.com/a') === true);
check('matchUrl regex miss', P.matchUrl('github\\.com', 'https://gitlab.com') === false);
check('matchUrl invalid = fail closed', P.matchUrl('(', 'https://x') === false);

/* ------------------------------------------------------------ extractSource */
eq('extract url', P.extractSource({ kind: 'url' }, { url: 'https://a.com' }), ['https://a.com']);
eq('extract selection lines', P.extractSource({ kind: 'selection' }, { selection: 'one\n\ntwo ' }), ['one', 'two']);
eq('extract selector lines', P.extractSource({ kind: 'selector', selector: 'x' }, { text: ' a \nb\n' }), ['a', 'b']);
eq('extract regex whole match', P.extractSource({ kind: 'regex', pattern: 'err\\w+', flags: 'i' }, { text: 'ok\nErrorX here\nfine' }), ['ErrorX']);
eq('extract regex capture group 1', P.extractSource({ kind: 'regex', pattern: 'id=(\\d+)' }, { text: 'row id=42 x\nid=7' }), ['42', '7']);
eq('extract regex no match = empty', P.extractSource({ kind: 'regex', pattern: 'zzz' }, { text: 'abc' }), []);

/* ---------------------------------------------------------------- ops filter */
eq('ops trim+uniq', P.applyFilter({ kind: 'ops', value: 'trim |> uniq' }, [' a', 'a ', 'b']), ['a', 'b']);
eq('ops nth', P.applyFilter({ kind: 'ops', value: 'nth 1' }, ['a', 'b', 'c']), ['b']);
eq('ops grep', P.applyFilter({ kind: 'ops', value: 'grep ^h' }, ['ha', 'xb', 'hc']), ['ha', 'hc']);
eq('ops reject', P.applyFilter({ kind: 'ops', value: 'reject ^h' }, ['ha', 'xb', 'hc']), ['xb']);
eq('ops replace', P.applyFilter({ kind: 'ops', value: 'replace /a/Z/g' }, ['banana']), ['bZnZnZ']);
eq('ops join', P.applyFilter({ kind: 'ops', value: 'join ,' }, ['a', 'b', 'c']), ['a,b,c']);
eq('ops upper+first', P.applyFilter({ kind: 'ops', value: 'upper |> first' }, ['ab', 'cd']), ['AB']);
eq('ops count', P.applyFilter({ kind: 'ops', value: 'count' }, ['a', 'b', 'c']), ['3']);
eq('ops chain map/take/prepend', P.applyFilter({ kind: 'ops', value: 'take 2 |> prepend https://' }, ['a.com', 'b.com', 'c.com']), ['https://a.com', 'https://b.com']);
eq('none filter passes through', P.applyFilter({ kind: 'none' }, ['a', 'b']), ['a', 'b']);

/* ----------------------------------------------------------------- js filter */
eq('js filter returns array', P.applyFilter({ kind: 'js', value: 'lines.map(x => x.toUpperCase())' }, ['a', 'b']), ['A', 'B']);
eq('js filter returns scalar', P.applyFilter({ kind: 'js', value: 'lines.length' }, ['a', 'b', 'c']), ['3']);
eq('js filter uses text', P.applyFilter({ kind: 'js', value: 'text.replace(/\\n/g,"+")' }, ['a', 'b']), ['a+b']);
eq('js filter throw = passthrough', P.applyFilter({ kind: 'js', value: 'nope.bad()' }, ['a']), ['a']);

/* ------------------------------------------------------------ buildSinkMessage */
eq('sink navigate takes first', P.buildSinkMessage({ kind: 'navigate' }, ['https://a', 'https://b']), { act: 'navigate', url: 'https://a' });
eq('sink batch takes all', P.buildSinkMessage({ kind: 'batch' }, ['https://a', 'https://b']), { act: 'batch', urls: ['https://a', 'https://b'] });
eq('sink fill joins', P.buildSinkMessage({ kind: 'fill', selector: '#q', sep: ' ' }, ['a', 'b']), { act: 'fill', selector: '#q', text: 'a b' });
check('sink empty input = null', P.buildSinkMessage({ kind: 'fill', selector: '#q' }, ['', '  ']) === null);

/* ------------------------------------------------------------------- gate */
const edge = { enabled: true, cooldownMs: 1000, once: false, dedupe: true };
check('gate fires from empty state', P.gate(edge, {}, 5000, 'v1').fire === true);
check('gate blocks within cooldown', P.gate(edge, { lastFired: 5000 }, 5500, 'v2').fire === false);
check('gate allows after cooldown', P.gate(edge, { lastFired: 5000 }, 6001, 'v2').fire === true);
check('gate dedupes identical value', P.gate(edge, { lastFired: 0, lastValue: 'same' }, 9e9, 'same').fire === false);
check('gate once blocks second', P.gate({ ...edge, once: true }, { firedOnce: true }, 9e9, 'v').fire === false);
check('gate disabled never fires', P.gate({ ...edge, enabled: false }, {}, 9e9, 'v').fire === false);
check('gate returns state on fire', (() => { const g = P.gate(edge, {}, 5000, 'v'); return g.state.lastFired === 5000 && g.state.lastValue === 'v' && g.state.firedOnce === true; })());

/* ------------------------------------------------------------------ cycles */
// A→B exists; adding B→A closes a loop; adding A→C does not.
const edges = [
  { enabled: true, name: 'ab', source: { urls: 'A' }, sink: { urls: 'B' } }
];
check('wouldCycle self-loop A→A', P.wouldCycle([], 'A', 'A') === true);
check('wouldCycle B→A closes A→B', P.wouldCycle(edges, 'B', 'A') === true);
check('wouldCycle A→C is safe', P.wouldCycle(edges, 'A', 'C') === false);
check('wouldCycle ignores disabled edges', P.wouldCycle([{ enabled: false, source: { urls: 'A' }, sink: { urls: 'B' } }], 'B', 'A') === false);
// transitive: A→B, B→C present; C→A would close a 3-cycle
const chain = [
  { enabled: true, source: { urls: 'A' }, sink: { urls: 'B' } },
  { enabled: true, source: { urls: 'B' }, sink: { urls: 'C' } }
];
check('wouldCycle transitive C→A', P.wouldCycle(chain, 'C', 'A') === true);
check('wouldCycle transitive C→D safe', P.wouldCycle(chain, 'C', 'D') === false);
check('graphCycle clean chain = null', P.graphCycle(chain) === null);
check('graphCycle detects present loop', P.graphCycle(chain.concat([{ enabled: true, source: { urls: 'C' }, sink: { urls: 'A' } }])) !== null);
// empty-pattern edges both collapse to the '*' node → self-loop
check('wouldCycle any→any self-loop', P.wouldCycle([], '', '') === true);

/* ----------------------------------------------------------------- runEdge */
const full = {
  enabled: true, cooldownMs: 1000, dedupe: true, once: false,
  source: { kind: 'regex', pattern: '(https?://\\S+)' },
  filter: { kind: 'ops', value: 'first' },
  sink: { kind: 'navigate' }
};
const r1 = P.runEdge(full, { text: 'see https://a.com and https://b.com' }, {}, 1000, 0);
check('runEdge fires + builds navigate msg', r1.fire === true && r1.message.act === 'navigate' && r1.message.url === 'https://a.com', JSON.stringify(r1));
check('runEdge threads hops', r1.hops === 1);
const r2 = P.runEdge(full, { text: 'see https://a.com' }, r1.state, 1200, 0);
check('runEdge dedupe blocks same value in cooldown', r2.fire === false);
check('runEdge no-match yields no fire', P.runEdge(full, { text: 'nothing here' }, {}, 9e9, 0).fire === false);
check('runEdge drops at hop budget', P.runEdge(full, { text: 'https://a.com' }, {}, 9e9, P.HOP_BUDGET).fire === false);

/* -------------------------------------------------------------------------- */
if (fail === 0) console.log(`ALL ✓ — pipes engine nominal (${pass} checks)`);
else console.log(`${fail} CHECK(S) FAILED (${pass} passed)`);
process.exit(fail === 0 ? 0 : 1);
