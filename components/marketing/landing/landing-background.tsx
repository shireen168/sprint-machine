'use client'

import { motion } from 'framer-motion'

export function LandingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dot grid background */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          backgroundImage: `radial-gradient(#F1F5F9 0.5px, transparent 0.5px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0',
          opacity: 0.05,
        }}
      />

      {/* Top-left violet orb */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: [-30, 30, -30],
          y: [-50, 50, -50],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Bottom-right gold orb */}
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: [40, -40, 40],
          y: [60, -60, 60],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Center small violet orb (accent) */}
      <motion.div
        className="absolute left-1/2 top-1/3 w-64 h-64 rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          mixBlendMode: 'multiply',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: [-20, 20, -20],
          y: [0, 40, 0],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  )
}
