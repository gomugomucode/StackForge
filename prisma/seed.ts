import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clean database
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.roadmap.deleteMany();
  await prisma.cheatsheet.deleteMany();
  await prisma.interviewQuestion.deleteMany();
  await prisma.project.deleteMany();
  await prisma.finalExam.deleteMany();

  // 1. Python Roadmap
  const pythonRoadmap = await prisma.roadmap.create({
    data: {
      slug: 'python',
      title: 'Python Masterclass',
      description: 'From basic syntax to advanced AI and Data Science foundations.',
      category: 'Languages',
      color: 'from-blue-500/20 to-indigo-600/10',
      icon: 'FileCode',
      overview: 'Python is one of the most versatile languages. This roadmap covers everything from basic variables to asynchronous programming and system design.',
    },
  });

  const pyModule1 = await prisma.module.create({
    data: {
      roadmapId: pythonRoadmap.id,
      slug: 'py-foundations',
      title: 'Python Foundations',
      description: 'Core language syntax and semantics.',
    },
  });

  const pyLesson1 = await prisma.lesson.create({
    data: {
      moduleId: pyModule1.id,
      slug: 'py-variables',
      title: 'Variables & Data Types',
      description: 'Understanding how Python stores data.',
      whatIsIt: 'Variables are containers for storing data values. Python is dynamically typed, meaning you don\'t need to declare the type of variable.',
      whyItMatters: 'Foundational to all programming. Understanding types like lists, dicts, and sets is crucial for choosing the right data structure.',
      syntax: 'variable_name = value',
      declaration: 'name = "Anupam"',
      example: 'age = 25 \\n height = 5.9 \\n is_student = True',
      commonMistakes: 'Confusing mutable (lists, dicts) vs immutable (tuples, strings) types.',
      practiceTask: 'Create a dictionary representing a person with their name, age, and a list of hobbies.',
      difficulty: 'beginner',
      estimatedHours: 2,
      prerequisites: [],
    },
  });

  await prisma.resource.createMany({
    data: [
      { lessonId: pyLesson1.id, title: 'Official Python Docs', url: 'https://docs.python.org/3/', type: 'documentation' },
      { lessonId: pyLesson1.id, title: 'Real Python: Variables', url: 'https://realpython.com/python-variables/', type: 'article' },
    ],
  });

  await prisma.cheatsheet.create({
    data: {
      lessonId: pyLesson1.id,
      slug: 'py-variables-cheatsheet',
      title: 'Python Variables Cheatsheet',
      content: '# Python Variables\\n\\n## Basics\\n- `name = "John"` (String)\\n- `age = 30` (Int)\\n- `price = 19.99` (Float)\\n- `is_valid = True` (Boolean)\\n\\n## Collections\\n- `list = [1, 2, 3]` (Ordered, Mutable)\\n- `tuple = (1, 2, 3)` (Ordered, Immutable)\\n- `set = {1, 2, 3}` (Unordered, Unique)\\n- `dict = {"key": "value"}` (Key-Value pairs)',
    },
  });

  await prisma.interviewQuestion.createMany({
    data: [
      {
        lessonId: pyLesson1.id,
        question: 'What is the difference between a list and a tuple in Python?',
        answer: 'Lists are mutable (can be changed), while tuples are immutable (cannot be changed after creation). Lists are generally slower than tuples.',
        difficulty: 'beginner',
        tags: ['data structures', 'python basics'],
        companyFrequency: 10,
      },
    ],
  });

  // 2. JavaScript Roadmap
  const jsRoadmap = await prisma.roadmap.create({
    data: {
      slug: 'javascript',
      title: 'JavaScript Modern',
      description: 'Master the language of the web.',
      category: 'Languages',
      color: 'from-yellow-400/20 to-orange-500/10',
      icon: 'Code',
      overview: 'Deep dive into ECMAScript, event loop, and modern asynchronous patterns.',
    },
  });

  const jsModule1 = await prisma.module.create({
    data: {
      roadmapId: jsRoadmap.id,
      slug: 'js-core',
      title: 'JavaScript Core',
      description: 'The heart of the language.',
    },
  });

  const jsLesson1 = await prisma.lesson.create({
    data: {
      moduleId: jsModule1.id,
      slug: 'js-closures',
      title: 'Closures & Scope',
      description: 'Understanding how functions remember their environment.',
      whatIsIt: 'A closure is the combination of a function bundled together with references to its surrounding state.',
      whyItMatters: 'Essential for data privacy, partial application, and creating factories.',
      syntax: 'function outer() { const x = 1; return function inner() { return x; }; }',
      declaration: 'const counter = createCounter();',
      example: 'function makeAdder(x) { return function(y) { return x + y; }; }',
      commonMistakes: 'Creating closures in loops using var instead of let, leading to the "all return the same value" bug.',
      practiceTask: 'Implement a private counter using a closure that only allows incrementing and getting the value.',
      difficulty: 'intermediate',
      estimatedHours: 3,
      prerequisites: ['JS Basics'],
    },
  });

  await prisma.cheatsheet.create({
    data: {
      lessonId: jsLesson1.id,
      slug: 'js-closures-cheatsheet',
      title: 'JS Closures Cheatsheet',
      content: '# JS Closures\\n\\n- **Lexical Scoping**: Inner functions have access to outer function variables.\\n- **Use Case**: Encapsulation (Private variables).\\\\n- **Example**: `function secret() { let s = \"🤫\"; return () => s; }`',
    },
  });

  // 3. React Roadmap
  const reactRoadmap = await prisma.roadmap.create({
    data: {
      slug: 'react',
      title: 'React Engineering',
      description: 'Building scalable UIs with React.',
      category: 'Frameworks',
      color: 'from-sky-400/20 to-blue-500/10',
      icon: 'Atom',
      overview: 'From JSX basics to Concurrent Mode and Server Components.',
    },
  });

  const reactModule1 = await prisma.module.create({
    data: {
      roadmapId: reactRoadmap.id,
      slug: 'react-hooks',
      title: 'React Hooks',
      description: 'State and lifecycle management.',
    },
  });

  const reactLesson1 = await prisma.lesson.create({
    data: {
      moduleId: reactModule1.id,
      slug: 'use-state',
      title: 'useState Hook',
      description: 'Managing local component state.',
      whatIsIt: 'A hook that allows you to add state to functional components.',
      whyItMatters: 'Enables components to \"remember\" information and update the UI when that information changes.',
      syntax: 'const [state, setState] = useState(initialValue);',
      declaration: 'const [count, setCount] = useState(0);',
      example: 'function Counter() { const [count, setCount] = useState(0); return <button onClick={() => setCount(count + 1)}>{count}</button>; }',
      commonMistakes: 'Trying to update state synchronously and expecting it to be available on the next line.',
      practiceTask: 'Build a toggle switch that changes the background color of the page.',
      difficulty: 'beginner',
      estimatedHours: 2,
      prerequisites: ['JavaScript Basics'],
    },
  });

  await prisma.cheatsheet.create({
    data: {
      lessonId: reactLesson1.id,
      slug: 'react-usestate-cheatsheet',
      title: 'useState Cheatsheet',
      content: '# useState\\n\\n- **Initialization**: `const [val, setVal] = useState(init);`\\n- **Update**: `setVal(newVal);`\\n- **Functional Update**: `setVal(prev => prev + 1);` (Essential for dependent state updates).',
    },
  });

  // Add some projects
  await prisma.project.createMany({
    data: [
      {
        title: 'AI Content Generator',
        description: 'A fullstack app that uses OpenAI to generate blog posts.',
        difficulty: 'advanced',
        roadmapId: reactRoadmap.id,
        resources: ['OpenAI API Docs', 'Next.js App Router Docs'],
      },
      {
        title: 'Expense Tracker',
        description: 'A simple app to track daily expenses with categories.',
        difficulty: 'beginner',
        roadmapId: pythonRoadmap.id,
        resources: ['Python Basics', 'CSV module docs'],
      },
    ],
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
