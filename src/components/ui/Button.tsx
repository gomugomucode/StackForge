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
    'bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/25 active:scale-95',
  secondary:
    'bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 transition-colors',
  ghost: 'text-foreground hover:bg-secondary/50 hover:text-foreground transition-colors',
  outline:
    'border border-border text-foreground hover:bg-secondary/50 transition-colors',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2 text-sm',
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
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`

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
