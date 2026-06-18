'use client';

import Link from 'next/link'
import { ArrowRight, Award, CheckCircle } from 'lucide-react'
import { founder, missionStatement } from '../../data/founder'
import { getIcon } from '../../utils/icons'
import { Button } from '../ui/Button'
import { SectionHeader, Card } from '../ui/SectionHeader'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export function FounderPreview() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-surface-850/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Meet the Founder" title="Built by a Developer," highlight="For Developers" />

        <div
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Card glow="purple" className="!p-0 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 relative">
                <img
                  src={founder.avatar}
                  alt={founder.name}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface-800 via-transparent to-transparent" />
              </div>
              <div className="md:col-span-3 p-6 md:p-8">
                <p className="text-sm text-accent-purple font-semibold mb-1">{founder.role}</p>
                <h3 className="text-2xl font-bold text-text-primary mb-1">{founder.name}</h3>
                <p className="text-sm text-text-muted mb-4">{founder.location}</p>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">{founder.bio.slice(0, 200)}...</p>

                <div className="flex gap-6 mb-6">
                  {founder.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-xl font-bold font-mono gradient-text">{stat.value}</div>
                      <div className="text-xs text-text-muted">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Button to="/about" variant="outline" size="sm">
                  View Full Profile
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export function AboutContent() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="About CodeNova"
          title="Our Mission"
          highlight="& Vision"
          description={missionStatement}
        />

        <div
          ref={ref}
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Card glow="purple" className="!p-0 overflow-hidden mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 relative min-h-[280px]">
                <img
                  src={founder.avatar}
                  alt={founder.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface-800 via-surface-800/20 to-transparent" />
              </div>
              <div className="lg:col-span-3 p-8 md:p-10">
                <p className="text-sm font-semibold text-accent-purple mb-2">{founder.role}</p>
                <h2 className="text-3xl font-bold text-text-primary mb-2">{founder.name}</h2>
                <p className="text-text-muted text-sm mb-6">{founder.location}</p>
                <p className="text-text-secondary leading-relaxed mb-8">{founder.bio}</p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {founder.stats.map((stat) => (
                    <div key={stat.label} className="text-center p-4 rounded-xl bg-surface-750 border border-surface-600/50">
                      <div className="text-2xl font-bold font-mono gradient-text">{stat.value}</div>
                      <div className="text-xs text-text-muted mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {founder.social.map((social) => {
                    const Icon = getIcon(social.icon)
                    return (
                      <a
                        key={social.platform}
                        href={social.href}
                        aria-label={social.platform}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-750 border border-surface-600 text-text-secondary hover:text-accent-purple hover:border-accent-purple/40 transition-all text-sm font-medium"
                      >
                        <Icon className="w-4 h-4" />
                        {social.platform}
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-accent-purple" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Experience & Achievements</h3>
              </div>
              <ul className="space-y-3">
                {founder.achievements.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-text-secondary text-sm">
                    <CheckCircle className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card glow="cyan">
              <h3 className="text-xl font-bold text-text-primary mb-4">Get in Touch</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Have questions, suggestions, or want to collaborate? We&apos;d love to hear from you.
                Reach out through any of the channels below.
              </p>
              <div className="space-y-3">
                <Button href="mailto:hello@codenova.dev" variant="primary" className="w-full">
                  Send an Email
                </Button>
                <Button href="#" variant="secondary" className="w-full">
                  Message on WhatsApp
                </Button>
                <Link
                  href="/blog"
                  className="block text-center text-sm text-accent-purple hover:text-accent-violet transition-colors pt-2"
                >
                  Read our latest articles →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
