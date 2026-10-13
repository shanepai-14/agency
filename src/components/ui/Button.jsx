import { Link } from 'react-router-dom';

const base =
  'inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-offset-2';

const variants = {
  // Accent is reserved for primary calls to action
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'bg-navy text-white hover:bg-navy-800',
  outline: 'border border-navy/20 bg-white text-navy hover:border-navy hover:bg-navy-50',
  light: 'bg-white text-navy hover:bg-navy-50',
  ghostLight: 'border border-white/40 text-white hover:border-white hover:bg-white/10',
  ghost: 'text-navy hover:bg-navy-50',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-[0.95rem]',
  lg: 'px-7 py-3.5 text-base',
};

/**
 * Button that renders as a router <Link> (`to`), an <a> (`href`) or a <button>.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  type = 'button',
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
