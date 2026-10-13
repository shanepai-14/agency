import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Search, Ship, X } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import CtaBanner from '../components/ui/CtaBanner';
import { Section } from '../components/ui/Layout';
import { Badge } from '../components/ui/Lists';
import PageHero from '../components/ui/PageHero';
import { allRanks } from '../data/ranks';
import { vacancies } from '../data/vacancies';
import { contractLengths, vesselTypes } from '../data/vesselTypes';
import { formatDate } from '../lib/utils';

/** Only offer rank filters that have at least one listing, in rank order. */
const rankOptions = allRanks.filter((rank) => vacancies.some((v) => v.rankId === rank.id));

function FilterSelect({ id, label, value, onChange, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-navy">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block min-h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-navy transition-colors hover:border-slate-400"
      >
        {children}
      </select>
    </div>
  );
}

export function VacancyCard({ vacancy }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
    >
      <article className="group relative flex h-full flex-col rounded-card border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-lg hover:shadow-navy/5 sm:p-7">
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge>
            <Ship aria-hidden="true" className="h-3.5 w-3.5" />
            {vacancy.vesselType}
          </Badge>
          <Badge>
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            {vacancy.contractLabel}
          </Badge>
        </div>
        <h2 className="text-xl font-semibold">
          {/* Stretched link: the whole card is clickable */}
          <Link to={`/vacancies/${vacancy.id}`} className="rounded after:absolute after:inset-0 after:rounded-card">
            {vacancy.title}
          </Link>
        </h2>
        <p className="mt-2 flex-1 leading-relaxed text-slate-600">{vacancy.summary}</p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4 text-sm">
          <span className="flex items-center gap-1.5 text-slate-500">
            <Calendar aria-hidden="true" className="h-4 w-4" />
            Posted <time dateTime={vacancy.posted}>{formatDate(vacancy.posted)}</time>
          </span>
          <span aria-hidden="true" className="inline-flex items-center gap-1 font-semibold text-navy">
            Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </motion.li>
  );
}

export default function Vacancies() {
  // Filters live in the URL so filtered views can be shared and survive "back"
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const rank = params.get('rank') ?? '';
  const vessel = params.get('vessel') ?? '';
  const contract = params.get('contract') ?? '';

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const clearFilters = () => setParams({}, { replace: true });
  const hasFilters = Boolean(query || rank || vessel || contract);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const bucket = contractLengths.find((c) => c.id === contract);
    return vacancies
      .filter((v) => !rank || v.rankId === rank)
      .filter((v) => !vessel || v.vesselType === vessel)
      .filter((v) => !bucket || bucket.test(v.contractMonths))
      .filter(
        (v) =>
          !q ||
          [v.title, v.vesselType, v.summary, v.tradingArea, ...v.requirements].join(' ').toLowerCase().includes(q),
      )
      .sort((a, b) => b.posted.localeCompare(a.posted));
  }, [query, rank, vessel, contract]);

  return (
    <>
      <Seo
        title="Vacancies"
        description="Current vacancies for officers, ratings and galley crew on vessels operated by European ship owners."
      />
      <PageHero
        eyebrow="Vacancies"
        title="Current vacancies"
        intro="Browse open positions and apply online. If there is no listing for your rank, you can still send a general application."
        breadcrumbs={[{ label: 'Vacancies' }]}
      />

      <Section bg="mist" className="!pt-10 sm:!pt-12">
        {/* Filters */}
        <div role="search" aria-label="Filter vacancies" className="mb-8 rounded-card border border-slate-200 bg-white p-5 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <label htmlFor="vacancy-search" className="mb-2 block text-sm font-semibold text-navy">
                Search
              </label>
              <div className="relative">
                <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="vacancy-search"
                  type="search"
                  value={query}
                  onChange={(e) => updateParam('q', e.target.value)}
                  placeholder="Rank, vessel, keyword…"
                  className="block min-h-[48px] w-full rounded-lg border border-slate-300 bg-white py-3 pl-12 pr-4 text-navy placeholder:text-slate-400 hover:border-slate-400"
                />
              </div>
            </div>
            <FilterSelect id="filter-rank" label="Rank" value={rank} onChange={(v) => updateParam('rank', v)}>
              <option value="">All ranks</option>
              {rankOptions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect id="filter-vessel" label="Vessel type" value={vessel} onChange={(v) => updateParam('vessel', v)}>
              <option value="">All vessel types</option>
              {vesselTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect
              id="filter-contract"
              label="Contract length"
              value={contract}
              onChange={(v) => updateParam('contract', v)}
            >
              <option value="">Any length</option>
              {contractLengths.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </FilterSelect>
          </div>
        </div>

        <div className="mb-6 flex min-h-[44px] items-center justify-between gap-4">
          <p aria-live="polite" className="font-medium text-slate-600">
            {results.length} {results.length === 1 ? 'vacancy' : 'vacancies'} found
          </p>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X aria-hidden="true" className="h-4 w-4" />
              Clear filters
            </Button>
          )}
        </div>

        {results.length > 0 ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {results.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <div className="rounded-card border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <h2 className="text-xl font-semibold">No vacancies match your search</h2>
            <p className="mx-auto mt-2 max-w-md text-slate-600">
              Try different filters, or send a general application and we will contact you when a suitable position
              opens.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
              <Button to="/apply">Send a general application</Button>
            </div>
          </div>
        )}
      </Section>

      <CtaBanner
        title="No suitable vacancy right now?"
        text="Many positions are filled before they are advertised. Send a general application so we can contact you first."
        primary={{ label: 'Send a general application', to: '/apply' }}
        secondary={{ label: 'How to apply', to: '/how-to-apply' }}
      />
    </>
  );
}
