import Link from 'next/link'
import type { ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success'
type ButtonSize = 'sm' | 'md' | 'lg'

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
  asChild?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm active:scale-[0.98]',
  secondary:
    'bg-[#F5F2EC] text-[#2C241C] border border-[#E8E1D8] hover:bg-[#EAE4D9] active:scale-[0.98]',
  ghost: 'text-[#6C6257] hover:bg-[#F5F2EC] hover:text-[#2C241C]',
  outline:
    'border border-[#E8E1D8] text-[#2C241C] hover:bg-[#F5F2EC] active:scale-[0.98]',
  danger:
    'bg-red-600 text-white hover:bg-red-700 shadow-sm active:scale-[0.98]',
  success:
    'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm active:scale-[0.98]',
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
  asChild = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`

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
