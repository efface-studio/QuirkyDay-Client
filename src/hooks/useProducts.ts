import { useCallback, useEffect, useState } from 'react'
import { defaultProducts, migrateProduct, type Product } from '@/data/products'

const STORAGE_KEY = 'quirky.products.v1'

/**
 * localStorage 단일 출처로 굿즈 카탈로그를 관리.
 * - 최초 로드 시 빈 키면 defaultProducts 로 시드한다.
 * - 다른 탭에서의 변경은 'storage' 이벤트로 동기화한다.
 *
 * 영구 반영은 /admin 의 JSON 내보내기 → src/data/products.ts 의
 * defaultProducts 에 붙여넣고 배포하는 흐름.
 */
function readStorage(): Product[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return parsed
      .map(migrateProduct)
      .filter((p): p is Product => p !== null)
  } catch {
    return null
  }
}

function writeStorage(products: Product[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch (e) {
    // QuotaExceededError 등 — 이미지가 커서 용량 초과한 경우
    console.warn('[useProducts] localStorage write failed:', e)
    alert(
      'localStorage 용량을 초과했어요. 이미지를 줄이거나 일부 상품을 삭제해 주세요.',
    )
  }
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return defaultProducts
    return readStorage() ?? defaultProducts
  })

  useEffect(() => {
    if (readStorage() === null) writeStorage(defaultProducts)
  }, [])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      const next = readStorage()
      if (next) setProducts(next)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const upsert = useCallback((p: Product) => {
    setProducts((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id)
      const next =
        idx === -1 ? [...prev, p] : prev.map((x) => (x.id === p.id ? p : x))
      writeStorage(next)
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id)
      writeStorage(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setProducts(defaultProducts)
    writeStorage(defaultProducts)
  }, [])

  return { products, upsert, remove, reset }
}
