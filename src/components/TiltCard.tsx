import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

/**
 * 마우스 위치에 따라 3D perspective tilt 하는 카드.
 * 카드 안에서 마우스가 어디 있는지에 따라 X·Y 회전.
 */
export function TiltCard({
  children,
  className,
  intensity = 12,
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rx = useTransform(my, [-0.5, 0.5], [intensity, -intensity])
  const ry = useTransform(mx, [-0.5, 0.5], [-intensity, intensity])
  const rxs = useSpring(rx, { stiffness: 220, damping: 18 })
  const rys = useSpring(ry, { stiffness: 220, damping: 18 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rxs,
        rotateY: rys,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
