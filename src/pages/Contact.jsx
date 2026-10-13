import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import ContactForm from '../components/forms/ContactForm';
import Seo from '../components/layout/Seo';
import { Section } from '../components/ui/Layout';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import { contact, site } from '../data/site';

function ContactItem({ icon: IconComponent, title, children }) {
  return (
    <div className="flex gap-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
        <IconComponent aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{title}</h2>
        <div className="mt-1 text-navy">{children}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <Seo title="Contact" description={`Contact ${site.name}: address, phone, email, WhatsApp and office hours.`} />
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="Questions about an application, a vacancy or our services? We are here to help."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          {/* Details */}
          <Reveal className="space-y-7">
            <ContactItem icon={MapPin} title="Office">
              <address className="not-italic">
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </ContactItem>
            <ContactItem icon={Phone} title="Phone">
              <a href={contact.phoneHref} className="link">
                {contact.phone}
              </a>
            </ContactItem>
            <ContactItem icon={MessageCircle} title="WhatsApp">
              <a href={contact.whatsappHref} className="link" target="_blank" rel="noopener noreferrer">
                {contact.whatsapp}
              </a>
            </ContactItem>
            <ContactItem icon={Mail} title="Email">
              <a href={contact.emailHref} className="link">
                {contact.email}
              </a>
              <p className="mt-1 text-sm text-slate-600">Crew: {contact.crewEmail}</p>
              <p className="text-sm text-slate-600">Ship owners: {contact.ownersEmail}</p>
            </ContactItem>
            <ContactItem icon={Clock} title="Office hours">
              <dl className="space-y-1">
                {contact.hours.map((h) => (
                  <div key={h.days} className="flex gap-4">
                    <dt className="w-36 text-slate-600">{h.days}</dt>
                    <dd className="font-medium">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm text-slate-600">{contact.emergencyNote}</p>
            </ContactItem>
          </Reveal>

          {/* Form */}
          <Reveal className="rounded-card border border-slate-200 bg-white p-5 sm:p-8">
            <h2 className="mb-6 text-2xl font-semibold">Send us a message</h2>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      {/* Map placeholder – replace with an embedded map (e.g. Google Maps / OpenStreetMap iframe) */}
      <section aria-label="Map" className="bg-mist">
        <div
          role="img"
          aria-label="Placeholder: map showing the office location"
          className="flex h-80 items-center justify-center border-y-2 border-dashed border-slate-300 bg-slate-100 text-slate-500 sm:h-96"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            <MapPin aria-hidden="true" className="h-5 w-5" />
            [Map: office location]
          </span>
        </div>
      </section>
    </>
  );
}
