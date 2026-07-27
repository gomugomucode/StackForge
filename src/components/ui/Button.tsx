import Link from 'next/link'
import type { ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps {
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
  isLoading?: boolean
  asChild?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs active:scale-[0.98]',
  secondary:
    'bg-secondary text-secondary-foreground border border-border hover:bg-muted active:scale-[0.98]',
  ghost:
    'text-muted-foreground hover:text-foreground hover:bg-secondary active:scale-[0.98]',
  outline:
    'border border-border text-foreground hover:bg-secondary active:scale-[0.98]',
  danger:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs active:scale-[0.98]',
  success:
    'bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-700 shadow-xs active:scale-[0.98]',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 font-medium',
  md: 'h-9 px-4 text-sm gap-2 font-medium',
  lg: 'h-11 px-6 text-base gap-2.5 font-semibold',
  icon: 'h-9 w-9 p-0 flex items-center justify-center',
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
  isLoading,
  asChild = false,
}: ButtonProps) {
  const isDisabled = disabled || isLoading
  const classes = `inline-flex items-center justify-center rounded-lg transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${variants[variant]} ${sizes[size]} ${className} ${isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`

  if (asChild) {
    return (
      <Slot className={classes} aria-label={ariaLabel}>
        {children}
      </Slot>
    )
  }

  if (to) {
    return (
      <Link href={to} className={classes} aria-label={ariaLabel}>
        {isLoading ? <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-1" /> : null}
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {isLoading ? <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-1" /> : null}
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel} disabled={isDisabled}>
      {isLoading ? <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-1" /> : null}
      {children}
    </button>
  )
}
