import { motion } from 'motion/react'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/motion/Reveal'
import { FAQ } from '@/components/FAQ'
import { CountUp } from '@/components/CountUp'
import { faq, recruit, roles, timeline } from '@/data/recruit'
import { site } from '@/config/site'

export function Recruit() {
  const statusLabel =
    recruit.status === 'open'
      ? '모집 중'
      : recruit.status === 'soon'
        ? '곧 시작'
        : '모집 마감'
  const statusTone =
    recruit.status === 'open'
      ? 'bg-accent text-paper'
      : recruit.status === 'soon'
        ? 'bg-lime text-ink'
        : 'bg-ink/10 text-ink-soft'

  return (
    <>
      <PageHeader
        eyebrow="모집"
        title={`${recruit.cohort} 부원을\n찾고 있어요.`}
        description={`${recruit.scheduleStart} — ${recruit.scheduleEnd} · ${recruit.totalSeats}명 선발 예정. 청소년이면 누구나 환영합니다.`}
      />

      {/* 모집 상태 + 빠른 통계 */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-6 sm:gap-8">
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest ${statusTone}`}
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
            {statusLabel}
          </motion.span>
          <span className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            모집 기간 · {recruit.scheduleStart} — {recruit.scheduleEnd}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            선발 인원 · {recruit.totalSeats}명
          </span>
          <a
            href={recruit.applyHref}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-en text-sm text-paper hover:-translate-y-0.5"
          >
            인스타그램 DM으로 지원
            <span>→</span>
          </a>
        </div>
      </section>

      {/* 누가 함께하면 좋은가 — 직군 */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
              모집 직군
            </p>
            <h2 className="mt-3 font-display leading-[1.1] text-ink text-[clamp(2rem,4.5vw,4rem)]">
              네 가지 역할.
              <br />
              어디든 시작해도 좋아요.
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {roles.map((r, i) => (
              <Reveal key={r.title} delay={i} as="li">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  className="card h-full rounded-3xl p-7"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl text-ink">
                      {r.title}
                    </h3>
                    <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-paper">
                      {r.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {r.body}
                  </p>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-accent">
                    이런 분이라면
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {r.who.map((w) => (
                      <li
                        key={w}
                        className="flex gap-2 text-sm text-ink-soft"
                      >
                        <span className="text-accent">·</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 모집 일정 */}
      <section className="border-t border-ink/10 bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/60">
              모집 일정
            </p>
            <h2 className="mt-3 font-display leading-[1.1] text-[clamp(2rem,4.5vw,4rem)]">
              지원부터 합류까지,
              <br />네 단계로 정리했어요.
            </h2>
          </Reveal>

          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t, i) => (
              <Reveal key={t.title} delay={i} as="li">
                <div className="h-full rounded-3xl border border-paper/15 bg-paper/5 p-6">
                  <p className="font-en text-4xl text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-paper/60">
                    {t.when}
                  </p>
                  <h3 className="mt-1 font-display text-lg text-paper">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 작은 숫자 + 한 마디 — 모집 신뢰감 보강 */}
      <section className="border-t border-ink/10 bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="space-y-1">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
                숫자로 보는 활동
              </p>
              <div className="mt-4 grid grid-cols-2 gap-6">
                <Numeral value={3} suffix="기" label="활동 기수" />
                <Numeral value={28} suffix="명" label="누적 멤버" />
                <Numeral value={9} suffix="개" label="진행 프로젝트" />
                <Numeral value={47} suffix="점" label="판매 굿즈" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="rounded-3xl border border-ink/10 bg-paper-2 p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                먼저 합류한 부원의 한 마디
              </p>
              <p className="mt-4 font-display text-xl leading-snug text-ink sm:text-2xl">
                "처음엔 아이디어가 없어서 망설였는데, 첫 모임 끝나고 노트
                한가득이 됐어요. 매주가 작은 실험이라 부담이 없어요."
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-mute">
                — 2기 멤버
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink/10 bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
              자주 묻는 질문
            </p>
            <h2 className="mt-3 font-display leading-[1.05] text-ink text-[clamp(2rem,4.5vw,4rem)]">
              지원 전에,
              <br />이 정도는 답해드려요.
            </h2>
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <FAQ items={faq} />
          </Reveal>
        </div>
      </section>

      {/* 마지막 CTA */}
      <section className="border-t border-ink/10 bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <Reveal>
            <h2 className="font-display leading-[1.05] text-ink text-[clamp(2.25rem,5vw,5rem)]">
              엉뚱한 하루를
              <br />
              <span className="text-accent">함께 만들 사람</span>을 찾고
              있어요.
            </h2>
          </Reveal>
          <Reveal delay={0.4} className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={recruit.applyHref}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-en text-base text-paper hover:-translate-y-0.5"
            >
              인스타그램 DM으로 지원
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 font-en text-base text-ink hover:border-ink"
            >
              먼저 인스타 둘러보기
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Numeral({
  value,
  suffix,
  label,
}: {
  value: number
  suffix: string
  label: string
}) {
  return (
    <div>
      <p className="flex items-baseline gap-1">
        <CountUp
          to={value}
          suffix={suffix}
          className="font-display text-5xl text-ink sm:text-6xl"
        />
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-mute">
        {label}
      </p>
    </div>
  )
}
