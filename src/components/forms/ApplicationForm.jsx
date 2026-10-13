import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Briefcase, Pencil } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getRankById, rankCategories } from '../../data/ranks';
import { site } from '../../data/site';
import { vesselTypes } from '../../data/vesselTypes';
import { CERTIFICATE_RULES, CV_RULES, formatBytes } from '../../lib/files';
import { applicationDefaults, applicationSchema, applicationSteps, seaServiceOptions, todayISO } from '../../lib/schemas';
import { submitApplication } from '../../services/api';
import Button from '../ui/Button';
import FileUpload from './FileUpload';
import { CheckboxField, SelectField, TextareaField, TextField } from './FormField';
import { FormAlert, FormSuccess, Honeypot, StepIndicator, SubmitButton } from './FormParts';
import TagSelect from './TagSelect';

const positionGroups = rankCategories.map((cat) => ({
  label: cat.title,
  options: cat.ranks.map((rank) => ({ value: rank.id, label: rank.title })),
}));

const fieldStep = Object.fromEntries(
  applicationSteps.flatMap((step, index) => step.fields.map((field) => [field, index])),
);

/** One row in the review summary. */
function ReviewRow({ label, value }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="break-words text-navy">{value || <span className="text-slate-400">Not provided</span>}</dd>
    </div>
  );
}

function ReviewSection({ title, onEdit, children }) {
  return (
    <section className="rounded-xl border border-slate-200 p-5 sm:p-6">
      <div className="mb-2 flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold">{title}</h3>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil aria-hidden="true" className="h-4 w-4" />
          Edit <span className="sr-only">{title}</span>
        </Button>
      </div>
      <dl className="divide-y divide-slate-100">{children}</dl>
    </section>
  );
}

/**
 * Multi-step seafarer application form.
 * Props:
 *  defaultPosition – rank id to pre-select (from ?position=)
 *  vacancy         – vacancy object when applying for a specific listing
 */
export default function ApplicationForm({ defaultPosition = '', vacancy = null }) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [reference, setReference] = useState('');
  const topRef = useRef(null);
  const headingRef = useRef(null);
  const isFirstRender = useRef(true);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: { ...applicationDefaults, position: getRankById(defaultPosition) ? defaultPosition : '' },
    mode: 'onTouched',
  });

  // Keep the pre-selected rank in sync if the query string changes
  useEffect(() => {
    if (getRankById(defaultPosition)) setValue('position', defaultPosition);
  }, [defaultPosition, setValue]);

  // Move focus to the step heading and scroll the form into view when the step changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  // Same for the success screen
  useEffect(() => {
    if (status !== 'success') return;
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    headingRef.current?.focus({ preventScroll: true });
  }, [status]);

  const lastStep = applicationSteps.length - 1;

  const goNext = async () => {
    const valid = await trigger(applicationSteps[step].fields, { shouldFocus: true });
    if (valid) setStep((s) => Math.min(s + 1, lastStep));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data) => {
    setStatus('submitting');
    setErrorMessage('');
    try {
      const result = await submitApplication({ ...data, vacancyId: vacancy?.id ?? '' });
      setReference(result?.reference ?? '');
      setStatus('success');
    } catch (err) {
      setErrorMessage(err?.message || 'Your application could not be sent. Please try again.');
      setStatus('error');
    }
  };

  // If full validation fails on submit, jump back to the first step with an error
  const onInvalid = (formErrors) => {
    const firstStep = Math.min(...Object.keys(formErrors).map((field) => fieldStep[field] ?? lastStep));
    setStep(firstStep);
  };

  // Enter key on earlier steps advances instead of submitting
  const handleFormSubmit = (event) => {
    if (step < lastStep) {
      event.preventDefault();
      goNext();
      return;
    }
    handleSubmit(onSubmit, onInvalid)(event);
  };

  const startOver = () => {
    reset(applicationDefaults);
    setStep(0);
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div ref={topRef} className="scroll-mt-28">
        <FormSuccess
          title="Application received"
          actions={
            <>
              <Button to="/vacancies" variant="secondary">
                Browse vacancies
              </Button>
              <Button variant="outline" onClick={startOver}>
                Submit another application
              </Button>
            </>
          }
        >
          <p ref={headingRef} tabIndex={-1} className="focus:outline-none">
            Thank you for applying to {site.name}. Our crewing team will review your documents and contact you if
            your profile matches a current or upcoming position.
          </p>
          {reference && (
            <p className="mt-4 text-sm">
              Your reference: <strong className="font-semibold text-navy">{reference}</strong>
            </p>
          )}
        </FormSuccess>
      </div>
    );
  }

  const values = getValues();
  const rankTitle = getRankById(values.position)?.title;
  const current = applicationSteps[step];

  return (
    <div ref={topRef} className="scroll-mt-28">
      <StepIndicator steps={applicationSteps} current={step} />

      {vacancy && (
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-navy-100 bg-navy-50 p-4">
          <Briefcase aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
          <p className="text-sm text-navy">
            You are applying for <strong>{vacancy.title}</strong> on a {vacancy.vesselType}.{' '}
            <Link to={`/vacancies/${vacancy.id}`} className="link">
              View vacancy
            </Link>
          </p>
        </div>
      )}

      <form onSubmit={handleFormSubmit} noValidate className="relative" aria-labelledby="form-step-heading">
        <Honeypot {...register('website')} />

        <h2
          id="form-step-heading"
          ref={headingRef}
          tabIndex={-1}
          className="mb-6 text-2xl font-semibold focus:outline-none"
        >
          <span className="sr-only">
            Step {step + 1} of {applicationSteps.length}:{' '}
          </span>
          {current.title}
        </h2>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step 1 – Personal details */}
            {current.id === 'personal' && (
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField
                  id="fullName"
                  label="Full name"
                  required
                  autoComplete="name"
                  className="sm:col-span-2"
                  error={errors.fullName?.message}
                  {...register('fullName')}
                />
                <TextField
                  id="dateOfBirth"
                  label="Date of birth"
                  type="date"
                  required
                  max={todayISO()}
                  autoComplete="bday"
                  error={errors.dateOfBirth?.message}
                  {...register('dateOfBirth')}
                />
                <TextField
                  id="nationality"
                  label="Nationality"
                  required
                  autoComplete="country-name"
                  error={errors.nationality?.message}
                  {...register('nationality')}
                />
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <TextField
                  id="phone"
                  label="Phone / WhatsApp"
                  type="tel"
                  required
                  autoComplete="tel"
                  hint="Include your country code, e.g. +357…"
                  error={errors.phone?.message}
                  {...register('phone')}
                />
              </div>
            )}

            {/* Step 2 – Experience */}
            {current.id === 'experience' && (
              <div className="grid gap-6 sm:grid-cols-2">
                <SelectField
                  id="position"
                  label="Position applied for"
                  required
                  groups={positionGroups}
                  placeholder="Select a rank…"
                  error={errors.position?.message}
                  {...register('position')}
                />
                <SelectField
                  id="seaService"
                  label="Years of sea service"
                  required
                  options={seaServiceOptions}
                  error={errors.seaService?.message}
                  {...register('seaService')}
                />
                <div className="sm:col-span-2">
                  <Controller
                    control={control}
                    name="vesselTypes"
                    render={({ field }) => (
                      <TagSelect
                        id="vesselTypes"
                        label="Vessel types served on"
                        required
                        hint="Select all that apply."
                        options={vesselTypes}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={errors.vesselTypes?.message}
                      />
                    )}
                  />
                </div>
                <TextField
                  id="lastVessel"
                  label="Last vessel"
                  hint="Vessel name and type"
                  error={errors.lastVessel?.message}
                  {...register('lastVessel')}
                />
                <TextField
                  id="lastRank"
                  label="Rank on last vessel"
                  error={errors.lastRank?.message}
                  {...register('lastRank')}
                />
                <TextField
                  id="availableFrom"
                  label="Available from"
                  type="date"
                  required
                  min={todayISO()}
                  error={errors.availableFrom?.message}
                  {...register('availableFrom')}
                />
              </div>
            )}

            {/* Step 3 – Documents */}
            {current.id === 'documents' && (
              <div className="grid gap-8">
                <Controller
                  control={control}
                  name="cv"
                  render={({ field }) => (
                    <FileUpload
                      id="cv"
                      label="CV"
                      required
                      rules={CV_RULES}
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.cv?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="certificates"
                  render={({ field }) => (
                    <FileUpload
                      id="certificates"
                      label="Certificates"
                      multiple
                      rules={CERTIFICATE_RULES}
                      hint="COC, STCW, seaman's book, passport, medical"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.certificates?.message}
                    />
                  )}
                />
                <TextareaField
                  id="message"
                  label="Message"
                  hint="Anything else we should know, e.g. preferred contract length or trading area."
                  error={errors.message?.message}
                  {...register('message')}
                />
              </div>
            )}

            {/* Step 4 – Review & submit */}
            {current.id === 'review' && (
              <div className="space-y-5">
                <p className="text-slate-600">Please check your details before sending your application.</p>
                <ReviewSection title="Personal details" onEdit={() => setStep(0)}>
                  <ReviewRow label="Full name" value={values.fullName} />
                  <ReviewRow label="Date of birth" value={values.dateOfBirth} />
                  <ReviewRow label="Nationality" value={values.nationality} />
                  <ReviewRow label="Email" value={values.email} />
                  <ReviewRow label="Phone / WhatsApp" value={values.phone} />
                </ReviewSection>
                <ReviewSection title="Experience" onEdit={() => setStep(1)}>
                  <ReviewRow label="Position" value={rankTitle} />
                  <ReviewRow label="Sea service" value={values.seaService} />
                  <ReviewRow label="Vessel types" value={values.vesselTypes.join(', ')} />
                  <ReviewRow
                    label="Last vessel / rank"
                    value={[values.lastVessel, values.lastRank].filter(Boolean).join(' – ')}
                  />
                  <ReviewRow label="Available from" value={values.availableFrom} />
                </ReviewSection>
                <ReviewSection title="Documents" onEdit={() => setStep(2)}>
                  <ReviewRow
                    label="CV"
                    value={values.cv.map((f) => `${f.name} (${formatBytes(f.size)})`).join(', ')}
                  />
                  <ReviewRow
                    label="Certificates"
                    value={values.certificates.length ? `${values.certificates.length} file(s) attached` : ''}
                  />
                  <ReviewRow label="Message" value={values.message} />
                </ReviewSection>

                <CheckboxField id="consent" error={errors.consent?.message} className="pt-2" {...register('consent')}>
                  I agree that {site.name} may process my personal data and documents to assess my application and
                  share them with prospective employers, as described in the{' '}
                  <Link to="/privacy" target="_blank" rel="noopener" className="link">
                    Privacy Policy
                  </Link>
                  .<span className="text-accent" aria-hidden="true"> *</span>
                </CheckboxField>

                {status === 'error' && <FormAlert title="Your application was not sent" message={errorMessage} />}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <Button variant="outline" size="lg" onClick={goBack} disabled={status === 'submitting'}>
              <ArrowLeft aria-hidden="true" className="h-5 w-5" />
              Back
            </Button>
          ) : (
            <span className="hidden sm:block" />
          )}
          {step < lastStep ? (
            <Button variant="secondary" size="lg" onClick={goNext}>
              Continue
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Button>
          ) : (
            <SubmitButton loading={status === 'submitting'} loadingText="Sending application…">
              Submit application
            </SubmitButton>
          )}
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Fields marked <span className="text-accent">*</span> are required.
        </p>
      </form>
    </div>
  );
}
