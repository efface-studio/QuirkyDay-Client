import { useEffect, useState } from 'react'

/**
 * 현재 화면 중상단에 가장 가까운 섹션 id를 반환.
 * - enabled=false면 추적을 끄고 null을 돌려준다 (홈 외 라우트에서 비활성화).
 * - rootMargin으로 "활성 라인"을 viewport의 상단 30%~40% 부근에 잡는다.
 *
 * sectionIds는 같은 페이지 안에서 `id={...}`로 마크된 DOM 요소의 id 목록.
 */
export function useScrollSpy(
  sectionIds: readonly string[],
  enabled: boolean,
): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return
    }

    // 라우트 전환 직후 DOM이 아직 마운트되지 않았을 수 있으니
    // rAF로 한 프레임 양보하고 observer를 건다.
    let observer: IntersectionObserver | null = null
    let rafId: number | null = null

    const setup = () => {
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)

      if (elements.length === 0) {
        // DOM이 아직 — 다음 프레임에 다시 시도
        rafId = requestAnimationFrame(setup)
        return
      }

      // 첫 진입 시점에도 활성을 잡을 수 있도록 초기값 추정
      // (scrollY=0이면 첫 섹션, 아니면 viewport 중상단을 차지한 것)
      const guess = guessActive(elements)
      if (guess) setActive(guess)

      observer = new IntersectionObserver(
        (entries) => {
          // 진입 중인 섹션 중 viewport 상단에 가장 가까운 것을 active로
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort(
              (a, b) =>
                Math.abs(a.boundingClientRect.top) -
                Math.abs(b.boundingClientRect.top),
            )
          if (visible.length > 0) {
            setActive(visible[0].target.id)
          }
        },
        {
          // 활성 라인을 viewport 상단 35% 지점 근처에 — 약간 위쪽
          rootMargin: '-35% 0px -55% 0px',
          threshold: 0,
        },
      )
      elements.forEach((el) => observer!.observe(el))
    }

    setup()

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      observer?.disconnect()
    }
    // sectionIds는 안정적인 const tuple이라 join key로 비교
  }, [enabled, sectionIds.join('|')])

  return active
}

function guessActive(elements: HTMLElement[]): string | null {
  // viewport 중상단(40% 지점) 라인 위에 있는 가장 마지막 섹션을 추정
  const line = window.innerHeight * 0.4
  let candidate: HTMLElement | null = null
  for (const el of elements) {
    const top = el.getBoundingClientRect().top
    if (top <= line) candidate = el
  }
  return candidate?.id ?? elements[0]?.id ?? null
}
