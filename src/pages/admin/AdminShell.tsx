import type { ReactNode } from 'react'

/**
 * Admin 페이지 공용 셸 — 제목 영역 + 본문 패딩.
 * Dashboard/Products/Members가 모두 이걸 감싸 사용.
 */
export function AdminShell({
  title,
  eyebrow,
  description,
  actions,
  children,
}: {
  title: string
  eyebrow?: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="px-6 py-10 pl-20 lg:px-10 lg:py-12 lg:pl-10">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-6">
        <div>
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-1 font-display text-3xl text-ink sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">{description}</p>
          )}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </header>
      <div className="mt-8">{children}</div>
    </div>
  )
}
