"use client"

import { ArrowLeft, ArrowRight, Quote } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

const testimonials = [
    {
    name: "MAEDOT ASRAT",
    image: "/maddy.jpg",
    quote:
      "Working with Fenet was an absolute game-changer for our project. Her technical expertise combined with creative problem-solving made the impossible possible. She's not just a developer, she's a true partner in innovation.",
  },
   {
    name: "LIDYA GEBRETSADIK",
    image: "/liduu.jpg",
    quote:
      "Fenet's ability to understand complex requirements and translate them into elegant solutions is remarkable. She consistently delivers high-quality work on time and goes above and beyond to ensure client satisfaction.",
  },
  {
    name: "MAEDOT ASRAT",
    image: "/portfolio.jpg",
    quote:
      "Fenet is a highly skilled and creative developer. Her attention to detail and ability to bring ideas to life is truly impressive. Working with her has been a pleasure, and I highly recommend her for any development project.",
  },
  
 
  {
    name: "EMILY RODRIGUEZ",
    image: "/professional-woman-headshot.png",
    quote:
      "I've worked with many developers, but Fenet stands out for her exceptional communication skills and dedication to excellence. She transforms visions into reality with precision and creativity.",
  },
]

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious()
      if (e.key === "ArrowRight") handleNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex])

  const handleNext = () => {
    if (currentIndex < testimonials.length - 1 && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
        setIsAnimating(false)
      }, 150)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1)
        setIsAnimating(false)
      }, 150)
    }
  }

  const currentTestimonial = testimonials[currentIndex]
  const nextTestimonial = testimonials[currentIndex + 1] || testimonials[0]

  return (
    <section id="testimonial">
 <div className="flex items-center justify-self-start mb-12 gap-4 w-full max-w-md px-4">
  

  {/* Text */}
  <h2 className="text-xl md:text-2xl lg:text-3xl font-mono font-light text-gray-700 uppercase">
    TESTIMONIALS
  </h2>

  {/* Right decorative line */}
</div>


    <div className="flex justify-center">
        
      <div className="relative min-h-screen bg-background text-primary">
        <div className="flex items-end gap-32 lg:gap-80 px-8">
          <div className="flex gap-4">
           <button
  onClick={handlePrevious}
  disabled={currentIndex === 0}
  className="p-3 rounded-full border border-gray-800 text-gray-800 hover:bg-black hover:text-white hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-800"
  aria-label="Previous testimonial"
>
  <ArrowLeft className="w-5 h-5" />
</button>


            <button
  onClick={handleNext}
  disabled={currentIndex === testimonials.length - 1}
  className="p-3 rounded-full border border-gray-800  hover:bg-black hover:text-white hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-800 bg-primary text-white"
  aria-label="Next testimonial"
>
  <ArrowRight className="w-5 h-5" />
</button>

          </div>

     

          <div className="flex gap-16">
            <div
              className={`h-[36rem] w-96 bg-white rounded-[0.1rem] border border-gray-950 overflow-hidden transition-all duration-300 hover:shadow-lg ${isAnimating ? "opacity-50 scale-[0.98]" : "opacity-100 scale-100"}`}
            >
              <div className="h-60 w-full p-2 overflow-hidden pt-2">
                <Image
                  src={currentTestimonial.image || "/placeholder.svg"}
                  alt={currentTestimonial.name}
                  width={500}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="font-serif text-xl font-semibold text-gray-900">{currentTestimonial.name}</div>
                </div>
                <Quote className="w-5 h-5 text-gray-400 rotate-180 mb-2" />

                <p className="text-gray-600  text-lg font-light">{currentTestimonial.quote}</p>

                <div className="flex justify-end mt-2">
                  <Quote className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div
              className={`h-72 w-60 bg-white rounded-[0.1rem] border border-gray-950 transition-all duration-300 overflow-hidden hover:shadow-md ${isAnimating ? "opacity-50" : "opacity-100"}`}
            >
              <div className="h-32 w-full p-2 overflow-hidden">
                <Image
                  src={nextTestimonial.image || "/placeholder.svg"}
                  alt={nextTestimonial.name}
                  width={500}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="font-serif text-sm font-semibold text-gray-900">{nextTestimonial.name}</div>
                </div>
                <Quote className="w-3 h-3 text-gray-400 rotate-180 mb-1" />

                <p className="text-gray-600 leading-relaxed text-xs font-light line-clamp-4">{nextTestimonial.quote}</p>

                <div className="flex justify-end items-center mt-1">
                  <Quote className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
             <div className="flex gap-2 items-center justify-center mt-16">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true)
                    setTimeout(() => {
                      setCurrentIndex(index)
                      setIsAnimating(false)
                    }, 150)
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-primary" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
      </div>
    </div>
     </section>
  )
}
