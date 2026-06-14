import { useState } from 'react'
import type { CommunityPost } from './types'
import { CommentThread } from './CommentThread'
import { ThumbsUp, MessageSquare, Share2, Award, ExternalLink } from 'lucide-react'

interface PostCardProps {
  post: CommunityPost
  onUpvote: (postId: string) => void
}

const CATEGORY_COLORS: Record<string, string> = {
  question: 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple',
  discussion: 'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan',
  showcase: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  tip: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  challenge: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
}

export function PostCard({ post, onUpvote }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [hasUpvoted, setHasUpvoted] = useState(false)

  const handleUpvote = () => {
    if (hasUpvoted) return
    onUpvote(post.id)
    setHasUpvoted(true)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/community#post-${post.id}`)
    alert('Link to discussion copied to clipboard!')
  }

  return (
    <div
      id={`post-${post.id}`}
      className="bg-[#161b22] border border-white/[0.05] rounded-3xl p-5 space-y-4 hover:border-white/10 transition-colors shadow-sm"
    >
      {/* Header metadata */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Faux Avatar */}
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-white uppercase">
            {post.profiles?.username?.[0] || 'A'}
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-white">
                {post.profiles?.username || 'Anonymous'}
              </span>
              {post.profiles?.level && (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 rounded-full">
                  <Award className="w-2.5 h-2.5" />
                  Lvl {post.profiles.level}
                </span>
              )}
            </div>
            <div className="text-[10px] text-[#8b949e]">
              {new Date(post.created_at).toLocaleDateString(undefined, {
                dateStyle: 'medium',
              })}{' '}
              at{' '}
              {new Date(post.created_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>

        <span
          className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 border rounded-full ${
            CATEGORY_COLORS[post.category] || 'bg-white/5 border-white/10 text-white/80'
          }`}
        >
          {post.category}
        </span>
      </div>

      {/* Post title & content */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-white leading-snug">{post.title}</h3>
        <p className="text-xs text-[#c9d1d9] whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-[9px] font-semibold px-2 py-0.5 bg-[#0d1117] border border-white/[0.05] rounded-lg text-[#8b949e]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-5 pt-2 border-t border-white/[0.04] text-[#8b949e]">
        <button
          onClick={handleUpvote}
          disabled={hasUpvoted}
          className={`flex items-center gap-1.5 text-[11px] font-semibold transition-colors duration-200 ${
            hasUpvoted ? 'text-accent-cyan' : 'hover:text-white'
          }`}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-accent-cyan/10' : ''}`} />
          <span>{post.upvotes} Upvotes</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center gap-1.5 text-[11px] font-semibold transition-colors duration-200 ${
            showComments ? 'text-accent-purple' : 'hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{post.comment_count} Comments</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-[11px] font-semibold hover:text-white transition-colors duration-200"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Expandable comments thread */}
      {showComments && <CommentThread postId={post.id} />}
    </div>
  )
}
