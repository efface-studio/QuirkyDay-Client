import { Marquee } from './Marquee'

export type PartnerCategory = '운영' | '상위' | '연계' | '창업지원' | '행사'

export interface Partner {
  /** 기관 정식 명칭 */
  name: string
  /** 공식 사이트 URL */
  href?: string
  /** 실제 로고 이미지 (URL 또는 dataURL). 있으면 우선 표시 */
  src?: string
  /** 로고 이미지가 없을 때 표시할 1~3글자 약자 */
  mark?: string
  /** 카테고리 — 추후 그룹핑/필터링용 */
  category?: PartnerCategory
}

/**
 * 무한 가로 마퀴.
 *  - 로고 이미지(src)가 있으면 그걸 표시
 *  - 없으면 약자(mark) 를 둥근 보더 캡슐로 표시 + 옆에 기관 이름
 *  - mark 도 없으면 텍스트만
 *
 * hover 시 그레이스케일 → 컬러 + 살짝 떠오름.
 */
export function PartnersMarquee({ partners }: { partners: Partner[] }) {
  return (
    <Marquee className="border-y-2 border-ink bg-paper">
      {partners.map((p, i) => (
        <PartnerItem key={`${p.name}-${i}`} partner={p} />
      ))}
    </Marquee>
  )
}

function PartnerItem({ partner }: { partner: Partner }) {
  const body = (
    <div className="group flex items-center gap-3 px-8 py-7 sm:px-10 sm:py-8">
      {partner.src ? (
        <img
          src={partner.src}
          alt={partner.name}
          className="h-10 w-10 object-contain opacity-60 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
        />
      ) : partner.mark ? (
        <span className="flex h-10 min-w-10 items-center justify-center rounded-full border-2 border-ink/70 bg-paper px-2 font-display text-[13px] text-ink transition group-hover:border-magenta group-hover:bg-magenta group-hover:text-paper">
          {partner.mark}
        </span>
      ) : null}
      <span className="whitespace-nowrap font-display text-base text-ink/60 transition-colors group-hover:text-ink sm:text-lg">
        {partner.name}
      </span>
    </div>
  )

  return partner.href ? (
    <a
      href={partner.href}
      target="_blank"
      rel="noreferrer"
      className="block transition-transform hover:-translate-y-0.5"
    >
      {body}
    </a>
  ) : (
    body
  )
}
