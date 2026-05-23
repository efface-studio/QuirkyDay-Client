/**
 * Quirky Day 굿즈 카탈로그 — 기본 상품 시드.
 *
 * 실제 화면에서는 useProducts() 훅을 통해 localStorage 우선으로 읽고,
 * 비어있으면 이 파일의 defaultProducts를 사용한다.
 * 부원은 /admin 페이지에서 추가/수정/삭제하고, "JSON 내보내기"로
 * 이 파일에 영구 반영할 수 있다.
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
  /**
   * 이미지 URL 또는 dataURL 배열. 비어 있으면 emoji fallback.
   * 첫 번째 이미지가 대표 이미지.
   */
  images: string[]
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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

/**
 * 옛 형식(`image: string`)에서 새 형식(`images: string[]`)으로 자동 변환.
 * localStorage에 있던 기존 데이터를 안전하게 들여올 때 사용.
 */
export function migrateProduct(raw: unknown): Product | null {
  if (typeof raw !== 'object' || raw === null) return null
  const r = raw as Record<string, unknown>
  if (typeof r.id !== 'string' || typeof r.name !== 'string') return null

  let images: string[] = []
  if (Array.isArray(r.images)) {
    images = r.images.filter((x): x is string => typeof x === 'string')
  } else if (typeof r.image === 'string' && r.image) {
    images = [r.image]
  }

  return {
    id: r.id,
    name: r.name,
    category: (r.category as ProductCategory) ?? '기타',
    price: typeof r.price === 'number' ? r.price : 0,
    status: (r.status as ProductStatus) ?? '판매중',
    description: typeof r.description === 'string' ? r.description : '',
    emoji: typeof r.emoji === 'string' ? r.emoji : '✨',
    images,
    options: Array.isArray(r.options)
      ? r.options.filter((x): x is string => typeof x === 'string')
      : undefined,
  }
}
