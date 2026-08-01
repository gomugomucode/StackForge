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
