'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const C = {
  cyan: '#00C8FF',
  surface: '#091420',
  surface2: '#0D1E30',
  text1: '#EEF6FF',
  text2: '#7ABFDF',
  border: 'rgba(0,200,255,0.15)',
}

const FAQS = [
  {
    question: 'How does Sprint Machine generate strategies?',
    answer: 'Sprint Machine uses AI to analyze your product, customer, goals, and market position. It applies proven marketing frameworks to generate custom strategies tailored to your specific business context. The 8-question intake captures everything needed for a complete 30-day plan.',
  },
  {
    question: 'Can I edit my sprint after generating it?',
    answer: 'Yes. You can edit any week without starting over. Change the angle, copy, channels, or any detail. Your edits regenerate just that section in seconds, keeping the rest of your strategy intact.',
  },
  {
    question: 'Do I need to sign up to try it?',
    answer: 'No. Click "Try it free" to run the full 8-question wizard and generate a complete sprint without creating an account. If you want to save, edit, or manage multiple sprints, sign up for free.',
  },
  {
    question: 'Can I download or share my sprint?',
    answer: 'Yes. Export your sprint as a professional PDF ready to share with stakeholders. Download it, email it, import to Notion, or share the link. Your data stays yours.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. All data is encrypted in transit and at rest. We never use your strategy data to train models or share with third parties. Your competitive strategy stays confidential.',
  },
]

export function FAQSection() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-widest uppercase font-bold mb-4" style={{ color: C.cyan, fontFamily: "'Exo 2'" }}>FAQ</p>
          <h2 className="text-4xl font-bold" style={{ fontFamily: "'Exo 2'", color: C.text1 }}>
            Questions answered
          </h2>
        </motion.div>

        <div className="space-y-3">
          <AnimatePresence>
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{ border: `1px solid ${active === i ? 'rgba(0,200,255,0.4)' : C.border}`, background: C.surface }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <button
                  onClick={() => setActive(active === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between"
                  style={{ background: active === i ? 'rgba(0,200,255,0.05)' : 'transparent' }}
                >
                  <h3
                    className="text-left font-semibold text-lg"
                    style={{
                      fontFamily: "'Exo 2'",
                      fontSize: '18px',
                      color: active === i ? C.cyan : C.text1,
                    }}
                  >
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: active === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <Plus className="w-5 h-5" style={{ color: C.cyan }} />
                  </motion.div>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p
                    className="px-5 pb-5"
                    style={{ fontFamily: "'IBM Plex Sans'", lineHeight: '1.75', fontSize: '17px', color: C.text2 }}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
