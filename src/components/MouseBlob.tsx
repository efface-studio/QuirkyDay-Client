import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/**
 * 마우스 따라다니는 그라데이션 블롭 — 페이지 위에 떠다님.
 * spring damped 라 약간 늦게 따라옴 (자연스러움).
 * pointer-events: none 으로 클릭 방해 안 함.
 *
 * 모바일·터치 환경에서는 안 보이게(lg+ 만).
 */
export function MouseBlob() {
  // 초기값 viewport 중심으로 — 첫 페인트에 좌측 상단에 큰 블롭 안 보이게
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 700)
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400)
  const sx = useSpring(x, { stiffness: 70, damping: 20, mass: 1.4 })
  const sy = useSpring(y, { stiffness: 70, damping: 20, mass: 1.4 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  return (
    <motion.div
      aria-hidden
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[380px] w-[380px] rounded-full bg-gradient-to-br from-magenta/12 via-tangerine/8 to-purple/12 blur-3xl lg:block"
    />
  )
}
