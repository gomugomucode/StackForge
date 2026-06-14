import type { CheatsheetCommand } from '../types'

export const nodejsCheatsheet: CheatsheetCommand[] = [
  {
    command: 'fs.readFile(path, encoding, callback)',
    description: 'Asynchronously reads the entire contents of a file.',
    example: 'fs.readFile("file.txt", "utf8", (err, data) => {\n  console.log(data);\n});',
    category: 'FileSystem',
  },
  {
    command: 'fs.writeFileSync(path, data)',
    description: 'Synchronously writes data to a file, replacing it if it exists.',
    example: 'fs.writeFileSync("out.txt", "Hello World");',
    category: 'FileSystem',
  },
  {
    command: 'path.join(...paths)',
    description: 'Joins all given path segments together using the platform-specific separator.',
    example: 'const fullPath = path.join(__dirname, "public", "index.html");',
    category: 'Path',
  },
]
