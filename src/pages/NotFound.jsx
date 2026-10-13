import { ArrowLeft, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import { Container } from '../components/ui/Layout';

const suggestions = [
  { label: 'Current vacancies', to: '/vacancies' },
  { label: 'Apply online', to: '/apply' },
  { label: 'How to apply', to: '/how-to-apply' },
  { label: 'Contact us', to: '/contact' },
];

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for could not be found." noIndex />
      <section className="flex min-h-[85vh] items-center bg-navy pb-20 pt-32 text-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <motion.span
              initial={{ rotate: -40, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/20 text-orange-300"
            >
              <Compass aria-hidden="true" className="h-10 w-10" strokeWidth={1.5} />
            </motion.span>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-orange-300">Error 404</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Off course</h1>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-navy-100">
              We couldn&apos;t find the page you were looking for. It may have been moved, or the vacancy may no longer
              be available.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/" size="lg">
                <ArrowLeft aria-hidden="true" className="h-5 w-5" />
                Back to home
              </Button>
              <Button to="/vacancies" variant="ghostLight" size="lg">
                View vacancies
              </Button>
            </div>
            <nav aria-label="Helpful links" className="mt-12 border-t border-white/10 pt-8">
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {suggestions.map((s) => (
                  <li key={s.to}>
                    <Link to={s.to} className="inline-flex min-h-[44px] items-center rounded text-navy-100 underline-offset-4 hover:text-white hover:underline">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>
    </>
  );
}
