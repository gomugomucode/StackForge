import type { RunResult } from '@/lib/core/types/phase5'
import { Terminal, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react'

interface OutputPanelProps {
  result: RunResult | null
  isRunning: boolean
  onClear: () => void
}

const TYPE_STYLES = {
  log: 'text-[#e6edf3]',
  warn: 'text-[#f0c040]',
  error: 'text-[#ff7b72]',
  info: 'text-[#79c0ff]',
}

const TYPE_PREFIX = {
  log: '  ',
  warn: '⚠ ',
  error: '✖ ',
  info: 'ℹ ',
}

export function OutputPanel({ result, isRunning, onClear }: OutputPanelProps) {
  return (
    <div className="flex flex-col h-full bg-[#0d1117] border-t border-white/[0.06]">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-[#161b22]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#6e7681]" />
          <span className="text-xs font-bold text-[#6e7681] uppercase tracking-wider">Console Output</span>

          {result && !isRunning && (
            <div className="flex items-center gap-1.5 ml-3">
              {result.success
                ? <CheckCircle className="w-3 h-3 text-emerald-400" />
                : <XCircle className="w-3 h-3 text-red-400" />}
              <span className={`text-[10px] font-bold ${result.success ? 'text-emerald-400' : 'text-red-400'}`}>
                {result.success ? 'Completed' : 'Error'}
              </span>
              <Clock className="w-3 h-3 text-[#6e7681] ml-1" />
              <span className="text-[10px] text-[#6e7681]">{result.duration}ms</span>
            </div>
          )}
        </div>

        {result && (
          <button
            onClick={onClear}
            className="p-1 text-[#6e7681] hover:text-white transition-colors rounded"
            title="Clear output"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Output content */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-6">
        {isRunning ? (
          <div className="flex items-center gap-2 text-accent-cyan">
            <span className="inline-flex gap-1">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
            <span className="text-xs text-[#6e7681]">Executing...</span>
          </div>
        ) : result ? (
          result.entries.length === 0 ? (
            <p className="text-[#6e7681] text-xs italic">No output produced.</p>
          ) : (
            <div className="space-y-0.5">
              {result.entries.map((entry, i) => (
                <div key={i} className={`flex gap-2 text-xs ${TYPE_STYLES[entry.type]}`}>
                  <span className="text-[#6e7681] select-none flex-none">{TYPE_PREFIX[entry.type]}</span>
                  <pre className="whitespace-pre-wrap break-all">{entry.message}</pre>
                </div>
              ))}
            </div>
          )
        ) : (
          <p className="text-[#6e7681] text-xs italic">
            Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">▶ Run</kbd> to execute your code.
          </p>
        )}
      </div>
    </div>
  )
}
