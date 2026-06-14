import { useState } from 'react'
import { QrCode, Copy, Check } from 'lucide-react'

interface QRCodeDisplayProps {
  certificateId: string
}

export function QRCodeDisplay({ certificateId }: QRCodeDisplayProps) {
  const [copied, setCopied] = useState(false)
  
  // Construct the verification URL
  const verifyUrl = `${window.location.origin}/verify?code=${certificateId}`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(verifyUrl)}&color=7c3aed&bgcolor=0d1117`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(verifyUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy verification URL:', err)
    }
  }

  return (
    <div className="flex flex-col items-center p-5 bg-[#161b22] border border-white/[0.06] rounded-2xl text-center space-y-4 max-w-xs mx-auto shadow-md">
      <div className="p-2.5 bg-accent-purple/10 border border-accent-purple/20 rounded-xl text-accent-purple">
        <QrCode className="w-5 h-5" />
      </div>

      <div className="space-y-1">
        <h4 className="text-xs font-bold text-white">Verify Certificate</h4>
        <p className="text-[10px] text-[#8b949e]">
          Scan to verify credentials instantly in the public registry.
        </p>
      </div>

      {/* QR Code Wrapper with glow */}
      <div className="relative p-3 bg-[#0d1117] border border-white/[0.05] rounded-xl overflow-hidden shadow-inner group">
        <div className="absolute inset-0 bg-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <img
          src={qrUrl}
          alt={`Verification QR Code for ${certificateId}`}
          className="w-36 h-36 relative z-10 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="w-full pt-2">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#21262d] hover:bg-[#2c333f] border border-white/[0.06] rounded-xl text-[10px] text-[#c9d1d9] font-bold transition-all duration-200"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied Link!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#8b949e]" />
              <span>Copy Verification Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
