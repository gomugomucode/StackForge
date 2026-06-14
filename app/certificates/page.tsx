import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { SEOHead } from '../components/ui/SEOHead'
import { technologyMetadata } from '../data/db'
import { getAllTechProgress, getUserName, setUserName } from '../core/hooks/useProgress'
import { certificateService } from '../features/certificates/certificateService'
import { QRCodeDisplay } from '../features/certificates/QRCodeDisplay'
import type { CertificateRecord } from '../features/certificates/types'
import { Award, Lock, ShieldCheck, ArrowRight, User, Check, X, QrCode, ExternalLink, Trophy } from 'lucide-react'

export function CertificateCenterPage() {
  const [issuedCerts, setIssuedCerts] = useState<CertificateRecord[]>([])
  const [claimTech, setClaimTech] = useState<{ id: string; label: string; topics: number } | null>(null)
  const [recipientName, setRecipientName] = useState(getUserName() || '')
  const [verifyCert, setVerifyCert] = useState<CertificateRecord | null>(null)
  const [successCert, setSuccessCert] = useState<CertificateRecord | null>(null)

  // Fetch issued certificates on load
  useEffect(() => {
    async function loadCerts() {
      const certs = await certificateService.getCertificates()
      setIssuedCerts(certs)
    }
    loadCerts()
  }, [])

  // Calculate progress for all tech tracks
  const techMap = useMemo(() => {
    return Object.entries(technologyMetadata).reduce((acc, [id, meta]) => {
      acc[id] = meta.topicNames
      return acc
    }, {} as Record<string, string[]>)
  }, [])

  const progressSummaries = useMemo(() => {
    return getAllTechProgress(techMap)
  }, [techMap])

  // Combine metadata with progress and claim details
  const tracks = useMemo(() => {
    return Object.entries(technologyMetadata).map(([id, meta]) => {
      const summary = progressSummaries.find(p => p.techId === id)
      const percent = summary ? summary.percent : 0
      const completedCount = summary ? summary.completedCount : 0
      const totalTopics = meta.topicNames.length

      const issued = issuedCerts.find(c => c.tech_id === id)

      return {
        id,
        title: meta.title,
        description: meta.description,
        difficulty: meta.difficulty,
        percent,
        completedCount,
        totalTopics,
        isCompleted: percent === 100,
        issued,
      }
    })
  }, [progressSummaries, issuedCerts])

  const handleClaimSubmit = async () => {
    if (!claimTech || !recipientName.trim()) return

    // Save name to progress database
    setUserName(recipientName.trim())

    try {
      const newCert = await certificateService.issueCertificate(
        'user-local-id', // Local sandbox user id
        recipientName.trim(),
        claimTech.id,
        claimTech.label,
        claimTech.topics,
        claimTech.topics
      )

      // Update local state
      setIssuedCerts(prev => [...prev, newCert])
      setSuccessCert(newCert)
      setClaimTech(null)
    } catch (err) {
      console.error('Failed to claim certificate:', err)
    }
  }

  return (
    <>
      <SEOHead
        title="StackForge Certificate Center | Claims & Registry"
        description="Verify your tech skills, claim completion certificates, and share public registry credentials."
      />

      <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] py-10 select-text">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Page Title Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#21262d] pb-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-accent-purple uppercase tracking-widest block">
                Official Certification Hub
              </span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Certificate Center
              </h1>
              <p className="text-sm text-[#8b949e] max-w-xl">
                Track your syllabus milestones, claim official verified certificates, and display credentials on your resume or portfolio.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/verify"
                className="flex items-center gap-1.5 px-4.5 py-2.5 bg-[#161b22] hover:bg-[#1f242c] border border-white/[0.06] rounded-xl text-xs text-white font-bold transition-all duration-200"
              >
                <ShieldCheck className="w-4 h-4 text-accent-cyan" />
                <span>Verify External Credential</span>
              </Link>
            </div>
          </div>

          {/* Grid of Track Certificates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map(track => {
              const isClaimed = !!track.issued
              const isLocked = !track.isCompleted

              return (
                <div
                  key={track.id}
                  className={`bg-[#161b22] border rounded-2xl p-6 flex flex-col justify-between min-h-[300px] transition-all duration-300 relative group overflow-hidden ${
                    isClaimed
                      ? 'border-emerald-500/20 hover:border-emerald-500/40 shadow-lg shadow-emerald-500/[0.02]'
                      : !isLocked
                      ? 'border-accent-purple/20 hover:border-accent-purple/40 shadow-lg shadow-accent-purple/[0.02]'
                      : 'border-white/[0.04] opacity-80 hover:opacity-100 hover:bg-[#191f28]'
                  }`}
                >
                  {/* Decorative background glow */}
                  {isClaimed && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/5 to-transparent pointer-events-none rounded-bl-full" />
                  )}
                  {!isLocked && !isClaimed && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent-purple/5 to-transparent pointer-events-none rounded-bl-full" />
                  )}

                  {/* Header */}
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[#8b949e]">
                        {track.difficulty}
                      </span>
                      {isClaimed ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 border border-emerald-500/20 rounded-full">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Claimed</span>
                        </span>
                      ) : !isLocked ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-accent-purple bg-accent-purple/10 px-2.5 py-0.5 border border-accent-purple/20 rounded-full">
                          <Trophy className="w-3 h-3" />
                          <span>Ready</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-[#8b949e] bg-[#21262d] px-2.5 py-0.5 border border-white/[0.05] rounded-full">
                          <Lock className="w-3 h-3" />
                          <span>Locked</span>
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300">
                        {track.title} Track
                      </h3>
                      <p className="text-xs text-[#8b949e] line-clamp-2 leading-relaxed">
                        {track.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress & Actions */}
                  <div className="mt-8 space-y-4 relative z-10">
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-bold text-[#8b949e]">
                        <span>Syllabus completed</span>
                        <span className={track.isCompleted ? 'text-emerald-400' : ''}>
                          {track.percent}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${
                            track.isCompleted
                              ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                              : 'bg-gradient-to-r from-accent-purple to-accent-cyan'
                          }`}
                          style={{ width: `${track.percent}%` }}
                        />
                      </div>
                      <div className="text-[9px] text-[#6e7681]">
                        {track.completedCount} of {track.totalTopics} curriculum topics mastered
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2">
                      {isClaimed ? (
                        <div className="flex gap-2">
                          <Link
                            to={`/certificate/${track.id}`}
                            className="flex-1 flex items-center justify-center gap-1 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/35 rounded-xl text-xs font-bold text-emerald-400 transition-all duration-200"
                          >
                            <span>View / Download</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => setVerifyCert(track.issued!)}
                            className="px-3 py-2 bg-[#21262d] hover:bg-[#2c333f] border border-white/[0.06] rounded-xl text-xs text-white transition-colors"
                            title="Show verification details & QR code"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : !isLocked ? (
                        <button
                          onClick={() =>
                            setClaimTech({
                              id: track.id,
                              label: track.title,
                              topics: track.totalTopics,
                            })
                          }
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-accent-purple hover:bg-accent-purple-hover text-white rounded-xl text-xs font-bold shadow-lg shadow-accent-purple/10 hover:shadow-accent-purple/20 transition-all duration-200"
                        >
                          <span>Claim Certificate</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <Link
                          to={`/roadmap/${track.id}`}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#21262d] hover:bg-[#2c333f] border border-white/[0.06] rounded-xl text-xs text-[#c9d1d9] font-bold transition-all duration-200"
                        >
                          <span>Resume Learning</span>
                          <ArrowRight className="w-4 h-4 text-[#8b949e]" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* MODAL 1: CLAIM CERTIFICATE FORM */}
      {claimTech && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#161b22] border border-white/[0.08] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setClaimTech(null)}
              className="absolute top-4 right-4 p-1.5 hover:bg-white/[0.05] rounded-xl text-[#8b949e] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent-purple/10 border border-accent-purple/20 text-accent-purple rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <Trophy className="w-6 h-6 animate-bounce" />
              </div>
              <h3 className="text-lg font-bold text-white">Claim {claimTech.label} Certificate</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Congratulations on completing the entire syllabus! Please enter your full name exactly as you'd like it to appear on your verified credential.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider">
                  Recipient Legal Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8b949e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    placeholder="e.g. Anupam Baral"
                    className="w-full bg-[#0d1117] border border-white/[0.06] focus:border-white/12 focus:ring-1 focus:ring-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white outline-none"
                    autoFocus
                  />
                </div>
              </div>

              <button
                onClick={handleClaimSubmit}
                disabled={!recipientName.trim()}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-accent-purple hover:bg-accent-purple-hover disabled:bg-slate-800 disabled:text-[#8b949e] text-white rounded-xl text-xs font-bold transition-all duration-200 shadow-md shadow-accent-purple/15"
              >
                <Check className="w-4 h-4" />
                <span>Issue My Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SUCCESS BROWSER UNLOCKED BANNER */}
      {successCert && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#161b22] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
            {/* Celebration sparkles background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-transparent pointer-events-none rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-500/10 to-transparent pointer-events-none rounded-tr-full" />

            <button
              onClick={() => setSuccessCert(null)}
              className="absolute top-4 right-4 p-1.5 hover:bg-white/[0.05] rounded-xl text-[#8b949e] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 relative z-10">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Certificate Successfully Issued!</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed max-w-sm mx-auto">
                Your credential for <span className="font-bold text-white">{successCert.track_name}</span> is live! It has been written to the public registry.
              </p>
            </div>

            {/* Micro details panel */}
            <div className="bg-[#0d1117]/60 border border-white/[0.04] p-4.5 rounded-2xl text-left space-y-2.5 max-w-md mx-auto relative z-10">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8b949e]">Recipient:</span>
                <strong className="text-white">{successCert.recipient_name}</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8b949e]">Credential ID:</span>
                <span className="font-mono font-bold text-accent-cyan uppercase">{successCert.certificate_id}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 relative z-10 max-w-md mx-auto pt-2">
              <Link
                to={`/certificate/${successCert.tech_id}`}
                onClick={() => setSuccessCert(null)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-accent-purple hover:bg-accent-purple-hover text-white rounded-xl text-xs font-bold transition-all duration-200"
              >
                <span>View Full Certificate</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={() => {
                  setVerifyCert(successCert)
                  setSuccessCert(null)
                }}
                className="flex-1 py-2.5 bg-[#21262d] hover:bg-[#2c333f] border border-white/[0.06] text-white rounded-xl text-xs font-bold transition-colors"
              >
                View QR Verification Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SHARE / VERIFY QR CODE */}
      {verifyCert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#161b22] border border-white/[0.08] rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setVerifyCert(null)}
              className="absolute top-4 right-4 p-1.5 hover:bg-white/[0.05] rounded-xl text-[#8b949e] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <h3 className="text-base font-bold text-white">Share credential</h3>
              <p className="text-xs text-[#8b949e]">
                Display your verified <strong className="text-white">{verifyCert.track_name}</strong> completion badge.
              </p>
            </div>

            <QRCodeDisplay certificateId={verifyCert.certificate_id} />
          </div>
        </div>
      )}
    </>
  )
}
export default CertificateCenterPage;
