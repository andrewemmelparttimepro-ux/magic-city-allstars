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
function ContactPage() {
  const [step, setStep] = useS_c(0);
  return (
    <div>
      <section className="sec">
        <div className="eyebrow eyebrow-teal mb-2">07 · COME BY</div>
        <h1 className="display" style={{ fontSize: 52, margin: 0 }}>
          Find us in <em className="grad-text">Minot</em>.
        </h1>
      </section>

      {/* "Map" placeholder — stylized */}
      <section className="sec-tight">
        <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', aspectRatio: '4/3', background: 'linear-gradient(135deg, #1A0F18 0%, #261622 100%)' }}>
          <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="400" height="300" fill="url(#grid)"/>
            {/* fake roads */}
            <path d="M0 180 L400 160" stroke="rgba(255,255,255,0.18)" strokeWidth="2"/>
            <path d="M0 100 L400 80" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
            <path d="M120 0 L140 300" stroke="rgba(255,255,255,0.18)" strokeWidth="2"/>
            <path d="M260 0 L280 300" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
            {/* river */}
            <path d="M0 230 Q150 210 250 250 T400 240" stroke="rgba(39,207,215,0.4)" strokeWidth="6" fill="none"/>
            <text x="320" y="225" fill="rgba(39,207,215,0.7)" fontSize="9" fontFamily="JetBrains Mono">SOURIS RIVER</text>
            {/* pin */}
            <g transform="translate(200,150)">
              <circle r="40" fill="rgba(249,127,172,0.18)"/>
              <circle r="20" fill="rgba(249,127,172,0.35)"/>
              <circle r="8" fill="#F97FAC" stroke="#fff" strokeWidth="2"/>
            </g>
            <text x="200" y="115" fill="#fff" textAnchor="middle" fontSize="11" fontFamily="Fraunces" fontStyle="italic" fontWeight="800">Magic City Allstars</text>
            <text x="200" y="195" fill="rgba(255,255,255,0.5)" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="2">2400 SE BURDICK · MINOT</text>
          </svg>
        </div>
      </section>

      <section className="sec">
        <div className="card" style={{ padding: 18 }}>
          <div className="row between" style={{ padding: '8px 0' }}>
            <span className="eyebrow">ADDRESS</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>2400 SE Burdick</span>
          </div>
          <div className="hairline"/>
          <div className="row between" style={{ padding: '8px 0' }}>
            <span className="eyebrow">CITY</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Minot, ND 58701</span>
          </div>
          <div className="hairline"/>
          <div className="row between" style={{ padding: '8px 0' }}>
            <span className="eyebrow">PHONE</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>701-555-0182</span>
          </div>
          <div className="hairline"/>
          <div className="row between" style={{ padding: '8px 0' }}>
            <span className="eyebrow">HOURS</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Mon–Fri 3–9 · Sat 9–5</span>
          </div>
        </div>
      </section>

      {/* Tour request form */}
      <section className="sec" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)' }}>
        <div className="display" style={{ fontSize: 28 }}>Book a <em className="grad-text">tour</em>.</div>
        <p className="dim mt-3" style={{ fontSize: 13 }}>20 minutes. Walk the floor, watch a class, ask anything.</p>

        {step === 0 && (
          <div className="col gap-3 mt-6">
            <label className="col gap-2">
              <span className="eyebrow">YOUR NAME</span>
              <input type="text" placeholder="First & last" style={inputStyle}/>
            </label>
            <label className="col gap-2">
              <span className="eyebrow">ATHLETE AGE</span>
              <input type="text" placeholder="e.g. 8" style={inputStyle}/>
            </label>
            <label className="col gap-2">
              <span className="eyebrow">PHONE OR EMAIL</span>
              <input type="text" placeholder="How should we reach you?" style={inputStyle}/>
            </label>
            <label className="col gap-2">
              <span className="eyebrow">INTEREST</span>
              <select style={inputStyle}>
                <option>All-Star Competitive</option>
                <option>Prep / Rec</option>
                <option>Tumbling only</option>
                <option>Tinies (3–5)</option>
                <option>Just curious</option>
              </select>
            </label>
            <button onClick={() => setStep(1)} className="btn btn-primary btn-block mt-3">Request a tour →</button>
          </div>
        )}

        {step === 1 && (
          <div className="card mt-6" style={{ padding: 24, textAlign: 'center', background: 'linear-gradient(160deg, rgba(39,207,215,0.10), rgba(249,127,172,0.10))' }}>
            <div className="grad-text serif-italic" style={{ fontSize: 50, lineHeight: 1, fontWeight: 900 }}>✓</div>
            <div className="display mt-4" style={{ fontSize: 26 }}>You're on the list.</div>
            <p className="dim mt-3" style={{ fontSize: 13 }}>Kara will text you within 24 hours to set a time. Most tours happen within the same week.</p>
            <button onClick={() => setStep(0)} className="btn btn-block mt-6">Send another</button>
          </div>
        )}
      </section>
    </div>
  );
}

const inputStyle = {
  appearance: 'none', background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--line)', color: '#fff', padding: '14px 16px',
  borderRadius: 12, fontFamily: 'var(--sans)', fontSize: 14, width: '100%',
};

Object.assign(window, { FAQPage, ContactPage });
