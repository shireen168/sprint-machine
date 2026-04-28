'use client'

import Link from 'next/link'

interface CtaButtonProps {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export function CtaButton({ href, label, variant = 'primary', className = '' }: CtaButtonProps) {
  const base = 'px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 text-base'

  if (variant === 'primary') {
    return (
      <Link
        href={href}
        className={`${base} ${className}`}
        style={{ background: '#00C8FF', color: '#050A0E', fontFamily: "'Exo 2'", boxShadow: '0 0 28px rgba(0,200,255,0.18)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 55px rgba(0,200,255,0.6), 0 0 100px rgba(0,200,255,0.2)'
          e.currentTarget.style.transform = 'scale(1.04)'
          e.currentTarget.style.background = '#38FFD8'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 28px rgba(0,200,255,0.18)'
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.background = '#00C8FF'
        }}
      >
        {label}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={`${base} ${className}`}
      style={{
        border: '1.5px solid rgba(0,200,255,0.4)',
        color: '#7ABFDF',
        fontFamily: "'Exo 2'",
        background: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,200,255,0.8)'
        e.currentTarget.style.color = '#EEF6FF'
        e.currentTarget.style.background = 'rgba(0,200,255,0.08)'
        e.currentTarget.style.boxShadow = '0 0 30px rgba(0,200,255,0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,200,255,0.4)'
        e.currentTarget.style.color = '#7ABFDF'
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {label}
    </Link>
  )
}
