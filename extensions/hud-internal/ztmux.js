/* zwire HUD — tmux-style pane/window control on every page.
 * Prefix key Ctrl-b, then a command key drives the tiling engine in the
 * background worker (zb_cmd {a:'tmux'}). Panes are real browser windows tiled
 * by geometry; windows (tmux) are pane groups; synchronize-panes broadcasts
 * typed keystrokes to sibling panes. Runs on stock Chrome too — no fork.
 *
 *   C-b %      split right        C-b "   split down
 *   C-b o / ;  next / prev pane   C-b ←→↑↓ focus pane by direction
 *   C-b z      zoom pane          C-b x   close pane
 *   C-b c      new window         C-b n/p next / prev window
 *   C-b Space  cycle layout       C-b &   kill window
 *   C-b e      toggle synchronize-panes   C-b ?  palette
 */
(function () {
  'use strict';
  if (window.__zbTmuxLoaded) return;
  window.__zbTmuxLoaded = true;

  var cmdN = 0;
  function cmd(obj) { try { obj.n = ++cmdN + '.' + (window.__zbTick = (window.__zbTick || 0) + 1); chrome.storage.local.set({ zb_cmd: obj }); } catch (e) {} }
  function tmux(sub, extra) { var o = { a: 'tmux', sub: sub }; if (extra) for (var k in extra) o[k] = extra[k]; cmd(o); }
  function editable(el) { if (!el) return false; var t = el.tagName; return t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT' || el.isContentEditable; }

  /* ---- prefix indicator ------------------------------------------------- */
  var indEl;
  function indicator(txt) {
    if (!indEl) {
      indEl = document.createElement('div'); indEl.id = 'zb-tmux-ind';
      indEl.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:2147483646;' +
        'background:rgba(0,0,0,.85);color:#05d9e8;border:1px solid #05d9e8;border-radius:3px;padding:4px 12px;' +
        'font:12px "Share Tech Mono",Monaco,monospace;pointer-events:none;transition:opacity .15s;letter-spacing:1px;';
      (document.body || document.documentElement).appendChild(indEl);
    }
    indEl.textContent = txt; indEl.style.opacity = '1';
    clearTimeout(indicator._t); indicator._t = setTimeout(function () { if (indEl) indEl.style.opacity = '0'; }, 1300);
  }

  var armed = false, armTimer = null;
  function arm() { armed = true; indicator('C-b …'); clearTimeout(armTimer); armTimer = setTimeout(function () { armed = false; }, 2500); }
  function disarm() { armed = false; clearTimeout(armTimer); }

  document.addEventListener('keydown', function (e) {
    if (!armed) {
      if (e.ctrlKey && !e.metaKey && !e.altKey && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault(); e.stopImmediatePropagation(); arm();
      }
      return;
    }
    // armed — IGNORE a lone modifier keydown. The shifted commands (% ` " ` &)
    // are typed as Shift+key, and the Shift keydown lands first; without this it
    // would be treated as "the command", disarm, and eat the real key that
    // follows — so split-down ("), split-right (%) and kill-window (&) silently
    // did nothing. Keep the prefix armed until the actual character arrives.
    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') return;
    // the next key is a tmux command
    e.preventDefault(); e.stopImmediatePropagation(); disarm();
    switch (e.key) {
      case '%': tmux('split', { dir: 'right' }); indicator('split →'); break;
      case '"': tmux('split', { dir: 'down' }); indicator('split ↓'); break;
      case 'o': tmux('navigate', { dir: 'next' }); break;
      case ';': tmux('navigate', { dir: 'prev' }); break;
      case 'ArrowLeft': tmux('navigate', { dir: 'left' }); break;
      case 'ArrowRight': tmux('navigate', { dir: 'right' }); break;
      case 'ArrowUp': tmux('navigate', { dir: 'up' }); break;
      case 'ArrowDown': tmux('navigate', { dir: 'down' }); break;
      case 'z': tmux('zoom'); indicator('zoom'); break;
      case 'x': tmux('closePane'); indicator('kill pane'); break;
      case 'c': tmux('newWindow'); indicator('new window'); break;
      case 'n': tmux('nextWindow'); break;
      case 'p': tmux('prevWindow'); break;
      case ' ': tmux('selectLayout'); indicator('layout'); break;
      case 'e': tmux('syncToggle'); indicator('sync ⇄'); break;
      case '&': tmux('killWindow'); indicator('kill window'); break;
      case '?': if (window.__zbPaletteOpen) window.__zbPaletteOpen(); break;
      default: break;
    }
  }, true);

  /* ---- synchronize-panes ------------------------------------------------ */
  var anySync = false;
  function refreshSync() { try { chrome.storage.local.get('zb_tmux', function (o) { void chrome.runtime.lastError; anySync = !!(o && o.zb_tmux && o.zb_tmux.anySync); }); } catch (e) {} }
  refreshSync();
  try { chrome.storage.onChanged.addListener(function (ch, area) { if (area === 'local' && ch.zb_tmux) refreshSync(); }); } catch (e) {}

  // broadcast typed keys to sibling panes (bubble phase, after local apply).
  document.addEventListener('keydown', function (e) {
    if (!anySync || e.ctrlKey || e.metaKey || e.altKey) return;
    if (!editable(document.activeElement)) return;
    if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace') {
      try { chrome.runtime.sendMessage({ type: 'zbSync', key: e.key, code: e.code }, function () { void chrome.runtime.lastError; }); } catch (err) {}
    }
  }, false);

  // apply a broadcast keystroke into our own focused field.
  try {
    chrome.runtime.onMessage.addListener(function (msg) {
      if (!msg || msg.type !== 'zbSyncApply') return;
      var el = document.activeElement; if (!editable(el)) return;
      var k = msg.key, hasVal = ('value' in el);
      if (k === 'Backspace') { if (hasVal) { el.value = el.value.slice(0, -1); el.dispatchEvent(new Event('input', { bubbles: true })); } else { try { document.execCommand('delete'); } catch (e) {} } }
      else if (k === 'Enter') { el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); }
      else if (k && k.length === 1) { if (hasVal) { el.value += k; el.dispatchEvent(new Event('input', { bubbles: true })); } else { try { document.execCommand('insertText', false, k); } catch (e) {} } }
    });
  } catch (e) {}
})();
