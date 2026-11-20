'use client'

import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from 'motion/react'
import { SectionHeading } from './section-heading'

const TEXT =
  'I am a passionate Full Stack Developer who loves turning complex problems into simple, elegant software. I design clean architectures with .NET and C#, model reliable data in SQL Server, and craft smooth, animated interfaces in React. I care about performance, accessibility and code that the next developer will enjoy reading.'

const STATS = [
  { value: 3, suffix: '+', label: 'Years experience' },
  { value: 25, suffix: '+', label: 'Projects shipped' },
  { value: 15, suffix: '+', label: 'Happy clients' },
  { value: 99, suffix: '%', label: 'Coffee powered' },
]

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  )
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView || !ref.current) return
    const node = ref.current
    const controls = animate(0, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, value, suffix])

  return (
    <span ref={ref} className="text-gradient text-4xl font-bold md:text-5xl">
      {`0${suffix}`}
    </span>
  )
}

export function About() {
  const textRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.4'] })
  const words = TEXT.split(' ')

  return (
    <section id="about" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="01 — About me" title="Code with purpose" />

        <p ref={textRef} className="mt-10 flex flex-wrap text-2xl font-medium leading-snug md:text-4xl">
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            />
          ))}
        </p>

        <ul className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.li
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col gap-2 rounded-3xl border border-border bg-card/50 p-6 backdrop-blur"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
