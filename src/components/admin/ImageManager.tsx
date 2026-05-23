import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { approxKB, compressImage } from '@/lib/image'

/**
 * Admin 폼의 이미지 매니저.
 * - 파일 선택(여러 장 한번에) → 자동 압축 → dataURL 추가
 * - URL 직접 추가
 * - 추가된 이미지 썸네일 그리드: 삭제, 좌/우 순서 변경, 대표 지정
 * - 첫 번째 이미지가 자동으로 "대표(메인)" — 별도 토글 없이 위치로 표현
 */
export function ImageManager({
  images,
  onChange,
}: {
  images: string[]
  onChange: (next: string[]) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [urlInput, setUrlInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setBusy(true)
    setError(null)
    try {
      const next = [...images]
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) continue
        const dataUrl = await compressImage(file)
        next.push(dataUrl)
      }
      onChange(next)
    } catch (e) {
      setError(e instanceof Error ? e.message : '이미지를 처리하지 못했어요.')
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const addUrl = () => {
    const v = urlInput.trim()
    if (!v) return
    onChange([...images, v])
    setUrlInput('')
  }

  const removeAt = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx))
  }

  const move = (idx: number, dir: -1 | 1) => {
    const target = idx + dir
    if (target < 0 || target >= images.length) return
    const next = [...images]
    ;[next[idx], next[target]] = [next[target], next[idx]]
    onChange(next)
  }

  return (
    <div>
      {/* 추가된 썸네일 그리드 */}
      {images.length > 0 && (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          <AnimatePresence initial={false}>
            {images.map((src, idx) => (
              <motion.li
                key={src.slice(0, 64) + idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="group relative aspect-square overflow-hidden rounded-xl border border-ink/15 bg-paper-2"
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                {/* 대표 배지 */}
                {idx === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-accent px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-paper">
                    대표
                  </span>
                )}

                {/* 크기 표시 (dataURL일 때만) */}
                {src.startsWith('data:') && (
                  <span className="absolute bottom-1.5 left-1.5 rounded bg-ink/70 px-1.5 py-0.5 font-mono text-[9px] text-paper">
                    {approxKB(src)}KB
                  </span>
                )}

                {/* 컨트롤 — hover 또는 항상 보이게 */}
                <div className="absolute inset-x-0 top-0 flex justify-end gap-1 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100 sm:group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => removeAt(idx)}
                    aria-label="이미지 삭제"
                    title="삭제"
                    className="rounded-full bg-ink/80 px-1.5 py-0.5 font-mono text-[10px] text-paper hover:bg-accent"
                  >
                    ✕
                  </button>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100">
                  <button
                    type="button"
                    onClick={() => move(idx, -1)}
                    disabled={idx === 0}
                    aria-label="앞으로 이동"
                    title="앞으로"
                    className="rounded-full bg-ink/80 px-1.5 py-0.5 font-mono text-[10px] text-paper hover:bg-accent disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => move(idx, 1)}
                    disabled={idx === images.length - 1}
                    aria-label="뒤로 이동"
                    title="뒤로"
                    className="rounded-full bg-ink/80 px-1.5 py-0.5 font-mono text-[10px] text-paper hover:bg-accent disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    →
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {/* 추가 컨트롤 */}
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/30 bg-paper-2/50 font-en text-sm text-ink hover:border-ink hover:bg-paper-2 disabled:cursor-wait"
        >
          {busy ? '처리 중…' : '+ 사진 추가 (여러 장 선택 가능)'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* URL로 추가 */}
      <div className="mt-2 flex gap-2">
        <input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="또는 이미지 URL 직접 추가"
          className="flex-1 rounded-xl border border-ink/15 bg-paper px-3 py-2 font-sans text-sm text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none"
        />
        <button
          type="button"
          onClick={addUrl}
          disabled={!urlInput.trim()}
          className="rounded-xl border border-ink/15 px-3 py-2 font-en text-sm text-ink hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          URL 추가
        </button>
      </div>

      {/* 안내 + 에러 */}
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink-mute">
        업로드한 사진은 자동 압축돼 브라우저에 저장됩니다.
        {images.length > 0 && ` · 총 ${images.length}장 · 첫 번째가 대표 이미지`}
      </p>
      {error && (
        <p className="mt-2 text-sm text-accent">{error}</p>
      )}
    </div>
  )
}
