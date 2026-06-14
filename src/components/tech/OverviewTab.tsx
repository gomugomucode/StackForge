import { BookOpen, Coins, Briefcase, Download } from 'lucide-react'
import { Card } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import type { FullTechData } from '../../data/db'

interface OverviewTabProps {
  techTitle: string
  data: FullTechData
  onDownloadPdf: () => void
}

export function OverviewTab({ techTitle, data, onDownloadPdf }: OverviewTabProps) {
  const { overview } = data.roadmap
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent-purple" /> What is {techTitle}?
        </h2>
        <p className="text-text-secondary leading-relaxed text-base">
          {overview.whatIsIt}
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-bold text-text-primary mb-3">Why Learn It?</h3>
          <p className="text-text-secondary text-sm leading-relaxed">{overview.whyLearnIt}</p>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-text-primary mb-3">Career Path Opportunities</h3>
          <p className="text-text-secondary text-sm leading-relaxed">{overview.careerOpportunities}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
            <Coins className="w-5 h-5 text-accent-emerald" /> Salary & Earnings
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-2">
            A career specializing in {techTitle} yields premium compensations globally:
          </p>
          <div className="text-2xl font-extrabold text-accent-emerald">{overview.salaryInfo}</div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-accent-cyan" /> Market Demand
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-2">
            How sought after is this technology by startups and enterprise sectors?
          </p>
          <div className="text-lg font-bold text-text-primary">{overview.industryDemand}</div>
        </Card>
      </div>

      {/* Bottom PDF Download Card */}
      <Card className="bg-gradient-to-r from-accent-purple/5 to-accent-violet/5 border-dashed border-accent-purple/30 text-center py-8">
        <h3 className="text-lg font-bold text-text-primary mb-2">Download Complete Reference Guide</h3>
        <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
          Get a beautifully formatted PDF containing the roadmap timeline, interview questions, projects, and tips.
        </p>
        <Button onClick={onDownloadPdf} variant="primary" size="md" className="gap-2">
          <Download className="w-4 h-4" /> Download {techTitle} Roadmap PDF
        </Button>
      </Card>
    </div>
  )
}
