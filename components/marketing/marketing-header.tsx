'use client'

import Link from 'next/link'
import { useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function MarketingHeader() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 10)
    })
    return () => unsubscribe()
  }, [scrollY])

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-[#7C3AED]/20 bg-[#0a0a0f]/98 backdrop-blur-md'
          : 'border-b border-white/10 bg-[#0a0a0f]/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with animated dot */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <motion.div
            className="w-2 h-2 rounded-full bg-[#C9A96E]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-lg font-bold text-[#F1F5F9]">Sprint Machine</span>
        </Link>

        {/* Right section: CTA + Sign in */}
        <div className="flex items-center gap-4">
          <Link
            href="/try"
            className="text-sm font-medium text-[#C9A96E] hover:text-[#E8D5B0] transition-colors"
          >
            Try free
          </Link>
          <Link
            href="/sign-in"
            className="text-sm text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  )
}
