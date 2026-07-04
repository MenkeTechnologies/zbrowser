"use strict";

// Default quick-launch tiles. Overridable via localStorage key "zb.tiles"
// (an array of { label, url } objects).
const DEFAULT_TILES = [
  { label: "GitHub",   url: "https://github.com/MenkeTechnologies" },
  { label: "Search",   url: "https://duckduckgo.com" },
  { label: "MDN",      url: "https://developer.mozilla.org" },
  { label: "crates",   url: "https://crates.io" },
  { label: "Hacker",   url: "https://news.ycombinator.com" },
  { label: "Docs",     url: "https://menketechnologies.github.io" }
];

// Search engine for non-URL omnibox input. Override via localStorage "zb.engine".
const DEFAULT_ENGINE = "https://duckduckgo.com/?q=%s";

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function pad(n) { return String(n).padStart(2, "0"); }

function tick() {
  const now = new Date();
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const date = now
    .toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" })
    .toUpperCase();
  document.getElementById("time").textContent = time;
  document.getElementById("date").textContent = date;
}

// Heuristic: does the input look like a URL rather than a search query?
function looksLikeUrl(s) {
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(s)) return true;       // has a scheme
  if (/\s/.test(s)) return false;                             // has whitespace -> search
  return /^[^\s.]+\.[^\s.]{2,}(\/.*)?$/.test(s) || s === "localhost";
}

function navigate(input) {
  const s = input.trim();
  if (!s) return;
  let dest;
  if (looksLikeUrl(s)) {
    dest = /^[a-z][a-z0-9+.-]*:\/\//i.test(s) ? s : `https://${s}`;
  } else {
    const engine = readJSON("zb.engine", DEFAULT_ENGINE);
    dest = engine.replace("%s", encodeURIComponent(s));
  }
  window.location.href = dest;
}

function renderTiles() {
  const tiles = readJSON("zb.tiles", DEFAULT_TILES);
  const host = document.getElementById("tiles");
  host.textContent = "";
  for (const t of tiles) {
    const a = document.createElement("a");
    a.className = "tile";
    a.href = t.url;
    const glyph = document.createElement("span");
    glyph.className = "tile-glyph";
    glyph.textContent = (t.label || "?").slice(0, 2).toUpperCase();
    const label = document.createElement("span");
    label.textContent = t.label || t.url;
    a.append(glyph, label);
    host.appendChild(a);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  tick();
  setInterval(tick, 1000);
  renderTiles();
  document.getElementById("search").addEventListener("submit", (e) => {
    e.preventDefault();
    navigate(document.getElementById("q").value);
  });
});
