import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AdminShell } from './AdminShell'
import { ExportModal, adminInputStyle } from './AdminProducts'
import type { Member } from '@/data/members'
import { useMembers } from '@/hooks/useMembers'
import { compressImage } from '@/lib/image'

const blankDraft: Member = {
  id: '',
  name: '',
  role: '',
  bio: '',
  order: 999,
}

export function AdminMembers() {
  const { members, upsert, remove, reset } = useMembers()
  const [editing, setEditing] = useState<Member | null>(null)
  const [exportOpen, setExportOpen] = useState(false)

  const json = useMemo(() => JSON.stringify(members, null, 2), [members])

  const startAdd = () => {
    setEditing({
      ...blankDraft,
      id: `member-${Date.now()}`,
      order: members.length + 1,
    })
  }

  return (
    <AdminShell
      eyebrow="Members"
      title="멤버 관리"
      description="부원 프로필을 관리하고 순서를 정합니다."
      actions={
        <>
          <button
            onClick={startAdd}
            className="rounded-full bg-ink px-5 py-2.5 font-en text-sm text-paper hover:-translate-y-0.5"
          >
            + 새 멤버
          </button>
          <button
            onClick={() => setExportOpen(true)}
            className="rounded-full border border-ink/15 bg-paper px-5 py-2.5 font-en text-sm text-ink hover:border-ink"
          >
            JSON 내보내기
          </button>
          <button
            onClick={() => {
              if (confirm('기본값으로 되돌릴까요? 현재 변경분이 사라져요.')) {
                reset()
              }
            }}
            className="rounded-full px-5 py-2.5 font-en text-sm text-ink-soft hover:text-ink"
          >
            기본값 초기화
          </button>
        </>
      }
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ink-mute">
        {members.length}명 등록됨
      </p>

      {/* 멤버 카드 그리드 — 테이블보다 프로필감이 더 살아남 */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.length === 0 ? (
          <li className="col-span-full rounded-2xl border border-dashed border-ink/20 bg-paper py-16 text-center text-ink-soft">
            등록된 멤버가 없어요. 우상단{' '}
            <b className="text-ink">+ 새 멤버</b>로 추가해 주세요.
          </li>
        ) : (
          members.map((m) => (
            <li
              key={m.id}
              className="flex flex-col rounded-2xl border border-ink/10 bg-paper p-5"
            >
              <div className="flex items-start gap-4">
                <Avatar member={m} size={56} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg text-ink">{m.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    {m.role}
                  </p>
                </div>
                <span className="rounded-full bg-paper-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                  #{m.order}
                </span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                {m.bio || '소개 없음'}
              </p>
              {m.link && (
                <a
                  href={m.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block truncate text-xs text-ink-soft hover:text-accent"
                >
                  ↗ {m.link}
                </a>
              )}
              <div className="mt-4 flex justify-end gap-2 border-t border-ink/5 pt-3">
                <button
                  onClick={() => setEditing({ ...m })}
                  className="rounded-full border border-ink/15 px-3 py-1.5 font-en text-xs text-ink hover:border-ink"
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    if (confirm(`"${m.name}"을 삭제할까요?`)) remove(m.id)
                  }}
                  className="rounded-full px-3 py-1.5 font-en text-xs text-accent hover:underline"
                >
                  삭제
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <AnimatePresence>
        {editing && (
          <MemberEditModal
            draft={editing}
            existingIds={members.map((m) => m.id)}
            onChange={setEditing}
            onSave={(m) => {
              upsert(m)
              setEditing(null)
            }}
            onClose={() => setEditing(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {exportOpen && (
          <ExportModal
            title="멤버 명단 JSON"
            filename="quirky-members"
            target="src/data/members.ts의 defaultMembers"
            json={json}
            onClose={() => setExportOpen(false)}
          />
        )}
      </AnimatePresence>
    </AdminShell>
  )
}

function Avatar({ member, size = 56 }: { member: Member; size?: number }) {
  if (member.avatar) {
    return (
      <img
        src={member.avatar}
        alt={member.name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover"
      />
    )
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="grid shrink-0 place-items-center rounded-full bg-paper-2 font-display text-xl text-ink"
      aria-hidden
    >
      {member.name.charAt(0) || '?'}
    </div>
  )
}

/* ───── Member Edit Modal ───── */

function MemberEditModal({
  draft,
  existingIds,
  onChange,
  onSave,
  onClose,
}: {
  draft: Member
  existingIds: string[]
  onChange: (m: Member) => void
  onSave: (m: Member) => void
  onClose: () => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const isNew = !existingIds.includes(draft.id)
  const valid = draft.id.trim() !== '' && draft.name.trim() !== ''

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (valid) onSave(draft)
  }

  const handleAvatar = async (file?: File | null) => {
    if (!file || !file.type.startsWith('image/')) return
    setUploading(true)
    try {
      // 프로필은 작아도 충분 — 480px로 압축
      const dataUrl = await compressImage(file, { maxWidth: 480, quality: 0.85 })
      onChange({ ...draft, avatar: dataUrl })
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.form
        onSubmit={submit}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {isNew ? 'New member' : 'Edit member'}
            </p>
            <h2 className="mt-1 font-display text-2xl text-ink">
              {isNew ? '새 멤버 추가' : draft.name || '멤버 수정'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="rounded-full p-2 text-ink-soft hover:bg-paper-2 hover:text-ink"
          >
            ✕
          </button>
        </div>

        {/* 아바타 */}
        <div className="mt-6 flex items-center gap-4">
          {draft.avatar ? (
            <img
              src={draft.avatar}
              alt=""
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="grid h-20 w-20 place-items-center rounded-full bg-paper-2 font-display text-2xl text-ink">
              {draft.name.charAt(0) || '?'}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="rounded-full border border-ink/15 px-4 py-2 font-en text-sm text-ink hover:border-ink disabled:cursor-wait"
            >
              {uploading ? '처리 중…' : draft.avatar ? '아바타 교체' : '아바타 업로드'}
            </button>
            {draft.avatar && (
              <button
                type="button"
                onClick={() => onChange({ ...draft, avatar: undefined })}
                className="rounded-full px-4 py-2 font-en text-sm text-accent hover:underline"
              >
                제거
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleAvatar(e.target.files?.[0])}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Field label="ID (고유키)">
            <input
              value={draft.id}
              onChange={(e) => onChange({ ...draft, id: e.target.value })}
              placeholder="leader"
              className="input"
            />
          </Field>

          <Field label="표시 순서 (작을수록 먼저)">
            <input
              value={String(draft.order)}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10)
                onChange({ ...draft, order: Number.isFinite(n) ? n : 999 })
              }}
              inputMode="numeric"
              className="input"
            />
          </Field>

          <Field label="이름" full>
            <input
              value={draft.name}
              onChange={(e) => onChange({ ...draft, name: e.target.value })}
              placeholder="홍길동"
              className="input"
            />
          </Field>

          <Field label="역할" full>
            <input
              value={draft.role}
              onChange={(e) => onChange({ ...draft, role: e.target.value })}
              placeholder="동아리장 · 기획"
              className="input"
            />
          </Field>

          <Field label="소개" full>
            <textarea
              value={draft.bio}
              onChange={(e) => onChange({ ...draft, bio: e.target.value })}
              rows={3}
              placeholder="짧은 자기소개"
              className="input resize-none"
            />
          </Field>

          <Field label="외부 링크 (선택, Instagram · 포트폴리오 등)" full>
            <input
              value={draft.link ?? ''}
              onChange={(e) => onChange({ ...draft, link: e.target.value || undefined })}
              placeholder="https://instagram.com/..."
              className="input"
            />
          </Field>
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-ink/15 px-6 py-3 font-en text-sm text-ink hover:border-ink"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!valid}
            className="rounded-full bg-ink px-6 py-3 font-en text-sm text-paper hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-ink/30"
          >
            {isNew ? '추가하기' : '저장하기'}
          </button>
        </div>

        <style>{adminInputStyle}</style>
      </motion.form>
    </motion.div>
  )
}

function Field({
  label,
  children,
  full,
}: {
  label: string
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <span className="font-mono text-xs uppercase tracking-widest text-ink-mute">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  )
}
