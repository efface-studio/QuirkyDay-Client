import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Activities } from '@/pages/Activities'
import { Shop } from '@/pages/Shop'
import { Members } from '@/pages/Members'
import { Contact } from '@/pages/Contact'
import { NotFound } from '@/pages/NotFound'
import { AdminLayout } from '@/pages/admin/AdminLayout'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { AdminProducts } from '@/pages/admin/AdminProducts'

function App() {
  return (
    <Routes>
      {/* 관리자 — 메인 Layout 밖, 자체 사이드바 */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
      </Route>

      {/* 공개 사이트 */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="activities" element={<Activities />} />
        <Route path="shop" element={<Shop />} />
        <Route path="members" element={<Members />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
