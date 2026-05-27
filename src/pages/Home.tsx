import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { site } from '@/config/site'
import { Reveal } from '@/components/motion/Reveal'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Parallax } from '@/components/motion/Parallax'
import { CountUp } from '@/components/CountUp'
import { PartnersMarquee } from '@/components/PartnersMarquee'
import { useProducts } from '@/hooks/useProducts'
import { stats } from '@/data/stats'
import { partners } from '@/data/partners'
import { recruit } from '@/data/recruit'

export function Home() {
  // 홈 페이지에서만 viewport 스크롤 스냅 활성화.
  // 다른 라우트(/about, /shop ...)에는 영향 없음.
  useEffect(() => {
    document.documentElement.classList.add('snap-home')
    return () => {
      document.documentElement.classList.remove('snap-home')
    }
  }, [])

  return (
    <>
      <Hero />
      <StatsStrip />
      <IntroSection />
      <ActivitiesSection />
      <ShopSection />
      <MembersSection />
      <PartnersSection />
      <RecruitBanner />
      <ContactSection />
    </>
  )
}

/* ─────────────────────────────────────────────
   Stats strip — Hero 바로 아래의 좁은 띠
───────────────────────────────────────────── */
function StatsStrip() {
  return (
    <section className="snap-section border-y border-ink/10 bg-paper-2">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                {s.label}
              </p>
              <p className="mt-2 flex items-baseline gap-1">
                <CountUp
                  to={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="font-display text-3xl text-ink sm:text-4xl"
                />
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Partners marquee
───────────────────────────────────────────── */
function PartnersSection() {
  return (
    <section className="snap-section bg-paper py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            함께한 기관 · 행사
          </p>
          <h2 className="mt-3 max-w-3xl font-display leading-[1.1] text-ink text-[clamp(1.75rem,3.5vw,3rem)]">
            혼자가 아닌 우리예요.
          </h2>
        </Reveal>
      </div>
      <div className="mt-10">
        <PartnersMarquee partners={partners} />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Recruit banner — 모집 시즌 강조
───────────────────────────────────────────── */
function RecruitBanner() {
  const open = recruit.status === 'open'
  return (
    <section className="snap-section border-t border-ink/10 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <Reveal>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest ${
              open
                ? 'bg-accent text-paper'
                : 'bg-paper/15 text-paper'
            }`}
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
            {open ? '모집 중' : '곧 시작'} · {recruit.cohort}
          </span>
        </Reveal>
        <Reveal delay={0.3}>
          <h2 className="mt-6 max-w-3xl font-display leading-[1.05] text-[clamp(2.5rem,5.5vw,5.5rem)]">
            {recruit.cohort} 부원,
            <br />
            <span className="text-accent">{recruit.totalSeats}명</span>을 찾고
            있어요.
          </h2>
        </Reveal>
        <Reveal delay={0.6}>
          <p className="mt-6 max-w-xl text-base text-paper/70">
            {recruit.scheduleStart} — {recruit.scheduleEnd}. 지원 자격은 단
            하나, "만들어 보고 싶다." 그 한 줄.
          </p>
        </Reveal>
        <Reveal delay={0.9} className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/recruit"
            className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-en text-sm text-ink hover:-translate-y-0.5"
          >
            모집 자세히 보기
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <a
            href={recruit.applyHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3 font-en text-sm text-paper hover:border-paper"
          >
            인스타 DM으로 바로 지원
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   1. Hero
───────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // 스크롤 다운하면 hero가 약간 떠오르며 사라짐
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section
      ref={ref}
      id="home"
      className="snap-section relative min-h-screen overflow-hidden bg-paper"
    >
      <motion.div
        style={{ y, opacity }}
        className="mx-auto max-w-7xl px-6 pb-24 pt-24 sm:pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-ink-soft"
        >
          <span>{site.location}</span>
          <span aria-hidden>—</span>
          <span>청소년 창업 동아리</span>
          <span aria-hidden>—</span>
          <span>Since 2024</span>
        </motion.div>

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

        {/* 스크롤 인디케이터 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
            스크롤
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-6 w-px bg-ink/30"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   2. About 발췌
───────────────────────────────────────────── */
function IntroSection() {
  return (
    <section id="about" className="snap-section border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            01 — 소개
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
    eyebrow: '미션',
    title: '엉뚱함을 칭찬으로.',
    body: '작은 아이디어가 누군가의 문제를 해결하는 제품·서비스가 되도록 돕습니다.',
  },
  {
    eyebrow: '비전',
    title: '중구의 창업 거점.',
    body: '또래가 또래의 문제를 푸는 작은 창업가들의 커뮤니티를 만들어 갑니다.',
  },
  {
    eyebrow: '운영',
    title: '매주 굴립니다.',
    body: '브레인스토밍 → 프로토타입 → 데모데이의 사이클을 매달 반복합니다.',
  },
] as const

/* ─────────────────────────────────────────────
   3. Activities 발췌
───────────────────────────────────────────── */
function ActivitiesSection() {
  return (
    <section id="activities" className="snap-section bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/60">
            02 — 활동
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
  const { products } = useProducts()
  const preview = products.slice(0, 4)

  return (
    <section id="shop" className="snap-section border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
                03 — 굿즈샵
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <h2 className="mt-6 max-w-3xl font-display leading-[1.1] break-keep text-[clamp(2rem,4.5vw,4rem)] text-ink">
                우리가 만든 굿즈,
                <br />
                <span className="text-accent">계좌이체</span>로 주문해요.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.6}>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-en text-sm text-ink hover:border-ink"
            >
              전체 보기
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((p, i) => (
            <Reveal key={p.id} delay={i}>
              <Parallax offset={20}>
              <Link
                to="/shop"
                className="card group block overflow-hidden rounded-3xl"
              >
                <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-paper-2 text-7xl">
                  {p.images[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span aria-hidden>{p.emoji}</span>
                  )}
                  {p.images.length > 1 && (
                    <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-paper">
                      +{p.images.length - 1}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                    {p.category}
                  </p>
                  <h3 className="mt-1 font-display text-lg text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-3 font-en text-base text-ink">
                    ₩{p.price.toLocaleString('ko-KR')}
                  </p>
                </div>
              </Link>
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   5. Members 발췌
───────────────────────────────────────────── */
function MembersSection() {
  return (
    <section id="members" className="snap-section border-t border-ink/10 bg-paper-2">
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            04 — 멤버
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
    <section id="contact" className="snap-section border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-40">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            05 — 합류
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
