import { useState } from 'react'
import { Award, CheckCircle, Shield, Clock, BookOpen } from 'lucide-react'
import { SEOHead } from '../components/ui/SEOHead'
import { SectionHeader, Card } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'

const certsList = [
  { id: 'fe-arch', title: 'Frontend Systems Architect Certificate', provider: 'StackForge Academy', duration: '60 mins', difficulty: 'Advanced', questions: 40 },
  { id: 'js-basic', title: 'JavaScript Certified Associate', provider: 'StackForge Academy', duration: '45 mins', difficulty: 'Beginner', questions: 30 },
  { id: 'py-data', title: 'Python Application Engineering Specialist', provider: 'StackForge Academy', duration: '50 mins', difficulty: 'Intermediate', questions: 35 },
  { id: 'do-cloud', title: 'DevOps & Containers Practitioner', provider: 'StackForge Academy', duration: '60 mins', difficulty: 'Advanced', questions: 40 }
]

export function CertificationsPage() {
  const [startedCert, setStartedCert] = useState<string | null>(null)
  const [examPassed, setExamPassed] = useState<string[]>([])

  const handleStartExam = (id: string) => {
    setStartedCert(id)
    setTimeout(() => {
      setStartedCert(null)
      setExamPassed((prev) => [...prev, id])
      alert('Congratulations! You passed the assessment exam and earned your StackForge certificate.')
    }, 2500)
  }

  return (
    <>
      <SEOHead
        title="Professional Programming Certifications - StackForge"
        description="Verify your coding credentials. Take StackForge Academy exams to test your knowledge and receive certifications."
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Credentials"
            title="Academy Certificates"
            highlight="& Badges"
            description="Certify your expertise. Complete learning roadmaps, finish project specs, and pass validation challenges."
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Certifications Dashboard Info */}
            <Card className="bg-gradient-to-r from-accent-purple/5 to-accent-cyan/5 border-accent-purple/20 flex flex-col md:flex-row items-center gap-6 p-8">
              <Award className="w-16 h-16 text-accent-purple shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">How Certifications Work</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  StackForge credentials verify your practical skills. Complete all phases of a technology path, push the portfolio project checklists, and pass the timed multiple-choice assessments.
                </p>
                <div className="flex gap-4 text-xs font-semibold text-text-primary">
                  <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-accent-cyan" /> Free Assessments</span>
                  <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-accent-emerald" /> Verifiable URL</span>
                </div>
              </div>
            </Card>

            {/* List of Certificates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certsList.map((cert) => {
                const isPassed = examPassed.includes(cert.id)
                const isPending = startedCert === cert.id

                return (
                  <Card key={cert.id} className="flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent-purple bg-accent-purple/10 px-2.5 py-0.5 rounded">
                          {cert.difficulty}
                        </span>
                        {isPassed && (
                          <span className="text-xs font-bold text-accent-emerald flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Earned
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-lg text-text-primary mb-2">
                        {cert.title}
                      </h3>
                      <p className="text-text-secondary text-xs mb-6">
                        Issued by {cert.provider} &bull; Covers advanced paradigms.
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-black/[0.04] dark:border-white/[0.04] pt-4 mt-auto">
                      <div className="flex gap-3 text-[11px] text-text-muted">
                        <span className="flex items-center gap-0.5"><Clock className="w-3.5 h-3.5" /> {cert.duration}</span>
                        <span className="flex items-center gap-0.5"><BookOpen className="w-3.5 h-3.5" /> {cert.questions} Qs</span>
                      </div>
                      <Button
                        onClick={() => handleStartExam(cert.id)}
                        variant={isPassed ? 'secondary' : 'primary'}
                        size="sm"
                        className="min-w-[100px]"
                        disabled={isPending}
                      >
                        {isPending ? 'Verifying...' : isPassed ? 'Retake Exam' : 'Start Assessment'}
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
