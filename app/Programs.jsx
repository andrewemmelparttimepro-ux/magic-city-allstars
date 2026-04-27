/* global React, Photo, SectionHead, Reveal */

const PROGRAMS = [
  { code: 'AS', name: 'All-Star', sub: 'Tiny · Mini · Youth · Junior · Senior', tone: 'pink',
    body: 'Year-round competitive teams across every age group. Prep and Elite levels based on skill — we place every athlete where they\'ll grow fastest.',
    bullets: ['Tiny / Mini / Youth / Junior / Senior', 'Prep + Elite divisions', 'Full comp season + ASWC in April'],
    cta: 'Tryout info' },
  { code: 'PC', name: 'Performance Cheer', sub: '6-month program · Tiny → Senior', tone: 'mix',
    body: 'A taste of the All-Star experience without the lengthy comp schedule. One competition performance at our closest comp — all the glitz and glam, none of the travel marathon.',
    bullets: ['6-month season', 'One competition performance', 'Tiny / Mini / Youth / Junior / Senior'],
    cta: 'Sign up for Performance Cheer' },
  { code: 'RC', name: 'Rec Cheer', sub: 'With pom-poms · non-competitive', tone: 'teal',
    body: 'Cheer with pom-poms. No travel, no comps — just the fun, the friends, and the skills.',
    bullets: ['Non-competitive', 'No travel required', 'Rolling enrollment'],
    cta: 'Drop in this week' },
  { code: 'TU', name: 'Tumbling', sub: 'Ages 5+ · beginner to advanced', tone: 'teal',
    body: 'From forward rolls to standing fulls. Beginner, intermediate, and advanced classes — work with the same coaches our All-Star teams have.',
    bullets: ['Tiny, Beginner, Intermediate', '6-week sessions', 'Ages 5+'],
    cta: 'See class times' },
  { code: 'ST', name: 'Stunting', sub: 'Ages 5+ · group fundamentals', tone: 'pink',
    body: 'Group stunting taught by certified coaches. Build the bases, flyers, and back-spots that make every routine click.',
    bullets: ['Stunt clinic + standing classes', 'Ages 5+', 'All experience levels'],
    cta: 'Book a stunt clinic' },
  { code: 'PV', name: 'Privates', sub: 'One-on-one · all ages', tone: 'mix',
    body: 'Working a specific skill? Book a private with a coach who specializes in it. Tumbling, jumps, stunts, flexibility, routine work.',
    bullets: ['One-on-one', 'Pick your coach', 'Any skill, any age'],
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
          {['All', 'All-Star', 'Performance', 'Rec', 'Tumbling', 'Stunting', 'Privates'].map((t, i) => (
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
