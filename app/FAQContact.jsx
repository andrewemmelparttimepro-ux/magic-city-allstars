/* global React, Photo, SectionHead, Reveal */
const { useState: useS_c } = React;

const FAQ = [
  { q: 'Do we have to compete to join?', a: 'Not at all. Tumbling, rec, and tinies are non-competitive tracks. About 40% of our athletes never compete and stay for years.' },
  { q: 'How much travel is involved?', a: 'Almost none for prep, rec, tumbling and tinies. All-star teams travel within driving distance — Fargo, Bismarck, Minneapolis. No flights required for any team.' },
  { q: 'My kid has zero experience. Where do they start?', a: 'Tinies (3–5), tumbling 1, or rec cheer. Book a free trial and we\'ll place them after one class.' },
  { q: 'What\'s the trial process?', a: 'First class is free. Walk in, try it, decide. We send a recap in the Hit Zero app the same day.' },
  { q: 'How do I sign up?', a: 'Download the Hit Zero app, create a free account, pick a class. Tuition is billed monthly, no setup fees.' },
  { q: 'What does "hit zero" actually mean?', a: 'A zero-deduction routine — perfect execution at competition. It\'s the standard we coach to, every team, every level.' },
  { q: 'What about safety?', a: 'USASF-credentialed coaches, 1:8 ratio on stunts, concussion + first-aid current across the bench. Open viewing window into every practice.' },
  { q: 'Can I watch practice?', a: 'Yes. Parent lounge has a full window. Bring a coffee, stay as long as you want.' },
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
const CONTACT_EMAIL = 'hello@magiccityathletics.com';
const CONTACT_PHONE = '701-555-0182';
const CONTACT_ADDRESS = '2400 SE Burdick, Minot, ND 58701';

function ContactPage() {
  const [step, setStep] = useS_c(0);
  const [form, setForm] = useS_c({ name: '', age: '', contact: '', interest: 'All-Star Competitive', notes: '' });
  const [errors, setErrors] = useS_c({});
  const [submitting, setSubmitting] = useS_c(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Required';
    if (!form.age.trim()) next.age = 'Required';
    if (!form.contact.trim()) next.contact = 'Phone or email required';
    else if (!/[@\d]/.test(form.contact)) next.contact = 'Looks invalid';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const subject = `Tour request — ${form.name}`;
    const body = `Name: ${form.name}\nAthlete age: ${form.age}\nReach me at: ${form.contact}\nInterest: ${form.interest}\n\nNotes:\n${form.notes || '(none)'}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      window.location.href = mailto;
      setStep(1);
      setSubmitting(false);
    }, 350);
  };

  const onChange = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
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
          One gym, easy to find — right off Burdick. Drop in any weekday or schedule a tour and we'll walk you through.
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
            <text x="200" y="195" fill="currentColor" fillOpacity="0.55" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="2">2400 SE BURDICK · MINOT</text>
          </svg>
        </div>
      </section>

      <section className="sec">
        <div className="card" style={{ padding: 18 }}>
          <div className="row between" style={{ padding: '8px 0' }}>
            <span className="eyebrow">ADDRESS</span>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_ADDRESS)}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}>2400 SE Burdick →</a>
          </div>
          <div className="hairline"/>
          <div className="row between" style={{ padding: '8px 0' }}>
            <span className="eyebrow">CITY</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Minot, ND 58701</span>
          </div>
          <div className="hairline"/>
          <div className="row between" style={{ padding: '8px 0' }}>
            <span className="eyebrow">PHONE</span>
            <a href={`tel:${CONTACT_PHONE.replace(/-/g,'')}`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}>{CONTACT_PHONE}</a>
          </div>
          <div className="hairline"/>
          <div className="row between" style={{ padding: '8px 0' }}>
            <span className="eyebrow">EMAIL</span>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}>{CONTACT_EMAIL}</a>
          </div>
          <div className="hairline"/>
          <div className="row between" style={{ padding: '8px 0' }}>
            <span className="eyebrow">HOURS</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Mon–Fri 3–9 · Sat 9–5</span>
          </div>
        </div>
      </section>

      {/* Tour request form — real validation + mailto submit */}
      <section className="sec" style={{ background: 'var(--bg-elev-2)', borderTop: '1px solid var(--line)' }}>
        <div className="display" style={{ fontSize: 28 }}>Book a <em className="grad-text">tour</em>.</div>
        <p className="dim mt-3" style={{ fontSize: 13 }}>20 minutes. Walk the floor, watch a class, ask anything.</p>

        {step === 0 && (
          <form onSubmit={onSubmit} className="col gap-3 mt-6" noValidate>
            <Field label="YOUR NAME" htmlFor="f-name" error={errors.name}>
              <input id="f-name" name="name" type="text" placeholder="First & last" value={form.name} onChange={onChange('name')} className="form-input" autoComplete="name" required aria-invalid={!!errors.name}/>
            </Field>
            <Field label="ATHLETE AGE" htmlFor="f-age" error={errors.age}>
              <input id="f-age" name="age" type="text" inputMode="numeric" placeholder="e.g. 8" value={form.age} onChange={onChange('age')} className="form-input" required aria-invalid={!!errors.age}/>
            </Field>
            <Field label="PHONE OR EMAIL" htmlFor="f-contact" error={errors.contact}>
              <input id="f-contact" name="contact" type="text" placeholder="How should we reach you?" value={form.contact} onChange={onChange('contact')} className="form-input" autoComplete="email" required aria-invalid={!!errors.contact}/>
            </Field>
            <Field label="INTEREST" htmlFor="f-interest">
              <select id="f-interest" name="interest" value={form.interest} onChange={onChange('interest')} className="form-input">
                <option>All-Star Competitive</option>
                <option>Prep / Rec</option>
                <option>Tumbling only</option>
                <option>Tinies (3–5)</option>
                <option>Just curious</option>
              </select>
            </Field>
            <Field label="ANYTHING ELSE? (optional)" htmlFor="f-notes">
              <textarea id="f-notes" name="notes" rows="3" placeholder="Schedule preference, questions, etc." value={form.notes} onChange={onChange('notes')} className="form-input" style={{ resize: 'vertical', minHeight: 80 }}/>
            </Field>
            <button type="submit" disabled={submitting} className="btn btn-primary btn-block mt-3">
              {submitting ? 'Sending…' : 'Request a tour →'}
            </button>
            <p className="dim" style={{ fontSize: 11, lineHeight: 1.55, marginTop: 4 }}>
              We'll never sell your info. Your reply opens an email to our gym admin.
            </p>
          </form>
        )}

        {step === 1 && (
          <div className="card mt-6" role="status" aria-live="polite" style={{ padding: 24, textAlign: 'center', background: 'linear-gradient(160deg, rgba(39,207,215,0.10), rgba(249,127,172,0.10))' }}>
            <div className="grad-text serif-italic" style={{ fontSize: 50, lineHeight: 1, fontWeight: 900 }}>✓</div>
            <div className="display mt-4" style={{ fontSize: 26 }}>You're on the list.</div>
            <p className="dim mt-3" style={{ fontSize: 13 }}>Kara will reach out within 24 hours to set a time. Most tours happen within the same week.</p>
            <button onClick={() => { setStep(0); setForm({ name: '', age: '', contact: '', interest: 'All-Star Competitive', notes: '' }); }} className="btn btn-block mt-6">Send another</button>
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
