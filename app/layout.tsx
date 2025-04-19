import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Image from "next/image"
import Script from 'next/script'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Footslog - Rotaract Club FRCRCE's Annual Trek",
  description: "Join us for an unforgettable jungle adventure with Footslog, the annual trek by Rotaract Club FRCRCE. Experience the beauty of the Sahyadri Mountains in Western Ghats, Maharashtra.",
  keywords: ["trek", "hiking", "adventure", "Rotaract", "FRCRCE", "Footslog", "Sahyadri", "Western Ghats", "Maharashtra"],
  authors: [{ name: "Rotaract Club FRCRCE" }],
  openGraph: {
    title: "Footslog - Annual Adventure Trek",
    description: "Join us for an unforgettable jungle adventure",
    images: ["/images/jungle-book-bg.png"],
    type: "website",
    locale: "en_US",
    siteName: "Footslog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Footslog - Annual Adventure Trek",
    description: "Join us for an unforgettable jungle adventure",
    images: ["/images/jungle-book-bg.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script id="redirect-to-root" strategy="beforeInteractive">
          {`
            if (window.performance && window.performance.navigation.type === 1 && window.location.pathname !== '/') {
              window.location.href = '/';
            }
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${playfair.variable} font-sans relative`}>
        {/* Left vine decoration */}
        <div className="fixed left-0 top-0 h-full w-24 pointer-events-none z-50 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-24 bg-[url('/images/left-vine.svg')] bg-contain bg-left opacity-30 transform scale-150 animate-subtle-sway"></div>
        </div>
        
        {/* Right vine decoration */}
        <div className="fixed right-0 top-0 h-full w-24 pointer-events-none z-50 overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-24 bg-[url('/images/right-vine.svg')] bg-contain bg-right opacity-30 transform scale-150 animate-subtle-sway-reverse"></div>
        </div>
        
        {/* Random decorative elements throughout the page */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
          {/* Paw prints pattern clusters */}
          <div className="absolute left-[10%] top-[15%] h-64 w-64 bg-[url('/images/paw-prints.svg')] bg-contain bg-no-repeat opacity-10 rotate-[15deg]"></div>
          <div className="absolute right-[20%] top-[25%] h-48 w-48 bg-[url('/images/paw-prints.svg')] bg-contain bg-no-repeat opacity-10 -rotate-[10deg]"></div>
          <div className="absolute left-[25%] bottom-[30%] h-56 w-56 bg-[url('/images/paw-prints.svg')] bg-contain bg-no-repeat opacity-10 rotate-[45deg]"></div>
          <div className="absolute right-[15%] bottom-[20%] h-72 w-72 bg-[url('/images/paw-prints.svg')] bg-contain bg-no-repeat opacity-10 -rotate-[20deg]"></div>
        </div>
        
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
