import type { MarketplacePath } from './types'
import { Star, Clock, Users, Award, ShieldCheck } from 'lucide-react'

interface PathCardProps {
  path: MarketplacePath
  isEnrolled: boolean
  onSelect: () => void
}

export function PathCard({ path, isEnrolled, onSelect }: PathCardProps) {
  return (
    <div
      onClick={onSelect}
      className="bg-[#161b22] border border-white/[0.05] hover:border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between min-h-[360px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group cursor-pointer"
    >
      {/* Thumbnail Gradient Header */}
      <div className={`h-32 bg-gradient-to-br ${path.thumbnail_gradient} relative flex items-center justify-center p-6 text-center overflow-hidden`}>
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        {/* Neon blur shapes */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-black/20 rounded-full blur-xl" />

        <h3 className="text-sm font-black text-white relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {path.title}
        </h3>

        {path.featured && (
          <span className="absolute top-3 right-3 flex items-center gap-0.5 text-[8px] font-black uppercase tracking-wider bg-white/10 border border-white/20 px-2 py-0.5 rounded-full text-white backdrop-blur-sm">
            <ShieldCheck className="w-2.5 h-2.5 text-accent-cyan" />
            <span>Featured</span>
          </span>
        )}
      </div>

      {/* Body details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Metadata */}
          <div className="flex items-center justify-between text-[10px] font-bold text-[#8b949e] flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-white">{path.rating_avg}</span>
              <span className="font-normal">({path.review_count} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5">
                <Clock className="w-3.5 h-3.5" />
                {path.duration}
              </span>
              <span className="flex items-center gap-0.5">
                <Users className="w-3.5 h-3.5" />
                {path.enrollment_count} enrolled
              </span>
            </div>
          </div>

          <p className="text-xs text-[#8b949e] line-clamp-3 leading-relaxed">
            {path.description}
          </p>
        </div>

        {/* Tech tags and Author */}
        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between items-end gap-3 flex-wrap">
            <div className="flex items-center gap-1 flex-wrap">
              {path.tech_labels.map(lbl => (
                <span
                  key={lbl}
                  className="text-[9px] font-bold px-2 py-0.2 rounded bg-white/[0.03] border border-white/[0.06] text-[#c9d1d9]"
                >
                  {lbl}
                </span>
              ))}
            </div>
            <span className="text-[10px] text-[#6e7681]">
              By <strong className="text-[#8b949e]">{path.author.display_name}</strong>
            </span>
          </div>

          {/* Action trigger */}
          <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-xs font-bold">
            <span className="text-[10px] uppercase tracking-wider text-accent-cyan">
              {path.price_type === 'free' ? 'Free Course' : 'Premium'}
            </span>
            <span className="text-white group-hover:text-accent-purple transition-colors flex items-center gap-1">
              {isEnrolled ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Enrolled
                </span>
              ) : (
                <span>View Details &rarr;</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PathCard;
