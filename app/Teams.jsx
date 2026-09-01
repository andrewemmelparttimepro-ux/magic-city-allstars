/* global React, Photo, SectionHead, Reveal */
const { useState: useS_t } = React;

const COMPETITION_NOTES = [
  { label: 'Interest first', body: 'Families submit an interest form instead of choosing a named team.' },
  { label: 'Evaluation next', body: 'MCA evaluates each athlete before placing them in the right competition group.' },
  { label: 'Team names later', body: 'Final team names and rosters are assigned after placement.' },
];
const MCA_ALL_STAR_RESOURCES = [
  {
    title: 'Handbook packet',
    detail: 'Public All-Star welcome packet',
    href: '/mca-all-star-welcome-packet.pdf',
    ctaLabel: 'Download PDF',
  },
  {
    title: 'Current team details',
    detail: 'Assigned team, practice schedule, announcements, registration, and billing',
    href: 'https://thehitzero.net/#signin?source=mcaminot',
    ctaLabel: 'Open Hit Zero',
  },
  {
    title: '2026-2027 evaluation form',
    detail: 'Current cheer combine evaluation sheet for all-star placements',
    href: '/mca-cheer-combine-evaluations-form.pdf',
    ctaLabel: 'Download PDF',
  },
];

function TeamsPage({ go }) {
  const placementHref = (window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://thehitzero.net/#trial/mca';
  const memberHref = (window.HZ && window.HZ.HIT_ZERO_SIGNIN_URL) || 'https://thehitzero.net/#signin?source=mcaminot';
  return (
    <div>
      <section className="sec">
        <div className="eyebrow eyebrow-pink mb-2">03 · ALL-STAR TEAMS</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          All-Star Cheer, <em className="grad-text">without the hunt.</em>
        </h1>
        <p className="dim mt-4" style={{ fontSize: 14, lineHeight: 1.55 }}>
          Start with the path that matches your family. Public All-Star information stays here; athlete-specific details stay private in Hit Zero.
        </p>
      </section>

      <section className="sec parent-router parent-router--all-star" aria-labelledby="all-star-path-title">
        <div className="eyebrow eyebrow-teal mb-2">FIND YOUR ALL-STAR INFORMATION</div>
        <h2 id="all-star-path-title" className="display parent-router__title">
          Current family or <em className="grad-text">future athlete?</em>
        </h2>
        <div className="parent-router__grid parent-router__grid--two mt-6">
          <a
            href={memberHref}
            target="_blank"
            rel="noopener noreferrer"
            className="card parent-path parent-path--primary"
          >
            <span className="eyebrow eyebrow-teal">My athlete is already placed</span>
            <strong>See my athlete's All-Star details</strong>
            <span className="dim">Open Hit Zero for the assigned team, practice schedule, announcements, registration, and billing.</span>
            <span className="parent-path__cta">Open Hit Zero →</span>
          </a>
          <a href={placementHref} className="card parent-path">
            <span className="eyebrow eyebrow-pink">New or returning athlete</span>
            <strong>Start the placement process</strong>
            <span className="dim">MCA evaluates age, skills, readiness, and schedule fit before assigning the right competition group.</span>
            <span className="parent-path__cta">Book a placement →</span>
          </a>
        </div>
        <p className="dim parent-router__note">
          Hit Zero works in any web browser. You do not need to install an app to check your athlete from a work computer.
        </p>
      </section>

      <section className="sec">
        <Photo ratio="4/5" tone="mix" src="assets/photos/team-group-1.jpeg" alt="Magic City Athletics all-star cheer athletes and coaches" focal="50% 30%" overlay label="ALL-STAR CHEER">
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 18, zIndex: 3, color: '#fff' }}>
            <div className="row between">
              <span className="pill pill-grad">Fall 2026</span>
              <span className="pill" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}>Evaluations</span>
            </div>
            <div>
              <div className="display-strong" style={{ fontSize: 52, lineHeight: 0.92 }}>All-Star Cheer</div>
              <div className="eyebrow mt-2" style={{ color: '#fff' }}>Teams named after placement</div>
            </div>
          </div>
        </Photo>
        <div className="row gap-3 mt-4">
          <button className="btn" style={{ flex: 1 }} onClick={() => go && go('programs')}>See programs</button>
          <a
            href={placementHref}
            className="btn"
            style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}
          >Book a placement →</a>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="eyebrow eyebrow-teal mb-3">HANDBOOKS &amp; FORMS</div>
        <div className="col gap-2">
          {MCA_ALL_STAR_RESOURCES.map((resource) => (
            <div key={resource.title} className="card" style={{ padding: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{resource.title}</div>
              <div className="dim" style={{ fontSize: 11, marginTop: 4 }}>{resource.detail}</div>
              {resource.href ? (
                <a
                  href={resource.href}
                  className="btn btn-primary btn-block mt-3"
                  style={{ fontSize: 13, padding: '10px 14px', textDecoration: 'none', textAlign: 'center' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.ctaLabel} →
                </a>
              ) : (
                <button disabled className="btn btn-block mt-3" style={{ fontSize: 13, padding: '10px 14px' }}>
                  {resource.ctaLabel}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Placement process */}
      <section className="sec" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)' }}>
        <div className="eyebrow eyebrow-teal mb-3">HOW PLACEMENT WORKS</div>
        <div className="display" style={{ fontSize: 30 }}>MCA places every athlete.</div>
        <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55 }}>
          Families submit interest first. MCA coaches evaluate skills, age, readiness, and schedule fit before assigning the right competition group.
        </p>

        <div className="col gap-2 mt-6">
          {COMPETITION_NOTES.map((item, i) => (
            <div key={item.label} className="card" style={{ padding: 14, display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 14, alignItems: 'center' }}>
              <div className="pill pill-grad" style={{ width: 40, height: 40, borderRadius: 10, display: 'grid', placeItems: 'center', padding: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{item.label}</div>
                <div className="dim mt-1" style={{ fontSize: 12, lineHeight: 1.45 }}>{item.body}</div>
              </div>
              <div className="grad-text" style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.08em' }}>MCA</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="display" style={{ fontSize: 30 }}>
          Evaluations are <em className="grad-text">coming in August</em>.
        </div>
        <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55 }}>
          Open to athletes ages 5–18. Submit the interest form now and MCA will follow up with the right next step for placement.
        </p>
        <div className="col gap-3 mt-6">
          <a href={placementHref} className="btn btn-primary btn-block" style={{ textDecoration: 'none', textAlign: 'center' }}>Send placement form →</a>
          <button className="btn btn-block" onClick={() => go && go('faq')}>What to expect</button>
        </div>
      </section>
    </div>
  );
}

// ─────────── FACILITY ───────────
function FacilityPage({ go }) {
  return (
    <div>
      <section className="sec">
        <div className="eyebrow eyebrow-teal mb-2">04 · THE GYM</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          11,600 sqft, <em className="grad-text">spring floor</em>.
        </h1>
        <p className="dim mt-4" style={{ fontSize: 14, lineHeight: 1.55 }}>
          Built for cheer — full-size spring floor, parent lounge, pro shop, and dressing rooms. One roof, everything you need.
        </p>
      </section>

      <section className="sec-tight">
        <Photo ratio="16/9" tone="dark" src="assets/photos/team-group-2.jpeg" alt="Magic City Athletics — owners and coaches on the floor" focal="50% 35%" label="MAIN FLOOR · SPRING"/>
      </section>

      <section className="sec">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
          {[
            { l: 'GYM',           n: '11,600', sub: 'Square feet of training' },
            { l: 'SPRING FLOOR',  n: '1',      sub: 'Full-size competition spec' },
            { l: 'PARENT LOUNGE', n: '✓',      sub: 'Coffee + viewing window' },
            { l: 'PRO SHOP',      n: '✓',      sub: 'Bows, shoes, practice gear' },
            { l: 'DRESSING ROOMS',n: '✓',      sub: 'Changing space + storage' },
          ].map(s => (
            <div key={s.l} className="card" style={{ padding: 16 }}>
              <div className="grad-text display-strong" style={{ fontSize: 36, lineHeight: 1 }}>{s.n}</div>
              <div className="eyebrow mt-2">{s.l}</div>
              <div className="dim mt-1" style={{ fontSize: 11 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="display" style={{ fontSize: 28 }}>Come tour the gym.</div>
        <p className="dim mt-3" style={{ fontSize: 13 }}>Walk the floor, watch a practice, ask questions. 20 minutes, weekday afternoons.</p>
        <a
          href={(window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://thehitzero.net/#trial/mca'}
          className="btn btn-primary btn-block mt-4"
          style={{ textDecoration: 'none', textAlign: 'center' }}
        >Book a tour →</a>
      </section>
    </div>
  );
}

Object.assign(window, { TeamsPage, FacilityPage });
