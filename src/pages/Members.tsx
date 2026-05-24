import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/motion/Reveal'
import { useMembers } from '@/hooks/useMembers'
import type { Member } from '@/data/members'

export function Members() {
  const { members } = useMembers()

  return (
    <>
      <PageHeader
        eyebrow="멤버"
        title="Quirky를 만드는 사람들."
        description="다른 강점, 같은 호기심."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24">
          {members.length === 0 ? (
            <p className="py-16 text-center text-ink-soft">
              등록된 멤버가 없어요.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((m, i) => (
                <Reveal key={m.id} delay={i} as="article">
                  <MemberCard member={m} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="card overflow-hidden rounded-3xl">
      <div className="flex aspect-[4/3] items-center justify-center bg-paper-2">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="grid h-24 w-24 place-items-center rounded-full bg-paper font-display text-3xl text-ink shadow-sm"
            aria-hidden="true"
          >
            {member.name.charAt(0) || '?'}
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {member.role}
        </p>
        <h3 className="mt-1 font-display text-xl text-ink">{member.name}</h3>
        <p className="mt-2 text-sm text-ink-soft">{member.bio}</p>
        {member.link && (
          <a
            href={member.link}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-xs text-ink-soft hover:text-accent"
          >
            ↗ 더 보기
          </a>
        )}
      </div>
    </div>
  )
}
