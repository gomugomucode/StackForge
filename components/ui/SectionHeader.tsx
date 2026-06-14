import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from './Motion'

interface SectionHeaderProps {
  badge?: string
  title: string
  highlight?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  badge,
  title,
  highlight,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <FadeIn className={`max-w-3xl mb-12 md:mb-16 ${alignClass} ${className}`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider glass text-accent-purple"
        >
          {badge}
        </motion.span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-text-primary mb-4 leading-tight">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="gradient-text">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="text-text-secondary text-base md:text-lg leading-relaxed">{description}</p>
      )}
    </FadeIn>
  )
}

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: 'purple' | 'cyan' | 'none'
}

export function Card({ children, className = '', hover = true, glow = 'none' }: CardProps) {
  const glowClass = glow === 'purple' ? 'glow-purple' : glow === 'cyan' ? 'glow-cyan' : ''

  return (
    <div
      className={`gradient-border rounded-2xl p-6 md:p-8 glass-card ${
        hover ? 'card-hover hover:border-black/10 dark:hover:border-white/10' : ''
      } ${glowClass} ${className}`}
    >
      {children}
    </div>
  )
}
