import { useCallback, useEffect, useState } from 'react'
import { defaultMembers, migrateMember, type Member } from '@/data/members'

const STORAGE_KEY = 'quirky.members.v1'

function readStorage(): Member[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return parsed
      .map(migrateMember)
      .filter((m): m is Member => m !== null)
      .sort((a, b) => a.order - b.order)
  } catch {
    return null
  }
}

function writeStorage(members: Member[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members))
  } catch (e) {
    console.warn('[useMembers] localStorage write failed:', e)
    alert('localStorage 용량을 초과했어요. 아바타 이미지를 줄이거나 일부 멤버를 삭제해 주세요.')
  }
}

export function useMembers() {
  const [members, setMembers] = useState<Member[]>(() => {
    if (typeof window === 'undefined') return defaultMembers
    return readStorage() ?? defaultMembers
  })

  useEffect(() => {
    if (readStorage() === null) writeStorage(defaultMembers)
  }, [])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      const next = readStorage()
      if (next) setMembers(next)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const upsert = useCallback((m: Member) => {
    setMembers((prev) => {
      const idx = prev.findIndex((x) => x.id === m.id)
      const next =
        idx === -1 ? [...prev, m] : prev.map((x) => (x.id === m.id ? m : x))
      next.sort((a, b) => a.order - b.order)
      writeStorage(next)
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setMembers((prev) => {
      const next = prev.filter((m) => m.id !== id)
      writeStorage(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setMembers(defaultMembers)
    writeStorage(defaultMembers)
  }, [])

  return { members, upsert, remove, reset }
}
