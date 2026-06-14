import { useState } from 'react'
import type { MarketplacePath, PathReview } from './types'
import { AuthorProfile } from './AuthorProfile'
import { X, Calendar, Star, Check, Award, MessageSquare, Send, BookOpen, Clock, ShieldCheck } from 'lucide-react'
import { getUserName } from '@/lib/core/hooks/useProgress'

interface PathDetailModalProps {
  path: MarketplacePath
  reviews: PathReview[]
  isEnrolled: boolean
  onClose: () => void
  onEnroll: () => void
  onAddReview: (username: string, rating: number, body: string) => void
}

export function PathDetailModal({
  path,
  reviews,
  isEnrolled,
  onClose,
  onEnroll,
  onAddReview,
}: PathDetailModalProps) {
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewBody, setReviewBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewBody.trim() || isSubmitting) return

    setIsSubmitting(true)
    // Small mock write delay
    await new Promise(r => setTimeout(r, 600))
    
    const username = getUserName() || 'Anonymous'
    onAddReview(username, reviewRating, reviewBody.trim())
    setReviewBody('')
    setReviewRating(5)
    setIsSubmitting(false)
    alert('Thank you! Your review has been added.')
  }

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn select-text">
      {/* Modal Container */}
      <div className="bg-[#161b22] border border-white/[0.08] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col scrollbar-thin scrollbar-thumb-white/[0.05]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/[0.05] rounded-xl text-[#8b949e] hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className={`p-6 sm:p-8 bg-gradient-to-br ${path.thumbnail_gradient} relative overflow-hidden text-left flex-shrink-0`}>
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:14px_24px]" />
          
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full text-white backdrop-blur-sm inline-block">
              {path.level} Developer Track
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-sm">
              {path.title}
            </h2>
            <p className="text-xs text-white/90 leading-relaxed drop-shadow-sm">
              {path.description}
            </p>
          </div>
        </div>

        {/* Modal Body Columns */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* LEFT COLUMN: CURRICULUM & REVIEWS (2/3 width) */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Curriculum Segment */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-accent-purple" />
                <span>Path Syllabus & Curriculum</span>
              </h3>
              
              <div className="space-y-3.5 pl-1">
                {path.curriculum.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-[#0d1117] border border-white/[0.04] p-4.5 rounded-2xl space-y-3"
                  >
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <h4 className="text-xs font-bold text-white">{section.title}</h4>
                      <span className="text-[9px] text-[#8b949e] font-mono">{section.duration}</span>
                    </div>

                    <ul className="list-disc pl-4 space-y-1 text-[10px] text-[#c9d1d9]">
                      {section.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="leading-relaxed">{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Segment */}
            <div className="space-y-6 pt-4 border-t border-white/[0.04]">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-accent-cyan" />
                <span>Student Feedbacks ({reviews.length})</span>
              </h3>

              {/* Leave a Review Form */}
              <form onSubmit={handleReviewSubmit} className="bg-[#0d1117] border border-white/[0.04] p-4.5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-xs font-bold text-white">Write a Review</h4>
                  
                  {/* Stars input */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-0.5"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={reviewBody}
                    onChange={e => setReviewBody(e.target.value)}
                    placeholder="Describe your learning experience..."
                    className="flex-1 bg-[#161b22] border border-white/[0.06] focus:border-white/12 focus:ring-1 focus:ring-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none placeholder-[#6e7681]"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={!reviewBody.trim() || isSubmitting}
                    className="p-2.5 bg-accent-cyan hover:bg-accent-cyan/95 disabled:bg-slate-800 disabled:text-[#8b949e] text-slate-900 rounded-xl transition-colors flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              {reviews.length === 0 ? (
                <p className="text-[10px] text-[#6e7681] italic">No reviews for this learning path yet.</p>
              ) : (
                <div className="space-y-4 pl-1">
                  {reviews.map(rev => (
                    <div
                      key={rev.id}
                      className="bg-[#0d1117]/40 border border-white/[0.03] p-4 rounded-xl space-y-2.5 text-xs"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{rev.username}</span>
                          <span className="text-[9px] text-[#6e7681]">
                            {new Date(rev.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-[11px] text-[#c9d1d9] leading-relaxed">
                        {rev.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: AUTHOR PROFILE & ENROLLMENT (1/3 width) */}
          <div className="space-y-6">
            
            {/* Enrollment box */}
            <div className="bg-[#0d1117] border border-white/[0.05] p-5 rounded-2xl space-y-4 text-center">
              <div className="space-y-2">
                <span className="text-[10px] text-[#8b949e] uppercase tracking-wider block">
                  Course Enrollment
                </span>
                
                <div className="flex justify-center items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-[#8b949e]" />
                  <span>{path.duration} Syllabus</span>
                </div>
              </div>

              {isEnrolled ? (
                <div className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Enrolled Course</span>
                </div>
              ) : (
                <button
                  onClick={onEnroll}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-accent-purple hover:bg-accent-purple-hover text-white rounded-xl text-xs font-bold shadow-lg shadow-accent-purple/10 hover:shadow-accent-purple/20 transition-all duration-200"
                >
                  <Award className="w-4 h-4" />
                  <span>Enroll in Path</span>
                </button>
              )}

              <p className="text-[9px] text-[#6e7681] leading-snug">
                Enrolled paths will be cached in your profile progress dashboard automatically.
              </p>
            </div>

            {/* Author Profile */}
            <div className="space-y-2.5">
              <h3 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider px-1">
                Instructor Details
              </h3>
              <AuthorProfile author={path.author} />
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
export default PathDetailModal;
