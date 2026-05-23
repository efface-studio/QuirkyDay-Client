/**
 * Quirky Day 멤버 카탈로그 — 기본 시드.
 * Admin /admin/members 에서 CRUD 가능. localStorage 우선.
 */

export interface Member {
  id: string
  name: string
  role: string
  bio: string
  /** 프로필 이미지 dataURL 또는 URL (없으면 이니셜로 fallback) */
  avatar?: string
  /** 외부 링크 (Instagram, 포트폴리오 등) — 선택 */
  link?: string
  /** 표시 순서 — 작은 숫자가 먼저 */
  order: number
}

export const defaultMembers: Member[] = [
  {
    id: 'leader',
    name: '리더',
    role: '동아리장 · 기획',
    bio: '아이디어를 모으고, 팀이 굴러가게 만드는 사람.',
    order: 1,
  },
  {
    id: 'design',
    name: '디자인',
    role: '디자인 · 브랜딩',
    bio: '제품의 첫인상. UI/일러스트 둘 다.',
    order: 2,
  },
  {
    id: 'dev',
    name: '개발',
    role: '개발 · 프로토',
    bio: '아이디어를 동작하는 화면으로. 노코드와 코드를 오갑니다.',
    order: 3,
  },
  {
    id: 'marketing',
    name: '마케팅',
    role: '마케팅 · 콘텐츠',
    bio: '인스타그램과 오프라인 부스를 통해 사람들에게 가닿게.',
    order: 4,
  },
  {
    id: 'ops',
    name: '운영',
    role: '운영 · 일정',
    bio: '센터와의 커뮤니케이션, 모임 일정, 회비.',
    order: 5,
  },
  {
    id: 'rookie',
    name: '신입',
    role: '신입 부원',
    bio: '여러분의 자리가 될 수도 있어요.',
    order: 6,
  },
]

/** 옛 데이터 마이그레이션 (필드 누락 안전 처리) */
export function migrateMember(raw: unknown): Member | null {
  if (typeof raw !== 'object' || raw === null) return null
  const r = raw as Record<string, unknown>
  if (typeof r.id !== 'string' || typeof r.name !== 'string') return null
  return {
    id: r.id,
    name: r.name,
    role: typeof r.role === 'string' ? r.role : '',
    bio: typeof r.bio === 'string' ? r.bio : '',
    avatar: typeof r.avatar === 'string' ? r.avatar : undefined,
    link: typeof r.link === 'string' ? r.link : undefined,
    order: typeof r.order === 'number' ? r.order : 999,
  }
}
