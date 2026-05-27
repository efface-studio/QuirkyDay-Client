import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/motion/Reveal'
import { CohortFilter } from '@/components/CohortFilter'
import {
  projectCohorts,
  projects,
  type Project,
  type ProjectFilter,
} from '@/data/projects'

export function Activities() {
  return (
    <>
      <PageHeader
        eyebrow="활동"
        title="이런 걸 하고 있어요."
        description="정기 모임부터 외부 도전까지 — Quirky Day 의 활동들이에요."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
              정기 모임
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
                    <p className="mt-2 max-w-2xl text-sm text-ink-soft">
                      {r.body}
                    </p>
                  </div>
                  <span className="hidden text-xl text-ink-mute sm:inline">↗</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ProjectShowcase />
    </>
  )
}

/* ───────────────────── Project Showcase ───────────────────── */

function ProjectShowcase() {
  const [filter, setFilter] = useState<ProjectFilter>('전체')

  const visible = useMemo(
    () =>
      filter === '전체'
        ? projects
        : projects.filter((p) => p.cohort === filter),
    [filter],
  )

  return (
    <section className="border-t border-ink/10 bg-paper-2">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            프로젝트
          </p>
          <h2 className="mt-3 font-display leading-[1.1] text-ink text-[clamp(2rem,4.5vw,4rem)]">
            우리가 만든,
            <br />
            만들고 있는 것들.
          </h2>
        </Reveal>

        <Reveal delay={0.3} className="mt-10">
          <CohortFilter
            items={projectCohorts}
            active={filter}
            onChange={setFilter}
          />
        </Reveal>

        <motion.ul
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProjectCard project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <p className="py-16 text-center text-ink-soft">
            아직 등록된 프로젝트가 없어요.
          </p>
        )}
      </div>
    </section>
  )
}

const toneClass = {
  paper: 'bg-paper',
  accent: 'bg-accent-soft',
  ink: 'bg-ink text-paper',
} as const

function ProjectCard({ project }: { project: Project }) {
  const tone = toneClass[project.tone ?? 'paper']
  const isInk = project.tone === 'ink'

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="card group relative h-full overflow-hidden rounded-3xl"
    >
      <div
        className={`relative flex aspect-[5/4] items-center justify-center overflow-hidden ${tone}`}
      >
        <motion.span
          whileHover={{ scale: 1.18, rotate: -6 }}
          transition={{ type: 'spring', stiffness: 260 }}
          className="text-7xl"
          aria-hidden="true"
        >
          {project.emoji}
        </motion.span>
        <span
          className={`absolute left-4 top-4 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${
            isInk ? 'bg-paper/15 text-paper' : 'bg-paper/85 text-ink-soft'
          }`}
        >
          {project.cohort}
        </span>
        <span
          className={`absolute right-4 top-4 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${
            isInk ? 'bg-paper/15 text-paper' : 'bg-ink/10 text-ink-soft'
          }`}
        >
          {project.status}
        </span>

        {/* hover 시 외부 링크 오버레이 */}
        {project.links && project.links.length > 0 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 flex-wrap gap-2 p-4 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            {project.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink px-3 py-1.5 font-en text-xs text-paper hover:bg-accent"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="bg-paper p-5">
        <h3 className="font-display text-lg text-ink">{project.title}</h3>
        <p className="mt-1 text-sm text-ink-soft">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-paper-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
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
