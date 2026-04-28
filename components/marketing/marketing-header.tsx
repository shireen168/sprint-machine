'use client'

import Link from 'next/link'
import { useScroll, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const C = {
  cyan: '#00C8FF',
  bg: '#050A0E',
  text1: '#EEF6FF',
  text2: '#7ABFDF',
}

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
      className={`fixed top-0 w-full z-40 transition-all duration-300`}
      style={{
        borderBottom: `1px solid ${isScrolled ? 'rgba(0,200,255,0.2)' : 'rgba(0,200,255,0.08)'}`,
        background: isScrolled ? 'rgba(5,10,14,0.97)' : 'rgba(5,10,14,0.92)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: C.cyan }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-lg font-bold" style={{ fontFamily: "'Exo 2'", color: C.text1, letterSpacing: '-0.01em' }}>
            Sprint Machine
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/try"
            className="text-sm font-semibold transition-colors"
            style={{ fontFamily: "'Exo 2'", color: C.cyan }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#82E8FF' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.cyan }}
          >
            Try free
          </Link>
          <Link
            href="/sign-in"
            className="text-sm transition-colors"
            style={{ fontFamily: "'Exo 2'", color: C.text2 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.text1 }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.text2 }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  )
}
