import { Check } from 'lucide-react';
import Icon from './Icon';
import Reveal from './Reveal';

/** Simple check-mark list. */
export function CheckList({ items, className = '', light = false }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              light ? 'bg-white/10 text-orange-300' : 'bg-accent-light text-accent'
            }`}
          >
            <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <span className={light ? 'text-navy-100' : 'text-slate-700'}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Numbered steps. `layout="grid"` for horizontal cards (home), `"timeline"` for vertical.
 * `steps`: [{ title, text, icon? }]
 */
export function NumberedSteps({ steps, layout = 'grid' }) {
  if (layout === 'timeline') {
    return (
      <ol className="relative space-y-8 border-l-2 border-navy-100 pl-8 sm:pl-10">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 0.05} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[3.19rem] top-0 flex h-9 w-9 items-center justify-center rounded-full bg-navy font-heading text-sm font-semibold text-white sm:-left-[3.69rem]"
            >
              {index + 1}
            </span>
            <h3 className="text-lg font-semibold">
              <span className="sr-only">Step {index + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-1.5 max-w-2xl leading-relaxed text-slate-600">{step.text}</p>
          </Reveal>
        ))}
      </ol>
    );
  }

  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {steps.map((step, index) => (
        <Reveal
          as="li"
          key={step.title}
          delay={index * 0.1}
          className="relative rounded-card border border-slate-200 bg-white p-7"
        >
          <div className="mb-6 flex items-center justify-between">
            {step.icon && (
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                <Icon name={step.icon} className="h-6 w-6" />
              </span>
            )}
            <span aria-hidden="true" className="font-heading text-4xl font-semibold text-navy-100">
              0{index + 1}
            </span>
          </div>
          <h3 className="text-lg font-semibold">
            <span className="sr-only">Step {index + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-2 leading-relaxed text-slate-600">{step.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/** Small pill label. */
export function Badge({ children, tone = 'navy', className = '' }) {
  const tones = {
    navy: 'bg-navy-50 text-navy',
    accent: 'bg-accent-light text-accent-hover',
    white: 'bg-white/10 text-white',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
