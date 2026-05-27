import type { Partner } from '@/components/PartnersMarquee'

/**
 * 함께한·관련 기관 — 중구청소년센터 공식 정보 기반.
 *
 * src 는 Google s2 favicon API 로 각 기관 공식 사이트의 실제 favicon 을 hotlink.
 * (우리가 직접 호스팅하지 않으므로 사이트가 로고를 바꾸면 자동 반영.)
 *
 * favicon 이 로드되지 않으면 PartnerCard 가 자동으로 SVG 마크(shape/tone)로
 * fallback 한다.
 *
 * shape / tone 카테고리 매핑:
 *   운영(star, magenta) · 상위 지자체(hex, cyan) · 상위 정책(hex, purple)
 *   연계 사업(circle, lime) · 자매·협회(circle, tangerine)
 */

const favicon = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

export const partners: Partner[] = [
  // 운영
  {
    name: '중구청소년센터',
    href: 'https://www.j-youth.org/',
    src: favicon('j-youth.org'),
    mark: '중구',
    category: '운영',
    shape: 'star',
    tone: 'magenta',
  },
  {
    name: '행복함께 나누는 재단',
    href: 'http://www.happywith.or.kr/',
    src: favicon('happywith.or.kr'),
    mark: '행복',
    category: '운영',
    shape: 'star',
    tone: 'magenta',
  },

  // 상위 지자체
  {
    name: '서울특별시 중구청',
    href: 'https://www.junggu.seoul.kr/',
    src: favicon('junggu.seoul.kr'),
    mark: '중구청',
    category: '상위',
    shape: 'hex',
    tone: 'cyan',
  },
  {
    name: '서울특별시',
    href: 'https://www.seoul.go.kr/',
    src: favicon('seoul.go.kr'),
    mark: '서울',
    category: '상위',
    shape: 'hex',
    tone: 'cyan',
  },
  {
    name: '서울특별시교육청',
    href: 'https://www.sen.go.kr/',
    src: favicon('sen.go.kr'),
    mark: '교육청',
    category: '상위',
    shape: 'hex',
    tone: 'cyan',
  },

  // 상위 정책·진흥원
  {
    name: '여성가족부',
    href: 'https://www.mogef.go.kr/',
    src: favicon('mogef.go.kr'),
    mark: '여가부',
    category: '상위',
    shape: 'hex',
    tone: 'purple',
  },
  {
    name: '한국청소년활동진흥원',
    href: 'https://www.kywa.or.kr/',
    src: favicon('kywa.or.kr'),
    mark: 'KYWA',
    category: '상위',
    shape: 'hex',
    tone: 'purple',
  },
  {
    name: '한국청소년상담복지개발원',
    href: 'https://www.kyci.or.kr/',
    src: favicon('kyci.or.kr'),
    mark: 'KYCI',
    category: '상위',
    shape: 'hex',
    tone: 'purple',
  },

  // 연계 사업
  {
    name: '서울특별시 청소년활동진흥센터',
    href: 'https://www.sy0404.or.kr/',
    src: favicon('sy0404.or.kr'),
    mark: '서울청',
    category: '연계',
    shape: 'circle',
    tone: 'lime',
  },
  {
    name: '중구 드림톡톡',
    href: 'https://www.j-youth.org/kor/center/index.php',
    src: favicon('j-youth.org'),
    mark: '드림',
    category: '연계',
    shape: 'circle',
    tone: 'lime',
  },

  // 자매·협회
  {
    name: '중구 꿈드림',
    href: 'https://www.j-youth.org/kor/kdream/index.php',
    src: favicon('j-youth.org'),
    mark: '꿈드림',
    category: '연계',
    shape: 'circle',
    tone: 'tangerine',
  },
  {
    name: '서울특별시 청소년시설협회',
    href: 'https://www.youthcenter.co.kr/',
    src: favicon('youthcenter.co.kr'),
    mark: '협회',
    category: '연계',
    shape: 'circle',
    tone: 'tangerine',
  },
]
