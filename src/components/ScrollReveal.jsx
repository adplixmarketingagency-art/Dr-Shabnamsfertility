import { useInView } from '../hooks/useInView';

/**
 * Reveals its children with a fade + rise when scrolled into view.
 * - `delay` (ms): staggered entrance delay
 * - `as`: element type (default div)
 * - `className`: extra classes
 *
 * Children receive a `.reveal` / `.reveal-visible` treatment via CSS.
 */
export default function ScrollReveal({ children, className = '', delay = 0, as: Tag = 'div', ...props }) {
  const [ref, inView] = useInView({ threshold: 0.12, once: true });

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
