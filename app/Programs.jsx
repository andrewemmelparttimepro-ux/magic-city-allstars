/* global React, Photo, SectionHead, Reveal, HZ */

// Tracks come live from Hit Zero (program_tracks → public_program_tracks view).
// Each athlete photo maps to a track slug for visual continuity.
const TRACK_PHOTO = {
  'all-star':          'assets/photos/athlete-1.jpeg',
  'performance-cheer': 'assets/photos/athlete-2.jpeg',
  'rec-cheer':         'assets/photos/athlete-3.jpeg',
  'tumbling':          'assets/photos/athlete-4.jpeg',
  'stunting':          'assets/photos/athlete-5.jpeg',
  'privates':          'assets/photos/athlete-6.jpeg',
};
const TRACK_PHOTO_FALLBACK = ['athlete-1','athlete-2','athlete-3','athlete-4','athlete-5','athlete-6'].map(n => `assets/photos/${n}.jpeg`);

function fmtClassPrice(cents) {
  if (cents == null) return '';
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}
function customPriceLabelOverridesAmount(c, label) {
  if (c?.price_unit !== 'custom' || !label) return false;
  if (Number(c.price_cents || 0) === 0) return true;
  return label.includes('$');
}
function classPriceParts(c) {
  const label = String(c.price_unit_label || '');
  if (customPriceLabelOverridesAmount(c, label)) {
    return { price: label, unit: '' };
  }
  return { price: fmtClassPrice(c.price_cents), unit: classUnitLabel(c) };
}
function classUnitLabel(c) {
  const label = String(c.price_unit_label || '');
  if (label && !customPriceLabelOverridesAmount(c, label) && label.toLowerCase() !== 'tbd') return label;
  switch (c.price_unit) {
    case 'per_month': return '/month';
    case 'per_session': return '/session';
    case 'per_session_per_month': return '/month per session';
    case 'per_athlete': return '/athlete';
    default: return '';
  }
}
function classAgeLabel(c) {
  if (c.age_range_min && c.age_range_max) return `Ages ${c.age_range_min}-${c.age_range_max}`;
  if (c.age_range_min) return `Ages ${c.age_range_min}+`;
  if (c.age_range_max) return `Ages up to ${c.age_range_max}`;
  return '';
}
function isAllStarInterestClass(cls, trackName) {
  return cls.track_slug === 'fall-2026-all-star' || /all star/i.test(trackName || cls.track_name || '');
}
function interestHref(cls) {
  const hzUrl = (window.HZ && window.HZ.HIT_ZERO_URL) || 'https://thehitzero.net';
  const params = new URLSearchParams({
    interest: cls.name || 'All-Star evaluation / team placement',
    class_id: cls.id || '',
    class_name: cls.name || '',
  });
  return `${hzUrl}/#trial/mca?${params.toString()}`;
}

function ProgramsPage({ go }) {
  const [tracks, setTracks] = React.useState([]);
  const [classes, setClasses] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [activeTrackId, setActiveTrackId] = React.useState('all');
  React.useEffect(() => {
    let cancelled = false;
    if (window.HZ) {
      Promise.all([window.HZ.getTracks(), window.HZ.getClasses()])
        .then(([t, c]) => { if (!cancelled) { setTracks(t || []); setClasses(c || []); setLoaded(true); } })
        .catch(() => { if (!cancelled) setLoaded(true); });
    } else {
      setLoaded(true);
    }
    return () => { cancelled = true; };
  }, []);
  return (
    <div>
      <section className="sec" style={{ paddingTop: 28 }}>
        <div className="eyebrow eyebrow-pink mb-2">02 · PROGRAMS</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          Cheer, <em className="grad-text">your way</em>.
        </h1>
        <p className="dim mt-4" style={{ fontSize: 14, lineHeight: 1.55 }}>
          Current teams, classes, camps, and clinics come straight from MCA's live schedule. Find the one that fits — or change tracks anytime.
        </p>
      </section>

      <section className="sec-tight" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="row gap-2 no-scrollbar" style={{ overflowX: 'auto', paddingBottom: 4 }}>
          {[{ id: 'all', name: 'All' }, ...tracks].map((t) => {
            const active = activeTrackId === (t.id || 'all');
            return (
            <button key={t.id || t.name} onClick={() => setActiveTrackId(t.id || 'all')} className="pill" aria-pressed={active} style={{ background: active ? 'linear-gradient(135deg, var(--teal), var(--pink))' : undefined, color: active ? 'var(--text-on-grad)' : 'var(--text)', whiteSpace: 'nowrap', border: active ? 'none' : undefined, cursor: 'pointer' }}>
              {t.name}
            </button>
          );})}
        </div>
      </section>

      <section className="sec">
        <div className="col gap-4">
          {!loaded && (
            <div className="dim" style={{ textAlign: 'center', padding: 40, fontSize: 13 }}>Loading programs…</div>
          )}
          {loaded && tracks.length === 0 && (
            <div className="card" style={{ padding: 24, textAlign: 'center' }}>
              <div className="display" style={{ fontSize: 22 }}>Programs coming soon.</div>
              <p className="dim mt-3" style={{ fontSize: 13 }}>Our tracks are being set up. Reach out and we'll walk you through the options.</p>
              <a href={(window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://thehitzero.net/#trial/mca'} className="btn btn-primary btn-block mt-4" style={{ textDecoration: 'none', textAlign: 'center' }}>Get in touch →</a>
            </div>
          )}
          {(activeTrackId === 'all' ? tracks : tracks.filter(t => t.id === activeTrackId)).map((p, i) => {
            const photo = TRACK_PHOTO[p.slug] || TRACK_PHOTO_FALLBACK[i % TRACK_PHOTO_FALLBACK.length];
            const trackClasses = classes.filter(c => c.track_id === p.id);
            const onCta = () => {
              if (p.cta_kind === 'external' && p.cta_target) {
                window.open(p.cta_target, '_blank', 'noopener,noreferrer');
              } else {
                window.location.href = (window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://thehitzero.net/#trial/mca';
              }
            };
            return (
              <Reveal key={p.id} delay={i * 50}>
                <article className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <Photo ratio="16/9" tone={p.tone || 'mix'} src={photo} alt={`${p.name} at Magic City Athletics`} focal="50% 30%" label={`${p.code} · ${(p.name || '').toUpperCase()}`} style={{ borderRadius: 0 }}/>
                  <div style={{ padding: 20 }}>
                    <div className="row between center mb-2">
                      <div className="eyebrow">{p.eyebrow}</div>
                      <span className={`pill ${p.tone === 'pink' ? 'pill-pink' : 'pill-teal'}`}>{p.code}</span>
                    </div>
                    <div className="display" style={{ fontSize: 26, fontStyle: 'italic' }}>{p.name}</div>
                    {p.body && <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55 }}>{p.body}</p>}
                    {(p.bullets || []).length > 0 && (
                      <>
                        <div className="hairline mt-4 mb-4"/>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {p.bullets.map(b => (
                            <li key={b} style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontSize: 13 }}>
                              <span className="grad-text" style={{ fontFamily: 'var(--mono)' }}>◈</span>{b}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Bookable classes for this track — owner-managed in Hit Zero */}
                    {trackClasses.length > 0 && (
                      <>
                        <div className="hairline mt-6 mb-4"/>
                        <div className="eyebrow eyebrow-teal mb-3">Sign up for a class</div>
                        <div className="col gap-2">
                          {trackClasses.map(c => <ClassBookingRow key={c.id} cls={c} trackName={p.name}/>)}
                        </div>
                      </>
                    )}

                    {p.cta_kind !== 'none' && p.cta_label && (
                      <button onClick={onCta} className="btn btn-block mt-6">{p.cta_label} →</button>
                    )}
                    <div className="dim mt-3" style={{ fontSize: 11, textAlign: 'center' }}>
                      Real-time availability in the <em>Hit Zero</em> app
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="sec" id="birthday-party" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="card" style={{ padding: 24 }}>
          <div className="eyebrow eyebrow-pink mb-2">Birthday Party</div>
          <div className="display" style={{ fontSize: 28 }}>Celebrate with Magic.</div>
          <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55 }}>
            Birthday party details are being finalized by MCA. This section is live as the permanent spot for packages, availability, and booking once those details are ready.
          </p>
          <a href={(window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://thehitzero.net/#trial/mca'} className="btn btn-block mt-4" style={{ textDecoration: 'none', textAlign: 'center' }}>Ask about a birthday party →</a>
        </div>
      </section>

      <section className="sec" style={{ background: 'linear-gradient(160deg, rgba(39,207,215,0.06), rgba(249,127,172,0.06))', borderTop: '1px solid var(--line)' }}>
        <div className="display" style={{ fontSize: 28 }}>Not sure where you fit?</div>
        <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55 }}>
          Book a free placement evaluation. 30 minutes, no pressure, you leave with a recommendation.
        </p>
        <a href={(window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://thehitzero.net/#trial/mca'} className="btn btn-primary btn-block mt-4" style={{ textDecoration: 'none', textAlign: 'center' }}>Book a placement →</a>
      </section>
    </div>
  );
}

// ─── Per-class booking row — opens Hit Zero PWA for booking + payment ───
function ClassBookingRow({ cls }) {
  const closed = !cls.registration_open;
  const { price: priceStr, unit: unitStr } = classPriceParts(cls);
  const ageLabel = classAgeLabel(cls);
  const allStarInterest = isAllStarInterestClass(cls);
  const hzUrl = (window.HZ && window.HZ.HIT_ZERO_URL) || 'https://thehitzero.net';
  const bookHref = `${hzUrl}/#book/${cls.id}`;
  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="row between center" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{cls.name}</div>
          {ageLabel && <div className="eyebrow eyebrow-teal" style={{ fontSize: 9, marginTop: 4 }}>{ageLabel}</div>}
          {cls.schedule_summary && <div className="dim" style={{ fontSize: 11, marginTop: 2 }}>{cls.schedule_summary}</div>}
          {cls.description && <div className="dim" style={{ fontSize: 11, marginTop: 4 }}>{cls.description}</div>}
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, whiteSpace: 'nowrap' }}>
          <span className="display-strong grad-text" style={{ fontSize: 18, lineHeight: 1 }}>{priceStr}</span>
          {unitStr && <span className="dim" style={{ fontSize: 10 }}>{unitStr}</span>}
        </div>
      </div>
      {allStarInterest ? (
        <a
          href={interestHref(cls)}
          className="btn btn-primary btn-block mt-3"
          style={{ fontSize: 13, padding: '10px 14px', textDecoration: 'none', textAlign: 'center' }}
        >
          I'm interested →
        </a>
      ) : closed ? (
        <button disabled className="btn btn-block mt-3" style={{ fontSize: 13, padding: '10px 14px' }}>
          Sign-ups closed
        </button>
      ) : (
        <a
          href={bookHref}
          className="btn btn-primary btn-block mt-3"
          style={{ fontSize: 13, padding: '10px 14px', textDecoration: 'none', textAlign: 'center' }}
        >
          Book this class →
        </a>
      )}
    </div>
  );
}

Object.assign(window, { ProgramsPage, ClassBookingRow });
