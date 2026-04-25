/* global React, Photo, SectionHead, Reveal */

const PROGRAMS = [
  { code: 'AS', name: 'All-Star Competitive', sub: 'Levels 1 → 6 · ages 5–18', tone: 'pink',
    body: 'Year-round competitive teams that travel the upper Midwest. Routine premieres in November, comp season runs through April.',
    bullets: ['8–10 hrs/week practice', 'Tryouts: late May', 'Travel: Fargo · Mpls · Bismarck'],
    cta: 'Tryout info' },
  { code: 'PR', name: 'Prep', sub: 'New to all-star · ages 5–14', tone: 'mix',
    body: 'A first-year-friendly track. Same routines, smaller competition schedule, half the time commitment.',
    bullets: ['3 hrs/week practice', '2 local comps per season', 'No travel required'],
    cta: 'Schedule a placement' },
  { code: 'RC', name: 'Rec Cheer', sub: 'No travel · ages 5–14', tone: 'teal',
    body: 'For families who want the gym, the friends, and the stunt skills — without the road trips and hotel weekends.',
    bullets: ['2 hrs/week', 'Showcase performance', 'Rolling enrollment'],
    cta: 'Drop in this week' },
  { code: 'TU', name: 'Tumbling Classes', sub: 'Ages 5+ · all skill levels', tone: 'teal',
    body: 'Drop-in classes that build from forward rolls to standing fulls. Work with the same coaches our all-star teams have.',
    bullets: ['45-minute classes', '6 levels of progression', 'Open gym Saturdays'],
    cta: 'See class times' },
  { code: 'TI', name: 'Tinies', sub: 'Ages 3–5', tone: 'pink',
    body: 'Music, glitter, motor skills, and the world\'s most patient coaches. The best 30 minutes of your week, we promise.',
    bullets: ['30-minute sessions', 'Parents stay & watch', 'No experience needed'],
    cta: 'Book a tiny class' },
  { code: 'PV', name: 'Privates', sub: 'One-on-one · all ages', tone: 'mix',
    body: 'Working a specific skill? Book a private with a coach who specializes in it. Tumbling, jumps, stunts, flexibility.',
    bullets: ['30 or 60 minutes', 'Pick your coach', 'Book in the Hit Zero app'],
    cta: 'Book a private' },
];

function ProgramsPage({ go }) {
  return (
    <div>
      <section className="sec" style={{ paddingTop: 28 }}>
        <div className="eyebrow eyebrow-pink mb-2">02 · PROGRAMS</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          Cheer, <em className="grad-text">your way</em>.
        </h1>
        <p className="dim mt-4" style={{ fontSize: 14, lineHeight: 1.55 }}>
          All-star is what we're known for, but it's only one of six tracks. Find the one that fits — or change tracks anytime.
        </p>
      </section>

      <section className="sec-tight" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="row gap-2 no-scrollbar" style={{ overflowX: 'auto', paddingBottom: 4 }}>
          {['All', 'All-Star', 'Tumbling', 'Tinies', 'Rec', 'Privates'].map((t, i) => (
            <button key={t} className="pill" style={{ background: i === 0 ? 'linear-gradient(135deg, var(--teal), var(--pink))' : undefined, color: i === 0 ? 'var(--text-on-grad)' : 'var(--text)', whiteSpace: 'nowrap', border: i === 0 ? 'none' : undefined, cursor: 'pointer' }}>
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="col gap-4">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.code} delay={i * 50}>
              <article className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <Photo ratio="16/9" tone={p.tone} label={`${p.code} · ${p.name.toUpperCase()}`} style={{ borderRadius: 0 }}/>
                <div style={{ padding: 20 }}>
                  <div className="row between center mb-2">
                    <div className="eyebrow">{p.sub}</div>
                    <span className={`pill ${p.tone === 'pink' ? 'pill-pink' : 'pill-teal'}`}>{p.code}</span>
                  </div>
                  <div className="display" style={{ fontSize: 26, fontStyle: 'italic' }}>{p.name}</div>
                  <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55 }}>{p.body}</p>
                  <div className="hairline mt-4 mb-4"/>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {p.bullets.map(b => (
                      <li key={b} style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontSize: 13 }}>
                        <span className="grad-text" style={{ fontFamily: 'var(--mono)' }}>◈</span>{b}
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-block mt-6">{p.cta} →</button>
                  <div className="dim mt-3" style={{ fontSize: 11, textAlign: 'center' }}>
                    Real-time availability in the <em>Hit Zero</em> app
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec" style={{ background: 'linear-gradient(160deg, rgba(39,207,215,0.06), rgba(249,127,172,0.06))', borderTop: '1px solid var(--line)' }}>
        <div className="display" style={{ fontSize: 28 }}>Not sure where you fit?</div>
        <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55 }}>
          Book a free placement evaluation. 30 minutes, no pressure, you leave with a recommendation.
        </p>
        <button onClick={() => go('contact')} className="btn btn-primary btn-block mt-4">Book a placement →</button>
      </section>
    </div>
  );
}

Object.assign(window, { ProgramsPage });
