import type { ReactNode } from 'react'

/**
 * Section 의 배경/블롭을 viewport 전체 폭으로 확장하는 wrapper.
 * Layout 의 outer max-w 컨테이너를 뚫고 나가서 사이드바 뒤까지 흐른다.
 *
 * 사용:
 *   <section className="relative isolate">
 *     <FullBleed className="-z-10">
 *       <BlobsOrBackground />
 *     </FullBleed>
 *     <div className="mx-auto max-w-7xl">{content}</div>
 *   </section>
 *
 * 트릭: absolute + left:50% + translateX:-50% + width:100vw
 */
export function FullBleed({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 top-0 h-full w-screen -translate-x-1/2 overflow-hidden ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
