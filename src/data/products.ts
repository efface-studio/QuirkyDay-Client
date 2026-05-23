/**
 * Quirky Day 굿즈 카탈로그.
 * 부원이 새 상품을 추가하면 일단 이 파일을 수정하고 배포한다.
 * (관리자 페이지로 옮기는 작업은 후속 작업에서 진행.)
 */

export type ProductCategory = '의류' | '키링' | '와펜' | '기타'

export type ProductStatus = '판매중' | '재고소진' | '예약판매' | '준비중'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  price: number // 원 단위
  status: ProductStatus
  description: string
  /** 상품 이미지 (URL). 없으면 emoji 로 placeholder. */
  image?: string
  emoji: string
  options?: string[]
}

export const defaultProducts: Product[] = [
  {
    id: 'tee-quirky-logo',
    name: 'Quirky 로고 티셔츠',
    category: '의류',
    price: 18000,
    status: '판매중',
    emoji: '👕',
    description:
      '동아리 로고를 가슴 왼쪽에 자수로 새긴 베이직 반팔. 100수 코튼.',
    options: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'keyring-mascot',
    name: '마스코트 아크릴 키링',
    category: '키링',
    price: 5000,
    status: '판매중',
    emoji: '🔑',
    description:
      '동아리 마스코트 캐릭터 양면 아크릴 키링. 가방·파우치 포인트로 좋아요.',
  },
  {
    id: 'patch-logo',
    name: 'Quirky 로고 와펜',
    category: '와펜',
    price: 4000,
    status: '판매중',
    emoji: '🧵',
    description:
      '다림질로 부착하는 자수 와펜. 데님 자켓·에코백 어디든.',
  },
  {
    id: 'tee-slogan',
    name: '슬로건 티셔츠',
    category: '의류',
    price: 20000,
    status: '예약판매',
    emoji: '👕',
    description:
      '"엉뚱한 하루" 슬로건 프린트 티. 5장 이상 주문 시 제작 들어갑니다.',
    options: ['S', 'M', 'L'],
  },
  {
    id: 'keyring-glitter',
    name: '글리터 키링',
    category: '키링',
    price: 6000,
    status: '재고소진',
    emoji: '✨',
    description: '안에 글리터가 흐르는 한정판 키링.',
  },
]

export const categories: ProductCategory[] = ['의류', '키링', '와펜', '기타']
export const statuses: ProductStatus[] = [
  '판매중',
  '예약판매',
  '재고소진',
  '준비중',
]
