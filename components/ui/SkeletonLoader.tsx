export function SkeletonText({ className = '' }: { className?: string }) {
  return (
    <div className={`h-4 bg-surface-800 rounded animate-pulse ${className}`} />
  )
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`p-6 rounded-2xl bg-surface-950 border border-black/[0.06] dark:border-white/[0.06] flex flex-col gap-4 animate-pulse ${className}`}>
      <div className="w-12 h-12 rounded-xl bg-surface-800" />
      <div className="h-6 bg-surface-800 rounded-md w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-surface-800 rounded w-full" />
        <div className="h-4 bg-surface-800 rounded w-5/6" />
      </div>
      <div className="mt-auto h-4 bg-surface-800 rounded w-1/4" />
    </div>
  )
}

export function SkeletonArticle({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-2xl overflow-hidden bg-surface-950 border border-black/[0.06] dark:border-white/[0.06] flex flex-col animate-pulse ${className}`}>
      <div className="aspect-video bg-surface-800 w-full" />
      <div className="p-5 md:p-6 space-y-4">
        <div className="h-5 bg-surface-800 rounded w-1/4" />
        <div className="h-6 bg-surface-800 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-surface-800 rounded w-full" />
          <div className="h-4 bg-surface-800 rounded w-5/6" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-surface-800 rounded w-1/3" />
          <div className="h-4 bg-surface-800 rounded w-12" />
        </div>
      </div>
    </div>
  )
}
