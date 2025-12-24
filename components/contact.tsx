"use client"

import type React from "react"
import { useState } from "react"
import { ArrowUpRight, X } from "lucide-react"
import Link from "next/link"

export default function ContactHero() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    acceptedPrivacy: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <section id="contact">
      {/* Main Hero Section */}
      <div className="relative min-h-screen bg-background flex flex-col font-mono text-primary">
        {/* Right Contact Info */}
        <div className="right-8 md:right-12 top-12 flex flex-col items-end gap-6 text-sm p-4">
          <div className="text-right">
            <a
              href="tel:+251970386940"
              className="block text-lg md:text-xl font-bold hover:opacity-60 transition-opacity"
            >
              +251 970386940
            </a>
            <a
              href="mailto:fenutigist@gmail.com"
              className="block text-base md:text-lg font-bold hover:opacity-60 transition-opacity"
            >
              fenutigist@gmail.com
            </a>
          </div>

          <div className="flex gap-6 text-xs uppercase tracking-wider">
            <a
              href="https://t.me/fenuItefaq"
              className="flex items-center gap-1 underline hover:opacity-60 transition-opacity"
            >
              TELEGRAM <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/FenetGirma"
              className="flex items-center gap-1 underline hover:opacity-60 transition-opacity"
            >
              GITHUB <ArrowUpRight className="w-3 h-3" />
            </a>

            <a
              href="https://www.linkedin.com/in/fenet-girma-6720522a2/"
              className="flex items-center gap-1 underline hover:opacity-60 transition-opacity"
            >
              LINKEDIN <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <address className="not-italic text-right text-xs leading-relaxed mt-8">
            Address:
            <br />
            ADDIS ABABA, ETHIOPIA
            <br />
          </address>
        </div>

        {/* Center Large Name */}
        <main className="flex-1 flex items-center justify-center px-8 md:px-12">
          <button
            onClick={() => setIsFormOpen(true)}
            className="text-[10vw] md:text-[12vw] lg:text-[14vw] font-sans font-black leading-none tracking-tighter hover:opacity-80 transition-opacity"
          >
            FENET GIRMA
          </button>
        </main>

        {/* Bottom Info Bar */}
        <footer className="flex items-center justify-between px-8 md:px-12 pb-8 text-xs">
          <div className="flex gap-12 text-primary text-sm tracking-widest">
            <Link
              href="https://www.linkedin.com/in/fenet-girma-6720522a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              [ LINKEDIN ]
            </Link>
            <Link
              href="https://github.com/FenetGirma"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              [ GITHUB ]
            </Link>
            <Link
              href="https://t.me/fenuItefaq"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              [ TELEGRAM ]
            </Link>
          </div>

          <div className="flex gap-12">
            <span>
              ADDIS ABABA, ETHIOPIA: (GMT+3){" "}
              {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
            </span>
            <span>DEVELOPMENT – MM</span>
            <span>© All Right Reserved. {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>

      {isFormOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-background border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 md:p-8  sticky top-0 bg-background">
                <h2 className="text-2xl md:text-3xl font-sans font-bold">Get in touch</h2>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 hover:opacity-60 transition-opacity"
                  aria-label="Close form"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 space-y-8 font-mono">
                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 pb-8 border-b border-border">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Email</h3>
                    <a
                      href="mailto:fenutigist@gmail.com"
                      className="text-lg md:text-xl underline hover:opacity-60 transition-opacity"
                    >
                      fenutigist@gmail.com
                    </a>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Social Media</h3>
                    <div className="space-y-2">
                      <a
                        href="https://www.linkedin.com/in/fenet-girma-6720522a2/"
                        className="flex items-center gap-2 text-lg md:text-xl hover:opacity-60 transition-opacity"
                      >
                        LinkedIn <ArrowUpRight className="w-4 h-4" />
                      </a>
                      <a
                        href="https://github.com/FenetGirma"
                        className="flex items-center gap-2 text-lg md:text-xl hover:opacity-60 transition-opacity"
                      >
                        GitHub <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-muted-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-border pb-2 focus:outline-none focus:border-foreground transition-colors text-base"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-border pb-2 focus:outline-none focus:border-foreground transition-colors text-base"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs uppercase tracking-wider text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-transparent border-b border-border pb-2 focus:outline-none focus:border-foreground transition-colors resize-none text-base"
                      required
                    />
                  </div>

                 

                  <button
                    type="submit"
                    className="group flex items-center gap-2 text-sm uppercase tracking-wider hover:opacity-60 transition-opacity pt-4"
                  >
                    Submit <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </section>  
  )
}
