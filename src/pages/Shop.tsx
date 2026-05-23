import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/motion/Reveal'
import { site } from '@/config/site'
import {
  categories,
  type Product,
  type ProductCategory,
} from '@/data/products'
import { useProducts } from '@/hooks/useProducts'

type Filter = 'all' | ProductCategory

export function Shop() {
  const { products } = useProducts()
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Product | null>(null)

  const visible = useMemo(
    () =>
      filter === 'all' ? products : products.filter((p) => p.category === filter),
    [filter, products],
  )

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="우리가 만든 굿즈."
        description="동아리에서 직접 디자인·제작한 옷, 키링, 와펜. 수익은 다음 시즌 활동비로 돌아갑니다."
      />

      {/* 결제 안내 — 차분한 띠 */}
      <section className="border-b border-ink/10 bg-paper-2">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 font-mono text-xs uppercase tracking-widest text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="text-accent">●</span> 계좌이체 ONLY · 주문은
            Instagram DM
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-ink hover:text-accent"
          >
            {site.instagramHandle} →
          </a>
        </div>
      </section>

      {/* 필터 */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 pt-12">
          <div className="flex flex-wrap gap-2">
            <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
              전체
            </FilterChip>
            {categories.map((c) => (
              <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>
                {c}
              </FilterChip>
            ))}
          </div>
        </div>
      </section>

      {/* 상품 그리드 */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10">
          {visible.length === 0 ? (
            <p className="py-16 text-center text-ink-soft">
              해당 카테고리에 등록된 상품이 없어요.
            </p>
          ) : (
            <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visible.map((p, i) => (
                  <motion.li
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ProductCard product={p} onOrder={() => setSelected(p)} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </section>

      {/* 주문 방법 */}
      <section className="border-t border-ink/10 bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
              How to order
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
              주문은 이렇게.
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i + 1} as="li">
                <div className="card h-full rounded-2xl p-6">
                  <p className="font-en text-3xl text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-4 font-display text-lg text-ink">{s.title}</p>
                  <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <OrderModal product={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

const steps = [
  {
    title: 'Instagram DM',
    body: '상품·옵션·수량·받는 분 성함을 DM으로 보내주세요.',
  },
  {
    title: '계좌 안내',
    body: '주문 확인 후 계좌번호와 입금 금액을 답장으로 보내드려요.',
  },
  {
    title: '계좌이체',
    body: '안내된 계좌로 이체하면 입금자명으로 확인합니다.',
  },
  {
    title: '수령',
    body: '센터에서 직접 수령 또는 택배 배송. 별도 안내해드려요.',
  },
] as const

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 font-en text-sm transition-all ${
        active
          ? 'bg-ink text-paper'
          : 'border border-ink/15 bg-paper text-ink hover:border-ink'
      }`}
    >
      {children}
    </button>
  )
}

function ProductCard({
  product,
  onOrder,
}: {
  product: Product
  onOrder: () => void
}) {
  const sold = product.status === '재고소진'
  const disabled = sold || product.status === '준비중'
  // hover 시 두 번째 이미지로 cross-fade (여러 장 있을 때만)
  const [hoverIdx, setHoverIdx] = useState(0)
  const hasMany = product.images.length > 1
  const current = product.images[hoverIdx] ?? product.images[0]

  return (
    <motion.article
      whileHover={{ y: -4 }}
      onMouseEnter={() => hasMany && setHoverIdx(1)}
      onMouseLeave={() => setHoverIdx(0)}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className={`card flex h-full flex-col overflow-hidden rounded-3xl ${
        sold ? 'opacity-60' : ''
      }`}
    >
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-paper-2">
        {current ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={current}
              alt={product.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        ) : (
          <span className="text-8xl" aria-hidden="true">
            {product.emoji}
          </span>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
          {product.status}
        </span>
        {hasMany && (
          <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-paper">
            +{product.images.length - 1}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
          {product.category}
        </p>
        <h3 className="mt-1 font-display text-lg text-ink">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {product.description}
        </p>
        {product.options && (
          <p className="mt-3 font-mono text-xs text-ink-mute">
            opt · {product.options.join(' / ')}
          </p>
        )}
        <div className="mt-5 flex items-end justify-between">
          <p className="font-en text-2xl text-ink">
            ₩{product.price.toLocaleString('ko-KR')}
          </p>
          <button
            type="button"
            onClick={onOrder}
            disabled={disabled}
            className="rounded-full bg-ink px-4 py-2 font-en text-xs text-paper hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-ink/30"
          >
            {sold ? 'Sold' : '주문하기 →'}
          </button>
        </div>
      </div>
    </motion.article>
  )
}

function OrderModal({
  product,
  onClose,
}: {
  product: Product
  onClose: () => void
}) {
  const [option, setOption] = useState(product.options?.[0] ?? '')
  const [qty, setQty] = useState(1)
  const [copied, setCopied] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)
  const hasImages = product.images.length > 0
  const hasMany = product.images.length > 1
  const goImg = (dir: -1 | 1) =>
    setImgIdx(
      (i) => (i + dir + product.images.length) % product.images.length,
    )

  const total = product.price * qty
  const message = [
    `[Quirky Day 주문]`,
    `· 상품: ${product.name}`,
    option ? `· 옵션: ${option}` : null,
    `· 수량: ${qty}개`,
    `· 합계: ₩${total.toLocaleString('ko-KR')}`,
    `· 받는 분 성함: `,
    `· 수령 방법(직접수령/택배): `,
  ]
    .filter(Boolean)
    .join('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* no-op */
    }
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} 주문 안내`}
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="card w-full max-w-lg rounded-3xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {product.category}
            </p>
            <h2 className="mt-1 font-display text-2xl text-ink">{product.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="rounded-full p-2 text-ink-soft hover:bg-paper-2 hover:text-ink"
          >
            ✕
          </button>
        </div>

        {/* 갤러리 — 이미지가 있을 때만 */}
        {hasImages && (
          <div className="mt-5">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-paper-2">
              <AnimatePresence mode="wait">
                <motion.img
                  key={product.images[imgIdx]}
                  src={product.images[imgIdx]}
                  alt={`${product.name} ${imgIdx + 1}`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              {hasMany && (
                <>
                  <button
                    type="button"
                    onClick={() => goImg(-1)}
                    aria-label="이전 이미지"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-paper/85 px-3 py-2 font-en text-sm text-ink shadow-sm hover:bg-paper"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => goImg(1)}
                    aria-label="다음 이미지"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-paper/85 px-3 py-2 font-en text-sm text-ink shadow-sm hover:bg-paper"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {product.images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setImgIdx(i)}
                        aria-label={`이미지 ${i + 1}로 이동`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === imgIdx ? 'w-6 bg-ink' : 'w-1.5 bg-ink/30'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            {hasMany && (
              <div className="mt-2 flex gap-2 overflow-x-auto">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImgIdx(i)}
                    aria-label={`이미지 ${i + 1} 미리보기`}
                    className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                      i === imgIdx ? 'border-ink' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {product.options && (
          <div className="mt-6">
            <label className="font-mono text-xs uppercase tracking-widest text-ink-mute">
              옵션
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.options.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setOption(o)}
                  className={`rounded-full px-3 py-1.5 font-en text-sm transition-all ${
                    option === o
                      ? 'bg-ink text-paper'
                      : 'border border-ink/15 text-ink hover:border-ink'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <label className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            수량
          </label>
          <div className="flex items-center rounded-full border border-ink/15">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-1 text-lg"
              aria-label="수량 감소"
            >
              −
            </button>
            <span className="min-w-8 text-center font-en text-sm">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="px-3 py-1 text-lg"
              aria-label="수량 증가"
            >
              +
            </button>
          </div>
          <p className="ml-auto font-en text-xl text-ink">
            ₩{total.toLocaleString('ko-KR')}
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-paper-2 p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            DM으로 보낼 문구
          </p>
          <pre className="mt-2 whitespace-pre-wrap font-sans text-sm text-ink">
{message}
          </pre>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={copy}
            className="flex-1 rounded-full border border-ink/15 px-5 py-3 font-en text-sm text-ink hover:border-ink"
          >
            {copied ? '복사됨 ✓' : '주문 문구 복사'}
          </button>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full bg-ink px-5 py-3 text-center font-en text-sm text-paper hover:-translate-y-0.5"
          >
            Instagram DM 열기 →
          </a>
        </div>
        <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-ink-mute">
          payment · 계좌이체 only
        </p>
      </motion.div>
    </motion.div>
  )
}
