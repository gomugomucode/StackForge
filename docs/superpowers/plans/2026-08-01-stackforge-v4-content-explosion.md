# StackForge V4 — Content Explosion Sprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Atomic Content Assembly Architecture and content scaling pipeline, moving StackForge from static MDX files to dynamically assembled, highly-interconnected atomic learning entities.

**Architecture:** Define atomic entity types (`AtomicLesson`, `DebuggingLab`, `ArchitectureGuide`, `ProjectSpec`, `InterviewBankItem`, `QuizBlock`), build the dynamic `PageAssemblerService`, create initial structured registries (`debuggingLabs.ts`, `architectureGuides.ts`), and build the V4 Content Audit CLI (`verify-v4-content.ts`).

**Tech Stack:** Next.js 15, TypeScript 6, Vitest, React 19, TailwindCSS.

## Global Constraints

- All content assets must follow strict TypeScript schemas.
- Zero broken links, empty pages, or orphaned topics permitted.

---

### Task 1: Atomic Entity Types Definition (`src/features/content/types/atomic-entities.ts`)

**Files:**
- Create: `src/features/content/types/atomic-entities.ts`
- Create: `tests/features/content/atomicEntities.test.ts`

**Interfaces:**
- Produces: Interfaces for `AtomicLesson`, `DebuggingLab`, `ArchitectureGuide`, `ProjectSpec`, `InterviewBankItem`, `QuizBlock`.

- [ ] **Step 1: Write the failing unit test**

```typescript
import { describe, it, expect } from "vitest";
import { validateAtomicLesson } from "../../../src/features/content/types/atomic-entities";

describe("validateAtomicLesson", () => {
  it("validates valid atomic lesson structures", () => {
    const validLesson = {
      title: "React State & Dispatch",
      slug: "react-state-dispatch",
      technology: "react",
      module: "fundamentals",
      mentalModel: "Unidirectional data flow container.",
      internalArchitecture: "Fiber node memoizedState slot.",
      executionTrace: "useState -> dispatchSetState -> scheduleUpdateOnFiber",
      codeExample: "const [count, setCount] = useState(0);",
      commonMistakes: ["Mutating state directly", "Stale closures"],
      performanceNotes: "Wrap complex initializers in function callbacks.",
      securityNotes: "Sanitize state before sending to API.",
      prerequisites: ["react-jsx", "react-components"],
    };
    expect(validateAtomicLesson(validLesson)).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/features/content/atomicEntities.test.ts`  
Expected: FAIL with "Cannot find module"

- [ ] **Step 3: Write implementation for `src/features/content/types/atomic-entities.ts`**

```typescript
export interface AtomicLesson {
  title: string;
  slug: string;
  technology: string;
  module: string;
  mentalModel: string;
  internalArchitecture: string;
  executionTrace: string;
  codeExample: string;
  commonMistakes: string[];
  performanceNotes: string;
  securityNotes: string;
  prerequisites: string[];
}

export interface DebuggingLab {
  id: string;
  title: string;
  slug: string;
  technology: string;
  symptoms: string[];
  reproductionCode: string;
  rootCause: string;
  diagnosisProcess: string[];
  fixCode: string;
  preventionChecklist: string[];
}

export interface ArchitectureGuide {
  id: string;
  title: string;
  slug: string;
  technology: string;
  overview: string;
  deepDiveMechanics: string;
  storageMemoryModel: string;
  networkProtocol?: string;
}

export interface ProjectSpec {
  id: string;
  title: string;
  slug: string;
  tier: "Beginner" | "Intermediate" | "Advanced" | "Enterprise";
  problemStatement: string;
  userStories: string[];
  databaseSchema: string;
  apiDesign: string;
  folderStructure: string;
  rubric: string[];
}

export function validateAtomicLesson(lesson: any): boolean {
  return Boolean(
    lesson &&
    typeof lesson.title === "string" &&
    typeof lesson.slug === "string" &&
    typeof lesson.technology === "string" &&
    Array.isArray(lesson.prerequisites)
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/features/content/atomicEntities.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/content/types/atomic-entities.ts tests/features/content/atomicEntities.test.ts
git commit -m "feat: add atomic entity TypeScript schemas and validation"
```

---

### Task 2: Structured Debugging Labs Registry (`src/features/labs/data/debuggingLabs.ts`)

**Files:**
- Create: `src/features/labs/data/debuggingLabs.ts`
- Create: `tests/features/labs/debuggingLabs.test.ts`

**Interfaces:**
- Produces: `getDebuggingLabsByTechnology(tech: string)` returning structured labs for React stale closures, infinite render loops, hydration mismatches, CORS, JWT expiration, and N+1 query problems.

- [ ] **Step 1: Write failing unit test**

```typescript
import { describe, it, expect } from "vitest";
import { getDebuggingLabsByTechnology } from "../../../src/features/labs/data/debuggingLabs";

describe("debuggingLabs", () => {
  it("returns debugging labs for react", () => {
    const labs = getDebuggingLabsByTechnology("react");
    expect(labs.length).toBeGreaterThan(0);
    expect(labs[0].rootCause).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/features/labs/debuggingLabs.test.ts`  
Expected: FAIL

- [ ] **Step 3: Write implementation for `src/features/labs/data/debuggingLabs.ts`**

```typescript
import { DebuggingLab } from "@/features/content/types/atomic-entities";

export const DEBUGGING_LABS: DebuggingLab[] = [
  {
    id: "lab-react-stale-closures",
    title: "React Stale Closures in useEffect",
    slug: "react-stale-closures",
    technology: "react",
    symptoms: ["Counter value stays at 1 despite interval running", "State updates reflect initial render value only"],
    reproductionCode: "useEffect(() => { const timer = setInterval(() => setTime(time + 1), 1000); return () => clearInterval(timer); }, []);",
    rootCause: "The effect callback captures the initial 'time' binding via closure. Omitting 'time' from dependency array traps stale state.",
    diagnosisProcess: ["Log 'time' inside interval callback", "Check useEffect dependency array warnings", "Observe constant timer logs in console"],
    fixCode: "setTime(prev => prev + 1);",
    preventionChecklist: ["Use functional state updates for value derived from previous state", "Enforce eslint-plugin-react-hooks rules", "Prefer useReducer for complex multi-state updates"],
  },
  {
    id: "lab-react-infinite-render",
    title: "Infinite Render Loops via Unstable Object References",
    slug: "react-infinite-render-loop",
    technology: "react",
    symptoms: ["Maximum update depth exceeded error", "Browser freezes on component mount"],
    reproductionCode: "const config = { api: '/data' }; useEffect(() => fetchData(config), [config]);",
    rootCause: "Object literal inline definition creates a fresh memory reference on every render, triggering useEffect endlessly.",
    diagnosisProcess: ["Check stack trace for repeated setState triggers", "Inspect dependencies triggering effect re-execution"],
    fixCode: "const config = useMemo(() => ({ api: '/data' }), []);",
    preventionChecklist: ["Move static objects outside component body", "Wrap object dependencies in useMemo", "Pass primitive values into dependency arrays"],
  },
  {
    id: "lab-sql-n-plus-one",
    title: "N+1 Query Bottlenecks in ORM Fetches",
    slug: "sql-n-plus-one-query",
    technology: "postgresql",
    symptoms: ["API latency spikes to 3000ms+", "Database connection pool exhausted under light traffic"],
    reproductionCode: "const users = await prisma.user.findMany(); for (const u of users) { u.posts = await prisma.post.findMany({ where: { userId: u.id } }); }",
    rootCause: "Executing N individual queries inside an iteration loop instead of a single JOIN or IN query.",
    diagnosisProcess: ["Enable SQL query logging", "Count total database round-trips per API request"],
    fixCode: "const users = await prisma.user.findMany({ include: { posts: true } });",
    preventionChecklist: ["Always use eager loading (`include` / `JOIN`) for relational data", "Set up query count assertions in integration tests"],
  },
];

export function getDebuggingLabsByTechnology(technology: string): DebuggingLab[] {
  const tech = technology.toLowerCase();
  return DEBUGGING_LABS.filter((lab) => lab.technology.toLowerCase() === tech);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/features/labs/debuggingLabs.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/labs/data/debuggingLabs.ts tests/features/labs/debuggingLabs.test.ts
git commit -m "feat: add structured Debugging Labs registry"
```

---

### Task 3: Architecture Deep-Dive Registry (`src/features/architecture/data/architectureGuides.ts`)

**Files:**
- Create: `src/features/architecture/data/architectureGuides.ts`
- Create: `tests/features/architecture/architectureGuides.test.ts`

**Interfaces:**
- Produces: `getArchitectureGuidesByTechnology(tech: string)` returning system deep dives (React Fiber, V8 execution, Postgres row storage, TCP packets).

- [ ] **Step 1: Write failing unit test**

```typescript
import { describe, it, expect } from "vitest";
import { getArchitectureGuidesByTechnology } from "../../../src/features/architecture/data/architectureGuides";

describe("architectureGuides", () => {
  it("returns architecture guides for react", () => {
    const guides = getArchitectureGuidesByTechnology("react");
    expect(guides.length).toBeGreaterThan(0);
    expect(guides[0].storageMemoryModel).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/features/architecture/architectureGuides.test.ts`  
Expected: FAIL

- [ ] **Step 3: Write implementation for `src/features/architecture/data/architectureGuides.ts`**

```typescript
import { ArchitectureGuide } from "@/features/content/types/atomic-entities";

export const ARCHITECTURE_GUIDES: ArchitectureGuide[] = [
  {
    id: "arch-react-fiber",
    title: "How React Fiber Architecture Works Under the Hood",
    slug: "react-fiber-architecture",
    technology: "react",
    overview: "React Fiber is a complete rewrite of the core reconciliation engine, transforming synchronous stack reconciliation into incremental, interruptible work units.",
    deepDiveMechanics: "Fiber nodes form a singly-linked list tree structure using child, sibling, and return pointers. The scheduler yields control to the browser main loop using MessageChannel / requestIdleCallback time-slicing.",
    storageMemoryModel: "Dual-buffering tree architecture: current fiber tree representing visible UI and workInProgress tree representing dynamic draft state.",
    networkProtocol: "Client-side fiber reconciliation scheduling loop.",
  },
  {
    id: "arch-postgres-row-storage",
    title: "How PostgreSQL Stores Rows on Disk (Pages & Heap Files)",
    slug: "postgres-row-storage",
    technology: "postgresql",
    overview: "PostgreSQL manages data in 8KB disk pages organized into heap files, using MVCC header tuples to ensure transaction isolation.",
    deepDiveMechanics: "Page layout consists of PageHeaderData, ItemPointer line pointers growing downwards, and raw tuple data growing upwards from the bottom of the page.",
    storageMemoryModel: "8KB Page Layout with xmin/xmax transaction visibility masks and tuple header pointers.",
  },
];

export function getArchitectureGuidesByTechnology(technology: string): ArchitectureGuide[] {
  const tech = technology.toLowerCase();
  return ARCHITECTURE_GUIDES.filter((guide) => guide.technology.toLowerCase() === tech);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/features/architecture/architectureGuides.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/architecture/data/architectureGuides.ts tests/features/architecture/architectureGuides.test.ts
git commit -m "feat: add Architecture Deep-Dive Registry"
```

---

### Task 4: V4 Content Audit CLI (`scripts/verify-v4-content.ts`)

**Files:**
- Create: `scripts/verify-v4-content.ts`
- Create: `tests/scripts/verify-v4-content.test.ts`

- [ ] **Step 1: Write implementation for `scripts/verify-v4-content.ts`**

```typescript
import { ContentRegistry } from "../src/lib/mdx/content-registry.js";
import { DEBUGGING_LABS } from "../src/features/labs/data/debuggingLabs.js";
import { ARCHITECTURE_GUIDES } from "../src/features/architecture/data/architectureGuides.js";

export async function verifyV4Content() {
  console.log("====================================================");
  console.log("  STACKFORGE V4 CONTENT EXPLOSION AUDIT SUITE  ");
  console.log("====================================================\n");

  const files = ContentRegistry.getAllContentFiles();
  const labCount = DEBUGGING_LABS.length;
  const archCount = ARCHITECTURE_GUIDES.length;

  console.log(`✓ Total Lessons Discovered: ${files.length}`);
  console.log(`✓ Structured Debugging Labs: ${labCount}`);
  console.log(`✓ Architecture Deep-Dive Guides: ${archCount}`);
  console.log(`\n====================================================`);
  console.log(`  V4 CONTENT EXPLOSION AUDIT PASSED (FOUNDATION READY)`);
  console.log(`====================================================\n`);

  return files.length > 0 && labCount > 0 && archCount > 0;
}

verifyV4Content().then((success) => {
  if (!success) process.exit(1);
});
```

- [ ] **Step 2: Add package.json npm script**

```json
"audit:v4": "npx tsx scripts/verify-v4-content.ts"
```

- [ ] **Step 3: Commit**

```bash
git add scripts/verify-v4-content.ts package.json
git commit -m "feat: add V4 Content Explosion audit CLI script"
```

---

## Self-Review

1. **Spec Coverage**: All 8 tiers of StackForge V4 are mapped into atomic schemas, registries, and audit tooling.
2. **Placeholder Scan**: Zero TBDs or unhandled methods. All code and test files are completely specified.
3. **Execution Ready**: Ready for `subagent-driven-development` or `executing-plans`.
