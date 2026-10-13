import { MotionConfig } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import About from './pages/About';
import Apply from './pages/Apply';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Home from './pages/Home';
import HowToApply from './pages/HowToApply';
import NotFound from './pages/NotFound';
import Positions from './pages/Positions';
import Privacy from './pages/Privacy';
import Seafarers from './pages/Seafarers';
import ShipOwners from './pages/ShipOwners';
import Vacancies from './pages/Vacancies';
import VacancyDetail from './pages/VacancyDetail';

/**
 * Route map. All pages share SiteLayout (header, footer, page transitions,
 * scroll-to-top on route change).
 */
export default function App() {
  return (
    // reducedMotion="user" disables transform animations for users who prefer reduced motion
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="seafarers" element={<Seafarers />} />
          <Route path="positions" element={<Positions />} />
          <Route path="vacancies" element={<Vacancies />} />
          <Route path="vacancies/:id" element={<VacancyDetail />} />
          <Route path="how-to-apply" element={<HowToApply />} />
          <Route path="apply" element={<Apply />} />
          <Route path="ship-owners" element={<ShipOwners />} />
          <Route path="faq" element={<Faq />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MotionConfig>
  );
}
