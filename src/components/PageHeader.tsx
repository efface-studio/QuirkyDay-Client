import { motion } from 'motion/react'

/**
 * 서브 페이지 상단 공용 헤더 — 절제된 에디토리얼 톤.
 * 큰 디스플레이 타이틀 + 차분한 eyebrow + 본문 설명.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <section className="border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
          / {eyebrow.toLowerCase()}
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-4xl font-display leading-[1.05] text-ink break-keep text-[clamp(2.25rem,5.5vw,5rem)]"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-6 max-w-2xl text-lg text-ink-soft"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
