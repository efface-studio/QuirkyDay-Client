import { Link } from 'react-router-dom'
import { AdminShell } from './AdminShell'
import { useProducts } from '@/hooks/useProducts'
import { useMembers } from '@/hooks/useMembers'

export function AdminDashboard() {
  const { products } = useProducts()
  const { members } = useMembers()

  const onSale = products.filter((p) => p.status === '판매중').length
  const soldOut = products.filter((p) => p.status === '재고소진').length
  const reservation = products.filter((p) => p.status === '예약판매').length

  return (
    <AdminShell
      eyebrow="대시보드"
      title="안녕하세요, 동아리장님."
      description="이 페이지는 동아리원의 작업 거점이에요. 좌측 메뉴에서 관리할 항목을 선택하세요."
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="등록된 제품" value={products.length} unit="개" tone="paper" />
        <Stat label="판매중" value={onSale} unit="개" tone="accent" />
        <Stat label="예약·재고소진" value={reservation + soldOut} unit="개" tone="paper" />
        <Stat label="멤버" value={members.length} unit="명" tone="paper" />
      </section>

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
          빠른 작업
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <QuickLink
            to="/admin/products"
            title="제품 관리"
            body="굿즈를 추가·수정·삭제하고 이미지를 업로드합니다."
            badge={`${products.length}개`}
          />
          <QuickLink
            to="/admin/members"
            title="멤버 관리"
            body="부원 프로필을 관리하고 표시 순서를 정합니다."
            badge={`${members.length}명`}
          />
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ink/10 bg-paper p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
          ⓘ 영구 반영
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          여기서 한 변경은 브라우저(localStorage)에 저장돼요. 다른 부원에게도
          보이게 하려면 각 페이지의{' '}
          <span className="text-ink">JSON 내보내기</span> 로 받은 파일을 코드에
          반영하고 배포해 주세요.
        </p>
      </section>
    </AdminShell>
  )
}

function Stat({
  label,
  value,
  unit,
  tone,
}: {
  label: string
  value: number
  unit: string
  tone: 'paper' | 'accent'
}) {
  const isAccent = tone === 'accent'
  return (
    <div
      className={`rounded-2xl border p-5 ${
        isAccent ? 'border-accent/30 bg-accent-soft' : 'border-ink/10 bg-paper'
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
        {label}
      </p>
      <p className="mt-3 flex items-baseline gap-1">
        <span className="font-display text-4xl text-ink">{value}</span>
        <span className="font-en text-sm text-ink-soft">{unit}</span>
      </p>
    </div>
  )
}

function QuickLink({
  to,
  title,
  body,
  badge,
}: {
  to: string
  title: string
  body: string
  badge: string
}) {
  return (
    <Link
      to={to}
      className="group flex items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-paper p-5 transition-colors hover:border-ink/40"
    >
      <div>
        <p className="font-display text-lg text-ink">{title}</p>
        <p className="mt-1 text-sm text-ink-soft">{body}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-paper-2 px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
          {badge}
        </span>
        <span className="text-ink-soft transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  )
}
