import { motion } from 'motion/react'

/**
 * 프로젝트·멤버 페이지에서 쓰는 기수 필터 탭.
 * 활성 항목 아래에 layoutId 로 부드럽게 따라오는 underline 필.
 */
export function CohortFilter<T extends string>({
  items,
  active,
  onChange,
}: {
  items: readonly T[]
  active: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-ink/10">
      {items.map((item) => {
        const isActive = item === active
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`relative px-4 py-2.5 font-en text-sm transition-colors ${
              isActive ? 'text-ink' : 'text-ink-mute hover:text-ink'
            }`}
          >
            {item}
            {isActive && (
              <motion.span
                layoutId="cohort-underline"
                className="absolute inset-x-2 -bottom-px h-0.5 bg-accent"
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
