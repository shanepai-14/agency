import Reveal from './Reveal';

/**
 * Eyebrow + heading + intro paragraph used at the top of sections.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  as: Tag = 'h2',
  light = false,
  id,
  className = '',
}) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <Reveal className={`mb-10 max-w-2xl sm:mb-12 ${alignment} ${className}`}>
      {eyebrow && (
        <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.14em] ${light ? 'text-orange-300' : 'text-accent'}`}>
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={`text-3xl font-semibold leading-tight sm:text-4xl ${light ? 'text-white' : 'text-navy'}`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-navy-100' : 'text-slate-600'}`}>{intro}</p>
      )}
    </Reveal>
  );
}
