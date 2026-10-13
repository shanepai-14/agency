import { CircleAlert } from 'lucide-react';
import { forwardRef } from 'react';

export const inputClasses = (hasError) =>
  `block min-h-[48px] w-full rounded-lg border bg-white px-4 py-3 text-navy placeholder:text-slate-400 transition-colors hover:border-slate-400 ${
    hasError ? 'border-red-600' : 'border-slate-300'
  }`;

/** Inline error message linked to its field through aria-describedby. */
export function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-700">
      <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}

/** Label + hint + error wrapper shared by all fields. */
export function FieldWrapper({ id, label, required, hint, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-navy">
        {label}
        {required ? (
          <span className="ml-0.5 text-accent" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-slate-500">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-slate-500">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

/** Builds accessibility props for an input from its error/hint state. */
const a11yProps = (id, error, hint, required) => ({
  'aria-invalid': error ? 'true' : 'false',
  'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  'aria-required': required || undefined,
});

/** Text / email / tel / date input. Spread `register('name')` onto it. */
export const TextField = forwardRef(function TextField(
  { id, label, required, hint, error, className, type = 'text', ...props },
  ref,
) {
  return (
    <FieldWrapper id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <input ref={ref} id={id} type={type} className={inputClasses(error)} {...a11yProps(id, error, hint, required)} {...props} />
    </FieldWrapper>
  );
});

/** Native select. `options`: array of strings or { value, label }; `groups` for <optgroup>s. */
export const SelectField = forwardRef(function SelectField(
  { id, label, required, hint, error, className, options = [], groups, placeholder = 'Select…', ...props },
  ref,
) {
  const renderOption = (opt) => {
    const value = typeof opt === 'string' ? opt : opt.value;
    const text = typeof opt === 'string' ? opt : opt.label;
    return (
      <option key={value} value={value}>
        {text}
      </option>
    );
  };
  return (
    <FieldWrapper id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <select
        ref={ref}
        id={id}
        className={`${inputClasses(error)} appearance-none bg-[length:20px] bg-[right_0.85rem_center] bg-no-repeat pr-11`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230B2540' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        }}
        {...a11yProps(id, error, hint, required)}
        {...props}
      >
        <option value="">{placeholder}</option>
        {groups
          ? groups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map(renderOption)}
              </optgroup>
            ))
          : options.map(renderOption)}
      </select>
    </FieldWrapper>
  );
});

export const TextareaField = forwardRef(function TextareaField(
  { id, label, required, hint, error, className, rows = 5, ...props },
  ref,
) {
  return (
    <FieldWrapper id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={`${inputClasses(error)} resize-y`}
        {...a11yProps(id, error, hint, required)}
        {...props}
      />
    </FieldWrapper>
  );
});

/** Checkbox with rich label content (e.g. a link to the privacy policy). */
export const CheckboxField = forwardRef(function CheckboxField({ id, children, error, className = '', ...props }, ref) {
  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer rounded border-slate-400 accent-navy"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <label htmlFor={id} className="cursor-pointer leading-relaxed text-slate-700">
          {children}
        </label>
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
});
