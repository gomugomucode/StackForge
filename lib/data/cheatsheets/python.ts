import type { CheatsheetCommand } from '../types'

export const pythonCheatsheet: CheatsheetCommand[] = [
  {
    command: 'list.append(item)',
    description: 'Appends an object to the end of the list.',
    example: 'fruits = ["apple"]\nfruits.append("banana") # ["apple", "banana"]',
    category: 'Lists',
  },
  {
    command: 'dictionary.get(key, default)',
    description: 'Returns the value of the specified key. If key does not exist, returns default.',
    example: 'user = {"name": "Bob"}\nage = user.get("age", 25) # 25',
    category: 'Dictionaries',
  },
  {
    command: 'len(iterable)',
    description: 'Returns the number of items in an object.',
    example: 'len([1, 2, 3]) # 3',
    category: 'General',
  },
  {
    command: 'f-Strings',
    description: 'Format string literals using curly braces expressions.',
    example: 'name = "Alice"\nmsg = f"Hello, {name}" # "Hello, Alice"',
    category: 'Strings',
  },
]
