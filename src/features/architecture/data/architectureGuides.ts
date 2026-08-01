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
  {
    id: "arch-nextjs-app-router",
    title: "Next.js App Router Compiler, Streaming & Flight Protocol Architecture",
    slug: "nextjs-app-router-architecture",
    technology: "nextjs",
    overview: "Next.js App Router orchestrates React Server Components (RSC) and React Flight wire protocol to stream UI chunks incrementally to client browsers.",
    deepDiveMechanics: "Server Component render trees are serialized into React Flight payload streams (.rsc format), transmitted over HTTP chunked encoding, and hydrated progressively via client RSC manifests.",
    storageMemoryModel: "In-memory Flight payload tree buffer and React Server Component context stores.",
    networkProtocol: "HTTP/2 & HTTP/3 Chunked Server-Sent Flight Payload Stream Protocol.",
  },
  {
    id: "arch-v8-memory-garbage-collection",
    title: "V8 Engine Heap Layout & Generational Garbage Collection Mechanics",
    slug: "v8-engine-memory-gc",
    technology: "javascript",
    overview: "Google V8 manages JavaScript memory via generational heap partitions: New Space (Scavenger) and Old Space (Major Mark-Sweep-Compact).",
    deepDiveMechanics: "Young objects enter Nursery space and are evacuated via Cheney's Copying Algorithm into Intermediate space. Surviving objects promote to Old Space where concurrent marking and parallel compaction run.",
    storageMemoryModel: "Semi-space Young Generation + Mark-Sweep-Compact Old Pointer & Data Space layout.",
  },
  {
    id: "arch-kafka-log-segment-indexing",
    title: "Apache Kafka Distributed Commit Log & Sparse Indexing Architecture",
    slug: "kafka-commit-log-architecture",
    technology: "system-design",
    overview: "Kafka achieves gigabyte-per-second throughput by appending records sequentially to immutable commit log segments backed by memory-mapped files.",
    deepDiveMechanics: "Sparse offset indexes map record offsets to physical byte positions in .log segment files, enabling binary search lookups with zero disk-seek overhead during sequential reads.",
    storageMemoryModel: "Linux OS Page Cache memory-mapped .log and .index segment files.",
    networkProtocol: "Kafka TCP Binary Wire Protocol over TLS.",
  },
  {
    id: "arch-node-event-loop-libuv",
    title: "Node.js Event Loop Execution Timeline & libuv Thread Pool Architecture",
    slug: "node-event-loop-libuv",
    technology: "nodejs",
    overview: "Node.js bridges JavaScript single-threaded asynchronous execution with C++ libuv non-blocking I/O multiplexing (epoll/kqueue) and thread pool delegation.",
    deepDiveMechanics: "The event loop progresses sequentially through Timers, Pending I/O, Poll, Check (setImmediate), and Close phases, draining process.nextTick() and Microtask queues between each phase.",
    storageMemoryModel: "C++ libuv loop queue handles and JS execution stack memory frames.",
  },
  {
    id: "arch-ts-type-checker-internals",
    title: "TypeScript Compiler Architecture: AST Parsing, Type Checking & Symbol Tables",
    slug: "typescript-compiler-architecture",
    technology: "typescript",
    overview: "The TypeScript compiler (tsc) executes Scanner -> Parser -> Binder -> Type Checker -> Emitter pipelines to transform TS code into JS and type declarations.",
    deepDiveMechanics: "The Binder constructs a Symbol Table linking AST identifiers to Symbols. The Type Checker lazily computes type identities, subtype relations, and generics instantiations via structural recursion.",
    storageMemoryModel: "AST Node Memory Graphs and Interned Type & Symbol Map Tables.",
  },
];

export function getArchitectureGuidesByTechnology(technology: string): ArchitectureGuide[] {
  const tech = technology.toLowerCase();
  return ARCHITECTURE_GUIDES.filter((guide) => guide.technology.toLowerCase() === tech);
}
