'use client'

import { useEffect, useRef } from 'react'

const COLORS = ['167,139,250', '244,114,182', '103,232,249', '250,204,21']
const LINK_DISTANCE = 130
const MOUSE_RADIUS = 140

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  c: string
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -9999, y: -9999 }
    let width = 0
    let height = 0
    let frame = 0
    let particles: Particle[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(120, Math.floor((width * height) / 12000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 1.8 + 0.8,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        if (!reduceMotion) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
            p.x += (dx / dist) * force * 2.4
            p.y += (dy / dist) * force * 2.4
          }
          p.x += p.vx
          p.y += p.vy
          if (p.x < -10) p.x = width + 10
          if (p.x > width + 10) p.x = -10
          if (p.y < -10) p.y = height + 10
          if (p.y > height + 10) p.y = -10
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c},0.9)`
        ctx.shadowColor = `rgba(${p.c},0.8)`
        ctx.shadowBlur = 8
        ctx.fill()
      }

      ctx.shadowBlur = 0
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${a.c},${(1 - dist / LINK_DISTANCE) * 0.25})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      if (!reduceMotion) frame = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -left-40 top-0 size-[40rem] rounded-full bg-violet-brand/20 blur-[140px]" />
      <div className="absolute -right-40 top-1/3 size-[36rem] rounded-full bg-pink-brand/15 blur-[140px]" />
      <div className="absolute bottom-0 left-1/3 size-[32rem] rounded-full bg-cyan-brand/10 blur-[140px]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
