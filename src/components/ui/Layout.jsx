/** Layout primitives: Container and Section. */

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-content px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

const backgrounds = {
  white: 'bg-white',
  mist: 'bg-mist',
  navy: 'bg-navy text-navy-100',
};

export function Section({ bg = 'white', className = '', containerClassName = '', id, children, ...props }) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${backgrounds[bg]} ${className}`} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
