import type { Cheatsheet } from '../core/types/content-extensions';

export const cheatsheets: Cheatsheet[] = [
  {
    id: 'javascript',
    title: 'JavaScript Modern Syntax',
    description: 'A comprehensive guide to ES6+ methods, array manipulation, and async patterns.',
    category: 'Web Development',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1579546678193-536fe273f4dC?w=800&q=80',
    tags: ['JS', 'ES6', 'Web'],
    lastUpdated: 'Nov 2023',
    duration: 'Quick Ref',
    type: 'cheatsheet',
    items: [
      { id: '1', title: 'Array Map', category: 'Array', description: 'Creates a new array by calling a function for a specified array.', code: 'const newArr = arr.map(item => item * 2);' },
      { id: '2', title: 'Array Filter', category: 'Array', description: 'Creates a new array with all elements that pass the test.', code: 'const filtered = arr.filter(item => item > 10);' },
      { id: '3', title: 'Destructuring', category: 'Object', description: 'Unpack values from arrays or properties from objects.', code: 'const { name, age } = user;' },
      { id: '4', title: 'Optional Chaining', category: 'General', description: 'Safely access deeply nested properties.', code: 'const value = obj?.user?.profile?.name;' },
    ]
  },
  {
    id: 'react',
    title: 'React Hooks Reference',
    description: 'Quick lookup for the most used React hooks and their implementation patterns.',
    category: 'Web Development',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-27a6efa04f4b?w=800&q=80',
    tags: ['React', 'Hooks', 'UI'],
    lastUpdated: 'Dec 2023',
    duration: 'Quick Ref',
    type: 'cheatsheet',
    items: [
      { id: '1', title: 'useState', category: 'State', description: 'Adds a state variable to your component.', code: 'const [state, setState] = useState(initialValue);' },
      { id: '2', title: 'useEffect', category: 'Lifecycle', description: 'Performs side effects in functional components.', code: 'useEffect(() => { return () => cleanup(); }, [dependencies]);' },
      { id: '3', title: 'useMemo', category: 'Performance', description: 'Memoizes the result of a calculation.', code: 'const cachedValue = useMemo(() => compute(a, b), [a, b]);' },
    ]
  },
];
