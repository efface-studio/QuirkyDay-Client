/**
 * Quirky Day 사이트 전반에서 쓰는 메타데이터.
 * 동아리 정보가 바뀌면 여기만 수정하면 된다.
 */
export const site = {
  name: 'Quirky Day',
  tagline: '엉뚱한 하루가 새로운 비즈니스가 된다',
  description:
    '중구청소년센터 소속 청소년 창업 동아리. 작은 아이디어를 실제 제품과 서비스로 만들어 봅니다.',
  location: '중구청소년센터',
  category: '청소년 창업 동아리',
  instagram: 'https://www.instagram.com/quirky_day/',
  instagramHandle: '@quirky_day',
  contactEmail: '',
} as const

/**
 * 사이드바 / 헤더 / 푸터에서 공통으로 쓰는 네비게이션 항목.
 * sectionId — 홈 페이지에서 같은 이름의 섹션 ID와 매칭해서
 * scrollspy가 점을 옮길 때 사용한다.
 */
export const navLinks = [
  { to: '/', label: '홈', sectionId: 'home' },
  { to: '/about', label: '소개', sectionId: 'about' },
  { to: '/activities', label: '활동', sectionId: 'activities' },
  { to: '/shop', label: '굿즈샵', sectionId: 'shop' },
  { to: '/members', label: '멤버', sectionId: 'members' },
  { to: '/recruit', label: '모집', sectionId: 'recruit' },
  { to: '/contact', label: '문의', sectionId: 'contact' },
] as const
