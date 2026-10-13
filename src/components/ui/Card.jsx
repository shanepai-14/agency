import Icon from './Icon';
import Reveal from './Reveal';

/** Base card with optional hover lift. */
export function Card({ className = '', hover = false, children, as = 'div', delay = 0 }) {
  return (
    <Reveal
      as={as}
      delay={delay}
      className={`rounded-card border border-slate-200 bg-white p-6 sm:p-7 ${
        hover ? 'transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-lg hover:shadow-navy/5' : ''
      } ${className}`}
    >
      {children}
    </Reveal>
  );
}

/** Card with a line icon, title and text. */
export function IconCard({ icon, title, text, children, delay = 0, className = '' }) {
  return (
    <Card hover delay={delay} className={className}>
      <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      {text && <p className="mt-2 leading-relaxed text-slate-600">{text}</p>}
      {children}
    </Card>
  );
}
