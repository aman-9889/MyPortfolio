'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { Briefcase, GraduationCap } from 'lucide-react'
import { SectionHeading } from './section-heading'

const TIMELINE = [
  {
    type: 'work',
    period: '2024 — Present',
    role: 'Full Stack Developer',
    company: 'TechNova Solutions',
    points: [
      'Lead development of .NET 8 microservices and React dashboards for 10k+ daily users.',
      'Cut API response times by 40% through SQL query tuning and caching.',
    ],
  },
  {
    type: 'work',
    period: '2023 — 2024',
    role: '.NET Developer',
    company: 'CodeCraft Pvt. Ltd.',
    points: [
      'Built REST APIs with ASP.NET Core and Entity Framework for an HR product.',
      'Designed normalized SQL Server schemas and stored procedures.',
    ],
  },
  {
    type: 'work',
    period: '2022 — 2023',
    role: 'Junior Web Developer (Intern)',
    company: 'PixelSoft Studio',
    points: ['Created responsive React components and integrated them with backend services.'],
  },
  {
    type: 'education',
    period: '2019 — 2022',
    role: 'Bachelor of Computer Applications',
    company: 'University Degree',
    points: ['Focused on data structures, databases and software engineering.'],
  },
]

export function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section id="experience" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="04 — Journey" title="Experience & education" />

        <ol ref={ref} className="relative mt-16 flex flex-col gap-12 pl-12 md:pl-16">
          <div aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-0.5 bg-foreground/10 md:left-6" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute bottom-0 left-4 top-0 w-0.5 origin-top bg-gradient-to-b from-violet-brand via-pink-brand to-cyan-brand md:left-6"
          />

          {TIMELINE.map((item, i) => {
            const Icon = item.type === 'work' ? Briefcase : GraduationCap
            return (
              <motion.li
                key={item.role}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.05 * i }}
                className="relative"
              >
                <span className="bg-gradient-brand absolute -left-12 top-1 flex size-9 items-center justify-center rounded-full text-background ring-4 ring-background md:-left-[3.6rem]">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur transition-colors hover:border-violet-brand/50">
                  <p className="font-mono text-sm text-cyan-brand">{item.period}</p>
                  <h3 className="mt-2 text-xl font-semibold">{item.role}</h3>
                  <p className="text-muted-foreground">{item.company}</p>
                  <ul className="mt-4 flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
