'use client'

import { motion } from 'framer-motion'

interface FeatureProps {
  number: number
  title: string
  description: string
  align: 'left' | 'right'
  icon: React.ReactNode
}

function Feature({ number, title, description, align, icon }: FeatureProps) {
  const isLeft = align === 'left'

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8,  }}
    >
      {/* Text content */}
      <div className={`space-y-4 ${isLeft ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}>
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center text-[#F1F5F9] font-bold text-sm">
            {number}
          </div>
          <h3 className="text-2xl font-bold text-[#C9A96E]" style={{ fontFamily: "'Bricolage Grotesque'" }}>
            {title}
          </h3>
        </motion.div>
        <p className="text-[#94A3B8] max-w-lg" style={{ fontFamily: "'DM Sans'", lineHeight: '1.7' }}>
          {description}
        </p>
      </div>

      {/* Visual diagram */}
      <motion.div
        className={`flex items-center justify-center ${isLeft ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <motion.div
          className="w-64 h-64 rounded-lg border border-[#7C3AED] border-opacity-30 flex items-center justify-center relative overflow-hidden bg-[#16161d] bg-opacity-50 group cursor-pointer hover:border-opacity-100 transition-all"
          whileHover={{ boxShadow: '0 0 24px rgba(124, 58, 237, 0.3)' }}
        >
          {/* Animated placeholder visualization */}
          {icon}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function FeaturesSection() {
  const features = [
    {
      number: 1,
      title: 'Automated Intake',
      description:
        'Answer 8 quick questions about your product, customer, goals, and budget. Sprint Machine learns your business in minutes, not hours.',
      align: 'left' as const,
      icon: (
        <motion.div
          className="space-y-3"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="h-3 bg-gradient-to-r from-[#7C3AED] to-transparent rounded-full w-32" />
          <div className="h-3 bg-gradient-to-r from-[#7C3AED] to-transparent rounded-full w-40" />
          <div className="h-3 bg-gradient-to-r from-[#7C3AED] to-transparent rounded-full w-28" />
        </motion.div>
      ),
    },
    {
      number: 2,
      title: 'Platform Matrix',
      description:
        'Get custom strategies for the exact channels your customers use. Twitter, LinkedIn, Instagram, TikTok, email, paid ads - all aligned.',
      align: 'right' as const,
      icon: (
        <motion.div
          className="grid grid-cols-2 gap-3"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-16 h-16 bg-[#C9A96E] rounded opacity-60" />
          ))}
        </motion.div>
      ),
    },
    {
      number: 3,
      title: 'Weekly Copy',
      description:
        'Each week gets an angle, hook, message, and CTA. All written and optimized for your channels. Copy that converts, ready to use.',
      align: 'left' as const,
      icon: (
        <motion.div
          className="space-y-2 w-full"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-gradient-to-r from-[#C9A96E] to-transparent rounded w-full" />
          ))}
        </motion.div>
      ),
    },
    {
      number: 4,
      title: 'Edit & Regenerate',
      description:
        'Change a week, update a platform, adjust your strategy. No need to restart. Edit anything and regenerate that section in seconds.',
      align: 'right' as const,
      icon: (
        <motion.div
          className="relative w-20 h-20 rounded-full border-2 border-[#7C3AED]"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-2 rounded-full border border-[#C9A96E] opacity-50" />
        </motion.div>
      ),
    },
    {
      number: 5,
      title: 'Download & Share',
      description:
        'Export your complete sprint as a professional PDF. Share with stakeholders, save to Notion, or import to your project management tool.',
      align: 'left' as const,
      icon: (
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-24 h-32 bg-[#16161d] border-2 border-[#C9A96E] rounded" />
          <div className="text-xs text-[#94A3B8]">PDF Export</div>
        </motion.div>
      ),
    },
  ]

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-widest uppercase text-[#C9A96E] mb-4 font-semibold">How It Works</p>
          <h2 className="text-4xl font-bold text-[#F1F5F9] mb-4" style={{ fontFamily: "'Bricolage Grotesque'" }}>
            Five Core Capabilities
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans'", lineHeight: '1.7' }}>
            One unified platform. Complete marketing strategy in minutes.
          </p>
        </motion.div>

        <div className="space-y-20">
          {features.map((feature) => (
            <Feature key={feature.number} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
