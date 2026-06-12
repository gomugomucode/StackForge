import { motion } from 'framer-motion'
import { stats } from '../../data/stats'
import { useCounter } from '../../hooks/useCounter'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Stagger, StaggerItem } from '../ui/Motion'

function StatItem({
  value,
  suffix,
  label,
  start,
}: {
  value: number
  suffix: string
  label: string
  start: boolean
}) {
  const count = useCounter(value, 2200, start)

  return (
    <StaggerItem>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="text-center p-6 rounded-2xl glass-card"
      >
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono gradient-text mb-2">
          {count.toLocaleString()}
          {suffix}
        </div>
        <div className="text-text-secondary text-sm">{label}</div>
      </motion.div>
    </StaggerItem>
  )
}

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-12 md:py-16 border-y border-black/[0.06] dark:border-white/[0.06]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} start={isVisible} />
          ))}
        </Stagger>
      </div>
    </section>
  )
}
