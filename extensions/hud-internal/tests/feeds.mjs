// Feed reader parser test (pages/feeds.js). The page exposes its pure RSS/Atom
// parser on window.ZBFeeds and bails before touching the DOM/chrome when the HUD
// shell is absent, so it loads headless here.
import fs from 'node:fs';
import assert from 'node:assert/strict';

const src = fs.readFileSync(new URL('../pages/feeds.js', import.meta.url), 'utf8');
const win = {};
new Function('window', src)(win);
const F = win.ZBFeeds;
assert.ok(F && F.parseFeed, 'window.ZBFeeds not exposed');

// RSS 2.0 with CDATA + entities.
const rss = `<?xml version="1.0"?><rss version="2.0"><channel>
  <title>My Blog</title>
  <item><title><![CDATA[First & best]]></title><link>https://ex.com/1</link>
    <pubDate>Mon, 07 Jul 2026 10:00:00 GMT</pubDate>
    <description>&lt;p&gt;Hello &amp; welcome to the post&lt;/p&gt;</description></item>
  <item><title>Second</title><link>https://ex.com/2</link><description>Plain summary</description></item>
</channel></rss>`;
const r = F.parseFeed(rss);
assert.equal(r.title, 'My Blog', 'channel title');
assert.equal(r.items.length, 2, 'two items');
assert.equal(r.items[0].title, 'First & best', 'CDATA + entity decoded in title');
assert.equal(r.items[0].link, 'https://ex.com/1');
assert.match(r.items[0].summary, /Hello & welcome/, 'html stripped + entities decoded in summary');
assert.ok(r.items[0].date, 'pubDate captured');

// Atom 1.0 with href-attribute links + summary/updated.
const atom = `<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom">
  <title>Atom News</title>
  <entry><title>Atom item</title><link href="https://a.org/x" rel="alternate"/>
    <updated>2026-07-06T12:00:00Z</updated><summary>an atom summary</summary></entry>
</feed>`;
const a = F.parseFeed(atom);
assert.equal(a.title, 'Atom News');
assert.equal(a.items.length, 1);
assert.equal(a.items[0].title, 'Atom item');
assert.equal(a.items[0].link, 'https://a.org/x', 'atom link from href attribute');
assert.equal(a.items[0].summary, 'an atom summary');
assert.ok(a.items[0].date, 'atom updated captured');

// Garbage never throws.
assert.deepEqual(F.parseFeed('not xml').items, []);
assert.deepEqual(F.parseFeed('').items, []);

console.log('feeds parser: all assertions passed');
