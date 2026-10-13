import { ArrowRight, FileText } from 'lucide-react';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import { IconCard } from '../components/ui/Card';
import CtaBanner from '../components/ui/CtaBanner';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import { Section } from '../components/ui/Layout';
import { NumberedSteps } from '../components/ui/Lists';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import { requiredDocuments, seafarerOffer } from '../data/content';
import { contact } from '../data/site';

export default function Seafarers() {
  return (
    <>
      <Seo
        title="For Seafarers"
        description="Contracts with European ship owners, support for crew and families, clear onboarding and no recruitment fees."
      />
      <PageHero
        eyebrow="For seafarers"
        title="Work with ship owners who value their crew"
        intro="Fair contracts, honest communication and support for you and your family – before, during and after every contract."
        breadcrumbs={[{ label: 'For Seafarers' }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/apply" size="lg">
            Apply now
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </Button>
          <Button to="/vacancies" variant="ghostLight" size="lg">
            View vacancies
          </Button>
        </div>
      </PageHero>

      {/* Contract types */}
      <Section>
        <SectionHeading
          eyebrow="Contracts"
          title="Clear contracts, agreed before you join"
          intro="Every placement comes with a Seafarer Employment Agreement that sets out your wages, contract length, working hours, leave and repatriation."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {seafarerOffer.contractTypes.map((item, i) => (
            <IconCard key={item.title} icon={item.icon} title={item.title} text={item.text} delay={i * 0.08} />
          ))}
        </div>
      </Section>

      {/* Support */}
      <Section bg="mist">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Support"
              title="Support for crew and families"
              intro="You are never on your own. Our team stays in contact throughout your contract."
            />
            <Reveal>
              <ImagePlaceholder label="seafarer calling home" className="aspect-[4/3]" />
              <p className="mt-5 text-sm text-slate-600">{contact.emergencyNote}</p>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {seafarerOffer.support.map((item, i) => (
              <IconCard key={item.title} icon={item.icon} title={item.title} text={item.text} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </Section>

      {/* Onboarding */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Onboarding"
            title="From offer to gangway"
            intro="Once you accept an offer, we take care of the preparation so you can join your vessel with confidence."
          />
          <NumberedSteps steps={seafarerOffer.onboarding} layout="timeline" />
        </div>
      </Section>

      {/* Documents */}
      <Section bg="mist">
        <SectionHeading
          eyebrow="Documents"
          title="Documents you will need"
          intro="Make sure your certificates are valid for the full contract period. Only your CV is required to apply."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {requiredDocuments.map((doc, i) => (
            <Reveal key={doc.title} delay={i * 0.05} className="flex gap-4 rounded-card border border-slate-200 bg-white p-6">
              <FileText aria-hidden="true" className="h-6 w-6 shrink-0 text-navy" strokeWidth={1.75} />
              <div>
                <h3 className="font-semibold">
                  {doc.title}
                  {doc.required && (
                    <span className="ml-2 rounded-full bg-accent-light px-2 py-0.5 align-middle text-xs font-semibold text-accent-hover">
                      Required
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{doc.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
