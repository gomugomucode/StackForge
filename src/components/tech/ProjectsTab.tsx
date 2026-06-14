import { Card } from '../ui/SectionHeader'
import type { FullTechData } from '../../data/db'

interface ProjectsTabProps {
  data: FullTechData
}

export function ProjectsTab({ data }: ProjectsTabProps) {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-text-primary">Hands-on Learning Projects</h2>
        <p className="text-text-secondary text-sm mt-1">
          Nothing beats writing lines of code. Build these tasks incrementally to solidifying your expertise.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {data.projects.map((proj, idx) => {
          const diffColors =
            proj.difficulty === 'Beginner'
              ? 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20'
              : proj.difficulty === 'Intermediate'
              ? 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20'
              : 'text-accent-rose bg-accent-rose/10 border-accent-rose/20'

          return (
            <Card key={idx} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-purple" />
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${diffColors} mb-2`}>
                    {proj.difficulty}
                  </span>
                  <h3 className="text-xl font-bold text-text-primary">{proj.title}</h3>
                </div>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {proj.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="font-bold text-xs uppercase text-text-muted tracking-wider mb-2">Key Skills Acquired</h4>
                  <div className="flex flex-wrap gap-2">
                    {proj.skillsLearned.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs bg-surface-850 text-text-secondary px-2.5 py-1 rounded-lg border border-black/[0.05] dark:border-white/[0.05]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase text-text-muted tracking-wider mb-2">Stack / Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {proj.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs bg-accent-purple/10 text-accent-purple px-2.5 py-1 rounded-lg border border-accent-purple/20 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Source Code Folder Structure Tree */}
              <div className="mb-6">
                <h4 className="font-bold text-xs uppercase text-text-muted tracking-wider mb-2">Project Folder Blueprint</h4>
                <pre className="bg-surface-950 p-4 rounded-xl font-mono text-xs text-[#94a3b8] overflow-x-auto border border-black/[0.05] dark:border-white/[0.05]">
                  {proj.sourceCodeStructure}
                </pre>
              </div>

              {/* Step-by-Step Roadmap */}
              <div>
                <h4 className="font-bold text-xs uppercase text-text-muted tracking-wider mb-3">Development Roadmap Steps</h4>
                <ol className="space-y-3">
                  {proj.developmentRoadmap.map((step, sIdx) => (
                    <li key={sIdx} className="flex gap-3 text-sm text-text-secondary">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-surface-800 text-accent-purple flex items-center justify-center font-mono font-bold text-xs">
                        {sIdx + 1}
                      </span>
                      <span className="pt-0.5 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
