import type { CheatsheetCommand } from '../types'

export const reactCheatsheet: CheatsheetCommand[] = [
  {
    command: 'useState()',
    description: 'Declares a state variable that you can update directly.',
    example: 'const [state, setState] = useState(initialState);',
    category: 'Hooks',
  },
  {
    command: 'useEffect()',
    description: 'Declares side effect logic synchronization.',
    example: 'useEffect(() => {\n  console.log("Mounted");\n  return () => console.log("Cleaned up");\n}, [dependencies]);',
    category: 'Hooks',
  },
  {
    command: 'useContext()',
    description: 'Reads and subscribes to a context from your component.',
    example: 'const theme = useContext(ThemeContext);',
    category: 'Hooks',
  },
  {
    command: 'useRef()',
    description: 'Persists mutable value references without triggering rendering loops.',
    example: 'const inputRef = useRef(null);\n// access via inputRef.current',
    category: 'Hooks',
  },
]
