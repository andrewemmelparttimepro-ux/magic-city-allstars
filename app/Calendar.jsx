/* global React */

const MCA_CALENDAR_ID = 'c_01a6fc567e345779502548ef14721ff42467c88f5de852c01faee56cd88e6ad3@group.calendar.google.com';
const MCA_CALENDAR_SOURCE_URL = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(MCA_CALENDAR_ID)}&ctz=America%2FChicago`;
const MCA_CALENDAR_API_URL = 'https://ldhzkdqznccfgpdvqyfk.supabase.co/functions/v1/mca-calendar-v1';
const MCA_CALENDAR_CACHE_KEY = `mca-calendar:${MCA_CALENDAR_ID}:v1`;
const MCA_CALENDAR_TIMEZONE = 'America/Chicago';

function calendarCache() {
  try {
    const value = JSON.parse(localStorage.getItem(MCA_CALENDAR_CACHE_KEY) || 'null');
    return value && Array.isArray(value.events) ? value : null;
  } catch {
    return null;
  }
}

function calendarTimeAgo(value) {
  const stamp = new Date(value || '').getTime();
  if (!Number.isFinite(stamp)) return '';
  const seconds = Math.max(0, Math.round((Date.now() - stamp) / 1000));
  if (seconds < 60) return 'just now';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function calendarDateKey(value) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: MCA_CALENDAR_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value));
}

function calendarDateLabel(value) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: MCA_CALENDAR_TIMEZONE,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value));
}

function calendarTimeLabel(event) {
  if (event.allDay) return 'All day';
  const format = new Intl.DateTimeFormat('en-US', {
    timeZone: MCA_CALENDAR_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${format.format(new Date(event.start))}–${format.format(new Date(event.end))}`;
}

function CalendarEventRow({ event, showDate }) {
  return (
    <article className="mca-calendar-event">
      <div className="mca-calendar-event__when">
        {showDate && <strong>{calendarDateLabel(event.start)}</strong>}
        <span>{calendarTimeLabel(event)}</span>
      </div>
      <div className="mca-calendar-event__body">
        <h3>{event.title || 'MCA event'}</h3>
        {event.location && <div className="mca-calendar-event__location">{event.location}</div>}
        {event.description && <p>{event.description}</p>}
      </div>
    </article>
  );
}

function CalendarPage() {
  const cached = React.useMemo(calendarCache, []);
  const [calendar, setCalendar] = React.useState(cached || { events: [] });
  const [loading, setLoading] = React.useState(!cached);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState('');

  const refresh = React.useCallback(async (manual = false) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    if (manual) setRefreshing(true);
    else setLoading((current) => current || !calendar.events.length);
    try {
      const from = new Date(Date.now() - 86400000).toISOString();
      const to = new Date(Date.now() + 365 * 86400000).toISOString();
      const response = await fetch(`${MCA_CALENDAR_API_URL}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&v=${Date.now()}`, {
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !Array.isArray(data.events)) throw new Error(data.error || 'The MCA calendar did not load.');
      const next = {
        ...data,
        sourceUrl: MCA_CALENDAR_SOURCE_URL,
        events: data.events.filter((event) => new Date(event.end || event.start).getTime() >= Date.now() - 86400000),
      };
      setCalendar(next);
      localStorage.setItem(MCA_CALENDAR_CACHE_KEY, JSON.stringify(next));
      setError('');
    } catch (cause) {
      if (cause?.name !== 'AbortError') setError(cause?.message || 'The MCA calendar did not load.');
      else setError('The refresh took too long. Showing the last successful update.');
    } finally {
      clearTimeout(timeout);
      setLoading(false);
      setRefreshing(false);
    }
  }, [calendar.events.length]);

  React.useEffect(() => {
    refresh(false);
    const timer = setInterval(() => refresh(false), 5 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const visibleEvents = (calendar.events || []).slice(0, 120);
  let previousDate = '';

  return (
    <div data-calendar-source={MCA_CALENDAR_ID}>
      <section className="sec mca-calendar-hero">
        <div className="eyebrow eyebrow-teal mb-2">LIVE MCA CALENDAR</div>
        <h1 className="display" style={{ margin: 0 }}>
          Every date, <em className="grad-text">one source</em>.
        </h1>
        <p className="dim mt-4 mca-calendar-hero__copy">
          Practices, classes, events, closures, and changes are pulled from Magic City Athletics' Google Calendar. Update Google once; Hit Zero and this website follow automatically.
        </p>
        <div className="mca-calendar-actions mt-6">
          <a className="btn btn-primary" href={MCA_CALENDAR_SOURCE_URL} target="_blank" rel="noopener noreferrer">Open Google Calendar →</a>
          <button className="btn" type="button" onClick={() => refresh(true)} disabled={refreshing}>{refreshing ? 'Refreshing…' : 'Refresh now'}</button>
        </div>
      </section>

      <section className="sec-tight mca-calendar-status" aria-live="polite">
        <span className={`mca-calendar-status__dot${error ? ' is-warning' : ''}`}/>
        {error
          ? <span>{error}{visibleEvents.length ? ' Cached dates are still shown below.' : ''}</span>
          : calendar.sourceFetchedAt
            ? <span>{calendar.events.length} upcoming dates{calendar.events.length > visibleEvents.length ? ` · showing next ${visibleEvents.length}` : ''} · source refreshed {calendarTimeAgo(calendar.sourceFetchedAt)}{calendar.stale ? ' · cached copy' : ''}</span>
            : <span>Connecting to the MCA calendar…</span>}
      </section>

      <section className="sec mca-calendar-list" aria-busy={loading ? 'true' : 'false'}>
        {loading && !visibleEvents.length && <div className="card mca-calendar-empty">Loading current MCA dates…</div>}
        {!loading && !visibleEvents.length && <div className="card mca-calendar-empty">No upcoming dates are posted yet.</div>}
        {visibleEvents.map((event) => {
          const dateKey = calendarDateKey(event.start);
          const showDate = dateKey !== previousDate;
          previousDate = dateKey;
          return <CalendarEventRow key={event.id || `${event.start}:${event.title}`} event={event} showDate={showDate}/>;
        })}
      </section>
    </div>
  );
}

Object.assign(window, { CalendarPage, MCA_CALENDAR_ID, MCA_CALENDAR_SOURCE_URL });
