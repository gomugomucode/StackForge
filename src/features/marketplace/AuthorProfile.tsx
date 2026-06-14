import type { PathAuthor } from './types'
import { Users, Award, BookOpen } from 'lucide-react'

interface AuthorProfileProps {
  author: PathAuthor
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <div className="bg-[#0d1117] border border-white/[0.05] rounded-2xl p-4.5 space-y-4">
      {/* Profile Header */}
      <div className="flex items-start gap-3.5">
        {/* Faux Avatar */}
        <div className="w-12 h-12 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-lg font-black text-accent-purple uppercase">
          {author.display_name[0]}
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white leading-none">
            {author.display_name}
          </h4>
          <div className="flex items-center gap-3.5 text-[9px] text-[#8b949e] font-bold">
            <span className="flex items-center gap-0.5">
              <Users className="w-3.5 h-3.5" />
              {author.follower_count.toLocaleString()} followers
            </span>
            <span className="flex items-center gap-0.5">
              <BookOpen className="w-3.5 h-3.5" />
              {author.path_count} paths
            </span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-[10px] text-[#c9d1d9] leading-relaxed italic">
        "{author.bio}"
      </p>

      {/* Specialties */}
      <div className="space-y-1.5 pt-1 border-t border-white/[0.03]">
        <span className="text-[8px] font-bold text-[#8b949e] uppercase tracking-wider block">
          Technical Specialties:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {author.specialties.map(spec => (
            <span
              key={spec}
              className="inline-flex items-center gap-0.5 text-[8px] font-bold px-2 py-0.2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple"
            >
              <Award className="w-2.5 h-2.5" />
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
export default AuthorProfile;
