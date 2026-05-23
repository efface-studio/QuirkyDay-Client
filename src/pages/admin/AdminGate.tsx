import { useState } from 'react'

// 진입 코드는 환경변수로 — 저장소에 노출되지 않게.
// 로컬 개발 시 .env 파일에 `VITE_ADMIN_PIN=...` 추가.
const PIN = import.meta.env.VITE_ADMIN_PIN ?? ''

/**
 * Admin 진입 게이트. 단순 PIN 확인.
 * 통과하면 sessionStorage에 토큰을 남긴다 — 새로고침에도 유지.
 */
export function AdminGate({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // PIN이 비어있으면(환경변수 미설정) 잠금 — 의도치 않은 통과 방지
    if (PIN && value.trim() === PIN) {
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-ink text-paper">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-paper/15 bg-paper/5 p-8 backdrop-blur"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-paper/60">
          Quirky Day · Admin
        </p>
        <h1 className="mt-2 font-display text-3xl text-paper">관리자 로그인</h1>
        <p className="mt-2 text-sm text-paper/70">
          진입 코드를 입력해 주세요.
        </p>

        <label
          htmlFor="admin-pin"
          className="mt-8 block font-mono text-[11px] uppercase tracking-widest text-paper/60"
        >
          Access code
        </label>
        <input
          id="admin-pin"
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError(false)
          }}
          autoFocus
          autoComplete="off"
          className="mt-2 w-full rounded-2xl border border-paper/20 bg-ink px-4 py-3 font-en text-lg text-paper placeholder:text-paper/40 focus:border-accent focus:outline-none"
          placeholder="••••••••"
        />
        {error && (
          <p className="mt-2 text-sm text-accent">코드가 맞지 않아요.</p>
        )}
        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-paper px-5 py-3 font-en text-sm text-ink hover:-translate-y-0.5"
        >
          들어가기 →
        </button>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-paper/40">
          hint · 동아리장에게 문의
        </p>
      </form>
    </div>
  )
}
