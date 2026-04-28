'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const C = {
  cyan: '#00C8FF',
  bg: '#050A0E',
  surface: '#091420',
  surface2: '#0D1E30',
  text1: '#EEF6FF',
  text2: '#7ABFDF',
  border: 'rgba(0,200,255,0.18)',
}

const STATS = [
  { value: 8, suffix: '', label: 'Questions to start' },
  { value: 30, suffix: '', label: 'Days per sprint' },
  { value: 8, suffix: '+', label: 'Channels supported' },
  { value: 15, suffix: ' min', label: 'To generate your plan' },
]

const INCLUDES = [
  'Weekly marketing angle and hook per week',
  'Platform-specific content strategy per channel',
  'Message, CTA, and copy direction - fully written',
  'Edit any week without regenerating the full sprint',
  'Export as professional PDF, ready to share',
  'No account required to generate your first sprint',
]

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration = 1800
          const start = Date.now()
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 4)
          const tick = () => {
            const progress = Math.min((Date.now() - start) / duration, 1)
            setCount(Math.floor(easeOut(progress) * value))
            if (progress < 1) requestAnimationFrame(tick)
          }
          tick()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-bold mb-2" style={{ fontFamily: "'Exo 2'", color: C.cyan }}>
        {count}{suffix}
      </div>
      <p className="text-base" style={{ fontFamily: "'IBM Plex Sans'", color: C.text2, fontSize: '16px' }}>{label}</p>
    </div>
  )
}

export function SocialProofSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-widest uppercase font-bold mb-4" style={{ color: C.cyan, fontFamily: "'Exo 2'" }}>What You Get</p>
          <h2 className="text-4xl font-bold mb-5" style={{ fontFamily: "'Exo 2'", color: C.text1 }}>
            A complete sprint, ready to execute
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ fontFamily: "'IBM Plex Sans'", lineHeight: '1.7', fontSize: '18px', color: C.text2 }}>
            Not a template. Not a framework. A fully written, channel-specific marketing plan for your business.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-12 border-y"
          style={{ borderColor: 'rgba(0,200,255,0.15)' }}
        >
          {STATS.map((s) => (
            <Counter key={s.label} {...s} />
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          {INCLUDES.map((item, i) => (
            <motion.div
              key={item}
              className="flex items-start gap-3 p-5 rounded-xl"
              style={{ border: `1px solid ${C.border}`, background: C.surface }}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ boxShadow: '0 0 40px rgba(0,200,255,0.5)', borderColor: 'rgba(0,200,255,0.5)' }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'rgba(0,200,255,0.12)', border: '1px solid rgba(0,200,255,0.4)' }}
              >
                <Check className="w-3.5 h-3.5" style={{ color: C.cyan }} />
              </div>
              <p className="text-base leading-relaxed" style={{ fontFamily: "'IBM Plex Sans'", color: C.text2, fontSize: '17px' }}>{item}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
