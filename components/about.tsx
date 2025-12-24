"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

function ColumnSection({ title, items, delay }: { title: string; items: string[]; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <h3 className="font-mono text-xs uppercase tracking-tight text-gray-900 font-bold">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: delay + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-sm tracking-tight text-primary hover:text-gray-800 transition-colors cursor-default"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export function AboutSection() {
  return (
   <section
      id="about"
      className="relative min-h-screen bg-background text-primary"
    >
      <div className="absolute top-8 left-8 z-10">
        <h2 className="font-mono text-sm font-light uppercase tracking-tighter text-gray-900">- ABOUT ME</h2>
      </div>

      <div className="grid grid-cols-[0.5fr_2fr_3fr] min-h-screen items-center py-20">
        {/* Empty left column */}
        <div />

        {/* Middle column with image and content */}
        <div className="flex flex-col items-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-72 h-96  overflow-hidden"
          >
            <img src="/fenuye.png" alt="Portrait" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center space-y-8"
          >
            <div className="space-y-2">
              <h3 className="font-mono text-2xl font-normal tracking-wide">HELLO!</h3>
              <h1 className="font-mono text-3xl md:text-4xl font-normal tracking-wide">I'M FENET GIRMA</h1>
            </div>

            <div className="flex items-center justify-center gap-3">
              <h4 className="font-mono text-base font-normal tracking-wide text-gray-950">MY EXPERIENCE</h4>
              <svg className="w-4 h-4 text-gray-400 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            <p className="font-mono text-sm md:text-base leading-relaxed text-primary">
            A JUNIOR DEVELOPER EAGER TO LEARN, BUILD, AND CONTRIBUTE TO IMPACTFUL WEB PROJECTS.

            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-x-16 gap-y-16 pl-16 pr-8">
          <ColumnSection
            title="SPECIALIZATION"
            items={[
              "WEB DESIGN",
              "PRODUCT DESIGN",
              "UI/UX DESIGN",
              "WEB DEVELOPMENT",
            ]}
            delay={0.2}
          />
          
            <ColumnSection
  title="SKILLS & TOOLS"
  items={[
    "HTML, CSS, JAVASCRIPT",
    "REACT / NEXT.JS",
    "TAILWIND CSS",
    "NEST.JS / EXPRESS",
    "FIGMA / UI DESIGN",
  ]}
  delay={0.5}
/>
          <ColumnSection
  title="ACHIEVEMENTS"
  items={[
    "ALX HOSPITALITY HACKATHON – RUNNER UP",
    "REBOOT THE EARTH HACKATHON – RUNNER UP",
    "AI FOR IMPACT HACKATHON – SEMIFINALIST",
    "YENEGEW KEN HACKATHON – RUNNER UP",
  ]}
  delay={0.4}
/>

         <ColumnSection
  title="PROJECTS"
  items={[
    "PORTFOLIO WEBSITE",
    "E-COMMERCE FRONTEND",
    "COLLEGE APPLICATION SYSTEM",
    "BLOG PLATFORM",
  ]}
  delay={0.3}
/>



        

        </div>
      </div>
    </section>
  )
}
