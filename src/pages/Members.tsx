import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/motion/Reveal'

interface Member {
  id: string
  name: string
  role: string
  bio: string
}

const members: Member[] = [
  {
    id: 'leader',
    name: '리더',
    role: '동아리장 · 기획',
    bio: '아이디어를 모으고, 팀이 굴러가게 만드는 사람.',
  },
  {
    id: 'design',
    name: '디자인',
    role: '디자인 · 브랜딩',
    bio: '제품의 첫인상. UI/일러스트 둘 다.',
  },
  {
    id: 'dev',
    name: '개발',
    role: '개발 · 프로토',
    bio: '아이디어를 동작하는 화면으로. 노코드와 코드를 오갑니다.',
  },
  {
    id: 'marketing',
    name: '마케팅',
    role: '마케팅 · 콘텐츠',
    bio: '인스타그램과 오프라인 부스를 통해 사람들에게 가닿게.',
  },
  {
    id: 'ops',
    name: '운영',
    role: '운영 · 일정',
    bio: '센터와의 커뮤니케이션, 모임 일정, 회비.',
  },
  {
    id: 'rookie',
    name: '신입',
    role: '신입 부원',
    bio: '여러분의 자리가 될 수도 있어요.',
  },
]

export function Members() {
  return (
    <>
      <PageHeader
        eyebrow="Members"
        title="Quirky를 만드는 사람들."
        description="다른 강점, 같은 호기심."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m, i) => (
              <Reveal key={m.id} delay={i} as="article">
                <div className="card overflow-hidden rounded-3xl">
                  <div className="flex aspect-[4/3] items-center justify-center bg-paper-2">
                    <div
                      className="grid h-24 w-24 place-items-center rounded-full bg-paper font-display text-3xl text-ink shadow-sm"
                      aria-hidden="true"
                    >
                      {m.name.charAt(0)}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">
                      {m.role}
                    </p>
                    <h3 className="mt-1 font-display text-xl text-ink">
                      {m.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">{m.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
