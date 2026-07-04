/* zbrowser HUD background worker — relays the picked scheme from the content
 * script (which cannot call sendNativeMessage) to the native host, which writes
 * ~/.zbrowser/hud-scheme so the compiled color mixer follows the picker. */
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg && msg.type === 'zbhud-scheme' && msg.scheme) {
    try {
      chrome.runtime.sendNativeMessage('com.zbrowser.hud', { scheme: msg.scheme },
        function () { void chrome.runtime.lastError; });
    } catch (e) {}
  }
});
