/* global React, ReactDOM, StatusBar, TopNav, Drawer, NAV_ITEMS, HomePage, ProgramsPage, TeamsPage, FacilityPage, CoachesPage, PricingPage, FAQPage, ContactPage, Wordmark, useTweaks, TweaksPanel, TweakSection, TweakSelect, TweakToggle, TweakColor */

const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroAccent": "duo",
  "showAppBadge": true,
  "compactNav": false,
  "warmBg": true
}/*EDITMODE-END*/;

function App() {
  const [page, setPage] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screenRef = useRef(null);
  const tweaks = (typeof useTweaks === 'function') ? useTweaks(TWEAK_DEFAULTS) : { values: TWEAK_DEFAULTS, set: () => {} };
  const t = tweaks.values;

  // apply tweaks via CSS vars
  useEffect(() => {
    const root = document.documentElement;
    if (t.heroAccent === 'teal') {
      root.style.setProperty('--accent-a', '#27CFD7');
      root.style.setProperty('--accent-b', '#1a8f94');
    } else if (t.heroAccent === 'pink') {
      root.style.setProperty('--accent-a', '#F97FAC');
      root.style.setProperty('--accent-b', '#b8567a');
    } else {
      root.style.removeProperty('--accent-a');
      root.style.removeProperty('--accent-b');
    }
  }, [t.heroAccent]);

  const go = (id) => {
    setPage(id);
    setDrawerOpen(false);
    if (screenRef.current) screenRef.current.scrollTo({ top: 0, behavior: 'auto' });
  };

  const PAGES = {
    home: <HomePage go={go}/>,
    programs: <ProgramsPage go={go}/>,
    teams: <TeamsPage go={go}/>,
    facility: <FacilityPage/>,
    coaches: <CoachesPage/>,
    pricing: <PricingPage go={go}/>,
    contact: <ContactPage/>,
    faq: <FAQPage/>,
  };

  return (
    <div className="stage">
      {/* Left rail (desktop) */}
      <aside className="stage__rail-l">
        <div className="rail">
          <h4>Magic City <em className="grad-text">Allstars</em></h4>
          <div>website mockup<br/>v1 · 2026</div>
          <div style={{ marginTop: 32 }}>
            <div style={{ color: '#fff', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, textTransform: 'none', letterSpacing: '-0.02em', marginBottom: 8 }}>Sections</div>
            {NAV_ITEMS.map(it => (
              <button key={it.id} onClick={() => go(it.id)}
                style={{ display: 'block', background: 'none', border: 0, color: page === it.id ? '#fff' : 'rgba(255,255,255,0.5)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', padding: '4px 0', cursor: 'pointer', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                {it.num} · {it.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Phone */}
      <div className="stage__phone" data-screen-label="Magic City Athletics — phone">
        <div className="phone__notch"/>
        <div className="phone__screen" ref={screenRef} data-screen-label={`Page: ${page}`}>
          <StatusBar/>
          <TopNav onMenu={() => setDrawerOpen(true)} page={page} onHome={() => go('home')}/>
          {drawerOpen && <Drawer onClose={() => setDrawerOpen(false)} onNav={go}/>}
          <main key={page} className="rise">
            {PAGES[page]}
          </main>
        </div>
      </div>

      {/* Right rail */}
      <aside className="stage__rail-r">
        <div className="rail" style={{ textAlign: 'right' }}>
          <h4 style={{ textAlign: 'right' }}><em className="grad-text">Hit Zero</em>.</h4>
          <div>One subscription.<br/>One mindset.<br/>One gym in Minot.</div>
          <div style={{ marginTop: 32, color: '#fff', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, letterSpacing: '-0.02em', textTransform: 'none' }}>QR · open prototype on phone</div>
          <div style={{ marginTop: 12, width: 110, height: 110, marginLeft: 'auto', background: '#fff', borderRadius: 12, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              {Array.from({length: 100}).map((_, i) => {
                const x = i % 10, y = Math.floor(i / 10);
                const filled = ((x * 7 + y * 13 + (x*y)) % 3) === 0;
                return filled ? <rect key={i} x={x*10} y={y*10} width="9" height="9" fill="#0E0710"/> : null;
              })}
              <rect x="0" y="0" width="30" height="30" fill="none" stroke="#0E0710" strokeWidth="6"/>
              <rect x="70" y="0" width="30" height="30" fill="none" stroke="#0E0710" strokeWidth="6"/>
              <rect x="0" y="70" width="30" height="30" fill="none" stroke="#0E0710" strokeWidth="6"/>
            </svg>
          </div>
        </div>
      </aside>

      {/* Tweaks panel */}
      {typeof TweaksPanel === 'function' && (
        <TweaksPanel title="Tweaks" defaultOpen={false}>
          <TweakSection title="Brand">
            <TweakSelect label="Hero accent" value={t.heroAccent} onChange={(v) => tweaks.set('heroAccent', v)}
              options={[
                { value: 'duo', label: 'Duo (teal + pink)' },
                { value: 'teal', label: 'Teal lead' },
                { value: 'pink', label: 'Pink lead' },
              ]}/>
            <TweakToggle label="Warm tinted background" value={t.warmBg} onChange={(v) => tweaks.set('warmBg', v)}/>
          </TweakSection>
          <TweakSection title="Layout">
            <TweakToggle label="Show app store badges" value={t.showAppBadge} onChange={(v) => tweaks.set('showAppBadge', v)}/>
            <TweakToggle label="Compact top nav" value={t.compactNav} onChange={(v) => tweaks.set('compactNav', v)}/>
          </TweakSection>
        </TweaksPanel>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
