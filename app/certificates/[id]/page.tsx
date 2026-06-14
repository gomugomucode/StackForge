import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Lock, ArrowLeft, Printer, Check, User } from 'lucide-react'
import { getTechData } from '@/lib/data/db'
import type { FullTechData } from '@/lib/data/db'
import { getCompletedTopics, getUserName, setUserName } from '@/lib/core/hooks/useProgress'
import { printStudyCertificate } from '@/lib/core/utils/printCertificate'
import { SEOHead } from '../components/ui/SEOHead'
import { PageLoadingSpinner } from '../components/ui/PageLoadingSpinner'

export function CertificatePage() {
  const { technology } = useParams<{ technology: string }>()
  const techId = technology?.toLowerCase() || ''
  
  const [data, setData] = useState<FullTechData | null>(null)
  const [isLoading, setIsLoading] = useState(true) // true on init — avoids sync setState in effect

  const [userName, setLocalUserName] = useState(getUserName())
  const [isEditingName, setIsEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(userName)

  // Load technology data asynchronously on mount/change
  // NOTE: isLoading is initialized to `true` above; we reset it only inside the async
  // promise callbacks (which are external-system responses) to satisfy the ESLint rule
  // react-hooks/set-state-in-effect that forbids synchronous setState inside effect bodies.
  useEffect(() => {
    let cancelled = false
    getTechData(techId)
      .then((res) => {
        if (!cancelled) {
          setData(res || null)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(null)
          setIsLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [techId])



  // Calculate progress percent
  const progressPercent = useMemo(() => {
    if (!data) return 0
    const roadmap = data.roadmap
    const totalTopics = roadmap.phases.reduce((acc, p) => acc + p.topics.length, 0)
    const completed = getCompletedTopics(techId)
    const completedCount = Object.keys(completed).filter(
      (key) => completed[key] && roadmap.phases.some(p => p.topics.some(t => t.name === key))
    ).length
    return totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0
  }, [data, techId])

  const totalTopicsCount = useMemo(() => {
    if (!data) return 0
    return data.roadmap.phases.reduce((acc, p) => acc + p.topics.length, 0)
  }, [data])

  const completedTopicsCount = useMemo(() => {
    if (!data) return 0
    const completed = getCompletedTopics(techId)
    return Object.keys(completed).filter(
      (key) => completed[key] && data.roadmap.phases.some(p => p.topics.some(t => t.name === key))
    ).length
  }, [data, techId])

  const handleSaveName = () => {
    if (nameInput.trim()) {
      setUserName(nameInput.trim())
      setLocalUserName(nameInput.trim())
      setIsEditingName(false)
    }
  }

  if (isLoading) {
    return <PageLoadingSpinner />
  }

  if (!data) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Technology Not Found</h2>
        <p className="text-text-secondary mb-6">We couldn't find a learning path for "{technology}".</p>
        <Link to="/dashboard" className="text-accent-purple font-semibold hover:underline">
          Go to Dashboard
        </Link>
      </div>
    )
  }

  const techTitle = data.roadmap.overview.title
  const isUnlocked = progressPercent === 100

  // Date formatted
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const handlePrint = () => {
    if (isUnlocked && userName) {
      printStudyCertificate(userName, techTitle, techId)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6 select-text">
      <SEOHead 
        title={`Syllabus Certificate for ${techTitle} — StackForge`}
        description={`Claim or view your study certificate of completion for the ${techTitle} learning track.`}
      />

      {/* Navigation and Title */}
      <div className="flex items-center gap-3">
        <Link 
          to={`/roadmap/${techId}`} 
          className="p-2 bg-background-card/50 border border-border/20 rounded-xl hover:bg-background-card/80 transition-colors text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-accent-purple uppercase tracking-wider">Credentials Portal</span>
          <h1 className="text-xl font-bold text-text-primary">{techTitle} Certificate</h1>
        </div>
      </div>

      {/* LOCKED VIEW */}
      {!isUnlocked && (
        <div className="glass p-8 rounded-3xl border border-border/20 space-y-6 text-center max-w-xl mx-auto mt-6">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-500/5">
            <Lock className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-text-primary">Certificate Locked</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              To unlock the digital study certification for <span className="font-semibold text-text-primary">{techTitle}</span>, you must complete 100% of the learning syllabus.
            </p>
          </div>

          {/* Progress stats */}
          <div className="bg-background/40 border border-border/10 p-5 rounded-2xl space-y-3 max-w-sm mx-auto">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-text-secondary">Current Progress</span>
              <span className="text-accent-purple">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-border/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-text-secondary flex justify-between">
              <span>{completedTopicsCount} topics completed</span>
              <span>{totalTopicsCount - completedTopicsCount} topics remaining</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to={`/roadmap/${techId}`}
              className="inline-flex px-6 py-3 bg-accent-purple hover:bg-accent-purple/95 text-white text-sm font-bold rounded-2xl shadow-lg shadow-accent-purple/15 transition-all"
            >
              Continue Study Roadmap
            </Link>
          </div>
        </div>
      )}

      {/* UNLOCKED VIEW */}
      {isUnlocked && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Name Setup Banner if not set */}
          {!userName ? (
            <div className="glass p-6 rounded-3xl border border-accent-purple/20 space-y-4 max-w-md mx-auto text-center">
              <div className="w-12 h-12 bg-accent-purple/10 text-accent-purple rounded-xl flex items-center justify-center mx-auto">
                <User className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-text-primary text-base">Enter Name on Certificate</h3>
                <p className="text-xs text-text-secondary">Please enter your legal name as it should appear on your study certificate of completion.</p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Anupam Baral"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-background border border-border/30 rounded-xl text-xs focus:outline-none focus:border-accent-purple text-text-primary"
                />
                <button
                  onClick={handleSaveName}
                  className="px-4 py-2 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Create
                </button>
              </div>
            </div>
          ) : (
            // Full Certificate Controls & Preview
            <div className="space-y-6">
              
              {/* Controls bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 glass rounded-2xl">
                {isEditingName ? (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Enter full name"
                      className="px-3 py-1.5 bg-background border border-border/40 rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:border-accent-purple"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-2 bg-accent-purple text-white rounded-xl hover:bg-accent-purple/90 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-secondary">Certificate for:</span>
                    <strong className="text-sm text-text-primary">{userName}</strong>
                    <button
                      onClick={() => {
                        setNameInput(userName)
                        setIsEditingName(true)
                      }}
                      className="text-xs text-accent-purple hover:underline flex items-center gap-1 font-semibold"
                    >
                      Change Name
                    </button>
                  </div>
                )}

                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 bg-accent-purple hover:bg-accent-purple/95 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                  >
                    <Printer className="w-4 h-4" /> Download / Print PDF
                  </button>
                </div>
              </div>

              {/* Digital Preview Box */}
              <div className="p-4 sm:p-8 bg-white border-8 border-double border-[#c5a880] rounded-2xl relative shadow-xl text-center text-[#1e1b4b] overflow-hidden select-none aspect-[1.414/1] max-w-3xl mx-auto flex flex-col justify-between py-10 sm:py-16">
                {/* Gold Seal watermark decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/[0.02] border-4 border-dashed border-amber-500/[0.03] rounded-full pointer-events-none" />

                <div className="space-y-4">
                  <div className="text-[11px] font-black uppercase tracking-[3px] text-[#1e1b4b]">StackForge Academy</div>
                  <h2 className="font-serif text-2xl sm:text-4xl text-[#9d7c4d] tracking-[2px] uppercase">Certificate of Completion</h2>
                  <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-[2px]">Syllabus Mastery Achievement</div>
                </div>

                <div className="space-y-2 py-4">
                  <div className="font-serif italic text-sm text-slate-500">This credential is proudly presented to</div>
                  <div className="font-serif text-2xl sm:text-4xl font-bold border-b border-slate-200 pb-2 inline-block px-10 max-w-full truncate">{userName}</div>
                </div>

                <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed px-4">
                  for successfully completing the rigorous online learning program and demonstrating comprehensive core syllabus mastery in <span className="font-bold text-[#1e1b4b]">{techTitle}</span>. Having completed all curriculum sections, milestone projects, and code verification checkpoints.
                </p>

                <div className="flex items-end justify-between px-6 sm:px-12 pt-6">
                  <div className="w-[120px] text-center">
                    <div className="border-b border-slate-300 pb-1 text-slate-800 text-[10px] font-bold">{issueDate}</div>
                    <div className="text-[8px] text-slate-400 uppercase tracking-wider mt-1">Date of Issuance</div>
                  </div>

                  {/* Faux gold seal center */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#e6c594] to-[#b89150] shadow-md flex items-center justify-center text-white text-[8px] font-black tracking-wider leading-tight">
                    STACK<br />FORGE
                  </div>

                  <div className="w-[120px] text-center">
                    <div className="border-b border-slate-300 pb-1 text-slate-800 text-[10px] font-serif italic">StackForge Engine</div>
                    <div className="text-[8px] text-slate-400 uppercase tracking-wider mt-1">Authorized Verifier</div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  )
}
