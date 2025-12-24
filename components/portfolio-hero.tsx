"use client"

import type React from "react"
import { useState } from "react"
import { Github, Linkedin, Download } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"

const qualities = [
  { text: "Creative Thinker", author: "— Maedot Asrat, Design Lead" },
  { text: "Passionate Developer", author: "— Nahom Mekonnen, CTO" },
  { text: "Innovative Problem Solver", author: "— Hana Alemu, Product Manager" },
  { text: "Detail-Oriented", author: "— Dawit Bekele, Senior Developer" },
  { text: "Collaborative Team Player", author: "— Meron Getachew, Project Manager" },
  { text: "Versatile Designer", author: "— Abel Tadesse, Creative Director" },
]


const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
   { label: "Testimonials", href: "#testimonial" },
  { label: "Contact", href: "#contact" },
 
]

export function PortfolioHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    })
  }

  const getActiveQuality = () => {
    if (typeof window === "undefined") return null

    let closestIndex = -1
    let minDistance = Number.POSITIVE_INFINITY

    qualities.forEach((_, index) => {
      const angle = (index / qualities.length) * Math.PI * 2
      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.35
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      const qualityX = centerX + Math.cos(angle) * radius
      const qualityY = centerY + Math.sin(angle) * radius

      const distance = Math.sqrt(Math.pow(mousePosition.x - qualityX, 2) + Math.pow(mousePosition.y - qualityY, 2))

      if (distance < minDistance && distance < 250) {
        minDistance = distance
        closestIndex = index
      }
    })

    if (closestIndex === -1) return null

    const opacity = Math.max(0, Math.min(1, 1 - minDistance / 250))
    return { index: closestIndex, opacity }
  }

  const activeQuality = getActiveQuality()

  return (
    <div className="relative min-h-screen bg-background overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="relative flex min-h-screen flex-col px-6 py-8 md:px-12 md:py-12">
        {activeQuality !== null && (
          <motion.div
            className="pointer-events-none fixed z-0 flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: activeQuality.opacity,
              scale: 1,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <p className="font-sans text-md font-bold tracking-tight text-primary md:text-xl lg:text-xl">
              {qualities[activeQuality.index].text}
            </p>
            <p className="mt-2 font-sans text-xs font-light tracking-wide text-primary/60 md:text-sm">
              {qualities[activeQuality.index].author}
            </p>
          </motion.div>
        )}

        <motion.header
          className="relative z-10 mb-16 flex items-center justify-between border-b border-black/8 pb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-all hover:opacity-60"
                aria-label="GitHub"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-5 w-5 md:h-6 md:w-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-all hover:opacity-60"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
              </motion.a>
            </motion.div>
          </div>

          <nav className="w-full">
  <div className="flex justify-end gap-8 md:gap-12">
    {navItems.map((item, index) => (
      <motion.a
        key={item.label}
        href={item.href}
        className="relative font-serif text-xs uppercase text-gray-800 transition-colors duration-300 hover:text-black md:text-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
        whileHover={{ y: -2 }}
      >
        {item.label}
        {/* Elegant underline on hover */}
      </motion.a>
    ))}
  </div>
</nav>

        </motion.header>

        <motion.div className="relative z-10 flex flex-1 flex-col justify-center" style={{ y, opacity }}>
          <motion.p
            className="mb-3 font-sans text-xs font-light uppercase tracking-[0.3em] text-primary/70 md:text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Web Designer / Frontend Developer
          </motion.p>

          <div className="mb-16 md:mb-20 overflow-hidden">
            <motion.h1
              className="font-sans text-[12vw] font-extrabold leading-[0.9] tracking-tighter text-primary md:text-[10vw]"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {"FENET GIRMA".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + index * 0.03,
                    ease: "easeOut",
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>
<div className="grid w-full grid-cols-1 md:grid-cols-[1fr_2fr_1fr]  md:items-end">

            <div className="hidden md:block" />

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                className="relative overflow-hidden rounded-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.2, delay: 0.8 }}>
                  <Image
                    src="/fenuye.png"
                    alt="Fenet Girma"
                    width={800}
                    height={800}
                    className="h-auto w-full max-w-4xl object-cover"
                    priority
                  />
                </motion.div>
                
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col justify-end gap-6 md:-ml-20"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.p
  className="font-serif text-lg md:text-[1.1rem] leading-snug text-black/90 tracking-tight max-w-md italic first-letter:text-[3rem] first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-none"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 1.2 }}
>
  I specialize in <span className=" not-italic text-black">creating engaging and intuitive web experiences</span>. 
  My focus is on combining design and functionality to deliver projects that 
  <span className=" not-italic text-black"> delight users</span> and solve real-world problems.

</motion.p>


              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <Button
                  size="lg"
                  className="group w-fit gap-2 rounded-sm bg-primary px-8 py-6 font-medium tracking-tight text-gray-900 transition-all hover:bg-black/90 relative overflow-hidden"
                  asChild
                >
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <motion.span
                      className="absolute inset-0 "
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5 text-white" />
                    <span className="relative z-10 text-white">Resume</span>
                  </motion.button>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 bg-black/[0.02] rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/4 w-1/2 h-1/2 bg-black/[0.02] rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}
