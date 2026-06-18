import type { ReactNode } from 'react'

interface SectionHeaderProps {
  badge?: string
  title: string
  highlight?: string
  description?: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  badge,
  title,
  highlight,
  description,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const finalDescription = description || subtitle

  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${alignClass} ${className}`}>
      {badge && (
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="gradient-text">{highlight}</span>
          </>
        )}
      </h2>
      {finalDescription && (
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{finalDescription}</p>
      )}
    </div>
  )
}

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: 'purple' | 'cyan' | 'none'
}

export function Card({ children, className = '', hover = true, glow = 'none' }: CardProps) {
  const glowClass =
    glow === 'purple' ? 'glow-purple' : glow === 'cyan' ? 'glow-cyan' : ''

  return (
    <div
      className={`gradient-border rounded-2xl p-6 md:p-8 bg-card border-border backdrop-blur-sm ${
        hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5' : ''
      } ${glowClass} ${className}`}
    >
      {children}
    </div>
  )
}
