import Link from 'next/link'

interface CtaButtonProps {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export function CtaButton({ href, label, variant = 'primary', className = '' }: CtaButtonProps) {
  const baseClasses = 'px-8 py-3 rounded-lg font-medium transition-[box-shadow,transform] duration-300'

  if (variant === 'primary') {
    return (
      <Link
        href={href}
        className={`${baseClasses} text-[#0a0a0f] relative overflow-hidden group ${className}`}
        style={{ background: '#C9A96E' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 40px rgba(201,169,110,0.6)'
          e.currentTarget.style.transform = 'scale(1.04)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 28px rgba(201,169,110,0.18)'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        {label}
      </Link>
    )
  }

  if (variant === 'secondary') {
    return (
      <Link
        href={href}
        className={`${baseClasses} px-8 py-3 rounded-lg font-medium border-2 border-[#7C3AED] text-[#F1F5F9] hover:bg-[#7C3AED]/10 ${className}`}
      >
        {label}
      </Link>
    )
  }

  return null
}
