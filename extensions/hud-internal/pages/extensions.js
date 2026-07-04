/* zbrowser HUD Extensions manager — our own page replacing chrome://extensions.
 * Uses chrome.management for real list / enable-disable / remove. */
(function () {
  'use strict';
  var grid = document.getElementById('grid');
  var countEl = document.getElementById('count');
  var searchEl = document.getElementById('search');
  var all = [];

  // Human-readable permission warnings (mirrors Chrome's stock detail page,
  // which uses the privileged developerPrivate API we can't reach here).
  var PERM_DESC = {
    history: 'Read and change your browsing history on all your signed-in devices',
    tabs: 'Read your browsing history',
    webNavigation: 'Read your browsing history',
    bookmarks: 'Read and change your bookmarks',
    notifications: 'Display notifications',
    clipboardWrite: 'Modify data you copy and paste',
    clipboardRead: 'Read data you copy and paste',
    downloads: 'Manage your downloads',
    'downloads.open': 'Open downloaded files',
    nativeMessaging: 'Communicate with cooperating native applications',
    tabGroups: 'View and manage your tab groups',
    management: 'Manage your apps, extensions, and themes',
    geolocation: 'Detect your physical location',
    cookies: 'Read and change cookies on websites you visit',
    contextMenus: 'Add items to the right-click menu',
    webRequest: 'Observe and analyze traffic; intercept, block, or modify requests',
    declarativeNetRequest: 'Block or modify network requests',
    declarativeNetRequestFeedback: 'Read your browsing history',
    scripting: 'Run scripts on pages you visit',
    userScripts: 'Run user scripts you add (unreviewed code)',
    proxy: 'Control which sites your browser connects through',
    privacy: 'Change your privacy-related settings',
    debugger: 'Access the page debugger backend (full page control)',
    idle: "Detect when your device is idle",
    alarms: 'Schedule background tasks',
    storage: null, unlimitedStorage: null, activeTab: 'Access the current tab when you click the extension',
    contentSettings: 'Change your website settings',
    cookies_all: null, offscreen: null, sidePanel: 'Show content in the side panel',
    fontSettings: 'Change your font settings', system: 'Read system information'
  };
  function humanPerm(p) {
    if (p in PERM_DESC) return PERM_DESC[p];       // known (may be null = no warning)
    return p;                                       // unknown → show the raw key
  }

  function hostLabel(hosts) {
    if (hosts.some(function (h) { return h === '<all_urls>' || /^[a-z*]+:\/\/\*\/\*$/.test(h); })) return 'ALL SITES';
    return hosts.length + ' site' + (hosts.length === 1 ? '' : 's');
  }

  function iconUrl(ext) {
    if (ext.icons && ext.icons.length) {
      return ext.icons.sort(function (a, b) { return b.size - a.size; })[0].url;
    }
    return null;
  }

  var FZ = window.ZBFzf;

  function render(filter) {
    filter = (filter || '').trim();
    grid.innerHTML = '';
    // fzf-match the query against each extension name; sort by score so the
    // best matches float up, and remember indices to highlight matched chars.
    var shown;
    if (!filter) {
      shown = all.filter(function (e) { return e.type === 'extension'; })
                 .map(function (e) { return { ext: e, idx: null }; });
    } else {
      shown = [];
      all.forEach(function (e) {
        if (e.type !== 'extension') return;
        var m = FZ.fzfMatch(filter, e.name);
        // fall back to matching the description so nothing useful is hidden
        if (!m && FZ.fzfMatch(filter, e.description || '')) m = { score: -1000, indices: [] };
        if (m) shown.push({ ext: e, idx: m.indices, score: m.score });
      });
      shown.sort(function (a, b) { return (b.score || 0) - (a.score || 0); });
    }
    countEl.textContent = shown.length;
    if (!shown.length) { grid.innerHTML = '<div class="footer-docs">[ no matches ]</div>'; return; }
    shown.forEach(function (row) {
      var ext = row.ext;
      var nameHtml = row.idx && row.idx.length
        ? FZ.highlightWithIndices(ext.name, row.idx) : esc(ext.name);
      var card = document.createElement('div');
      card.className = 'product-card' + (ext.enabled ? '' : ' off');
      var ic = iconUrl(ext);
      var kind = ext.installType === 'development' ? 'UNPACKED' : String(ext.installType).toUpperCase();
      card.innerHTML =
        '<div class="product-thumb">' +
          '<span class="badge">' + esc(kind) + '</span>' +
          (ic ? '<img class="xt-icon" src="' + ic + '">' : '') +
        '</div>' +
        '<div class="product-body">' +
          '<span class="p-cat">' + (ext.enabled ? 'ENABLED' : 'DISABLED') + '</span>' +
          '<span class="p-name">' + nameHtml + ' <span class="card-chip">v' + esc(ext.version) + '</span></span>' +
          '<span class="p-tag">' + esc(ext.description || '') + '</span>' +
          '<div class="xt-meta">' +
            (ext.permissions && ext.permissions.length ? '<span class="xt-chip">PERMS · ' + ext.permissions.length + '</span>' : '') +
            (ext.hostPermissions && ext.hostPermissions.length ? '<span class="xt-chip" title="' + esc(ext.hostPermissions.join(' ')) + '">SITE ACCESS · ' + hostLabel(ext.hostPermissions) + '</span>' : '') +
            (ext.optionsUrl ? '<span class="xt-chip">OPTIONS</span>' : '') +
            (ext.homepageUrl ? '<a class="xt-chip link" href="' + esc(ext.homepageUrl) + '">HOMEPAGE ↗</a>' : '') +
            (ext.updateUrl ? '<span class="xt-chip">' + (ext.updateUrl.indexOf('google') !== -1 ? 'WEB STORE' : 'SELF-HOSTED') + '</span>' : '') +
            (ext.offlineEnabled ? '<span class="xt-chip">OFFLINE</span>' : '') +
            (!ext.enabled && ext.disabledReason ? '<span class="xt-chip warn">' + esc(String(ext.disabledReason).toUpperCase()) + '</span>' : '') +
          '</div>' +
          (ext.permissions && ext.permissions.length ? '<div class="xt-perms">' + ext.permissions.map(function (p) { return esc(p); }).join(' · ') + '</div>' : '') +
          '<div class="xt-id">ID: ' + esc(ext.id) + ' · v' + esc(ext.version) + '</div>' +
        '</div>' +
        '<div class="product-foot">' +
          '<div class="xt-foot">' +
            '<button class="xt-btn" data-act="details">DETAILS</button>' +
            (ext.optionsUrl ? '<button class="xt-btn" data-act="options">OPTIONS</button>' : '') +
            (ext.mayDisable ? '<button class="xt-btn danger" data-act="remove">REMOVE</button>' : '<span class="badge">LOCKED</span>') +
            '<span class="grow"></span>' +
            '<div class="xt-toggle' + (ext.enabled ? ' on' : '') + '" data-act="toggle" title="enable/disable"></div>' +
          '</div>' +
        '</div>';
      card.querySelectorAll('[data-act]').forEach(function (el) {
        el.onclick = function (e) { e.preventDefault(); e.stopPropagation(); action(el.getAttribute('data-act'), ext); };
      });
      grid.appendChild(card);
    });
  }

  function action(act, ext) {
    if (act === 'toggle') {
      if (!ext.mayDisable) return;
      chrome.management.setEnabled(ext.id, !ext.enabled, function () { void chrome.runtime.lastError; refresh(); });
    } else if (act === 'remove') {
      chrome.management.uninstall(ext.id, { showConfirmDialog: true }, function () { void chrome.runtime.lastError; refresh(); });
    } else if (act === 'options' && ext.optionsUrl) {
      chrome.tabs ? chrome.tabs.create({ url: ext.optionsUrl }) : (window.location.href = ext.optionsUrl);
    } else if (act === 'details') {
      renderDetail(ext);
    }
  }

  function sect(title, body) {
    return '<div class="xt-dsec"><div class="set-h">// ' + title + '</div><div class="xt-dbody">' + body + '</div></div>';
  }

  function siteAccessDesc(hosts) {
    if (!hosts || !hosts.length) return null;
    if (hosts.some(function (h) { return h === '<all_urls>' || /^[a-z*]+:\/\/\*\/\*$/.test(h); }))
      return 'Read and change all your data on all websites you visit';
    return 'Read and change your data on ' + hosts.length + ' site' + (hosts.length === 1 ? '' : 's');
  }

  function renderDetail(ext) {
    var ic = iconUrl(ext);
    var host = ext.hostPermissions && ext.hostPermissions.length ? hostLabel(ext.hostPermissions) : 'none';
    // Human-readable permission warnings (like stock), then the raw keys dimmed.
    var warnings = [];
    (ext.permissions || []).forEach(function (p) { var d = humanPerm(p); if (d) warnings.push(d); });
    var sa = siteAccessDesc(ext.hostPermissions);
    if (sa) warnings.push(sa);
    var permBody = warnings.length
      ? '<ul class="xt-warnlist">' + warnings.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul>' +
        (ext.permissions && ext.permissions.length ? '<div class="xt-perms">keys: ' + ext.permissions.map(esc).join(' · ') + '</div>' : '')
      : '<div class="xt-dbody">No special permissions required.</div>';
    var hostBody = ext.hostPermissions && ext.hostPermissions.length
      ? '<div class="xt-perms">' + ext.hostPermissions.map(esc).join(' · ') + '</div>' : 'none';
    var rows = [['Status', ext.enabled ? 'On' : 'Off'], ['Version', ext.version], ['ID', ext.id],
      ['Install type', ext.installType], ['Source', ext.installType === 'development' ? 'Unpacked extension' :
        (ext.updateUrl ? (ext.updateUrl.indexOf('google') !== -1 ? 'Chrome Web Store' : 'Self-hosted') : '—')],
      ['Update URL', ext.updateUrl || '—'],
      ['Homepage', ext.homepageUrl || '—'], ['Options page', ext.optionsUrl ? 'yes' : 'no'],
      ['Site access', host], ['Offline enabled', ext.offlineEnabled ? 'yes' : 'no'],
      ['May disable', ext.mayDisable ? 'yes' : 'no'], ['Is app', ext.isApp ? 'yes' : 'no'],
      ['Type', ext.type]];
    grid.innerHTML =
      '<div class="xt-detail">' +
        '<button class="xt-btn" data-back="1">← BACK</button>' +
        '<div class="xt-detail-head">' +
          (ic ? '<img class="xt-dicon" src="' + ic + '">' : '<div class="xt-dicon"></div>') +
          '<div class="xt-dtitle"><div class="xt-dname">' + esc(ext.name) + ' <span class="card-chip">v' + esc(ext.version) + '</span></div>' +
          '<div class="p-cat">' + (ext.enabled ? 'ENABLED' : 'DISABLED') + ' · ' + esc(String(ext.installType).toUpperCase()) + '</div></div>' +
          '<span class="grow"></span>' +
          '<div class="xt-toggle' + (ext.enabled ? ' on' : '') + '" data-act="toggle" title="enable/disable"></div>' +
        '</div>' +
        sect('DESCRIPTION', esc(ext.description || '—')) +
        sect('PERMISSIONS · ' + ((ext.permissions || []).length), permBody) +
        sect('HOST ACCESS', hostBody) +
        '<div class="xt-dsec"><div class="set-h">// DETAILS</div><div class="info-list">' +
          rows.map(function (r) { return '<div class="info-row"><span class="ik">' + esc(r[0]) + '</span><span class="iv">' + esc(String(r[1])) + '</span></div>'; }).join('') +
        '</div></div>' +
        '<div class="xt-foot" style="margin-top:16px">' +
          (ext.optionsUrl ? '<button class="xt-btn" data-act="options">OPTIONS</button>' : '') +
          (ext.homepageUrl ? '<a class="xt-btn" href="' + esc(ext.homepageUrl) + '">HOMEPAGE ↗</a>' : '') +
          (ext.mayDisable ? '<button class="xt-btn danger" data-act="remove">REMOVE</button>' : '') +
        '</div>' +
      '</div>';
    grid.querySelector('[data-back]').onclick = function () { render(searchEl.value); };
    grid.querySelectorAll('[data-act]').forEach(function (el) {
      el.onclick = function () { action(el.getAttribute('data-act'), ext); };
    });
  }

  var tries = 0;
  function refresh() {
    chrome.management.getAll(function (list) {
      if (chrome.runtime.lastError) { void chrome.runtime.lastError; }
      all = (list || []).slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
      render(searchEl.value);
      // getAll can return empty right after the page loads; retry a few times.
      if (!all.length && tries < 8) { tries++; setTimeout(refresh, 400); }
    });
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  if (searchEl) searchEl.addEventListener('input', function () { render(searchEl.value); });
  if (chrome.management && chrome.management.onInstalled) {
    chrome.management.onInstalled.addListener(refresh);
    chrome.management.onUninstalled.addListener(refresh);
    chrome.management.onEnabled.addListener(refresh);
    chrome.management.onDisabled.addListener(refresh);
  }
  refresh();
})();
