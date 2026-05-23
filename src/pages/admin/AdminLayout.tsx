import { useState } from 'react'
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { AdminGate } from './AdminGate'

const AUTH_KEY = 'quirky.admin.auth'

const adminNav = [
  { to: '/admin', label: 'Dashboard', icon: '◧', end: true },
  { to: '/admin/products', label: '제품 관리', icon: '◆', end: false },
] as const

/**
 * Admin 전체 레이아웃 — 메인 사이트 Layout 과 분리.
 * 좌측 어두운 사이드바 + 우측 메인 콘텐츠.
 */
export function AdminLayout() {
  const navigate = useNavigate()
  const [authed, setAuthed] = useState(
    () =>
      typeof window !== 'undefined' &&
      sessionStorage.getItem(AUTH_KEY) === '1',
  )
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!authed) {
    return (
      <AdminGate
        onSuccess={() => {
          sessionStorage.setItem(AUTH_KEY, '1')
          setAuthed(true)
        }}
      />
    )
  }

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthed(false)
    navigate('/admin')
  }

  return (
    <div className="flex min-h-screen w-full bg-paper-2">
      {/* 모바일 햄버거 토글 */}
      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle admin menu"
        className="fixed left-4 top-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink lg:hidden"
      >
        <div className="space-y-1">
          <span className="block h-px w-5 bg-ink" />
          <span className="block h-px w-5 bg-ink" />
          <span className="block h-px w-5 bg-ink" />
        </div>
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-ink text-paper transition-transform lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col px-6 py-8">
          <div>
            <Link
              to="/"
              className="font-display text-2xl text-paper"
              title="공개 사이트로"
            >
              Quirky Day
            </Link>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper/50">
              · Admin Dashboard
            </p>
          </div>

          <nav className="mt-12 flex flex-col gap-1">
            {adminNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 font-en text-sm transition-colors ${
                    isActive ? 'text-paper' : 'text-paper/60 hover:text-paper'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="admin-active"
                        className="absolute inset-0 -z-10 rounded-xl bg-paper/10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span
                      className={`font-mono text-base ${
                        isActive ? 'text-accent' : 'text-paper/30'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto space-y-3 pt-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs text-paper/50 hover:text-paper"
            >
              ← 공개 사이트로 돌아가기
            </Link>
            <button
              type="button"
              onClick={logout}
              className="w-full rounded-full border border-paper/20 px-4 py-2 font-en text-xs text-paper/80 hover:border-paper hover:text-paper"
            >
              로그아웃
            </button>
            <p className="pt-2 font-mono text-[10px] uppercase tracking-widest text-paper/30">
              v1 · localStorage
            </p>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  )
}
