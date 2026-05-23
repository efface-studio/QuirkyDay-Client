# Quirky Day

중구청소년센터 청소년 창업 동아리 **Quirky Day** 의 공식 웹사이트.

> 엉뚱한 하루, 진짜 비즈니스가 되다.

## 소개

청소년이 떠올린 작은 아이디어를 실제 제품·서비스로 만들어 보는 동아리이고,
이 사이트는 동아리 소개·활동·굿즈샵·멤버를 한곳에 모아둔 단일 페이지 앱입니다.

- 공개 사이트: 소개, 활동, 굿즈샵, 멤버, 연락
- 관리자(`/admin`): 굿즈와 멤버를 추가/수정/삭제 (PIN 게이트, localStorage 기반)

굿즈 결제는 계좌이체 전용이고 주문 접수는 Instagram DM으로 받아요. 사이트는 주문서 생성과 안내까지만 도와줍니다.

## 기술 스택

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- Motion (framer-motion)

## 개발

```bash
npm install
cp .env.example .env   # 그리고 VITE_ADMIN_PIN 값 채우기
npm run dev            # http://localhost:5173
npm run build
npm run preview
```

## 디렉터리

```
src/
├── components/        # Layout, Sidebar, Header, Footer, motion primitives
├── pages/             # 라우트별 페이지 (홈/소개/활동/굿즈/멤버/문의)
│   └── admin/         # 관리자 페이지 (게이트 + 대시보드 + 제품/멤버 관리)
├── hooks/             # useProducts, useMembers, useScrollSpy
├── data/              # 제품·멤버 기본 시드 데이터
├── lib/               # 이미지 압축 등 유틸
└── config/            # 사이트 메타데이터, 네비게이션
```

## 운영 메모

- 부원이 `/admin` 에서 추가/수정한 내용은 브라우저 `localStorage` 에 저장돼요.
- 다른 브라우저나 새 기기에서도 보이게 하려면 관리자 페이지의 **JSON 내보내기** 로 받은 내용을 `src/data/products.ts` · `src/data/members.ts` 에 반영하고 다시 배포해야 합니다.
