import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, ShieldCheck, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import { IconCard } from '../components/ui/Card';
import CtaBanner from '../components/ui/CtaBanner';
import Icon from '../components/ui/Icon';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import { Container, Section } from '../components/ui/Layout';
import { NumberedSteps } from '../components/ui/Lists';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import { processSteps, whyChooseUs } from '../data/content';
import { rankCategories } from '../data/ranks';
import { site } from '../data/site';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Home() {
  return (
    <>
      <Seo description={site.description} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pb-20 pt-32 sm:pt-40 lg:pb-28 lg:pt-44">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <motion.p {...fadeUp(0)} className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-orange-300">
              Seafarer recruitment &amp; crew placement
            </motion.p>
            <motion.h1
              {...fadeUp(0.08)}
              className="text-[2.6rem] font-semibold leading-[1.05] text-white sm:text-6xl lg:text-[4.1rem]"
            >
              Your next contract with a European ship owner starts here.
            </motion.h1>
            <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100 sm:text-xl">
              {site.name} places qualified officers, ratings and galley crew on vessels operated by European ship
              owners. Apply once, and our crewing team will match you with suitable positions.
            </motion.p>
            <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to="/apply" size="lg">
                Apply now
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </Button>
              <Button to="/vacancies" variant="ghostLight" size="lg">
                View vacancies
              </Button>
            </motion.div>
            <motion.ul
              {...fadeUp(0.32)}
              className="mt-10 flex flex-col gap-3 text-sm text-navy-100 sm:flex-row sm:flex-wrap sm:gap-x-6"
            >
              <li className="flex items-center gap-2">
                <ShieldCheck aria-hidden="true" className="h-5 w-5 text-orange-300" />
                No fees for seafarers
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck aria-hidden="true" className="h-5 w-5 text-orange-300" />
                Licence {site.licence}
              </li>
              <li className="flex items-center gap-2">
                <Scale aria-hidden="true" className="h-5 w-5 text-orange-300" />
                MLC, 2006 compliant
              </li>
            </motion.ul>
          </div>
          <motion.div {...fadeUp(0.2)}>
            <ImagePlaceholder dark label="vessel at sea" className="aspect-[4/3] lg:aspect-[4/5]" />
          </motion.div>
        </Container>
      </section>

      {/* Intro */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <ImagePlaceholder label="crew working on deck" className="aspect-[4/3]" />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="About the agency"
              title="A crewing partner that treats seafarers as professionals"
              className="!mb-6"
            />
            <Reveal className="space-y-4 text-lg leading-relaxed text-slate-600">
              <p>
                We connect experienced and motivated seafarers with ship owners in Europe who value safety, competence
                and fair employment. Every candidate is personally reviewed by our crewing team before being put
                forward.
              </p>
              <p>
                From your first application to sign-off, you have a direct contact at our office, and your family knows
                who to call.
              </p>
              <Link to="/about" className="link inline-flex min-h-[44px] items-center gap-2">
                More about us
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Ranks preview */}
      <Section bg="mist">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Ranks we recruit"
            title="Positions across every department"
            intro="We recruit for deck, engine, ratings and galley positions on a wide range of vessel types."
          />
          <Reveal className="mb-10 shrink-0 sm:mb-12">
            <Button to="/positions" variant="outline">
              All positions
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rankCategories.map((cat, index) => (
            <Reveal key={cat.id} delay={index * 0.08}>
              <Link
                to={`/positions#${cat.id}`}
                className="group flex h-full flex-col rounded-card border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-lg hover:shadow-navy/5"
              >
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                  <Icon name={cat.icon} className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold">{cat.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {cat.ranks
                    .slice(0, 4)
                    .map((r) => r.title)
                    .join(' · ')}
                  {cat.ranks.length > 4 ? ' · …' : ''}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                  View requirements
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading
          eyebrow="How it works"
          title="Three steps to your next vessel"
          intro="A clear, straightforward process with no fees and no surprises."
          align="center"
        />
        <NumberedSteps steps={processSteps} />
        <Reveal className="mt-10 text-center">
          <Link to="/how-to-apply" className="link inline-flex min-h-[44px] items-center gap-2">
            See the full application process
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>
      </Section>

      {/* Why choose us */}
      <Section bg="mist">
        <SectionHeading eyebrow="Why choose us" title={`Why seafarers work with ${site.name}`} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, index) => (
            <IconCard key={item.title} icon={item.icon} title={item.title} text={item.text} delay={index * 0.08} />
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
