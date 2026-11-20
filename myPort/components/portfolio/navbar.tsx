'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="bg-gradient-brand h-0.5 origin-left"
      />
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        aria-label="Main"
        className={`mx-auto mt-3 flex max-w-5xl items-center justify-between rounded-full px-5 py-3 transition-colors duration-300 md:mt-4 ${
          scrolled ? 'border border-border bg-background/70 backdrop-blur-xl' : 'border border-transparent'
        }`}
      >
        <a href="#home" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-gradient">{'<AS />'}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="bg-gradient-brand hidden rounded-full px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-105 md:inline-block"
        >
          Hire me
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="rounded-full p-2 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-2 flex flex-col gap-1 rounded-3xl border border-border bg-background/90 p-3 backdrop-blur-xl md:hidden"
          >
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm hover:bg-foreground/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
