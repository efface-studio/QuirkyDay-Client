import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/motion/Reveal'
import { site } from '@/config/site'

export function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="우리는 이런 동아리예요."
        description={`${site.location} 소속 청소년 창업 동아리, ${site.name}입니다.`}
      />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delay={i} as="article">
              <div
                className={`px-6 py-16 sm:px-12 sm:py-20 ${
                  i < 2 ? '' : 'border-t border-ink/10'
                } ${i % 2 === 0 ? 'sm:border-r sm:border-ink/10' : ''}`}
              >
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  /{String(i + 1).padStart(2, '0')} {b.eyebrow}
                </p>
                <h3 className="mt-4 font-display text-3xl leading-[1.1] text-ink sm:text-4xl">
                  {b.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                  {b.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
              Values
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
              우리가 중요하게 여기는 것.
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i + 1} as="li">
                <div className="card h-full rounded-3xl p-7">
                  <p className="font-en text-3xl text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 font-display text-xl text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

const blocks = [
  {
    eyebrow: 'Mission',
    title: '엉뚱함을 칭찬으로.',
    body: '청소년이 떠올리는 작은 아이디어가 실제로 누군가의 문제를 해결하는 제품이 되도록 돕습니다.',
  },
  {
    eyebrow: 'Vision',
    title: '중구의 청소년 창업 거점.',
    body: '또래가 또래의 문제를 푸는 작은 창업가들의 커뮤니티를 만들어 갑니다.',
  },
  {
    eyebrow: 'Base',
    title: '중구청소년센터에서.',
    body: '센터의 공간·멘토링·네트워크를 적극 활용하며 매주 정기 모임을 합니다.',
  },
  {
    eyebrow: 'How',
    title: '매주 만들어 봅니다.',
    body: '브레인스토밍 → 프로토타입 → 데모데이의 사이클을 매달 굴립니다.',
  },
] as const

const values = [
  {
    title: '일단 만들어본다',
    body: '완벽한 계획보다 빠른 실험. 종이 프로토타입이라도 좋아요.',
  },
  {
    title: '강점을 빌려쓴다',
    body: '혼자 다 잘할 필요 없어요. 팀원의 다른 능력이 곧 우리 자산.',
  },
  {
    title: '실패도 기록한다',
    body: '안 된 것에서 배우는 게 더 많아요. 모든 시도를 회고합니다.',
  },
] as const
