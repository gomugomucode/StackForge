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
    <div className={`max-w-2xl mb-8 md:mb-12 ${alignClass} ${className}`}>
      {badge && (
        <span className="inline-flex items-center mb-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
          {badge}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-primary">{highlight}</span>
          </>
        )}
      </h2>
      {finalDescription && (
        <p className="text-muted-foreground text-sm leading-normal">{finalDescription}</p>
      )}
    </div>
  )
}
