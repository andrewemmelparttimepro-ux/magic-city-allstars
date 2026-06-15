/* Magic City Athletics — owner theme bootstrap
 *
 * Reads the gym's owner-editable theme (set inside Hit Zero → Program → Edit)
 * from window.HZ.getProgram('mca').theme and maps a tiny set of "knobs" onto
 * the site's existing CSS variables:
 *
 *     theme = { colors: { primary, accent }, font: "<key>" }
 *
 * Design rules:
 *   · Fully backward-compatible — no theme, or any missing field, leaves the
 *     site exactly as designed. Every knob is additive.
 *   · No FOUC — the last-applied theme is cached in localStorage and applied
 *     synchronously in <head>, then refreshed from the database on load.
 *   · Two colors drive everything: we derive the dim/glow/radial/overlay tokens
 *     so the whole palette stays coherent from just primary + accent.
 */
(function () {
  var KEY = 'mca-site-theme-v1';

  // ── tiny color helpers ──────────────────────────────────────────────
  function hexToRgb(h) {
    if (typeof h !== 'string') return null;
    h = h.trim().replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgba(h, a) { var c = hexToRgb(h); return c ? 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')' : null; }
  function mix(h, t, amt) {
    var c = hexToRgb(h); if (!c) return h;
    return 'rgb(' + c.map(function (v, i) { return Math.round(v + (t[i] - v) * amt); }).join(',') + ')';
  }
  function darken(h, a) { return mix(h, [0, 0, 0], a); }
  function lighten(h, a) { return mix(h, [255, 255, 255], a); }

  // ── curated font pairings (display + body) ──────────────────────────
  // Only fonts that read well as a display face. `load` is the Google Fonts
  // family spec (null = already bundled by site.css).
  var FONTS = {
    fraunces: { display: "'Fraunces', 'Times New Roman', serif", sans: "'Inter', -apple-system, system-ui, sans-serif", load: null },
    playfair: { display: "'Playfair Display', 'Times New Roman', serif", sans: "'Inter', -apple-system, system-ui, sans-serif", load: 'Playfair+Display:ital,wght@0,500;0,700;0,800;1,500;1,700;1,800' },
    poppins:  { display: "'Poppins', system-ui, sans-serif", sans: "'Inter', -apple-system, system-ui, sans-serif", load: 'Poppins:ital,wght@0,500;0,600;0,700;0,800;1,500;1,700' },
    grotesk:  { display: "'Space Grotesk', system-ui, sans-serif", sans: "'Inter', -apple-system, system-ui, sans-serif", load: 'Space+Grotesk:wght@400;500;600;700' }
  };

  function loadFont(spec) {
    if (!spec) return;
    var id = 'mca-font-' + spec.replace(/[^a-zA-Z0-9]/g, '');
    if (document.getElementById(id)) return;
    var l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=' + spec + '&display=swap';
    document.head.appendChild(l);
  }

  function applyTheme(theme) {
    if (!theme || typeof theme !== 'object') return;
    var root = document.documentElement, s = root.style;
    var c = theme.colors || {};

    if (hexToRgb(c.primary)) {
      s.setProperty('--teal', c.primary);
      s.setProperty('--teal-dim', darken(c.primary, 0.32));
      s.setProperty('--teal-glow', lighten(c.primary, 0.45));
      s.setProperty('--bg-radial-teal', rgba(c.primary, 0.16));
    }
    if (hexToRgb(c.accent)) {
      s.setProperty('--pink', c.accent);
      s.setProperty('--pink-dim', darken(c.accent, 0.30));
      s.setProperty('--pink-glow', lighten(c.accent, 0.45));
      s.setProperty('--bg-radial-pink', rgba(c.accent, 0.22));
      s.setProperty('--bg-radial-pink-soft', rgba(c.accent, 0.14));
      s.setProperty('--shadow-card', '0 8px 30px ' + rgba(c.accent, 0.35));
    }
    if (hexToRgb(c.primary) && hexToRgb(c.accent)) {
      s.setProperty('--hero-overlay',
        'radial-gradient(ellipse at 30% 20%, ' + rgba(c.primary, 0.45) + ', transparent 55%), ' +
        'radial-gradient(ellipse at 80% 80%, ' + rgba(c.accent, 0.55) + ', transparent 55%), ' +
        'linear-gradient(180deg, transparent 30%, rgba(14,7,16,0.85) 100%)');
    }

    var f = FONTS[theme.font];
    if (f) {
      loadFont(f.load);
      s.setProperty('--serif', f.display);
      s.setProperty('--sans', f.sans);
      root.setAttribute('data-font', theme.font);
    }

    try { localStorage.setItem(KEY, JSON.stringify(theme)); } catch (e) {}
  }

  // Pre-paint: apply the cached theme immediately so there's no color flash.
  try { var cached = localStorage.getItem(KEY); if (cached) applyTheme(JSON.parse(cached)); } catch (e) {}

  // Refresh from the database once the API + DOM are ready.
  function refresh() {
    if (!window.HZ || typeof window.HZ.getProgram !== 'function') return;
    window.HZ.getProgram('mca').then(function (p) {
      if (p && p.theme) applyTheme(p.theme);
      else { try { localStorage.removeItem(KEY); } catch (e) {} }
    }).catch(function () {});
  }
  if (document.readyState !== 'loading') refresh();
  else document.addEventListener('DOMContentLoaded', refresh);

  window.MCAapplyTheme = applyTheme; // exposed for the in-app live preview
})();
