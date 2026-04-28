'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
]

export function AppNav() {
  const pathname = usePathname()
  return (
    <nav className="sticky top-0 z-50 border-b border-border-gold bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/dashboard" className="font-display text-lg font-bold text-gold">
          Sprint Machine
        </Link>
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm transition-colors',
                pathname.startsWith(item.href) ? 'text-gold' : 'text-text-2 hover:text-text-1'
              )}
            >
              {item.label}
            </Link>
          ))}
          <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
        </div>
      </div>
    </nav>
  )
}
