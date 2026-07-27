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
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 h-9 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background"
        aria-label={placeholder}
      />
    </div>
  )
}
