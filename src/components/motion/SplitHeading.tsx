import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * 단어 단위로 stagger 등장하는 큰 헤딩.
 * children에 \n 으로 줄바꿈을 표현하면 별도 라인으로 처리.
 *
 * NOTE: 라인별 overflow: hidden은 두지 않는다 —
 * 폰트가 크면 좁은 컨테이너에서 단어가 잘리는 게 더 큰 문제.
 */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const word: Variants = {
  hidden: { opacity: 0, y: '0.4em' },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export function SplitHeading({
  text,
  className,
  lineClassName,
  highlight,
  highlightClassName = 'text-accent',
  suffix,
}: {
  text: string
  className?: string
  lineClassName?: string
  /** 강조할 단어(부분 일치) */
  highlight?: string
  highlightClassName?: string
  suffix?: ReactNode
}) {
  const lines = text.split('\n')
  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="show"
      variants={container}
    >
      {lines.map((line, li) => (
        <span key={li} className={`block ${lineClassName ?? ''}`}>
          {line.split(' ').map((w, wi) => {
            const isHighlight = highlight && w.includes(highlight)
            return (
              <motion.span
                key={`${li}-${wi}`}
                variants={word}
                className={`inline-block ${isHighlight ? highlightClassName : ''}`}
                style={{ marginRight: '0.2em' }}
              >
                {w}
              </motion.span>
            )
          })}
          {li === lines.length - 1 && suffix}
        </span>
      ))}
    </motion.h1>
  )
}
