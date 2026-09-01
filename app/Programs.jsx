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
const MCA_ALL_STAR_RESOURCES = [
  {
    title: 'Handbook packet',
    detail: 'Current all-star welcome packet',
    href: '/mca-all-star-welcome-packet.pdf',
    ctaLabel: 'Download PDF',
  },
  {
    title: 'Team contract',
    detail: 'Will be added here when MCA uploads it',
    href: null,
    ctaLabel: 'Coming soon',
  },
  {
    title: 'Competition schedule',
    detail: 'Will be added here when the comp calendar is ready',
    href: null,
    ctaLabel: 'Coming soon',
  },
  {
    title: '2026-2027 evaluation form',
    detail: 'Current cheer combine evaluation sheet for all-star placements',
    href: '/mca-cheer-combine-evaluations-form.pdf',
    ctaLabel: 'Download PDF',
  },
];

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
          Browse MCA's public programs, compare tracks, and choose the right next step for your athlete.
        </p>
      </section>

      <section className="sec parent-router" aria-labelledby="parent-router-title">
        <div className="eyebrow eyebrow-teal mb-2">START HERE</div>
        <h2 id="parent-router-title" className="display parent-router__title">
          What do you need <em className="grad-text">right now?</em>
        </h2>
        <div className="parent-router__grid mt-6">
          <a
            href={(window.HZ && window.HZ.HIT_ZERO_SIGNIN_URL) || 'https://thehitzero.net/#signin?source=mcaminot'}
            target="_blank"
            rel="noopener noreferrer"
            className="card parent-path parent-path--primary"
          >
            <span className="eyebrow eyebrow-teal">Already on an MCA team</span>
            <strong>Find my athlete's information</strong>
            <span className="dim">See the assigned team, practice schedule, announcements, registration, and billing in Hit Zero.</span>
            <span className="parent-path__cta">Open Hit Zero →</span>
          </a>
          <button
            type="button"
            className="card parent-path"
            onClick={() => go && go('teams')}
          >
            <span className="eyebrow eyebrow-pink">Looking for All-Star Cheer</span>
            <strong>See the All-Star overview</strong>
            <span className="dim">Placement process, handbook, evaluation form, and the right next step for new or returning athletes.</span>
            <span className="parent-path__cta">All-Star Cheer →</span>
          </button>
          <a
            href={(window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://thehitzero.net/#trial/mca'}
            className="card parent-path"
          >
            <span className="eyebrow">New to MCA</span>
            <strong>Help me choose a program</strong>
            <span className="dim">Book a placement visit and MCA will match your athlete to the right program.</span>
            <span className="parent-path__cta">Book a placement →</span>
          </a>
        </div>
      </section>

      <section className="sec-tight" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="eyebrow mb-3">BROWSE PUBLIC PROGRAMS</div>
        <div className="row gap-2 no-scrollbar program-filter-row" style={{ overflowX: 'auto', paddingBottom: 4 }}>
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
          Book a placement evaluation. 30 minutes, no pressure, you leave with a recommendation.
        </p>
        <a href={(window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://thehitzero.net/#trial/mca'} className="btn btn-primary btn-block mt-4" style={{ textDecoration: 'none', textAlign: 'center' }}>Book a placement →</a>
      </section>
    </div>
  );
}

function MerchPage() {
  return (
    <div>
      <section className="sec" style={{ paddingTop: 28 }}>
        <div className="eyebrow eyebrow-pink mb-2">07 · MAGIC MERCH SHOP</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          Team merch, <em className="grad-text">ready to print</em>.
        </h1>
        <p className="dim mt-4" style={{ fontSize: 14, lineHeight: 1.55 }}>
          Download the current MCA merch order form, fill it out, then email it back or turn in a printed copy at the gym.
        </p>
      </section>

      <section className="sec">
        <article className="card" style={{ padding: 26 }}>
          <div className="row between center" style={{ gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div className="eyebrow eyebrow-teal mb-2">Current order form</div>
              <div className="display" style={{ fontSize: 30 }}>Magic Merch Shop</div>
              <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55, maxWidth: 560 }}>
                This fillable PDF is the live merch sheet for MCA families. Download it, complete the order, and send it back to the gym or bring it in.
              </p>
            </div>
            <a
              href="/mca-magic-merch-order-form.pdf"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              Download order form →
            </a>
          </div>
          <div className="hairline mt-6 mb-4"/>
          <div className="col gap-2" style={{ fontSize: 13, lineHeight: 1.5 }}>
            <div className="row gap-3 center"><span className="grad-text" style={{ fontFamily: 'var(--mono)' }}>◈</span><span>Fill it out digitally or print it first.</span></div>
            <div className="row gap-3 center"><span className="grad-text" style={{ fontFamily: 'var(--mono)' }}>◈</span><span>Email the completed form back to MCA or turn it in at the front desk.</span></div>
            <div className="row gap-3 center"><span className="grad-text" style={{ fontFamily: 'var(--mono)' }}>◈</span><span>Need help with sizing or pickup? Use the Contact page and MCA will follow up.</span></div>
          </div>
        </article>
      </section>
    </div>
  );
}

// ─── Per-class booking row — opens Hit Zero PWA for booking + payment ───
function ClassBookingRow({ cls, trackName }) {
  const closed = !cls.registration_open;
  const { price: priceStr, unit: unitStr } = classPriceParts(cls);
  const ageLabel = classAgeLabel(cls);
  const allStarInterest = isAllStarInterestClass(cls, trackName);
  // All-Star classes stay available as placement-interest leads while closed,
  // but an owner explicitly opening registration must make the class bookable.
  const interestOnly = allStarInterest && closed;
  const externalRegistrationUrl = /^https:\/\//i.test(String(cls.external_registration_url || ''))
    ? cls.external_registration_url
    : '';
  const hzUrl = (window.HZ && window.HZ.HIT_ZERO_URL) || 'https://thehitzero.net';
  const bookHref = `${hzUrl}/#book/${cls.id}`;
  const rowHref = externalRegistrationUrl || (interestOnly ? interestHref(cls) : bookHref);
  const ctaLabel = externalRegistrationUrl
    ? 'Register with Prairie Grit →'
    : interestOnly
      ? 'Send interest form →'
      : 'Book this class →';
  const affordanceHint = externalRegistrationUrl
    ? 'Opens Prairie Grit registration in a new tab'
    : interestOnly
      ? 'Tap anywhere to send the interest form'
      : 'Tap anywhere on this card to book';

  if (interestOnly || !closed) {
    return (
      <a
        href={rowHref}
        className="card card-action"
        style={{ padding: 14, display: 'block', textDecoration: 'none' }}
        aria-label={`${cls.name}. ${affordanceHint}.`}
        target={externalRegistrationUrl ? '_blank' : undefined}
        rel={externalRegistrationUrl ? 'noopener noreferrer' : undefined}
      >
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
        <div className="row between center mt-3" style={{ gap: 10, flexWrap: 'wrap' }}>
          <span className={`eyebrow card-action__hint ${interestOnly ? 'eyebrow-pink' : 'eyebrow-teal'}`} style={{ fontSize: 9 }}>{affordanceHint}</span>
          <span className={`btn card-action__cta ${interestOnly ? '' : 'btn-primary'}`} style={{ fontSize: 13, padding: '10px 14px', whiteSpace: 'nowrap' }}>
            {ctaLabel}
          </span>
        </div>
      </a>
    );
  }

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
      <button disabled className="btn btn-block mt-3" style={{ fontSize: 13, padding: '10px 14px' }}>
        Sign-ups closed
      </button>
    </div>
  );
}

Object.assign(window, { ProgramsPage, MerchPage, ClassBookingRow });
