/* ============================================================
   SCROLL ANIMATIONS — Intersection Observer reveals
   ============================================================ */

export function initAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1,
    }
  );

  revealElements.forEach(el => observer.observe(el));
}
