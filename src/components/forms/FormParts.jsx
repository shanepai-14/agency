import { motion } from 'framer-motion';
import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react';
import { forwardRef } from 'react';
import Button from '../ui/Button';

/**
 * Hidden honeypot field for spam protection. Humans never see it;
 * bots that fill every input get silently ignored (see services/api.js).
 */
export const Honeypot = forwardRef(function Honeypot(props, ref) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input ref={ref} id="website" type="text" tabIndex={-1} autoComplete="off" {...props} />
    </div>
  );
});

/** Submit button with loading state. */
export function SubmitButton({ loading, children, loadingText = 'Sending…', className = '' }) {
  return (
    <Button type="submit" size="lg" disabled={loading} aria-busy={loading} className={className}>
      {loading && <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />}
      {loading ? loadingText : children}
    </Button>
  );
}

/** Error banner shown when a submission fails. */
export function FormAlert({ title = 'Something went wrong', message }) {
  if (!message) return null;
  return (
    <div role="alert" className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
      <CircleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm">{message}</p>
      </div>
    </div>
  );
}

/** Success panel shown after a successful submission. */
export function FormSuccess({ title, children, actions }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      role="status"
      className="rounded-card border border-slate-200 bg-white p-8 text-center sm:p-12"
    >
      <span className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        <CircleCheck aria-hidden="true" className="h-8 w-8" />
      </span>
      <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
      <div className="mx-auto mt-4 max-w-lg leading-relaxed text-slate-600">{children}</div>
      {actions && <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">{actions}</div>}
    </motion.div>
  );
}

/** Progress indicator for multi-step forms. */
export function StepIndicator({ steps, current }) {
  const progress = ((current + 1) / steps.length) * 100;
  return (
    <nav aria-label="Application progress" className="mb-10">
      <p className="mb-3 text-sm font-semibold text-navy sm:hidden">
        Step {current + 1} of {steps.length}: {steps[current].title}
      </p>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 sm:hidden" aria-hidden="true">
        <motion.div className="h-full rounded-full bg-accent" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>
      <ol className="hidden grid-cols-4 gap-3 sm:grid">
        {steps.map((step, index) => {
          const done = index < current;
          const active = index === current;
          return (
            <li key={step.id} aria-current={active ? 'step' : undefined}>
              <div className={`h-1.5 rounded-full transition-colors duration-300 ${done || active ? 'bg-accent' : 'bg-slate-200'}`} />
              <p className={`mt-3 text-sm font-semibold ${active ? 'text-navy' : done ? 'text-slate-700' : 'text-slate-500'}`}>
                <span className="mr-1.5 font-heading">{index + 1}.</span>
                {step.title}
                {done && <span className="sr-only"> (completed)</span>}
              </p>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
