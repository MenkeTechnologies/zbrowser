/* zbrowser HUD background worker.
 *
 * Two jobs:
 *  1. Relay the picked scheme from content scripts / pages to the native host,
 *     which writes ~/.zbrowser/hud-scheme so the compiled color mixer follows.
 *  2. Mirror the current scheme into chrome.storage.local ('zb_scheme') so the
 *     chrome:// theme content scripts have a reliable, push-based source they
 *     can read + observe (an async sendResponse across the native host is
 *     unreliable — an MV3 worker can suspend mid-round-trip).
 */
var HOST = 'com.zbrowser.hud';

function mirror(scheme) {
  if (!scheme) return;
  try { chrome.storage.local.set({ zb_scheme: scheme }); } catch (e) {}
}

// Seed storage from the native source of truth (the file may already hold a
// scheme picked in a prior session or written before launch).
function seedFromNative() {
  try {
    chrome.runtime.sendNativeMessage(HOST, { cmd: 'get' }, function (r) {
      void chrome.runtime.lastError;
      if (r && r.scheme) mirror(r.scheme);
    });
  } catch (e) {}
}
seedFromNative();
try { chrome.runtime.onStartup.addListener(seedFromNative); } catch (e) {}
try { chrome.runtime.onInstalled.addListener(seedFromNative); } catch (e) {}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg && msg.type === 'zbhud-scheme' && msg.scheme) {
    // Write to native (drives the compiled mixer) and mirror to storage
    // (drives the chrome:// theme content scripts).
    try {
      chrome.runtime.sendNativeMessage(HOST, { scheme: msg.scheme },
        function () { void chrome.runtime.lastError; });
    } catch (e) {}
    mirror(msg.scheme);
    return;
  }
  // Read relay: the message wakes this (lazy) worker; we read the native source
  // of truth, answer, and mirror to storage so onChanged fans out to any other
  // open chrome:// tabs.
  if (msg && msg.type === 'zbhud-get') {
    try {
      chrome.runtime.sendNativeMessage(HOST, { cmd: 'get' }, function (r) {
        void chrome.runtime.lastError;
        var scheme = (r && r.scheme) || 'cyberpunk';
        mirror(scheme);
        sendResponse({ scheme: scheme });
      });
      return true; // async response
    } catch (e) { sendResponse({ scheme: 'cyberpunk' }); }
  }
});
