'use client'

import { motion } from 'framer-motion'
import { IntakeIcon, PlatformIcon, CopyIcon, EditIcon, PdfIcon } from './feature-icons'

const C = {
  cyan: '#00C8FF',
  bg: '#050A0E',
  surface: '#091420',
  text1: '#EEF6FF',
  text2: '#7ABFDF',
  border: 'rgba(0,200,255,0.15)',
}

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
      transition={{ duration: 0.8 }}
    >
      <div className={`space-y-4 ${isLeft ? 'md:order-1' : 'md:order-2'}`}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ background: 'rgba(0,200,255,0.12)', border: '1px solid rgba(0,200,255,0.4)', color: C.cyan, fontFamily: "'Exo 2'" }}
          >
            {number}
          </div>
          <h3 className="text-2xl font-bold" style={{ fontFamily: "'Exo 2'", color: C.cyan }}>
            {title}
          </h3>
        </div>
        <p className="max-w-lg" style={{ fontFamily: "'IBM Plex Sans'", lineHeight: '1.75', fontSize: '18px', color: C.text2 }}>
          {description}
        </p>
      </div>

      <motion.div
        className={`flex items-center justify-center ${isLeft ? 'md:order-2' : 'md:order-1'}`}
        initial={{ opacity: 0, scale: 0.93 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ delay: 0.15, duration: 0.8 }}
      >
        <motion.div
          className="w-full max-w-[300px] rounded-xl flex items-center justify-center p-5"
          style={{ border: `1px solid ${C.border}`, background: C.surface }}
          whileHover={{ boxShadow: '0 0 40px rgba(0,200,255,0.5), 0 0 80px rgba(0,200,255,0.18)', borderColor: 'rgba(0,200,255,0.5)' }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const FEATURES: FeatureProps[] = [
  {
    number: 1,
    title: 'Automated Intake',
    description: 'Answer 8 quick questions about your product, customer, goal, and budget. Sprint Machine learns your business in minutes - product, audience, channels, unique value, and what has worked before.',
    align: 'left',
    icon: <IntakeIcon />,
  },
  {
    number: 2,
    title: 'Platform Matrix',
    description: 'Pick exactly which channels your customers use. LinkedIn, Instagram, TikTok, Twitter/X, Facebook, YouTube, Email, Bluesky - Sprint Machine writes channel-specific strategy for each one you select.',
    align: 'right',
    icon: <PlatformIcon />,
  },
  {
    number: 3,
    title: 'Weekly Copy',
    description: 'Each week gets a dedicated angle, hook, message, and CTA - fully written for your brand. Ready-to-execute copy that stays consistent across every channel in your plan.',
    align: 'left',
    icon: <CopyIcon />,
  },
  {
    number: 4,
    title: 'Edit and Regenerate',
    description: "Change a week, adjust a platform, or tweak the strategy. No need to restart the whole sprint. Edit any field and regenerate just that section in seconds - everything else stays intact.",
    align: 'right',
    icon: <EditIcon />,
  },
  {
    number: 5,
    title: 'Download and Share',
    description: 'Export your complete sprint as a professional PDF. Share with your team, save to Notion, or hand it to a client. Your 30-day plan, print-ready and formatted.',
    align: 'left',
    icon: <PdfIcon />,
  },
]

export function FeaturesSection() {
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
          <p className="text-sm tracking-widest uppercase font-bold mb-4" style={{ color: C.cyan, fontFamily: "'Exo 2'" }}>How It Works</p>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Exo 2'", color: C.text1 }}>
            Five Core Capabilities
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ fontFamily: "'IBM Plex Sans'", lineHeight: '1.7', fontSize: '18px', color: C.text2 }}>
            One unified platform. Complete marketing strategy in minutes.
          </p>
        </motion.div>

        <div className="space-y-20">
          {FEATURES.map((feature) => (
            <Feature key={feature.number} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
