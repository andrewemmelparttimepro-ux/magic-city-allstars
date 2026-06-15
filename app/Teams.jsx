/* global React, Photo, SectionHead, Reveal */
const { useState: useS_t } = React;

const COMPETITION_NOTES = [
  { label: 'Interest first', body: 'Families submit an interest form instead of choosing a named team.' },
  { label: 'Evaluation next', body: 'MCA evaluates each athlete before placing them in the right competition group.' },
  { label: 'Team names later', body: 'Final team names and rosters are assigned after placement.' },
];

function TeamsPage({ go }) {
  return (
    <div>
      <section className="sec">
        <div className="eyebrow eyebrow-pink mb-2">03 · ALL-STAR TEAMS</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          All-Star cheer. <em className="grad-text">Placement first.</em>
        </h1>
        <p className="dim mt-4" style={{ fontSize: 14, lineHeight: 1.55 }}>
          MCA builds all-star cheer groups after evaluations. Public sign-up is interest only; staff will place athletes and name teams when rosters are ready.
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
            href={(window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://thehitzero.net/#trial/mca'}
            className="btn"
            style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}
          >I'm interested →</a>
        </div>
      </section>

      {/* Placement process */}
      <section className="sec" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)' }}>
        <div className="eyebrow eyebrow-teal mb-3">HOW PLACEMENT WORKS</div>
        <div className="display" style={{ fontSize: 30 }}>No public team picker.</div>
        <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55 }}>
          Athletes are placed by MCA staff. This keeps families from choosing the wrong group before coaches have evaluated skills, age, readiness, and schedule fit.
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
          <a href={(window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://thehitzero.net/#trial/mca'} className="btn btn-primary btn-block" style={{ textDecoration: 'none', textAlign: 'center' }}>Send I'm interested form →</a>
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
