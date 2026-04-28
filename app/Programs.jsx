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

function ProgramsPage({ go }) {
  const [tracks, setTracks] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    let cancelled = false;
    if (window.HZ) {
      window.HZ.getTracks()
        .then(rows => { if (!cancelled) { setTracks(rows || []); setLoaded(true); } })
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

Object.assign(window, { ProgramsPage });
