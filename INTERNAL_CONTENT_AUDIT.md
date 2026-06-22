# INTERNAL_CONTENT_AUDIT.md
## StackForge Academy - Internal Learning Content Audit

This audit evaluates the current state of the platform against the "Self-Contained Learning Platform" requirement. The goal is to ensure users can master a technology without ever leaving StackForge.

### 1. Topic Learning Depth
- **Current State**: Topic pages (`/learn/[technology]/[topic]`) provide an overview, syntax, and a few examples. They primarily act as gateways to quizzes and external resources.
- **Gap**: Missing detailed "Core Concepts" and "Internal Notes" that explain the *how* and *why* in depth.
- **Requirement**: Every topic must transition from a "summary" to a "comprehensive guide" including 15 specific sections (Intro $\rightarrow$ Summary).

### 2. Cheatsheet Granularity
- **Current State**: Cheatsheets are generic (e.g., "JavaScript Modern Essentials").
- **Gap**: No topic-specific revision sheets. A user learning "Arrays" has to look at a general JS cheatsheet.
- **Requirement**: Every single topic must have its own `TopicCheatsheet` for quick revision.

### 3. Interview Engine Integration
- **Current State**: `src/data/interviews.ts` contains a good library of questions, but they are categorized by broad technology (e.g., "JavaScript Deep Dive").
- **Gap**: Questions are not mapped to the specific roadmap topic where the concept is taught.
- **Requirement**: Integration of Beginner $\rightarrow$ FAANG questions directly into the topic page.

### 4. Project-Based Learning (PBL)
- **Current State**: Projects exist in `src/data/projects.ts`, but they are high-level "Capstone" projects.
- **Gap**: No "Mini-Projects" for individual topics. A user doesn't build a small project after learning "CSS Flexbox" before moving to "CSS Grid".
- **Requirement**: Every topic needs a specific project with Requirements, Implementation Guide, and Expected Output.

### 5. Internal Article Ecosystem
- **Current State**: Articles are metadata only. The `/blog` is a shell.
- **Gap**: Total absence of long-form internal educational content.
- **Requirement**: Replace dummy metadata with production-grade MDX articles in the `content/` directory.

### 6. Roadmap UX & Gating
- **Current State**: Roadmaps are visual, but the PDF export is available immediately.
- **Gap**: No "Completion Gate" for the roadmap certification/PDF.
- **Requirement**: Logic to hide/lock the "Download Roadmap PDF" button until all required topics are completed.

### 7. External Resource Dependency
- **Current State**: External resources are highlighted as primary learning paths.
- **Gap**: Users are encouraged to leave the platform to learn from MDN/YouTube.
- **Requirement**: Move resources to the "Further Reading" section at the bottom of the page. Internal content must be the primary source.

### Summary of Content Deficits
| Feature | Current | Target | Status |
| :--- | :--- | :--- | :--- |
| Topic Content | Summary | Comprehensive Guide | ❌ Incomplete |
| Cheatsheets | Generic | Topic-Specific | ❌ Incomplete |
| Interviews | General | Topic-Mapped | ⚠️ Partial |
| Projects | Capstone only | Topic-specific Mini-Projects | ❌ Incomplete |
| Articles | Metadata | Full MDX Content | ❌ Incomplete |
| Roadmap PDF | Open | Gated by Completion | ❌ Incomplete |
| Resource Role | Primary | Optional/Further Reading | ⚠️ Partial |
