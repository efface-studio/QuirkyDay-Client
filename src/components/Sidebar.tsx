import { Link, useLocation, matchPath } from 'react-router-dom'
import { useMemo } from 'react'
import { motion } from 'motion/react'
import { navLinks, site } from '@/config/site'
import { useScrollSpy } from '@/hooks/useScrollSpy'

/**
 * lg+ 데스크탑에서 좌측에 sticky 로 붙는 세로 nav.
 * 모바일에서는 Header(상단 햄버거)가 대체한다.
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
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 border-r border-ink/10 bg-paper lg:flex lg:flex-col">
      <div className="flex h-full flex-col px-7 py-8">
        <Link to="/" className="font-display text-2xl text-ink">
          {site.name}
        </Link>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-mute">
          청소년 창업 동아리
        </p>

        <nav className="mt-12 flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = isLinkActive(link)
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => handleClick(e, link)}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 font-en text-[15px] transition-colors ${
                  active ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="side-active"
                    className="absolute inset-0 -z-10 rounded-xl bg-ink/8"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
                  {active && (
                    <motion.span
                      layoutId="side-dot"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    />
                  )}
                  <span
                    className={`absolute inset-0 rounded-full transition-colors ${
                      active ? 'bg-transparent' : 'bg-transparent group-hover:bg-ink/30'
                    }`}
                  />
                </span>
                <span className={active ? 'font-medium' : undefined}>
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
            Follow
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm text-ink hover:text-accent"
          >
            IG {site.instagramHandle}
          </a>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-ink-mute">
            Base
          </p>
          <p className="mt-1 text-sm text-ink-soft">{site.location}</p>
        </div>
      </div>
    </aside>
  )
}
