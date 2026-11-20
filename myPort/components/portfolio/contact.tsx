'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, Mail, Phone, Send } from 'lucide-react'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://x.com' },
]

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.85, 1])
  const radius = useTransform(scrollYProgress, [0, 0.7], [80, 32])

  return (
    <section id="contact" ref={ref} className="px-4 pb-10 pt-20 md:px-8">
      <motion.div
        style={{ scale, borderRadius: radius }}
        className="bg-gradient-brand relative mx-auto max-w-6xl overflow-hidden p-8 text-background md:p-16"
      >
        <p className="font-mono text-sm font-medium opacity-80">05 — Contact</p>
        <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight md:text-7xl">
          {"Let's build something amazing together."}
        </h2>
        <p className="mt-6 max-w-xl text-pretty text-lg opacity-90">
          Have a project in mind or looking for a full stack developer to join your team? My inbox is always open.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="mailto:aman.sahani@example.com"
            className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 font-medium text-foreground transition-transform hover:scale-105"
          >
            <Send className="size-4" aria-hidden="true" />
            Say hello
          </a>
          <a
            href="mailto:aman.sahani@example.com"
            className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3.5 font-medium transition-colors hover:bg-background/10"
          >
            <Mail className="size-4" aria-hidden="true" />
            aman.sahani@example.com
          </a>
          <a
            href="tel:+910000000000"
            className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3.5 font-medium transition-colors hover:bg-background/10"
          >
            <Phone className="size-4" aria-hidden="true" />
            +91 00000 00000
          </a>
        </div>

        <ul className="mt-14 flex flex-wrap gap-6 border-t border-background/20 pt-8">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-lg font-semibold"
              >
                {s.label}
                <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      <footer className="mx-auto mt-8 flex max-w-6xl flex-col items-center justify-between gap-2 px-2 text-sm text-muted-foreground md:flex-row">
        <p>{`© ${new Date().getFullYear()} Aman Sahani. All rights reserved.`}</p>
        <p className="font-mono">Built with .NET mindset & React heart</p>
      </footer>
    </section>
  )
}
