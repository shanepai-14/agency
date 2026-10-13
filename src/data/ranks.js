/**
 * Ranks the agency recruits for, grouped by department.
 * `id` values are used in URLs (?position=chief-officer) and in the
 * application form dropdown – keep them stable once the site is live.
 * `icon` is the name of a Lucide icon (see src/components/ui/Icon.jsx).
 */
export const rankCategories = [
  {
    id: 'deck',
    title: 'Deck Officers',
    icon: 'Compass',
    summary:
      'Navigation, cargo operations and safe watchkeeping on the bridge, from Master to Deck Cadet.',
    ranks: [
      {
        id: 'master',
        title: 'Master',
        requirements: [
          'STCW II/2 Certificate of Competency (Master)',
          'Previous experience in rank on a similar vessel type',
          'Flag state endorsement, or ability to obtain one',
        ],
      },
      {
        id: 'chief-officer',
        title: 'Chief Officer',
        requirements: [
          'STCW II/2 Certificate of Competency',
          'Experience in rank or as senior Second Officer',
          'Tanker endorsements for tanker vessels',
        ],
      },
      {
        id: 'second-officer',
        title: 'Second Officer',
        requirements: [
          'STCW II/1 Certificate of Competency (OOW)',
          'ECDIS generic and type-specific training',
          'Previous sea service as officer of the watch',
        ],
      },
      {
        id: 'third-officer',
        title: 'Third Officer',
        requirements: [
          'STCW II/1 Certificate of Competency (OOW)',
          'GMDSS certificate',
          'ECDIS generic training',
        ],
      },
      {
        id: 'deck-cadet',
        title: 'Deck Cadet',
        requirements: [
          'Enrolled in an approved maritime education programme',
          'STCW basic safety training',
          'Training record book',
        ],
      },
    ],
  },
  {
    id: 'engine',
    title: 'Engine Officers',
    icon: 'Cog',
    summary:
      'Operation and maintenance of main engines, auxiliary machinery and electrical systems.',
    ranks: [
      {
        id: 'chief-engineer',
        title: 'Chief Engineer',
        requirements: [
          'STCW III/2 Certificate of Competency (Chief Engineer)',
          'Experience in rank with the relevant engine type',
          'Planned maintenance system experience',
        ],
      },
      {
        id: 'second-engineer',
        title: 'Second Engineer',
        requirements: [
          'STCW III/2 Certificate of Competency',
          'Experience in rank or as senior Third Engineer',
          'Familiarity with main engine overhauls',
        ],
      },
      {
        id: 'third-engineer',
        title: 'Third Engineer',
        requirements: [
          'STCW III/1 Certificate of Competency (OOW)',
          'Experience with auxiliary engines and purifiers',
        ],
      },
      {
        id: 'fourth-engineer',
        title: 'Fourth Engineer',
        requirements: [
          'STCW III/1 Certificate of Competency (OOW)',
          'Engine room watchkeeping experience',
        ],
      },
      {
        id: 'eto',
        title: 'Electro-Technical Officer',
        requirements: [
          'STCW III/6 Certificate of Competency (ETO)',
          'High-voltage experience is an advantage',
        ],
      },
      {
        id: 'engine-cadet',
        title: 'Engine Cadet',
        requirements: [
          'Enrolled in an approved maritime education programme',
          'STCW basic safety training',
          'Training record book',
        ],
      },
    ],
  },
  {
    id: 'ratings',
    title: 'Ratings',
    icon: 'Wrench',
    summary: 'Skilled deck and engine ratings who keep the vessel running safely day to day.',
    ranks: [
      {
        id: 'bosun',
        title: 'Bosun',
        requirements: [
          'STCW II/5 Able Seafarer Deck certificate',
          'Experience as Bosun or senior AB',
          'Mooring and cargo gear experience',
        ],
      },
      {
        id: 'able-seaman',
        title: 'Able Seaman (AB)',
        requirements: ['STCW II/5 Able Seafarer Deck certificate', 'Watchkeeping experience'],
      },
      {
        id: 'ordinary-seaman',
        title: 'Ordinary Seaman (OS)',
        requirements: [
          'STCW II/4 Rating forming part of a navigational watch',
          'STCW basic safety training',
        ],
      },
      {
        id: 'pumpman',
        title: 'Pumpman',
        requirements: ['STCW II/5 or III/5 certificate', 'Tanker endorsements', 'Cargo pump experience'],
      },
      {
        id: 'fitter',
        title: 'Fitter',
        requirements: ['Welding and fabrication skills', 'STCW III/5 certificate preferred'],
      },
      {
        id: 'oiler',
        title: 'Oiler / Motorman',
        requirements: ['STCW III/5 Able Seafarer Engine certificate', 'Engine room experience'],
      },
      {
        id: 'wiper',
        title: 'Wiper',
        requirements: [
          'STCW III/4 Rating forming part of an engineering watch',
          'STCW basic safety training',
        ],
      },
    ],
  },
  {
    id: 'galley',
    title: 'Galley & Hotel Staff',
    icon: 'UtensilsCrossed',
    summary:
      'Catering and accommodation crew who look after the health and wellbeing of everyone on board.',
    ranks: [
      {
        id: 'chief-cook',
        title: 'Chief Cook',
        requirements: [
          "Ship's cook certificate (MLC, 2006 Regulation 3.2)",
          'Food hygiene certificate',
          'Menu planning and provisions management',
        ],
      },
      {
        id: 'second-cook',
        title: 'Second Cook',
        requirements: ['Food hygiene certificate', 'Professional galley experience'],
      },
      {
        id: 'steward',
        title: 'Messman / Steward',
        requirements: ['Food hygiene certificate', 'STCW basic safety training'],
      },
    ],
  },
];

/** Flat list used by dropdowns and lookups. */
export const allRanks = rankCategories.flatMap((cat) =>
  cat.ranks.map((rank) => ({ ...rank, categoryId: cat.id, category: cat.title })),
);

export const getRankById = (id) => allRanks.find((rank) => rank.id === id);
