/* global React, ReactDOM, TopNav, Drawer, NAV_ITEMS, HomePage, ProgramsPage, TeamsPage, FacilityPage, CoachesPage, PricingPage, FAQPage, ContactPage, useMediaQuery, DesktopHeader, DesktopFooter */

const { useState, useEffect } = React;

function App() {
  const [page, setPage] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = (typeof useMediaQuery === 'function') ? useMediaQuery('(min-width: 960px)') : false;

  const go = (id) => {
    setPage(id);
    setDrawerOpen(false);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Reflect current page in URL hash so deep-links work
  useEffect(() => {
    const fromHash = (typeof window !== 'undefined' && window.location.hash || '').replace('#/', '').replace('#', '');
    if (fromHash && PAGE_IDS.includes(fromHash)) setPage(fromHash);
    const onHash = () => {
      const p = (window.location.hash || '').replace('#/', '').replace('#', '');
      if (PAGE_IDS.includes(p)) setPage(p);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const target = `#/${page}`;
    if (window.location.hash !== target) {
      history.replaceState(null, '', target);
    }
    document.title = page === 'home'
      ? 'Magic City Athletics — Minot, ND'
      : `${page[0].toUpperCase()}${page.slice(1)} · Magic City Athletics`;
  }, [page]);

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

  if (isDesktop) {
    return (
      <div className="site site--desktop">
        <a href="#main" className="skip-link">Skip to content</a>
        <DesktopHeader page={page} go={go}/>
        <main key={page} id="main" className="site__main rise">
          {PAGES[page]}
        </main>
        <DesktopFooter go={go}/>
      </div>
    );
  }

  return (
    <div className="site site--mobile">
      <a href="#main" className="skip-link">Skip to content</a>
      <TopNav onMenu={() => setDrawerOpen(true)} page={page} onHome={() => go('home')}/>
      {drawerOpen && <Drawer onClose={() => setDrawerOpen(false)} onNav={go} page={page}/>}
      <main key={page} id="main" className="rise">
        {PAGES[page]}
      </main>
    </div>
  );
}

const PAGE_IDS = ['home','programs','teams','facility','coaches','pricing','contact','faq'];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
