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
        title: 'Variables & Scope',
        items: [
          { name: 'var', code: 'var x = 10;', description: 'Function-scoped variable.', whatIsIt: 'The original way to declare variables in JS.', syntax: 'var variableName = value;', examples: ['var name = "John";'], commonMistakes: ['Using var in loops causing hoisting issues'], bestPractices: ['Avoid using var in modern JS'], interviewNotes: 'Hoisted to the top of their function scope.' },
          { name: 'let', code: 'let x = 10;', description: 'Block-scoped variable.', whatIsIt: 'Modern way to declare variables that can be reassigned.', syntax: 'let variableName = value;', examples: ['let count = 0; count++;'], commonMistakes: ['Accessing let before declaration (Temporal Dead Zone)'], bestPractices: ['Use let for variables that need to change'], interviewNotes: 'Block-scoped, not hoisted in the same way as var.' },
          { name: 'const', code: 'const x = 10;', description: 'Block-scoped constant.', whatIsIt: 'Way to declare variables that cannot be reassigned.', syntax: 'const variableName = value;', examples: ['const PI = 3.14;'], commonMistakes: ['Thinking const makes an object immutable'], bestPractices: ['Use const by default unless you know the value will change'], interviewNotes: 'Immutable binding, but the object/array it points to can still be mutated.' },
        ]
      },
      {
        title: 'Functions & Logic',
        items: [
          { name: 'Arrow Functions', code: 'const add = (a, b) => a + b;', description: 'Compact function syntax.', whatIsIt: 'A shorter way to write functions, introduced in ES6.', syntax: '(args) => { body }', examples: ['const square = x => x * x;'], commonMistakes: ['Trying to use "this" inside an arrow function'], bestPractices: ['Use for short callbacks and methods'], interviewNotes: 'Do not have their own "this" context.' },
          { name: 'IIFE', code: '(function() { console.log("Hi"); })();', description: 'Immediately Invoked Function Expression.', whatIsIt: 'A function that runs as soon as it is defined.', syntax: '(function() { ... })();', examples: ['(function() { var private = 1; })();'], commonMistakes: ['Overcomplicating code with too many IIFEs'], bestPractices: ['Use to avoid polluting the global namespace'], interviewNotes: 'Useful for creating private scopes in older JS.' },
        ]
      },
      {
        title: 'Arrays & Objects',
        items: [
          { name: 'Destructuring', code: 'const { name, age } = user;', description: 'Extract values into variables.', whatIsIt: 'A way to unpack values from arrays or properties from objects.', syntax: 'const { prop } = object;', examples: ['const [first, second] = [1, 2];'], commonMistakes: ['Destructuring null or undefined values'], bestPractices: ['Use for clean function parameters: function({ name }) { ... }'], interviewNotes: 'Syntactic sugar for multiple assignments.' },
          { name: 'Spread Operator', code: 'const newArr = [...oldArr, 4];', description: 'Expand elements of an array or object.', whatIsIt: 'Allows an iterable to be expanded in places where zero or more arguments are expected.', syntax: '...iterable', examples: ['const cloned = {...original};'], commonMistakes: ['Deep cloning objects (spread only does shallow copy)'], bestPractices: ['Use for immutable state updates in React'], interviewNotes: 'Creates a shallow copy.' },
        ]
      },
      {
        title: 'ES6+ Features',
        items: [
          { name: 'Template Literals', code: '`Hello ${name}`', description: 'String interpolation.', whatIsIt: 'Strings that allow embedded expressions.', syntax: '`string ${expression}`', examples: ['console.log(`Total: ${price * qty}`);'], commonMistakes: ['Using quotes instead of backticks'], bestPractices: ['Use for any string containing variables'], interviewNotes: 'Supports multi-line strings without \\n.' },
          { name: 'Optional Chaining', code: 'user?.address?.city', description: 'Safe property access.', whatIsIt: 'Allows reading the value of a property deep within a chain of connected objects without worrying if a reference is null.', syntax: 'object?.property', examples: ['const city = user?.profile?.address?.city || "Unknown";'], commonMistakes: ['Using it on the left side of an assignment'], bestPractices: ['Use for optional API responses'], interviewNotes: 'Short-circuits and returns undefined if any link is null/undefined.' },
        ]
      },
      {
        title: 'DOM Manipulation',
        items: [
          { name: 'querySelector', code: 'document.querySelector(".btn")', description: 'Select first matching element.', whatIsIt: 'Method to find the first element that matches a CSS selector.', syntax: 'document.querySelector(selector)', examples: ['const btn = document.querySelector("#submit-btn");'], commonMistakes: ['Assuming it returns an array (use querySelectorAll)'], bestPractices: ['Use specific IDs for critical elements'], interviewNotes: 'Returns the first match or null.' },
          { name: 'addEventListener', code: 'el.addEventListener("click", callback)', description: 'Attach event handlers.', whatIsIt: 'Method to register a function to be called when a specific event occurs.', syntax: 'target.addEventListener(type, listener)', examples: ['btn.addEventListener("click", () => alert("Clicked!"));'], commonMistakes: ['Adding multiple listeners to the same element without removing them'], bestPractices: ['Use event delegation by attaching to a parent element'], interviewNotes: 'Supports capturing and bubbling phases.' },
        ]
      },
      {
        title: 'Async & APIs',
        items: [
          { name: 'Fetch API', code: 'fetch(url).then(r => r.json())', description: 'Make network requests.', whatIsIt: 'Modern interface for fetching resources over the network.', syntax: 'fetch(resource, options)', examples: ['fetch("api/data").then(res => res.json()).then(data => console.log(data));'], commonMistakes: ['Not checking res.ok before parsing json()'], bestPractices: ['Always wrap in try-catch when using async/await'], interviewNotes: 'Returns a Promise.' },
          { name: 'Async/Await', code: 'const data = await fetch(url);', description: 'Handle promises synchronously.', whatIsIt: 'Syntactic sugar for promises.', syntax: 'async function() { await promise; }', examples: ['async function main() { const res = await fetch(url); }'], commonMistakes: ['Forgetting "async" in the function signature'], bestPractices: ['Use for cleaner asynchronous control flow'], interviewNotes: 'Non-blocking event loop execution.' },
        ]
      },
    ],
    quickReference: ['let/const', 'Arrow Functions', 'Destructuring', 'Spread', 'Template Literals', 'Optional Chaining', 'querySelector', 'Fetch', 'Async/Await']
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
  {
    id: 'node-1',
    slug: 'nodejs',
    title: 'Node.js Backend Mastery',
    description: 'Essential server-side patterns for high-performance Node.js applications.',
    category: 'Runtime',
    language: 'javascript',
    sections: [
      {
        title: 'Express Framework',
        items: [
          { name: 'Routing', code: 'app.get("/api/users", (req, res) => { ... })', description: 'Handling HTTP requests.', whatIsIt: 'Express routing maps URL paths to specific handler functions.', syntax: 'app.METHOD(PATH, HANDLER)', examples: ['app.post("/login", (req, res) => { const {user} = req.body; })'], commonMistakes: ['Not using the correct HTTP method (e.g., GET for updating data)'], bestPractices: ['Organize routes into separate files using express.Router()'], interviewNotes: 'Middleware is executed in the order it is defined.' },
          { name: 'Middleware', code: 'app.use((req, res, next) => { next(); })', description: 'Interacting with request/response cycle.', whatIsIt: 'Functions that have access to request and response objects.', syntax: 'app.use([middleware], callback)', examples: ['app.use(express.json()); // Parse JSON bodies'], commonMistakes: ['Forgetting to call next() in middleware, hanging the request'], bestPractices: ['Use a global error handling middleware at the end of the stack'], interviewNotes: 'The "next()" function is crucial for passing control to the next handler.' },
        ]
      },
      {
        title: 'Core Modules',
        items: [
          { name: 'File System (fs)', code: 'fs.promises.readFile("file.txt", "utf8")', description: 'Interact with the local disk.', whatIsIt: 'Module for reading and writing files and directories.', syntax: 'fs.readFile(path, options, callback)', examples: ['const content = await fs.promises.readFile("config.json");'], commonMistakes: ['Using synchronous methods (readFileSync) in the main event loop'], bestPractices: ['Always use the promises API for non-blocking I/O'], interviewNotes: 'I/O operations are delegated to the libuv thread pool.' },
          { name: 'Path Module', code: 'path.join(__dirname, "public")', description: 'Handle and transform file paths.', whatIsIt: 'Utility for working with file and directory paths.', syntax: 'path.join(...paths)', examples: ['const fullPath = path.resolve("src", "index.js");'], commonMistakes: ['Using string concatenation instead of path.join()'], bestPractices: ['Use path.join to ensure cross-platform compatibility (Windows vs Linux)'], interviewNotes: 'Prevents issues with different path separators (\\ vs /).' },
        ]
      },
      {
        title: 'Advanced Concepts',
        items: [
          { name: 'Streams', code: 'fs.createReadStream("bigfile.txt").pipe(res)', description: 'Process data in chunks.', whatIsIt: 'A way to handle reading/writing files, network communications, or any large data set.', syntax: 'stream.pipe(dest)', examples: ['const readStream = fs.createReadStream("video.mp4");\nreadStream.pipe(res);'], commonMistakes: ['Loading large files entirely into memory using readFile'], bestPractices: ['Use streams for any file larger than 10MB'], interviewNotes: 'Prevents memory overflow by processing data incrementally.' },
          { name: 'Events (EventEmitter)', code: 'emitter.on("event", () => { ... })', description: 'Implement event-driven architecture.', whatIsIt: 'A class that allows objects to emit and listen for custom events.', syntax: 'emitter.emit("name"); emitter.on("name", callback);', examples: ['const logger = new EventEmitter();\nlogger.on("log", (msg) => console.log(msg));\nlogger.emit("log", "User logged in");'], commonMistakes: ['Adding too many listeners without removing them (memory leak)'], bestPractices: ['Use once() for events that should only fire once'], interviewNotes: 'The core of Node.js non-blocking architecture.' },
        ]
      },
    ],
    quickReference: ['express.Router()', 'app.use()', 'fs.promises', 'path.join()', 'stream.pipe()', 'EventEmitter']
  },
]
