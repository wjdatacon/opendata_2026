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

  // ===== Contact form (placeholder) =====
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('문의 전송 기능은 추후 연결될 예정입니다.\n이메일로 직접 문의해주세요.');
    });
  }

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

  // ===== Current step indicator on main page stepper =====
  // Determines which contest stage is current based on today's date.
  const stepper = document.querySelector('.stepper ol');
  if (stepper) {
    const stageEnd = [
      new Date('2026-06-04T00:00:00+09:00'), // 홍보 시작
      new Date('2026-07-02T18:00:00+09:00'), // 접수 마감
      new Date('2026-07-15T23:59:00+09:00'), // 1차 결과 발표
      new Date('2026-07-22T23:59:00+09:00'), // 공개검증 종료
      new Date('2026-07-29T23:59:00+09:00'), // 2차 대면평가 / 시상식
    ];
    const items = stepper.children;
    const now = new Date();
    let currentIdx = 0;
    if (now < stageEnd[0]) currentIdx = 0;
    else if (now < stageEnd[1]) currentIdx = 1;
    else if (now < stageEnd[2]) currentIdx = 2;
    else if (now < stageEnd[3]) currentIdx = 3;
    else if (now < stageEnd[4]) currentIdx = 4;
    else currentIdx = 5;
    if (items[currentIdx]) items[currentIdx].classList.add('is-current');
  }
})();
