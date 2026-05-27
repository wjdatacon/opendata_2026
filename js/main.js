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
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', String(active));
        });
        Object.entries(panels).forEach(([key, panel]) => {
          if (!panel) return;
          const active = key === target;
          panel.classList.toggle('is-active', active);
          if (active) {
            panel.removeAttribute('hidden');
            // Re-trigger bar width animation on tab switch
            panel.querySelectorAll('.bar span').forEach((bar) => {
              const w = bar.style.width;
              bar.style.width = '0';
              requestAnimationFrame(() => { bar.style.width = w; });
            });
          } else {
            panel.setAttribute('hidden', '');
          }
        });
      });
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
