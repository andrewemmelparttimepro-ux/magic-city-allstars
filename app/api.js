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
  const HIT_ZERO_TRIAL_URL = `${HIT_ZERO_URL}/#trial/${MCA_SLUG}`;
  const HIT_ZERO_BILLING_URL = `${HIT_ZERO_URL}/#billing`;

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

  // Edge-function call for public intake (lead + registration). Anon-direct
  // PostgREST inserts are blocked at the Supabase project level, so we go
  // through public-intake-v1 which uses service role + server-side validation.
  async function intake(payload) {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/public-intake-v1`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    let data = null;
    try { data = await res.json(); } catch (_) {}
    if (!res.ok || !data?.ok) {
      const msg = data?.message || `intake failed (${res.status})`;
      const err = new Error(msg);
      err.status = res.status;
      err.code = data?.code;
      err.detail = data;
      throw err;
    }
    return data;
  }

  async function getProgram(slug) {
    const s = slug || MCA_SLUG;
    const rows = await rest(`/program_public_directory?slug=eq.${encodeURIComponent(s)}&select=*&limit=1`);
    return (rows && rows[0]) || null;
  }

  // Marketing tracks (the 6 cards on the Programs page).
  async function getTracks(slug) {
    const s = slug || MCA_SLUG;
    return (await rest(`/public_program_tracks?program_slug=eq.${encodeURIComponent(s)}&select=*&order=display_order.asc`)) || [];
  }

  // Priced offerings under the tracks (the Pricing page rows).
  async function getClasses(slug) {
    const s = slug || MCA_SLUG;
    return (await rest(`/public_program_classes?program_slug=eq.${encodeURIComponent(s)}&select=*&order=display_order.asc`)) || [];
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
        kind: 'lead',
        program_slug: MCA_SLUG,
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
    return intake(body);
  }

  async function submitRegistration(payload) {
    const body = Object.assign(
      {
        kind: 'registration',
        program_slug: MCA_SLUG,
        source: payload.source || 'public_website',
      },
      payload
    );
    return intake(body);
  }

  // Run UTM capture on initial load so the first inserted lead carries it
  // even if the user navigates internally before submitting.
  if (typeof window !== 'undefined') captureSourceContext();

  window.HZ = {
    SUPABASE_URL,
    MCA_PROGRAM_ID,
    MCA_SLUG,
    HIT_ZERO_URL,
    HIT_ZERO_TRIAL_URL,
    HIT_ZERO_BILLING_URL,
    getProgram,
    getTracks,
    getClasses,
    getActiveRegistrationWindows,
    submitLead,
    submitRegistration,
    captureSourceContext,
  };
})();
