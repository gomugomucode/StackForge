"use client"

import { ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/ui/SectionHeader"
import Link from "next/link"
import { motion } from "framer-motion"

const roadmaps = [
  { id: 'frontend', title: 'Frontend Engineer', description: 'Master HTML, CSS, JS and React to build stunning UIs.', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'backend', title: 'Backend Architect', description: 'Dive deep into Node.js, Python, Databases and System Design.', color: 'text-green-500', bg: 'bg-green-500/10' },
  { id: 'fullstack', title: 'Fullstack Developer', description: 'The complete package. Blend both worlds into one.', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 'devops', title: 'DevOps Specialist', description: 'AWS, Docker, Kubernetes and CI/CD pipelines.', color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { id: 'ai', title: 'AI/ML Engineer', description: 'PyTorch, TensorFlow and the future of LLMs.', color: 'text-red-500', bg: 'bg-red-500/10' },
  { id: 'cybersecurity', title: 'Cybersecurity Pro', description: 'Penetration testing, network security and encryption.', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
]

export function RoadmapSection() {
  return (
    <section id="roadmaps" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Curated Learning Paths" 
          subtitle="Structured roadmaps designed to take you from beginner to pro."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap, idx) => (
            <motion.div 
              key={roadmap.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/roadmaps/${roadmap.id}`} className="group relative block p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-lg ${roadmap.bg} ${roadmap.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <ChevronRight className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{roadmap.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{roadmap.description}</p>
                <div className="flex items-center text-sm font-medium text-primary gap-1 group-hover:gap-2 transition-all">
                  Explore Roadmap <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/roadmaps">View All Roadmaps</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
