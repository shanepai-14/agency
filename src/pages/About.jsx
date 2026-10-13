import { Eye, Target } from 'lucide-react';
import Seo from '../components/layout/Seo';
import { Card, IconCard } from '../components/ui/Card';
import CtaBanner from '../components/ui/CtaBanner';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import { Section } from '../components/ui/Layout';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import { about } from '../data/content';
import { site } from '../data/site';

export default function About() {
  const licenceDetails = [
    { label: 'Registered name', value: site.name },
    { label: 'Licence number', value: site.licence },
    { label: 'Licensing authority', value: site.licensingAuthority },
    { label: 'Company registration', value: site.registration },
    { label: 'Established', value: site.founded },
  ];

  return (
    <>
      <Seo
        title="About Us"
        description={`Learn about ${site.name}, a licensed seafarer recruitment agency placing crew with European ship owners.`}
      />
      <PageHero
        eyebrow="About us"
        title="Connecting seafarers with responsible ship owners"
        intro="A licensed recruitment and placement agency focused on quality, fairness and long-term relationships."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Story */}
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Our story" title="Built on experience at sea and ashore" className="!mb-6" />
            <Reveal className="space-y-4 text-lg leading-relaxed text-slate-600">
              {about.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
          <Reveal>
            <ImagePlaceholder label="agency office or team" className="aspect-[4/3]" />
          </Reveal>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section bg="mist">
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="!p-8 sm:!p-10">
            <Target aria-hidden="true" className="mb-5 h-8 w-8 text-accent" strokeWidth={1.75} />
            <h2 className="text-2xl font-semibold">Our mission</h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-600">{about.mission}</p>
          </Card>
          <Card className="!p-8 sm:!p-10" delay={0.08}>
            <Eye aria-hidden="true" className="mb-5 h-8 w-8 text-accent" strokeWidth={1.75} />
            <h2 className="text-2xl font-semibold">Our vision</h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-600">{about.vision}</p>
          </Card>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeading eyebrow="Our values" title="What we stand for" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v, i) => (
            <IconCard key={v.title} icon={v.icon} title={v.title} text={v.text} delay={i * 0.08} />
          ))}
        </div>
      </Section>

      {/* Licence */}
      <Section bg="mist">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Licence & registration"
            title="Licensed recruitment and placement service"
            intro="We operate as a licensed seafarer recruitment and placement service in line with the Maritime Labour Convention, 2006."
          />
          <Reveal>
            <dl className="divide-y divide-slate-200 rounded-card border border-slate-200 bg-white px-6 sm:px-8">
              {licenceDetails.map((row) => (
                <div key={row.label} className="grid gap-1 py-5 sm:grid-cols-2 sm:gap-4">
                  <dt className="text-sm font-medium text-slate-500">{row.label}</dt>
                  <dd className="font-semibold text-navy">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* Team (optional – remove this section if not needed) */}
      <Section>
        <SectionHeading eyebrow="Our team" title="The people you will talk to" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {about.team.map((member, i) => (
            <Reveal key={`${member.role}-${i}`} delay={i * 0.08}>
              <ImagePlaceholder label="team member portrait" className="aspect-square" />
              <h3 className="mt-5 text-lg font-semibold">{member.name}</h3>
              <p className="text-slate-600">{member.role}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
