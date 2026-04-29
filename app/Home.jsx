/* global React, Photo, SectionHead, Reveal, Wordmark */
const { useState: useState_h, useEffect: useEffect_h } = React;

// ─────────── HOME ───────────
function HomePage({ go }) {
  return (
    <div>
      {/* HERO */}
      <section className="home-hero" style={{ position: 'relative', minHeight: 620, padding: '20px 22px 36px', overflow: 'hidden' }}>
        {/* Hero photo backdrop full-bleed */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Photo ratio="auto" tone="mix" src="assets/photos/team-group-1.jpeg" alt="Magic City Athletics — owners and coaches" focal="50% 30%" label="HERO" style={{ height: '100%', borderRadius: 0 }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--hero-overlay)' }}/>
        </div>

        <div style={{ position: 'relative', zIndex: 2, paddingTop: 280, color: '#fff' }}>
          <div className="eyebrow eyebrow-teal mb-3" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 0 10px var(--teal)' }}/>
            MAGIC CITY ATHLETICS · MINOT, ND
          </div>
          <h1 className="display" style={{ fontSize: 56, margin: 0 }}>
            <span className="display-strong" style={{ fontStyle: 'normal' }}>THE</span><br/>
            place to <em className="grad-text" style={{ fontStyle: 'italic' }}>cheer</em><br/>
            in Minot.
          </h1>
          <p className="dim mt-4" style={{ fontSize: 16, lineHeight: 1.5, maxWidth: 420, color: '#fff' }}>
            Bring out the <em className="serif-italic grad-text" style={{ fontWeight: 800 }}>MAGIC</em> in <em className="serif-italic" style={{ color: '#fff' }}>YOU</em>.
          </p>
          <div className="col gap-3 mt-6">
            <a href={(window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://hit-zero.vercel.app/#trial/mca'} className="btn btn-primary btn-block" style={{ textDecoration: 'none', textAlign: 'center' }}>Book a free trial class →</a>
            <button onClick={() => go('programs')} className="btn btn-block">Explore programs</button>
          </div>
        </div>
      </section>

      {/* Cheer is Life — the why-us moment */}
      <section className="sec" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', textAlign: 'center', padding: '64px 22px', background: 'linear-gradient(180deg, var(--ink) 0%, var(--ink-2) 100%)' }}>
        <div className="eyebrow eyebrow-pink mb-4" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--pink)', boxShadow: '0 0 10px var(--pink)' }}/>
          01 · CHEER IS LIFE
        </div>
        <div className="display" style={{ fontSize: 'clamp(36px, 9vw, 64px)', lineHeight: 1.0, maxWidth: 880, margin: '0 auto', letterSpacing: '-0.02em' }}>
          The <em className="grad-text">only 100% cheer-focused</em> gym in Minot.
        </div>
        <p className="mt-6" style={{ fontSize: 17, lineHeight: 1.55, maxWidth: 620, margin: '24px auto 0' }}>
          Not a side program. Not <em className="serif-italic dim" style={{ fontStyle: 'italic' }}>"we also do cheer."</em> Every coach, every hour, every square foot of mat is built around one sport — done right.
        </p>
        <div className="mt-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, maxWidth: 440, margin: '40px auto 0' }}>
          {[
            { n: '100%', l: 'Cheer-focused' },
            { n: '11,600', l: 'Sqft built for it' },
          ].map(s => (
            <div key={s.l} className="card" style={{ padding: 16, textAlign: 'center' }}>
              <div className="display-strong grad-text" style={{ fontSize: 'clamp(26px, 6vw, 34px)', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.n}</div>
              <div className="eyebrow mt-2" style={{ fontSize: 10 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs preview */}
      <section className="sec">
        <Reveal>
          <SectionHead eyebrow="02 · WHAT WE DO" title={<><em>Six</em> ways to cheer.</>} kicker="From your kid's first cartwheel to a national-championship-bound senior team." accent="pink"/>
        </Reveal>
        <div className="col gap-3">
          {[
            { code: 'AS', name: 'All-Star', sub: 'Tiny → Senior · Prep + Elite', tone: 'pink', src: 'assets/photos/athlete-1.jpeg', body: 'Competitive teams across every age group. Prep and Elite levels by skill.' },
            { code: 'PC', name: 'Performance Cheer', sub: '6-month program', tone: 'mix', src: 'assets/photos/athlete-2.jpeg', body: 'A taste of the All-Star experience without the long comp schedule. One competition, all the glitz.' },
            { code: 'RC', name: 'Rec Cheer', sub: 'With pom-poms', tone: 'teal', src: 'assets/photos/athlete-3.jpeg', body: 'Non-competitive cheer — fun, friends, and pom-poms.' },
            { code: 'TU', name: 'Tumbling', sub: 'Ages 5+', tone: 'teal', src: 'assets/photos/athlete-4.jpeg', body: 'From forward rolls to standing fulls. Beginner to advanced classes.' },
            { code: 'ST', name: 'Stunting', sub: 'Ages 5+', tone: 'pink', src: 'assets/photos/athlete-5.jpeg', body: 'Group stunting fundamentals taught by certified coaches.' },
            { code: 'PV', name: 'Privates', sub: 'One-on-one', tone: 'mix', src: 'assets/photos/athlete-6.jpeg', body: 'Private lessons for tumbling, stunting, or routine work.' },
          ].map((p, i) => (
            <Reveal key={p.code} delay={i * 60}>
              <button onClick={() => go('programs')} className="card" style={{ textAlign: 'left', cursor: 'pointer', border: 0, background: 'var(--ink-2)', width: '100%', display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 16, alignItems: 'center', padding: 16 }}>
                <Photo ratio="1/1" tone={p.tone} src={p.src} alt={`${p.name} at Magic City Athletics`} label={p.code} style={{ borderRadius: 14 }}/>
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

      {/* Marquee — values + tagline */}
      <section style={{ padding: '18px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--ink-2)' }}>
        <div className="eyebrow eyebrow-pink" style={{ padding: '0 22px 12px' }}>BRING OUT THE MAGIC IN YOU</div>
        <div className="marquee">
          <div className="marquee__track">
            {Array.from({length: 2}).map((_, k) => (
              <React.Fragment key={k}>
                <span className="marquee__item">Confidence</span>
                <span className="marquee__item">Teamwork</span>
                <span className="marquee__item">Discipline</span>
                <span className="marquee__item">Resilience</span>
                <span className="marquee__item">Family</span>
                <span className="marquee__item">Glitz + glam</span>
                <span className="marquee__item">On + off the mat</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Hit Zero app teaser */}
      <AppTeaser/>

      {/* Brand statement */}
      <section className="sec">
        <Reveal>
          <div className="card" style={{ padding: 28, background: 'linear-gradient(160deg, rgba(39,207,215,0.10), rgba(249,127,172,0.10))' }}>
            <div className="eyebrow eyebrow-teal mb-3">MORE THAN A GYM</div>
            <div className="display" style={{ fontSize: 26, lineHeight: 1.15 }}>
              We create a safe, uplifting space where athletes <em className="grad-text">shine</em>, build confidence, and grow through teamwork, discipline, and resilience — on and off the mat.
            </div>
            <div className="row center gap-3 mt-6">
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal), var(--pink))' }}/>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Magic City Athletics</div>
                <div className="eyebrow mt-1">A cheer family · Minot, ND</div>
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

// ─────────── Editorial spread ───────────
function EditorialSpread() {
  return (
    <section className="sec editorial-spread" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)' }}>
      <div className="eyebrow eyebrow-teal mb-4">03 · A SEASON HERE</div>
      <div className="editorial-spread__grid">
        <Photo ratio="3/4" tone="pink" label="AUG · MAKING THE TEAM" style={{ gridArea: 'pic1' }}>
          <div style={{ position: 'absolute', inset: 0, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 3, color: '#fff' }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.9 }}>Day 1</div>
            <div>
              <div className="display-strong" style={{ fontSize: 'clamp(56px, 14vw, 96px)', lineHeight: 0.85, letterSpacing: '-0.04em' }}>AUG</div>
              <div className="serif-italic" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.1, marginTop: 8, opacity: 0.95 }}>Making the team</div>
            </div>
          </div>
        </Photo>
        <div style={{ gridArea: 'headline', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="display" style={{ fontSize: 'clamp(30px, 8vw, 44px)', lineHeight: 1.0 }}>
            From <em className="grad-text">making the team</em> to <em className="serif-italic pink" style={{ fontWeight: 800 }}>ASWC</em>.
          </div>
        </div>
        <Photo ratio="3/4" tone="teal" label="APR · ASWC" style={{ gridArea: 'pic2' }}>
          <div style={{ position: 'absolute', inset: 0, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 3, color: '#fff' }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.9 }}>The big one</div>
            <div>
              <div className="display-strong" style={{ fontSize: 'clamp(56px, 14vw, 96px)', lineHeight: 0.85, letterSpacing: '-0.04em' }}>APR</div>
              <div className="serif-italic" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.1, marginTop: 8, opacity: 0.95 }}>ASWC · Worlds bid</div>
            </div>
          </div>
        </Photo>
      </div>
      <div className="hairline mt-6 mb-4"/>
      <div className="row gap-4">
        <div className="col" style={{ flex: 1 }}>
          <div className="eyebrow eyebrow-pink mb-2">AUGUST</div>
          <div style={{ fontSize: 13, lineHeight: 1.5 }} className="dim">Tryouts and team formation. Choreo, conditioning, and skills audit kick off the season.</div>
        </div>
        <div className="col" style={{ flex: 1 }}>
          <div className="eyebrow eyebrow-teal mb-2">APRIL · ASWC</div>
          <div style={{ fontSize: 13, lineHeight: 1.5 }} className="dim">Capping the season. Most of our travel stays within 7 hours of Minot — no flights required.</div>
        </div>
      </div>
      <div className="row between mt-6" style={{ alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span className="eyebrow">7-HOUR RADIUS · OUR COMP TERRITORY</span>
        <span className="eyebrow eyebrow-pink">MINOT · ND</span>
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
        We run the gym on Hit Zero. Tryouts, registration, real-time schedules, skill-tracking, payments. <em className="serif-italic" style={{ color: 'var(--text)' }}>No app store, no install</em> — open it in your browser and save it to your home screen in two taps.
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

      {/* Save to home screen — PWA, no app store */}
      <div className="card mt-6" style={{ padding: 18, background: 'var(--ink-2)' }}>
        <div className="row between center" style={{ flexWrap: 'wrap', gap: 8 }}>
          <div className="eyebrow eyebrow-teal">Save it to your phone</div>
          <span className="pill pill-grad">No download · No app store</span>
        </div>
        <div className="display mt-3" style={{ fontSize: 20, lineHeight: 1.2 }}>
          Open in your browser. <em className="grad-text">Pin it to your home screen.</em>
        </div>
        <div className="mt-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="card" style={{ padding: 14, background: 'var(--ink)' }}>
            <div className="eyebrow eyebrow-pink mb-2">iPhone · Safari</div>
            <div style={{ fontSize: 12, lineHeight: 1.5 }} className="dim">
              Tap <span style={{ color: 'var(--text)', fontWeight: 600 }}>Share</span> → <span style={{ color: 'var(--text)', fontWeight: 600 }}>Add to Home Screen</span>.
            </div>
          </div>
          <div className="card" style={{ padding: 14, background: 'var(--ink)' }}>
            <div className="eyebrow eyebrow-teal mb-2">Android · Chrome</div>
            <div style={{ fontSize: 12, lineHeight: 1.5 }} className="dim">
              Tap the <span style={{ color: 'var(--text)', fontWeight: 600 }}>⋮ menu</span> → <span style={{ color: 'var(--text)', fontWeight: 600 }}>Install app</span>.
            </div>
          </div>
        </div>
        <p className="dim mt-4" style={{ fontSize: 11, lineHeight: 1.55 }}>
          Opens like a real app. Works offline. Updates automatically — no version checks, no store reviews.
        </p>
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
        <a href={(window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://hit-zero.vercel.app/#trial/mca'} className="btn btn-primary btn-block" style={{ textDecoration: 'none', textAlign: 'center' }}>Book a free trial →</a>
        <button onClick={() => go('faq')} className="btn btn-block">Read the FAQ first</button>
      </div>
      <div className="hairline mt-8 mb-4"/>
      <div className="row between center">
        <Wordmark size={14}/>
        <div className="mono dim" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Minot · ND</div>
      </div>
    </section>
  );
}

Object.assign(window, { HomePage });
