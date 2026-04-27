/* global React, Photo, SectionHead, Reveal */
const { useState: useS_p } = React;

const COACHES = [
  { name: 'Kara Lindstrom', role: 'Head Coach · Owner', tone: 'pink', years: 14,
    bio: 'Two-time USASF Worlds athlete. Built MCA from a 4-team roster in 2018.',
    quote: 'My job is to make zero feel boring.' },
  { name: 'Dre Whitfield',  role: 'Tumbling Director', tone: 'teal', years: 9,
    bio: 'Trained 40+ athletes to standing fulls. Specialty: kids who think they "can\'t."',
    quote: 'Tumbling is just patience with momentum.' },
  { name: 'Sam Reyes',      role: 'L4/L5 Choreographer', tone: 'mix', years: 11,
    bio: 'Routines hit zero in 8 of 11 outings last season.',
    quote: 'Clean is louder than hard.' },
  { name: 'Mia Andersen',   role: 'Tinies Lead', tone: 'pink', years: 6,
    bio: 'The reason most of our all-star athletes started at 4.',
    quote: 'If a 4-year-old isn\'t laughing, I\'m doing it wrong.' },
];

function CoachesPage() {
  return (
    <div>
      <section className="sec">
        <div className="eyebrow eyebrow-teal mb-2">05 · COACHES</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          The bench that gets <em className="grad-text">zero</em>.
        </h1>
      </section>

      <section className="sec">
        <div className="col gap-4">
          {COACHES.map((c, i) => (
            <Reveal key={c.name} delay={i * 60}>
              <article className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <Photo ratio="3/4" tone={c.tone} label={c.name.toUpperCase()}>
                  <div style={{ position: 'absolute', inset: 0, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 3 }}>
                    <div className="display-strong" style={{ fontSize: 30, lineHeight: 0.95 }}>{c.name}</div>
                    <div className="eyebrow mt-2" style={{ color: '#fff' }}>{c.role}</div>
                  </div>
                </Photo>
                <div style={{ padding: 18 }}>
                  <p className="dim" style={{ fontSize: 13, lineHeight: 1.55 }}>{c.bio}</p>
                  <div className="hairline mt-4 mb-4"/>
                  <div className="display" style={{ fontSize: 19, lineHeight: 1.2 }}>
                    <span className="grad-text">"</span>{c.quote}<span className="grad-text">"</span>
                  </div>
                  <div className="row between mt-4">
                    <span className="eyebrow">{c.years} yrs coaching</span>
                    <span className="pill pill-teal">USASF</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─────────── PRICING ───────────
const PRICE_GROUPS = [
  {
    title: 'All-Star Competitive',
    eyebrow: 'Monthly tuition',
    accent: 'pink',
    rows: [
      { name: 'Senior',         price: '$200', unit: '/month' },
      { name: 'Youth / Junior', price: '$185', unit: '/month' },
      { name: 'Mini / Youth',   price: '$165', unit: '/month' },
    ],
  },
  {
    title: 'Non-Competitive',
    eyebrow: 'Per session (Fall + Spring)',
    accent: 'teal',
    rows: [
      { name: 'Youth',  price: '$125', unit: '/month per session' },
      { name: 'Senior', price: '$125', unit: '/month per session' },
    ],
  },
  {
    title: 'Cheer 101',
    eyebrow: '6-week sessions',
    accent: 'teal',
    rows: [
      { name: 'Ages 5–7',  price: '$165', unit: '/session' },
      { name: 'Ages 8–12', price: '$185', unit: '/session' },
      { name: 'Ages 13+',  price: '$200', unit: '/session' },
    ],
  },
  {
    title: 'Tumbling',
    eyebrow: '6-week sessions',
    accent: 'pink',
    rows: [
      { name: 'Tiny',         price: '$175', unit: '/session' },
      { name: 'Beginner',     price: '$225', unit: '/session' },
      { name: 'Intermediate', price: '$270', unit: '/session' },
    ],
  },
  {
    title: 'Specialty',
    eyebrow: 'Add-ons & clinics',
    accent: 'teal',
    rows: [
      { name: 'Mom Pom Class',   price: '$75', unit: '/month' },
      { name: 'Jump Clinic',     price: '$75', unit: '/athlete' },
      { name: 'Stunt Clinic',    price: '$75', unit: '/athlete' },
    ],
  },
  {
    title: '3-Day Clinic',
    eyebrow: 'By age group',
    accent: 'pink',
    rows: [
      { name: 'Tiny · 45 min',     price: '$75' },
      { name: 'Youth · 1 hr',      price: '$100' },
      { name: 'Junior · 1.5 hr',   price: '$125' },
      { name: 'Senior · 2 hr',     price: '$175' },
    ],
  },
];

function PricingPage({ go }) {
  return (
    <div>
      <section className="sec">
        <div className="eyebrow eyebrow-pink mb-2">06 · PRICING</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          Clear <em className="grad-text">pricing</em>.<br/>No surprises.
        </h1>
        <p className="dim mt-4" style={{ fontSize: 14, lineHeight: 1.55 }}>
          Gym fees go directly to the gym. All-Star competition fees are regulated separately through the booster club. Hours scale with age and level.
        </p>
      </section>

      <section className="sec">
        <div className="col gap-6">
          {PRICE_GROUPS.map(g => (
            <article key={g.title} className="card" style={{ padding: 22 }}>
              <div className={`eyebrow eyebrow-${g.accent} mb-2`}>{g.eyebrow}</div>
              <div className="display" style={{ fontSize: 26, marginBottom: 16 }}>{g.title}</div>
              <div className="col" style={{ gap: 0 }}>
                {g.rows.map((r, i) => (
                  <div key={r.name} className="row between center" style={{ padding: '14px 0', borderTop: i === 0 ? '1px solid var(--line)' : 'none', borderBottom: '1px solid var(--line)', gap: 12 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, whiteSpace: 'nowrap' }}>
                      <span className="display-strong grad-text" style={{ fontSize: 22, lineHeight: 1 }}>{r.price}</span>
                      {r.unit && <span className="dim" style={{ fontSize: 11 }}>{r.unit}</span>}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)' }}>
        <div className="eyebrow eyebrow-pink mb-3">HEADS UP</div>
        <div className="display" style={{ fontSize: 26 }}>What's <em className="grad-text">not</em> in the price.</div>
        <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.6 }}>
          For All-Star teams, gym tuition is separate from competition costs. Competition fees are regulated through the booster club. Practice hours scale with age and level — choreo and music are billed separately.
        </p>
        <div className="col gap-2 mt-4">
          {[
            'Music', 'Choreography', 'Coaches’ fees during competition (hotel, travel, day rate)',
            'Competition fees', 'Travel (hotel + gas)', 'Uniform', 'Make-up + bows',
            'Practice uniform', 'Uniform cover-up', 'Shoes',
          ].map(item => (
            <div key={item} className="row gap-3 center" style={{ padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
              <span className="grad-text" style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>◈</span>
              <span style={{ fontSize: 13 }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="display" style={{ fontSize: 28 }}>Questions on pricing?</div>
        <p className="dim mt-3" style={{ fontSize: 13 }}>We'll walk you through every dollar before you sign anything. Book a tour or shoot us an email.</p>
        <div className="col gap-3 mt-4">
          <button onClick={() => go('contact')} className="btn btn-primary btn-block">Book a tour →</button>
          <a href="mailto:coaches@magiccityathletics.net" className="btn btn-block">Email coaches@magiccityathletics.net</a>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { CoachesPage, PricingPage });
