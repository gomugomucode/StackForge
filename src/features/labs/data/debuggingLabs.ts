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
