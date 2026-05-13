# 2026 원주시 공공데이터 활용 아이디어 공모전 홈페이지

하이브리드 구조 — 메인 원페이지(`index.html`) + 서브페이지 5개. 빌드 도구 없이 정적으로 동작합니다.

**라이브 URL** — https://wjdatacon.github.io/opendata_2026/

## 구조

```
opendata_2026/
├── index.html              # 메인 (Hero / About / Schedule / Awards / Apply / Contact)
├── evaluation.html         # 서브 — 심사 기준
├── opendata.html           # 서브 — 공공데이터 사이트
├── faq.html                # 서브 — FAQ + 유의사항
├── gallery.html            # 수상작 갤러리 (Coming Soon)
├── privacy.html            # 개인정보처리방침
├── favicon.svg             # 브랜드 마크 SVG 파비콘
├── css/
│   ├── reset.css           # 리셋
│   ├── variables.css       # 컬러/폰트/스페이싱 토큰
│   ├── common.css          # 헤더/푸터/네비/버튼/섹션 공통 + 스크롤 reveal
│   ├── main.css            # 메인 페이지 전용
│   ├── sub.css             # 서브 페이지 공통
│   └── responsive.css      # 미디어 쿼리
├── js/
│   ├── nav.js              # 헤더 동작, 모바일 메뉴, 현재 섹션/페이지 하이라이트
│   ├── main.js             # 이메일 복사, 평가 탭, 데이터 필터, stepper 현재 단계
│   ├── countdown.js        # D-day 실시간 카운터 (단계별 자동 전환)
│   └── scroll-animation.js # IntersectionObserver 진입 애니메이션
├── images/{logo,icons,gallery}/
├── downloads/
└── PRD.md
```

## 글로벌 네비게이션

7개 메뉴 — 공모전 소개 / 일정 / 시상 (메인 앵커) · 심사 기준 / 공공데이터 / FAQ (서브 페이지) · 참가 신청(CTA).

서브페이지에서 메인 앵커 링크 클릭 시 자동으로 메인 페이지의 해당 섹션으로 이동합니다.

## 로컬 미리보기

```powershell
# Python 3
python -m http.server 5500
# 또는
npx serve .
```

`http://localhost:5500/` 접속.

## 진행 상태

### Phase 1 — 공통 기반 ✅
- [x] reset / variables / common / responsive CSS
- [x] 글로벌 네비게이션 + 모바일 햄버거
- [x] 반응형 레이아웃 (1024 / 768 / 480)
- [x] 현재 페이지/섹션 active 하이라이트

### Phase 2 — 메인 페이지 ✅
- [x] Hero + 그라디언트 블롭 (D-day 표시는 정적, 카운터 로직은 Phase 4)
- [x] 공모전 소개 + 진행 단계 stepper
- [x] 일정 타임라인
- [x] 시상 내역 카드 (대상 강조)
- [x] 참가 신청 + 다운로드 카드 + 이메일 복사
- [x] 문의 폼 (placeholder 동작)

### Phase 3 — 서브 페이지 ✅
- [x] `evaluation.html` — 1차/2차 평가 탭, progress bar, 최종 점수 산출 안내
- [x] `opendata.html` — 9개 기관 카드 + 협력기관/공공데이터포털 필터
- [x] `faq.html` — FAQ 8개 + 참가 유의사항 5개 섹션

### Phase 4 — 인터랙션 ✅
- [x] D-day 카운터 실시간 동작 (`js/countdown.js`) — 단계별 자동 전환
- [x] 스크롤 진입 애니메이션 (`js/scroll-animation.js`)
- [x] 카드 호버 효과 (CSS)
- [x] 현재 진행 단계 stepper 자동 하이라이트
- [x] 메인 페이지 섹션 / 서브 페이지 네비게이션 active 표시

### Phase 5 — 마무리 ✅
- [x] 페이지별 SEO 메타 태그 보강 (canonical, og:url, theme-color, twitter:card)
- [x] SVG 파비콘 (`favicon.svg`) 모든 페이지 연결
- [x] `privacy.html` (개인정보처리방침 10개 조항 + 목차 + TOC 앵커)
- [x] `gallery.html` Coming Soon 골격 (시상식 D-day 카운터 + 수상작 카드 placeholder 3개)
- [x] GitHub Pages 배포 (https://wjdatacon.github.io/opendata_2026/)

### 추가 작업 필요 항목 (외부 자산)
- [ ] 실제 다운로드 파일 (`downloads/*.hwp` — 참가신청서/사업계획서/동의서)
- [ ] 주최·주관·협력기관 로고 이미지 (`images/logo/`)
- [ ] OG 공유용 썸네일 이미지 (1200×630)
- [ ] 운영사무국 담당자 이메일/전화 확정
- [ ] FAQ 실제 질문·답변 검토
- [ ] 문의 폼 백엔드 연동 (Formspree 등)
- [ ] 개인정보처리방침 본문 법무 검토
