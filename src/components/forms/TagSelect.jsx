import { Check } from 'lucide-react';
import { FieldError } from './FormField';

/**
 * Multi-select rendered as toggle chips. Use with react-hook-form's <Controller>.
 * `value`: string[]; `onChange(next: string[])`.
 */
export default function TagSelect({ id, label, options, value = [], onChange, onBlur, error, required, hint }) {
  const toggle = (option) => {
    const next = value.includes(option) ? value.filter((v) => v !== option) : [...value, option];
    onChange(next);
  };

  return (
    <fieldset aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}>
      <legend id={id} className="mb-2 block text-sm font-semibold text-navy">
        {label}
        {required && (
          <span className="ml-0.5 text-accent" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 mb-3 text-sm text-slate-500">
          {hint}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(option)}
              onBlur={onBlur}
              className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors ${
                selected
                  ? 'border-navy bg-navy text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-navy hover:text-navy'
              }`}
            >
              {selected && <Check aria-hidden="true" className="h-4 w-4" />}
              {option}
            </button>
          );
        })}
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </fieldset>
  );
}
