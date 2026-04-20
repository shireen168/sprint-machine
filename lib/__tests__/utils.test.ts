import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })
  it('deduplicates tailwind classes', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8')
  })
  it('handles conditional classes', () => {
    expect(cn('base', false && 'excluded', 'included')).toBe('base included')
  })
})
