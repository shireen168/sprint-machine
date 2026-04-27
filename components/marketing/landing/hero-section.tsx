'use client'

import { motion } from 'framer-motion'
import { CtaButton } from './cta-button'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20">
      <style>{`
        .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.3); border-radius: 9999px; font-size: 0.875rem; color: #C9A96E; }
        .hero-badge-dot { width: 0.5rem; height: 0.5rem; background: #C9A96E; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .hero-title { background: linear-gradient(90deg, #C9A96E, #F1F5F9); background-clip: text; -webkit-background-clip: text; color: transparent; animation: pan 8s linear infinite; }
        @keyframes pan { from { background-position: 0% 50%; } to { background-position: 100% 50%; } }
        .cycling-text { height: 1.5em; overflow: hidden; position: relative; }
        .cycling-text::after { content: ''; position: absolute; inset: 0; background: linear-gradient(#0a0a0f 10%, transparent 30%, transparent 70%, #0a0a0f 90%); z-index: 10; }
        .word { display: block; height: 100%; color: #7C3AED; animation: spin 6s infinite; }
        @keyframes spin { 10%  { transform: translateY(-100%); } 25%  { transform: translateY(-100%); } 35%  { transform: translateY(-200%); } 50%  { transform: translateY(-200%); } 60%  { transform: translateY(-300%); } 75%  { transform: translateY(-300%); } 85%  { transform: translateY(-400%); } 100% { transform: translateY(-400%); } }
      `}</style>

      {/* Corner geometric floats */}
      <motion.div className="absolute top-20 left-10 w-32 h-32 rounded-2xl opacity-20" style={{ background: '#7C3AED' }} animate={{ rotate: [0, 45, 0], scale: [1, 0.9, 1] }} transition={{ duration: 15, repeat: Infinity }} />
      <motion.div className="absolute bottom-32 right-20 w-40 h-40 rounded-full opacity-15" style={{ background: '#C9A96E' }} animate={{ x: [0, 30, 0], y: [0, -30, 0] }} transition={{ duration: 18, repeat: Infinity }} />

      {/* Content */}
      <motion.div className="relative z-10 text-center max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        {/* Overline */}
        <motion.p className="text-xs tracking-widest uppercase text-[#C9A96E] mb-4 font-semibold" variants={itemVariants}>
          AI Marketing Co-pilot
        </motion.p>

        {/* Badge */}
        <motion.div className="hero-badge mb-6 justify-center" variants={itemVariants}>
          <span className="hero-badge-dot" />
          <span>Now in Beta</span>
        </motion.div>

        {/* Headline with text-masking gradient */}
        <motion.h1 className="text-5xl sm:text-6xl font-bold mb-6 hero-title" style={{ fontFamily: "'Bricolage Grotesque'", letterSpacing: '-0.03em', lineHeight: '1.2' }} variants={itemVariants}>
          30-Day Marketing Sprints Generated in Minutes
        </motion.h1>

        {/* Cycling subtitle */}
        <motion.div className="cycling-text text-lg sm:text-xl mb-10 text-[#94A3B8] inline-block mx-auto" style={{ fontFamily: "'DM Sans'" }} variants={itemVariants}>
          <span className="word">Answer 8 questions, get complete strategy</span>
          <span className="word">Weekly angles, copy, and channels</span>
          <span className="word">Export as professional PDF</span>
          <span className="word">Edit and regenerate instantly</span>
        </motion.div>

        {/* CTAs */}
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" variants={itemVariants}>
          <CtaButton href="/try" label="Try it free (no sign-up)" />
          <CtaButton href="/sign-up" label="Create account" variant="secondary" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <ChevronDown className="w-6 h-6 text-[#94A3B8]" />
      </motion.div>
    </section>
  )
}
