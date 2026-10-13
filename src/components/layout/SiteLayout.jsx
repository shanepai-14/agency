import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

/** Keeps the outgoing page rendered while its exit animation runs. */
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

/**
 * App shell: skip link, header, animated page outlet, footer.
 * Scrolls to the top after every route change (once the old page has faded out).
 */
export default function SiteLayout() {
  const location = useLocation();

  const handleExitComplete = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-accent px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <Header />
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        <motion.main
          id="main"
          key={location.pathname}
          tabIndex={-1}
          className="flex-1 focus:outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <FrozenOutlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
