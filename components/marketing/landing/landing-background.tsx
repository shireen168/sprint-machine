'use client'

import { motion } from 'framer-motion'

export function LandingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: '#050A0E' }}>
      {/* Subtle cyan dot grid */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `radial-gradient(rgba(0,200,255,0.25) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.12,
        }}
      />

      {/* Horizontal scanlines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(0,200,255,0.03) 0px, rgba(0,200,255,0.03) 1px, transparent 1px, transparent 80px)`,
        }}
      />

      {/* Top-left primary cyan orb */}
      <motion.div
        className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,200,255,0.18) 0%, transparent 70%)' }}
        animate={{ x: [-20, 20, -20], y: [-30, 30, -30], scale: [1, 1.08, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom-right mint accent orb */}
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(56,255,216,0.12) 0%, transparent 70%)' }}
        animate={{ x: [30, -30, 30], y: [40, -40, 40], scale: [1, 1.12, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Center dim accent */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0,200,255,0.07) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  )
}
