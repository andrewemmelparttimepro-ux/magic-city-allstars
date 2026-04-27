/* global React */
// MCA — small shared primitives

const { useState, useEffect, useRef, useMemo } = React;

// ─────────── Logo + wordmark ───────────
function Logo({ size = 28 }) {
  return <img className="mca-logo" src="assets/mca-logo.png" alt="Magic City Athletics" style={{ height: size, width: 'auto', display: 'block' }} />;
}

function Wordmark({ size = 18 }) {
  return (
    <span className="serif-italic" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 800, letterSpacing: '-0.03em', fontSize: size, lineHeight: 1 }}>
      Magic City <span className="grad-text">Athletics</span>
    </span>
  );
}

// ─────────── Status bar ───────────
function StatusBar() {
  return (
    <div className="statusbar">
      <span style={{ fontWeight: 600 }}>9:41</span>
      <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
        <svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="7" width="2.6" height="4" rx="0.6" fill="#fff"/><rect x="4" y="4.5" width="2.6" height="6.5" rx="0.6" fill="#fff"/><rect x="8" y="2.2" width="2.6" height="8.8" rx="0.6" fill="#fff"/><rect x="12" y="0" width="2.6" height="11" rx="0.6" fill="#fff"/></svg>
        <svg width="14" height="11" viewBox="0 0 17 12"><path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill="#fff"/><path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill="#fff"/><circle cx="8.5" cy="10.5" r="1.5" fill="#fff"/></svg>
        <svg width="24" height="11" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="#fff" strokeOpacity="0.5" fill="none"/><rect x="2" y="2" width="20" height="9" rx="2" fill="#fff"/><path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill="#fff" fillOpacity="0.4"/></svg>
      </span>
    </div>
  );
}

// ─────────── Top nav (in-app) ───────────
function TopNav({ onMenu, page, onHome }) {
  return (
    <header className="topnav" role="banner">
      <button onClick={onHome} aria-label="Magic City Athletics — home" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text)' }}>
        <Logo size={34}/>
        <Wordmark size={16}/>
      </button>
      <div className="topnav__actions">
        <ThemeToggle/>
        <button className="topnav__menu" onClick={onMenu} aria-label="Open menu" aria-expanded="false">
          <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true"><rect y="1" width="16" height="1.6"/><rect y="6.2" width="16" height="1.6"/><rect y="11.4" width="16" height="1.6"/></svg>
        </button>
      </div>
    </header>
  );
}

// ─────────── Theme toggle ───────────
function useTheme() {
  const [theme, setThemeState] = useState(() => (typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') : 'dark') || 'dark');

  const setTheme = (next) => {
    setThemeState(next);
    if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('mca-theme', next); } catch (_) {}
  };

  // Sync if system preference changes AND user hasn't explicitly chosen
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = (e) => {
      try {
        if (localStorage.getItem('mca-theme')) return;
        const next = e.matches ? 'light' : 'dark';
        setThemeState(next);
        document.documentElement.setAttribute('data-theme', next);
      } catch (_) {}
    };
    mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
    return () => mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler);
  }, []);

  return { theme, setTheme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') };
}

function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <button
      type="button"
      onClick={toggle}
      className={`theme-toggle ${className}`}
      aria-label={label}
      title={label}
    >
      <svg className="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
      </svg>
      <svg className="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
      <span className="sr-only">{label}</span>
    </button>
  );
}

// ─────────── Drawer (slide-down nav) ───────────
// Primary nav — kept to 6 for clean fit on desktop (Grok feedback)
const NAV_ITEMS = [
  { id: 'home',     label: 'Home',         num: '01' },
  { id: 'programs', label: 'Programs',     num: '02' },
  { id: 'teams',    label: 'Teams',        num: '03' },
  { id: 'coaches',  label: 'Coaches',      num: '04' },
  { id: 'pricing',  label: 'Pricing',      num: '05' },
  { id: 'contact',  label: 'Contact',      num: '06' },
];

// Secondary — surfaced in footer + drawer, not main nav
const SECONDARY_NAV = [
  { id: 'facility', label: 'Facility' },
  { id: 'faq',      label: 'FAQ' },
];

function Drawer({ onClose, onNav, page }) {
  // Trap escape, lock body scroll
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="drawer" role="dialog" aria-modal="true" aria-label="Site navigation">
      <button className="drawer__close" onClick={onClose} aria-label="Close menu">
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 2l10 10M12 2L2 12"/></svg>
      </button>
      <div className="drawer__brand">
        <Logo size={36}/>
        <Wordmark size={18}/>
      </div>
      {NAV_ITEMS.map(it => (
        <button
          key={it.id}
          className={`drawer__item${page === it.id ? ' is-active' : ''}`}
          onClick={() => onNav(it.id)}
          aria-current={page === it.id ? 'page' : undefined}
        >
          <small>{it.num}</small>{it.label}
        </button>
      ))}
      <div className="drawer__divider"/>
      <div style={{ display: 'flex', gap: 18, padding: '6px 0 12px' }}>
        {SECONDARY_NAV.map(it => (
          <button
            key={it.id}
            onClick={() => onNav(it.id)}
            className={`drawer__sub${page === it.id ? ' is-active' : ''}`}
            aria-current={page === it.id ? 'page' : undefined}
          >
            {it.label}
          </button>
        ))}
      </div>
      <div className="drawer__divider"/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
        <div className="eyebrow eyebrow-teal">Schedule + sign-ups</div>
        <a href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }} className="btn btn-primary btn-block">Book a free trial →</a>
        <div className="dim" style={{ fontSize: 11, lineHeight: 1.5, marginTop: 6 }}>
          Real-time schedules, registration, billing and team rosters all live in the Hit Zero app.
        </div>
      </div>
      <div className="drawer__divider"/>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
        <span className="eyebrow">Theme</span>
        <ThemeToggle/>
      </div>
    </div>
  );
}

// ─────────── Photo (real image when src provided, placeholder otherwise) ───────────
function Photo({ ratio = '4/5', label = 'PHOTO', tone = 'mix', src, alt, focal = '50% 50%', overlay = false, children, style = {} }) {
  const tones = {
    mix:  'linear-gradient(135deg, rgba(39,207,215,0.55) 0%, rgba(249,127,172,0.7) 100%)',
    teal: 'linear-gradient(135deg, rgba(39,207,215,0.7) 0%, rgba(26,143,148,0.8) 100%)',
    pink: 'linear-gradient(135deg, rgba(249,127,172,0.85) 0%, rgba(184,86,122,0.85) 100%)',
    dark: 'linear-gradient(135deg, rgba(38,22,34,1) 0%, rgba(184,86,122,0.5) 100%)',
  };
  if (src) {
    return (
      <div className="ph ph--photo" style={{ aspectRatio: ratio, position: 'relative', overflow: 'hidden', ...style }}>
        <img
          src={src}
          alt={alt || label}
          loading="lazy"
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: focal, display: 'block' }}
        />
        {overlay && (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,7,16,0.05) 0%, rgba(14,7,16,0.65) 100%)', zIndex: 1 }}/>
        )}
        {children}
      </div>
    );
  }
  return (
    <div className="ph" style={{ aspectRatio: ratio, background: tones[tone] || tones.mix, ...style }}>
      {!children && <span className="ph__label">{label}</span>}
      {children}
    </div>
  );
}

// ─────────── Page section header ───────────
function SectionHead({ eyebrow, title, kicker, accent = 'teal' }) {
  return (
    <div className="mb-6">
      <div className={`eyebrow ${accent === 'teal' ? 'eyebrow-teal' : 'eyebrow-pink'} mb-2`}>{eyebrow}</div>
      <div className="display" style={{ fontSize: 38 }}>{title}</div>
      {kicker && <div className="dim mt-2" style={{ fontSize: 13, lineHeight: 1.55 }}>{kicker}</div>}
    </div>
  );
}

// ─────────── Animated reveal ───────────
function useInView(ref) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setSeen(true); });
    }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return seen;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: seen ? 1 : 0,
      transform: seen ? 'none' : 'translateY(16px)',
      transition: `opacity 600ms ${delay}ms cubic-bezier(.2,.8,.2,1), transform 600ms ${delay}ms cubic-bezier(.2,.8,.2,1)`,
    }}>{children}</div>
  );
}

// ─────────── Viewport hook ───────────
function useMediaQuery(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches;
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
    setMatches(mq.matches);
    return () => mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler);
  }, [query]);
  return matches;
}

// ─────────── Desktop header ───────────
function DesktopHeader({ page, go }) {
  const headerRef = useRef(null);
  // Add `.is-scrolled` once user has scrolled past hero — for glass effect that "settles in"
  useEffect(() => {
    const onScroll = () => {
      if (!headerRef.current) return;
      headerRef.current.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="site-header" ref={headerRef} role="banner">
      <div className="site-header__inner">
        <button onClick={() => go('home')} className="site-header__brand" aria-label="Magic City Athletics — home">
          <Logo size={36}/>
          <Wordmark size={20}/>
          <span className="pill pill-teal" style={{ marginLeft: 8 }}>◉ MINOT, ND</span>
        </button>
        <nav className="site-header__nav" aria-label="Primary">
          {NAV_ITEMS.map(it => (
            <button
              key={it.id}
              onClick={() => go(it.id)}
              className={`site-header__link${page === it.id ? ' is-active' : ''}`}
              aria-current={page === it.id ? 'page' : undefined}
            >
              {it.label}
            </button>
          ))}
        </nav>
        <div className="site-header__actions">
          <ThemeToggle/>
          <a href="#/contact" onClick={(e) => { e.preventDefault(); go('contact'); }} className="btn btn-primary btn-sm site-header__cta">Book a free trial →</a>
        </div>
      </div>
    </header>
  );
}

// ─────────── Desktop footer ───────────
function DesktopFooter({ go }) {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner">
        <div className="site-footer__col">
          <Wordmark size={20}/>
          <p className="dim mt-3" style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 360 }}>
            More than a gym — it's a cheer family. We create a safe, uplifting space where athletes shine, build confidence, and grow through teamwork, discipline, and resilience — on and off the mat. <em className="serif-italic" style={{ color: 'var(--text)' }}>Bring out the MAGIC in YOU.</em>
          </p>
          <address style={{ fontStyle: 'normal', marginTop: 18 }}>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>111 45th Ave NE<br/>Minot, ND 58703</div>
            <a href="mailto:coaches@magiccityathletics.net" style={{ display: 'block', marginTop: 8, fontSize: 13, color: 'var(--text)', textDecoration: 'none' }}>coaches@magiccityathletics.net</a>
          </address>
          <div className="mono dim mt-4" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Minot · ND</div>
        </div>
        <div className="site-footer__col">
          <div className="eyebrow eyebrow-teal mb-3">Visit</div>
          {[...NAV_ITEMS, ...SECONDARY_NAV].map(it => (
            <button key={it.id} onClick={() => go(it.id)} className="site-footer__link">{it.label}</button>
          ))}
        </div>
        <div className="site-footer__col">
          <div className="eyebrow eyebrow-pink mb-3">On the app</div>
          <p className="dim" style={{ fontSize: 13, lineHeight: 1.55 }}>
            Schedules, billing, badges — all in <em className="grad-text">Hit Zero</em>.
          </p>
          <div className="row gap-2 mt-4">
            <a href="#" className="app-badge" aria-label="Download on the App Store"><div><div className="app-badge__top">Download on</div><div className="app-badge__btm">App Store</div></div></a>
            <a href="#" className="app-badge" aria-label="Get it on Google Play"><div><div className="app-badge__top">Get it on</div><div className="app-badge__btm">Google Play</div></div></a>
          </div>
          <div className="row gap-3 mt-6" style={{ alignItems: 'center' }}>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="site-footer__legal">
        <span className="mono dim" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>© 2026 Magic City Athletics</span>
        <span className="mono dim" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Built with <em className="serif-italic teal">Hit Zero</em></span>
      </div>
    </footer>
  );
}

Object.assign(window, { Logo, Wordmark, StatusBar, TopNav, Drawer, NAV_ITEMS, SECONDARY_NAV, Photo, SectionHead, Reveal, useInView, useMediaQuery, DesktopHeader, DesktopFooter, ThemeToggle, useTheme });
