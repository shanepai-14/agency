import { ArrowRight } from 'lucide-react';
import InquiryForm from '../components/forms/InquiryForm';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Icon from '../components/ui/Icon';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import { Section } from '../components/ui/Layout';
import { CheckList, NumberedSteps } from '../components/ui/Lists';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import { ownerBenefits, ownerServices } from '../data/content';
import { contact, site } from '../data/site';

const workingSteps = [
  { title: 'Tell us what you need', text: 'Ranks, vessel types, trading area, timeline and any specific requirements.' },
  { title: 'We shortlist candidates', text: 'Screened and verified profiles, sent to you for review.' },
  { title: 'You select and we deliver', text: 'We handle contracts, documents and travel through to joining.' },
];

export default function ShipOwners() {
  return (
    <>
      <Seo
        title="For Ship Owners"
        description={`Crew sourcing, screening and crew management for European ship owners and operators. Send an inquiry to ${site.name}.`}
      />
      <PageHero
        eyebrow="For ship owners"
        title="Qualified crew, carefully screened"
        intro="We support European ship owners and operators with reliable crew sourcing, thorough screening and flexible crew management."
        breadcrumbs={[{ label: 'For Ship Owners' }]}
      >
        <Button href="#inquiry" size="lg">
          Send an inquiry
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </Button>
      </PageHero>

      {/* Services */}
      <Section>
        <SectionHeading eyebrow="Services" title="How we support your fleet" />
        <div className="grid gap-5 lg:grid-cols-3">
          {ownerServices.map((service, i) => (
            <Card key={service.title} hover delay={i * 0.08} className="flex flex-col">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                <Icon name={service.icon} className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{service.text}</p>
              <CheckList items={service.points} className="mt-6 border-t border-slate-100 pt-6 text-sm" />
            </Card>
          ))}
        </div>
      </Section>

      {/* How we work + benefits */}
      <Section bg="mist">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="How we work" title="A simple, transparent process" />
            <NumberedSteps steps={workingSteps} layout="timeline" />
          </div>
          <div>
            <Reveal>
              <ImagePlaceholder label="officers on the bridge" className="aspect-[4/3]" />
            </Reveal>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {ownerBenefits.map((b, i) => (
                <Reveal
                  as="li"
                  key={b.title}
                  delay={i * 0.06}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <Icon name={b.icon} className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm font-semibold text-navy">{b.title}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Inquiry form */}
      <Section id="inquiry" className="scroll-mt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Inquiry"
              title="Tell us about your crewing needs"
              intro="Send us your requirements and we will get back to you to discuss how we can help."
            />
            <Reveal className="space-y-2 text-slate-600">
              <p>Prefer to talk directly?</p>
              <p>
                <a href={contact.phoneHref} className="link">
                  {contact.phone}
                </a>
              </p>
              <p>
                <a href={contact.emailHref} className="link">
                  {contact.ownersEmail}
                </a>
              </p>
            </Reveal>
          </div>
          <Reveal className="rounded-card border border-slate-200 bg-white p-5 sm:p-8">
            <InquiryForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
