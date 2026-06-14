import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SEOHead } from '@/components/ui/SEOHead'
import { certificateService } from '@/features/certificates/certificateService'
import { CertificateCard } from '@/features/certificates/CertificateCard'
import type { CertificateRecord } from '@/features/certificates/types'
import { ShieldCheck, Search, ShieldAlert, FileSearch, ArrowLeft, Loader2 } from 'lucide-react'

export function VerifyPage() {
  const [searchParams] = useSearchParams()
  const codeParam = searchParams.get('code') || ''

  const [inputCode, setInputCode] = useState(codeParam)
  const [isValidating, setIsValidating] = useState(false)
  const [verifiedCert, setVerifiedCert] = useState<CertificateRecord | null>(null)
  const [verifyMessage, setVerifyMessage] = useState('')
  const [hasChecked, setHasChecked] = useState(false)

  // Validate automatically if code in query param
  useEffect(() => {
    if (codeParam) {
      handleVerify(codeParam)
    }
  }, [codeParam])

  const handleVerify = async (code: string) => {
    const targetCode = code.trim()
    if (!targetCode) return

    setIsValidating(true)
    setHasChecked(true)
    setVerifiedCert(null)
    setVerifyMessage('')

    try {
      // Small simulated ledger lookup latency
      await new Promise(r => setTimeout(r, 1200))
      
      const res = await certificateService.verifyCertificate(targetCode)
      if (res.valid && res.certificate) {
        setVerifiedCert(res.certificate)
        setVerifyMessage(res.message)
      } else {
        setVerifiedCert(null)
        setVerifyMessage(res.message)
      }
    } catch (err) {
      console.error('Failed to verify certificate:', err)
      setVerifiedCert(null)
      setVerifyMessage('Failed to connect to verification server. Please try again.')
    } finally {
      setIsValidating(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleVerify(inputCode)
  }

  return (
    <>
      <SEOHead
        title="Verify StackForge Credential | Public Registry"
        description="Public validation portal for StackForge Academy certificates. Search by certificate verification ID to confirm credentials."
      />

      <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] py-12 select-text">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <Link
              href="/certificates"
              className="p-2 bg-[#161b22] border border-white/[0.06] rounded-xl hover:bg-[#1f242c] transition-colors text-[#8b949e] hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="text-[10px] font-bold text-accent-cyan uppercase tracking-wider block">
                Trust & Verification Ledger
              </span>
              <h1 className="text-2xl font-black text-white">
                Public Certificate Registry
              </h1>
            </div>
          </div>

          {/* Verification Search Bar Form */}
          <div className="bg-[#161b22] border border-white/[0.05] rounded-3xl p-6 shadow-xl space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Enter Credential Code</h3>
              <p className="text-xs text-[#8b949e]">
                Every official StackForge certificate lists a unique credential ID (e.g. `SF-ABCD-EFGH`). Enter the code below to query the database.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8b949e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inputCode}
                  onChange={e => setInputCode(e.target.value)}
                  placeholder="e.g. SF-7A9B-4D2F"
                  className="w-full bg-[#0d1117] border border-white/[0.06] focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/15 rounded-xl py-3 pl-11 pr-4 text-xs font-mono font-bold text-white outline-none placeholder-[#8b949e] uppercase tracking-wider"
                  disabled={isValidating}
                />
              </div>
              <button
                type="submit"
                disabled={isValidating || !inputCode.trim()}
                className="px-6 bg-accent-cyan hover:bg-accent-cyan/90 disabled:bg-slate-800 disabled:text-[#8b949e] text-slate-900 rounded-xl text-xs font-bold transition-all duration-200 shadow-md shadow-accent-cyan/5 flex items-center gap-1.5"
              >
                {isValidating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify Code</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Validation Outputs */}
          {isValidating && (
            <div className="text-center py-16 bg-[#161b22]/50 border border-white/[0.04] rounded-3xl space-y-3">
              <Loader2 className="w-10 h-10 text-accent-cyan animate-spin mx-auto" />
              <p className="text-xs text-[#8b949e] font-medium animate-pulse">
                Querying cryptographic registry nodes...
              </p>
            </div>
          )}

          {!isValidating && hasChecked && (
            <div className="space-y-8 animate-fadeIn">
              {verifiedCert ? (
                // SUCCESS STATE
                <div className="space-y-8">
                  {/* Status Banner */}
                  <div className="flex items-center gap-4 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wide">
                        Verified Authentic Credential
                      </h4>
                      <p className="text-[10px] text-[#8b949e]">
                        {verifyMessage}
                      </p>
                    </div>
                  </div>

                  {/* Certificate Display Card */}
                  <CertificateCard certificate={verifiedCert} />
                </div>
              ) : (
                // ERROR STATE
                <div className="text-center py-14 bg-red-500/[0.02] border border-red-500/10 rounded-3xl space-y-4 max-w-md mx-auto">
                  <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5 px-4">
                    <h3 className="text-sm font-bold text-white">Invalid Verification Code</h3>
                    <p className="text-xs text-[#8b949e] leading-relaxed">
                      {verifyMessage || 'No matching certificate records found on StackForge verification registry. Please check the spelling, case, and format of the verification ID.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Idle Empty State */}
          {!isValidating && !hasChecked && (
            <div className="text-center py-20 bg-[#161b22]/30 border border-dashed border-white/[0.04] rounded-3xl space-y-3">
              <FileSearch className="w-12 h-12 text-[#30363d] mx-auto" />
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-[#8b949e]">Ready for Query</h3>
                <p className="text-[10px] text-[#6e7681]">
                  Enter a code above or use a QR scan link to display credentials.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
export default VerifyPage;
