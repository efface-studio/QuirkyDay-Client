import type { FAQItem } from '@/components/FAQ'

/**
 * 모집(/recruit) 페이지에서 쓰는 메타데이터.
 * 시즌이 끝나면 status 만 'closed' 로 바꿔도 페이지가 알아서 안내 톤이 된다.
 */

export type RecruitStatus = 'open' | 'closed' | 'soon'

export interface RecruitInfo {
  cohort: string
  status: RecruitStatus
  applyHref: string
  /** 모집 시작·마감일 (간단 표시용). 실제 카운트다운은 별도 컴포넌트에서 처리해도 OK */
  scheduleStart: string
  scheduleEnd: string
  /** 이번 시즌 모집 인원 */
  totalSeats: number
}

export const recruit: RecruitInfo = {
  cohort: '3기',
  status: 'open',
  applyHref: 'https://www.instagram.com/quirky_day/',
  scheduleStart: '2026.06.01',
  scheduleEnd: '2026.06.30',
  totalSeats: 12,
}

export interface RecruitRole {
  title: string
  badge: string
  body: string
  who: string[]
}

export const roles: RecruitRole[] = [
  {
    title: '기획',
    badge: 'PM',
    body: '아이디어를 모아 한 주의 실험으로 만들고, 회고로 다음을 준비합니다.',
    who: ['일상의 불편이 자꾸 눈에 들어오는 사람', '사람들을 설득하는 데 재미를 느끼는 사람'],
  },
  {
    title: '디자인',
    badge: 'Design',
    body: 'UI · 그래픽 · 굿즈까지, 우리 브랜드의 모든 첫인상을 만듭니다.',
    who: ['색·서체에 예민한 사람', '피그마/그림 도구가 손에 익은 사람 (꼭 잘하지 않아도 OK)'],
  },
  {
    title: '개발',
    badge: 'Dev',
    body: '아이디어를 화면으로. 노코드부터 React 까지 자유롭게 골라 씁니다.',
    who: ['HTML/CSS/JS 한 가지라도 만져본 사람', '노코드(Framer, Webflow)로 페이지를 만들어 본 사람'],
  },
  {
    title: '마케팅 / 콘텐츠',
    badge: 'Growth',
    body: '인스타·오프라인 부스로 우리 결과물을 사람들에게 가닿게 만듭니다.',
    who: ['SNS 컨텐츠를 직접 운영해 본 경험', '카피·사진·릴스 중 하나가 재밌는 사람'],
  },
]

export interface TimelineStep {
  when: string
  title: string
  body: string
}

export const timeline: TimelineStep[] = [
  {
    when: '06.01 — 06.20',
    title: '지원서 접수',
    body: '인스타그램 DM 으로 간단한 자기소개와 관심 직군을 보내주세요.',
  },
  {
    when: '06.22',
    title: '서류 결과 안내',
    body: '지원해 주신 모든 분께 DM 으로 결과를 안내합니다.',
  },
  {
    when: '06.25 — 06.28',
    title: '짧은 인터뷰',
    body: '센터 또는 화상으로 20분간 가볍게 이야기 나눠요.',
  },
  {
    when: '06.30',
    title: '최종 합격 안내 · OT',
    body: '합류 확정 후 첫 OT 일정을 안내드립니다.',
  },
]

export const faq: FAQItem[] = [
  {
    q: '지원 자격이 어떻게 되나요?',
    a: '중·고등학생이면 누구나 환영해요. 학교·지역 제한 없이 청소년이면 OK. 만 19세 이상은 멘토 트랙으로 따로 안내드려요.',
  },
  {
    q: '구체적인 아이디어가 있어야 지원할 수 있나요?',
    a: '아니에요. 처음 두 주는 같이 아이디어를 찾는 시간으로 시작합니다. "무언가 만들고 싶다" 정도면 충분해요.',
  },
  {
    q: '활동 일정과 장소는요?',
    a: '매주 1회 중구청소년센터에서 정기 모임이 있고, 격주로 메이커 워크숍을 진행해요. 합숙·외부 공모전은 시즌마다 1회 정도.',
  },
  {
    q: '회비가 있나요?',
    a: '없어요. 굿즈 제작이나 외부 행사 참가비는 동아리에서 부담하거나, 굿즈샵 수익으로 충당합니다.',
  },
  {
    q: '꼭 무엇인가 잘해야 하나요?',
    a: '아니요. 우리 동아리는 "일단 만들어 본다" 가 가장 중요한 자격이에요. 잘하는 한 가지보다, 새로운 걸 배우는 데 열려 있는 사람을 찾습니다.',
  },
  {
    q: '지원 결과는 언제 알 수 있나요?',
    a: '지원 마감 후 2일 이내에 모든 지원자에게 DM 으로 결과를 안내드립니다. 합격 / 불합격 모두 답장드려요.',
  },
]
