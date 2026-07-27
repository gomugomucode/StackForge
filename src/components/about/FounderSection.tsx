'use client';

import Link from 'next/link'
import { ArrowRight, Award, CheckCircle } from 'lucide-react'
import { founder, missionStatement } from '../../data/founder'
import { getIcon } from '../../utils/icons'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'
import { Card } from '../ui/Card'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export function FounderPreview() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Meet the Founder" title="Built by a Developer," highlight="For Developers" />

        <div
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Card variant="default" padding="none" className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 relative">
                <img
                  src={founder.avatar}
                  alt={founder.name}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-card via-transparent to-transparent" />
              </div>
              <div className="md:col-span-3 p-6 md:p-8 space-y-3">
                <p className="text-xs font-semibold text-primary">{founder.role}</p>
                <h3 className="text-2xl font-bold text-foreground">{founder.name}</h3>
                <p className="text-xs text-muted-foreground">{founder.location}</p>
                <p className="text-muted-foreground text-xs leading-normal">{founder.bio.slice(0, 200)}...</p>

                <div className="flex gap-6 py-2">
                  {founder.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-lg font-bold font-mono text-primary">{stat.value}</div>
                      <div className="text-[11px] text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Button to="/about" variant="outline" size="sm" className="gap-2">
                  <span>View Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
    <div className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="About StackForge"
          title="Our Mission"
          highlight="& Vision"
          description={missionStatement}
        />

        <div
          ref={ref}
          className={`max-w-5xl mx-auto transition-all duration-700 space-y-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Card variant="default" padding="none" className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 relative min-h-[280px]">
                <img
                  src={founder.avatar}
                  alt={founder.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card via-card/20 to-transparent" />
              </div>
              <div className="lg:col-span-3 p-6 md:p-8 space-y-4">
                <p className="text-xs font-semibold text-primary">{founder.role}</p>
                <h2 className="text-2xl font-bold text-foreground">{founder.name}</h2>
                <p className="text-xs text-muted-foreground">{founder.location}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{founder.bio}</p>

                <div className="grid grid-cols-3 gap-3">
                  {founder.stats.map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-lg bg-secondary/50 border border-border/40">
                      <div className="text-lg font-bold font-mono text-primary">{stat.value}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {founder.social.map((social) => {
                    const Icon = getIcon(social.icon)
                    return (
                      <a
                        key={social.platform}
                        href={social.href}
                        aria-label={social.platform}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-foreground hover:border-primary/40 transition-colors text-xs font-medium"
                      >
                        <Icon className="w-3.5 h-3.5 text-primary" />
                        {social.platform}
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default" padding="md" className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground">Experience & Achievements</h3>
              </div>
              <ul className="space-y-2">
                {founder.achievements.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="default" padding="md" className="space-y-4">
              <h3 className="text-base font-bold text-foreground">Get in Touch</h3>
              <p className="text-muted-foreground text-xs leading-normal">
                Have questions, suggestions, or want to collaborate? We&apos;d love to hear from you.
                Reach out through any of the channels below.
              </p>
              <div className="space-y-2">
                <Button href="mailto:hello@stackforge.dev" variant="primary" size="sm" className="w-full">
                  Send an Email
                </Button>
                <Button href="#" variant="outline" size="sm" className="w-full">
                  Message on WhatsApp
                </Button>
                <Link
                  href="/blog"
                  className="block text-center text-xs text-primary hover:underline pt-1 font-semibold"
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
