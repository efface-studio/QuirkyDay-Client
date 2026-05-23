import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * 스크롤 진입 시 fade-up reveal.
 * once:true 라 한번만 트리거 — 깜빡거리지 않는다.
 */
const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article' | 'span'
}) {
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      className={className}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={variants}
    >
      {children}
    </Comp>
  )
}
