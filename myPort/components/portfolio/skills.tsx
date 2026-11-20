'use client'

import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'motion/react'
import { Cloud, Database, LayoutDashboard, Server, type LucideIcon } from 'lucide-react'
import { SectionHeading } from './section-heading'

const MARQUEE = ['C#', '.NET 8', 'ASP.NET Core', 'React', 'Next.js', 'TypeScript', 'SQL Server', 'Entity Framework', 'Azure', 'Docker', 'Tailwind CSS', 'REST APIs']

type Category = {
  title: string
  icon: LucideIcon
  color: string
  skills: { name: string; level: number }[]
}

const CATEGORIES: Category[] = [
  {
    title: 'Backend',
    icon: Server,
    color: 'from-violet-brand to-pink-brand',
    skills: [
      { name: 'C# / .NET Core', level: 92 },
      { name: 'ASP.NET Web API', level: 90 },
      { name: 'Entity Framework', level: 85 },
      { name: 'Node.js', level: 70 },
    ],
  },
  {
    title: 'Frontend',
    icon: LayoutDashboard,
    color: 'from-pink-brand to-cyan-brand',
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'Tailwind CSS', level: 88 },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    color: 'from-cyan-brand to-violet-brand',
    skills: [
      { name: 'SQL Server', level: 90 },
      { name: 'Stored Procedures', level: 86 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MongoDB', level: 65 },
    ],
  },
  {
    title: 'Cloud & Tools',
    icon: Cloud,
    color: 'from-violet-brand to-cyan-brand',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Azure', level: 72 },
      { name: 'Docker', level: 70 },
      { name: 'CI/CD', level: 68 },
    ],
  },
]

function VelocityRow({ baseVelocity }: { baseVelocity: number }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000)
    if (factor.get() < 0) direction.current = -1
    else if (factor.get() > 0) direction.current = 1
    move += direction.current * move * factor.get()
    baseX.set(baseX.get() + move)
  })

  const items = [...MARQUEE, ...MARQUEE]

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className="flex shrink-0 gap-4">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="rounded-full border border-border bg-card/60 px-6 py-3 font-mono text-lg font-medium backdrop-blur md:text-2xl"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <SectionHeading eyebrow="02 — Skills" title="My tech toolbox" />
      </div>

      <div aria-hidden="true" className="mt-14 flex -rotate-2 flex-col gap-4">
        <VelocityRow baseVelocity={-3} />
        <VelocityRow baseVelocity={3} />
      </div>

      <ul className="mx-auto mt-20 grid max-w-5xl gap-5 px-6 sm:grid-cols-2 md:px-10">
        {CATEGORIES.map((cat, i) => (
          <motion.li
            key={cat.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.15 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card/60 p-7 backdrop-blur"
          >
            <div
              aria-hidden="true"
              className={`absolute -right-16 -top-16 size-40 rounded-full bg-gradient-to-br ${cat.color} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`}
            />
            <div className="flex items-center gap-3">
              <span className={`flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} text-background`}>
                <cat.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-semibold">{cat.title}</h3>
            </div>

            <ul className="mt-6 flex flex-col gap-4">
              {cat.skills.map((skill, j) => (
                <li key={skill.name}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="font-mono text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-foreground/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + j * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
