import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="*" element={<ComingSoon />} />
    </Routes>
  )
}

function ComingSoon() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper text-ink">
      <div className="px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
          중구청소년센터 청소년 창업 동아리
        </p>
        <h1 className="mt-3 font-display text-5xl text-ink">Quirky Day</h1>
        <p className="mt-3 text-sm text-ink-soft">
          사이트는 곧 공개돼요.
        </p>
      </div>
    </main>
  )
}

export default App
