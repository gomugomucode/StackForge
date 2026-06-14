import type { CertificateRecord } from './types'
import { Award, ShieldCheck, Calendar, Bookmark } from 'lucide-react'

interface CertificateCardProps {
  certificate: CertificateRecord
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl p-[1px] bg-gradient-to-r from-accent-purple via-accent-cyan to-emerald-400 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative group">
      {/* Background decorations inside card border */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent-purple/5 blur-[80px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-cyan/5 blur-[80px] pointer-events-none rounded-full" />

      {/* Main Card Body */}
      <div className="relative bg-[#0d1117] rounded-[23px] px-6 sm:px-10 py-10 flex flex-col justify-between border border-white/[0.03] overflow-hidden min-h-[460px]">
        {/* Certificate Frame/Border lines inside */}
        <div className="absolute inset-4 border border-white/[0.02] rounded-[18px] pointer-events-none" />
        <div className="absolute inset-5 border-2 border-dashed border-white/[0.01] rounded-[16px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-accent-purple/10 border border-accent-purple/20 rounded-lg text-accent-purple">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-black tracking-widest text-white uppercase font-sans">
              StackForge <span className="text-accent-purple">Academy</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.02] border border-white/[0.05] rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="text-[9px] font-bold text-accent-cyan uppercase tracking-wider">
              Verified Credential
            </span>
          </div>
        </div>

        {/* Certificate Content */}
        <div className="text-center my-8 relative z-10 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-accent-purple uppercase">
              Certificate of Completion
            </h2>
            <p className="text-[10px] text-[#8b949e] italic">
              This credential certifies that the recipient has demonstrated code proficiency.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-[#8b949e] uppercase tracking-wider block">
              Proudly Presented To
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-wide border-b border-[#21262d] pb-2 max-w-md mx-auto">
              {certificate.recipient_name}
            </h1>
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <p className="text-xs text-[#c9d1d9] leading-relaxed">
              for successfully completing the technical curriculum and mastering the concepts of
            </p>
            <h3 className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-emerald-400">
              {certificate.track_name} Developer Track
            </h3>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-end justify-between relative z-10 pt-6 border-t border-white/[0.04]">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-1 text-[9px] text-[#8b949e]">
              <Calendar className="w-3 h-3" />
              <span>Issued on: {new Date(certificate.issued_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
            </div>
            <p className="text-[9px] text-[#6e7681]">
              Topics Mastered: <span className="text-white font-semibold">{certificate.topics_completed}/{certificate.total_topics}</span>
            </p>
          </div>

          {/* Golden/Purple Seal Decoration */}
          <div className="hidden sm:flex flex-col items-center justify-center -mb-2">
            <div className="relative w-12 h-12 bg-gradient-to-tr from-accent-purple to-accent-cyan rounded-full flex items-center justify-center shadow-lg animate-[spin_20s_linear_infinite]">
              <Bookmark className="w-5 h-5 text-white/90" />
            </div>
          </div>

          <div className="space-y-1 text-right">
            <span className="text-[8px] uppercase tracking-widest text-[#8b949e] block">
              Credential ID
            </span>
            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider bg-white/[0.02] border border-white/[0.05] px-2 py-0.5 rounded">
              {certificate.certificate_id}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
