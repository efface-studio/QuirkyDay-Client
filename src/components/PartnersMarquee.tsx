import { Marquee } from './Marquee'

export interface Partner {
  name: string
  href?: string
  /** 단순 텍스트 로고용 — 실제 이미지가 있다면 src 사용 */
  src?: string
}

/**
 * 협력 / 후원 / 함께한 브랜드를 무한 가로 마퀴로 표시.
 * 로고가 없으면 동아리·기관 이름을 monospace 텍스트로 보여줘서
 * 사진 없이도 자연스럽게 운영할 수 있다.
 */
export function PartnersMarquee({ partners }: { partners: Partner[] }) {
  return (
    <Marquee className="border-y border-ink/10 bg-paper/70">
      {partners.map((p, i) => (
        <PartnerItem key={`${p.name}-${i}`} partner={p} />
      ))}
    </Marquee>
  )
}

function PartnerItem({ partner }: { partner: Partner }) {
  const inner = partner.src ? (
    <img
      src={partner.src}
      alt={partner.name}
      className="h-7 opacity-50 grayscale transition group-hover:opacity-100 group-hover:grayscale-0 sm:h-9"
    />
  ) : (
    <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-mute transition-colors group-hover:text-ink sm:text-sm">
      {partner.name}
    </span>
  )

  return (
    <div className="group flex items-center px-8 py-6 sm:px-12 sm:py-7">
      {partner.href ? (
        <a href={partner.href} target="_blank" rel="noreferrer">
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  )
}
