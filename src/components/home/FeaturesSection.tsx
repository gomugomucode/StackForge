"use client"

import { FeatureBento } from './features/bento-grid'

const features = [
  {
    title: 'Production Roadmaps',
    description: 'Carefully curated paths that focus on what actually matters in a real job. No fluff, just the core skills.',
    icon: 'roadmap',
    size: 'large',
    href: '/roadmaps',
    color: 'bg-blue-500/10'
  },
  {
    title: 'Cheat Sheets',
    description: 'Quick-reference guides for the modern tech stack. Perfect for interview prep or daily coding.',
    icon: 'cheatsheet',
    size: 'small',
    href: '/cheatsheets',
    color: 'bg-purple-500/10'
  },
  {
    title: 'Real-world Projects',
    description: 'Stop following tutorials. Build systems that solve real problems and look great on your portfolio.',
    icon: 'project',
    size: 'small',
    href: '/projects',
    color: 'bg-green-500/10'
  },
  {
    title: 'Interview Hub',
    description: '1000+ curated questions across JS, React, Node, and System Design to help you ace the technical round.',
    icon: 'interview',
    size: 'large',
    href: '/interview',
    color: 'bg-orange-500/10'
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to <span className="text-primary">level up</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide the tools, the maps, and the projects. All you need to bring is the curiosity and the grind.
          </p>
        </div>
        <FeatureBento items={features} />
      </div>
    </section>
  )
}
