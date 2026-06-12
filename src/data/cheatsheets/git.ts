import type { CheatsheetCommand } from '../types'

export const gitCheatsheet: CheatsheetCommand[] = [
  {
    command: 'git init',
    description: 'Initializes a brand new local Git repository.',
    example: 'git init',
    category: 'Setup',
  },
  {
    command: 'git clone <url>',
    description: 'Downloads an existing repository from a remote hosting provider.',
    example: 'git clone https://github.com/user/repo.git',
    category: 'Setup',
  },
  {
    command: 'git commit -m "<message>"',
    description: 'Saves the staged snapshot permanently into commit history.',
    example: 'git commit -m "feat: add user login support"',
    category: 'Commits',
  },
  {
    command: 'git checkout -b <branch-name>',
    description: 'Creates a new development branch and switches your active working directory to it.',
    example: 'git checkout -b feature-payment',
    category: 'Branching',
  },
  {
    command: 'git stash pop',
    description: 'Retrieves stashed modifications and applies them to the current index.',
    example: 'git stash pop',
    category: 'Advanced',
  },
]
