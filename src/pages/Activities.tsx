import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/motion/Reveal'

export function Activities() {
  return (
    <>
      <PageHeader
        eyebrow="Activities"
        title="이런 걸 하고 있어요."
        description="정기 모임부터 외부 도전까지 — Quirky Day의 활동들이에요."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
              Routine
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
              정기 활동.
            </h2>
          </Reveal>

          <ul className="rule mt-12">
            {routines.map((r, i) => (
              <Reveal key={r.title} delay={i} as="li">
                <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-6 border-b border-ink/10 px-2 py-8">
                  <span className="font-en text-4xl text-accent sm:text-5xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
                      {r.when}
                    </p>
                    <h3 className="mt-1 font-display text-xl text-ink sm:text-2xl">
                      {r.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm text-ink-soft">{r.body}</p>
                  </div>
                  <span className="hidden text-xl text-ink-mute sm:inline">↗</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
              Projects
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
              우리가 만든 것들.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i + 1} as="article">
                <div className="card overflow-hidden rounded-3xl">
                  <div className="flex h-44 items-center justify-center bg-paper text-6xl">
                    {p.emoji}
                  </div>
                  <div className="bg-paper p-5">
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">
                      {p.status}
                    </p>
                    <h3 className="mt-1 font-display text-lg text-ink">{p.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-ink-mute">
            * placeholder — 실제 프로젝트로 교체하세요.
          </p>
        </div>
      </section>
    </>
  )
}

const routines = [
  {
    when: '매주 · 정기 모임',
    title: '아이디어 브레인스토밍',
    body: '일상의 불편을 모아 다음 주 실험 주제를 정합니다.',
  },
  {
    when: '격주 · 워크숍',
    title: '메이커 워크숍',
    body: '디자인 툴 · 노코드 · 코딩으로 프로토타입 만드는 법을 같이 배워요.',
  },
  {
    when: '월 1회 · 데모데이',
    title: '내부 데모데이',
    body: '한 달간 만든 결과물을 발표하고 멘토와 또래의 피드백을 받아요.',
  },
  {
    when: '학기 1회 · 외부',
    title: '청소년 창업 공모전',
    body: '센터의 지원을 받아 외부 공모전 · 페어 · 해커톤에 출전합니다.',
  },
] as const

const projects = [
  {
    emoji: '📱',
    status: '진행 중',
    title: '프로젝트 A',
    body: '여기에 실제 프로젝트 한 줄 설명.',
  },
  {
    emoji: '☕',
    status: '완료',
    title: '프로젝트 B',
    body: '여기에 실제 프로젝트 한 줄 설명.',
  },
  {
    emoji: '🎨',
    status: '아이디어 단계',
    title: '프로젝트 C',
    body: '여기에 실제 프로젝트 한 줄 설명.',
  },
] as const
