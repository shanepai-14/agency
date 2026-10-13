/**
 * Global site settings and contact details.
 * Replace every [placeholder] with the agency's real information.
 */
export const site = {
  name: '[Agency Name]',
  tagline: 'Seafarer recruitment for European ship owners',
  description:
    '[Agency Name] recruits and places qualified seafarers with European ship owners and operators. Apply online with your CV and certificates.',
  licence: '[Licence No.]',
  registration: '[Company Registration No.]',
  licensingAuthority: '[Licensing Authority]',
  founded: '[Year]',
};

export const contact = {
  address: ['[Street Address]', '[City, Postal Code]', '[Country]'],
  phone: '[Phone]',
  phoneHref: 'tel:+000000000', // e.g. 'tel:+35700000000'
  whatsapp: '[WhatsApp Number]',
  whatsappHref: 'https://wa.me/000000000', // e.g. 'https://wa.me/35700000000'
  email: '[Email]',
  emailHref: 'mailto:info@example.com',
  crewEmail: '[Crew Department Email]',
  ownersEmail: '[Ship Owners Email]',
  hours: [
    { days: 'Monday – Friday', time: '[09:00 – 18:00]' },
    { days: 'Saturday', time: '[10:00 – 14:00]' },
    { days: 'Sunday', time: 'Closed' },
  ],
  emergencyNote: 'Crew on board and their families can reach our duty officer 24/7 on [Emergency Phone].',
};

/** Main navigation (desktop + mobile). `mobileOnly` items are hidden in the desktop bar. */
export const navigation = [
  { label: 'About', to: '/about' },
  { label: 'For Seafarers', to: '/seafarers' },
  { label: 'Positions', to: '/positions' },
  { label: 'Vacancies', to: '/vacancies' },
  { label: 'How to Apply', to: '/how-to-apply' },
  { label: 'Ship Owners', to: '/ship-owners' },
  { label: 'FAQ', to: '/faq', mobileOnly: true },
  { label: 'Contact', to: '/contact' },
];

export const footerLinks = {
  seafarers: [
    { label: 'For Seafarers', to: '/seafarers' },
    { label: 'Positions', to: '/positions' },
    { label: 'Vacancies', to: '/vacancies' },
    { label: 'How to Apply', to: '/how-to-apply' },
    { label: 'Apply Online', to: '/apply' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'For Ship Owners', to: '/ship-owners' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy' },
  ],
};
