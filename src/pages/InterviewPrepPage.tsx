import { Link } from 'react-router-dom'
import { HelpCircle, Download, ArrowRight } from 'lucide-react'
import { SEOHead } from '../components/ui/SEOHead'
import { SectionHeader, Card } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'
import { getTechData } from '../data/db'
import { printTechRoadmapPdf } from '../utils/printPdf'

const preps = [
  { slug: 'javascript', title: 'JavaScript Interview Prep', desc: 'Prepare for closures, Event Loop mechanisms, lexical scoping, and Promises callbacks questions.' },
  { slug: 'python', title: 'Python Interview Prep', desc: 'Review lists/tuples mutations, reference garbage collector, and writing decorator wrappers.' },
  { slug: 'react', title: 'React Interview Prep', desc: 'Prepare for jsx transformations, memoization hook optimization, and server components.' },
  { slug: 'nodejs', title: 'Node.js Interview Prep', desc: 'Review streams backpressure, CommonJS modules, and non-blocking background workers.' },
  { slug: 'typescript', title: 'TypeScript Interview Prep', desc: 'Answer questions about static vs dynamic, type vs interface, and the unknown type.' },
  { slug: 'git', title: 'Git & Collaboration Prep', desc: 'Explain staging markers, hard resets rollback, and reflogs disaster recovery.' },
  { slug: 'docker', title: 'Docker Containers Prep', desc: 'Prepare for images vs containers, multi-stage size optimizations, and Compose nets.' },
  { slug: 'aws', title: 'AWS Cloud Infrastructure Prep', desc: 'Study public VPC subnet gateways, IAM credentials delegation, and Lambda functions execution.' }
]

export function InterviewPrepPage() {
  const handlePdfDownload = (slug: string) => {
    const data = getTechData(slug)
    if (data) {
      printTechRoadmapPdf(slug, data)
    }
  }

  return (
    <>
      <SEOHead
        title="Technical Interview Preparation Guides - StackForge"
        description="Master coding interviews with categorised Q&As covering Beginner, Intermediate, and Advanced questions."
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Interview Prep"
            title="Technical Q&As"
            highlight="& Interview Guides"
            description="Test your conceptual understanding. Check beginner, intermediate, and advanced models answers before your next panel loop."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {preps.map((item) => (
              <Card key={item.slug} className="flex flex-col justify-between h-full">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                    <HelpCircle className="w-5 h-5 text-accent-purple" />
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
                    to={`/learn/${item.slug}?tab=interviews`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-accent-purple hover:text-accent-violet transition-colors"
                  >
                    Start Quiz <ArrowRight className="w-4 h-4" />
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
