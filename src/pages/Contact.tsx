import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/motion/Reveal'
import { site } from '@/config/site'

export function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="문의"
        title="이야기를 걸어주세요."
        description="가입 문의 · 협업 · 멘토링 제안 모두 환영합니다."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="card group block h-full rounded-3xl p-8"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  인스타그램
                </p>
                <p className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                  {site.instagramHandle}
                </p>
                <p className="mt-3 text-sm text-ink-soft">
                  가장 빠른 채널이에요. DM으로 편하게 보내주세요.
                </p>
                <p className="mt-6 inline-flex items-center gap-2 font-en text-sm text-ink">
                  DM 보내기
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </p>
              </a>
            </Reveal>

            <Reveal delay={1}>
              <div className="card h-full rounded-3xl p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  오프라인
                </p>
                <p className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                  {site.location}
                </p>
                <p className="mt-3 text-sm text-ink-soft">
                  모임 시간에 맞춰 직접 방문하셔도 좋아요. (자세한 시간은 인스타
                  DM 문의)
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={2} className="mt-12">
            <div className="card overflow-hidden rounded-3xl bg-ink p-10 text-paper sm:p-14">
              <p className="font-mono text-xs uppercase tracking-widest text-paper/60">
                지원하기
              </p>
              <h2 className="mt-3 font-display text-3xl leading-[1.1] sm:text-5xl">
                가입을 고민하고 있다면.
              </h2>
              <ul className="mt-8 space-y-3 text-paper/80">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="text-accent">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-en text-sm text-ink hover:-translate-y-0.5"
              >
                인스타그램으로 DM 보내기 →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

const bullets = [
  '창업/제품 만들기에 관심이 있는 중·고등학생이라면 OK.',
  '구체적인 아이디어가 없어도 괜찮아요. 같이 찾으면 됩니다.',
  'DM으로 "가입 문의"라고 남겨주시면 다음 모임 일정을 안내드려요.',
] as const
