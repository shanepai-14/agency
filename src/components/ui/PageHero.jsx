import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from './Layout';

/**
 * Full-width navy hero used at the top of inner pages.
 * `breadcrumbs`: [{ label, to? }] – the current page is the last item without `to`.
 */
export default function PageHero({ eyebrow, title, intro, breadcrumbs = [], children }) {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
      {/* Subtle nautical line pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 48px)',
        }}
      />
      <Container className="relative">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-navy-100">
              <li>
                <Link to="/" className="rounded hover:text-white">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  <ChevronRight aria-hidden="true" className="h-4 w-4 opacity-60" />
                  {crumb.to ? (
                    <Link to={crumb.to} className="rounded hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-orange-300">{eyebrow}</p>
          )}
          <h1 className="text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl">{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </Container>
    </section>
  );
}
