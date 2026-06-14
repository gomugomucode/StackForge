import { Link } from 'react-router-dom'
import { BookOpen, Download, ArrowRight } from 'lucide-react'
import { SEOHead } from '../components/ui/SEOHead'
import { SectionHeader, Card } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'
import { getTechData } from '../data/db'
import { printTechRoadmapPdf } from '../core/utils/printPdf'

const notesList = [
  { slug: 'javascript', title: 'JavaScript Study Notes', desc: 'Variables scope, Array operations, functional loops, Event Loop, closures, and Promises.' },
  { slug: 'python', title: 'Python Reference Notes', desc: 'Python syntax lists, comprehensions, decorators, *args/**kwargs, virtual environments, and exceptions.' },
  { slug: 'react', title: 'React Hooks & Virtual DOM', desc: 'Virtual DOM render cycles, useState/useEffect hooks, useMemo/useCallback performance, and custom hook definitions.' },
  { slug: 'nodejs', title: 'Node.js Backend Notes', desc: 'Event Loop callbacks model, File System (fs), Buffers, Streams pipelines, and Express REST APIs.' },
  { slug: 'typescript', title: 'TypeScript Typing Notes', desc: 'Static checks, interface definitions, Generics, and TS configurations compiler options.' },
  { slug: 'git', title: 'Git & Command Operations', desc: 'Repository initialization, branches creation, merge conflicts resolving, and rebasing history.' },
  { slug: 'docker', title: 'Docker Containers Blueprint', desc: 'Writing Dockerfile instructions, volumes data mapping, container ports binding, and docker-compose.' },
  { slug: 'aws', title: 'AWS Cloud Services Notes', desc: 'VPC network boundaries, IAM permissions roles, EC2 virtual instances, Lambda serverless, and S3 buckets.' }
]

export function NotesPage() {
  const handlePdfDownload = async (slug: string) => {
    const data = await getTechData(slug)
    if (data) {
      printTechRoadmapPdf(slug, data)
    }
  }

  return (
    <>
      <SEOHead
        title="Developer Study Guides & Core Concepts Notes"
        description="Comprehensive programming study guides with illustrations, summaries, and code snippets."
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Study Notes"
            title="Syllabus Chapters"
            highlight="& Core Guides"
            description="Deepen your technical understanding. Read chapters, copy code templates, and review summaries."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {notesList.map((item) => (
              <Card key={item.slug} className="flex flex-col justify-between h-full">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-accent-purple/10 flex items-center justify-center mb-4">
                    <BookOpen className="w-5 h-5 text-accent-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <Button
                    onClick={() => handlePdfDownload(item.slug)}
                    variant="ghost"
                    size="sm"
                    className="gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </Button>
                  <Link
                    to={`/learn/${item.slug}?tab=notes`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-accent-purple hover:text-accent-violet transition-colors"
                  >
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
