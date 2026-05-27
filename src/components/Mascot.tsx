import { motion } from 'motion/react'

/**
 * Quirky Day 마스코트 — 별 모양의 도형 캐릭터.
 * 다섯 가지 톤(magenta/cyan/lime/purple/tangerine) 으로 색칠 가능.
 *
 * - mood: 'happy' | 'wink' | 'oh' — 표정 변형
 * - float: true 이면 위아래 흔들리는 모션 (홈 hero 용)
 */
export function Mascot({
  size = 240,
  tone = 'magenta',
  mood = 'happy',
  float = false,
  className,
}: {
  size?: number
  tone?: 'magenta' | 'cyan' | 'lime' | 'purple' | 'tangerine'
  mood?: 'happy' | 'wink' | 'oh'
  float?: boolean
  className?: string
}) {
  const fill = {
    magenta: 'var(--color-magenta)',
    cyan: 'var(--color-cyan)',
    lime: 'var(--color-lime)',
    purple: 'var(--color-purple)',
    tangerine: 'var(--color-tangerine)',
  }[tone]

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Quirky Day mascot"
      className={`${float ? 'float' : ''} ${className ?? ''}`}
      initial={{ rotate: -8, scale: 0.85, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 160, damping: 14 }}
      whileHover={{ rotate: 6, scale: 1.06 }}
    >
      {/* 외곽 별 모양 — 8개 꼭지점 squircle */}
      <motion.path
        d="M100 8 C 122 8, 138 30, 162 38 C 186 46, 192 70, 192 100 C 192 130, 186 154, 162 162 C 138 170, 122 192, 100 192 C 78 192, 62 170, 38 162 C 14 154, 8 130, 8 100 C 8 70, 14 46, 38 38 C 62 30, 78 8, 100 8 Z"
        fill={fill}
        stroke="var(--color-ink)"
        strokeWidth={4}
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'center' }}
      />

      {/* 눈 — mood 에 따라 변형 */}
      {mood === 'wink' ? (
        <>
          <circle cx={75} cy={88} r={8} fill="var(--color-ink)" />
          <path
            d="M118 88 q 10 -4 20 0"
            stroke="var(--color-ink)"
            strokeWidth={4}
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : mood === 'oh' ? (
        <>
          <circle cx={78} cy={88} r={6} fill="var(--color-ink)" />
          <circle cx={128} cy={88} r={6} fill="var(--color-ink)" />
        </>
      ) : (
        <>
          <circle cx={78} cy={88} r={8} fill="var(--color-ink)" />
          <circle cx={128} cy={88} r={8} fill="var(--color-ink)" />
        </>
      )}

      {/* 입 — mood */}
      {mood === 'oh' ? (
        <ellipse cx={103} cy={130} rx={10} ry={14} fill="var(--color-ink)" />
      ) : (
        <path
          d="M76 122 q 27 24 54 0"
          stroke="var(--color-ink)"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* 볼터치 */}
      <circle cx={60} cy={118} r={6} fill="rgba(255,77,77,0.5)" />
      <circle cx={146} cy={118} r={6} fill="rgba(255,77,77,0.5)" />
    </motion.svg>
  )
}
