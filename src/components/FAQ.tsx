import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export interface FAQItem {
  q: string
  a: string
}

/**
 * 아코디언 FAQ — 한 번에 하나만 펼친다.
 * height: auto 애니메이션을 위해 motion 의 자동 high-fidelity layout 활용.
 */
export function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <ul className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span className="flex-1 font-display text-lg text-ink sm:text-xl">
                <span className="mr-3 font-mono text-xs text-accent">
                  Q{String(i + 1).padStart(2, '0')}
                </span>
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/20 text-base text-ink"
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 pl-12 pr-10 text-sm leading-relaxed text-ink-soft sm:text-base">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
