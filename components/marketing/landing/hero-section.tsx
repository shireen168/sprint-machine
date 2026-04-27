'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.175, 0.885, 0.32, 1.275],
      },
    },
  }

  const scrollIndicatorVariants = {
    animate: {
      y: [0, 8, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20">
      {/* Aurora Background with animated gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0a0a0f]" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,110,0.3) 0%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.h1
          className="text-5xl sm:text-6xl font-bold mb-6 text-[#F1F5F9]"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            letterSpacing: '-0.03em',
            lineHeight: '1.2',
          }}
          variants={itemVariants}
        >
          30-Day Marketing Sprints. Generated in Minutes.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg sm:text-xl mb-10 text-[#94A3B8] max-w-2xl mx-auto"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: '1.7',
          }}
          variants={itemVariants}
        >
          Sprint Machine is your AI marketing co-pilot. Answer 8 questions, get a complete strategy with weekly angles, copy, and channels.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <Link
            href="/try"
            className="px-8 py-3 rounded-lg font-medium transition-all duration-300 text-[#0a0a0f]"
            style={{
              background: '#C9A96E',
              boxShadow: '0 0 28px rgba(201,169,110,0.18)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 55px rgba(201,169,110,0.5), 0 0 90px rgba(201,169,110,0.18)'
              e.currentTarget.style.transform = 'scale(1.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 28px rgba(201,169,110,0.18)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Try it free (no sign-up)
          </Link>
          <Link
            href="/sign-up"
            className="px-8 py-3 rounded-lg font-medium border-2 border-[#7C3AED] text-[#F1F5F9] transition-all duration-300 hover:bg-[#7C3AED]/10"
          >
            Create account
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        variants={scrollIndicatorVariants}
        animate="animate"
      >
        <ChevronDown className="w-6 h-6 text-[#94A3B8]" />
      </motion.div>
    </section>
  )
}
