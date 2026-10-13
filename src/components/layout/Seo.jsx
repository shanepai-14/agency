import { Helmet } from 'react-helmet-async';
import { site } from '../../data/site';

/**
 * Per-page <title> and meta description.
 * Usage: <Seo title="About Us" description="..." />
 */
export default function Seo({ title, description = site.description, noIndex = false }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} – ${site.tagline}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {noIndex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
}
