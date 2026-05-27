import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

/**
 * 뷰포트 진입 시 0 → to 까지 부드럽게 카운트업 하는 숫자.
 * once:true 라 한번만 트리거된다 (스크롤 위아래로 깜빡거리지 않음).
 *
 * - to: 최종 숫자
 * - duration: 카운트 시간(ms)
 * - prefix/suffix: 단위 표시 (예: "+", "%", "명")
 * - format: 1,234 처럼 천 단위 콤마 (기본 true)
 */
export function CountUp({
  to,
  duration = 1400,
  prefix = '',
  suffix = '',
  format = true,
  className,
}: {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  format?: boolean
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let rafId = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(to * eased))
      if (t < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, to, duration])

  const text = format ? value.toLocaleString('ko-KR') : String(value)
  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  )
}
