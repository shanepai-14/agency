import { ArrowRight } from 'lucide-react';
import Button from './Button';
import { Container } from './Layout';
import Reveal from './Reveal';

/**
 * Closing call-to-action band. Defaults target seafarers; override props for other audiences.
 */
export default function CtaBanner({
  title = 'Ready for your next contract?',
  text = 'Send us your application with your CV and certificates. Our crewing team will review it and contact you about suitable positions.',
  primary = { label: 'Apply now', to: '/apply' },
  secondary = { label: 'View vacancies', to: '/vacancies' },
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-8 rounded-card bg-navy px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:px-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-navy-100">{text}</p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            {primary && (
              <Button to={primary.to} size="lg">
                {primary.label}
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </Button>
            )}
            {secondary && (
              <Button to={secondary.to} variant="ghostLight" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
