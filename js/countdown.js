(() => {
  const numberEl = document.getElementById('ddayNumber');
  const labelEl = document.getElementById('ddayLabel');
  const metaEl = document.getElementById('ddayMeta');
  if (!numberEl || !labelEl || !metaEl) return;

  const stages = [
    {
      until: new Date('2026-07-08T18:00:00+09:00'),
      label: '접수 마감까지',
      meta: '2026.07.08(수) 18:00 마감',
    },
    {
      until: new Date('2026-07-20T00:00:00+09:00'),
      label: '1차 결과 발표까지',
      meta: '2026.07.20(월) 개별 통보',
    },
    {
      until: new Date('2026-07-27T00:00:00+09:00'),
      label: '공개검증 종료까지',
      meta: '2026.07.20(월) ~ 07.26(일)',
    },
    {
      until: new Date('2026-08-01T00:00:00+09:00'),
      label: '본선 평가까지',
      meta: '2026.07 말 (예정) · 합격자 대상 추후 공지',
    },
  ];

  const ddayPrefix = document.querySelector('.dday-prefix');

  const render = () => {
    const now = new Date();
    let active = null;
    for (const stage of stages) {
      if (now < stage.until) { active = stage; break; }
    }

    if (!active) {
      // After contest end
      labelEl.textContent = '공모전이 종료되었습니다';
      numberEl.textContent = 'END';
      if (ddayPrefix) ddayPrefix.style.display = 'none';
      metaEl.textContent = '관심과 참여에 감사드립니다.';
      return;
    }

    if (ddayPrefix) ddayPrefix.style.display = '';
    labelEl.textContent = active.label;
    metaEl.textContent = active.meta;

    const diffMs = active.until - now;
    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.ceil(diffMs / oneDay);

    if (days <= 0) {
      // Today is the deadline — show hours instead
      const hours = Math.max(0, Math.floor(diffMs / (60 * 60 * 1000)));
      if (ddayPrefix) ddayPrefix.style.display = 'none';
      numberEl.textContent = hours > 0 ? `${hours}h` : 'D-DAY';
    } else {
      numberEl.textContent = String(days);
    }
  };

  render();
  // Re-render every minute so the counter stays fresh if the page stays open
  setInterval(render, 60 * 1000);
})();
