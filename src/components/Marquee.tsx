import type { ReactNode } from 'react'

/**
 * 무한 가로 마퀴. children 을 두 번 렌더해서 끊김 없이 흐른다.
 * hover 하면 일시정지 (index.css 의 .marquee-track:hover 참고).
 */
export function Marquee({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
