import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { site } from '@/config/site'
import { Reveal } from '@/components/motion/Reveal'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Parallax } from '@/components/motion/Parallax'
import { CountUp } from '@/components/CountUp'
import { PartnersMarquee } from '@/components/PartnersMarquee'
import { Marquee } from '@/components/Marquee'
import { Mascot } from '@/components/Mascot'
import { MouseBlob } from '@/components/MouseBlob'
import { TiltCard } from '@/components/TiltCard'
import { FullBleed } from '@/components/FullBleed'
import { useProducts } from '@/hooks/useProducts'
import { stats } from '@/data/stats'
import { partners } from '@/data/partners'
import { recruit } from '@/data/recruit'

export function Home() {
  useEffect(() => {
    document.documentElement.classList.add('snap-home')
    return () => document.documentElement.classList.remove('snap-home')
  }, [])

  return (
    <>
      <MouseBlob />
      <Hero />
      <StickerMarquee />
      <StatsStrip />
      <ManifestoSection />
      <ActivitiesSection />
      <ShopSection />
      <MembersTeaser />
      <PartnersSection />
      <RecruitBanner />
      <ContactSection />
    </>
  )
}

/* ─────────────────────────────────────────────
   Hero — 거대 마스코트 + 거대 헤드라인 + 노이즈
───────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const mascotY = useTransform(scrollYProgress, [0, 1], [0, -180])
  const mascotRot = useTransform(scrollYProgress, [0, 1], [0, 28])

  return (
    <section
      ref={ref}
      id="home"
      className="snap-section noise relative isolate min-h-screen overflow-visible bg-paper"
    >
      {/*
        배경 + 블롭을 FullBleed 로 감싸서 viewport 전체 폭으로 깔린다.
        Layout 의 outer max-w 컨테이너를 뚫고 나가 사이드바 뒤까지 자연스럽게.
      */}
      <FullBleed className="-z-10">
        <motion.div
          className="blob-shape absolute left-[8%] top-[10%] h-[460px] w-[460px] bg-cyan/18"
        />
        <motion.div
          className="blob-shape absolute right-[-6%] bottom-[-8%] h-[480px] w-[480px] bg-lime/22"
          style={{ animationDelay: '-4s' }}
        />
        <motion.div
          className="blob-shape absolute left-[2%] bottom-[20%] h-[300px] w-[300px] bg-magenta/14"
          style={{ animationDelay: '-8s' }}
        />
        <motion.div
          className="blob-shape absolute right-[28%] top-[28%] h-[260px] w-[260px] bg-tangerine/12"
          style={{ animationDelay: '-12s' }}
        />
        <motion.div
          className="blob-shape absolute left-[36%] top-[55%] h-[240px] w-[240px] bg-purple/10"
          style={{ animationDelay: '-6s' }}
        />
      </FullBleed>

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 sm:py-32"
      >
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-ink-soft"
        >
          <span className="rounded-full border border-ink/15 bg-paper/60 px-3 py-1 backdrop-blur">
            {site.location}
          </span>
          <span aria-hidden>·</span>
          <span>청소년 창업 동아리</span>
          <span aria-hidden>·</span>
          <span>SINCE 2024</span>
        </motion.div>

        {/* 헤드라인 + 마스코트 */}
        <div className="relative mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SplitHeading
            text={'엉뚱한 하루,\n진짜 비즈니스가\n되다.'}
            highlight="진짜"
            highlightClassName="gradient-text italic"
            className="font-display leading-[0.92] text-ink text-[clamp(3rem,10vw,9rem)]"
            lineClassName="break-keep"
          />

          {/* 마스코트 — 스크롤 시 위로 떠오르며 회전 */}
          <motion.div
            style={{ y: mascotY, rotate: mascotRot }}
            className="relative shrink-0 self-center lg:self-end"
          >
            <Mascot size={260} tone="magenta" mood="wink" float />
          </motion.div>
        </div>

        {/* 서브카피 + CTA */}
        <Reveal delay={0.6} className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            <span className="marker" style={{ ['--marker-color' as string]: 'var(--color-lime)' }}>
              작은 아이디어
            </span>
            를 매주 만들어보고, 한 달에 한 번 진짜로 발표해요. {site.name} 은
            그렇게 굴러갑니다.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/recruit"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-en text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
              {recruit.cohort} 모집 중
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-6 py-3 font-en text-sm font-medium text-ink hover:bg-magenta hover:text-paper"
            >
              IG {site.instagramHandle}
            </a>
          </div>
        </Reveal>
      </motion.div>

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
    </section>
  )
}

/* ─────────────────────────────────────────────
   Sticker marquee — 컬러풀 한 줄
───────────────────────────────────────────── */
function StickerMarquee() {
  return (
    <Marquee className="snap-section border-y-2 border-ink bg-magenta text-paper">
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="flex items-center gap-5 px-6 py-4 font-display text-2xl tracking-tight sm:text-3xl"
        >
          QUIRKY DAY
          <span className="text-lime">✦</span>
          엉뚱한 하루
          <span className="text-cyan">●</span>
          MAKE WEIRD STUFF
          <span className="text-lime">✦</span>
        </span>
      ))}
    </Marquee>
  )
}

/* ─────────────────────────────────────────────
   Stats strip — 통계 카운터
───────────────────────────────────────────── */
function StatsStrip() {
  const tones = ['bg-magenta-soft', 'bg-cyan-soft', 'bg-lime-soft', 'bg-purple-soft'] as const
  return (
    <section className="snap-section border-b-2 border-ink bg-paper">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-0 sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i}>
            <div
              className={`relative px-6 py-10 ${tones[i % tones.length]} ${
                i > 0 ? 'border-l-2 border-ink' : ''
              }`}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink/70">
                {s.label}
              </p>
              <p className="mt-3 flex items-baseline gap-1">
                <CountUp
                  to={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="font-display text-4xl text-ink sm:text-5xl"
                />
              </p>
              {s.hint && (
                <p className="mt-2 text-[11px] text-ink-soft">{s.hint}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Manifesto — About 대체 (컬러풀 거대 글자)
───────────────────────────────────────────── */
function ManifestoSection() {
  return (
    <section id="about" className="snap-section noise relative overflow-hidden bg-paper py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-magenta">
            01 — 우리는
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <h2 className="mt-6 font-display leading-[0.95] text-ink text-[clamp(2.5rem,8vw,7rem)]">
            청소년이 떠올린
            <br />
            <span className="gradient-text">작은 엉뚱함</span>이
            <br />
            진짜 제품이 되는 곳.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {manifestoCards.map((c, i) => (
            <Reveal key={c.title} delay={i + 1}>
              <TiltCard
                className="color-shadow h-full rounded-3xl border-2 border-ink p-7"
                intensity={6}
              >
                <div
                  className={`h-full ${c.bg}`}
                  style={{
                    background: c.bg,
                    margin: '-1.75rem',
                    padding: '1.75rem',
                    borderRadius: '1.5rem',
                  }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink/70">
                    {c.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/80">
                    {c.body}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={4} className="mt-14">
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 font-en text-sm text-ink hover:text-magenta"
          >
            동아리 소개 더 보기
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

const manifestoCards = [
  {
    eyebrow: 'MISSION',
    title: '엉뚱함을 칭찬으로.',
    body: '작은 아이디어가 누군가의 문제를 해결하는 제품·서비스가 되도록 돕습니다.',
    bg: 'var(--color-magenta-soft)',
  },
  {
    eyebrow: 'VISION',
    title: '중구의 창업 거점.',
    body: '또래가 또래의 문제를 푸는 작은 창업가들의 커뮤니티를 만들어 갑니다.',
    bg: 'var(--color-cyan-soft)',
  },
  {
    eyebrow: 'HOW',
    title: '매주 굴립니다.',
    body: '브레인스토밍 → 프로토타입 → 데모데이의 사이클을 매달 반복합니다.',
    bg: 'var(--color-lime-soft)',
  },
] as const

/* ─────────────────────────────────────────────
   Activities — 어두운 + 시안 액센트 섹션
───────────────────────────────────────────── */
function ActivitiesSection() {
  return (
    <section id="activities" className="snap-section relative overflow-hidden bg-ink py-32 text-paper sm:py-40">
      {/* 백그라운드 그리드 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-paper) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <motion.div
        aria-hidden
        className="blob-shape pointer-events-none absolute -right-32 top-1/4 h-[400px] w-[400px] bg-cyan/30"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan">
            02 — 활동
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <h2 className="mt-6 max-w-3xl font-display leading-[0.95] text-[clamp(2.5rem,7vw,6rem)]">
            매주 만나서
            <br />
            <span className="gradient-text-cool">만들고 발표해요.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-0 sm:grid-cols-2">
          {activities.map((a, i) => (
            <Reveal key={a.title} delay={i + 1}>
              <div
                className={`group cursor-pointer px-2 py-10 transition-colors hover:bg-paper/5 ${
                  i % 2 === 0 ? 'sm:border-r sm:border-paper/10 sm:pr-10' : 'sm:pl-10'
                } ${i >= 2 ? 'border-t border-paper/10' : ''} ${
                  i === 0 || i === 1 ? 'border-t border-paper/10 sm:border-t-0' : ''
                }`}
              >
                <p className="font-mono text-xs uppercase tracking-widest text-lime">
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

        <Reveal delay={5} className="mt-14">
          <Link
            to="/activities"
            className="group inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3 font-en text-sm text-paper hover:border-cyan hover:text-cyan"
          >
            전체 활동·프로젝트 보기
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
   Shop — 라임 백 + 컬러풀 카드
───────────────────────────────────────────── */
function ShopSection() {
  const { products } = useProducts()
  const preview = products.slice(0, 4)
  const tones = ['bg-magenta-soft', 'bg-cyan-soft', 'bg-lime-soft', 'bg-tangerine-soft'] as const

  return (
    <section id="shop" className="snap-section noise relative overflow-hidden bg-lime-soft py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-widest text-purple">
                03 — 굿즈샵
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <h2 className="mt-6 max-w-3xl font-display leading-[0.95] text-ink text-[clamp(2.5rem,7vw,6rem)]">
                옷·키링·와펜,
                <br />
                <span className="text-magenta italic">계좌이체</span>로.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.6}>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-6 py-3 font-en text-sm text-ink hover:bg-ink hover:text-paper"
            >
              전체 보기
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((p, i) => (
            <Reveal key={p.id} delay={i}>
              <Parallax offset={16}>
                <Link
                  to="/shop"
                  className="color-shadow group block overflow-hidden rounded-3xl border-2 border-ink"
                  style={{ ['--shadow-color' as string]: 'var(--color-magenta)' }}
                >
                  <div
                    className={`relative flex aspect-square items-center justify-center overflow-hidden text-7xl ${tones[i % tones.length]}`}
                  >
                    {p.images[0] ? (
                      <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <motion.span
                        aria-hidden
                        whileHover={{ scale: 1.18, rotate: -8 }}
                        transition={{ type: 'spring', stiffness: 240 }}
                      >
                        {p.emoji}
                      </motion.span>
                    )}
                    {p.images.length > 1 && (
                      <span className="absolute right-3 top-3 rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-paper">
                        +{p.images.length - 1}
                      </span>
                    )}
                  </div>
                  <div className="bg-paper p-5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                      {p.category}
                    </p>
                    <h3 className="mt-1 font-display text-lg text-ink">{p.name}</h3>
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
   Members teaser
───────────────────────────────────────────── */
function MembersTeaser() {
  return (
    <section id="members" className="snap-section border-y-2 border-ink bg-cyan-soft py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-purple">
            04 — 멤버
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <h2 className="mt-6 max-w-4xl font-display leading-[0.98] text-ink text-[clamp(2.5rem,7vw,6rem)]">
            기획·디자인·개발·마케팅,
            <br />
            <span className="text-magenta">다른 강점이</span> 한 팀.
          </h2>
        </Reveal>

        <Reveal delay={0.6} className="mt-16">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
            {roles.map((r) => (
              <li
                key={r}
                className="rounded-full border-2 border-ink bg-paper px-4 py-2 text-center font-display text-base text-ink"
              >
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.9} className="mt-12">
          <Link
            to="/members"
            className="group inline-flex items-center gap-2 font-en text-sm text-ink hover:text-magenta"
          >
            멤버 전체 보기
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

const roles = ['동아리장', '기획', '디자인', '개발', '마케팅', '운영'] as const

/* ─────────────────────────────────────────────
   Partners
───────────────────────────────────────────── */
function PartnersSection() {
  return (
    <section className="snap-section bg-paper py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            함께하는 기관
          </p>
          <h2 className="mt-3 max-w-3xl font-display leading-[1.05] text-ink text-[clamp(1.75rem,4.5vw,3.5rem)]">
            중구청소년센터와
            <br />
            <span className="gradient-text-cool">함께 굴러갑니다.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-ink-soft">
            중구청소년센터를 운영·감독하는 기관과, 청소년 활동·창업을 함께
            만들어 가는 협력 기관들이에요.
          </p>
        </Reveal>
      </div>
      <div className="mt-12">
        <PartnersMarquee partners={partners} />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Recruit banner — 어두운 + 거대 한국어 디스플레이
───────────────────────────────────────────── */
function RecruitBanner() {
  const open = recruit.status === 'open'
  return (
    <section className="snap-section relative overflow-hidden border-y-2 border-ink bg-ink py-24 text-paper">
      <motion.div
        aria-hidden
        className="blob-shape pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] bg-magenta/30"
      />
      <motion.div
        aria-hidden
        className="blob-shape pointer-events-none absolute -right-32 bottom-10 h-[420px] w-[420px] bg-purple/40"
        style={{ animationDelay: '-5s' }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest ${
              open ? 'bg-lime text-ink' : 'bg-paper/15 text-paper'
            }`}
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
            {open ? '모집 중' : '곧 시작'} · {recruit.cohort}
          </span>
        </Reveal>
        <Reveal delay={0.3}>
          <h2 className="mt-6 max-w-4xl font-display leading-[0.92] text-[clamp(3rem,8vw,8rem)]">
            {recruit.cohort} 부원,
            <br />
            <span className="gradient-text-cool">{recruit.totalSeats}명</span>{' '}
            모집.
          </h2>
        </Reveal>
        <Reveal delay={0.6}>
          <p className="mt-6 max-w-xl text-base text-paper/70">
            {recruit.scheduleStart} — {recruit.scheduleEnd}. 지원 자격 단 하나,
            "<span className="marker" style={{ ['--marker-color' as string]: 'rgba(194,255,61,0.5)' }}>만들어 보고 싶다</span>." 그 한 줄.
          </p>
        </Reveal>
        <Reveal delay={0.9} className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/recruit"
            className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 font-en text-sm font-medium text-ink hover:-translate-y-0.5"
          >
            모집 자세히 보기
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <a
            href={recruit.applyHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-7 py-3.5 font-en text-sm text-paper hover:border-paper"
          >
            인스타 DM으로 바로 지원
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Contact CTA — 거대 마스코트 + 컬러풀
───────────────────────────────────────────── */
function ContactSection() {
  return (
    <section
      id="contact"
      className="snap-section noise relative overflow-hidden bg-tangerine-soft py-40"
    >
      <motion.div
        aria-hidden
        className="blob-shape pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] bg-magenta/40"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1fr_auto]">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-magenta">
              06 — 합류
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <h2 className="mt-6 max-w-3xl font-display leading-[0.92] text-ink text-[clamp(3rem,8vw,7.5rem)]">
              같이 만들 사람,
              <br />
              <span className="gradient-text">찾고 있어요.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.7} className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-en text-sm font-medium text-paper hover:-translate-y-0.5"
            >
              문의하기
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-7 py-3.5 font-en text-sm text-ink hover:bg-magenta hover:text-paper"
            >
              IG DM
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.5}>
          <Mascot size={300} tone="cyan" mood="oh" />
        </Reveal>
      </div>
    </section>
  )
}
