# PHASE5_BLOCKERS.md

## Critical Blockers for Full LMS Realization

While the LMS engine is functional, the following "Reality Gaps" must be addressed before the platform can be considered a professional-grade LMS.

### 1. Lack of Real Code Execution (Critical)
- **Status**: MOCK IMPLEMENTATION
- **Detail**: The `POST /api/learning/challenge/submit` route currently marks a challenge as complete if *any* solution string is provided. 
- **Blocker**: Users can "cheat" by submitting a single character. There is no sandbox or compiler to verify that the code actually produces the `expectedOutput`.
- **Required**: Integration of a secure code execution environment (e.g., Piston API, Judge0, or a custom WASM sandbox).

### 2. Static Certificate Format (Medium)
- **Status**: PARTIALLY WORKING
- **Detail**: Certificates are currently HTML pages. While verifiable, they are not downloadable as official PDFs.
- **Blocker**: Professional certification usually requires a PDF with a cryptographic signature or a verifiable PDF metadata layer.
- **Required**: Integration of a PDF generation library (e.g., `jspdf` or `react-pdf`) on the server.

### 3. Simple Quiz Logic (Low)
- **Status**: WORKING (Simple)
- **Detail**: The quiz system only supports single-choice questions.
- **Blocker**: Advanced learning requires multi-choice, matching, and fill-in-the-blank assessments.
- **Required**: Schema expansion for `Question` and `QuizAttempt` to support multiple answer formats.

### 4. Manual Course Content Management (Low)
- **Status**: WORKING (Manual)
- **Detail**: Content is managed via the database, but there is no "Authoring Tool" for educators.
- **Blocker**: Scaling the content library requires a CMS or admin panel for content creators.
- **Required**: Admin dashboard for content management.

---

## Roadmap to Phase 5 (AI Mentor & Playground)
The items above are the primary technical debts. Once **Blocker #1 (Code Execution)** is solved, the "Playground" from Phase 5 becomes a natural extension rather than a new feature.
