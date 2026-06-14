import { useRef, useCallback, useEffect } from 'react'
import type { PlaygroundLanguage } from '@/lib/core/types/phase5'

interface CodeEditorProps {
  code: string
  language: PlaygroundLanguage
  onChange: (code: string) => void
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)

  const lines = code.split('\n')

  const syncScroll = useCallback(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const newCode = code.substring(0, start) + '  ' + code.substring(end)
      onChange(newCode)
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 2
          textareaRef.current.selectionEnd = start + 2
        }
      })
    }
    // Auto close brackets
    const pairs: Record<string, string> = { '{': '}', '(': ')', '[': ']', '"': '"', "'": "'" }
    if (pairs[e.key] && !e.ctrlKey && !e.metaKey) {
      const start = ta.selectionStart
      const end = ta.selectionEnd
      if (start === end) {
        e.preventDefault()
        const newCode = code.substring(0, start) + e.key + pairs[e.key] + code.substring(end)
        onChange(newCode)
        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = start + 1
            textareaRef.current.selectionEnd = start + 1
          }
        })
      }
    }
  }, [code, onChange])

  // Keep textarea in focus after code changes
  useEffect(() => {
    syncScroll()
  }, [code, syncScroll])

  return (
    <div className="relative flex h-full overflow-hidden bg-[#0d1117] select-none">
      {/* Line numbers column */}
      <div
        ref={lineNumbersRef}
        className="flex-none w-12 overflow-hidden pointer-events-none py-4 pr-3 text-right text-xs leading-6 text-[#6e7681] bg-[#0d1117] border-r border-white/[0.06]"
        aria-hidden="true"
      >
        {lines.map((_, i) => (
          <div key={i} className="h-6">{i + 1}</div>
        ))}
        {/* padding at bottom */}
        <div className="h-16" />
      </div>

      {/* Code textarea */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={syncScroll}
        className="flex-1 resize-none bg-transparent text-[#e6edf3] outline-none py-4 px-4 text-sm leading-6 caret-[#a78bfa] select-text"
        style={{ fontFamily: "'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace" }}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        autoComplete="off"
        aria-label="Code editor"
        placeholder="Write your code here..."
      />
    </div>
  )
}
