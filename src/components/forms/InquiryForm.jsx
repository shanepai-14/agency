import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { vesselTypes } from '../../data/vesselTypes';
import { inquiryDefaults, inquirySchema, inquiryServiceOptions } from '../../lib/schemas';
import { submitInquiry } from '../../services/api';
import Button from '../ui/Button';
import { CheckboxField, SelectField, TextareaField, TextField } from './FormField';
import { FormAlert, FormSuccess, Honeypot, SubmitButton } from './FormParts';

/** Ship owner inquiry form (For Ship Owners page). */
export default function InquiryForm() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(inquirySchema), defaultValues: inquiryDefaults, mode: 'onTouched' });

  const onSubmit = async (data) => {
    setStatus('submitting');
    setErrorMessage('');
    try {
      await submitInquiry(data);
      setStatus('success');
      reset(inquiryDefaults);
    } catch (err) {
      setErrorMessage(err?.message || 'Your inquiry could not be sent. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <FormSuccess
        title="Thank you for your inquiry"
        actions={
          <Button variant="outline" onClick={() => setStatus('idle')}>
            Send another inquiry
          </Button>
        }
      >
        <p>Our team will review your requirements and get back to you within [response time].</p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-6 sm:grid-cols-2">
      <Honeypot {...register('website')} />
      <TextField id="company" label="Company name" required autoComplete="organization" error={errors.company?.message} {...register('company')} />
      <TextField id="contactName" label="Contact name" required autoComplete="name" error={errors.contactName?.message} {...register('contactName')} />
      <TextField id="jobTitle" label="Job title" autoComplete="organization-title" error={errors.jobTitle?.message} {...register('jobTitle')} />
      <TextField id="inq-email" label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register('email')} />
      <TextField id="inq-phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register('phone')} />
      <SelectField
        id="service"
        label="Service of interest"
        required
        options={inquiryServiceOptions}
        error={errors.service?.message}
        {...register('service')}
      />
      <SelectField
        id="vesselType"
        label="Vessel type"
        options={vesselTypes}
        className="sm:col-span-2"
        error={errors.vesselType?.message}
        {...register('vesselType')}
      />
      <TextareaField
        id="inq-message"
        label="Your crewing requirements"
        required
        rows={6}
        hint="Ranks needed, number of vessels, timeline and any specific requirements."
        className="sm:col-span-2"
        error={errors.message?.message}
        {...register('message')}
      />
      <CheckboxField id="inq-consent" className="sm:col-span-2" error={errors.consent?.message} {...register('consent')}>
        I agree to the processing of my data to respond to this inquiry, as described in the{' '}
        <Link to="/privacy" target="_blank" rel="noopener" className="link">
          Privacy Policy
        </Link>
        .<span className="text-accent" aria-hidden="true"> *</span>
      </CheckboxField>
      {status === 'error' && (
        <div className="sm:col-span-2">
          <FormAlert title="Your inquiry was not sent" message={errorMessage} />
        </div>
      )}
      <div className="sm:col-span-2">
        <SubmitButton loading={status === 'submitting'}>Send inquiry</SubmitButton>
      </div>
    </form>
  );
}
