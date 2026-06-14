import { useState } from 'react'
import { Copy, Check, X, Share2, Globe } from 'lucide-react'
import { saveSnippet, getShareUrl } from './playgroundService'
import type { PlaygroundLanguage } from '@/lib/core/types/phase5'

interface ShareModalProps {
  code: string
  language: PlaygroundLanguage
  title: string
  onClose: () => void
}

export function ShareModal({ code, language, title, onClose }: ShareModalProps) {
  const [snippetTitle, setSnippetTitle] = useState(title)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    const snippet = saveSnippet(snippetTitle || 'Untitled', language, code, true)
    const url = getShareUrl(snippet.share_token)
    setShareUrl(url)
    setIsSaving(false)
  }

  const handleCopy = async () => {
    if (!shareUrl) return
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#161b22] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-accent-purple" />
            <h2 className="text-sm font-bold text-white">Share Snippet</h2>
          </div>
          <button onClick={onClose} className="p-1 text-[#6e7681] hover:text-white rounded transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {!shareUrl ? (
            <>
              <div>
                <label className="text-xs text-[#6e7681] font-medium block mb-1.5">Snippet Title</label>
                <input
                  type="text"
                  value={snippetTitle}
                  onChange={e => setSnippetTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.1] rounded-xl text-sm text-white outline-none focus:border-accent-purple/50 transition-colors"
                  placeholder="e.g. Fibonacci Algorithm"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <Globe className="w-4 h-4 text-accent-cyan flex-none" />
                <p className="text-xs text-[#6e7681]">This snippet will be saved locally and shareable via a unique URL.</p>
              </div>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-3 bg-accent-purple hover:bg-accent-purple/90 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all"
              >
                {isSaving ? 'Generating Link...' : 'Generate Share Link'}
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-emerald-400 font-medium">✓ Snippet saved! Share this link:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white/[0.04] border border-white/[0.1] rounded-xl text-xs text-[#e6edf3] font-mono outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] rounded-xl text-sm transition-all flex items-center gap-1.5 text-white"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
