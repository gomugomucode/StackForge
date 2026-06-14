import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/Motion'

interface CTASectionProps {
  variant?: 'primary' | 'support'
}

export function CTASection({ variant = 'primary' }: CTASectionProps) {
  if (variant === 'support') {
    return (
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="glass-card gradient-border rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto glow-cyan">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                Have Any Questions?
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                Get instant support, share suggestions, or report issues. We are here to help you succeed.
              </p>
              <Button href="#" variant="primary" size="lg">
                <MessageCircle className="w-5 h-5" />
                Contact Support
              </Button>
              <p className="text-xs text-text-muted mt-4">Typically reply within minutes</p>
            </div>
          </FadeIn>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-purple/15 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 via-surface-800 to-accent-cyan/10" />
            <div className="absolute inset-0 hero-grid opacity-30" />
            <div className="relative glass-card border-0 rounded-3xl p-10 md:p-16 text-center">
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/5 dark:bg-white/5 text-accent-purple border border-black/10 dark:border-white/10">
                Start Today
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 max-w-2xl mx-auto leading-tight">
                Ready to Level Up Your{' '}
                <span className="gradient-text">Developer Skills?</span>
              </h2>
              <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
                Join thousands of learners mastering code with free courses, quizzes, and resources — no signup required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button to="/#weekly-challenge" size="lg">
                  Start Learning Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button to="/resources" variant="secondary" size="lg">
                  Browse Resources
                </Button>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  )
}
