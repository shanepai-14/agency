import Seo from '../components/layout/Seo';
import { Section } from '../components/ui/Layout';
import PageHero from '../components/ui/PageHero';
import { privacy } from '../data/privacy';
import { site } from '../data/site';

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy" description={`How ${site.name} collects, uses and protects your personal data.`} />
      <PageHero title="Privacy Policy" intro={`Last updated: ${privacy.lastUpdated}`} breadcrumbs={[{ label: 'Privacy Policy' }]} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          {/* Table of contents */}
          <nav aria-label="Contents" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">Contents</h2>
            <ol className="space-y-1 text-sm">
              {privacy.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#section-${i}`} className="inline-flex min-h-[36px] items-center rounded text-slate-600 hover:text-navy">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="max-w-3xl">
            {privacy.sections.map((s, i) => (
              <section key={s.heading} id={`section-${i}`} className="scroll-mt-28 border-b border-slate-200 py-8 first:pt-0 last:border-0">
                <h2 className="text-2xl font-semibold">{s.heading}</h2>
                <div className="mt-4 space-y-4 leading-relaxed text-slate-600">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>
        </div>
      </Section>
    </>
  );
}
