/* global React, Photo, SectionHead, Reveal, Wordmark */
const { useState: useState_h, useEffect: useEffect_h } = React;

// ─────────── HOME ───────────
function HomePage({ go }) {
  return (
    <div>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: 620, padding: '20px 22px 36px', overflow: 'hidden' }}>
        {/* Hero photo backdrop full-bleed */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Photo ratio="auto" tone="mix" label="HERO · MID-STUNT" style={{ height: '100%', borderRadius: 0 }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--hero-overlay)' }}/>
        </div>

        <div style={{ position: 'relative', zIndex: 2, paddingTop: 280, color: '#fff' }}>
          <div className="eyebrow eyebrow-teal mb-3" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 0 10px var(--teal)' }}/>
            MAGIC CITY ALLSTARS · MINOT, ND
          </div>
          <h1 className="display" style={{ fontSize: 56, margin: 0 }}>
            <span className="display-strong" style={{ fontStyle: 'normal' }}>THE</span><br/>
            place to <em className="grad-text" style={{ fontStyle: 'italic' }}>cheer</em><br/>
            in Minot.
          </h1>
          <p className="dim mt-4" style={{ fontSize: 14, lineHeight: 1.55, maxWidth: 320 }}>
            Elite all-star teams. Tumbling, prep, rec, and tinies — under one roof. <em className="serif-italic" style={{ color: '#fff' }}>Hit zero</em>{' '}mindset, drilled from the first day.
          </p>
          <div className="col gap-3 mt-6">
            <a href="#" className="btn btn-primary btn-block">Book a free trial class →</a>
            <button onClick={() => go('programs')} className="btn btn-block">Explore programs</button>
          </div>
        </div>
      </section>

      {/* Trust bar — Minot's only 100% cheer-focused gym */}
      <section className="sec-tight" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', textAlign: 'center', padding: '28px 22px' }}>
        <div className="eyebrow eyebrow-pink mb-3">ONLY IN MINOT</div>
        <div className="display" style={{ fontSize: 26, lineHeight: 1.1, maxWidth: 720, margin: '0 auto' }}>
          The <em className="grad-text">only 100% cheer-focused</em> gym in Minot.
        </div>
        <p className="dim mt-3" style={{ fontSize: 14, lineHeight: 1.55, maxWidth: 560, margin: '12px auto 0' }}>
          Not a side program. Not "we also do cheer." Every coach, every hour, every square foot of mat is built around one sport — done right.
        </p>
      </section>

      {/* Hit Zero meter — the signature interactive moment */}
      <HitZeroMeter/>

      {/* Programs preview */}
      <section className="sec">
        <Reveal>
          <SectionHead eyebrow="02 · WHAT WE DO" title={<><em>Five</em> ways to cheer.</>} kicker="From your kid's first cartwheel to a national-championship-bound senior team." accent="pink"/>
        </Reveal>
        <div className="col gap-3">
          {[
            { code: 'AS', name: 'All-Star', sub: 'Levels 1 → 6', tone: 'pink', body: 'Competitive teams competing across the upper Midwest.' },
            { code: 'TU', name: 'Tumbling', sub: 'Ages 5+', tone: 'teal', body: 'Drop-in classes from forward rolls to standing fulls.' },
            { code: 'PR', name: 'Prep', sub: 'New to all-star', tone: 'mix', body: 'A friendlier first season — short comp schedule, big learning curve.' },
            { code: 'RC', name: 'Rec', sub: 'No travel needed', tone: 'teal', body: 'For families who want the experience without the road trips.' },
            { code: 'TI', name: 'Tiny', sub: 'Ages 3–5', tone: 'pink', body: 'Glitter, music, and motor skills — the gateway drug to cheer.' },
          ].map((p, i) => (
            <Reveal key={p.code} delay={i * 60}>
              <button onClick={() => go('programs')} className="card" style={{ textAlign: 'left', cursor: 'pointer', border: 0, background: 'var(--ink-2)', width: '100%', display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 16, alignItems: 'center', padding: 16 }}>
                <Photo ratio="1/1" tone={p.tone} label={p.code} style={{ borderRadius: 14 }}/>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
                  <div className="eyebrow mt-1">{p.sub}</div>
                  <div className="dim" style={{ fontSize: 12, marginTop: 6, lineHeight: 1.45 }}>{p.body}</div>
                </div>
                <span className="grad-text" style={{ fontSize: 22, fontFamily: 'var(--mono)' }}>→</span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Editorial spread: "From scared first cartwheel to..." */}
      <EditorialSpread/>

      {/* Marquee of recent wins */}
      <section style={{ padding: '18px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--ink-2)' }}>
        <div className="eyebrow eyebrow-pink" style={{ padding: '0 22px 12px' }}>HIT ZERO · 2025–26 SEASON</div>
        <div className="marquee">
          <div className="marquee__track">
            {Array.from({length: 2}).map((_, k) => (
              <React.Fragment key={k}>
                <span className="marquee__item">Sparkle · L2 · zero deduction</span>
                <span className="marquee__item">Onyx · L4 · 2nd place Minneapolis</span>
                <span className="marquee__item">Aurora · L3 · zero deduction</span>
                <span className="marquee__item">Steel · L5 · 1st place Fargo</span>
                <span className="marquee__item">Frost · L1 · zero deduction</span>
                <span className="marquee__item">Glacier · Sr · bid to Summit</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Hit Zero app teaser */}
      <AppTeaser/>

      {/* Testimonial */}
      <section className="sec">
        <Reveal>
          <div className="card" style={{ padding: 24, background: 'linear-gradient(160deg, rgba(39,207,215,0.10), rgba(249,127,172,0.10))' }}>
            <div className="grad-text serif-italic" style={{ fontSize: 56, lineHeight: 0.6, marginBottom: 8 }}>"</div>
            <div className="display" style={{ fontSize: 26, lineHeight: 1.05 }}>
              My daughter was the kid who wouldn't try a cartwheel. Two seasons in, she just hit zero at her first national.
            </div>
            <div className="row center gap-3 mt-6">
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal), var(--pink))' }}/>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Jenna R.</div>
                <div className="eyebrow mt-1">Aurora L3 mom · 2 yrs</div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer CTA */}
      <FooterCTA go={go}/>
    </div>
  );
}

// ─────────── Hit Zero meter (interactive signature moment) ───────────
function HitZeroMeter() {
  const [val, setVal] = useState_h(0);
  const ref = React.useRef(null);
  useEffect_h(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let v = 0;
        const id = setInterval(() => {
          v += 0.025;
          setVal(Math.min(0.92, v));
          if (v >= 0.92) clearInterval(id);
        }, 24);
      }
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="sec" style={{ background: 'linear-gradient(180deg, var(--ink) 0%, var(--ink-2) 100%)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="eyebrow eyebrow-pink mb-3">01 · HIT ZERO MINDSET</div>
      <div className="display" style={{ fontSize: 32, marginBottom: 24 }}>
        Zero deductions.<br/>
        <em className="grad-text">Every routine.</em>
      </div>
      <div className="row center" style={{ justifyContent: 'center', marginBottom: 24 }}>
        <div className="meter-ring" style={{ '--val': val }}>
          <div className="meter-value">
            <span className="grad-text">{Math.round(val * 100)}</span>
            <span className="dim" style={{ fontSize: 18, marginLeft: 4 }}>%</span>
          </div>
        </div>
      </div>
      <div className="row gap-3" style={{ justifyContent: 'space-between' }}>
        <div className="col">
          <div className="display-strong" style={{ fontSize: 22 }}>87%</div>
          <div className="eyebrow mt-1">2025–26</div>
        </div>
        <div className="col">
          <div className="display-strong dim" style={{ fontSize: 22 }}>74%</div>
          <div className="eyebrow mt-1">2024–25</div>
        </div>
        <div className="col">
          <div className="display-strong dim" style={{ fontSize: 22 }}>61%</div>
          <div className="eyebrow mt-1">2023–24</div>
        </div>
      </div>
      <p className="dim mt-6" style={{ fontSize: 13, lineHeight: 1.55 }}>
        We coach to the score sheet. Every practice opens with synchronized 8-counts and ends with a clean run-through. <em className="serif-italic" style={{ color: 'var(--text)' }}>If it's worth doing, it's worth doing zero.</em>
      </p>
    </section>
  );
}

// ─────────── Editorial spread ───────────
function EditorialSpread() {
  return (
    <section className="sec" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)' }}>
      <div className="eyebrow eyebrow-teal mb-4">03 · A SEASON HERE</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Photo ratio="3/4" tone="pink" label="AUG · TRYOUTS"/>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div className="display" style={{ fontSize: 28, lineHeight: 0.95 }}>From <em className="grad-text">scared</em> first cartwheel</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div className="display-strong" style={{ fontSize: 28, lineHeight: 0.95 }}>to <em className="serif-italic pink" style={{ fontWeight: 800 }}>nationals</em>.</div>
        </div>
        <Photo ratio="3/4" tone="teal" label="APR · SUMMIT"/>
      </div>
      <div className="hairline mt-6 mb-4"/>
      <div className="row gap-4">
        <div className="col" style={{ flex: 1 }}>
          <div className="eyebrow eyebrow-pink mb-2">AUG–OCT</div>
          <div style={{ fontSize: 12, lineHeight: 1.5 }} className="dim">Choreo, conditioning, skills audit. We build the routine around the athletes — not the other way around.</div>
        </div>
        <div className="col" style={{ flex: 1 }}>
          <div className="eyebrow eyebrow-teal mb-2">NOV–APR</div>
          <div style={{ fontSize: 12, lineHeight: 1.5 }} className="dim">Comp season. Most of our travel sits within 4 hours — Fargo, Bismarck, Minneapolis. No teams require flights.</div>
        </div>
      </div>
    </section>
  );
}

// ─────────── App teaser ───────────
function AppTeaser() {
  return (
    <section className="sec" style={{ background: 'linear-gradient(160deg, rgba(39,207,215,0.06), rgba(249,127,172,0.06))' }}>
      <div className="eyebrow eyebrow-pink mb-3">04 · ON THE APP</div>
      <div className="display" style={{ fontSize: 30, marginBottom: 14 }}>
        Schedules, billing, badges — all in <em className="grad-text">Hit Zero</em>.
      </div>
      <p className="dim" style={{ fontSize: 13, lineHeight: 1.55 }}>
        We run the gym on Hit Zero. Tryouts, registration, real-time schedules, skill-tracking, payments. Download once — nothing else to sign up for.
      </p>

      {/* Mini phone-in-phone preview */}
      <div className="mt-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="card" style={{ padding: 14 }}>
          <div className="eyebrow eyebrow-teal mb-2">SKILL MATRIX</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
            {Array.from({length: 25}).map((_, i) => {
              const s = i % 4;
              const bg = s === 0 ? 'var(--surface-soft)' :
                         s === 1 ? 'rgba(255,180,84,0.25)' :
                         s === 2 ? 'rgba(39,207,215,0.3)' :
                         'linear-gradient(135deg, rgba(39,207,215,0.5), rgba(249,127,172,0.5))';
              return <div key={i} style={{ aspectRatio: '1/1', borderRadius: 4, background: bg }}/>;
            })}
          </div>
          <div className="dim mt-3" style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Sparkle · L2 · 25 skills tracked</div>
        </div>
        <div className="card" style={{ padding: 14 }}>
          <div className="eyebrow eyebrow-pink mb-2">THIS WEEK</div>
          <div style={{ fontSize: 11, fontFamily: 'var(--mono)', lineHeight: 2 }}>
            <div className="row between"><span>MON 5:30</span><span className="pill pill-teal" style={{ fontSize: 8, padding: '2px 6px' }}>L2</span></div>
            <div className="row between dim"><span>TUE 4:00</span><span>Tumble</span></div>
            <div className="row between"><span>WED 6:00</span><span className="pill pill-pink" style={{ fontSize: 8, padding: '2px 6px' }}>Choreo</span></div>
            <div className="row between dim"><span>FRI 7:00</span><span>Open gym</span></div>
          </div>
        </div>
      </div>

      <div className="row gap-2 mt-6">
        <a href="#" className="app-badge" style={{ flex: 1 }}>
          <svg width="20" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 12.04c-.04-3.96 3.23-5.86 3.38-5.95-1.85-2.7-4.71-3.07-5.73-3.11-2.44-.25-4.76 1.43-6 1.43-1.25 0-3.16-1.4-5.2-1.36-2.67.04-5.13 1.55-6.5 3.94-2.78 4.81-.71 11.94 2.01 15.85 1.33 1.91 2.91 4.06 4.99 3.98 2-.08 2.76-1.29 5.18-1.29 2.41 0 3.1 1.29 5.21 1.25 2.15-.04 3.51-1.94 4.83-3.86 1.52-2.21 2.15-4.36 2.18-4.47-.05-.02-4.18-1.6-4.22-6.36zM13.4 4.62c1.1-1.34 1.85-3.2 1.65-5.05-1.59.07-3.52 1.06-4.66 2.4-1.02 1.18-1.92 3.07-1.68 4.9 1.78.13 3.59-.91 4.69-2.25z"/></svg>
          <div>
            <div className="app-badge__top">Download on</div>
            <div className="app-badge__btm">App Store</div>
          </div>
        </a>
        <a href="#" className="app-badge" style={{ flex: 1 }}>
          <svg width="20" height="22" viewBox="0 0 24 24"><path d="M3.6 1.5c-.4.4-.6 1-.6 1.7v17.6c0 .7.2 1.3.6 1.7l11.4-11L3.6 1.5z" fill="#27CFD7"/><path d="M17.4 14L4.7 22.7c.4.2.9.3 1.4.3.5 0 1-.1 1.4-.4l13.6-7.7L17.4 14z" fill="#F97FAC"/><path d="M21 9.6L17.4 7.5l-3.4 3.5L17.4 14 21 12c.7-.4 1.1-1 1.1-1.7s-.4-1.3-1.1-1.7z" fill="#fff"/><path d="M14 11l-3.4-3.5L4.7 1.3c-.4.3-.9.4-1.4.4l11.4 11.3L14 11z" fill="#fff" opacity="0.8"/></svg>
          <div>
            <div className="app-badge__top">Get it on</div>
            <div className="app-badge__btm">Google Play</div>
          </div>
        </a>
      </div>
    </section>
  );
}

// ─────────── Footer CTA ───────────
function FooterCTA({ go }) {
  return (
    <section className="sec" style={{ background: 'var(--ink)', borderTop: '1px solid var(--line)' }}>
      <div className="display" style={{ fontSize: 36, lineHeight: 0.95 }}>
        Come <em className="grad-text">try a class</em>. <span className="dim" style={{ fontStyle: 'normal', fontWeight: 400 }}>It's free.</span>
      </div>
      <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55 }}>
        First class is on us. Walk in, stretch out, see if it clicks. Most kids know within 30 minutes.
      </p>
      <div className="col gap-3 mt-6">
        <button onClick={() => go('contact')} className="btn btn-primary btn-block">Book a free trial →</button>
        <button onClick={() => go('faq')} className="btn btn-block">Read the FAQ first</button>
      </div>
      <div className="hairline mt-8 mb-4"/>
      <div className="row between center">
        <Wordmark size={14}/>
        <div className="mono dim" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Minot · ND · est. 2018</div>
      </div>
    </section>
  );
}

Object.assign(window, { HomePage });
