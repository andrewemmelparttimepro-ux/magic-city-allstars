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
function classUnitLabel(c) {
  if (c.price_unit_label) return c.price_unit_label;
  switch (c.price_unit) {
    case 'per_month': return '/month';
    case 'per_session': return '/session';
    case 'per_session_per_month': return '/month per session';
    case 'per_athlete': return '/athlete';
    default: return '';
  }
}

function ProgramsPage({ go }) {
  const [tracks, setTracks] = React.useState([]);
  const [classes, setClasses] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
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
          All-star is what we're known for, but it's only one of six tracks. Find the one that fits — or change tracks anytime.
        </p>
      </section>

      <section className="sec-tight" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="row gap-2 no-scrollbar" style={{ overflowX: 'auto', paddingBottom: 4 }}>
          {[{ name: 'All' }, ...tracks].map((t, i) => (
            <button key={t.id || t.name} className="pill" style={{ background: i === 0 ? 'linear-gradient(135deg, var(--teal), var(--pink))' : undefined, color: i === 0 ? 'var(--text-on-grad)' : 'var(--text)', whiteSpace: 'nowrap', border: i === 0 ? 'none' : undefined, cursor: 'pointer' }}>
              {t.name}
            </button>
          ))}
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
              <button onClick={() => go('contact')} className="btn btn-primary btn-block mt-4">Get in touch →</button>
            </div>
          )}
          {tracks.map((p, i) => {
            const photo = TRACK_PHOTO[p.slug] || TRACK_PHOTO_FALLBACK[i % TRACK_PHOTO_FALLBACK.length];
            const trackClasses = classes.filter(c => c.track_id === p.id);
            const onCta = () => {
              if (p.cta_kind === 'external' && p.cta_target) {
                window.open(p.cta_target, '_blank', 'noopener,noreferrer');
              } else {
                go('contact');
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

// ─── Per-class booking row (collapsed → expanded inline form) ───
function ClassBookingRow({ cls, trackName }) {
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);
  const [form, setForm] = React.useState({ athleteName: '', athleteDob: '', parentName: '', parentEmail: '', parentPhone: '', notes: '', hp: '' });
  const [errors, setErrors] = React.useState({});
  const mountedAt = React.useRef(Date.now());

  const closed = !cls.registration_open;
  const onChange = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };

  const validate = () => {
    const next = {};
    if (!form.athleteName.trim()) next.athleteName = 'Required';
    if (!form.parentName.trim()) next.parentName = 'Required';
    if (!form.parentEmail.trim()) next.parentEmail = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.parentEmail.trim())) next.parentEmail = 'Looks invalid';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    if (form.hp) { setSubmitted(true); return; }
    if (Date.now() - mountedAt.current < 1500) {
      setSubmitError('Take a second to review and resubmit.');
      return;
    }
    if (!validate()) return;
    setSubmitting(true);
    try {
      await window.HZ.submitRegistration({
        class_id: cls.id,
        athlete_name: form.athleteName.trim(),
        athlete_dob: form.athleteDob || null,
        parent_name: form.parentName.trim(),
        parent_email: form.parentEmail.trim(),
        parent_phone: form.parentPhone.trim() || null,
        notes: form.notes.trim() || null,
        metadata: { booked_class: cls.name, track: trackName },
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err?.message || 'Couldn\'t book this class. Try again or email us.');
      console.error('class booking failed', err);
    } finally {
      setSubmitting(false);
    }
  };

  const priceStr = fmtClassPrice(cls.price_cents);
  const unitStr = classUnitLabel(cls);

  if (submitted) {
    return (
      <div className="card" role="status" aria-live="polite" style={{ padding: 14, background: 'linear-gradient(160deg, rgba(39,207,215,0.10), rgba(249,127,172,0.10))' }}>
        <div className="row gap-3 center">
          <div className="grad-text serif-italic" style={{ fontSize: 24, lineHeight: 1, fontWeight: 900 }}>✓</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>You're on the list for {cls.name}.</div>
            <div className="dim" style={{ fontSize: 11, lineHeight: 1.4, marginTop: 2 }}>MCA staff will email you within 48 hours to confirm.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="row between center" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{cls.name}</div>
          {cls.schedule_summary && <div className="dim" style={{ fontSize: 11, marginTop: 2 }}>{cls.schedule_summary}</div>}
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, whiteSpace: 'nowrap' }}>
          <span className="display-strong grad-text" style={{ fontSize: 18, lineHeight: 1 }}>{priceStr}</span>
          {unitStr && <span className="dim" style={{ fontSize: 10 }}>{unitStr}</span>}
        </div>
      </div>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          disabled={closed}
          className={closed ? 'btn btn-block mt-3' : 'btn btn-primary btn-block mt-3'}
          style={{ fontSize: 13, padding: '10px 14px' }}
        >
          {closed ? 'Sign-ups closed' : 'Book this class →'}
        </button>
      )}
      {open && (
        <form onSubmit={onSubmit} className="col gap-3 mt-4" noValidate>
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
            <label>Leave empty <input tabIndex="-1" autoComplete="off" type="text" value={form.hp} onChange={onChange('hp')}/></label>
          </div>
          <BookingField label="ATHLETE NAME" htmlFor={`b-${cls.id}-an`} error={errors.athleteName}>
            <input id={`b-${cls.id}-an`} type="text" placeholder="Your athlete's name" value={form.athleteName} onChange={onChange('athleteName')} className="form-input" required aria-invalid={!!errors.athleteName}/>
          </BookingField>
          <BookingField label="ATHLETE DATE OF BIRTH (OPTIONAL)" htmlFor={`b-${cls.id}-dob`}>
            <input id={`b-${cls.id}-dob`} type="date" value={form.athleteDob} onChange={onChange('athleteDob')} className="form-input"/>
          </BookingField>
          <BookingField label="PARENT/GUARDIAN NAME" htmlFor={`b-${cls.id}-pn`} error={errors.parentName}>
            <input id={`b-${cls.id}-pn`} type="text" placeholder="First & last" value={form.parentName} onChange={onChange('parentName')} className="form-input" autoComplete="name" required aria-invalid={!!errors.parentName}/>
          </BookingField>
          <BookingField label="PARENT EMAIL" htmlFor={`b-${cls.id}-em`} error={errors.parentEmail}>
            <input id={`b-${cls.id}-em`} type="email" placeholder="you@example.com" value={form.parentEmail} onChange={onChange('parentEmail')} className="form-input" autoComplete="email" required aria-invalid={!!errors.parentEmail}/>
          </BookingField>
          <BookingField label="PARENT PHONE (OPTIONAL)" htmlFor={`b-${cls.id}-ph`}>
            <input id={`b-${cls.id}-ph`} type="tel" placeholder="(701) 555-0123" value={form.parentPhone} onChange={onChange('parentPhone')} className="form-input" autoComplete="tel"/>
          </BookingField>
          <BookingField label="NOTES (OPTIONAL)" htmlFor={`b-${cls.id}-no`}>
            <textarea id={`b-${cls.id}-no`} rows="2" placeholder="Anything we should know" value={form.notes} onChange={onChange('notes')} className="form-input" style={{ resize: 'vertical', minHeight: 60 }}/>
          </BookingField>
          {submitError && (
            <div role="alert" className="card" style={{ padding: 10, fontSize: 12, lineHeight: 1.5, borderColor: 'var(--pink)' }}>{submitError}</div>
          )}
          <div className="row gap-2 mt-1">
            <button type="button" onClick={() => setOpen(false)} className="btn" style={{ flex: 1, fontSize: 13 }}>Cancel</button>
            <button type="submit" disabled={submitting} className="btn btn-primary" style={{ flex: 2, fontSize: 13 }}>
              {submitting ? 'Booking…' : `Book ${cls.name} →`}
            </button>
          </div>
          <p className="dim" style={{ fontSize: 10, lineHeight: 1.5 }}>
            Goes straight to MCA staff. Payment (if any) handled by the gym after acceptance.
          </p>
        </form>
      )}
    </div>
  );
}

function BookingField({ label, htmlFor, error, children }) {
  return (
    <label className="col gap-2" htmlFor={htmlFor}>
      <span className="row between center">
        <span className="eyebrow" style={{ fontSize: 9 }}>{label}</span>
        {error && <span className="eyebrow eyebrow-pink" role="alert" style={{ fontSize: 9 }}>{error}</span>}
      </span>
      {children}
    </label>
  );
}

Object.assign(window, { ProgramsPage, ClassBookingRow });
