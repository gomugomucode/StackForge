# StackForge V4 — Content Explosion Sprint Design Document

**Date**: 2026-08-01  
**Status**: Approved  
**Author**: Chief Architect & Staff Developer Educator  

---

## 1. Executive Summary & V4 Vision

StackForge V4 transitions the platform from monolithic MDX pages into an **Atomic Content Assembly Architecture**. Rather than storing static long-form documents, every educational asset (Lessons, Debugging Labs, Architecture Guides, Projects, Quizzes, Interview Questions) is modeled as an independent, typed **Atomic Entity**. 

A dynamic **Page Assembler Engine** composes these assets on-the-fly, connecting 1,000+ atomic lessons, 100+ debugging labs, 50+ architecture guides, 100+ project specifications, and 2,000+ interview questions into a zero-dead-end Knowledge Graph.

---

## 2. Architecture & Core Entities

### 2.1 Atomic Entity Schema (`src/features/content/types/atomic-entities.ts`)
- **`AtomicLesson`**: Title, Slug, Technology, Module, Mental Model, Internal Architecture, Execution Trace, Code Example, Common Mistakes, Performance, Security, Prerequisites.
- **`DebuggingLab`**: Title, Slug, Technology, Symptoms, Reproduction Steps, Root Cause Analysis, Diagnosis Walkthrough, Code Fix, Prevention Checklist.
- **`ArchitectureGuide`**: Title, Slug, System Domain, Overview, Deep Dive Mechanics, Storage/Memory Model, Network Protocol, Sequence Diagram Data.
- **`ProjectSpec`**: Title, Slug, Tier (Beginner, Intermediate, Advanced, Enterprise), Problem Statement, User Stories, Database Schema (ERD), API Design, Folder Structure, Rubric.
- **`InterviewBankItem`**: Title, Slug, Topic, Level (Beginner, Intermediate, Senior), Question, Comprehensive "Why" Answer, Key Takeaways.
- **`QuizBlock`**: TopicId, Type (Quick, Mastery), Questions (MCQs, Short-Answer, Debugging Challenge, Coding Exercise).

### 2.2 Dynamic Page Assembler (`src/features/content/services/pageAssembler.ts`)
- Resolves requested topic/lesson slugs against atomic registries.
- Composes full 360-degree lesson pages containing:
  1. `ProductTrustHeader` (Score, Date, Prerequisites, Difficulty, Verified Badge).
  2. `AtomicLesson` (Theory, Code, Trace, Memory).
  3. `DebuggingLab` (Embedded interactive failure & fix).
  4. `ArchitectureGuide` (System mechanics).
  5. `QuizBlock` & `PracticeSection`.
  6. `ProjectSpec` (Hands-on Capstone).
  7. `ConnectedLearningFooter` (360° Knowledge Graph matrix).

### 2.3 Debugging & Architecture Registries
- **Debugging Registry (`src/features/labs/data/debuggingLabs.ts`)**:
  - React stale closures, infinite render loops, hydration mismatches, memory leaks, CORS errors, JWT expirations, N+1 query problems, SQL deadlocks, Docker networking errors, Redis cache misses, Prisma migration conflicts.
- **Architecture Registry (`src/features/architecture/data/architectureGuides.ts`)**:
  - How Git works, How React Fiber works, How V8 executes JavaScript, How PostgreSQL stores rows, How TCP sends packets, How DNS resolves domains.

### 2.4 Curriculum Map & Scaling Pipeline (`scripts/expand-curriculum.ts`)
- Defines structured learning trees across 22 core technologies:
  - *React, JS, TS, HTML, CSS, Git, Linux, Docker, Node, Express, Postgres, Prisma, Supabase, Next.js, Auth, REST, GraphQL, Redis, System Design, Testing, CI/CD, AI Engineering*.
- Target metric: **1,000+ atomic lessons mapped**.

---

## 3. Verification & Quality Gates (`scripts/verify-v4-content.ts`)

Audits curriculum expansion against 8 target thresholds:
1. Lessons ≥ 1,000+
2. Projects ≥ 100+
3. Debugging Labs ≥ 100+
4. Architecture Guides ≥ 50+
5. Case Studies ≥ 100+
6. Interview Questions ≥ 2,000+
7. Quizzes ≥ 5,000+
8. Knowledge Graph Edges ≥ 20,000+

---

## 4. Verification Plan

1. Execute unit tests (`npm run test`) to verify atomic entity parsing and assembler services.
2. Execute `npx tsx scripts/find-dead-links.ts` to ensure 0 broken links across expanded routes.
3. Execute `npx tsx scripts/verify-v4-content.ts` to audit content completeness metrics.
