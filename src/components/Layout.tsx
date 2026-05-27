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
    <div className="min-h-screen bg-paper">
      {/*
        Sidebar 는 viewport 좌측에 fixed 로 떠 있고, main 은 viewport 전체 폭을
        쓰면서 lg:pl-48 로 사이드바 폭만큼 안쪽 여백을 둔다.
        이렇게 하면 hero 의 컬러 블록·블롭이 사이드바 뒤까지 자유롭게 흐르고,
        사이드바와 메인 콘텐츠가 같은 시각 환경으로 묶인다.
      */}
      <Sidebar />
      <div className="flex min-h-screen flex-col lg:pl-48">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
