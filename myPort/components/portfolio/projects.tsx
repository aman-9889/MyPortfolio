'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from './section-heading'

const PROJECTS = [
  {
    title: 'ShopSphere — E-Commerce Platform',
    description:
      'A full featured online store with product catalog, cart, secure checkout, order tracking and an admin dashboard with live sales analytics.',
    image: '/images/project-shop.png',
    stack: ['ASP.NET Core', 'React', 'SQL Server', 'Stripe', 'Redux'],
    accent: 'from-violet-brand to-pink-brand',
  },
  {
    title: 'PeopleHub — HR Management System',
    description:
      'Enterprise HRMS for employee records, attendance, leave approvals and automated payroll, with role-based access and audit logs.',
    image: '/images/project-hrms.png',
    stack: ['.NET 8', 'Entity Framework', 'React', 'SQL Server', 'JWT'],
    accent: 'from-cyan-brand to-violet-brand',
  },
  {
    title: 'ChatWave — Real-time Messaging',
    description:
      'Instant messaging app with group chats, typing indicators, online presence and file sharing powered by WebSockets.',
    image: '/images/project-chat.png',
    stack: ['SignalR', 'C#', 'React', 'TypeScript', 'Azure'],
    accent: 'from-pink-brand to-cyan-brand',
  },
  {
    title: 'InsightIQ — Analytics Dashboard',
    description:
      'Business intelligence dashboard turning millions of SQL rows into interactive charts, KPIs and exportable reports.',
    image: '/images/project-analytics.png',
    stack: ['Next.js', 'Web API', 'SQL Server', 'Recharts', 'Docker'],
    accent: 'from-violet-brand to-cyan-brand',
  },
]

type Project = (typeof PROJECTS)[number]

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const targetScale = 1 - (total - index - 1) * 0.05
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    <div className="sticky top-0 flex h-svh items-center justify-center px-4 md:px-10">
      <motion.article
        style={{ scale, top: `calc(${index * 24}px)` }}
        className="relative grid w-full max-w-5xl origin-top overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl md:grid-cols-2"
      >
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[26rem]">
          <Image
            src={project.image || '/placeholder.svg'}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-between gap-6 p-7 md:p-10">
          <div>
            <span className={`bg-gradient-to-r ${project.accent} bg-clip-text font-mono text-sm font-semibold text-transparent`}>
              {`Project 0${index + 1}`}
            </span>
            <h3 className="mt-3 text-balance text-2xl font-bold md:text-3xl">{project.title}</h3>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{project.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-border bg-foreground/5 px-3 py-1 font-mono text-xs">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <a
              href="#"
              className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${project.accent} px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-105`}
            >
              Live demo
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5"
            >
              Source code
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="projects" className="pt-28 md:pt-36">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <SectionHeading eyebrow="03 — Projects" title="Things I've built" />
      </div>
      <div ref={ref} className="relative">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
