import { useState, useRef, useCallback, useEffect } from 'react'
import type { PlaygroundLanguage, TestCase, RunResult, ConsoleEntry } from '@/lib/core/types/phase5'
import { DEFAULT_CODE } from './playgroundService'

const EXECUTION_TIMEOUT = 5000 // 5 seconds

function stripTypeScript(code: string): string {
  // Very basic TS → JS: strip type annotations
  return code
    .replace(/:\s*(string|number|boolean|void|any|unknown|never|undefined|null|object)\b/g, '')
    .replace(/interface\s+\w+\s*\{[^}]*\}/g, '')
    .replace(/<[A-Za-z]+>/g, '')
    .replace(/\bas\s+\w+/g, '')
}

export function usePlayground(initialLanguage: PlaygroundLanguage = 'javascript') {
  const [language, setLanguage] = useState<PlaygroundLanguage>(initialLanguage)
  const [code, setCode] = useState<string>(DEFAULT_CODE[initialLanguage])
  const [result, setResult] = useState<RunResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [testCases, setTestCases] = useState<TestCase[]>([])
  const [title, setTitle] = useState('Untitled Snippet')
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    setCode(DEFAULT_CODE[language])
    setResult(null)
  }, [language])

  const runCode = useCallback(async () => {
    setIsRunning(true)
    setResult(null)

    const startTime = performance.now()

    // HTML preview mode
    if (language === 'html') {
      const duration = performance.now() - startTime
      setResult({
        success: true,
        entries: [{ type: 'log', message: '🌐 HTML preview rendered below.', timestamp: Date.now() }],
        duration,
      })
      setIsRunning(false)
      return
    }

    // Non-runnable languages
    if (!['javascript', 'typescript'].includes(language)) {
      const duration = performance.now() - startTime
      setResult({
        success: false,
        entries: [{
          type: 'warn',
          message: `⚠️ ${language.charAt(0).toUpperCase() + language.slice(1)} cannot run in-browser. Copy the code and run it in your local environment.`,
          timestamp: Date.now(),
        }],
        duration,
      })
      setIsRunning(false)
      return
    }

    const entries: ConsoleEntry[] = []
    let resolved = false

    await new Promise<void>((resolve) => {
      const timeout = setTimeout(() => {
        if (!resolved) {
          entries.push({ type: 'error', message: '⏱ Execution timed out after 5 seconds.', timestamp: Date.now() })
          resolved = true
          resolve()
        }
      }, EXECUTION_TIMEOUT)

      const handleMessage = (event: MessageEvent) => {
        if (event.data?.source !== 'stackforge-playground') return
        if (event.data.type === 'done') {
          resolved = true
          clearTimeout(timeout)
          window.removeEventListener('message', handleMessage)
          resolve()
        } else if (event.data.type && event.data.message !== undefined) {
          entries.push({ type: event.data.type, message: event.data.message, timestamp: Date.now() })
        }
      }

      window.addEventListener('message', handleMessage)
      cleanupRef.current = () => {
        clearTimeout(timeout)
        window.removeEventListener('message', handleMessage)
      }

      const runCode = language === 'typescript' ? stripTypeScript(code) : code

      const srcdoc = `<!DOCTYPE html><html><head></head><body><script>
(function() {
  const _send = (type, ...args) => {
    const message = args.map(a => {
      try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); }
      catch { return String(a); }
    }).join(' ');
    window.parent.postMessage({ source: 'stackforge-playground', type, message }, '*');
  };
  window.console = {
    log: (...a) => _send('log', ...a),
    warn: (...a) => _send('warn', ...a),
    error: (...a) => _send('error', ...a),
    info: (...a) => _send('info', ...a),
  };
  window.onerror = (msg, src, line, col) => {
    _send('error', \`Line \${line}:\${col} — \${msg}\`);
    window.parent.postMessage({ source: 'stackforge-playground', type: 'done' }, '*');
    return true;
  };
  try {
    ${runCode}
  } catch (e) {
    _send('error', e.message);
  } finally {
    window.parent.postMessage({ source: 'stackforge-playground', type: 'done' }, '*');
  }
})();
<\/script></body></html>`

      if (iframeRef.current) {
        iframeRef.current.srcdoc = srcdoc
      }
    })

    const duration = performance.now() - startTime
    const hasErrors = entries.some(e => e.type === 'error')

    setResult({
      success: !hasErrors,
      entries,
      duration: Math.round(duration),
    })
    setIsRunning(false)
  }, [code, language])

  const addTestCase = useCallback((tc: Omit<TestCase, 'id'>) => {
    setTestCases(prev => [...prev, { ...tc, id: Math.random().toString(36).slice(2) }])
  }, [])

  const removeTestCase = useCallback((id: string) => {
    setTestCases(prev => prev.filter(tc => tc.id !== id))
  }, [])

  const clearOutput = useCallback(() => setResult(null), [])

  useEffect(() => {
    return () => cleanupRef.current?.()
  }, [])

  return {
    language, setLanguage,
    code, setCode,
    result,
    isRunning,
    testCases,
    addTestCase, removeTestCase,
    title, setTitle,
    runCode, clearOutput,
    iframeRef,
  }
}
