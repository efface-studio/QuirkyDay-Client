import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

/**
 * 스크롤 진행도에 따라 y로 살짝 떠 움직이는 컨테이너.
 * offset = 부드러운 패럴랙스 양 (px). 양수면 천천히 위로 흐름.
 */
export function Parallax({
  children,
  offset = 80,
  className,
}: {
  children: ReactNode
  offset?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
