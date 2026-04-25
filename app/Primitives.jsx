/* global React */
// MCA — small shared primitives

const { useState, useEffect, useRef, useMemo } = React;

// ─────────── Logo + wordmark ───────────
function Logo({ size = 28 }) {
  return <img src="assets/mca-logo.png" alt="Magic City Allstars" style={{ height: size, width: 'auto', display: 'block' }} />;
}

function Wordmark({ size = 18 }) {
  return (
    <span className="serif-italic" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 800, letterSpacing: '-0.03em', fontSize: size, lineHeight: 1 }}>
      Magic City <span className="grad-text">Allstars</span>
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
    <div className="topnav">
      <button onClick={onHome} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Logo size={32}/>
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="pill pill-teal" style={{ fontSize: 9 }}>◉ MINOT, ND</span>
        <button className="topnav__menu" onClick={onMenu} aria-label="Menu">
          <svg width="16" height="14" viewBox="0 0 16 14"><rect y="1" width="16" height="1.6" fill="#fff"/><rect y="6.2" width="16" height="1.6" fill="#fff"/><rect y="11.4" width="16" height="1.6" fill="#fff"/></svg>
        </button>
      </div>
    </div>
  );
}

// ─────────── Drawer (slide-down nav) ───────────
const NAV_ITEMS = [
  { id: 'home',     label: 'Home',         num: '01' },
  { id: 'programs', label: 'Programs',     num: '02' },
  { id: 'teams',    label: 'Teams',        num: '03' },
  { id: 'facility', label: 'Facility',     num: '04' },
  { id: 'coaches',  label: 'Coaches',      num: '05' },
  { id: 'pricing',  label: 'Pricing',      num: '06' },
  { id: 'contact',  label: 'Contact',      num: '07' },
  { id: 'faq',      label: 'FAQ',          num: '08' },
];

function Drawer({ onClose, onNav }) {
  return (
    <div className="drawer">
      <button className="drawer__close" onClick={onClose} aria-label="Close">✕</button>
      <div className="drawer__brand">
        <Logo size={36}/>
      </div>
      {NAV_ITEMS.map(it => (
        <button key={it.id} className="drawer__item" onClick={() => onNav(it.id)}>
          <small>{it.num}</small>{it.label}
        </button>
      ))}
      <div className="drawer__divider"/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
        <div className="eyebrow eyebrow-teal">Schedule + sign-ups</div>
        <a href="#" className="btn btn-primary btn-block">Open in Hit Zero app →</a>
        <div className="dim" style={{ fontSize: 11, lineHeight: 1.5, marginTop: 6 }}>
          Real-time schedules, registration, billing and team rosters all live in the Hit Zero app.
        </div>
      </div>
    </div>
  );
}

// ─────────── Photo placeholder w/ visible label ───────────
function Photo({ ratio = '4/5', label = 'PHOTO', tone = 'mix', children, style = {} }) {
  const tones = {
    mix:  'linear-gradient(135deg, rgba(39,207,215,0.55) 0%, rgba(249,127,172,0.7) 100%)',
    teal: 'linear-gradient(135deg, rgba(39,207,215,0.7) 0%, rgba(26,143,148,0.8) 100%)',
    pink: 'linear-gradient(135deg, rgba(249,127,172,0.85) 0%, rgba(184,86,122,0.85) 100%)',
    dark: 'linear-gradient(135deg, rgba(38,22,34,1) 0%, rgba(184,86,122,0.5) 100%)',
  };
  return (
    <div className="ph" style={{ aspectRatio: ratio, background: tones[tone] || tones.mix, ...style }}>
      <span className="ph__label">{label}</span>
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

Object.assign(window, { Logo, Wordmark, StatusBar, TopNav, Drawer, NAV_ITEMS, Photo, SectionHead, Reveal, useInView });
