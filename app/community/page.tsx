import { useState } from 'react'
import { SEOHead } from '@/components/ui/SEOHead'
import { usePosts } from '../features/community/usePosts'
import { useLeaderboard } from '../features/community/useLeaderboard'
import { PostCard } from '../features/community/PostCard'
import { LeaderboardTable } from '../features/community/LeaderboardTable'
import { StudyGroupCard } from '../features/community/StudyGroupCard'
import { ChallengeCard } from '../features/community/ChallengeCard'
import { CreatePostModal } from '../features/community/CreatePostModal'
import { MessageSquare, Users, Sparkles, Send, Loader2 } from 'lucide-react'

const TABS = [
  { id: 'all', label: 'All Feed' },
  { id: 'question', label: 'Questions' },
  { id: 'discussion', label: 'Discussions' },
  { id: 'showcase', label: 'Showcases' },
  { id: 'tip', label: 'Tips' },
]

export function CommunityPage() {
  const {
    posts,
    isLoading: postsLoading,
    category,
    setCategory,
    createPost,
    upvotePost,
  } = usePosts('all')

  const {
    leaderboard,
    studyGroups,
    challenges,
    isLoading: leaderboardLoading,
    toggleJoinGroup,
    submitChallenge,
  } = useLeaderboard()

  const [isNewPostOpen, setIsNewPostOpen] = useState(false)

  const isLoading = postsLoading || leaderboardLoading

  return (
    <>
      <SEOHead
        title="StackForge Academy Community | Discussions & Challenges"
        description="Join discussions with developers, review coding challenges, check leaderboard rankings, and sign up for study groups."
      />

      <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] py-10 select-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-[#21262d] pb-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-accent-purple uppercase tracking-widest block">
                Colleague Workspace
              </span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Community Hub
              </h1>
              <p className="text-xs text-[#8b949e] max-w-xl leading-relaxed">
                Review development questions, participate in weekly active challenges, track top students, and sync up in study groups.
              </p>
            </div>

            <button
              onClick={() => setIsNewPostOpen(true)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-5 bg-accent-purple hover:bg-accent-purple-hover text-white rounded-xl text-xs font-bold shadow-lg shadow-accent-purple/10 hover:shadow-accent-purple/20 transition-all duration-200 self-start"
            >
              <Send className="w-3.5 h-3.5" />
              <span>New Discussion</span>
            </button>
          </div>

          {/* Grid Layout: Main Feed vs Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT FEED PANEL (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Category Tabs */}
              <div className="flex items-center gap-1 bg-[#161b22] border border-white/[0.04] p-1 rounded-2xl overflow-x-auto scrollbar-none">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setCategory(tab.id)}
                    className={`flex-shrink-0 px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                      category === tab.id
                        ? 'bg-[#21262d] text-white'
                        : 'text-[#8b949e] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Feed Content */}
              {postsLoading ? (
                <div className="text-center py-20 bg-[#161b22]/30 border border-white/[0.04] rounded-3xl space-y-3">
                  <Loader2 className="w-8 h-8 text-accent-purple animate-spin mx-auto" />
                  <p className="text-xs text-[#8b949e] animate-pulse">Syncing discussions feed...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-20 bg-[#161b22]/30 border border-dashed border-white/[0.04] rounded-3xl space-y-3">
                  <MessageSquare className="w-12 h-12 text-[#30363d] mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-[#8b949e]">Feed is Empty</h3>
                    <p className="text-[10px] text-[#6e7681]">
                      No posts found in this category. Write the first post to trigger conversations!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map(post => (
                    <PostCard key={post.id} post={post} onUpvote={upvotePost} />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR PANEL (1/3 width) */}
            <div className="space-y-8">
              {/* Leaderboard */}
              {leaderboardLoading ? (
                <div className="bg-[#161b22] border border-white/[0.05] p-6 rounded-3xl text-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-amber-400 mx-auto" />
                </div>
              ) : (
                <LeaderboardTable entries={leaderboard} />
              )}

              {/* Coding Challenges */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 px-1">
                  <Sparkles className="w-4 h-4 text-accent-cyan" />
                  <span>Coding Challenges</span>
                </h3>
                {leaderboardLoading ? (
                  <div className="bg-[#161b22] border border-white/[0.05] p-6 rounded-3xl text-center py-6">
                    <Loader2 className="w-6 h-6 animate-spin text-accent-cyan mx-auto" />
                  </div>
                ) : challenges.length === 0 ? (
                  <p className="text-[10px] text-[#6e7681] px-1 italic">No active challenges right now.</p>
                ) : (
                  <div className="space-y-3">
                    {challenges.map(chal => (
                      <ChallengeCard
                        key={chal.id}
                        challenge={chal}
                        onSubmit={submitChallenge}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Study Groups */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 px-1">
                  <Users className="w-4 h-4 text-accent-purple" />
                  <span>Study Circles</span>
                </h3>
                {leaderboardLoading ? (
                  <div className="bg-[#161b22] border border-white/[0.05] p-6 rounded-3xl text-center py-6">
                    <Loader2 className="w-6 h-6 animate-spin text-accent-purple mx-auto" />
                  </div>
                ) : studyGroups.length === 0 ? (
                  <p className="text-[10px] text-[#6e7681] px-1 italic">No active groups available.</p>
                ) : (
                  <div className="space-y-3">
                    {studyGroups.map(group => (
                      <StudyGroupCard
                        key={group.id}
                        group={group}
                        onToggleJoin={toggleJoinGroup}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* CREATE POST MODAL */}
      {isNewPostOpen && (
        <CreatePostModal
          onClose={() => setIsNewPostOpen(false)}
          onSubmit={createPost}
        />
      )}
    </>
  )
}
export default CommunityPage;
