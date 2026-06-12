import { Link } from 'react-router-dom'
import { Terminal, Download, ArrowRight } from 'lucide-react'
import { SEOHead } from '../components/ui/SEOHead'
import { SectionHeader, Card } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'
import { getTechData } from '../data/db'
import { printTechRoadmapPdf } from '../utils/printPdf'

const sheets = [
  { slug: 'javascript', title: 'JavaScript Methods Cheat Sheet', desc: 'Quick syntax for map(), filter(), Object.keys(), JSON parse/stringify.' },
  { slug: 'python', title: 'Python Syntax Cheat Sheet', desc: 'Reference for list comprehensions, f-strings, list append, dict.get().' },
  { slug: 'react', title: 'React Hooks Cheat Sheet', desc: 'Summary of hooks usage for useState, useEffect, useContext, useRef.' },
  { slug: 'nodejs', title: 'Node.js Core APIs Cheat Sheet', desc: 'Quick commands for fs.readFile, fs.writeFileSync, path.join.' },
  { slug: 'typescript', title: 'TypeScript Typings Cheat Sheet', desc: 'Declaration structures for interface, type, Partial, Readonly.' },
  { slug: 'git', title: 'Git Commands Cheat Sheet', desc: 'Commands list for git init, clone, branch, merge, commit, stash.' },
  { slug: 'docker', title: 'Docker Containers Cheat Sheet', desc: 'Syntax reference for docker run, build, docker-compose commands.' },
  { slug: 'aws', title: 'AWS Resource Commands Cheat Sheet', desc: 'Lookup reference for s3 sync, ls, ec2 describe, lambda invoke.' }
]

export function CheatsheetsPage() {
  const handlePdfDownload = (slug: string) => {
    const data = getTechData(slug)
    if (data) {
      printTechRoadmapPdf(slug, data)
    }
  }

  return (
    <>
      <SEOHead
        title="Developer Cheatsheets & Quick Syntax Reference Guides"
        description="Access quick reference guides, commands checklists, and syntax cheatsheets."
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Cheat Sheets"
            title="Quick Reference"
            highlight="& Syntax Cards"
            description="Speed up your coding workflow. Search methods, copy CLI arguments, and download offline PDF cheatsheets."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sheets.map((item) => (
              <Card key={item.slug} className="flex flex-col justify-between h-full">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-4">
                    <Terminal className="w-5 h-5 text-accent-cyan" />
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
                    to={`/learn/${item.slug}?tab=cheatsheets`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-accent-purple hover:text-accent-violet transition-colors"
                  >
                    Open Sheet <ArrowRight className="w-4 h-4" />
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
