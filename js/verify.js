/* ===================================================================
   공개검증 게시판 — 노출 상태 수동 제어
   ===================================================================
   아래 VERIFY_STATE 값만 바꾼 뒤 커밋/푸시하면 방문자 전체에게 반영됩니다.

     'before' → 공개 전  : 카드 숨김, "공개검증 준비 중" 안내
     'open'   → 공개 중  : 아이디어 카드 노출
     'after'  → 공개 종료: 카드 숨김, "공개검증 종료" 안내

   ※ 정적 사이트 특성상 '화면 노출' 제어입니다. PDF 파일 URL을 직접 아는 경우
      상태와 무관하게 접근될 수 있으니, 완전한 비공개가 필요하면 파일 자체를 올리거나 내리세요.
   ※ 미리보기: 주소 끝에 ?preview 를 붙이면 상태와 상관없이 카드를 표시합니다.
   =================================================================== */

const VERIFY_STATE = 'after'; // ← 'before' | 'open' | 'after' 중 하나로 변경

(() => {
  const grid = document.getElementById('verifyGrid');
  if (!grid) return;

  // 미리보기 모드 (?preview / ?all): 상태와 무관하게 항상 카드 표시
  const params = new URLSearchParams(location.search);
  if (params.has('preview') || params.has('all')) return;

  if (VERIFY_STATE === 'open') return; // 공개 중: 그대로 노출

  // 공개 전/종료: 카드 숨기고 안내 메시지 표시
  grid.style.display = 'none';

  const notice = document.createElement('div');
  notice.className = 'verify-closed';
  notice.setAttribute('role', 'status');
  notice.innerHTML = VERIFY_STATE === 'after'
    ? '<h3>공개검증이 종료되었습니다</h3>' +
      '<p>공개검증 기간 <strong>2026.07.20(월) ~ 07.26(일)</strong>이 종료되어 자료 열람이 마감되었습니다.</p>'
    : '<h3>공개검증 준비 중입니다</h3>' +
      '<p>공개검증 기간 <strong>2026.07.20(월) ~ 07.26(일)</strong>에 1차 통과 아이디어가 이 자리에 공개됩니다.</p>';
  grid.insertAdjacentElement('afterend', notice);
})();
