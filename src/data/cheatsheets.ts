export interface CheatSheetSection {
  title: string;
  items: {
    name: string;
    code: string;
    description: string;
  }[];
}

export interface CheatSheet {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  language: string;
  sections: CheatSheetSection[];
}

export const cheatsheets: CheatSheet[] = [
  {
    id: 'js-1',
    slug: 'javascript',
    title: 'JavaScript Modern Essentials',
    description: 'The most critical ES6+ patterns for modern web development.',
    category: 'Language',
    language: 'javascript',
    sections: [
      {
        title: 'Array Methods',
        items: [
          { name: 'Map', code: 'const double = arr.map(x => x * 2)', description: 'Creates a new array with results of calling a provided function on every element.' },
          { name: 'Filter', code: 'const filtered = arr.filter(x => x > 10)', description: 'Creates a shallow copy of a portion of a given array.' },
          { name: 'Reduce', code: 'const sum = arr.reduce((a, b) => a + b, 0)', description: 'Execute a reducer function on each element of the array.' },
        ]
      },
      {
        title: 'Async Patterns',
        items: [
          { name: 'Async/Await', code: 'async function fetch() {\n  const res = await fetch(url);\n  const data = await res.json();\n}', description: 'Syntactic sugar for Promises.' },
          { name: 'Promise.all', code: 'await Promise.all([p1, p2, p3])', description: 'Wait for all promises to resolve.' },
        ]
      }
    ]
  },
  {
    id: 'react-1',
    slug: 'react',
    title: 'React 19 Mastery',
    description: 'Essential hooks and patterns for building performant React apps.',
    category: 'Framework',
    language: 'javascript',
    sections: [
      {
        title: 'State Management',
        items: [
          { name: 'useState', code: 'const [state, setState] = useState(initial)', description: 'Adds a state variable to your component.' },
          { name: 'useReducer', code: 'const [state, dispatch] = useReducer(reducer, initial)', description: 'Alternative to useState for complex state logic.' },
        ]
      },
      {
        title: 'Optimization',
        items: [
          { name: 'useMemo', code: 'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])', description: 'Memoizes a computed value.' },
          { name: 'useCallback', code: 'const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b])', description: 'Memoizes a function definition.' },
        ]
      }
    ]
  },
  {
    id: 'ts-1',
    slug: 'typescript',
    title: 'TypeScript Power User',
    description: 'Advanced typing and generics for bulletproof applications.',
    category: 'Language',
    language: 'typescript',
    sections: [
      {
        title: 'Utility Types',
        items: [
          { name: 'Partial', code: 'type PartialUser = Partial<User>', description: 'Constructs a type with all properties of T set to optional.' },
          { name: 'Pick', code: 'type UserPreview = Pick<User, "name" | "email">', description: 'Constructs a type by picking a set of properties from T.' },
        ]
      },
      {
        title: 'Generics',
        items: [
          { name: 'Generic Function', code: 'function wrapInArray<T>(value: T): T[] {\n  return [value];\n}', description: 'Reusable functions that work with multiple types.' },
        ]
      }
    ]
  },
  {
    id: 'git-1',
    slug: 'git',
    title: 'Git Workflow Pro',
    description: 'Essential commands for professional version control.',
    category: 'Tool',
    language: 'bash',
    sections: [
      {
        title: 'Basic Operations',
        items: [
          { name: 'Commit', code: 'git commit -m "Your message"', description: 'Save changes to the local repository.' },
          { name: 'Push', code: 'git push origin main', description: 'Upload local commits to the remote repository.' },
        ]
      },
      {
        title: 'Advanced Recovery',
        items: [
          { name: 'Rebase', code: 'git rebase main', description: 'Reapply commits on top of another base tip.' },
          { name: 'Cherry Pick', code: 'git cherry-pick <commit-hash>', description: 'Apply the changes introduced by some existing commits.' },
        ]
      }
    ]
  },
  {
    id: 'docker-1',
    slug: 'docker',
    title: 'Docker Containerization',
    description: 'Quick reference for containerizing your applications.',
    category: 'DevOps',
    language: 'bash',
    sections: [
      {
        title: 'Common Commands',
        items: [
          { name: 'Build', code: 'docker build -t image-name .', description: 'Build an image from a Dockerfile.' },
          { name: 'Run', code: 'docker run -p 80:80 image-name', description: 'Run a container from an image.' },
        ]
      },
      {
        title: 'Docker Compose',
        items: [
          { name: 'Up', code: 'docker-compose up -d', description: 'Start services in detached mode.' },
          { name: 'Down', code: 'docker-compose down', description: 'Stop and remove containers and networks.' },
        ]
      }
    ]
  },
]
