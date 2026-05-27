import { motion } from 'motion/react'
import { Marquee } from './Marquee'
import {
  PartnerMark,
  type PartnerMarkShape,
  type PartnerMarkTone,
} from './PartnerMark'

export type PartnerCategory = '운영' | '상위' | '연계' | '창업지원' | '행사'

export interface Partner {
  /** 기관 정식 명칭 */
  name: string
  /** 공식 사이트 URL */
  href?: string
  /** 실제 로고 이미지 (URL 또는 dataURL). 있으면 SVG 마크 대신 표시 */
  src?: string
  /** 1~3글자 약자 — SVG 마크의 중앙 텍스트 */
  mark?: string
  /** 카테고리 — 라벨로 노출 */
  category?: PartnerCategory
  /** 마크 도형 — 카테고리 매칭이 보통 */
  shape?: PartnerMarkShape
  /** 마크 컬러 톤 */
  tone?: PartnerMarkTone
}

/**
 * 함께한 기관 마퀴 — 카드 형태로 흐른다.
 * 각 카드: SVG 마크(도형+약자) + 정식 명칭 + 카테고리 라벨.
 * hover 시 살짝 떠오름, 새 탭으로 공식 사이트 이동.
 */
export function PartnersMarquee({ partners }: { partners: Partner[] }) {
  return (
    <Marquee className="py-4">
      {partners.map((p, i) => (
        <PartnerCard key={`${p.name}-${i}`} partner={p} />
      ))}
    </Marquee>
  )
}

function PartnerCard({ partner }: { partner: Partner }) {
  const body = (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="group mx-3 flex items-center gap-4 rounded-2xl border-2 border-ink/15 bg-paper px-5 py-4 transition-colors hover:border-ink sm:gap-5 sm:px-6"
    >
      {partner.src ? (
        <img
          src={partner.src}
          alt={partner.name}
          className="h-12 w-12 shrink-0 object-contain"
        />
      ) : partner.mark ? (
        <PartnerMark
          mark={partner.mark}
          shape={partner.shape ?? 'hex'}
          tone={partner.tone ?? 'cyan'}
          size={48}
        />
      ) : null}

      <div className="flex flex-col justify-center">
        {partner.category && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
            {partner.category}
          </span>
        )}
        <span className="whitespace-nowrap font-display text-base text-ink transition-colors sm:text-lg">
          {partner.name}
        </span>
      </div>
    </motion.div>
  )

  return partner.href ? (
    <a
      href={partner.href}
      target="_blank"
      rel="noreferrer"
      title={`${partner.name} 공식 사이트`}
    >
      {body}
    </a>
  ) : (
    body
  )
}
