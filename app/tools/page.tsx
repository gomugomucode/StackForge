import { useState } from 'react'
import { Braces, Search, Copy, Check, Info } from 'lucide-react'
import { SEOHead } from '../components/ui/SEOHead'
import { SectionHeader, Card } from '../components/ui/SectionHeader'

export function ToolsPage() {
  const [activeTool, setActiveTool] = useState<'json' | 'regex'>('json')

  // JSON Formatter State
  const [jsonInput, setJsonInput] = useState('{\n  "name": "StackForge",\n  "version": "1.0.0",\n  "features": ["roadmap", "notes", "cheatsheets"]\n}')
  const [jsonOutput, setJsonOutput] = useState('')
  const [jsonError, setJsonError] = useState<string | null>(null)
  const [jsonCopied, setJsonCopied] = useState(false)

  // Regex Tester State
  const [regexPattern, setRegexPattern] = useState('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b')
  const [regexFlags, setRegexFlags] = useState('g')
  const [regexText, setRegexText] = useState('Send feedback to support@stackforge.dev or admin@stackforge.dev today!')
  const [regexMatches, setRegexMatches] = useState<{ match: string; index: number }[]>([])
  const [regexError, setRegexError] = useState<string | null>(null)

  // JSON Actions
  const handleFormatJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonOutput(JSON.stringify(parsed, null, 2))
      setJsonError(null)
    } catch (err: any) {
      setJsonError(err.message)
      setJsonOutput('')
    }
  }

  const handleMinifyJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonOutput(JSON.stringify(parsed))
      setJsonError(null)
    } catch (err: any) {
      setJsonError(err.message)
      setJsonOutput('')
    }
  }

  const handleCopyJSON = () => {
    if (jsonOutput) {
      navigator.clipboard.writeText(jsonOutput)
      setJsonCopied(true)
      setTimeout(() => setJsonCopied(false), 2000)
    }
  }

  // Regex Actions
  const handleTestRegex = () => {
    if (!regexPattern) {
      setRegexMatches([])
      setRegexError(null)
      return
    }
    try {
      const re = new RegExp(regexPattern, regexFlags)
      const matches = []
      let match
      if (regexFlags.includes('g')) {
        while ((match = re.exec(regexText)) !== null) {
          matches.push({ match: match[0], index: match.index })
        }
      } else {
        match = re.exec(regexText)
        if (match) {
          matches.push({ match: match[0], index: match.index })
        }
      }
      setRegexMatches(matches)
      setRegexError(null)
    } catch (err: any) {
      setRegexError(err.message)
      setRegexMatches([])
    }
  }

  return (
    <>
      <SEOHead
        title="Interactive Developer Tools - StackForge"
        description="Format/minify JSON, construct and validate regular expressions instantly in your browser."
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Utilities"
            title="Interactive"
            highlight="Developer Tools"
            description="Use useful dev utilities directly in your browser. All computations happen 100% locally on your machine."
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Tool Tabs Selector */}
            <div className="flex gap-4 border-b border-black/[0.06] dark:border-white/[0.06] pb-3 justify-center">
              <button
                onClick={() => setActiveTool('json')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTool === 'json'
                    ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Braces className="w-4 h-4" /> JSON Formatter / Validator
              </button>
              <button
                onClick={() => setActiveTool('regex')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTool === 'regex'
                    ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Search className="w-4 h-4" /> Regex Tester & Highlight
              </button>
            </div>

            {/* JSON FORMATTER TOOL DISPLAY */}
            {activeTool === 'json' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="flex flex-col space-y-4">
                  <h3 className="font-bold text-text-primary">Input JSON</h3>
                  <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    rows={12}
                    className="w-full p-4 rounded-xl font-mono text-sm bg-surface-950 border border-black/[0.06] dark:border-white/[0.06] text-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-accent-purple/20"
                    placeholder='Enter your raw JSON here...'
                  />
                  <div className="flex gap-2.5 mt-auto">
                    <button
                      onClick={handleFormatJSON}
                      className="flex-1 px-4 py-2.5 bg-accent-purple hover:bg-accent-violet text-white text-sm font-semibold rounded-xl transition-all shadow-md"
                    >
                      Beautify / Format
                    </button>
                    <button
                      onClick={handleMinifyJSON}
                      className="flex-1 px-4 py-2.5 border border-accent-purple/20 text-accent-purple bg-accent-purple/5 hover:bg-accent-purple hover:text-white text-sm font-semibold rounded-xl transition-all"
                    >
                      Minify
                    </button>
                  </div>
                </Card>

                <Card className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-text-primary">Output JSON</h3>
                    {jsonOutput && (
                      <button
                        onClick={handleCopyJSON}
                        className="p-2 rounded hover:bg-surface-850 text-text-muted hover:text-text-primary transition-all flex items-center gap-1 text-xs"
                      >
                        {jsonCopied ? (
                          <>
                            <Check className="w-4 h-4 text-accent-emerald" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" /> Copy Output
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="flex-1">
                    {jsonError ? (
                      <div className="p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/20 text-accent-rose text-sm font-semibold flex gap-2">
                        <Info className="w-5 h-5 shrink-0" />
                        <div>
                          <div>Invalid JSON syntax:</div>
                          <div className="font-mono text-xs mt-1">{jsonError}</div>
                        </div>
                      </div>
                    ) : jsonOutput ? (
                      <pre className="p-4 rounded-xl font-mono text-sm bg-surface-950 text-accent-emerald overflow-x-auto overflow-y-auto h-[290px] border border-black/[0.06] dark:border-white/[0.06]">
                        {jsonOutput}
                      </pre>
                    ) : (
                      <div className="h-[290px] flex items-center justify-center border border-dashed border-black/[0.06] dark:border-white/[0.06] rounded-xl text-text-muted text-sm">
                        Output results will render here.
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* REGEX TESTER TOOL DISPLAY */}
            {activeTool === 'regex' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-bold text-text-primary">Regular Expression</h3>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted font-mono">/</span>
                        <input
                          type="text"
                          value={regexPattern}
                          onChange={(e) => setRegexPattern(e.target.value)}
                          className="w-full pl-6 pr-6 py-2.5 rounded-xl font-mono text-sm bg-surface-950 border border-black/[0.06] dark:border-white/[0.06] text-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-accent-cyan/20"
                          placeholder="pattern"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted font-mono">/</span>
                      </div>
                      <input
                        type="text"
                        value={regexFlags}
                        onChange={(e) => setRegexFlags(e.target.value)}
                        className="w-16 text-center py-2.5 rounded-xl font-mono text-sm bg-surface-950 border border-black/[0.06] dark:border-white/[0.06] text-[#cbd5e1] focus:outline-none"
                        placeholder="flags"
                        title="Regex flags (e.g. g, i, m)"
                      />
                    </div>

                    <h3 className="font-bold text-text-primary">Test Subject Text</h3>
                    <textarea
                      value={regexText}
                      onChange={(e) => setRegexText(e.target.value)}
                      rows={5}
                      className="w-full p-4 rounded-xl font-mono text-sm bg-surface-950 border border-black/[0.06] dark:border-white/[0.06] text-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-accent-cyan/20"
                      placeholder="Enter subject lines here..."
                    />
                  </div>
                  
                  <button
                    onClick={handleTestRegex}
                    className="w-full mt-4 px-4 py-2.5 bg-accent-cyan hover:bg-cyan-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md"
                  >
                    Run Match Check
                  </button>
                </Card>

                <Card className="flex flex-col space-y-4">
                  <h3 className="font-bold text-text-primary">Match Results</h3>
                  
                  <div className="flex-1">
                    {regexError ? (
                      <div className="p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/20 text-accent-rose text-sm font-semibold flex gap-2">
                        <Info className="w-5 h-5 shrink-0" />
                        <div>
                          <div>Regex compilation error:</div>
                          <div className="font-mono text-xs mt-1">{regexError}</div>
                        </div>
                      </div>
                    ) : regexMatches.length > 0 ? (
                      <div className="space-y-3 max-h-[290px] overflow-y-auto">
                        <div className="text-xs font-semibold text-accent-cyan">{regexMatches.length} matches discovered:</div>
                        {regexMatches.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-surface-950 border border-black/[0.04] dark:border-white/[0.04] rounded-lg font-mono text-xs flex justify-between"
                          >
                            <span className="text-[#cbd5e1] font-bold">"{m.match}"</span>
                            <span className="text-text-muted">Index {m.index}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-[290px] flex items-center justify-center border border-dashed border-black/[0.06] dark:border-white/[0.06] rounded-xl text-text-muted text-sm text-center p-4">
                        No active regex matches found. Type a pattern and press Run Match Check.
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
