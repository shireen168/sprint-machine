'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

function Counter({ end, label }: { end: number; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const startTime = Date.now()

          const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = easeOutQuart(progress)
            setCount(Math.floor(eased * end))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          animate()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end])

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="text-4xl font-bold text-[#C9A96E] mb-2"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        {count}
        {end > 100 ? '' : end === 30 ? '' : '+'}
      </motion.div>
      <p className="text-[#94A3B8]" style={{ fontFamily: "'DM Sans'", fontSize: '14px' }}>
        {label}
      </p>
    </div>
  )
}

export function SocialProofSection() {
  const testimonials = [
    {
      initials: 'LS',
      quote: 'Sprint Machine saved me 20 hours per campaign. The copy is market-ready.',
      name: 'Laura S.',
    },
    {
      initials: 'MK',
      quote: 'Finally, a tool that understands strategy AND execution. Best investment this quarter.',
      name: 'Marcus K.',
    },
    {
      initials: 'JD',
      quote: 'Shared our sprint with the entire team. Everyone aligned in minutes, not days.',
      name: 'Jasmine D.',
    },
    {
      initials: 'RV',
      quote: 'The consistency across channels is incredible. Our audience noticed the difference.',
      name: 'Raj V.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-[#F1F5F9] mb-4" style={{ fontFamily: "'Bricolage Grotesque'" }}>
            Trusted by marketing leaders
          </h2>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-12 border-y border-[#7C3AED] border-opacity-20">
          <Counter end={500} label="Sprints Generated" />
          <Counter end={200} label="Hours Saved" />
          <Counter end={5} label="Channels Supported" />
          <Counter end={30} label="Days in Minutes" />
        </div>

        {/* Testimonials */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-lg border border-[#C9A96E] border-opacity-30 bg-[#16161d] bg-opacity-50"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] },
                },
              }}
              whileHover={{ y: -6, boxShadow: '0 0 40px rgba(201,169,110,0.2)' }}
            >
              <div className="flex gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-[#0a0a0f] shrink-0"
                  style={{ background: '#C9A96E' }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-[#F1F5F9] text-sm font-medium">{testimonial.name}</p>
                  <p className="text-[#94A3B8] text-xs">Marketing leader</p>
                </div>
              </div>
              <p className="text-[#F1F5F9]" style={{ fontFamily: "'DM Sans'", lineHeight: '1.7', fontSize: '14px' }}>
                {testimonial.quote}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Credentials */}
        <motion.div
          className="flex gap-6 justify-center items-center flex-wrap mt-20 pt-12 border-t border-[#7C3AED] border-opacity-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-[#94A3B8] text-sm">Built by Shireen:</span>
          <Link
            href="https://www.linkedin.com/in/shireenlow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C9A96E] hover:text-[#E8D5B0] transition-colors text-sm"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/shireen168"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C9A96E] hover:text-[#E8D5B0] transition-colors text-sm"
          >
            GitHub
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
