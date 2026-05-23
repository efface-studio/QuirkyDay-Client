import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AdminShell } from './AdminShell'
import {
  categories,
  statuses,
  type Product,
  type ProductCategory,
  type ProductStatus,
} from '@/data/products'
import { useProducts } from '@/hooks/useProducts'

type DraftProduct = Omit<Product, 'price'> & { price: string }

const blankDraft: DraftProduct = {
  id: '',
  name: '',
  category: '의류',
  price: '',
  status: '판매중',
  description: '',
  emoji: '👕',
  options: [],
}

function toDraft(p: Product): DraftProduct {
  return { ...p, price: String(p.price), options: p.options ?? [] }
}

function fromDraft(d: DraftProduct): Product {
  const price = parseInt(d.price, 10)
  return {
    ...d,
    price: Number.isFinite(price) ? price : 0,
    options: d.options && d.options.length > 0 ? d.options : undefined,
  }
}

export function AdminProducts() {
  const { products, upsert, remove, reset } = useProducts()
  const [editing, setEditing] = useState<DraftProduct | null>(null)
  const [exportOpen, setExportOpen] = useState(false)

  const exportJson = useMemo(
    () => JSON.stringify(products, null, 2),
    [products],
  )

  const startAdd = () => {
    setEditing({ ...blankDraft, id: `product-${Date.now()}` })
  }

  return (
    <AdminShell
      eyebrow="Products"
      title="제품 관리"
      description="굿즈를 추가·수정·삭제하고 이미지를 등록합니다."
      actions={
        <>
          <button
            onClick={startAdd}
            className="rounded-full bg-ink px-5 py-2.5 font-en text-sm text-paper hover:-translate-y-0.5"
          >
            + 새 제품
          </button>
          <button
            onClick={() => setExportOpen(true)}
            className="rounded-full border border-ink/15 bg-paper px-5 py-2.5 font-en text-sm text-ink hover:border-ink"
          >
            JSON 내보내기
          </button>
          <button
            onClick={() => {
              if (confirm('기본값으로 되돌릴까요? 현재 변경분이 사라져요.')) {
                reset()
              }
            }}
            className="rounded-full px-5 py-2.5 font-en text-sm text-ink-soft hover:text-ink"
          >
            기본값 초기화
          </button>
        </>
      }
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ink-mute">
        {products.length}개 등록됨
      </p>

      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-paper">
        <table className="w-full text-left">
          <thead className="bg-paper-2 font-mono text-[11px] uppercase tracking-widest text-ink-mute">
            <tr>
              <th className="px-5 py-3">상품</th>
              <th className="hidden px-5 py-3 sm:table-cell">카테고리</th>
              <th className="hidden px-5 py-3 md:table-cell">가격</th>
              <th className="px-5 py-3">상태</th>
              <th className="px-5 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center text-ink-soft">
                  등록된 제품이 없어요. 우상단{' '}
                  <b className="text-ink">+ 새 제품</b>으로 추가해 주세요.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-ink/10 hover:bg-paper-2/40"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-paper-2">
                        {p.image ? (
                          <img src={p.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-xl">{p.emoji}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-display text-base text-ink">
                          {p.name}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                          {p.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-ink-soft sm:table-cell">
                    {p.category}
                  </td>
                  <td className="hidden px-5 py-4 font-en text-sm text-ink md:table-cell">
                    ₩{p.price.toLocaleString('ko-KR')}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={p.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => setEditing(toDraft(p))}
                        className="rounded-full border border-ink/15 px-3 py-1.5 font-en text-xs text-ink hover:border-ink"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`"${p.name}"을 삭제할까요?`)) {
                            remove(p.id)
                          }
                        }}
                        className="rounded-full px-3 py-1.5 font-en text-xs text-accent hover:underline"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editing && (
          <ProductEditModal
            draft={editing}
            existingIds={products.map((p) => p.id)}
            onChange={setEditing}
            onSave={(d) => {
              upsert(fromDraft(d))
              setEditing(null)
            }}
            onClose={() => setEditing(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {exportOpen && (
          <ExportModal json={exportJson} onClose={() => setExportOpen(false)} />
        )}
      </AnimatePresence>
    </AdminShell>
  )
}

function StatusPill({ status }: { status: ProductStatus }) {
  const tone =
    status === '판매중'
      ? 'bg-accent-soft text-accent-deep'
      : status === '예약판매'
        ? 'bg-paper-2 text-ink'
        : status === '재고소진'
          ? 'bg-ink/10 text-ink-soft'
          : 'bg-paper-2 text-ink-mute'
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${tone}`}
    >
      {status}
    </span>
  )
}

function ProductEditModal({
  draft,
  existingIds,
  onChange,
  onSave,
  onClose,
}: {
  draft: DraftProduct
  existingIds: string[]
  onChange: (d: DraftProduct) => void
  onSave: (d: DraftProduct) => void
  onClose: () => void
}) {
  const [optionsText, setOptionsText] = useState((draft.options ?? []).join(', '))

  useEffect(() => {
    onChange({
      ...draft,
      options: optionsText.split(',').map((s) => s.trim()).filter(Boolean),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsText])

  const isNew = !existingIds.includes(draft.id)
  const valid =
    draft.id.trim() !== '' &&
    draft.name.trim() !== '' &&
    /^\d+$/.test(draft.price)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (valid) onSave(draft)
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.form
        onSubmit={submit}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {isNew ? 'New product' : 'Edit product'}
            </p>
            <h2 className="mt-1 font-display text-2xl text-ink">
              {isNew ? '새 제품 추가' : draft.name || '제품 수정'}
            </h2>
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="ID (고유키)">
            <input
              value={draft.id}
              onChange={(e) => onChange({ ...draft, id: e.target.value })}
              placeholder="tee-quirky-logo"
              className="input"
            />
          </Field>
          <Field label="이모지 (이미지 없을 때 표시)">
            <input
              value={draft.emoji}
              onChange={(e) => onChange({ ...draft, emoji: e.target.value })}
              placeholder="👕"
              className="input"
            />
          </Field>

          <Field label="상품명" full>
            <input
              value={draft.name}
              onChange={(e) => onChange({ ...draft, name: e.target.value })}
              placeholder="Quirky 로고 티셔츠"
              className="input"
            />
          </Field>

          <Field label="카테고리">
            <select
              value={draft.category}
              onChange={(e) =>
                onChange({ ...draft, category: e.target.value as ProductCategory })
              }
              className="input"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="상태">
            <select
              value={draft.status}
              onChange={(e) =>
                onChange({ ...draft, status: e.target.value as ProductStatus })
              }
              className="input"
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>

          <Field label="가격 (원)">
            <input
              value={draft.price}
              onChange={(e) =>
                onChange({ ...draft, price: e.target.value.replace(/[^\d]/g, '') })
              }
              placeholder="18000"
              inputMode="numeric"
              className="input"
            />
          </Field>

          <Field label="이미지 (URL, 선택)">
            <input
              value={draft.image ?? ''}
              onChange={(e) =>
                onChange({ ...draft, image: e.target.value || undefined })
              }
              placeholder="https://..."
              className="input"
            />
          </Field>

          <Field label="옵션 (쉼표로 구분)" full>
            <input
              value={optionsText}
              onChange={(e) => setOptionsText(e.target.value)}
              placeholder="S, M, L, XL"
              className="input"
            />
          </Field>

          <Field label="설명" full>
            <textarea
              value={draft.description}
              onChange={(e) => onChange({ ...draft, description: e.target.value })}
              rows={3}
              placeholder="상품에 대한 짧은 설명"
              className="input resize-none"
            />
          </Field>
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-ink/15 px-6 py-3 font-en text-sm text-ink hover:border-ink"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!valid}
            className="rounded-full bg-ink px-6 py-3 font-en text-sm text-paper hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-ink/30"
          >
            {isNew ? '추가하기' : '저장하기'}
          </button>
        </div>

        <style>{adminInputStyle}</style>
      </motion.form>
    </motion.div>
  )
}

function Field({
  label,
  children,
  full,
}: {
  label: string
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <span className="font-mono text-xs uppercase tracking-widest text-ink-mute">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  )
}

function ExportModal({
  json,
  onClose,
}: {
  json: string
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* no-op */
    }
  }

  const download = () => {
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `quirky-products-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Export
            </p>
            <h2 className="mt-1 font-display text-2xl text-ink">
              제품 카탈로그 JSON
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              이 내용을{' '}
              <code className="rounded bg-paper-2 px-1 py-0.5 font-mono text-xs">
                src/data/products.ts 의 defaultProducts
              </code>{' '}
              에 붙여넣고 커밋하세요.
            </p>
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

        <pre className="mt-6 max-h-80 overflow-auto rounded-2xl bg-paper-2 p-4 font-mono text-xs text-ink">
{json}
        </pre>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={copy}
            className="rounded-full border border-ink/15 px-5 py-2.5 font-en text-sm text-ink hover:border-ink"
          >
            {copied ? '복사됨 ✓' : '클립보드에 복사'}
          </button>
          <button
            onClick={download}
            className="rounded-full bg-ink px-5 py-2.5 font-en text-sm text-paper hover:-translate-y-0.5"
          >
            .json 다운로드
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const adminInputStyle = `
  .input {
    width: 100%;
    background: var(--color-paper);
    border: 1px solid color-mix(in srgb, var(--color-ink) 15%, transparent);
    border-radius: 12px;
    padding: 10px 14px;
    font-family: var(--font-sans);
    font-size: 14px;
    color: var(--color-ink);
    outline: none;
    transition: border-color 200ms ease;
  }
  .input:focus { border-color: var(--color-ink); }
`
