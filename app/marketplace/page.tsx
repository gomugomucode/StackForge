import { useState } from 'react'
import { useMarketplace } from '@/features/marketplace/useMarketplace'
import { PathCard } from '@/features/marketplace/PathCard'
import { PathDetailModal } from '@/features/marketplace/PathDetailModal'
import { SEOHead } from '@/components/ui/SEOHead'
import { Search, SlidersHorizontal, BookOpen, Heart, Cpu, Loader2 } from 'lucide-react'

export default function MarketplacePage() {
  const {
    paths,
    allPathsCount,
    enrolledPathIds,
    searchQuery,
    setSearchQuery,
    levelFilter,
    setLevelFilter,
    priceFilter,
    setPriceFilter,
    isLoading,
    enrollInPath,
    addPathReview,
    reviews,
  } = useMarketplace()

  const [selectedPathId, setSelectedPathId] = useState<string | null>(null)

  // Retrieve details for currently opened path
  const selectedPath = paths.find(p => p.id === selectedPathId)
  const selectedPathReviews = selectedPath ? reviews[selectedPath.id] || [] : []

  return (
    <>
      <SEOHead
        title="Learning Path Marketplace | StackForge Academy"
        description="Browse, enroll, and review custom syllabus roadmaps built by professional instructors and senior developers."
      />

      <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] py-10 select-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#21262d] pb-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-accent-cyan uppercase tracking-widest block">
                Crowdsourced Roadmaps
              </span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Path Marketplace
              </h1>
              <p className="text-xs text-[#8b949e] max-w-xl leading-relaxed">
                Discover specialized learning paths created by the community. Enroll to add modules directly to your learning dashboard.
              </p>
            </div>
            
            <div className="flex items-center gap-3.5 bg-[#161b22] border border-white/[0.04] px-4 py-2.5 rounded-2xl text-xs">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <BookOpen className="w-4 h-4 text-accent-purple" />
                <span>{allPathsCount} Curriculum Tracks available</span>
              </div>
            </div>
          </div>

          {/* Search and Filters Toolbar */}
          <div className="bg-[#161b22] border border-white/[0.05] rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8b949e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search paths by title, tags, or description..."
                  className="w-full bg-[#0d1117] border border-white/[0.06] focus:border-white/12 focus:ring-1 focus:ring-white/10 rounded-xl py-2.5 pl-11 pr-4 text-xs text-white outline-none placeholder-[#8b949e]"
                />
              </div>

              {/* Dropdowns */}
              <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                {/* Level selector */}
                <div className="flex items-center gap-2 bg-[#0d1117] border border-white/[0.05] rounded-xl px-3 py-1.5">
                  <span className="text-[10px] font-bold text-[#8b949e] uppercase">Level:</span>
                  <select
                    value={levelFilter}
                    onChange={e => setLevelFilter(e.target.value)}
                    className="bg-transparent text-xs text-white outline-none border-none pr-3 cursor-pointer"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Price type selector */}
                <div className="flex items-center gap-2 bg-[#0d1117] border border-white/[0.05] rounded-xl px-3 py-1.5">
                  <span className="text-[10px] font-bold text-[#8b949e] uppercase">Type:</span>
                  <select
                    value={priceFilter}
                    onChange={e => setPriceFilter(e.target.value)}
                    className="bg-transparent text-xs text-white outline-none border-none pr-3 cursor-pointer"
                  >
                    <option value="all">All Pricing</option>
                    <option value="free">Free Paths</option>
                    <option value="premium">Premium Paths</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* Grid display */}
          {isLoading ? (
            <div className="text-center py-24 bg-[#161b22]/30 border border-white/[0.04] rounded-3xl space-y-3">
              <Loader2 className="w-8 h-8 text-accent-cyan animate-spin mx-auto" />
              <p className="text-xs text-[#8b949e] animate-pulse">Syncing learning catalog...</p>
            </div>
          ) : paths.length === 0 ? (
            <div className="text-center py-24 bg-[#161b22]/30 border border-dashed border-white/[0.04] rounded-3xl space-y-3">
              <Cpu className="w-12 h-12 text-[#30363d] mx-auto" />
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-[#8b949e]">No Catalog Paths Found</h3>
                <p className="text-[10px] text-[#6e7681]">
                  Try adjusting your search queries or resetting level/pricing filters.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paths.map(path => {
                const isEnrolled = enrolledPathIds.includes(path.id)
                return (
                  <PathCard
                    key={path.id}
                    path={path}
                    isEnrolled={isEnrolled}
                    onSelect={() => setSelectedPathId(path.id)}
                  />
                )
              })}
            </div>
          )}

        </div>
      </div>

      {/* DETAIL OVERLAY MODAL */}
      {selectedPath && (
        <PathDetailModal
          path={selectedPath}
          reviews={selectedPathReviews}
          isEnrolled={enrolledPathIds.includes(selectedPath.id)}
          onClose={() => setSelectedPathId(null)}
          onEnroll={() => enrollInPath(selectedPath.id)}
          onAddReview={(user: string, rating: number, body: string) => addPathReview(selectedPath.id, user, rating, body)}
        />
      )}
    </>
  )
}
export default MarketplacePage;
