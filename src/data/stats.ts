/**
 * 동아리 규모를 한눈에 보여주는 통계.
 * 시즌이 끝나면 이 파일만 업데이트.
 */
export interface Stat {
  label: string
  value: number
  prefix?: string
  suffix?: string
  hint?: string
}

export const stats: Stat[] = [
  { label: '활동 기수', value: 3, suffix: '기', hint: '2024년 가을 시작' },
  { label: '누적 멤버', value: 28, suffix: '명' },
  { label: '진행 프로젝트', value: 9, suffix: '개', hint: '런칭 + 진행 중 + 아이디어' },
  { label: '판매 굿즈', value: 47, suffix: '점', hint: '시즌 1·2 합산' },
]
