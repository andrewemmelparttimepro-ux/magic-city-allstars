/* global React, Photo, SectionHead, Reveal, useProgram, HZ */
const { useState: useS_c, useRef: useR_c } = React;

const FAQ = [
  {
    q: 'Do we have to compete to join?',
    a: 'Not at all. Recreational cheer, performance cheer, tumbling, and stunt classes are all non-competitive options.',
  },
  {
    q: 'How much travel is involved?',
    a: 'For non-competitive programs, none. All-Star Competitive teams travel within driving distance — we try to keep competitions closer to an airport in case flying is more your style.',
  },
  {
    q: 'My kid has zero experience. Where do they start?',
    a: 'We specialize in teaching athletes with zero experience. Beginner classes, basic tumbling, and stunt classes are all built for first-timers.',
  },
];

function FAQPage() {
  const [open, setOpen] = useS_c(0);
  return (
    <div>
      <section className="sec">
        <div className="eyebrow eyebrow-pink mb-2">08 · FAQ</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          Real <em className="grad-text">questions</em>.
        </h1>
        <p className="dim mt-4" style={{ fontSize: 14 }}>The ones we hear at every tour.</p>
      </section>
      <section className="sec">
        <div>
          {FAQ.map((it, i) => (
            <div key={i} className="faq-item" onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="faq-q">
                {it.q}
                <span className="faq-toggle">{open === i ? '−' : '+'}</span>
              </div>
              {open === i && <div className="faq-a">{it.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─────────── CONTACT ───────────
function ContactPage() {
  const program = useProgram();
  const CONTACT_EMAIL = program.public_email || 'coaches@magiccityathletics.net';
  const CONTACT_ADDRESS = [program.address_line1, [program.city, program.state, program.postal_code].filter(Boolean).join(', ')].filter(Boolean).join(', ');

  const [step, setStep] = useS_c(0);
  const [form, setForm] = useS_c({ parentName: '', athleteName: '', age: '', email: '', phone: '', interest: 'All-Star Competitive', notes: '', preferredContact: 'email', consentToText: false, hp: '' });
  const [errors, setErrors] = useS_c({});
  const [submitting, setSubmitting] = useS_c(false);
  const [submitError, setSubmitError] = useS_c(null);
  const mountedAt = useR_c(Date.now());

  const validate = () => {
    const next = {};
    if (!form.parentName.trim()) next.parentName = 'Required';
    if (!form.athleteName.trim()) next.athleteName = 'Required';
    if (form.age && !/^\d{1,2}$/.test(form.age.trim())) next.age = 'Numbers only';
    if (!form.email.trim() && !form.phone.trim()) {
      next.email = 'Email or phone required';
      next.phone = 'Email or phone required';
    } else {
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Looks invalid';
      if (form.phone.trim() && !/[\d]{7,}/.test(form.phone.replace(/\D/g, ''))) next.phone = 'Looks too short';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    // Honeypot: if a bot filled the hidden field, silently bail.
    if (form.hp) { setStep(1); return; }
    // Throttle: must wait at least 2s after page mount before submitting.
    if (Date.now() - mountedAt.current < 2000) {
      setSubmitError('Please take a second to review and resubmit.');
      return;
    }
    if (!program.is_accepting_leads) {
      setSubmitError('We\'re not accepting new inquiries right now — try emailing us directly.');
      return;
    }
    if (!validate()) return;
    setSubmitting(true);
    try {
      await window.HZ.submitLead({
        parent_name: form.parentName.trim(),
        parent_email: form.email.trim() || null,
        parent_phone: form.phone.trim() || null,
        athlete_name: form.athleteName.trim(),
        athlete_age: form.age ? parseInt(form.age, 10) : null,
        interest: form.interest,
        preferred_contact: form.preferredContact,
        consent_to_text: !!form.consentToText,
        metadata: { notes: form.notes || null, submitted_from: 'contact_page' },
      });
      setStep(1);
    } catch (err) {
      setSubmitError('Something went wrong sending your message. Please try again or email us directly.');
      console.error('lead submit failed', err);
    } finally {
      setSubmitting(false);
    }
  };

  const onChange = (k) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [k]: val });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };

  return (
    <div>
      <section className="sec">
        <div className="eyebrow eyebrow-teal mb-2">07 · COME BY</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          Find us in <em className="grad-text">Minot</em>.
        </h1>
        <p className="dim mt-3" style={{ fontSize: 14, lineHeight: 1.55, maxWidth: 520 }}>
          One gym, easy to find — over on 45th Ave NE. Drop in any weekday or schedule a tour and we'll walk you through.
        </p>
      </section>

      {/* "Map" — stylized, theme-aware */}
      <section className="sec-tight" aria-label="Location map illustration">
        <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', aspectRatio: '4/3', background: 'linear-gradient(135deg, var(--bg-elev-2) 0%, var(--bg-elev-3) 100%)', color: 'var(--text)', border: '1px solid var(--line)' }}>
          <svg viewBox="0 0 400 300" role="img" aria-label="Stylized map of Minot showing Magic City Athletics location" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="400" height="300" fill="url(#grid)"/>
            <path d="M0 180 L400 160" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2"/>
            <path d="M0 100 L400 80" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.5"/>
            <path d="M120 0 L140 300" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2"/>
            <path d="M260 0 L280 300" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.5"/>
            <path d="M0 230 Q150 210 250 250 T400 240" stroke="rgba(39,207,215,0.55)" strokeWidth="6" fill="none"/>
            <text x="320" y="225" fill="rgba(39,207,215,0.85)" fontSize="9" fontFamily="JetBrains Mono">SOURIS RIVER</text>
            <g transform="translate(200,150)">
              <circle r="40" fill="rgba(249,127,172,0.18)"/>
              <circle r="20" fill="rgba(249,127,172,0.45)"/>
              <circle r="8" fill="#F97FAC" stroke="currentColor" strokeWidth="2"/>
            </g>
            <text x="200" y="115" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="Fraunces" fontStyle="italic" fontWeight="800">Magic City Athletics</text>
            <text x="200" y="195" fill="currentColor" fillOpacity="0.55" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="2">111 45TH AVE NE · MINOT</text>
          </svg>
        </div>
      </section>

      <section className="sec">
        <div className="card" style={{ padding: 18 }}>
          <div className="row between" style={{ padding: '8px 0' }}>
            <span className="eyebrow">ADDRESS</span>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_ADDRESS)}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}>{program.address_line1 || '111 45th Ave NE'} →</a>
          </div>
          <div className="hairline"/>
          <div className="row between" style={{ padding: '8px 0' }}>
            <span className="eyebrow">CITY</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{[program.city, program.state, program.postal_code].filter(Boolean).join(', ')}</span>
          </div>
          <div className="hairline"/>
          <div className="row between" style={{ padding: '8px 0' }}>
            <span className="eyebrow">EMAIL</span>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}>{CONTACT_EMAIL}</a>
          </div>
          {program.public_phone && (
            <>
              <div className="hairline"/>
              <div className="row between" style={{ padding: '8px 0' }}>
                <span className="eyebrow">PHONE</span>
                <a href={`tel:${program.public_phone.replace(/\D/g, '')}`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}>{program.public_phone}</a>
              </div>
            </>
          )}
          <div className="hairline"/>
          <div className="row between" style={{ padding: '8px 0' }}>
            <span className="eyebrow">HOURS</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Mon–Fri 3–9 · Sat 9–5</span>
          </div>
        </div>

        <div className="dim mt-3" style={{ fontSize: 11, lineHeight: 1.5, textAlign: 'center' }}>
          Already a member? <a href={window.HZ.HIT_ZERO_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', fontWeight: 600 }}>Sign in to <em className="serif-italic grad-text">Hit Zero</em> →</a>
        </div>
      </section>

      {/* Tour request form — real validation + mailto submit */}
      <section className="sec" style={{ background: 'var(--bg-elev-2)', borderTop: '1px solid var(--line)' }}>
        <div className="display" style={{ fontSize: 28 }}>Book a <em className="grad-text">tour</em>.</div>
        <p className="dim mt-3" style={{ fontSize: 13 }}>20 minutes. Walk the floor, watch a class, ask anything.</p>

        {step === 0 && (
          <form onSubmit={onSubmit} className="col gap-3 mt-6" noValidate>
            {/* Honeypot — hidden from humans, often filled by bots. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
              <label>Leave this empty <input tabIndex="-1" autoComplete="off" type="text" name="website" value={form.hp} onChange={onChange('hp')}/></label>
            </div>
            <Field label="YOUR NAME (PARENT/GUARDIAN)" htmlFor="f-parent" error={errors.parentName}>
              <input id="f-parent" type="text" placeholder="First & last" value={form.parentName} onChange={onChange('parentName')} className="form-input" autoComplete="name" required aria-invalid={!!errors.parentName}/>
            </Field>
            <Field label="ATHLETE NAME" htmlFor="f-athlete" error={errors.athleteName}>
              <input id="f-athlete" type="text" placeholder="Your athlete's name" value={form.athleteName} onChange={onChange('athleteName')} className="form-input" required aria-invalid={!!errors.athleteName}/>
            </Field>
            <Field label="ATHLETE AGE" htmlFor="f-age" error={errors.age}>
              <input id="f-age" type="text" inputMode="numeric" placeholder="e.g. 8" value={form.age} onChange={onChange('age')} className="form-input" aria-invalid={!!errors.age}/>
            </Field>
            <Field label="EMAIL" htmlFor="f-email" error={errors.email}>
              <input id="f-email" type="email" placeholder="you@example.com" value={form.email} onChange={onChange('email')} className="form-input" autoComplete="email" aria-invalid={!!errors.email}/>
            </Field>
            <Field label="PHONE" htmlFor="f-phone" error={errors.phone}>
              <input id="f-phone" type="tel" placeholder="(701) 555-0123" value={form.phone} onChange={onChange('phone')} className="form-input" autoComplete="tel" aria-invalid={!!errors.phone}/>
            </Field>
            <Field label="PREFERRED CONTACT" htmlFor="f-pref">
              <select id="f-pref" value={form.preferredContact} onChange={onChange('preferredContact')} className="form-input">
                <option value="email">Email</option>
                <option value="phone">Phone call</option>
                <option value="text">Text</option>
              </select>
            </Field>
            <Field label="INTEREST" htmlFor="f-interest">
              <select id="f-interest" value={form.interest} onChange={onChange('interest')} className="form-input">
                <option>All-Star Competitive</option>
                <option>Performance Cheer</option>
                <option>Rec Cheer</option>
                <option>Tumbling</option>
                <option>Stunting</option>
                <option>Privates</option>
                <option>Open Gym (free trial)</option>
                <option>Just curious</option>
              </select>
            </Field>
            <Field label="ANYTHING ELSE? (optional)" htmlFor="f-notes">
              <textarea id="f-notes" rows="3" placeholder="Schedule preference, questions, etc." value={form.notes} onChange={onChange('notes')} className="form-input" style={{ resize: 'vertical', minHeight: 80 }}/>
            </Field>
            <label className="row gap-2 center" style={{ fontSize: 12, lineHeight: 1.5, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.consentToText} onChange={onChange('consentToText')} style={{ accentColor: 'var(--pink)' }}/>
              <span>OK to text me about my inquiry</span>
            </label>
            {submitError && (
              <div role="alert" className="card" style={{ padding: 12, fontSize: 13, lineHeight: 1.5, borderColor: 'var(--pink)', color: 'var(--text)' }}>
                {submitError}
              </div>
            )}
            <button type="submit" disabled={submitting} className="btn btn-primary btn-block mt-3">
              {submitting ? 'Sending…' : 'Request a tour →'}
            </button>
            <p className="dim" style={{ fontSize: 11, lineHeight: 1.55, marginTop: 4 }}>
              We'll never sell your info. Goes straight into our coaches' inbox in <em>Hit Zero</em>.
            </p>
          </form>
        )}

        {step === 1 && (
          <div className="card mt-6" role="status" aria-live="polite" style={{ padding: 24, textAlign: 'center', background: 'linear-gradient(160deg, rgba(39,207,215,0.10), rgba(249,127,172,0.10))' }}>
            <div className="grad-text serif-italic" style={{ fontSize: 50, lineHeight: 1, fontWeight: 900 }}>✓</div>
            <div className="display mt-4" style={{ fontSize: 26 }}>You're on the list.</div>
            <p className="dim mt-3" style={{ fontSize: 13 }}>One of our coaches will reach out within 24 hours. Most tours happen within the same week.</p>
            <button onClick={() => { setStep(0); setForm({ parentName: '', athleteName: '', age: '', email: '', phone: '', interest: 'All-Star Competitive', notes: '', preferredContact: 'email', consentToText: false, hp: '' }); }} className="btn btn-block mt-6">Send another</button>
          </div>
        )}
      </section>
    </div>
  );
}

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

Object.assign(window, { FAQPage, ContactPage });
