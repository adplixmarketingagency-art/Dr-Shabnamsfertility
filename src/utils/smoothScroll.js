/**
 * Smoothly scroll to an element (or selector), offset for the fixed nav.
 * Accounts for the nav's actual viewport position (it sits below the top edge).
 */
export function smoothScrollTo(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  const nav = document.querySelector('.nav');
  const navBottom = nav ? nav.getBoundingClientRect().bottom : 96;
  const top = el.getBoundingClientRect().top + window.scrollY - navBottom - 16;

  window.scrollTo({ top, behavior: 'smooth' });
}
