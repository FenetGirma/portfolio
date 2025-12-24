"use client"

import { useEffect, useState } from "react"
import { HowIDoIt } from "@/components/how"
import { PortfolioHero } from "@/components/portfolio-hero"
import { AboutSection } from "@/components/about"
import CarouselGallery from "@/components/project"
import ContactHero from "@/components/contact"
import Testimonial from "@/components/testimonial"

export default function LoadingScreen() {
  const [count, setCount] = useState(0)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const target = 10

  useEffect(() => {
    if (count < target) {
      const timer = setTimeout(() => {
        setCount(count + 1)
      }, 150)
      return () => clearTimeout(timer)
    } else {
      setTimeout(() => setLoadingComplete(true), 500)
    }
  }, [count])

  if (loadingComplete) {
    return (
      <main>
        <PortfolioHero />
        <AboutSection />
        {/* <HowIDoIt /> */}
          <CarouselGallery />
      
        <Testimonial />
        
        <ContactHero />
        
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Loading text - top left */}
      <div className="absolute top-12 left-12">
        <p className="text-sm tracking-[0.3em] text-foreground font-light">LOADING</p>
      </div>

      {/* Spinner - top center */}
      {/* <div className="absolute top-12 left-1/2 -translate-x-1/2">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div> */}

      {/* Counter - center */}
      <div className="flex items-center gap-4">
        <span className="text-[12rem] font-bold leading-none text-foreground">{count.toString().padStart(2, "0")}</span>
        <span className="text-[12rem] font-bold leading-none text-muted-foreground/30">
          {target.toString().padStart(2, "0")}
        </span>
      </div>

      {/* Please wait text - bottom right */}
      <div className="absolute bottom-12 right-12">
        <p className="text-sm tracking-[0.3em] text-foreground font-light">PLEASE WAIT</p>
      </div>
    </div>
  )
}
