import { useSearchParams } from 'react-router-dom';
import Seo from '../components/layout/Seo';
import Accordion from '../components/ui/Accordion';
import CtaBanner from '../components/ui/CtaBanner';
import { Section } from '../components/ui/Layout';
import PageHero from '../components/ui/PageHero';
import Tabs from '../components/ui/Tabs';
import { faqs } from '../data/faqs';

export default function Faq() {
  // Active tab is kept in the URL (?tab=owners) so it can be linked to directly
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') === 'owners' ? 'owners' : 'seafarers';

  const tabs = [
    { id: 'seafarers', label: 'For seafarers', content: <Accordion key="seafarers" items={faqs.seafarers} /> },
    { id: 'owners', label: 'For ship owners', content: <Accordion key="owners" items={faqs.owners} /> },
  ];

  return (
    <>
      <Seo title="FAQ" description="Answers to common questions from seafarers and ship owners about applying, contracts, fees and our services." />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        intro="Can't find your answer? Contact our office and we will be happy to help."
        breadcrumbs={[{ label: 'FAQ' }]}
      />
      <Section>
        <div className="mx-auto max-w-4xl">
          <Tabs
            label="FAQ categories"
            tabs={tabs}
            value={tab}
            onChange={(id) => setParams(id === 'owners' ? { tab: 'owners' } : {}, { replace: true })}
          />
        </div>
      </Section>
      <CtaBanner
        title="Still have a question?"
        text="Our team is available during office hours by phone, email or WhatsApp."
        primary={{ label: 'Contact us', to: '/contact' }}
        secondary={{ label: 'Apply now', to: '/apply' }}
      />
    </>
  );
}
