import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-40 text-center">
      <p className="font-display text-7xl text-accent">404</p>
      <h1 className="mt-6 font-display text-3xl text-ink">
        페이지를 찾을 수 없어요
      </h1>
      <p className="mt-2 text-ink-soft">
        주소가 바뀌었거나, 아직 만들어지지 않은 페이지일 수 있어요.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-ink px-6 py-3 font-en text-sm text-paper hover:-translate-y-0.5"
      >
        홈으로 돌아가기 →
      </Link>
    </section>
  )
}
