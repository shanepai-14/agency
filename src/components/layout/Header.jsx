import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { contact, navigation } from '../../data/site';
import Button from '../ui/Button';
import { Container } from '../ui/Layout';
import Logo from './Logo';

/**
 * Fixed header. Transparent over the navy hero at the top of the page,
 * turns white and shrinks once the user scrolls.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Shrink on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll, focus first link and allow Escape while the menu is open
  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;
  const desktopLinks = navigation.filter((item) => !item.mobileOnly);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex flex-col transition-all duration-300 ${menuOpen ? 'h-dvh' : ''} ${
        solid ? 'bg-white/95 shadow-[0_1px_0_rgba(11,37,64,0.08),0_8px_24px_-12px_rgba(11,37,64,0.18)] backdrop-blur' : 'bg-transparent'
      }`}
    >
      <Container>
        <div className={`flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? 'h-16' : 'h-20 sm:h-24'}`}>
          <Logo light={!solid} compact={scrolled} />

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {desktopLinks.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `relative inline-flex min-h-[44px] items-center rounded-lg px-3 text-[0.92rem] font-medium transition-colors ${
                        solid ? 'text-slate-700 hover:text-navy' : 'text-navy-100 hover:text-white'
                      } ${isActive ? (solid ? '!text-navy' : '!text-white') : ''}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-x-3 bottom-1.5 h-0.5 rounded-full bg-accent"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button to="/apply" size={scrolled ? 'sm' : 'md'} className="hidden sm:inline-flex">
              Apply now
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors xl:hidden ${
                solid ? 'text-navy hover:bg-navy-50' : 'text-white hover:bg-white/10'
              }`}
            >
              {menuOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="min-h-0 flex-1 overflow-y-auto border-t border-slate-200 bg-white xl:hidden"
          >
            <Container className="flex min-h-full flex-col py-6">
              <nav aria-label="Mobile">
                <ul className="divide-y divide-slate-100">
                  {navigation.map((item, index) => (
                    <li key={item.to}>
                      <NavLink
                        ref={index === 0 ? firstLinkRef : undefined}
                        to={item.to}
                        className={({ isActive }) =>
                          `flex min-h-[52px] items-center justify-between rounded-lg px-2 font-heading text-lg font-medium ${
                            isActive ? 'text-accent' : 'text-navy'
                          }`
                        }
                      >
                        {item.label}
                        <ArrowRight aria-hidden="true" className="h-5 w-5 opacity-40" />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto space-y-3 pt-8">
                <Button to="/apply" size="lg" className="w-full">
                  Apply now
                </Button>
                <Button href={contact.phoneHref} variant="outline" size="lg" className="w-full">
                  <Phone aria-hidden="true" className="h-5 w-5" />
                  {contact.phone}
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
