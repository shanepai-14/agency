import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Formats an ISO date (YYYY-MM-DD) as e.g. "1 Oct 2026". */
export function formatDate(iso) {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}

/**
 * Scrolls to the element matching the URL hash (e.g. /positions#engine)
 * after the page transition has finished.
 */
export function useScrollToHash(delay = 250) {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return undefined;
    const timer = setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, delay);
    return () => clearTimeout(timer);
  }, [hash, delay]);
}
