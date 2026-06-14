import type { CheatsheetCommand } from '../types'

export const typescriptCheatsheet: CheatsheetCommand[] = [
  {
    command: 'type AliasName = typeShape;',
    description: 'Creates a custom name for any TypeScript type representation.',
    example: 'type ID = string | number;\ntype User = { id: ID; name: string };',
    category: 'Types',
  },
  {
    command: 'interface Name { shape }',
    description: 'Declares an object type structure that can be extended or merged.',
    example: 'interface Animal {\n  name: string;\n}\ninterface Dog extends Animal {\n  bark(): void;\n}',
    category: 'Interfaces',
  },
  {
    command: 'Partial<T>',
    description: 'Utility type constructing a type with all properties of T set to optional.',
    example: 'interface Todo { title: string }\nconst updateTodo = (todo: Partial<Todo>) => {};',
    category: 'Utilities',
  },
]
