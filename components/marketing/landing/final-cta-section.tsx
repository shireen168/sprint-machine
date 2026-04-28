'use client'

import { motion } from 'framer-motion'
import { CtaButton } from './cta-button'

const C = {
  cyan: '#00C8FF',
  surface: '#091420',
  text1: '#EEF6FF',
  text2: '#7ABFDF',
}

export function FinalCTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(circle at center, rgba(0,200,255,0.08) 0%, transparent 70%)' }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl -z-10"
        style={{ background: 'radial-gradient(circle, rgba(0,200,255,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          className="rounded-3xl p-12 relative overflow-hidden"
          style={{
            border: '1px solid rgba(0,200,255,0.25)',
            background: 'rgba(9,20,32,0.6)',
            backdropFilter: 'blur(12px)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,200,255,0.5) 0%, transparent 70%)' }}
          />

          <div className="text-center relative">
            <p className="text-sm tracking-widest uppercase font-bold mb-4" style={{ color: C.cyan, fontFamily: "'Exo 2'" }}>
              Ready to launch
            </p>

            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-8"
              style={{ fontFamily: "'Exo 2'", color: C.text1 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
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
              className="text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              style={{ fontFamily: "'IBM Plex Sans'", lineHeight: '1.7', fontSize: '16px', color: C.text2 }}
            >
              No credit card required. Generate a complete marketing sprint in minutes.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
