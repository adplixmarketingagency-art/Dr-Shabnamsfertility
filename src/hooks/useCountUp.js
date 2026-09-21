import { useEffect, useState } from 'react';

/**
 * Counts from 0 -> end over `duration` ms, eased.
 * Only runs once `startOn` becomes true.
 */
export function useCountUp(end, duration = 2000, startOn = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startOn) return;
    let raf;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [startOn, end, duration]);

  return value;
}
