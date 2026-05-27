import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/*
        외곽 컨테이너에 max-w-[88rem] (1408px = 사이드바 192 + max-w-7xl 1280).
        사이드바는 그 안에서 sticky. 콘텐츠는 사이드바와 한 max-width 안에 함께
        정렬된다.

        hero 등 페이지 섹션이 viewport 전체 폭으로 배경을 깔고 싶을 때는
        섹션 안에서 `full-bleed` 트릭(absolute left:50% + width:100vw) 으로
        outer 를 뚫고 나간다.
      */}
      <div className="mx-auto flex w-full max-w-[88rem] flex-1">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
