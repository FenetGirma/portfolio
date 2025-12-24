import type React from "react"
import type { Metadata } from "next"
import { Arimo } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

const brolimo = Arimo({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-brolimo",
})

export const metadata: Metadata = {
  title: "Fenet Girma",
  description: "Creative Developer Portfolio"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${brolimo.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
