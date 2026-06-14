import { useState } from 'react'
import { X, Send, Tag, AlertCircle } from 'lucide-react'

interface CreatePostModalProps {
  onClose: () => void
  onSubmit: (title: string, content: string, category: string, tags: string[]) => Promise<any>
}

const CATEGORIES = [
  { id: 'question', label: 'Question' },
  { id: 'discussion', label: 'Discussion' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'tip', label: 'Tip' },
]

export function CreatePostModal({ onClose, onSubmit }: CreatePostModalProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('question')
  const [tagsInput, setTagsInput] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || isSubmitting) return

    setIsSubmitting(true)
    setErrorMsg('')

    // Parse tags: split by comma, trim, filter empty
    const tags = tagsInput
      .split(',')
      .map(t => t.trim().toLowerCase().replace(/[^a-z0-9-]/g, ''))
      .filter(t => t.length > 0)

    try {
      await onSubmit(title.trim(), content.trim(), category, tags)
      onClose()
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to submit post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#161b22] border border-white/[0.08] rounded-3xl p-6 sm:p-7 max-w-xl w-full space-y-5 shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-white/[0.05] rounded-xl text-[#8b949e] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">Create a Discussion</h3>
          <p className="text-xs text-[#8b949e]">
            Share your learning experiences, showcase projects, or ask technical questions.
          </p>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-1">
          {/* Post Title */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider">
              Discussion Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. What is the best way to structure custom React hooks?"
              className="w-full bg-[#0d1117] border border-white/[0.06] focus:border-white/12 focus:ring-1 focus:ring-white/10 rounded-xl py-2.5 px-4 text-xs text-white outline-none placeholder-[#6e7681]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category selection */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-[#0d1117] border border-white/[0.06] focus:border-white/12 focus:ring-1 focus:ring-white/10 rounded-xl py-2.5 px-3 text-xs text-white outline-none appearance-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#8b949e]" />
                <span>Tags (comma-separated)</span>
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="e.g. react, hooks, performance"
                className="w-full bg-[#0d1117] border border-white/[0.06] focus:border-white/12 focus:ring-1 focus:ring-white/10 rounded-xl py-2.5 px-4 text-xs text-white outline-none placeholder-[#6e7681]"
              />
            </div>
          </div>

          {/* Post Content Body */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider">
              Content / Question details
            </label>
            <textarea
              required
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Provide background, detail code blocks, and explain what you are seeking to discuss..."
              rows={5}
              className="w-full bg-[#0d1117] border border-white/[0.06] focus:border-white/12 focus:ring-1 focus:ring-white/10 rounded-xl py-3 px-4 text-xs text-white outline-none resize-none placeholder-[#6e7681]"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4.5 py-2.5 bg-transparent hover:bg-white/[0.03] border border-white/[0.05] rounded-xl text-xs text-[#c9d1d9] font-bold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="px-5 py-2.5 bg-accent-purple hover:bg-accent-purple-hover disabled:bg-slate-800 disabled:text-[#8b949e] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-accent-purple/15"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Posting...' : 'Create Discussion'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
