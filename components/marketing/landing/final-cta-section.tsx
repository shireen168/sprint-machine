'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

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

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-[#F1F5F9] mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "'Bricolage Grotesque'" }}
        >
          Start your first sprint today.
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
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
            Generate Your Sprint
          </Link>
          <Link
            href="/sign-up"
            className="px-8 py-3 rounded-lg font-medium border-2 border-[#7C3AED] text-[#F1F5F9] transition-all duration-300 hover:bg-[#7C3AED]/10"
          >
            Create Account
          </Link>
        </motion.div>

        <motion.p
          className="mt-8 text-[#94A3B8] text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ fontFamily: "'DM Sans'", lineHeight: '1.7' }}
        >
          No credit card required. Generate a complete marketing sprint in minutes.
        </motion.p>
      </div>
    </section>
  )
}
