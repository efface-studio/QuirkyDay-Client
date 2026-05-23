import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export function Layout() {
  const { pathname } = useLocation()

  // 라우트 변경 시 스크롤을 최상단으로
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/*
        외곽 컨테이너에 max-w-[88rem] (1408px) — 사이드바(192px) + 메인의
        max-w-7xl(1280px) 가 빈틈 없이 정확히 채워지는 폭. 더 넓게 잡으면
        페이지 mx-auto 가 사이드바와 무관하게 가운데로 흘러가 둘이 분리돼
        보이고, 더 좁게 잡으면 페이지 콘텐츠가 답답해진다.
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
