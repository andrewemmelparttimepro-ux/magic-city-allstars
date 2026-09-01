(function () {
  var config = window.HZ_ANALYTICS_CONFIG || {};
  var app = config.app || 'mca-site';
  var debug = /[?&]analytics_debug=1\b/.test(window.location.search);
  var blockedKeys = /email|phone|name|password|token|secret|card|medical|insurance|policy|dob|birth|address|athlete|parent|child/i;

  function isProdHost() {
    return !/^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/i.test(window.location.hostname || '');
  }

  function route() {
    var hash = (window.location.hash || '').split('?')[0] || '#';
    return window.location.pathname + hash;
  }

  function clean(value) {
    if (value == null) return undefined;
    if (typeof value === 'number' || typeof value === 'boolean') return value;
    return String(value).replace(/\s+/g, ' ').trim().slice(0, 80);
  }

  function sanitize(props) {
    var out = { app: app, route: route() };
    Object.keys(props || {}).forEach(function (key) {
      if (blockedKeys.test(key)) return;
      var value = clean(props[key]);
      if (value !== undefined && value !== '') out[key] = value;
    });
    return out;
  }

  function send(eventName, props) {
    var safeName = clean(eventName || 'event');
    var payload = sanitize(props);
    if (debug) console.info('[analytics]', safeName, payload);
    try {
      if (typeof window.va === 'function') window.va('event', safeName, payload);
    } catch (err) {}
    try {
      if (typeof window.clarity === 'function') window.clarity('event', safeName);
    } catch (err) {}
    try {
      if (typeof window.gtag === 'function') window.gtag('event', safeName, payload);
    } catch (err) {}
  }

  function markPage() {
    send('page_view', {
      path: window.location.pathname,
      hash: (window.location.hash || '#').split('?')[0],
      viewport: window.innerWidth + 'x' + window.innerHeight,
    });
  }

  function loadClarity() {
    var clarityId = clean(config.clarityId || '');
    if (!clarityId || !isProdHost()) return;
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.clarity.ms/tag/' + encodeURIComponent(clarityId);
    document.head.appendChild(script);
  }

  function loadGoogleAnalytics() {
    var gaId = clean(config.gaId || '');
    if (!gaId || !isProdHost()) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', gaId, { send_page_view: false });
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
    document.head.appendChild(script);
  }

  function protectFormFields() {
    document.querySelectorAll('input,textarea,select,[contenteditable="true"],[data-sensitive]').forEach(function (node) {
      node.setAttribute('data-clarity-mask', 'true');
    });
  }

  function attachClickTracking() {
    document.addEventListener('click', function (event) {
      var el = event.target && event.target.closest && event.target.closest('a,button,[role="button"]');
      if (!el) return;
      var label = el.getAttribute('data-analytics') || el.getAttribute('aria-label') || el.textContent || el.href || el.tagName;
      send('ui_click', {
        element: el.tagName.toLowerCase(),
        label: label,
        target: el.getAttribute('href') ? new URL(el.getAttribute('href'), window.location.href).pathname : '',
      });
    }, true);
  }

  function attachErrorTracking() {
    window.addEventListener('error', function (event) {
      send('client_error', {
        message: event.message || 'error',
        source: event.filename ? event.filename.split('/').pop() : '',
      });
    });
    window.addEventListener('unhandledrejection', function (event) {
      var reason = event.reason && (event.reason.message || String(event.reason));
      send('client_rejection', { message: reason || 'unhandled rejection' });
    });
  }

  function init() {
    window.MCAAnalytics = { track: send, page: markPage };
    window.va = window.va || function () {
      (window.vaq = window.vaq || []).push(arguments);
    };
    protectFormFields();
    loadClarity();
    loadGoogleAnalytics();
    attachClickTracking();
    attachErrorTracking();
    markPage();
    window.addEventListener('hashchange', markPage);
    window.addEventListener('popstate', markPage);
    if (window.MutationObserver) {
      new MutationObserver(protectFormFields).observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
