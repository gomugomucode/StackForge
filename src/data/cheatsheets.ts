export interface CheatSheetItem {
  name: string;
  code: string;
  description: string;
  whatIsIt?: string;
  syntax?: string;
  examples?: string[];
  commonMistakes?: string[];
  bestPractices?: string[];
  interviewNotes?: string;
}

export interface CheatSheetSection {
  title: string;
  items: CheatSheetItem[];
}

export interface CheatSheet {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  language: string;
  sections: CheatSheetSection[];
  quickReference: string[];
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
          { name: 'Map', code: 'const double = arr.map(x => x * 2)', description: 'Creates a new array with results of calling a provided function on every element.', whatIsIt: 'A transformation method that creates a new array of the same length.', syntax: 'array.map((element, index, array) => { ... })', examples: ['const squares = [1,2,3].map(x => x * x); // [1,4,9]'], commonMistakes: ['Using map when you don\'t return a value (use forEach instead)'], bestPractices: ['Always return a value from the map callback'], interviewNotes: 'Complexity: O(n) time, O(n) space.' },
          { name: 'Filter', code: 'const filtered = arr.filter(x => x > 10)', description: 'Creates a shallow copy of a portion of a given array.', whatIsIt: 'A selection method that creates a new array with all elements that pass the test.', syntax: 'array.filter((element, index, array) => { ... })', examples: ['const evens = [1,2,3,4].filter(x => x % 2 === 0); // [2,4]'], commonMistakes: ['Mutating the original array inside the filter callback'], bestPractices: ['Keep filter callbacks pure'], interviewNotes: 'Complexity: O(n) time, O(n) space.' },
          { name: 'Reduce', code: 'const sum = arr.reduce((a, b) => a + b, 0)', description: 'Execute a reducer function on each element of the array.', whatIsIt: 'A powerful method to accumulate a single value from an array.', syntax: 'array.reduce((accumulator, currentValue, currentIndex, array) => { ... }, initialValue)', examples: ['const sum = [1,2,3].reduce((acc, curr) => acc + curr, 0); // 6'], commonMistakes: ['Forgetting the initial value, which leads to errors on empty arrays'], bestPractices: ['Always provide an initial value for clarity and safety'], interviewNotes: 'The most versatile array method, can implement map and filter.' },
        ]
      },
      {
        title: 'Async Patterns',
        items: [
          { name: 'Async/Await', code: 'async function fetch() {\n  const res = await fetch(url);\n  const data = await res.json();\n}', description: 'Syntactic sugar for Promises.', whatIsIt: 'A way to write asynchronous code that looks synchronous.', syntax: 'async function name() { await promise; }', examples: ['async function getData() {\n  try {\n    const response = await fetch("api/data");\n    return await response.json();\n  } catch (e) { console.error(e); }\n}'], commonMistakes: ['Forgetting to wrap await in a try-catch block'], bestPractices: ['Use async/await over .then() for better readability'], interviewNotes: 'Executed on the event loop, non-blocking.' },
          { name: 'Promise.all', code: 'await Promise.all([p1, p2, p3])', description: 'Wait for all promises to resolve.', whatIsIt: 'A method that takes an array of promises and resolves when all of them resolve.', syntax: 'Promise.all([promise1, promise2, ...])', examples: ['const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);'], commonMistakes: ['Assuming it waits for all if one fails (it rejects immediately if any one fails)'], bestPractices: ['Use Promise.allSettled if you need results even if some fail'], interviewNotes: 'Parallel execution of promises.' },
        ]
      }
    ],
    quickReference: ['map()', 'filter()', 'reduce()', 'async/await', 'Promise.all()']
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
          { name: 'useState', code: 'const [state, setState] = useState(initial)', description: 'Adds a state variable to your component.', whatIsIt: 'A Hook that lets you add React state to function components.', syntax: 'const [state, setState] = useState(initialValue);', examples: ['const [count, setCount] = useState(0);'], commonMistakes: ['Updating state directly instead of using the setter'], bestPractices: ['Use functional updates for state that depends on previous state: setCount(prev => prev + 1)'], interviewNotes: 'Triggers a re-render of the component.' },
          { name: 'useReducer', code: 'const [state, dispatch] = useReducer(reducer, initial)', description: 'Alternative to useState for complex state logic.', whatIsIt: 'A Hook that lets you add a reducer (state, action) => newState to your component.', syntax: 'const [state, dispatch] = useReducer(reducer, initialArg, init);', examples: ['const [state, dispatch] = useReducer(reducer, { count: 0 });\ndispatch({ type: "increment" });'], commonMistakes: ['Using useReducer for simple state that could be handled by useState'], bestPractices: ['Use for complex state objects or when next state depends on previous state'], interviewNotes: 'Similar to Redux but local to the component.' },
        ]
      },
      {
        title: 'Optimization',
        items: [
          { name: 'useMemo', code: 'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])', description: 'Memoizes a computed value.', whatIsIt: 'A Hook that caches the result of a calculation.', syntax: 'const cachedValue = useMemo(() => calculate(), [dependencies]);', examples: ['const sortedList = useMemo(() => [...list].sort(), [list]);'], commonMistakes: ['Overusing useMemo for cheap calculations, which adds overhead'], bestPractices: ['Only use for computationally expensive operations'], interviewNotes: 'Prevents unnecessary recalculations on re-renders.' },
          { name: 'useCallback', code: 'const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b])', description: 'Memoizes a function definition.', whatIsIt: 'A Hook that caches a function definition between re-renders.', syntax: 'const memoizedCallback = useCallback(() => { ... }, [dependencies]);', examples: ['const handleClick = useCallback(() => console.log(id), [id]);'], commonMistakes: ['Forgetting to add dependencies to the dependency array'], bestPractices: ['Use when passing callbacks to memoized child components (React.memo)'], interviewNotes: 'Prevents child components from re-rendering when the parent re-renders.' },
        ]
      }
    ],
    quickReference: ['useState', 'useReducer', 'useMemo', 'useCallback', 'useEffect']
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
          { name: 'Partial', code: 'type PartialUser = Partial<User>', description: 'Constructs a type with all properties of T set to optional.', whatIsIt: 'Makes all properties of a type optional.', syntax: 'Partial<Type>', examples: ['interface User { name: string; age: number; }\ntype UserUpdate = Partial<User>; // { name?: string; age?: number; }'], commonMistakes: ['Using Partial when some fields MUST be present'], bestPractices: ['Great for update/patch operations in APIs'], interviewNotes: 'Transforms all properties to optional.' },
          { name: 'Pick', code: 'type UserPreview = Pick<User, "name" | "email">', description: 'Constructs a type by picking a set of properties from T.', whatIsIt: 'Creates a new type by picking a set of properties from an existing type.', syntax: 'Pick<Type, Keys>', examples: ['type UserPreview = Pick<User, "id" | "username">;'], commonMistakes: ['Picking keys that do not exist in the original type'], bestPractices: ['Use to create lean versions of large objects'], interviewNotes: 'Reduces object size for performance and type safety.' },
        ]
      },
      {
        title: 'Generics',
        items: [
          { name: 'Generic Function', code: 'function wrapInArray<T>(value: T): T[] {\n  return [value];\n}', description: 'Reusable functions that work with multiple types.', whatIsIt: 'Allows a function to operate on a variety of types while maintaining type safety.', syntax: 'function name<T>(arg: T): T { ... }', examples: ['function identity<T>(arg: T): T { return arg; }\nconst output = identity<string>("myString");'], commonMistakes: ['Over-complicating generics when a simple union type would suffice'], bestPractices: ['Use generic constraints (<T extends SomeType>) to limit the type of T'], interviewNotes: 'The core of reusable and type-safe libraries.' },
        ]
      }
    ],
    quickReference: ['Partial', 'Pick', 'Omit', 'Record', 'Generics']
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
          { name: 'Commit', code: 'git commit -m "Your message"', description: 'Save changes to the local repository.', whatIsIt: 'Records snapshots of the project.', syntax: 'git commit [options]', examples: ['git commit -am "Fix bug in auth flow"'], commonMistakes: ['Committing too many unrelated changes in one commit'], bestPractices: ['Write descriptive, imperative commit messages (e.g., "Add user authentication")'], interviewNotes: 'Commits are immutable snapshots.' },
          { name: 'Push', code: 'git push origin main', description: 'Upload local commits to the remote repository.', whatIsIt: 'Updates the remote ref using local refs.', syntax: 'git push <remote> <branch>', examples: ['git push origin feature-xyz'], commonMistakes: ['Pushing directly to main without a PR'], bestPractices: ['Always pull before pushing to avoid conflicts'], interviewNotes: 'Pushing is a network operation that transfers commits.' },
        ]
      },
      {
        title: 'Advanced Recovery',
        items: [
          { name: 'Rebase', code: 'git rebase main', description: 'Reapply commits on top of another base tip.', whatIsIt: 'Moves a sequence of commits to a new base commit.', syntax: 'git rebase <base>', examples: ['git checkout feature\ngit rebase main'], commonMistakes: ['Rebasing commits that have already been pushed to a public branch'], bestPractices: ['Use rebase to keep a clean, linear project history'], interviewNotes: 'Rebase vs Merge: Rebase rewrites history, Merge preserves it.' },
          { name: 'Cherry Pick', code: 'git cherry-pick <commit-hash>', description: 'Apply the changes introduced by some existing commits.', whatIsIt: 'Copies a specific commit from one branch to another.', syntax: 'git cherry-pick <commit>', examples: ['git cherry-pick a1b2c3d'], commonMistakes: ['Cherry-picking too many commits (use rebase or merge instead)'], bestPractices: ['Use for hotfixes from a development branch to production'], interviewNotes: 'Creates a new commit with the same changes but a different hash.' },
        ]
      }
    ],
    quickReference: ['git add', 'git commit', 'git push', 'git pull', 'git rebase']
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
          { name: 'Build', code: 'docker build -t image-name .', description: 'Build an image from a Dockerfile.', whatIsIt: 'Creates a Docker image from a Dockerfile and a build context.', syntax: 'docker build [options] PATH', examples: ['docker build -t my-app:v1 .'], commonMistakes: ['Not using .dockerignore, leading to huge image sizes'], bestPractices: ['Use multi-stage builds to keep final images small'], interviewNotes: 'Builds layers based on Dockerfile instructions.' },
          { name: 'Run', code: 'docker run -p 80:80 image-name', description: 'Run a container from an image.', whatIsIt: 'Creates and starts a container from a specified image.', syntax: 'docker run [options] image [command]', examples: ['docker run -d -p 8080:80 nginx'], commonMistakes: ['Forgetting to map ports with -p'], bestPractices: ['Use -d for detached mode in production'], interviewNotes: 'Containers are isolated environments running a process.' },
        ]
      },
      {
        title: 'Docker Compose',
        items: [
          { name: 'Up', code: 'docker-compose up -d', description: 'Start services in detached mode.', whatIsIt: 'Creates and starts containers defined in a docker-compose.yml file.', syntax: 'docker-compose up [options]', examples: ['docker-compose up --build'], commonMistakes: ['Running up without --build after changing Dockerfile'], bestPractices: ['Use environment files (.env) for sensitive data'], interviewNotes: 'Orchestrates multiple containers to work as a single application.' },
          { name: 'Down', code: 'docker-compose down', description: 'Stop and remove containers and networks.', whatIsIt: 'Stops and removes containers, networks, and images defined in the compose file.', syntax: 'docker-compose down [options]', examples: ['docker-compose down -v'], commonMistakes: ['Forgetting -v if you want to remove volumes'], bestPractices: ['Use down to completely reset the local environment'], interviewNotes: 'Cleanly shuts down the entire stack.' },
        ]
      }
    ],
    quickReference: ['docker build', 'docker run', 'docker ps', 'docker compose up', 'docker exec']
  },
]
