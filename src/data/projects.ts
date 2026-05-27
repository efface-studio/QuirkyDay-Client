/**
 * 동아리 팀들이 만든 / 만들고 있는 프로젝트 카탈로그.
 * 새 프로젝트가 생기면 이 파일에 항목 추가 후 배포.
 */

export type ProjectStatus = '진행 중' | '완료' | '아이디어 단계'
export type ProjectCohort = '1기' | '2기'

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  cohort: ProjectCohort
  status: ProjectStatus
  /** 짧은 한 줄 — 카드에 표시 */
  tagline: string
  /** 1~2문장 길이 — 카드 hover 또는 본문에 표시 */
  description: string
  /** 카드 좌측 상단 이모지 (이미지 대신 placeholder) */
  emoji: string
  /** 기술/카테고리 태그 */
  tags: string[]
  /** GitHub / Behance / Web / App store 등 외부 링크 */
  links?: ProjectLink[]
  /** 카드 배경 톤 (paper-2 / accent-soft / ink) */
  tone?: 'paper' | 'accent' | 'ink'
}

export const projects: Project[] = [
  {
    id: 'p-quirky-letter',
    title: 'Quirky Letter',
    cohort: '2기',
    status: '진행 중',
    tagline: '하루 한 줄, 친구에게 익명 편지 보내기',
    description:
      '청소년이 친구에게 익명 손편지를 우편 형태로 보내는 모바일 웹 서비스. SwiftUI 와 React 로 PoC 진행 중.',
    emoji: '✉️',
    tags: ['모바일웹', 'React', '익명SNS'],
    tone: 'accent',
    links: [{ label: 'Web', href: 'https://example.com' }],
  },
  {
    id: 'p-school-cafe',
    title: '학교 카페',
    cohort: '2기',
    status: '진행 중',
    tagline: '쉬는 시간 10분, 친구와 한 잔',
    description:
      '학교 매점·자판기·근처 카페를 한 화면에서 추천. 위치 기반 + 학년·예산 필터.',
    emoji: '☕',
    tags: ['위치기반', 'Vite'],
    tone: 'paper',
  },
  {
    id: 'p-mini-shop',
    title: 'Mini Shop',
    cohort: '1기',
    status: '완료',
    tagline: '동아리 굿즈 첫 판매 — 실험적 D2C',
    description:
      '이 사이트의 굿즈샵 프로토타입. 계좌이체 + 인스타 DM 주문 흐름으로 첫 거래 12건 달성.',
    emoji: '🛍️',
    tags: ['커머스', 'D2C'],
    tone: 'ink',
    links: [{ label: 'Shop', href: '/shop' }],
  },
  {
    id: 'p-late-night-zine',
    title: 'Late Night Zine',
    cohort: '1기',
    status: '완료',
    tagline: '청소년 작가들의 한밤중 한 페이지 잡지',
    description:
      '매월 마지막 금요일 밤, 부원이 한 페이지씩 채워 만드는 디지털 진. 5호 발간.',
    emoji: '🌙',
    tags: ['콘텐츠', '커뮤니티'],
    tone: 'accent',
  },
  {
    id: 'p-stationery-pack',
    title: 'Stationery Pack',
    cohort: '1기',
    status: '아이디어 단계',
    tagline: '학기 초 신입생용 문구 키트',
    description:
      '입학 첫 주에 필요한 문구를 패키지로. 디자인 + 굿즈 + 와펜 결합 상품.',
    emoji: '🎒',
    tags: ['굿즈', '브랜딩'],
    tone: 'paper',
  },
  {
    id: 'p-club-camp',
    title: 'Club Camp',
    cohort: '2기',
    status: '아이디어 단계',
    tagline: '동아리 부원만의 1박 2일 합숙 워크숍',
    description:
      '8월 방학 중 1박 2일로 진행하는 메이커톤. 한 주제로 24시간 안에 프로토타입 → 발표.',
    emoji: '🏕️',
    tags: ['이벤트', '메이커톤'],
    tone: 'ink',
  },
]

export const projectCohorts = ['전체', '2기', '1기'] as const
export type ProjectFilter = (typeof projectCohorts)[number]
