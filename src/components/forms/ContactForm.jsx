import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { contactDefaults, contactSchema, contactSubjects } from '../../lib/schemas';
import { submitContact } from '../../services/api';
import Button from '../ui/Button';
import { CheckboxField, SelectField, TextareaField, TextField } from './FormField';
import { FormAlert, FormSuccess, Honeypot, SubmitButton } from './FormParts';

/** General contact form (Contact page). */
export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema), defaultValues: contactDefaults, mode: 'onTouched' });

  const onSubmit = async (data) => {
    setStatus('submitting');
    setErrorMessage('');
    try {
      await submitContact(data);
      setStatus('success');
      reset(contactDefaults);
    } catch (err) {
      setErrorMessage(err?.message || 'Your message could not be sent. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <FormSuccess
        title="Message sent"
        actions={
          <Button variant="outline" onClick={() => setStatus('idle')}>
            Send another message
          </Button>
        }
      >
        <p>Thank you for getting in touch. We will reply as soon as possible during office hours.</p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-6 sm:grid-cols-2">
      <Honeypot {...register('website')} />
      <TextField id="name" label="Name" required autoComplete="name" error={errors.name?.message} {...register('name')} />
      <TextField id="c-email" label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register('email')} />
      <TextField id="c-phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register('phone')} />
      <SelectField id="subject" label="Subject" required options={contactSubjects} error={errors.subject?.message} {...register('subject')} />
      <TextareaField
        id="c-message"
        label="Message"
        required
        rows={6}
        className="sm:col-span-2"
        error={errors.message?.message}
        {...register('message')}
      />
      <CheckboxField id="c-consent" className="sm:col-span-2" error={errors.consent?.message} {...register('consent')}>
        I agree to the processing of my data to respond to this message, as described in the{' '}
        <Link to="/privacy" target="_blank" rel="noopener" className="link">
          Privacy Policy
        </Link>
        .<span className="text-accent" aria-hidden="true"> *</span>
      </CheckboxField>
      {status === 'error' && (
        <div className="sm:col-span-2">
          <FormAlert title="Your message was not sent" message={errorMessage} />
        </div>
      )}
      <div className="sm:col-span-2">
        <SubmitButton loading={status === 'submitting'}>Send message</SubmitButton>
      </div>
    </form>
  );
}
