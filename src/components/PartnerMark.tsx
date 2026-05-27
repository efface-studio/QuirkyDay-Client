import { motion } from 'motion/react'

export type PartnerMarkShape = 'circle' | 'square' | 'hex' | 'star'
export type PartnerMarkTone =
  | 'magenta'
  | 'cyan'
  | 'lime'
  | 'purple'
  | 'tangerine'

/**
 * 기관 로고 카드의 미니 마크 — 도형 + 약자.
 * 공식 로고 대신 우리 사이트 톤으로 통일된 자체 그래픽.
 *
 * - shape: 운영=star · 상위=hex · 연계=circle 으로 카테고리 구분
 * - tone: 카테고리에 맞는 컬러
 */
export function PartnerMark({
  mark,
  shape = 'hex',
  tone = 'cyan',
  size = 48,
}: {
  mark: string
  shape?: PartnerMarkShape
  tone?: PartnerMarkTone
  size?: number
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
      viewBox="0 0 64 64"
      role="img"
      aria-label={mark}
      whileHover={{ rotate: shape === 'star' ? 360 : 12, scale: 1.08 }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 14,
      }}
      className="shrink-0"
    >
      {/* 도형 배경 */}
      <ShapeBg shape={shape} fill={fill} />
      {/* 약자 텍스트 — 도형 가운데 */}
      <text
        x="32"
        y="32"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Black Han Sans, Jua, sans-serif"
        fontSize={mark.length <= 2 ? 22 : mark.length === 3 ? 17 : 14}
        fill="var(--color-ink)"
        style={{ letterSpacing: '-0.02em' }}
      >
        {mark}
      </text>
    </motion.svg>
  )
}

function ShapeBg({ shape, fill }: { shape: PartnerMarkShape; fill: string }) {
  switch (shape) {
    case 'circle':
      return (
        <>
          <circle cx="32" cy="32" r="30" fill={fill} />
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="2.5"
          />
        </>
      )
    case 'square':
      return (
        <>
          <rect x="4" y="4" width="56" height="56" rx="14" fill={fill} />
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            rx="14"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="2.5"
          />
        </>
      )
    case 'hex':
      return (
        <>
          <path
            d="M32 4 L58 18 L58 46 L32 60 L6 46 L6 18 Z"
            fill={fill}
            stroke="var(--color-ink)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </>
      )
    case 'star':
      return (
        <path
          d="M32 4 C42 4, 48 14, 56 18 C60 22, 60 32, 60 38 C60 46, 54 56, 46 58 C42 60, 38 60, 32 60 C26 60, 22 60, 18 58 C10 56, 4 46, 4 38 C4 32, 4 22, 8 18 C16 14, 22 4, 32 4 Z"
          fill={fill}
          stroke="var(--color-ink)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      )
  }
}
