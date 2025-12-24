"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { ExternalLink, Github } from "lucide-react"

const projects = [
 {
  id: 1,
  title: "Prime Mart & Cosmetics",
  year: "2025",
  category: "E-Commerce",
  description: "A modern e-commerce website for Prime Mart & Cosmetics, featuring product browsing, secure checkout, and responsive design for all devices.",
  tech: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "Vercel"],
  image: "/prime.png", // replace with a real screenshot URL
  liveUrl: "https://primemartandcosmetics.com/",
  githubUrl: "#", // add GitHub repo if available
},

  {
  id: 2,
  title: "Levure Bakery",
  year: "2023",
  category: "Bakery Website",
  description: "A French bakery and patisserie website showcasing breakfast, lunch, gourmet coffee, pastries, and bread made with organic ingredients and traditional techniques.",
  tech: ["Next.js", "Vercel", "Tailwind CSS"],
  image: "/levure.png", // replace with a real screenshot URL
  liveUrl: "https://levure-bakery.vercel.app/",
  githubUrl: "#", // add GitHub repo if available
  },
  {
  id: 3,
  title: "UI and Why",
  year: "2025",
  category: "Blogging Platform ",
  description: "A comprehensive design system and UI component library built with Tailwind CSS and shadcn/ui, offering reusable, accessible components for rapid frontend development.",
  tech: ["Next.js", "Tailwind CSS", "shadcn/ui", "Vercel"],
  image: "/uiux.png", // replace with a real screenshot URL
  liveUrl: "https://uiandwhy.vercel.app/",
  githubUrl: "#", // add GitHub repo if available
},
 {
  id: 4,
  title: "Aravē Spa",
  year: "2025",
  category: "Wellness & Beauty",
  description: "A luxurious spa experience offering a range of treatments including massages, facials, and exclusive wellness packages, designed to rejuvenate both body and mind.",
  tech: ["Next.js", "Tailwind CSS", "Vercel"],
  image: "/Arave.png", // replace with a real screenshot URL
  liveUrl: "https://arav-spa.vercel.app/",
  githubUrl: "#", // add GitHub repo if available
},
  {
  id: 5,
  title: "Kuriftu Inspect",
  year: "2025",
  category: "Property Management",
  description: "A comprehensive digital platform for managing property inspections across all Kuriftu Resorts, featuring customizable checklists, real-time analytics, and a mobile app for on-the-go inspections.",
  tech: ["Next.js", "Nest.js", "Tailwind CSS", "Vercel", "TypeScript"],
  image: "/kuriftu.png", // replace with a real screenshot URL
  liveUrl: "https://kuriftuu.vercel.app/",
  githubUrl: "#", // add GitHub repo if available
},
  {
  "id": 6,
  "title": "Acelink Tutoring",
  "year": "2025",
  "category": "Education",
  "description": "An online tutoring platform offering personalized lessons across various subjects, featuring real-time scheduling, secure payments, and responsive design for seamless learning experiences.",
  "tech": ["React", "Tailwind CSS", "Netlify", "Stripe"],
  "image": "/acelink.png", // replace with a real screenshot URL
  "liveUrl": "https://acelink-tutoring.netlify.app/",
  "githubUrl": "#" // add GitHub repo if available
},
{
  "id": 7,
  "title": "Fenet Girma's Portfolio",
  "year": "2025",
  "category": "Portfolio",
  "description": "My personal portfolio website showcasing frontend projects, UI/UX experiments, and web development skills with interactive components and smooth animations.",
  "tech": ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
  "image": "/portfolios.png", // replace with a real screenshot URL
  "liveUrl": "https://your-portfolio-url.com/",
  "githubUrl": "#" // add GitHub repo if available
},
  {
  id: 8,
  title: "Aravē Spa",
  year: "2025",
  category: "Wellness & Beauty",
  description: "A luxurious spa experience offering a range of treatments including massages, facials, and exclusive wellness packages, designed to rejuvenate both body and mind.",
  tech: ["Next.js", "Tailwind CSS", "Vercel"],
  image: "/Arave.png", // replace with a real screenshot URL
  liveUrl: "https://arav-spa.vercel.app/",
  githubUrl: "#", // add GitHub repo if available
},
]

export default function ProjectCarousel() {
  const [offset, setOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [velocity, setVelocity] = useState(0)
  const [targetOffset, setTargetOffset] = useState(0)

  const containerRef = useRef(null)
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(Date.now())
  const lastPositionRef = useRef<number>(0)
  const velocityRef = useRef<number>(0)

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  useEffect(() => {
    const animate = () => {
      const now = Date.now()
      const deltaTime = (now - lastTimeRef.current) / 16.67
      lastTimeRef.current = now

      if (!isDragging && hoveredProject === null) {
        setTargetOffset((prev) => prev + 0.15 * deltaTime)
      }

      if (!isDragging && Math.abs(velocityRef.current) > 0.01) {
        setTargetOffset((prev) => prev + velocityRef.current * deltaTime)
        velocityRef.current *= 0.92
      }

      setOffset((prev) => {
        const smoothed = lerp(prev, targetOffset, 0.12 * deltaTime)
        return smoothed
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDragging, hoveredProject])

  const handlePrev = useCallback(() => {
    setTargetOffset((prev) => prev - 100)
    velocityRef.current = 0
  }, [])

  const handleNext = useCallback(() => {
    setTargetOffset((prev) => prev + 100)
    velocityRef.current = 0
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    lastPositionRef.current = e.clientX
    velocityRef.current = 0
    lastTimeRef.current = Date.now()
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return

      const now = Date.now()
      const deltaTime = now - lastTimeRef.current
      const diff = e.clientX - startX

      if (deltaTime > 0) {
        const currentVelocity = ((e.clientX - lastPositionRef.current) / deltaTime) * 16.67
        velocityRef.current = currentVelocity * -0.5
      }

      setTargetOffset((prev) => prev - diff * 0.5)
      setStartX(e.clientX)
      lastPositionRef.current = e.clientX
      lastTimeRef.current = now
    },
    [isDragging, startX],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    lastPositionRef.current = e.touches[0].clientX
    velocityRef.current = 0
    lastTimeRef.current = Date.now()
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return

      const now = Date.now()
      const deltaTime = now - lastTimeRef.current
      const diff = e.touches[0].clientX - startX

      if (deltaTime > 0) {
        const currentVelocity = ((e.touches[0].clientX - lastPositionRef.current) / deltaTime) * 16.67
        velocityRef.current = currentVelocity * -0.5
      }

      setTargetOffset((prev) => prev - diff * 0.5)
      setStartX(e.touches[0].clientX)
      lastPositionRef.current = e.touches[0].clientX
      lastTimeRef.current = now
    },
    [isDragging, startX],
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handlePrev, handleNext])

  return (
    <section
    id="projects"
    className="relative h-screen w-full overflow-hidden bg-background scroll-mt-24"
  >
    <div className="absolute top-0 left-0 right-0 z-20 pt-12 pb-12 space-y-4">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-primary text-sm font-light tracking-[0.5em] uppercase">Featured Projects</span>
            <span className="text-primary/50 text-xs font-light tracking-[0.3em] uppercase">Drag to Explore</span>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center scale-[0.85]"
        style={{
          perspective: "2000px",
          perspectiveOrigin: "50% 50%",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            cursor: isDragging ? "grabbing" : "grab",
            willChange: "transform",
          }}
        >
          {projects.map((project, index) => {
            const cardWidth = 400
            const gap = 40
            const spacing = cardWidth + gap

            const position = index * spacing - offset
            const totalWidth = projects.length * spacing
            const wrappedPosition = ((position % totalWidth) + totalWidth) % totalWidth
            const adjustedPosition = wrappedPosition > totalWidth / 2 ? wrappedPosition - totalWidth : wrappedPosition

            const radius = ((projects.length * spacing) / (2 * Math.PI)) * 2.941183348338226
            const maxAngle = Math.PI / 3.5
            const normalizedPosition = adjustedPosition / spacing
            const angle = normalizedPosition * (maxAngle / 3)

            const translateX = Math.sin(angle) * radius
            const translateZ = -(radius - Math.cos(angle) * radius)
            const rotateY = angle * (180 / Math.PI)

            const distanceFromCenter = Math.abs(adjustedPosition)
            const opacity = Math.max(0.15, Math.min(1, 1 - Math.pow(distanceFromCenter / 2500, 1.5)))
            const isCenter = distanceFromCenter < 300

            const scale = Math.max(0.85, 1 - distanceFromCenter / 5000)

            return (
              <div
                key={project.id}
                className="absolute"
                style={{
                  transform: `
                    translateX(${translateX}px) 
                    translateZ(${translateZ}px) 
                    rotateY(${rotateY}deg)
                    scale(${scale})
                  `,
                  opacity,
                  zIndex: Math.round(1000 + translateZ / 5),
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative w-[480px] h-[640px] ">
                  <div
                    className={`relative w-full h-full rounded-3xl overflow-hidden bg-background backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.4)] border transition-all duration-300  ${
                      hoveredProject === project.id
                        ? "border-white/30 shadow-[0_35px_100px_rgba(255,255,255,0.1)]"
                        : "border-white/10"
                    }`}
                  >
                   <img
  src={project.image || "/placeholder.svg"}
  alt={project.title}
  className={`w-full h-3/7 object-cover transition-all duration-500 ease-in-out
    ${hoveredProject === project.id ? "scale-105 filter-none" : "scale-100 filter grayscale brightness-90 contrast-105"}
  `}
  draggable={false}
/>


 

                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wider uppercase bg-primary/10 backdrop-blur-md border border-white/20 text-white">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 text-primary">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-2xl font-semibold tracking-tight leading-tight">{project.title}</h3>
                          <span className="text-sm font-light text-primary/50 mt-1">{project.year}</span>
                        </div>

                        <p className="text-sm font-light leading-relaxed text-primary/70 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide bg-primary/5 border border-white/10 text-primary/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div
                          className={`flex items-center gap-3 mt-2 transition-opacity duration-300 ${
                            hoveredProject === project.id || isCenter ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <a
                            href={project.liveUrl}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium tracking-wide bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View Live
                          </a>
                          <a
                            href={project.githubUrl}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium tracking-wide bg-primary/10 backdrop-blur-sm border border-white/20 text-primary hover:bg-primary/20 transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-3.5 h-3.5" />
                            Source
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
