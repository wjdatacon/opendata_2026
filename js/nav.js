(() => {
  const header = document.getElementById('siteHeader');
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('.primary-nav');
  const navLinks = Array.from(document.querySelectorAll('.primary-nav a[data-nav]'));
  const pageType = document.body.dataset.page; // "main" | "evaluation" | "opendata" | "faq" | "gallery"

  // Sticky header shadow on scroll
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Mobile menu toggle
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', '메뉴 열기');
        }
      });
    });
  }

  const setActive = (name) => {
    navLinks.forEach((a) => a.classList.toggle('is-current', a.dataset.nav === name));
  };

  // Sub-page: mark the matching nav item as active immediately
  if (pageType && pageType !== 'main') {
    setActive(pageType);
    return;
  }

  // Main page: highlight current section based on scroll
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  if ('IntersectionObserver' in window && sections.length) {
    const headerH = getComputedStyle(document.documentElement).getPropertyValue('--header-h').trim() || '72px';
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      {
        rootMargin: `-${headerH} 0px -55% 0px`,
        threshold: [0.1, 0.3, 0.6],
      }
    );
    sections.forEach((s) => observer.observe(s));
  }
})();
