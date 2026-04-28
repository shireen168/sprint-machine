'use client'

import { motion } from 'framer-motion'

const C = {
  cyan: '#00C8FF',
  mint: '#38FFD8',
  bg: '#050A0E',
  surface: '#091420',
  surface2: '#0D1E30',
  text1: '#EEF6FF',
  text2: '#7ABFDF',
  border: 'rgba(0,200,255,0.2)',
  borderDim: 'rgba(0,200,255,0.1)',
}

// Step labels from actual wizard (steps 1-8)
const WIZARD_STEPS = [
  { n: 1, label: 'Product / Service' },
  { n: 2, label: 'Ideal Customer' },
  { n: 3, label: 'Primary Goal' },
  { n: 4, label: 'Platforms' },
  { n: 5, label: 'Budget Range' },
  { n: 6, label: 'What You\'ve Tried' },
  { n: 7, label: 'Unique Value' },
  { n: 8, label: 'Final Context' },
]

// Actual platforms from step-4 wizard
const PLATFORMS = [
  'LinkedIn', 'Instagram', 'TikTok', 'Twitter/X',
  'Facebook', 'YouTube', 'Email list', 'Bluesky',
]

export function IntakeIcon() {
  return (
    <div className="w-full">
      <div className="rounded-xl border p-4" style={{ background: C.surface2, borderColor: C.border }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold tracking-widest" style={{ color: C.cyan, fontFamily: "'Exo 2'" }}>INTAKE</span>
          <span className="text-xs" style={{ color: C.text2 }}>8 steps</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {WIZARD_STEPS.map(({ n, label }, i) => (
            <motion.div
              key={n}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5"
              style={{ background: C.surface, border: `1px solid ${C.borderDim}` }}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{ background: 'rgba(0,200,255,0.15)', border: `1px solid rgba(0,200,255,0.4)`, color: C.cyan }}
              >
                {n}
              </span>
              <span className="text-[11px] leading-tight" style={{ color: C.text2 }}>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PlatformIcon() {
  return (
    <div className="w-full">
      <div className="rounded-xl border p-4" style={{ background: C.surface2, borderColor: C.border }}>
        <p className="text-xs font-bold tracking-widest mb-3" style={{ color: C.cyan, fontFamily: "'Exo 2'" }}>SELECT PLATFORMS</p>
        <div className="grid grid-cols-2 gap-1.5">
          {PLATFORMS.map((name, i) => (
            <motion.div
              key={name}
              className="flex items-center gap-2 rounded-lg px-2.5 py-2"
              style={{
                background: i < 3 ? 'rgba(0,200,255,0.12)' : C.surface,
                border: `1px solid ${i < 3 ? 'rgba(0,200,255,0.4)' : C.borderDim}`,
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: i < 3 ? C.cyan : 'rgba(0,200,255,0.2)' }}
              />
              <span className="text-[12px]" style={{ color: i < 3 ? C.text1 : C.text2 }}>{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CopyIcon() {
  const fields = [
    { label: 'ANGLE', value: 'Value-led authority positioning' },
    { label: 'HOOK', value: '"The framework that changed everything"' },
    { label: 'MESSAGE', value: 'Lead with proof, end with action' },
    { label: 'CTA', value: 'Download the full breakdown' },
  ]
  return (
    <div className="w-full space-y-2">
      {fields.map(({ label, value }, i) => (
        <motion.div
          key={label}
          className="rounded-lg p-3"
          style={{ background: C.surface2, border: `1px solid ${C.borderDim}` }}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
        >
          <p className="text-[11px] font-bold tracking-widest mb-1" style={{ color: C.cyan, fontFamily: "'Exo 2'" }}>{label}</p>
          <p className="text-sm" style={{ color: C.text2 }}>{value}</p>
        </motion.div>
      ))}
    </div>
  )
}

export function EditIcon() {
  return (
    <div className="w-full">
      <div className="rounded-xl border p-4" style={{ background: C.surface2, border: `1px solid ${C.border}` }}>
        <p className="text-sm font-semibold mb-3" style={{ color: C.text2, fontFamily: "'Exo 2'" }}>Week 2 - Positioning</p>
        <div className="space-y-2 mb-3">
          <div className="rounded-lg p-2.5" style={{ background: C.surface }}>
            <p className="text-[11px] font-bold tracking-widest mb-0.5" style={{ color: 'rgba(0,200,255,0.4)', fontFamily: "'Exo 2'" }}>ANGLE</p>
            <p className="text-sm" style={{ color: C.text2 }}>The challenger frame</p>
          </div>
          <motion.div
            className="rounded-lg p-2.5"
            style={{ background: 'rgba(0,200,255,0.08)', border: '1px solid rgba(0,200,255,0.5)' }}
            animate={{ boxShadow: ['0 0 0px rgba(0,200,255,0)', '0 0 18px rgba(0,200,255,0.4)', '0 0 0px rgba(0,200,255,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-[11px] font-bold tracking-widest mb-0.5" style={{ color: C.cyan, fontFamily: "'Exo 2'" }}>HOOK (editing)</p>
            <p className="text-sm" style={{ color: C.text1 }}>
              Why most brands fail to...
              <motion.span
                className="inline-block w-0.5 h-4 ml-0.5 align-middle"
                style={{ background: C.cyan }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </p>
          </motion.div>
        </div>
        <div className="flex justify-end">
          <div
            className="text-xs px-3 py-1.5 rounded-lg font-bold"
            style={{ background: C.cyan, color: '#050A0E', fontFamily: "'Exo 2'" }}
          >
            Regenerate
          </div>
        </div>
      </div>
    </div>
  )
}

export function PdfIcon() {
  return (
    <div className="w-full max-w-[160px] mx-auto">
      <motion.div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: C.border, background: C.surface2 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        <div className="px-4 py-3 border-b" style={{ background: C.surface, borderColor: C.borderDim }}>
          <div className="h-2 w-20 rounded-sm" style={{ background: `rgba(0,200,255,0.6)` }} />
          <div className="h-1.5 w-14 rounded-sm mt-1.5" style={{ background: 'rgba(122,191,223,0.3)' }} />
        </div>
        <div className="p-4 space-y-2">
          {[80, 65, 75, 55, 70].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-sm"
              style={{ width: `${w}%`, background: i % 2 === 0 ? 'rgba(122,191,223,0.3)' : 'rgba(122,191,223,0.15)' }}
            />
          ))}
          <div className="mt-3 h-1.5 w-2/3 rounded-sm" style={{ background: 'rgba(0,200,255,0.5)' }} />
        </div>
      </motion.div>
      <p className="text-center text-xs mt-2" style={{ color: C.text2 }}>PDF Export</p>
    </div>
  )
}
