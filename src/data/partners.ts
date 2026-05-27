import type { Partner } from '@/components/PartnersMarquee'

/**
 * 함께한·관련 기관 (12개) — 중구청소년센터 공식 정보 기반.
 *
 * - 운영: 중구청소년센터(본 사이트) · 행복함께 나누는 재단(위탁 운영)
 * - 상위: 중구청 · 서울시 · 서울시교육청 · 여성가족부 · 한국청소년활동진흥원(KYWA) · 한국청소년상담복지개발원(KYCI)
 * - 연계: 서울특별시 청소년활동진흥센터 · 중구 드림톡톡(진로직업체험지원센터) · 중구 꿈드림(학교밖청소년지원센터) · 서울특별시 청소년시설협회
 *
 * 실제 로고 이미지를 받으면 src 필드에 채워주세요(/partners/foo.svg 권장).
 * 그 전까지는 mark(약자) 가 자동으로 캡슐로 표시됩니다.
 */
export const partners: Partner[] = [
  {
    name: '중구청소년센터',
    href: 'https://www.j-youth.org/',
    mark: '중구',
    category: '운영',
  },
  {
    name: '행복함께 나누는 재단',
    href: 'http://www.happywith.or.kr/',
    mark: '행복',
    category: '운영',
  },
  {
    name: '서울특별시 중구청',
    href: 'https://www.junggu.seoul.kr/',
    mark: '중구청',
    category: '상위',
  },
  {
    name: '서울특별시',
    href: 'https://www.seoul.go.kr/',
    mark: '서울',
    category: '상위',
  },
  {
    name: '서울특별시교육청',
    href: 'https://www.sen.go.kr/',
    mark: '교육청',
    category: '상위',
  },
  {
    name: '여성가족부',
    href: 'https://www.mogef.go.kr/',
    mark: '여가부',
    category: '상위',
  },
  {
    name: '한국청소년활동진흥원',
    href: 'https://www.kywa.or.kr/',
    mark: 'KYWA',
    category: '상위',
  },
  {
    name: '한국청소년상담복지개발원',
    href: 'https://www.kyci.or.kr/',
    mark: 'KYCI',
    category: '상위',
  },
  {
    name: '서울특별시 청소년활동진흥센터',
    href: 'https://www.sy0404.or.kr/',
    mark: '서울청',
    category: '연계',
  },
  {
    name: '중구 드림톡톡',
    href: 'https://www.j-youth.org/kor/center/index.php',
    mark: '드림',
    category: '연계',
  },
  {
    name: '중구 꿈드림',
    href: 'https://www.j-youth.org/kor/kdream/index.php',
    mark: '꿈드림',
    category: '연계',
  },
  {
    name: '서울특별시 청소년시설협회',
    href: 'https://www.youthcenter.co.kr/',
    mark: '협회',
    category: '연계',
  },
]
