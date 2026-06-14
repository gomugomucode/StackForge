import { useState } from 'react'
import { Play, Save, Share2, Code2, RotateCcw, BookOpen } from 'lucide-react'
import { usePlayground } from '../features/playground/usePlayground'
import { CodeEditor } from '../features/playground/CodeEditor'
import { OutputPanel } from '../features/playground/OutputPanel'
import { LanguageSelector } from '../features/playground/LanguageSelector'
import { ShareModal } from '../features/playground/ShareModal'
import { saveSnippet, getSavedSnippets, DEFAULT_CODE } from '../features/playground/playgroundService'
import type { PlaygroundLanguage } from '../core/types/phase5'
import { SEOHead } from '../components/ui/SEOHead'
import { motion, AnimatePresence } from 'framer-motion'
import { Braces, ChevronDown } from 'lucide-react'

export function PlaygroundPage() {
  const {
    language, setLanguage,
    code, setCode,
    result, isRunning,
    title, setTitle,
    runCode, clearOutput,
    iframeRef,
  } = usePlayground('javascript')

  const [showShare, setShowShare] = useState(false)
  const [savedFeedback, setSavedFeedback] = useState(false)
  const [showSnippets, setShowSnippets] = useState(false)
  const [activePanel, setActivePanel] = useState<'output' | 'preview'>('output')

  const savedSnippets = getSavedSnippets()

  const handleSave = () => {
    saveSnippet(title, language, code, false)
    setSavedFeedback(true)
    setTimeout(() => setSavedFeedback(false), 2000)
  }

  const handleReset = () => {
    setCode(DEFAULT_CODE[language])
    clearOutput()
  }

  const isHtml = language === 'html'

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] overflow-hidden">
      <SEOHead
        title="Code Playground — StackForge Academy"
        description="Write, run, and share code snippets in JavaScript, TypeScript, HTML, Python, Go, and Rust."
      />

      {/* Hidden execution iframe */}
      <iframe
        ref={iframeRef}
        title="Code execution sandbox"
        className="hidden"
        sandbox="allow-scripts"
      />

      {/* ── Top Toolbar ── */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#161b22] border-b border-white/[0.08] flex-none flex-wrap">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-2">
          <div className="w-7 h-7 rounded-lg bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-accent-purple" />
          </div>
          <span className="text-xs font-black text-white hidden sm:block">Playground</span>
        </div>

        {/* Title input */}
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="flex-none w-40 px-2.5 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-white outline-none focus:border-accent-purple/40 transition-colors"
          placeholder="Untitled Snippet"
        />

        {/* Language selector */}
        <div className="flex-1 min-w-0">
          <LanguageSelector value={language} onChange={lang => { setLanguage(lang as PlaygroundLanguage); clearOutput() }} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-none">
          <button
            onClick={handleReset}
            className="p-2 text-[#6e7681] hover:text-white rounded-lg hover:bg-white/[0.06] transition-all"
            title="Reset to template"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all"
            style={savedFeedback
              ? { borderColor: '#22c55e', color: '#22c55e', background: '#22c55e11' }
              : { borderColor: 'rgba(255,255,255,0.12)', color: '#8b949e', background: 'rgba(255,255,255,0.04)' }}
          >
            <Save className="w-3.5 h-3.5" />
            {savedFeedback ? 'Saved!' : 'Save'}
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#8b949e] bg-white/[0.04] border border-white/[0.08] rounded-lg hover:border-accent-cyan/30 hover:text-accent-cyan transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-accent-purple hover:bg-accent-purple/90 disabled:opacity-50 rounded-lg shadow-lg shadow-accent-purple/20 transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            {isRunning ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      {/* ── Main Split Layout ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left: Saved snippets sidebar */}
        <AnimatePresence>
          {showSnippets && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-r border-white/[0.06] bg-[#0d1117] overflow-y-auto flex-none"
            >
              <div className="p-3 border-b border-white/[0.06]">
                <p className="text-xs font-bold text-[#6e7681] uppercase tracking-wider">Saved Snippets</p>
              </div>
              {savedSnippets.length === 0 ? (
                <p className="p-4 text-xs text-[#6e7681] italic">No saved snippets yet.</p>
              ) : (
                <div className="p-2 space-y-1">
                  {savedSnippets.map(s => (
                    <button
                      key={s.id}
                      onClick={() => { setCode(s.code); setLanguage(s.language); setTitle(s.title) }}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/[0.06] transition-colors group"
                    >
                      <p className="text-xs font-semibold text-[#e6edf3] group-hover:text-white truncate">{s.title}</p>
                      <p className="text-[10px] text-[#6e7681]">{s.language} · {new Date(s.created_at).toLocaleDateString()}</p>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar toggle */}
        <button
          onClick={() => setShowSnippets(!showSnippets)}
          className="flex-none w-6 bg-[#161b22] border-r border-white/[0.06] hover:bg-white/[0.04] transition-colors flex items-center justify-center"
          title={showSnippets ? 'Hide snippets' : 'Show snippets'}
        >
          <BookOpen className="w-3 h-3 text-[#6e7681] rotate-90" />
        </button>

        {/* Center: Code editor */}
        <div className="flex flex-col flex-1 min-w-0 min-h-0">
          <div className="flex-1 min-h-0 overflow-hidden">
            <CodeEditor code={code} language={language} onChange={setCode} />
          </div>

          {/* Bottom panel: output or HTML preview */}
          <div className="h-56 flex-none border-t border-white/[0.06] flex flex-col">
            {isHtml ? (
              <div className="flex flex-col h-full">
                <div className="flex border-b border-white/[0.06] bg-[#161b22]">
                  {(['output', 'preview'] as const).map(panel => (
                    <button
                      key={panel}
                      onClick={() => setActivePanel(panel)}
                      className={`px-4 py-2 text-xs font-bold transition-colors capitalize ${activePanel === panel ? 'text-white border-b-2 border-accent-purple' : 'text-[#6e7681] hover:text-white'}`}
                    >
                      {panel === 'preview' ? '🌐 Preview' : '⬛ Console'}
                    </button>
                  ))}
                </div>
                {activePanel === 'output' ? (
                  <OutputPanel result={result} isRunning={isRunning} onClear={clearOutput} />
                ) : (
                  <iframe
                    key={code}
                    srcDoc={code}
                    title="HTML Preview"
                    className="flex-1 w-full bg-white"
                    sandbox="allow-scripts"
                  />
                )}
              </div>
            ) : (
              <OutputPanel result={result} isRunning={isRunning} onClear={clearOutput} />
            )}
          </div>
        </div>
      </div>

      {/* Snippets floating toggle */}
      <button
        onClick={() => setShowSnippets(!showSnippets)}
        className="fixed bottom-6 left-6 flex items-center gap-2 px-3 py-2 bg-[#161b22] border border-white/[0.1] rounded-xl text-xs text-[#8b949e] hover:text-white shadow-xl transition-all sm:hidden"
      >
        <Braces className="w-3.5 h-3.5" />
        Snippets
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSnippets ? 'rotate-180' : ''}`} />
      </button>

      {/* Share modal */}
      {showShare && (
        <ShareModal
          code={code}
          language={language}
          title={title}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  )
}
