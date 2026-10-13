import { ArrowLeft, ArrowRight, Clock, Ship } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import { Section } from '../components/ui/Layout';
import { Badge, CheckList } from '../components/ui/Lists';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import { getRankById } from '../data/ranks';
import { getVacancyById } from '../data/vacancies';
import { formatDate } from '../lib/utils';
import NotFound from './NotFound';

export default function VacancyDetail() {
  const { id } = useParams();
  const vacancy = getVacancyById(id);

  if (!vacancy) return <NotFound />;

  // Pre-select the rank in the application form via the query string
  const applyHref = `/apply?position=${vacancy.rankId}&vacancy=${vacancy.id}`;

  const details = [
    { label: 'Rank', value: getRankById(vacancy.rankId)?.title ?? vacancy.title },
    { label: 'Vessel type', value: vacancy.vesselType },
    { label: 'Vessel', value: vacancy.vesselDetails },
    { label: 'Contract', value: vacancy.contractLabel },
    { label: 'Joining', value: vacancy.joining },
    { label: 'Trading area', value: vacancy.tradingArea },
    { label: 'Salary', value: vacancy.salary },
    { label: 'Posted', value: formatDate(vacancy.posted) },
  ];

  return (
    <>
      <Seo
        title={`${vacancy.title} – ${vacancy.vesselType}`}
        description={`${vacancy.title} vacancy on a ${vacancy.vesselType}. ${vacancy.summary}`}
      />
      <PageHero
        title={vacancy.title}
        intro={vacancy.summary}
        breadcrumbs={[{ label: 'Vacancies', to: '/vacancies' }, { label: vacancy.title }]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="white">
            <Ship aria-hidden="true" className="h-3.5 w-3.5" />
            {vacancy.vesselType}
          </Badge>
          <Badge tone="white">
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            {vacancy.contractLabel}
          </Badge>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="space-y-12">
            <Reveal>
              <h2 className="mb-5 text-2xl font-semibold">Responsibilities</h2>
              <CheckList items={vacancy.responsibilities} />
            </Reveal>
            <Reveal>
              <h2 className="mb-5 text-2xl font-semibold">Requirements</h2>
              <CheckList items={vacancy.requirements} />
            </Reveal>
            <Reveal className="rounded-card bg-mist p-6 sm:p-8">
              <h2 className="text-xl font-semibold">How to apply</h2>
              <p className="mt-2 leading-relaxed text-slate-600">
                Click the button to open the application form with this position pre-selected. Have your CV ready (PDF,
                DOC or DOCX) and, if possible, scans of your certificates.
              </p>
              <Button to={applyHref} size="lg" className="mt-6">
                Apply for this position
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </Button>
            </Reveal>
            <Link to="/vacancies" className="link inline-flex min-h-[44px] items-center gap-2">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Back to all vacancies
            </Link>
          </div>

          <aside aria-label="Vacancy details">
            <Reveal className="rounded-card border border-slate-200 bg-white p-6 lg:sticky lg:top-28 sm:p-7">
              <h2 className="mb-2 text-lg font-semibold">Position details</h2>
              <dl className="divide-y divide-slate-100">
                {details.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 py-3 text-sm">
                    <dt className="text-slate-500">{row.label}</dt>
                    <dd className="text-right font-semibold text-navy">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <Button to={applyHref} size="lg" className="mt-6 w-full">
                Apply for this position
              </Button>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  );
}
