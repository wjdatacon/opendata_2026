(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const selectors = [
    '.section-head',
    '.purpose-card',
    '.stepper',
    '.timeline-item',
    '.award-card',
    '.apply-steps li',
    '.download-card',
    '.apply-email',
    '.notice-brief',
    '.faq-link',
    '.eval-tabs',
    '.eval-list li',
    '.eval-extra',
    '.sub-cta',
    '.data-filter',
    '.data-card',
    '.faq-section',
    '.awards-note',
  ];

  const targets = document.querySelectorAll(selectors.join(','));
  if (!targets.length) return;

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // Slight stagger within a group so cards animate in sequence
    const groupIndex = i % 8;
    el.style.transitionDelay = `${groupIndex * 60}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();
