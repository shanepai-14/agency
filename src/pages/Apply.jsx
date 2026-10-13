import { Clock, Mail, ShieldCheck } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import ApplicationForm from '../components/forms/ApplicationForm';
import Seo from '../components/layout/Seo';
import { Section } from '../components/ui/Layout';
import PageHero from '../components/ui/PageHero';
import { getVacancyById } from '../data/vacancies';
import { contact } from '../data/site';

export default function Apply() {
  // Pre-selection: /apply?position=<rankId>&vacancy=<vacancyId>
  const [params] = useSearchParams();
  const vacancy = getVacancyById(params.get('vacancy') ?? '') ?? null;
  const position = params.get('position') ?? vacancy?.rankId ?? '';

  return (
    <>
      <Seo
        title="Apply Online"
        description="Apply online with your CV and certificates. No fees for seafarers. Our crewing team reviews every application."
      />
      <PageHero
        eyebrow="Apply online"
        title={vacancy ? `Apply: ${vacancy.title}` : 'Seafarer application'}
        intro="Complete the four short steps below. Only your CV is required – you can send other documents later."
        breadcrumbs={vacancy ? [{ label: 'Vacancies', to: '/vacancies' }, { label: 'Apply' }] : [{ label: 'Apply Online' }]}
      />

      <Section bg="mist" className="!pt-10 sm:!pt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-12">
          <div className="rounded-card border border-slate-200 bg-white p-5 sm:p-8 lg:p-10">
            <ApplicationForm defaultPosition={position} vacancy={vacancy} />
          </div>

          <aside aria-label="Application help" className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-card border border-slate-200 bg-white p-6">
              <ShieldCheck aria-hidden="true" className="mb-3 h-6 w-6 text-accent" strokeWidth={1.75} />
              <h2 className="font-semibold">No fees, ever</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                We never charge seafarers for recruitment or placement.
              </p>
            </div>
            <div className="rounded-card border border-slate-200 bg-white p-6">
              <Clock aria-hidden="true" className="mb-3 h-6 w-6 text-accent" strokeWidth={1.75} />
              <h2 className="font-semibold">What happens next</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Our crewing team reviews your application and contacts you if your profile matches a position.{' '}
                <Link to="/how-to-apply" className="link">
                  See the process
                </Link>
              </p>
            </div>
            <div className="rounded-card border border-slate-200 bg-white p-6">
              <Mail aria-hidden="true" className="mb-3 h-6 w-6 text-accent" strokeWidth={1.75} />
              <h2 className="font-semibold">Need help?</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Email{' '}
                <a href={contact.emailHref} className="link">
                  {contact.crewEmail}
                </a>{' '}
                or call{' '}
                <a href={contact.phoneHref} className="link">
                  {contact.phone}
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
