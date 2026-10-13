import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contact, footerLinks, site } from '../../data/site';
import { Container } from '../ui/Layout';
import Logo from './Logo';

function FooterLinkList({ title, links }) {
  return (
    <div>
      <h2 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">{title}</h2>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="inline-flex min-h-[36px] items-center rounded text-navy-100 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-navy-100">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs leading-relaxed">{site.tagline}.</p>
            <p className="mt-5 text-sm">
              Licence: {site.licence}
              <br />
              Issued by {site.licensingAuthority}
            </p>
          </div>

          <FooterLinkList title="Seafarers" links={footerLinks.seafarers} />
          <FooterLinkList title="Company" links={footerLinks.company} />

          <div>
            <h2 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">Contact</h2>
            <address className="space-y-3 not-italic">
              <p className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" />
                <span>{contact.address.join(', ')}</span>
              </p>
              <a href={contact.phoneHref} className="flex min-h-[36px] items-center gap-3 rounded hover:text-white">
                <Phone aria-hidden="true" className="h-5 w-5 shrink-0 text-orange-300" />
                {contact.phone}
              </a>
              <a href={contact.whatsappHref} className="flex min-h-[36px] items-center gap-3 rounded hover:text-white">
                <MessageCircle aria-hidden="true" className="h-5 w-5 shrink-0 text-orange-300" />
                WhatsApp: {contact.whatsapp}
              </a>
              <a href={contact.emailHref} className="flex min-h-[36px] items-center gap-3 rounded hover:text-white">
                <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-orange-300" />
                {contact.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Registration: {site.registration}</p>
        </div>
      </Container>
    </footer>
  );
}
