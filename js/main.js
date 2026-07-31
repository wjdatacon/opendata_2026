(() => {
  // ===== Copy email button =====
  document.querySelectorAll('.copy-btn[data-copy-target]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-copy-target');
      const el = id && document.getElementById(id);
      if (!el) return;
      const text = el.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        sel.removeAllRanges();
      }
      const original = btn.textContent;
      btn.textContent = '복사됨';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 1600);
    });
  });

  // ===== Evaluation tabs (sub page) =====
  const tabs = document.querySelectorAll('.eval-tab');
  if (tabs.length) {
    const panels = {
      written: document.getElementById('panel-written'),
      oral: document.getElementById('panel-oral'),
    };
    const activate = (tab) => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
        t.setAttribute('tabindex', active ? '0' : '-1');
      });
      Object.entries(panels).forEach(([key, panel]) => {
        if (!panel) return;
        const active = key === target;
        panel.classList.toggle('is-active', active);
        if (active) {
          panel.removeAttribute('hidden');
          panel.querySelectorAll('.bar span').forEach((bar) => {
            const w = bar.style.width;
            bar.style.width = '0';
            requestAnimationFrame(() => { bar.style.width = w; });
          });
        } else {
          panel.setAttribute('hidden', '');
        }
      });
    };

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', (e) => {
        let nextIdx = null;
        if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') nextIdx = 0;
        else if (e.key === 'End') nextIdx = tabs.length - 1;
        if (nextIdx !== null) {
          e.preventDefault();
          activate(tabs[nextIdx]);
          tabs[nextIdx].focus();
        }
      });
    });
  }

  // ===== Lightbox (poster) =====
  const lightboxTriggers = document.querySelectorAll('[data-lightbox-open]');
  if (lightboxTriggers.length) {
    let lastTrigger = null;

    const openLightbox = (id, trigger) => {
      const box = document.getElementById(id);
      if (!box) return;
      lastTrigger = trigger;
      box.removeAttribute('hidden');
      document.body.classList.add('lightbox-open');
      const closeBtn = box.querySelector('[data-lightbox-close]');
      if (closeBtn) closeBtn.focus();
    };

    const closeLightbox = (box) => {
      box.setAttribute('hidden', '');
      document.body.classList.remove('lightbox-open');
      if (lastTrigger) lastTrigger.focus();
      lastTrigger = null;
    };

    lightboxTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        openLightbox(trigger.getAttribute('data-lightbox-open'), trigger);
      });
    });

    document.querySelectorAll('.lightbox').forEach((box) => {
      // close on close button
      box.querySelectorAll('[data-lightbox-close]').forEach((btn) => {
        btn.addEventListener('click', () => closeLightbox(box));
      });
      // close on backdrop click (but not when clicking the image itself)
      box.addEventListener('click', (e) => {
        if (e.target === box) closeLightbox(box);
      });
    });

    // ESC closes any open lightbox
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.lightbox:not([hidden])').forEach(closeLightbox);
    });
  }

  // ===== Home popup notice =====
  const popup = document.getElementById('homePopup');
  if (popup) {
    // 최종 결과 발표 팝업 — 키를 새로 두어 이전 팝업 "오늘 하루 보지 않기" 이력과 분리
    const POPUP_KEY = 'home-popup-hide-until-result';
    // 최종 결과 발표 이후 노출 (07.30 발표 ~ 08.31 자동 종료)
    const POPUP_AUTO_START = new Date('2026-07-30T00:00:00+09:00');
    const POPUP_AUTO_END = new Date('2026-09-01T00:00:00+09:00');

    const dontShowInput = document.getElementById('popupDontShowGlobal');
    const now = new Date();
    const hideUntilStr = localStorage.getItem(POPUP_KEY);
    const hideUntil = hideUntilStr ? new Date(hideUntilStr) : null;

    const shouldShow =
      now >= POPUP_AUTO_START &&
      now < POPUP_AUTO_END &&
      (!hideUntil || isNaN(hideUntil.getTime()) || now >= hideUntil);

    const closePopup = () => {
      if (dontShowInput && dontShowInput.checked) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        localStorage.setItem(POPUP_KEY, tomorrow.toISOString());
      }
      popup.setAttribute('hidden', '');
    };

    if (shouldShow) {
      setTimeout(() => {
        popup.removeAttribute('hidden');
      }, 350);
    }

    popup.querySelectorAll('[data-popup-close]').forEach((btn) => {
      btn.addEventListener('click', closePopup);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !popup.hasAttribute('hidden')) closePopup();
    });
  }

  // ===== Open data filter (sub page) =====
  const filterButtons = document.querySelectorAll('.data-filter button[data-filter]');
  const grid = document.getElementById('dataGrid');
  if (filterButtons.length && grid) {
    const cards = Array.from(grid.querySelectorAll('.data-card'));
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterButtons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', String(active));
        });
        cards.forEach((card) => {
          const show = filter === 'all' || card.dataset.type === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

})();
