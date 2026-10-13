import {
  Anchor,
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  ClipboardCheck,
  Cog,
  Compass,
  Eye,
  FileCheck,
  FileText,
  Globe,
  Handshake,
  Headphones,
  HeartHandshake,
  LifeBuoy,
  RefreshCw,
  Scale,
  ShieldCheck,
  Ship,
  SlidersHorizontal,
  TrendingUp,
  Users,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';

/**
 * Maps icon names used in /src/data files to Lucide components,
 * so content files stay plain JS. Add new icons here when needed.
 */
const icons = {
  Anchor,
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  ClipboardCheck,
  Cog,
  Compass,
  Eye,
  FileCheck,
  FileText,
  Globe,
  Handshake,
  Headphones,
  HeartHandshake,
  LifeBuoy,
  RefreshCw,
  Scale,
  ShieldCheck,
  Ship,
  SlidersHorizontal,
  TrendingUp,
  Users,
  UtensilsCrossed,
  Wrench,
};

export default function Icon({ name, ...props }) {
  const Component = icons[name] ?? Anchor;
  return <Component aria-hidden="true" strokeWidth={1.75} {...props} />;
}
