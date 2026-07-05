/* zwire HUD — the keybinding registry (single source of truth).
 * Loaded as a content script before zvim/zpalette/zfind AND by the Keyboard
 * settings page (pages/keys.html), so both render/dispatch from the same list.
 * User remaps live in chrome.storage.local 'zb_keys' as { <action>: <key> };
 * the content scripts merge those over the defaults below. */
(function () {
  'use strict';
  window.ZWIRE_KEYMAP = {
    // action name -> { def: default key, label, cat }
    categories: [
      { id: 'scroll', label: 'Scroll', actions: [
        { name: 'scrollDown', def: 'j', label: 'Scroll down' },
        { name: 'scrollUp', def: 'k', label: 'Scroll up' },
        { name: 'scrollLeft', def: 'h', label: 'Scroll left' },
        { name: 'scrollRight', def: 'l', label: 'Scroll right' },
        { name: 'halfDown', def: 'd', label: 'Half-page down' },
        { name: 'halfUp', def: 'u', label: 'Half-page up' },
        { name: 'bottom', def: 'G', label: 'Bottom of page' },
        { name: 'top', def: 'H', label: 'Top of document' },
        { name: 'middle', def: 'M', label: 'Middle of document' },
        { name: 'low', def: 'L', label: 'Bottom of document' }
      ] },
      { id: 'tabs', label: 'Tabs & history', actions: [
        { name: 'prevTab', def: 'J', label: 'Previous tab' },
        { name: 'nextTab', def: 'K', label: 'Next tab' },
        { name: 'closeTab', def: 'x', label: 'Close tab' },
        { name: 'newTab', def: 't', label: 'New tab' },
        { name: 'reload', def: 'r', label: 'Reload page' },
        { name: 'histBack', def: '[', label: 'History back' },
        { name: 'histFwd', def: ']', label: 'History forward' }
      ] },
      { id: 'jump', label: 'Jump & hints', actions: [
        { name: 'hint', def: 'f', label: 'Link hints (click)' },
        { name: 'hintNewTab', def: 'F', label: 'Link hints (new tab)' },
        { name: 'gPrefix', def: 'g', label: 'g-prefix (gg / gt / gT / gi)' },
        { name: 'zPrefix', def: 'z', label: 'z-prefix (zt / zz / zb)' },
        { name: 'yPrefix', def: 'y', label: 'y-prefix (yy — yank URL)' },
        { name: 'setMark', def: 'm', label: 'Set mark (m<x>)' },
        { name: 'jumpMark', def: '`', label: 'Jump to mark (`<x>)' }
      ] },
      { id: 'launch', label: 'Palette & find', actions: [
        { name: 'palette', def: 'o', label: 'Command palette' },
        { name: 'paletteColon', def: ':', label: 'Command palette (:)' },
        { name: 'find', def: '/', label: 'Find in page' },
        { name: 'vimToggle', def: '\\', label: 'Toggle vim off (Ctrl/⌘+\\ re-enables)' }
      ] }
    ],
    // Global chorded hotkeys (modifier + key). Editable key is the letter; the
    // ⌘/Ctrl modifier is fixed. Consumed by zpalette.js / zfind.js.
    global: [
      { name: 'openPalette', def: 'k', mod: '⌘/Ctrl', label: 'Open command palette' },
      { name: 'openFind', def: 'f', mod: '⌘/Ctrl', label: 'Open find bar' }
    ],
    // Fixed, not remappable here (owned by the native fork).
    native: [
      { name: 'tmuxPrefix', def: 'Ctrl-b', label: 'tmux split prefix (then % " o { } x)' }
    ]
  };
})();
