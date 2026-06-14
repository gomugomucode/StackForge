import type { PlaygroundLanguage, Snippet } from '@/lib/core/types/phase5'

// ─── Default code templates per language ─────────────────────────────────────

export const DEFAULT_CODE: Record<PlaygroundLanguage, string> = {
  javascript: `// StackForge Playground — JavaScript
function greet(name) {
  return \`Hello, \${name}! Welcome to StackForge.\`;
}

// Try it out:
console.log(greet('Developer'));

// Fibonacci example
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

for (let i = 0; i <= 10; i++) {
  console.log(\`fib(\${i}) = \${fib(i)}\`);
}`,

  typescript: `// StackForge Playground — TypeScript (transpiled to JS)
interface User {
  name: string;
  level: number;
  xp: number;
}

function levelUp(user: User): User {
  const newXP = user.xp + 100;
  const newLevel = Math.floor(newXP / 500) + 1;
  return { ...user, xp: newXP, level: newLevel };
}

const dev: User = { name: 'Developer', level: 1, xp: 0 };
const leveled = levelUp(dev);
console.log(\`\${leveled.name} is now Level \${leveled.level} with \${leveled.xp} XP!\`);`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Playground Preview</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; margin: 0;
      background: linear-gradient(135deg, #1e1b4b, #0f172a);
      color: white;
    }
    .card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px; padding: 2rem;
      text-align: center; backdrop-filter: blur(10px);
    }
    h1 { background: linear-gradient(135deg, #a78bfa, #22d3ee);
         -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    button {
      background: #7c3aed; color: white; border: none;
      padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;
      font-size: 1rem; margin-top: 1rem; transition: 0.2s;
    }
    button:hover { background: #6d28d9; transform: translateY(-2px); }
  </style>
</head>
<body>
  <div class="card">
    <h1>StackForge Playground</h1>
    <p>Edit this HTML/CSS/JS and see live results!</p>
    <button onclick="this.textContent='🎉 Clicked!'">Click Me</button>
  </div>
</body>
</html>`,

  css: `/* StackForge Playground — CSS Demo */
/* Pair with the HTML panel */

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #0f172a;
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.container {
  padding: 2rem;
  border-radius: 1rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
}`,

  python: `# StackForge Playground — Python
# Note: Python runs locally — copy this code to run it

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

data = [64, 34, 25, 12, 22, 11, 90]
print("Original:", data)
sorted_data = bubble_sort(data.copy())
print("Sorted:", sorted_data)

# Generator example
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print("Fibonacci:", list(fibonacci(10)))`,

  go: `// StackForge Playground — Go
// Note: Go runs locally — copy this code to run it
package main

import "fmt"

func factorial(n int) int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n-1)
}

func main() {
    for i := 0; i <= 10; i++ {
        fmt.Printf("%d! = %d\\n", i, factorial(i))
    }
}`,

  rust: `// StackForge Playground — Rust  
// Note: Rust runs locally — copy this code to run it
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    let sum: i32 = numbers.iter().sum();
    let even: Vec<&i32> = numbers.iter().filter(|&&x| x % 2 == 0).collect();
    let doubled: Vec<i32> = numbers.iter().map(|&x| x * 2).collect();
    
    println!("Numbers: {:?}", numbers);
    println!("Sum: {}", sum);
    println!("Even: {:?}", even);
    println!("Doubled: {:?}", doubled);
}`,
}

// ─── Language metadata ────────────────────────────────────────────────────────

export const LANGUAGE_META: Record<PlaygroundLanguage, {
  label: string
  color: string
  icon: string
  runnable: boolean
}> = {
  javascript: { label: 'JavaScript', color: '#f7df1e', icon: 'JS', runnable: true },
  typescript: { label: 'TypeScript', color: '#3178c6', icon: 'TS', runnable: true },
  html: { label: 'HTML/CSS/JS', color: '#e34f26', icon: 'HTML', runnable: true },
  css: { label: 'CSS', color: '#264de4', icon: 'CSS', runnable: false },
  python: { label: 'Python', color: '#3776ab', icon: 'PY', runnable: false },
  go: { label: 'Go', color: '#00add8', icon: 'GO', runnable: false },
  rust: { label: 'Rust', color: '#ce412b', icon: 'RS', runnable: false },
}

// ─── Snippet service ──────────────────────────────────────────────────────────

const SNIPPETS_KEY = 'stackforge-snippets'

function generateId(): string {
  return Math.random().toString(36).slice(2, 10)
}

function generateShareToken(): string {
  return Math.random().toString(36).slice(2, 12) + Date.now().toString(36)
}

export function getSavedSnippets(): Snippet[] {
  try {
    const raw = localStorage.getItem(SNIPPETS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveSnippet(
  title: string,
  language: PlaygroundLanguage,
  code: string,
  isPublic = false
): Snippet {
  const snippet: Snippet = {
    id: generateId(),
    title,
    language,
    code,
    is_public: isPublic,
    share_token: generateShareToken(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  const existing = getSavedSnippets()
  localStorage.setItem(SNIPPETS_KEY, JSON.stringify([snippet, ...existing].slice(0, 50)))
  return snippet
}

export function deleteSnippet(id: string): void {
  const updated = getSavedSnippets().filter(s => s.id !== id)
  localStorage.setItem(SNIPPETS_KEY, JSON.stringify(updated))
}

export function getSnippetByToken(token: string): Snippet | null {
  return getSavedSnippets().find(s => s.share_token === token) ?? null
}

export function getShareUrl(shareToken: string): string {
  return `${window.location.origin}/playground/s/${shareToken}`
}
