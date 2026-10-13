import { motion } from 'framer-motion';

/**
 * Subtle fade-up when the element scrolls into view.
 * Respects prefers-reduced-motion via <MotionConfig reducedMotion="user"> in App.
 */
export default function Reveal({ children, delay = 0, className = '', as = 'div', ...props }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
