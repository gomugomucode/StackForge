import { useState, useEffect } from 'react'
import type { PostComment } from './types'
import { communityService } from './communityService'
import { getUserName } from '../../core/hooks/useProgress'
import { Send, Loader2 } from 'lucide-react'

interface CommentThreadProps {
  postId: string
}

export function CommentThread({ postId }: CommentThreadProps) {
  const [comments, setComments] = useState<PostComment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [newCommentVal, setNewCommentVal] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch comments
  useEffect(() => {
    async function loadComments() {
      setIsLoading(true)
      try {
        const data = await communityService.getComments(postId)
        setComments(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadComments()
  }, [postId])

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCommentVal.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const username = getUserName() || 'Anonymous'
      const added = await communityService.addComment(postId, newCommentVal.trim(), username)
      setComments(prev => [...prev, added])
      setNewCommentVal('')
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-4 mt-2 border-t border-white/[0.04] space-y-4">
      {/* Comments List */}
      {isLoading ? (
        <div className="flex items-center gap-2 py-4 text-xs text-[#8b949e]">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Fetching comments...</span>
        </div>
      ) : comments.length === 0 ? (
        <p className="text-[10px] text-[#6e7681] italic">No comments yet. Be the first to reply!</p>
      ) : (
        <div className="space-y-3.5 pl-3 border-l border-white/[0.04]">
          {comments.map(comment => (
            <div key={comment.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white">
                  {comment.profiles?.username || 'Anonymous'}
                </span>
                <span className="text-[8px] text-[#6e7681]">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-[#c9d1d9] leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Comment Form */}
      <form onSubmit={handlePostComment} className="flex gap-2 items-center">
        <input
          type="text"
          value={newCommentVal}
          onChange={e => setNewCommentVal(e.target.value)}
          placeholder="Write a reply..."
          className="flex-1 bg-[#0d1117] border border-white/[0.06] focus:border-white/12 focus:ring-1 focus:ring-white/10 rounded-xl py-2 px-3.5 text-xs text-white outline-none placeholder-[#6e7681]"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={!newCommentVal.trim() || isSubmitting}
          className="p-2 bg-accent-purple hover:bg-accent-purple-hover disabled:bg-slate-800 disabled:text-[#8b949e] text-white rounded-xl transition-colors flex items-center justify-center"
        >
          {isSubmitting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
        </button>
      </form>
    </div>
  )
}
