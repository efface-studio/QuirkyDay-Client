import { Link, useLocation, matchPath } from 'react-router-dom'
import { useMemo } from 'react'
import { motion } from 'motion/react'
import { navLinks, site } from '@/config/site'
import { useScrollSpy } from '@/hooks/useScrollSpy'

/**
 * lg+ 데스크탑에서 좌측에 sticky로 붙는 세로 nav.
 * 사이드바 영역이 별도 카드처럼 보이지 않도록 — 같은 paper 배경,
 * 본문과 비슷한 텍스트 위계, 작은 간격, 미세한 점 인디케이터.
 */
export function Sidebar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const sectionIds = useMemo(() => navLinks.map((l) => l.sectionId), [])
  const activeSection = useScrollSpy(sectionIds, isHome)

  const isLinkActive = (link: (typeof navLinks)[number]) => {
    if (isHome) return (activeSection ?? 'home') === link.sectionId
    return matchPath({ path: link.to, end: link.to === '/' }, pathname) !== null
  }

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof navLinks)[number],
  ) => {
    if (isHome) {
      const el = document.getElementById(link.sectionId)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    if (link.to === pathname) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <aside className="sticky top-0 hidden h-screen w-48 shrink-0 lg:flex lg:flex-col">
      <div className="flex h-full flex-col px-7 py-10">
        <Link to="/" className="font-display text-lg leading-none text-ink">
          {site.name}
        </Link>
        <p className="mt-1 text-[11px] text-ink-mute">청소년 창업 동아리</p>

        <nav className="mt-12 flex flex-col">
          {navLinks.map((link) => {
            const active = isLinkActive(link)
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => handleClick(e, link)}
                className={`group relative flex items-center gap-2.5 py-1 font-en text-sm transition-colors ${
                  active ? 'text-ink' : 'text-ink-mute hover:text-ink'
                }`}
              >
                <span className="relative inline-flex h-1 w-1 shrink-0">
                  {active && (
                    <motion.span
                      layoutId="side-dot"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    />
                  )}
                </span>
                <span className={active ? 'font-medium' : undefined}>
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto space-y-2 pt-10 text-xs">
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="block text-ink-mute hover:text-accent"
          >
            IG {site.instagramHandle}
          </a>
          <p className="text-ink-mute">{site.location}</p>
        </div>
      </div>
    </aside>
  )
}
