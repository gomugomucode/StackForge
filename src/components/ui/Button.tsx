import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  to?: string
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  ariaLabel?: string
  disabled?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-accent-purple to-accent-violet text-white hover:opacity-90 shadow-lg shadow-accent-purple/25',
  secondary:
    'bg-surface-750 text-text-primary border border-surface-600 hover:border-accent-purple/50 hover:bg-surface-700',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-750',
  outline:
    'border border-accent-purple/40 text-accent-purple hover:bg-accent-purple/10 hover:border-accent-purple',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  className = '',
  onClick,
  type = 'button',
  ariaLabel,
  disabled,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`

  if (to) {
    return (
      <Link href={to} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel} disabled={disabled}>
      {children}
    </button>
  )
}
