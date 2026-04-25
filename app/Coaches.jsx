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
const TIERS = [
  { name: 'Tumbling', price: '95', sub: 'per month',
    incl: ['1 class/week', 'Skill tracking in app', 'Open gym Saturdays'], tone: 'teal' },
  { name: 'Prep', price: '155', sub: 'per month', star: true,
    incl: ['3 hrs/week practice', '2 local comps', 'Uniform + bow', 'Choreo included'], tone: 'mix' },
  { name: 'All-Star', price: '245', sub: 'per month',
    incl: ['8–10 hrs/week', 'Full comp season', 'Choreo + music', 'Travel coordination'], tone: 'pink' },
];

function PricingPage({ go }) {
  return (
    <div>
      <section className="sec">
        <div className="eyebrow eyebrow-pink mb-2">06 · PRICING</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          One <em className="grad-text">fee</em>. <br/>No surprises.
        </h1>
        <p className="dim mt-4" style={{ fontSize: 14, lineHeight: 1.55 }}>
          Tuition covers practice, choreo, music, and the gym. Comp fees and travel are billed transparently in the app — never tacked on.
        </p>
      </section>

      <section className="sec">
        <div className="col gap-4">
          {TIERS.map(t => (
            <article key={t.name} className={`card ${t.star ? 'card-glow' : ''}`} style={{ padding: 22, position: 'relative' }}>
              {t.star && <span className="pill pill-grad" style={{ position: 'absolute', top: -10, left: 22 }}>MOST POPULAR</span>}
              <div className="row between center">
                <div className="display" style={{ fontSize: 28 }}>{t.name}</div>
                <span className={`pill ${t.tone === 'pink' ? 'pill-pink' : 'pill-teal'}`}>{t.tone === 'pink' ? 'COMPETITIVE' : t.tone === 'teal' ? 'BEGINNER' : 'INTRO'}</span>
              </div>
              <div className="row" style={{ alignItems: 'baseline', gap: 6, marginTop: 12 }}>
                <span className="display-strong grad-text" style={{ fontSize: 56, lineHeight: 1 }}>${t.price}</span>
                <span className="dim" style={{ fontSize: 13 }}>{t.sub}</span>
              </div>
              <div className="hairline mt-4 mb-4"/>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {t.incl.map(b => (
                  <li key={b} style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontSize: 13 }}>
                    <span className="grad-text" style={{ fontFamily: 'var(--mono)' }}>◈</span>{b}
                  </li>
                ))}
              </ul>
              <button className={`btn ${t.star ? 'btn-primary' : ''} btn-block mt-6`}>Start free trial →</button>
            </article>
          ))}
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)' }}>
        <div className="display" style={{ fontSize: 24 }}>What's <em className="grad-text">not</em> in the price?</div>
        <div className="col gap-3 mt-4">
          {[
            ['Comp registration','~$75 per event · billed per comp'],
            ['Travel (hotel/gas)','Coordinated by the gym, paid by family'],
            ['Uniform','$280 first season · reusable in future seasons'],
            ['Make-up & bow','$45 · seasonal kit'],
          ].map(([l,r]) => (
            <div key={l} className="row between" style={{ padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{l}</span>
              <span className="dim" style={{ fontSize: 12 }}>{r}</span>
            </div>
          ))}
        </div>
        <div className="dim mt-6" style={{ fontSize: 12, lineHeight: 1.55, fontStyle: 'italic' }}>
          Multi-athlete discount: 10% off second sibling, 20% off third.
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { CoachesPage, PricingPage });
