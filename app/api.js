/* Hit Zero / Supabase REST helpers
 *
 * Tiny fetch wrapper. No SDK dependency — the marketing site has no build step,
 * so we hit the Supabase REST API directly with the public anon key (which is
 * already shipped in the Hit Zero PWA — safe to publish).
 *
 * Surface area is intentionally narrow: read public program directory, read
 * active public registration windows, insert a lead, insert a registration.
 *
 * Everything is exposed under window.HZ for use from the React tree. */
(function () {
  const SUPABASE_URL = 'https://ldhzkdqznccfgpdvqyfk.supabase.co';
  const SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkaHprZHF6bmNjZmdwZHZxeWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMTY1MTksImV4cCI6MjA5MDg5MjUxOX0.yPihX_N734HXTk8mzf-F85W_5j_J7EXe3Dg1U90ZMYI';

  const MCA_PROGRAM_ID = '11111111-1111-1111-1111-111111111111';
  const MCA_SLUG = 'mca';
  const HIT_ZERO_URL = 'https://hit-zero.vercel.app';

  // Capture UTM + referrer once per session so every later insert carries them.
  function captureSourceContext() {
    try {
      const cached = sessionStorage.getItem('hz_src_ctx');
      if (cached) return JSON.parse(cached);
      const params = new URLSearchParams(window.location.search);
      const ctx = {
        utm_source: params.get('utm_source') || null,
        utm_campaign: params.get('utm_campaign') || null,
        utm_medium: params.get('utm_medium') || null,
        utm_content: params.get('utm_content') || null,
        utm_term: params.get('utm_term') || null,
        referrer_url: document.referrer || null,
        landing_url: window.location.href,
        captured_at: new Date().toISOString(),
      };
      sessionStorage.setItem('hz_src_ctx', JSON.stringify(ctx));
      return ctx;
    } catch (_) {
      return {};
    }
  }

  async function rest(path, init = {}) {
    const headers = Object.assign(
      {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      init.headers || {}
    );
    const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, { ...init, headers });
    if (!res.ok) {
      let detail = '';
      try { detail = await res.text(); } catch (_) {}
      const err = new Error(`Supabase ${res.status}: ${detail || res.statusText}`);
      err.status = res.status;
      err.detail = detail;
      throw err;
    }
    if (res.status === 204) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  async function getProgram(slug) {
    const s = slug || MCA_SLUG;
    const rows = await rest(`/program_public_directory?slug=eq.${encodeURIComponent(s)}&select=*&limit=1`);
    return (rows && rows[0]) || null;
  }

  async function getActiveRegistrationWindows(programId) {
    const pid = programId || MCA_PROGRAM_ID;
    const nowIso = new Date().toISOString();
    // Public + not closed yet. Some windows may have null closes_at — include them.
    const path =
      `/registration_windows?program_id=eq.${pid}` +
      `&is_public=eq.true` +
      `&or=(closes_at.gte.${encodeURIComponent(nowIso)},closes_at.is.null)` +
      `&order=opens_at.asc&select=*`;
    return (await rest(path)) || [];
  }

  async function submitLead(payload) {
    const ctx = captureSourceContext();
    const body = Object.assign(
      {
        program_id: MCA_PROGRAM_ID,
        stage: 'new',
        source: payload.source || 'public_website',
        referrer_url: ctx.referrer_url,
        utm_source: ctx.utm_source,
        utm_campaign: ctx.utm_campaign,
      },
      payload,
      {
        metadata: Object.assign(
          {
            landing_url: ctx.landing_url,
            utm_medium: ctx.utm_medium,
            utm_content: ctx.utm_content,
            utm_term: ctx.utm_term,
          },
          payload.metadata || {}
        ),
      }
    );
    const rows = await rest('/leads', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(body),
    });
    return Array.isArray(rows) ? rows[0] : rows;
  }

  async function submitRegistration(payload) {
    const body = Object.assign(
      {
        program_id: MCA_PROGRAM_ID,
        status: 'pending',
        source: payload.source || 'public_website',
      },
      payload
    );
    const rows = await rest('/registrations', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(body),
    });
    return Array.isArray(rows) ? rows[0] : rows;
  }

  // Run UTM capture on initial load so the first inserted lead carries it
  // even if the user navigates internally before submitting.
  if (typeof window !== 'undefined') captureSourceContext();

  window.HZ = {
    SUPABASE_URL,
    MCA_PROGRAM_ID,
    MCA_SLUG,
    HIT_ZERO_URL,
    getProgram,
    getActiveRegistrationWindows,
    submitLead,
    submitRegistration,
    captureSourceContext,
  };
})();
