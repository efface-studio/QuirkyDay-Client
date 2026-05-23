import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import { Reveal } from '@/components/motion/Reveal'
import { SplitHeading } from '@/components/motion/SplitHeading'

export function Home() {
  return (
    <>
      <Hero />
      <IntroSection />
      <ActivitiesSection />
      <ShopSection />
      <MembersSection />
      <ContactSection />
    </>
  )
}

/* ─────────────────────────────────────────────
   1. Hero
───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-paper">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 sm:pt-32">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-ink-soft">
          <span>{site.location}</span>
          <span aria-hidden>—</span>
          <span>청소년 창업 동아리</span>
          <span aria-hidden>—</span>
          <span>Since 2024</span>
        </div>

        <SplitHeading
          text={'엉뚱한 하루,\n진짜 비즈니스가\n되다.'}
          highlight="진짜"
          highlightClassName="text-accent"
          className="mt-10 font-display leading-[0.98] text-ink text-[clamp(2.5rem,8vw,7rem)]"
          lineClassName="break-keep"
        />

        <Reveal delay={0.8} className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {site.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-en text-sm text-paper transition-transform hover:-translate-y-0.5"
            >
              동아리 소개
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-en text-sm text-ink hover:border-ink"
            >
              Instagram {site.instagramHandle}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   2. About 발췌
───────────────────────────────────────────── */
function IntroSection() {
  return (
    <section className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            01 — About
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <h2 className="mt-6 max-w-4xl font-display leading-[1.1] break-keep text-[clamp(2rem,4.5vw,4rem)] text-ink">
            우리는, 청소년이 떠올린 작은 아이디어를{' '}
            <span className="text-accent">진짜 제품</span>으로 만드는
            동아리예요.
          </h2>
        </Reveal>
        <Reveal delay={0.8} className="mt-12 grid gap-10 sm:grid-cols-3">
          {introBlocks.map((b) => (
            <div key={b.title}>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                {b.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-xl text-ink">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {b.body}
              </p>
            </div>
          ))}
        </Reveal>
        <Reveal delay={1.2} className="mt-12">
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 font-en text-sm text-ink hover:text-accent"
          >
            동아리 소개 더 보기
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

const introBlocks = [
  {
    eyebrow: 'Mission',
    title: '엉뚱함을 칭찬으로.',
    body: '작은 아이디어가 누군가의 문제를 해결하는 제품·서비스가 되도록 돕습니다.',
  },
  {
    eyebrow: 'Vision',
    title: '중구의 창업 거점.',
    body: '또래가 또래의 문제를 푸는 작은 창업가들의 커뮤니티를 만들어 갑니다.',
  },
  {
    eyebrow: 'How',
    title: '매주 굴립니다.',
    body: '브레인스토밍 → 프로토타입 → 데모데이의 사이클을 매달 반복합니다.',
  },
] as const

/* ─────────────────────────────────────────────
   3. Activities 발췌
───────────────────────────────────────────── */
function ActivitiesSection() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/60">
            02 — Activities
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <h2 className="mt-6 max-w-3xl font-display leading-[1.1] break-keep text-[clamp(2rem,4.5vw,4rem)]">
            우리는 매주 만나서,
            <br />
            만들고 발표해요.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-0 sm:grid-cols-2">
          {activities.map((a, i) => (
            <Reveal key={a.title} delay={i + 1}>
              <div
                className={`border-paper/10 py-10 ${
                  i % 2 === 0 ? 'sm:border-r sm:pr-10' : 'sm:pl-10'
                } ${i >= 2 ? 'border-t' : ''} ${i === 0 || i === 1 ? 'border-t sm:border-t-0' : ''}`}
              >
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  {a.when}
                </p>
                <h3 className="mt-3 font-display text-3xl text-paper sm:text-4xl">
                  {a.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-paper/70">
                  {a.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={5} className="mt-16">
          <Link
            to="/activities"
            className="group inline-flex items-center gap-2 font-en text-sm text-paper hover:text-accent"
          >
            전체 활동 보기
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

const activities = [
  {
    when: '매주 · 정기 모임',
    title: '아이디어 브레인스토밍',
    body: '일상의 불편을 모아 다음 주 실험 주제를 정합니다.',
  },
  {
    when: '격주 · 워크숍',
    title: '메이커 워크숍',
    body: '디자인 툴, 노코드, 코딩으로 프로토타입을 같이 배워요.',
  },
  {
    when: '월 1회 · 데모데이',
    title: '내부 데모데이',
    body: '한 달간 만든 결과물을 발표하고 멘토와 또래 피드백을 받아요.',
  },
  {
    when: '학기 1회',
    title: '외부 도전',
    body: '청소년 창업 공모전·페어·해커톤에 팀으로 출전합니다.',
  },
] as const

/* ─────────────────────────────────────────────
   4. Shop teaser
───────────────────────────────────────────── */
function ShopSection() {
  return (
    <section className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            03 — Shop
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <h2 className="mt-6 max-w-3xl font-display leading-[1.1] break-keep text-[clamp(2rem,4.5vw,4rem)] text-ink">
            우리가 만든 굿즈,
            <br />
            <span className="text-accent">계좌이체</span>로 주문해요.
          </h2>
        </Reveal>
        <Reveal delay={0.6}>
          <p className="mt-6 max-w-xl text-base text-ink-soft">
            직접 디자인한 옷, 키링, 와펜을 동아리에서 제작·판매하고 있어요.
            주문은 Instagram DM 으로, 결제는 계좌이체로.
          </p>
        </Reveal>
        <Reveal delay={0.9} className="mt-10">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-en text-sm text-paper hover:-translate-y-0.5"
          >
            굿즈 보러가기
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   5. Members 발췌
───────────────────────────────────────────── */
function MembersSection() {
  return (
    <section className="border-t border-ink/10 bg-paper-2">
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            04 — Members
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <h2 className="mt-6 max-w-3xl font-display leading-[1.1] break-keep text-[clamp(2rem,4.5vw,4rem)] text-ink">
            기획, 디자인, 개발, 마케팅,
            <br />
            서로 다른 강점이 한 팀.
          </h2>
        </Reveal>

        <Reveal delay={0.6} className="mt-16">
          <ul className="rule grid grid-cols-2 gap-6 pt-10 sm:grid-cols-3 lg:grid-cols-6">
            {roles.map((r) => (
              <li key={r}>
                <p className="font-display text-lg text-ink">{r}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.9} className="mt-12">
          <Link
            to="/members"
            className="group inline-flex items-center gap-2 font-en text-sm text-ink hover:text-accent"
          >
            멤버 전체 보기
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

const roles = [
  '동아리장',
  '기획',
  '디자인',
  '개발',
  '마케팅',
  '운영',
] as const

/* ─────────────────────────────────────────────
   5. Contact CTA
───────────────────────────────────────────── */
function ContactSection() {
  return (
    <section className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-40">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            05 — Join us
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <h2 className="mt-6 max-w-4xl font-display leading-[1.02] text-ink break-keep text-[clamp(2.5rem,6vw,6rem)]">
            같이 만들 사람을,
            <br />
            <span className="text-accent">찾고 있어요.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.7} className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-en text-sm text-paper hover:-translate-y-0.5"
          >
            지원/문의
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 font-en text-sm text-ink hover:border-ink"
          >
            Instagram DM
          </a>
        </Reveal>
      </div>
    </section>
  )
}
