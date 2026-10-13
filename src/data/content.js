/**
 * Page copy that is shared or repeated across pages.
 * `icon` values are Lucide icon names mapped in src/components/ui/Icon.jsx.
 */

/** 3-step process shown on the Home page. */
export const processSteps = [
  {
    title: 'Apply online',
    text: 'Send your details, CV and certificates through our online form. It takes about 10 minutes.',
    icon: 'FileText',
  },
  {
    title: 'Screening & interview',
    text: 'A crewing officer reviews your documents and invites suitable candidates to an interview.',
    icon: 'ClipboardCheck',
  },
  {
    title: 'Join your vessel',
    text: 'Once selected, we prepare your contract, travel and joining documents and keep in touch throughout.',
    icon: 'Ship',
  },
];

/** "Why choose us" points on the Home page. */
export const whyChooseUs = [
  {
    title: 'European ship owners',
    text: 'We work with ship owners and operators based in Europe who expect high standards and treat crew fairly.',
    icon: 'Globe',
  },
  {
    title: 'No fees for seafarers',
    text: 'We never charge seafarers for recruitment or placement, in line with MLC, 2006.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Licensed and transparent',
    text: 'Licensed by [Licensing Authority]. Clear contracts, clear terms and honest communication.',
    icon: 'BadgeCheck',
  },
  {
    title: 'Support at every stage',
    text: 'From your first application to sign-off, our team is available for you and your family.',
    icon: 'LifeBuoy',
  },
];

/** Required documents checklist (How to Apply, For Seafarers). */
export const requiredDocuments = [
  { title: 'CV', text: 'Up-to-date CV with full sea service history, vessel types and ranks.', required: true },
  {
    title: 'Certificate of Competency (COC)',
    text: 'Your COC and any flag state endorsements for officers.',
  },
  {
    title: 'STCW certificates',
    text: 'Basic safety training and any advanced or specialised STCW courses.',
  },
  { title: "Seaman's book", text: 'Valid discharge book showing your sea service.' },
  { title: 'Passport', text: 'Valid for at least the full contract period.' },
  {
    title: 'Medical certificate',
    text: 'Valid seafarer medical fitness certificate (e.g. ENG1 or flag-approved equivalent).',
  },
];

/** Detailed application steps (How to Apply page). */
export const applicationSteps = [
  {
    title: 'Prepare your documents',
    text: 'Gather your CV and scans of your certificates. Clear PDF, JPG or PNG files work best.',
  },
  {
    title: 'Complete the online form',
    text: 'Enter your personal details and experience, then upload your CV and certificates.',
  },
  {
    title: 'Document review',
    text: 'Our crewing team checks your documents and sea service against current and upcoming vacancies.',
  },
  {
    title: 'Interview',
    text: 'Suitable candidates are invited to an interview by phone or video call. Some ship owners may also interview you directly.',
  },
  {
    title: 'Offer and contract',
    text: 'If selected, you receive an offer and a Seafarer Employment Agreement to review before signing.',
  },
  {
    title: 'Pre-joining and travel',
    text: 'We arrange any pre-joining medicals or briefings, your travel and joining instructions.',
  },
];

/** For Seafarers page. */
export const seafarerOffer = {
  contractTypes: [
    {
      title: 'Fixed-term contracts',
      text: 'Clear contract periods agreed before you join, set out in your Seafarer Employment Agreement.',
      icon: 'FileText',
    },
    {
      title: 'Rotation opportunities',
      text: 'Return to the same vessel or fleet on a regular rotation once you have proven yourself.',
      icon: 'RefreshCw',
    },
    {
      title: 'Career progression',
      text: 'Ship owners we work with promote from within. We support you as you move up in rank.',
      icon: 'TrendingUp',
    },
  ],
  support: [
    {
      title: 'Before you join',
      text: 'Contract review, document checks, pre-joining briefings, travel and visa arrangements.',
      icon: 'ClipboardCheck',
    },
    {
      title: 'While on board',
      text: 'A dedicated contact person in our office and a 24/7 duty line for urgent matters.',
      icon: 'Headphones',
    },
    {
      title: 'For your family',
      text: 'Your family can contact our office at any time with questions about your contract or wellbeing.',
      icon: 'HeartHandshake',
    },
    {
      title: 'After sign-off',
      text: 'Debriefing, feedback and planning your next contract with you.',
      icon: 'CalendarCheck',
    },
  ],
  onboarding: [
    { title: 'Offer accepted', text: 'You confirm the offer and we send your contract for review.' },
    { title: 'Documents checked', text: 'We confirm all certificates are valid for the full contract period.' },
    { title: 'Briefing', text: 'You receive information on the vessel, company policies and joining port.' },
    { title: 'Travel arranged', text: 'Tickets, hotel and agent details are sent to you before departure.' },
    { title: 'Joining', text: 'You sign on and our team confirms your safe arrival with the vessel.' },
  ],
};

/** About page. */
export const about = {
  story: [
    '[Agency Name] was founded in [Year] to connect qualified seafarers with responsible European ship owners. [Placeholder: add a short paragraph about why the agency was started and who founded it.]',
    'We believe that good crewing starts with people: listening to seafarers, understanding what ship owners need, and being honest with both. [Placeholder: add a paragraph about the agency’s approach and where it operates.]',
  ],
  mission:
    'To place competent, well-prepared seafarers on safe, well-run vessels, and to support them and their families throughout every contract.',
  vision:
    'To be the crewing partner European ship owners trust and the agency seafarers recommend to their colleagues.',
  values: [
    { title: 'Integrity', text: 'Honest communication and fair treatment for every seafarer and client.', icon: 'Scale' },
    { title: 'Safety first', text: 'Competence and certification are never compromised.', icon: 'ShieldCheck' },
    { title: 'Respect', text: 'We treat seafarers as professionals and partners, not numbers.', icon: 'Handshake' },
    { title: 'Reliability', text: 'We do what we say, when we say it.', icon: 'Anchor' },
  ],
  team: [
    { name: '[Name]', role: '[Managing Director]' },
    { name: '[Name]', role: '[Crewing Manager]' },
    { name: '[Name]', role: '[Crewing Officer]' },
  ],
};

/** For Ship Owners page services. */
export const ownerServices = [
  {
    title: 'Crew sourcing',
    text: 'We find qualified officers and ratings for your vessel types, trading areas and standards.',
    icon: 'Users',
    points: ['Single positions or full crews', 'Planned rotations and urgent replacements', 'All departments'],
  },
  {
    title: 'Screening & verification',
    text: 'Every candidate is interviewed and their documents and experience checked before we put them forward.',
    icon: 'FileCheck',
    points: ['Certificate and endorsement checks', 'Sea service and reference verification', 'Competency interviews'],
  },
  {
    title: 'Crew management',
    text: 'We can take care of crewing administration so your team can focus on operations.',
    icon: 'Briefcase',
    points: ['Crew planning and rotation', 'Contracts and documentation', 'Travel and crew change logistics'],
  },
];

export const ownerBenefits = [
  { title: 'MLC, 2006 compliant recruitment', icon: 'BadgeCheck' },
  { title: 'Single point of contact', icon: 'Headphones' },
  { title: 'Transparent candidate profiles', icon: 'Eye' },
  { title: 'Flexible, scalable support', icon: 'SlidersHorizontal' },
];
