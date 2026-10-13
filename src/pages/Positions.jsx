import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/layout/Seo';
import CtaBanner from '../components/ui/CtaBanner';
import Icon from '../components/ui/Icon';
import { Container, Section } from '../components/ui/Layout';
import { CheckList } from '../components/ui/Lists';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import { rankCategories } from '../data/ranks';
import { useScrollToHash } from '../lib/utils';

export default function Positions() {
  useScrollToHash();

  return (
    <>
      <Seo
        title="Positions"
        description="Deck officers, engine officers, ratings and galley staff – the ranks we recruit for and their typical requirements."
      />
      <PageHero
        eyebrow="Positions"
        title="Ranks we recruit for"
        intro="Typical requirements by rank. Exact requirements depend on the vessel type, flag and ship owner and are stated in each vacancy."
        breadcrumbs={[{ label: 'Positions' }]}
      />

      {/* In-page navigation */}
      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <Container>
          <nav aria-label="Departments" className="-mx-1 flex gap-1 overflow-x-auto py-2">
            {rankCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex min-h-[44px] shrink-0 items-center rounded-lg px-4 text-sm font-semibold text-slate-600 transition-colors hover:bg-navy-50 hover:text-navy"
              >
                {cat.title}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      {rankCategories.map((cat, catIndex) => (
        <Section
          key={cat.id}
          id={cat.id}
          bg={catIndex % 2 === 0 ? 'white' : 'mist'}
          className="scroll-mt-32"
          aria-labelledby={`${cat.id}-heading`}
        >
          <Reveal className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
              <Icon name={cat.icon} className="h-7 w-7" />
            </span>
            <div className="max-w-2xl">
              <h2 id={`${cat.id}-heading`} className="text-3xl font-semibold">
                {cat.title}
              </h2>
              <p className="mt-2 text-lg text-slate-600">{cat.summary}</p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cat.ranks.map((rank, i) => (
              <Reveal
                key={rank.id}
                delay={(i % 3) * 0.06}
                className="flex flex-col rounded-card border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-navy/5"
              >
                <h3 className="text-lg font-semibold">{rank.title}</h3>
                <p className="mb-3 mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Typical requirements
                </p>
                <CheckList items={rank.requirements} className="flex-1 text-sm" />
                <Link
                  to={`/apply?position=${rank.id}`}
                  className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 self-start rounded text-sm font-semibold text-accent hover:text-accent-hover"
                >
                  Apply as {rank.title}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      ))}

      <CtaBanner
        title="Don't see your rank?"
        text="Send a general application and we will contact you when a suitable position becomes available."
      />
    </>
  );
}
