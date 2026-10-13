import { useId, useRef } from 'react';

/**
 * Accessible tabs (WAI-ARIA pattern, arrow-key navigation).
 * `tabs`: [{ id, label, content }]. Controlled via `value` / `onChange`.
 */
export default function Tabs({ tabs, value, onChange, label }) {
  const baseId = useId();
  const tabRefs = useRef([]);

  const handleKeyDown = (event, index) => {
    let next = null;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== null) {
      event.preventDefault();
      onChange(tabs[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="mb-8 inline-flex w-full rounded-xl border border-slate-200 bg-mist p-1 sm:w-auto"
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === value;
          return (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[index] = el)}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`min-h-[44px] flex-1 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors sm:flex-none sm:px-6 ${
                selected ? 'bg-navy text-white shadow-sm' : 'text-slate-600 hover:text-navy'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== value}
          tabIndex={0}
          className="focus-visible:ring-offset-4"
        >
          {tab.id === value && tab.content}
        </div>
      ))}
    </div>
  );
}
