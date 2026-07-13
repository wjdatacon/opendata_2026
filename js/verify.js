/* 공개검증 게시판 — 기간 내에만 아이디어 카드 노출
   ※ 정적 사이트 특성상 '화면 노출' 제어입니다. PDF 파일 URL을 직접 아는 경우
      기간과 무관하게 접근될 수 있으니, 완전한 비공개가 필요하면 기간에만 파일을 업로드하세요.
   ※ 미리보기: 주소 끝에 ?preview 를 붙이면 기간과 상관없이 카드를 표시합니다. */
(() => {
  const grid = document.getElementById('verifyGrid');
  if (!grid) return;

  // 미리보기 모드 (?preview / ?all)
  const params = new URLSearchParams(location.search);
  if (params.has('preview') || params.has('all')) return;

  // 공개검증 기간 (KST) — 2026.07.20(월) 00:00 ~ 07.26(일) 24:00
  const start = new Date('2026-07-20T00:00:00+09:00');
  const end = new Date('2026-07-27T00:00:00+09:00'); // 07.26 자정 = 07.27 00:00 직전까지

  const now = new Date();
  const isOpen = now >= start && now < end;
  if (isOpen) return; // 기간 내: 그대로 노출

  // 기간 외: 카드 숨기고 안내 메시지 표시
  grid.style.display = 'none';

  const before = now < start;
  const notice = document.createElement('div');
  notice.className = 'verify-closed';
  notice.setAttribute('role', 'status');
  notice.innerHTML = before
    ? '<h3>공개검증 준비 중입니다</h3>' +
      '<p>공개검증 기간 <strong>2026.07.20(월) ~ 07.26(일)</strong>에 1차 통과 아이디어가 이 자리에 공개됩니다.</p>'
    : '<h3>공개검증이 종료되었습니다</h3>' +
      '<p>공개검증 기간 <strong>2026.07.20(월) ~ 07.26(일)</strong>이 종료되어 자료 열람이 마감되었습니다.</p>';
  grid.insertAdjacentElement('afterend', notice);
})();
