import { ArrowRight, Check, Circle } from 'lucide-react';
import Seo from '../components/layout/Seo';
import Accordion from '../components/ui/Accordion';
import Button from '../components/ui/Button';
import CtaBanner from '../components/ui/CtaBanner';
import { Section } from '../components/ui/Layout';
import { NumberedSteps } from '../components/ui/Lists';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import { applicationSteps, requiredDocuments } from '../data/content';
import { faqs } from '../data/faqs';

export default function HowToApply() {
  const featuredFaqs = faqs.seafarers.filter((f) => f.featured);

  return (
    <>
      <Seo
        title="How to Apply"
        description="Step-by-step guide to applying with us, the documents you need (CV, COC, STCW, seaman's book, passport, medical) and common questions."
      />
      <PageHero
        eyebrow="How to apply"
        title="Applying takes about 10 minutes"
        intro="Here is what happens from the moment you send your application until you join your vessel."
        breadcrumbs={[{ label: 'How to Apply' }]}
      >
        <Button to="/apply" size="lg">
          Start your application
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </Button>
      </PageHero>

      {/* Steps */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            eyebrow="The process"
            title="Step by step"
            intro="We keep you informed at every stage. You will always know who to contact and what happens next."
          />
          <NumberedSteps steps={applicationSteps} layout="timeline" />
        </div>
      </Section>

      {/* Documents checklist */}
      <Section bg="mist">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            eyebrow="Checklist"
            title="Documents checklist"
            intro="Only your CV is required to apply. Having scans of your other documents ready speeds up the process."
          />
          <Reveal>
            <ul className="divide-y divide-slate-200 rounded-card border border-slate-200 bg-white">
              {requiredDocuments.map((doc) => (
                <li key={doc.title} className="flex gap-4 p-5 sm:p-6">
                  <span
                    className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      doc.required ? 'bg-accent text-white' : 'border-2 border-slate-300 text-transparent'
                    }`}
                  >
                    {doc.required ? (
                      <Check aria-hidden="true" className="h-4 w-4" strokeWidth={3} />
                    ) : (
                      <Circle aria-hidden="true" className="h-2 w-2" />
                    )}
                  </span>
                  <div>
                    <h3 className="font-semibold">
                      {doc.title}{' '}
                      <span className={`text-sm font-medium ${doc.required ? 'text-accent' : 'text-slate-500'}`}>
                        ({doc.required ? 'required' : 'recommended'})
                      </span>
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{doc.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              Accepted formats: CV as PDF, DOC or DOCX (max 5 MB). Certificates as PDF, JPG or PNG (max 5 MB each).
            </p>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading eyebrow="FAQ" title="Common questions" intro="More answers on our FAQ page." />
          <Reveal>
            <Accordion items={featuredFaqs} />
            <Button to="/faq" variant="outline" className="mt-6">
              View all FAQs
            </Button>
          </Reveal>
        </div>
      </Section>

      <CtaBanner title="Ready to apply?" primary={{ label: 'Start your application', to: '/apply' }} />
    </>
  );
}
