/* global React, ReactDOM, TopNav, Drawer, NAV_ITEMS, HomePage, ProgramsPage, TeamsPage, CalendarPage, FacilityPage, CoachesPage, PricingPage, MerchPage, FAQPage, ContactPage, useMediaQuery, DesktopHeader, DesktopFooter */

const { useState, useEffect } = React;

const PAGE_IDS = ['home','programs','teams','calendar','facility','coaches','pricing','merch','contact','faq'];
const PAGE_META = {
  home: ['Magic City Athletics — Minot, ND', "Minot's 100% cheer-focused gym. Explore teams, classes, camps, clinics, pricing, and placement visits."],
  programs: ['Cheer Programs · Magic City Athletics', 'Browse current Magic City Athletics teams, classes, camps, clinics, and private lessons in Minot.'],
  teams: ['All-Star Cheer · Magic City Athletics', 'Learn how Magic City Athletics all-star cheer teams train, compete, and grow in Minot, North Dakota.'],
  calendar: ['Calendar · Magic City Athletics', 'See current Magic City Athletics practices, classes, events, closures, and schedule changes from the official MCA Google Calendar.'],
  facility: ['Facility · Magic City Athletics', 'See the Magic City Athletics cheer facility at 111 45th Ave NE in Minot, North Dakota.'],
  coaches: ['Coaches · Magic City Athletics', 'Meet the Magic City Athletics coaching team in Minot, North Dakota.'],
  pricing: ['Pricing · Magic City Athletics', 'Review current Magic City Athletics cheer, class, camp, clinic, and private lesson pricing.'],
  merch: ['Magic Merch Shop · Magic City Athletics', 'Download the Magic City Athletics merch order form and send it back to the gym.'],
  contact: ['Contact · Magic City Athletics', 'Contact Magic City Athletics or book a placement visit at the Minot cheer gym.'],
  faq: ['FAQ · Magic City Athletics', 'Answers about joining, placements, practices, billing, and the Magic City Athletics experience.'],
};

function pageFromLocation() {
  if (typeof window === 'undefined') return 'home';
  const pathPage = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (PAGE_IDS.includes(pathPage)) return pathPage;
  const hashPage = (window.location.hash || '').replace(/^#\/?/, '').split('?')[0].toLowerCase();
  return PAGE_IDS.includes(hashPage) ? hashPage : 'home';
}

function App() {
  const [page, setPage] = useState(pageFromLocation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = (typeof useMediaQuery === 'function') ? useMediaQuery('(min-width: 960px)') : false;

  const go = (id) => {
    setPage(id);
    setDrawerOpen(false);
    if (typeof window !== 'undefined') {
      const target = id === 'home' ? '/' : `/${id}`;
      if (window.location.pathname !== target || window.location.hash) history.pushState(null, '', target);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  // Clean, shareable routes with hash-link backward compatibility.
  useEffect(() => {
    const onRouteChange = () => setPage(pageFromLocation());
    window.addEventListener('hashchange', onRouteChange);
    window.addEventListener('popstate', onRouteChange);
    return () => {
      window.removeEventListener('hashchange', onRouteChange);
      window.removeEventListener('popstate', onRouteChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const target = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== target || window.location.hash) history.replaceState(null, '', target);
    const [title, description] = PAGE_META[page] || PAGE_META.home;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://mcaminot.com${target}`);
    window.MCAAnalytics?.page?.();
  }, [page]);

  const PAGES = {
    home: <HomePage go={go}/>,
    programs: <ProgramsPage go={go}/>,
    teams: <TeamsPage go={go}/>,
    calendar: <CalendarPage/>,
    facility: <FacilityPage go={go}/>,
    coaches: <CoachesPage go={go}/>,
    pricing: <PricingPage go={go}/>,
    merch: <MerchPage/>,
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
