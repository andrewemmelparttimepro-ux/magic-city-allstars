/* global React, Photo, SectionHead, Reveal, useProgram, HZ */
const { useState: useS_p, useEffect: useE_p, useRef: useR_p } = React;

const COACHES = [
  { name: 'Brynn Franklin', role: 'Co-Owner · CEO · Director of Athletic Operations', short: 'CEO', tone: 'pink',
    src: 'assets/photos/coach-brynn-franklin.jpeg', focal: '50% 25%',
    bio: 'Co-founder of Magic City Athletics. Leads athletic operations — programs, coaching, and the work on the floor.',
    quote: 'Bring out the MAGIC in YOU.' },
  { name: 'Melissa Rouser', role: 'Co-Owner · Chief Financial Officer', short: 'CFO', tone: 'teal',
    src: 'assets/photos/coach-melissa-rauser.jpeg', focal: '50% 25%',
    bio: 'Co-founder of Magic City Athletics. Runs the gym\'s finances — billing, planning, and keeping every season on solid footing.',
    quote: 'More than a gym — it\'s a cheer family.' },
  { name: 'Carissa Todd', role: 'Co-Owner · Chief Administrative Officer', short: 'CAO', tone: 'mix',
    src: 'assets/photos/coach-carissa-todd.jpeg', focal: '50% 25%',
    bio: 'Co-founder of Magic City Athletics. Leads administration — schedules, registration, and the systems behind the scenes.',
    quote: 'Confidence is built one rep at a time.' },
  { name: 'Carlie Collins', role: 'Co-Owner · Chief Operating Officer', short: 'COO', tone: 'pink',
    src: 'assets/photos/coach-carlie-wilson.jpeg', focal: '50% 25%',
    bio: 'Co-founder of Magic City Athletics. Runs day-to-day operations — making sure every class, practice, and event runs on time.',
    quote: 'Clean is louder than hard.' },
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
                <Photo ratio="3/4" tone={c.tone} src={c.src} alt={`${c.name}, ${c.role}`} focal={c.focal} overlay label={c.name.toUpperCase()}>
                  <div style={{ position: 'absolute', inset: 0, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 3, color: '#fff' }}>
                    <div className="display-strong" style={{ fontSize: 30, lineHeight: 0.95, color: '#fff' }}>{c.name}</div>
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
                    <span className="eyebrow">Co-Owner · Magic City Athletics</span>
                    <span className={`pill ${c.tone === 'teal' ? 'pill-teal' : 'pill-pink'}`}>{c.short}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Owner-only console deep links */}
      <OwnerToolsCard/>
    </div>
  );
}

// ─────────── PRICING ───────────
// Price groups now come live from program_classes (grouped by track) in
// Hit Zero. Owner edits → website updates instantly.

function fmtPrice(cents) {
  if (cents == null) return '';
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

function unitLabel(cls) {
  if (cls.price_unit_label) return cls.price_unit_label;
  switch (cls.price_unit) {
    case 'per_month': return '/month';
    case 'per_session': return '/session';
    case 'per_session_per_month': return '/month per session';
    case 'per_athlete': return '/athlete';
    case 'flat': return '';
    default: return '';
  }
}

function trackEyebrowLabel(track) {
  if (!track) return 'Pricing';
  if (track.eyebrow) return track.eyebrow;
  return track.name || 'Pricing';
}

function trackAccent(track) {
  return track?.tone === 'teal' ? 'teal' : 'pink';
}

function PricingPage({ go }) {
  const [windows, setWindows] = useS_p([]);
  const [tracks, setTracks] = useS_p([]);
  const [classes, setClasses] = useS_p([]);
  const [loaded, setLoaded] = useS_p(false);
  useE_p(() => {
    let cancelled = false;
    if (window.HZ) {
      window.HZ.getActiveRegistrationWindows()
        .then(rows => { if (!cancelled) setWindows(rows || []); })
        .catch(() => { /* show no windows */ });
      Promise.all([window.HZ.getTracks(), window.HZ.getClasses()])
        .then(([t, c]) => { if (!cancelled) { setTracks(t || []); setClasses(c || []); setLoaded(true); } })
        .catch(() => { if (!cancelled) setLoaded(true); });
    } else {
      setLoaded(true);
    }
    return () => { cancelled = true; };
  }, []);

  // Group classes by track for the price-table display. Tracks with no
  // priced classes don't render a card. Classes with no track go into a
  // synthetic "Other" group at the end.
  const groups = (() => {
    const byTrack = new Map();
    for (const t of tracks) byTrack.set(t.id, { track: t, rows: [] });
    const other = { track: null, rows: [] };
    for (const c of classes) {
      const bucket = c.track_id && byTrack.has(c.track_id) ? byTrack.get(c.track_id) : other;
      bucket.rows.push(c);
    }
    return [...byTrack.values(), other].filter(g => g.rows.length > 0);
  })();

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

      {/* Open Gym — $10/athlete, drop-in vibes */}
      <section className="sec">
        <article className="card" style={{ padding: 28, background: 'linear-gradient(160deg, rgba(39,207,215,0.12), rgba(249,127,172,0.12))', border: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
          <div className="row between center" style={{ flexWrap: 'wrap', gap: 8 }}>
            <div className="eyebrow eyebrow-teal">Drop-in. Low-pressure.</div>
            <span className="pill pill-grad">Days &amp; times coming soon</span>
          </div>
          <div className="row center" style={{ alignItems: 'baseline', gap: 14, marginTop: 14, flexWrap: 'wrap' }}>
            <div className="display" style={{ fontSize: 'clamp(34px, 8vw, 48px)', lineHeight: 1, fontStyle: 'italic' }}>Open Gym</div>
            <div className="display-strong grad-text" style={{ fontSize: 'clamp(48px, 12vw, 72px)', lineHeight: 0.9, letterSpacing: '-0.04em' }}>$10</div>
            <div className="dim" style={{ fontSize: 14, alignSelf: 'flex-end', paddingBottom: 6 }}>/athlete</div>
          </div>
          <p className="mt-4" style={{ fontSize: 15, lineHeight: 1.55 }}>
            Cheer can feel intimidating from the outside — the music, the stunts, the gear, the lingo. We want to take that wall down.
          </p>
          <p className="dim mt-3" style={{ fontSize: 14, lineHeight: 1.6 }}>
            Drop in, meet the coaches, and <em className="serif-italic" style={{ color: 'var(--text)' }}>get a feel for the mats</em> — for the price of a coffee. No commitment, no full registration, just see if it's for you.
          </p>
          <div className="hairline mt-6 mb-4"/>
          <div className="col gap-2" style={{ fontSize: 13, lineHeight: 1.5 }}>
            <div className="row gap-3 center"><span className="grad-text" style={{ fontFamily: 'var(--mono)' }}>◈</span><span>All ages welcome — bring the kid, bring yourself</span></div>
            <div className="row gap-3 center"><span className="grad-text" style={{ fontFamily: 'var(--mono)' }}>◈</span><span>No experience needed — first cartwheel counts</span></div>
            <div className="row gap-3 center"><span className="grad-text" style={{ fontFamily: 'var(--mono)' }}>◈</span><span>Coaches on the floor to answer anything</span></div>
            <div className="row gap-3 center"><span className="grad-text" style={{ fontFamily: 'var(--mono)' }}>◈</span><span>Days + times posting soon — sign up to get notified</span></div>
          </div>
          <div className="col gap-3 mt-6">
            <a href={(window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://hit-zero.vercel.app/#trial/mca'} className="btn btn-primary btn-block" style={{ textDecoration: 'none', textAlign: 'center' }}>Get on the open-gym list →</a>
          </div>
        </article>
      </section>

      {/* Active registration windows — pulled live from Hit Zero */}
      {windows.length > 0 && (
        <section className="sec" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div className="eyebrow eyebrow-teal mb-2">SIGN UP NOW</div>
          <div className="display" style={{ fontSize: 'clamp(28px, 6vw, 40px)', lineHeight: 1.05 }}>
            Open <em className="grad-text">registration</em>.
          </div>
          <p className="dim mt-3" style={{ fontSize: 14, lineHeight: 1.55 }}>
            Reserve your athlete's spot. We review every registration and email you within 48 hours.
          </p>
          <div className="col gap-4 mt-6">
            {windows.map(w => <RegistrationWindowCard key={w.id} window_={w}/>)}
          </div>
        </section>
      )}

      <section className="sec">
        <div className="col gap-6">
          {!loaded && (
            <div className="dim" style={{ textAlign: 'center', padding: 40, fontSize: 13 }}>Loading pricing…</div>
          )}
          {loaded && groups.length === 0 && (
            <div className="card" style={{ padding: 24, textAlign: 'center' }}>
              <div className="display" style={{ fontSize: 22 }}>Pricing posted soon.</div>
              <p className="dim mt-3" style={{ fontSize: 13 }}>Reach out for current rates and we'll walk you through everything.</p>
              <a href="mailto:coaches@magiccityathletics.net" className="btn btn-primary btn-block mt-4" style={{ textDecoration: 'none', textAlign: 'center' }}>Email us →</a>
            </div>
          )}
          {groups.map(g => {
            const accent = trackAccent(g.track);
            const title = g.track?.name || 'Other offerings';
            const eyebrow = trackEyebrowLabel(g.track);
            return (
              <article key={g.track?.id || 'other'} className="card" style={{ padding: 22 }}>
                <div className={`eyebrow eyebrow-${accent} mb-2`}>{eyebrow}</div>
                <div className="display" style={{ fontSize: 26, marginBottom: 16 }}>{title}</div>
                <div className="col" style={{ gap: 0 }}>
                  {g.rows.map((r, i) => (
                    <div key={r.id} className="row between center" style={{ padding: '14px 0', borderTop: i === 0 ? '1px solid var(--line)' : 'none', borderBottom: '1px solid var(--line)', gap: 12 }}>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                        {r.schedule_summary && <span className="dim" style={{ fontSize: 11 }}>{r.schedule_summary}</span>}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, whiteSpace: 'nowrap' }}>
                        <span className="display-strong grad-text" style={{ fontSize: 22, lineHeight: 1 }}>{fmtPrice(r.price_cents)}</span>
                        {unitLabel(r) && <span className="dim" style={{ fontSize: 11 }}>{unitLabel(r)}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
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
          <a href={(window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://hit-zero.vercel.app/#trial/mca'} className="btn btn-primary btn-block" style={{ textDecoration: 'none', textAlign: 'center' }}>Book a tour →</a>
          <a href="mailto:coaches@magiccityathletics.net" className="btn btn-block">Email coaches@magiccityathletics.net</a>
        </div>
      </section>
    </div>
  );
}

// ─────────── Owner tools (deep links into Hit Zero) ───────────
function OwnerToolsCard() {
  const HZ_URL = (window.HZ && window.HZ.HIT_ZERO_URL) || 'https://hit-zero.vercel.app';
  return (
    <section className="sec" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)' }}>
      <div className="card" style={{ padding: 22 }}>
        <div className="row between center" style={{ flexWrap: 'wrap', gap: 8 }}>
          <div className="eyebrow eyebrow-teal">Owners only</div>
          <span className="pill pill-grad">Hit Zero</span>
        </div>
        <div className="display mt-3" style={{ fontSize: 22, lineHeight: 1.2 }}>
          Run the gym in <em className="grad-text">Hit Zero</em>.
        </div>
        <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55 }}>
          Roster, leads, registrations, and billing all live in the owner console. Sign in with your magic-link email to manage everything — and connect your Square account to take payments.
        </p>
        <div className="col gap-2 mt-5">
          <a href={`${HZ_URL}/#billing`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-block">Connect Square (sign in) →</a>
          <a href={`${HZ_URL}/#admin`} target="_blank" rel="noopener noreferrer" className="btn btn-block">Open owner console</a>
        </div>
        <p className="dim mt-3" style={{ fontSize: 11, lineHeight: 1.55 }}>
          You'll be asked to sign in via magic link the first time. After that, deep links open straight into the right tab.
        </p>
      </div>
    </section>
  );
}

// ─────────── Registration window card ───────────
function fmtDate(iso) {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (_) { return null; }
}

function RegistrationWindowCard({ window_: w }) {
  const [open, setOpen] = useS_p(false);
  const [submitted, setSubmitted] = useS_p(false);
  const [submitting, setSubmitting] = useS_p(false);
  const [submitError, setSubmitError] = useS_p(null);
  const [form, setForm] = useS_p({ athleteName: '', athleteDob: '', parentName: '', parentEmail: '', parentPhone: '', levelInterest: '', notes: '', hp: '' });
  const [errors, setErrors] = useS_p({});
  const mountedAt = useR_p(Date.now());

  const closesLabel = w.closes_at ? `closes ${fmtDate(w.closes_at)}` : 'rolling';
  const opensLabel = w.opens_at ? `opens ${fmtDate(w.opens_at)}` : null;

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
    if (form.levelInterest && !/^\d+$/.test(form.levelInterest.trim())) next.levelInterest = 'Numbers only (1–6)';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    if (form.hp) { setSubmitted(true); return; }
    if (Date.now() - mountedAt.current < 2000) {
      setSubmitError('Please take a second to review and resubmit.');
      return;
    }
    if (!validate()) return;
    setSubmitting(true);
    try {
      await window.HZ.submitRegistration({
        window_id: w.id,
        athlete_name: form.athleteName.trim(),
        athlete_dob: form.athleteDob || null,
        parent_name: form.parentName.trim(),
        parent_email: form.parentEmail.trim(),
        parent_phone: form.parentPhone.trim() || null,
        level_interest: form.levelInterest ? parseInt(form.levelInterest, 10) : null,
        notes: form.notes.trim() || null,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError('We couldn\'t submit your registration. Please try again or email us directly.');
      console.error('registration submit failed', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article className="card" style={{ padding: 22 }}>
      <div className="row between" style={{ flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div className="eyebrow eyebrow-pink mb-1">{[opensLabel, closesLabel].filter(Boolean).join(' · ')}</div>
          <div className="display" style={{ fontSize: 22, lineHeight: 1.2 }}>{w.title}</div>
        </div>
        {Number(w.fee_amount) > 0 && (
          <div style={{ textAlign: 'right' }}>
            <div className="display-strong grad-text" style={{ fontSize: 28, lineHeight: 1, letterSpacing: '-0.02em' }}>${Number(w.fee_amount).toFixed(0)}</div>
            <div className="eyebrow mt-1">Fee</div>
          </div>
        )}
      </div>
      {w.description && <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55 }}>{w.description}</p>}

      {!open && !submitted && (
        <button onClick={() => setOpen(true)} className="btn btn-primary btn-block mt-4">Register →</button>
      )}

      {open && !submitted && (
        <form onSubmit={onSubmit} className="col gap-3 mt-5" noValidate>
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
            <label>Leave this empty <input tabIndex="-1" autoComplete="off" type="text" value={form.hp} onChange={onChange('hp')}/></label>
          </div>
          <Field label="ATHLETE NAME" htmlFor={`r-${w.id}-an`} error={errors.athleteName}>
            <input id={`r-${w.id}-an`} type="text" placeholder="Your athlete's name" value={form.athleteName} onChange={onChange('athleteName')} className="form-input" required aria-invalid={!!errors.athleteName}/>
          </Field>
          <Field label="ATHLETE DATE OF BIRTH" htmlFor={`r-${w.id}-dob`}>
            <input id={`r-${w.id}-dob`} type="date" value={form.athleteDob} onChange={onChange('athleteDob')} className="form-input"/>
          </Field>
          <Field label="LEVEL INTEREST (1–6, optional)" htmlFor={`r-${w.id}-lv`} error={errors.levelInterest}>
            <input id={`r-${w.id}-lv`} type="text" inputMode="numeric" placeholder="e.g. 2" value={form.levelInterest} onChange={onChange('levelInterest')} className="form-input" aria-invalid={!!errors.levelInterest}/>
          </Field>
          <Field label="PARENT/GUARDIAN NAME" htmlFor={`r-${w.id}-pn`} error={errors.parentName}>
            <input id={`r-${w.id}-pn`} type="text" placeholder="First & last" value={form.parentName} onChange={onChange('parentName')} className="form-input" autoComplete="name" required aria-invalid={!!errors.parentName}/>
          </Field>
          <Field label="PARENT EMAIL" htmlFor={`r-${w.id}-em`} error={errors.parentEmail}>
            <input id={`r-${w.id}-em`} type="email" placeholder="you@example.com" value={form.parentEmail} onChange={onChange('parentEmail')} className="form-input" autoComplete="email" required aria-invalid={!!errors.parentEmail}/>
          </Field>
          <Field label="PARENT PHONE (OPTIONAL)" htmlFor={`r-${w.id}-ph`}>
            <input id={`r-${w.id}-ph`} type="tel" placeholder="(701) 555-0123" value={form.parentPhone} onChange={onChange('parentPhone')} className="form-input" autoComplete="tel"/>
          </Field>
          <Field label="NOTES (OPTIONAL)" htmlFor={`r-${w.id}-no`}>
            <textarea id={`r-${w.id}-no`} rows="2" placeholder="Anything we should know" value={form.notes} onChange={onChange('notes')} className="form-input" style={{ resize: 'vertical', minHeight: 60 }}/>
          </Field>
          {submitError && (
            <div role="alert" className="card" style={{ padding: 12, fontSize: 13, lineHeight: 1.5, borderColor: 'var(--pink)' }}>{submitError}</div>
          )}
          <div className="row gap-2 mt-2">
            <button type="button" onClick={() => setOpen(false)} className="btn" style={{ flex: 1 }}>Cancel</button>
            <button type="submit" disabled={submitting} className="btn btn-primary" style={{ flex: 2 }}>{submitting ? 'Submitting…' : 'Submit registration →'}</button>
          </div>
          <p className="dim" style={{ fontSize: 11, lineHeight: 1.55 }}>
            Goes straight to MCA staff in <em>Hit Zero</em>. Payment (if any) handled separately by the gym after acceptance.
          </p>
        </form>
      )}

      {submitted && (
        <div className="card mt-4" role="status" aria-live="polite" style={{ padding: 18, textAlign: 'center', background: 'linear-gradient(160deg, rgba(39,207,215,0.10), rgba(249,127,172,0.10))' }}>
          <div className="grad-text serif-italic" style={{ fontSize: 36, lineHeight: 1, fontWeight: 900 }}>✓</div>
          <div className="display mt-2" style={{ fontSize: 18 }}>You're registered.</div>
          <p className="dim mt-2" style={{ fontSize: 12, lineHeight: 1.5 }}>MCA staff will review and email you within 48 hours.</p>
        </div>
      )}
    </article>
  );
}

// Tiny field wrapper (mirrors the one in FAQContact.jsx)
function Field({ label, htmlFor, error, children }) {
  return (
    <label className="col gap-2" htmlFor={htmlFor}>
      <span className="row between center">
        <span className="eyebrow">{label}</span>
        {error && <span className="eyebrow eyebrow-pink" role="alert">{error}</span>}
      </span>
      {children}
    </label>
  );
}

Object.assign(window, { CoachesPage, PricingPage, RegistrationWindowCard, OwnerToolsCard });
