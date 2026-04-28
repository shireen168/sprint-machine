'use client'

import { motion } from 'framer-motion'
import { CtaButton } from './cta-button'
import { ChevronDown } from 'lucide-react'

const PREVIEW_FIELDS = [
  { label: 'ANGLE', value: 'The hidden cost of weak positioning' },
  { label: 'HOOK', value: '"Most companies lose customers before the first conversation."' },
  { label: 'CTA', value: 'Download the positioning framework' },
]

const PREVIEW_CHANNELS = ['LinkedIn', 'Email', 'Twitter/X']

const C = {
  cyan: '#00C8FF',
  mint: '#38FFD8',
  bg: '#050A0E',
  surface: '#091420',
  surface2: '#0D1E30',
  text1: '#EEF6FF',
  text2: '#7ABFDF',
  border: 'rgba(0,200,255,0.2)',
  borderDim: 'rgba(0,200,255,0.12)',
}

function SprintPreviewCard() {
  return (
    <motion.div
      className="relative rounded-2xl border p-6 w-full max-w-sm"
      style={{ borderColor: C.border, background: C.surface, boxShadow: `0 0 28px rgba(0,200,255,0.12)` }}
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.9 }}
      whileHover={{ boxShadow: `0 0 55px rgba(0,200,255,0.5), 0 0 100px rgba(0,200,255,0.18)` }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${C.cyan}, transparent)` }}
      />

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: C.cyan }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: C.text2, fontFamily: "'Exo 2'" }}>Sprint Machine</span>
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-semibold"
          style={{ background: 'rgba(0,200,255,0.12)', border: `1px solid rgba(0,200,255,0.3)`, color: C.cyan }}
        >
          Week 1 of 4
        </span>
      </div>

      <p className="font-bold text-base mb-4" style={{ fontFamily: "'Exo 2'", color: C.text1 }}>
        Foundation: Market Positioning
      </p>

      <div className="space-y-2.5 mb-5">
        {PREVIEW_FIELDS.map(({ label, value }) => (
          <div key={label} className="rounded-lg p-3" style={{ background: C.surface2 }}>
            <p className="text-xs font-bold tracking-widest mb-1" style={{ color: C.cyan, fontFamily: "'Exo 2'" }}>{label}</p>
            <p className="text-sm leading-relaxed" style={{ color: C.text2 }}>{value}</p>
          </div>
        ))}
        <div className="rounded-lg p-3" style={{ background: C.surface2 }}>
          <p className="text-xs font-bold tracking-widest mb-2" style={{ color: C.cyan, fontFamily: "'Exo 2'" }}>CHANNELS</p>
          <div className="flex gap-1.5 flex-wrap">
            {PREVIEW_CHANNELS.map((ch) => (
              <span
                key={ch}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ border: `1px solid rgba(0,200,255,0.3)`, background: 'rgba(0,200,255,0.08)', color: C.text2 }}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 justify-center">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-1 rounded-full"
            style={{ width: i === 0 ? '24px' : '8px', background: i === 0 ? C.cyan : 'rgba(0,200,255,0.15)' }}
            animate={i === 0 ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  }
  const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20">
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p
            className="text-sm tracking-widest uppercase font-bold mb-5"
            style={{ color: C.cyan, fontFamily: "'Exo 2'" }}
            variants={item}
          >
            AI Marketing Co-pilot
          </motion.p>

          <motion.h1
            className="font-bold mb-6"
            style={{
              fontFamily: "'Exo 2'",
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
            }}
            variants={item}
          >
            <span style={{ background: `linear-gradient(135deg, ${C.cyan} 0%, #82E8FF 40%, ${C.text1} 70%)`, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              30-Day Marketing Sprints
            </span>
            <br />
            <span style={{ color: C.text1 }}>Generated in Minutes.</span>
          </motion.h1>

          <motion.p
            className="mb-10 max-w-lg"
            style={{ fontFamily: "'IBM Plex Sans'", lineHeight: '1.75', fontSize: '18px', color: C.text2 }}
            variants={item}
          >
            Answer 8 questions. Get a complete strategy with weekly angles, copy hooks, and channel-specific CTAs.
            Export as PDF, edit anytime.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4" variants={item}>
            <CtaButton href="/try" label="Try it free - no sign-up" />
            <CtaButton href="/sign-up" label="Create account" variant="secondary" />
          </motion.div>
        </motion.div>

        <div className="flex justify-center lg:justify-end">
          <SprintPreviewCard />
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6" style={{ color: C.text2 }} />
      </motion.div>
    </section>
  )
}
