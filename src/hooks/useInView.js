import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref and an inView boolean.
 * Fires once when the element crosses the threshold.
 */
export function useInView({ threshold = 0.15, once = true, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || (inView && once)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, once, threshold, rootMargin]);

  return [ref, inView];
}
