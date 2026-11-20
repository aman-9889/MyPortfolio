'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export function CursorGlow() {
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - 200)
      y.set(e.clientY - 200)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 -z-10 hidden size-[400px] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.2_295/0.18),transparent_65%)] md:block"
    />
  )
}
