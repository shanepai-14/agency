import { z } from 'zod';
import { CERTIFICATE_RULES, CV_RULES, hasAllowedExtension } from './files';

/* ------------------------------------------------------------------ */
/* Shared field rules                                                  */
/* ------------------------------------------------------------------ */

const requiredText = (label, max = 100) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be ${max} characters or fewer`);

const optionalText = (max = 100) => z.string().trim().max(max, `Must be ${max} characters or fewer`).optional();

const email = z.string().trim().min(1, 'Email is required').email('Enter a valid email address');

const phonePattern = /^\+?[0-9\s\-().]{7,20}$/;
const phone = z
  .string()
  .trim()
  .min(1, 'Phone number is required')
  .regex(phonePattern, 'Enter a valid phone number, including country code');
const optionalPhone = z
  .string()
  .trim()
  .refine((v) => v === '' || phonePattern.test(v), 'Enter a valid phone number, including country code')
  .optional();

const consent = z.literal(true, {
  errorMap: () => ({ message: 'Please confirm you agree to the Privacy Policy' }),
});

/** Honeypot – real users never see or fill this field. */
const honeypot = z.string().optional();

/** Today's date as YYYY-MM-DD in the user's local time zone. */
export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const fileList = z.array(z.instanceof(File));

/* ------------------------------------------------------------------ */
/* Application form                                                    */
/* ------------------------------------------------------------------ */

export const seaServiceOptions = [
  'Less than 1 year',
  '1 – 2 years',
  '3 – 5 years',
  '6 – 10 years',
  'More than 10 years',
];

export const applicationSchema = z.object({
  // Step 1 – personal details
  fullName: requiredText('Full name').refine((v) => v.length >= 2, 'Enter your full name'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((v) => {
      const dob = new Date(v);
      if (Number.isNaN(dob.getTime())) return false;
      const age = (Date.now() - dob.getTime()) / (365.25 * 24 * 3600 * 1000);
      return age >= 16 && age <= 80;
    }, 'Enter a valid date of birth'),
  nationality: requiredText('Nationality', 60),
  email,
  phone,

  // Step 2 – experience
  position: z.string().min(1, 'Select the position you are applying for'),
  seaService: z.string().min(1, 'Select your years of sea service'),
  vesselTypes: z.array(z.string()).min(1, 'Select at least one vessel type'),
  lastVessel: optionalText(100),
  lastRank: optionalText(60),
  availableFrom: z
    .string()
    .min(1, 'Available-from date is required')
    .refine((v) => v >= todayISO(), 'Date cannot be in the past'),

  // Step 3 – documents
  cv: fileList
    .min(1, 'Please upload your CV')
    .max(1, 'Upload a single CV file')
    .refine((files) => files.every((f) => hasAllowedExtension(f, CV_RULES.extensions)), 'CV must be a PDF, DOC or DOCX file')
    .refine((files) => files.every((f) => f.size <= CV_RULES.maxSize), 'CV must be 5 MB or smaller'),
  certificates: fileList
    .max(CERTIFICATE_RULES.maxFiles, `Upload up to ${CERTIFICATE_RULES.maxFiles} files`)
    .refine(
      (files) => files.every((f) => hasAllowedExtension(f, CERTIFICATE_RULES.extensions)),
      'Certificates must be PDF, JPG or PNG files',
    )
    .refine((files) => files.every((f) => f.size <= CERTIFICATE_RULES.maxSize), 'Each file must be 5 MB or smaller'),
  message: optionalText(1000),

  // Step 4 – review
  consent,
  website: honeypot,
});

/** Which fields are validated before moving past each step. */
export const applicationSteps = [
  { id: 'personal', title: 'Personal details', fields: ['fullName', 'dateOfBirth', 'nationality', 'email', 'phone'] },
  {
    id: 'experience',
    title: 'Experience',
    fields: ['position', 'seaService', 'vesselTypes', 'lastVessel', 'lastRank', 'availableFrom'],
  },
  { id: 'documents', title: 'Documents', fields: ['cv', 'certificates', 'message'] },
  { id: 'review', title: 'Review & submit', fields: ['consent'] },
];

export const applicationDefaults = {
  fullName: '',
  dateOfBirth: '',
  nationality: '',
  email: '',
  phone: '',
  position: '',
  seaService: '',
  vesselTypes: [],
  lastVessel: '',
  lastRank: '',
  availableFrom: '',
  cv: [],
  certificates: [],
  message: '',
  consent: false,
  website: '',
};

/* ------------------------------------------------------------------ */
/* Ship owner inquiry form                                             */
/* ------------------------------------------------------------------ */

export const inquiryServiceOptions = ['Crew sourcing', 'Screening & verification', 'Crew management', 'Other'];

export const inquirySchema = z.object({
  company: requiredText('Company name'),
  contactName: requiredText('Contact name'),
  jobTitle: optionalText(60),
  email,
  phone: optionalPhone,
  service: z.string().min(1, 'Select the service you are interested in'),
  vesselType: z.string().optional(),
  message: z.string().trim().min(20, 'Please tell us a little more (at least 20 characters)').max(2000),
  consent,
  website: honeypot,
});

export const inquiryDefaults = {
  company: '',
  contactName: '',
  jobTitle: '',
  email: '',
  phone: '',
  service: '',
  vesselType: '',
  message: '',
  consent: false,
  website: '',
};

/* ------------------------------------------------------------------ */
/* Contact form                                                        */
/* ------------------------------------------------------------------ */

export const contactSubjects = ['General question', 'My application', 'Ship owner inquiry', 'Crew on board / family', 'Other'];

export const contactSchema = z.object({
  name: requiredText('Name'),
  email,
  phone: optionalPhone,
  subject: z.string().min(1, 'Select a subject'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000),
  consent,
  website: honeypot,
});

export const contactDefaults = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
  website: '',
};
