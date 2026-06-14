import type { ProjectDetails } from '../types'

export const typescriptProjects: ProjectDetails[] = [
  {
    title: 'CLI Task Planner',
    difficulty: 'Beginner',
    description: 'A command line checklist app supporting inputs, filtering, and writing save states to JSON, written completely in TypeScript.',
    skillsLearned: ['TypeScript compiler settings', 'Interfacing inputs', 'Type guards', 'JSON write interfaces'],
    technologies: ['TypeScript', 'Node.js', 'readline-sync'],
    sourceCodeStructure: `cli-planner/
├── tsconfig.json
├── package.json
└── src/
    ├── index.ts
    ├── types.ts
    └── storage.ts`,
    developmentRoadmap: [
      'Initialize tsconfig.json with strict compiler checks.',
      'Define TS Interfaces for Task states and Status types.',
      'Implement console input loop querying commands (Add, Complete, List, Delete).',
      'Add compile-time type verification checks ensuring data conforms to specified shapes.',
    ],
  },
  {
    title: 'Strongly-Typed Database ORM',
    difficulty: 'Advanced',
    description: 'A mini database mapping layer leveraging Generics and conditional typing to guarantee queries type-safety.',
    skillsLearned: ['TypeScript Generics', 'Mapped Types', 'Dynamic Proxy interceptors', 'SQL execution mappings'],
    technologies: ['TypeScript', 'Node.js', 'sqlite3'],
    sourceCodeStructure: `mini-orm/
├── tsconfig.json
└── src/
    ├── client.ts
    ├── query.ts
    └── index.ts`,
    developmentRoadmap: [
      'Create dynamic query builder classes using Generic parameters <T>.',
      'Use mapped types to infer database columns shapes from typescript schemas.',
      'Employ Proxy patterns to map method calls to raw SQL statement structures.',
      'Compile static test files ensuring typescript compiler errors are raised on invalid column updates.',
    ],
  },
]
