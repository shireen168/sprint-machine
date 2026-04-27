'use client'

import { motion } from 'framer-motion'
import { CtaButton } from './cta-button'

export function FinalCTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Animated glow background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(124,58,237,0.15) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          className="rounded-3xl border border-[#C9A96E]/20 bg-[#16161d]/40 backdrop-blur p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Top edge radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.4) 0%, transparent 70%)',
          }} />

          <div className="text-center relative">
            <p className="text-xs tracking-widest uppercase text-[#C9A96E] mb-4 font-semibold">Ready to launch</p>

            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-[#F1F5F9] mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ fontFamily: "'Bricolage Grotesque'" }}
            >
              Start your first sprint today
            </motion.h2>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <CtaButton href="/try" label="Generate Your Sprint" />
              <CtaButton href="/sign-up" label="Create Account" variant="secondary" />
            </motion.div>

            <motion.p
              className="text-[#94A3B8] text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              style={{ fontFamily: "'DM Sans'", lineHeight: '1.7' }}
            >
              No credit card required. Generate a complete marketing sprint in minutes.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
