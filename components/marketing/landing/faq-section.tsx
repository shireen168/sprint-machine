'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

export function FAQSection() {
  const [active, setActive] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: 'How does Sprint Machine generate strategies?',
      answer:
        'Sprint Machine uses AI to analyze your product, customer, goals, and market position. It applies proven marketing frameworks to generate custom strategies tailored to your specific business context. The 8-question intake captures everything needed for a complete 30-day plan.',
    },
    {
      question: 'Can I edit my sprint after generating it?',
      answer:
        'Yes. You can edit any week without starting over. Change the angle, copy, channels, or any detail. Your edits regenerate just that section in seconds, keeping the rest of your strategy intact.',
    },
    {
      question: 'Do I need to sign up to try it?',
      answer:
        'No. Click "Try it free" to run the full 8-question wizard and generate a complete sprint without creating an account. If you want to save, edit, or manage multiple sprints, sign up for free.',
    },
    {
      question: 'Can I download or share my sprint?',
      answer:
        'Yes. Export your sprint as a professional PDF ready to share with stakeholders. Download it, email it, import to Notion, or share the link. Your data stays yours.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Absolutely. All data is encrypted in transit and at rest. We never use your strategy data to train models or share with third parties. Your competitive strategy stays confidential.',
    },
  ]

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
          <h2 className="text-4xl font-bold text-[#F1F5F9] mb-4" style={{ fontFamily: "'Bricolage Grotesque'" }}>
            Questions answered
          </h2>
        </motion.div>

        <div className="space-y-3">
          <AnimatePresence>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="border border-[#7C3AED] border-opacity-30 rounded-lg overflow-hidden bg-[#16161d] bg-opacity-50"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <button
                  onClick={() => setActive(active === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between hover:bg-[#1a1a23] transition-colors"
                >
                  <h3
                    className="text-left font-medium transition-colors"
                    style={{
                      fontFamily: "'Bricolage Grotesque'",
                      color: active === i ? '#C9A96E' : '#F1F5F9',
                    }}
                  >
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: active === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <Plus className="w-5 h-5 text-[#7C3AED]" />
                  </motion.div>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: active === i ? 'auto' : 0,
                    opacity: active === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
                  className="overflow-hidden"
                >
                  <p
                    className="px-5 pb-5 text-[#94A3B8]"
                    style={{ fontFamily: "'DM Sans'", lineHeight: '1.7', fontSize: '14px' }}
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
