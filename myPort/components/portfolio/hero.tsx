'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, Download, MapPin } from 'lucide-react'

const ROLES = ['Full Stack Developer', '.NET Engineer', 'React Developer', 'SQL Enthusiast']
const FIRST = 'Aman'
const LAST = 'Sahani'

const BADGES = [
  { label: '.NET', className: 'left-[-1.5rem] top-10', delay: 0 },
  { label: 'React', className: 'right-[-1.5rem] top-24', delay: 0.6 },
  { label: 'SQL', className: 'left-0 bottom-12', delay: 1.2 },
  { label: 'C#', className: 'right-2 bottom-2', delay: 1.8 },
]

function AnimatedWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="inline-flex overflow-hidden pb-2">
      {word.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ y: '110%', rotate: 8 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, delay: delay + i * 0.05 }}
          className="text-gradient inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-svh items-center px-6 pb-16 pt-28 md:px-10"
    >
      <motion.div
        style={{ opacity }}
        className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-14 md:flex-row md:justify-between"
      >
        <motion.div style={{ y: textY }} className="flex max-w-2xl flex-col items-center text-center md:items-start md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-mono text-base text-cyan-brand md:text-lg"
          >
            {"Hi there, I'm"}
          </motion.p>

          <h1 className="mt-2 flex flex-wrap justify-center gap-x-5 text-6xl font-bold leading-none tracking-tight sm:text-7xl md:justify-start lg:text-8xl">
            <AnimatedWord word={FIRST} delay={0.5} />
            <AnimatedWord word={LAST} delay={0.75} />
          </h1>

          <div className="mt-4 h-10 text-2xl font-semibold text-foreground md:text-3xl" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIndex]}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.4 }}
                className="inline-block"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-6 max-w-lg text-pretty leading-relaxed text-muted-foreground"
          >
            I build fast, scalable and beautiful web applications end to end — from robust
            ASP.NET Core APIs and SQL databases to pixel-perfect React interfaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <a
              href="#projects"
              className="bg-gradient-brand rounded-full px-6 py-3 font-medium text-background shadow-lg shadow-violet-brand/30 transition-transform hover:scale-105"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-6 py-3 font-medium backdrop-blur transition-colors hover:bg-foreground/10"
            >
              <Download className="size-4" aria-hidden="true" />
              Get my resume
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <MapPin className="size-4" aria-hidden="true" />
            Based in India
          </motion.p>
        </motion.div>

        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative size-64 shrink-0 sm:size-72 lg:size-80"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-2 animate-[spin_8s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,var(--color-violet-brand),var(--color-pink-brand),var(--color-cyan-brand),var(--color-violet-brand))] blur-md"
          />
          <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-background">
            <Image
              src="/images/aman.png"
              alt="Portrait of Aman Sahani"
              fill
              priority
              sizes="320px"
              className="object-cover object-[50%_25%]"
            />
          </div>

          {BADGES.map((badge) => (
            <motion.span
              key={badge.label}
              aria-hidden="true"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: badge.delay }}
              className={`absolute rounded-2xl border border-border bg-background/80 px-3 py-1.5 font-mono text-sm font-semibold shadow-xl backdrop-blur ${badge.className}`}
            >
              <span className="text-gradient">{badge.label}</span>
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2 }, y: { duration: 1.6, repeat: Infinity } }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs text-muted-foreground md:flex"
      >
        Scroll
        <ArrowDown className="size-4" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
