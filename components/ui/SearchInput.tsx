import { Search as SearchIcon } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  id?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  id = 'search',
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <SearchIcon
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-950 border border-black/[0.06] dark:border-white/[0.06] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple/50 focus:ring-2 focus:ring-accent-purple/20 transition-all"
        aria-label={placeholder}
      />
    </div>
  )
}
