import { Anchor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '../../data/site';

/** Text logo placeholder – replace with an <img> or inline SVG of the real logo. */
export default function Logo({ light = false, compact = false }) {
  return (
    <Link to="/" className="inline-flex min-h-[44px] items-center gap-2.5 rounded-lg" aria-label={`${site.name} – home`}>
      <span
        className={`inline-flex items-center justify-center rounded-lg transition-all duration-300 ${
          compact ? 'h-9 w-9' : 'h-10 w-10'
        } ${light ? 'bg-white text-navy' : 'bg-navy text-white'}`}
      >
        <Anchor aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className={`font-heading text-lg font-semibold tracking-tight ${light ? 'text-white' : 'text-navy'}`}>
        {site.name}
      </span>
    </Link>
  );
}
