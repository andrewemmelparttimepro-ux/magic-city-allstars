/* global React, Photo, SectionHead, Reveal */
const { useState: useS_t } = React;

const TEAMS = [
  { name: 'Sparkle', level: 'L1', age: '5–8',  size: 18, tone: 'pink', record: '4 zeros · 2 firsts' },
  { name: 'Frost',   level: 'L1', age: '8–11', size: 22, tone: 'teal', record: '3 zeros · 1 first' },
  { name: 'Aurora',  level: 'L3', age: '11–14',size: 24, tone: 'mix',  record: '2 zeros · Summit bid' },
  { name: 'Onyx',    level: 'L4', age: '12–16',size: 20, tone: 'pink', record: '5 zeros · 2 firsts' },
  { name: 'Steel',   level: 'L5', age: '14–18',size: 22, tone: 'teal', record: '6 zeros · Worlds bid' },
  { name: 'Glacier', level: 'Sr', age: '15–18',size: 18, tone: 'mix',  record: '4 zeros · 3 firsts' },
];

function TeamsPage({ go }) {
  const [active, setActive] = useS_t(0);
  const t = TEAMS[active];
  return (
    <div>
      <section className="sec">
        <div className="eyebrow eyebrow-pink mb-2">03 · COMPETITIVE TEAMS</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          Six teams. <em className="grad-text">One mindset.</em>
        </h1>
        <p className="dim mt-4" style={{ fontSize: 14, lineHeight: 1.55 }}>
          From first-year tinies to senior elite, every Magic City team trains to one number: zero.
        </p>
      </section>

      {/* Featured team carousel */}
      <section className="sec-tight">
        <div className="row gap-2 no-scrollbar" style={{ overflowX: 'auto', paddingBottom: 8 }}>
          {TEAMS.map((tm, i) => (
            <button key={tm.name} onClick={() => setActive(i)}
              className="pill" style={{
                background: i === active ? 'linear-gradient(135deg, var(--teal), var(--pink))' : 'rgba(255,255,255,0.08)',
                color: i === active ? '#14010A' : '#fff', whiteSpace: 'nowrap', cursor: 'pointer',
              }}>
              {tm.name} · {tm.level}
            </button>
          ))}
        </div>
      </section>

      <section className="sec">
        <Photo ratio="4/5" tone={t.tone} label={`${t.name.toUpperCase()} · ${t.level} · ${t.age}`}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 18, zIndex: 3 }}>
            <div className="row between">
              <span className="pill pill-grad">{t.level}</span>
              <span className="pill" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}>{t.size} ATHLETES</span>
            </div>
            <div>
              <div className="display-strong" style={{ fontSize: 56, lineHeight: 0.9 }}>{t.name}</div>
              <div className="eyebrow mt-2" style={{ color: '#fff' }}>{t.record}</div>
            </div>
          </div>
        </Photo>
        <div className="row gap-3 mt-4">
          <button className="btn" style={{ flex: 1 }}>Routine reel</button>
          <button className="btn" style={{ flex: 1 }}>Tryout info →</button>
        </div>
      </section>

      {/* Hit Zero hall of fame */}
      <section className="sec" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)' }}>
        <div className="eyebrow eyebrow-teal mb-3">HALL OF ZERO · 2025–26</div>
        <div className="display" style={{ fontSize: 30 }}>24 zero-deduction routines.</div>
        <p className="dim mt-3" style={{ fontSize: 13 }}>The most in the gym's history. Tap a team to see the routine breakdown.</p>

        <div className="col gap-2 mt-6">
          {TEAMS.map(tm => (
            <div key={tm.name} className="card" style={{ padding: 14, display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 14, alignItems: 'center' }}>
              <Photo ratio="1/1" tone={tm.tone} label={tm.level} style={{ borderRadius: 10 }}/>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{tm.name}</div>
                <div className="eyebrow mt-1">{tm.record}</div>
              </div>
              <div className="grad-text serif-italic" style={{ fontSize: 28, fontWeight: 900 }}>0</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="display" style={{ fontSize: 30 }}>
          Tryouts are <em className="grad-text">May 28–30</em>.
        </div>
        <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55 }}>
          Open to athletes ages 5–18. Required: 30-minute placement evaluation in the week prior. Returning athletes book directly in the app.
        </p>
        <div className="col gap-3 mt-6">
          <button onClick={() => go('contact')} className="btn btn-primary btn-block">Reserve a tryout slot →</button>
          <button className="btn btn-block">What to expect</button>
        </div>
      </section>
    </div>
  );
}

// ─────────── FACILITY ───────────
function FacilityPage() {
  return (
    <div>
      <section className="sec">
        <div className="eyebrow eyebrow-teal mb-2">04 · THE GYM</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          14,000 sqft, <em className="grad-text">all spring</em>.
        </h1>
        <p className="dim mt-4" style={{ fontSize: 14, lineHeight: 1.55 }}>
          Built in 2022 specifically for cheer. Two full spring floors, foam pit, tumble track, and a parent lounge with a window into every practice.
        </p>
      </section>

      <section className="sec-tight">
        <Photo ratio="16/9" tone="dark" label="MAIN FLOOR · 54×42"/>
      </section>

      <section className="sec">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { l: 'SPRING FLOORS', n: '2', sub: 'Full-size competition spec' },
            { l: 'FOAM PIT',      n: '1', sub: 'Trampoline + drop' },
            { l: 'TUMBLE TRACK',  n: '40\'', sub: 'Rod floor with end mat' },
            { l: 'PARENT LOUNGE', n: '✓', sub: 'Coffee + viewing window' },
          ].map(s => (
            <div key={s.l} className="card" style={{ padding: 16 }}>
              <div className="grad-text display-strong" style={{ fontSize: 36, lineHeight: 1 }}>{s.n}</div>
              <div className="eyebrow mt-2">{s.l}</div>
              <div className="dim mt-1" style={{ fontSize: 11 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)' }}>
        <SectionHead eyebrow="SAFETY" title={<>Coached <em className="grad-text">small</em>.</>} accent="pink"
          kicker="USASF-credentialed staff. 1:8 max ratio on stunting groups. Concussion + first-aid certified across the bench."/>
        <div className="col gap-3">
          {[
            'USASF credentials posted on every coach',
            '1:8 coach-to-athlete ratio on all stunt work',
            'Concussion baseline + first-aid current for all staff',
            'Visible camera coverage of every floor',
          ].map(it => (
            <div key={it} className="row gap-3 center" style={{ padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
              <span className="grad-text" style={{ fontFamily: 'var(--mono)', fontSize: 14 }}>◈</span>
              <span style={{ fontSize: 13 }}>{it}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="display" style={{ fontSize: 28 }}>Come tour the gym.</div>
        <p className="dim mt-3" style={{ fontSize: 13 }}>Walk the floor, watch a practice, ask questions. 20 minutes, weekday afternoons.</p>
        <button className="btn btn-primary btn-block mt-4">Book a tour →</button>
      </section>
    </div>
  );
}

Object.assign(window, { TeamsPage, FacilityPage });
