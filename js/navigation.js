/* ============================================================
   NAVIGATION — Sticky, Active states, Mobile menu
   ============================================================ */

export function initNavigation() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');
  const links = navLinks.querySelectorAll('a[data-section]');

  // Sticky nav on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  });

  const setMenuOpen = (open) => {
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    navLinks.classList.toggle('open', open);
    navOverlay.classList.toggle('show', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  // Mobile hamburger toggle
  hamburger.addEventListener('click', () => setMenuOpen(!navLinks.classList.contains('open')));

  // Close mobile menu on overlay click, link click, or Escape
  navOverlay.addEventListener('click', () => setMenuOpen(false));
  links.forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) setMenuOpen(false);
  });

  // Active section tracking
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -70% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}
