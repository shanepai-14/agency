import { Image } from 'lucide-react';

/**
 * Neutral image placeholder. Replace with a real <img> (with alt text) later.
 * `label` is shown visually and used as the accessible name.
 */
export default function ImagePlaceholder({ label, className = '', dark = false }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`flex items-center justify-center rounded-card border-2 border-dashed p-6 text-center ${
        dark ? 'border-white/20 bg-white/5 text-navy-100' : 'border-slate-300 bg-slate-100 text-slate-500'
      } ${className}`}
    >
      <div className="flex flex-col items-center gap-3">
        <Image aria-hidden="true" className="h-8 w-8 opacity-70" strokeWidth={1.5} />
        <span className="text-sm font-medium">[Photo: {label}]</span>
      </div>
    </div>
  );
}
