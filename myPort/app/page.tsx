import { About } from '@/components/portfolio/about'
import { Contact } from '@/components/portfolio/contact'
import { CursorGlow } from '@/components/portfolio/cursor-glow'
import { Experience } from '@/components/portfolio/experience'
import { Hero } from '@/components/portfolio/hero'
import { Navbar } from '@/components/portfolio/navbar'
import { Particles } from '@/components/portfolio/particles'
import { Projects } from '@/components/portfolio/projects'
import { Skills } from '@/components/portfolio/skills'

export default function Page() {
  return (
    <>
      <Particles />
      <CursorGlow />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
