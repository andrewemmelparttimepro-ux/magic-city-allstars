/* global React, Photo, SectionHead, Reveal, useProgram, HZ */
const { useState: useS_c } = React;

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
  const TRIAL_URL = (window.HZ && window.HZ.HIT_ZERO_TRIAL_URL) || 'https://hit-zero.vercel.app/#trial/mca';

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

      {/* Lead capture lives in Hit Zero so the gym staff have one place
          for everything: leads, classes, billing, registrations. */}
      <section className="sec" style={{ background: 'var(--bg-elev-2)', borderTop: '1px solid var(--line)' }}>
        <div className="display" style={{ fontSize: 28 }}>Book a <em className="grad-text">tour</em> or a free trial.</div>
        <p className="dim mt-3" style={{ fontSize: 13, lineHeight: 1.55 }}>
          20 minutes. Walk the floor, watch a class, ask anything. Reach out below — your inquiry lands directly in our coaches' inbox in <em className="serif-italic">Hit Zero</em>.
        </p>
        <div className="col gap-3 mt-6">
          <a href={TRIAL_URL} className="btn btn-primary btn-block" style={{ textDecoration: 'none', textAlign: 'center' }}>Book a tour or free trial →</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-block" style={{ textDecoration: 'none', textAlign: 'center' }}>Or email us directly</a>
        </div>
        <p className="dim mt-4" style={{ fontSize: 11, lineHeight: 1.55, textAlign: 'center' }}>
          We'll never sell your info. Real coaches reply within 24 hours.
        </p>
      </section>
    </div>
  );
}

Object.assign(window, { FAQPage, ContactPage });
