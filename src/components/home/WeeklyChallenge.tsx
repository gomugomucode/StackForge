import { CheckCircle, ArrowRight, Trophy } from 'lucide-react'
import { Button } from '../ui/Button'
import { useScrollAnimation } from '../../core/hooks/useScrollAnimation'

const features = [
  'New questions every week',
  'Full explanations included',
  'Track your improvement',
  'Unlimited attempts',
  'Works on any device',
  'No login required',
]

const challengeStats = [
  { value: '500+', label: 'Total Questions' },
  { value: '10+', label: 'Topics Covered' },
  { value: 'Free', label: 'Always & Forever' },
  { value: '5K+', label: 'Active Learners' },
]

export function WeeklyChallenge() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      id="weekly-challenge"
      ref={ref}
      className="py-20 md:py-28 scroll-mt-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-purple/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-cyan/6 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`gradient-border rounded-3xl p-8 md:p-12 lg:p-16 glass-card glow-purple transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-amber/10 text-accent-amber border border-accent-amber/20 text-sm font-medium mb-6">
                <Trophy className="w-4 h-4" />
                Weekly Challenge
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
                Sharpen Your Skills with{' '}
                <span className="gradient-text">Weekly Quizzes</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                A fresh set of handpicked questions every week across Python, JavaScript, Java, DSA and more.
                Challenge yourself, track progress, and become a better developer — one quiz at a time.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {challengeStats.map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-surface-800/80 border border-black/[0.06] dark:border-white/[0.06]">
                    <div className="text-2xl font-bold font-mono gradient-text mb-1">{stat.value}</div>
                    <div className="text-xs text-text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button to="/#weekly-challenge" size="lg">
                  Start This Week&apos;s Quiz
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button to="/resources" variant="secondary" size="lg">
                  Browse All Quizzes
                </Button>
              </div>
            </div>

            <div>
              <ul className="space-y-3 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-text-secondary">
                    <CheckCircle className="w-5 h-5 text-accent-emerald shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="p-5 rounded-xl bg-surface-800/50 border border-black/[0.06] dark:border-white/[0.06]">
                <p className="text-sm text-text-secondary leading-relaxed">
                  <span className="text-text-primary font-semibold">10+ quiz categories</span> available — Python,
                  JavaScript, Java, C++, DSA, HTML, CSS, Database, AI &amp; ML, Web Development, and more.
                </p>
                <p className="text-sm text-text-muted mt-3">
                  Completely free, no signup needed. Create an account to save progress &amp; streaks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
