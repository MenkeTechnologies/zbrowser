// Boot for the dedicated Terminal tab. Extracted from an inline <script> in
// terminal.html because the extension CSP (`script-src 'self'`) blocks inline
// execution — same-origin external scripts are allowed.
//
// terminal.js auto-injects #terminalPane + wires Ctrl+`. In this dedicated tab
// show it immediately (fills the viewport via terminal.html's CSS) and spawn the
// PTY. Retry until terminal.js has injected the pane + exposed showTerminal.
(function boot() {
  if (document.getElementById('terminalPane') && typeof window.showTerminal === 'function') {
    window.showTerminal();
  } else {
    setTimeout(boot, 80);
  }
})();
