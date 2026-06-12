import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Terminal, Award, BookOpen, Layers } from 'lucide-react'
import { SEOHead } from '../components/ui/SEOHead'
import { SectionHeader, Card } from '../components/ui/SectionHeader'
import { getTechData, getAllTechnologies } from '../data/db'
import type { ProjectDetails } from '../data/types'

interface AggregatedProject extends ProjectDetails {
  techKey: string
  techName: string
}

export function ProjectsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All')

  // Aggregate all projects dynamically
  const allProjects = useMemo(() => {
    const list: AggregatedProject[] = []
    const slugs = getAllTechnologies()
    slugs.forEach((slug) => {
      const data = getTechData(slug)
      if (data) {
        data.projects.forEach((proj) => {
          list.push({
            ...proj,
            techKey: slug,
            techName: data.roadmap.overview.title
          })
        })
      }
    })
    return list
  }, [])

  // Filter projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter((proj) => {
      return selectedDifficulty === 'All' || proj.difficulty === selectedDifficulty
    })
  }, [allProjects, selectedDifficulty])

  return (
    <>
      <SEOHead
        title="Developer Portfolio Projects & Code Walkthroughs"
        description="Build real-world software applications from scratch. Projects sorted by Beginner, Intermediate, and Advanced tiers."
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Portfolio Projects"
            title="Syllabus Exercises"
            highlight="& Projects"
            description="Bridge the gap between lectures and code. Pick an application to build with complete code structures and checklists."
          />

          {/* Difficulty Toggles */}
          <div className="flex justify-center gap-3 mb-12">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedDifficulty(tier)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedDifficulty === tier
                    ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/20'
                    : 'glass text-text-secondary hover:text-text-primary'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Projects Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredProjects.map((proj, idx) => {
              const diffColors =
                proj.difficulty === 'Beginner'
                  ? 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20'
                  : proj.difficulty === 'Intermediate'
                  ? 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20'
                  : 'text-accent-rose bg-accent-rose/10 border-accent-rose/20'

              return (
                <Card key={idx} className="relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-purple" />
                  
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${diffColors}`}>
                        {proj.difficulty}
                      </span>
                      <Link
                        to={`/learn/${proj.techKey}?tab=projects`}
                        className="text-xs text-accent-purple hover:underline font-semibold"
                      >
                        Part of {proj.techName} Path
                      </Link>
                    </div>

                    <h3 className="text-xl font-bold text-text-primary mb-2">{proj.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {proj.description}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5">Stack Requirements</div>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-xs bg-accent-purple/5 text-accent-purple px-2 py-0.5 rounded font-mono font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5">Syllabus Skills Covered</div>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.skillsLearned.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] bg-surface-850 text-text-secondary px-2 py-0.5 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/learn/${proj.techKey}?tab=projects`}
                    className="mt-4 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl border border-accent-purple/20 bg-accent-purple/5 hover:bg-accent-purple hover:text-white transition-all text-sm font-semibold text-accent-purple text-center"
                  >
                    View Code Structure & Roadmap
                  </Link>
                </Card>
              )
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-text-secondary">
              No projects matching criteria found.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
