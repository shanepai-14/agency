/** Vessel types used in vacancy filters and the application form. */
export const vesselTypes = [
  'Bulk Carrier',
  'Container Ship',
  'Oil / Product Tanker',
  'Chemical Tanker',
  'LPG Carrier',
  'LNG Carrier',
  'General Cargo',
  'Multipurpose',
  'Ro-Ro',
  'Car Carrier (PCTC)',
  'Reefer',
  'Offshore Support Vessel',
  'Passenger / Ferry',
];

/** Contract length buckets for the vacancy filter. */
export const contractLengths = [
  { id: 'short', label: 'Up to 4 months', test: (months) => months <= 4 },
  { id: 'medium', label: '5 – 6 months', test: (months) => months >= 5 && months <= 6 },
  { id: 'long', label: '7 months or more', test: (months) => months >= 7 },
];
