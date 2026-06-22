# REAL_CONTENT_AUDIT.md
## StackForge Academy - Content & Resource Audit

This audit identifies all placeholder, dummy, and disconnected content across the platform that must be replaced or integrated to transition StackForge into a real Educational Platform (Phase 10).

### 1. Resource System
- [ ] **`src/data/resources.ts`**: All resources currently lack real URLs. They are just metadata titles.
- [ ] **Resource Types**: The system uses `pdf`, `cheatsheet`, `tool`, `download` but doesn't provide actual file paths or external links to official documentation.
- [ ] **Integration**: Resources are not currently mapped to roadmap topics. They exist as a global list.

### 2. Roadmap Experience
- [ ] **`src/app/roadmaps/[slug]/page.tsx`**: The page structure is a basic landing page. It lacks the "Learning Journey" depth (Career Outcomes, Salary Insights, Required Skills).
- [ ] **PDF Export**: The "Download PDF" buttons are linked to a service, but the visual integration and the content of the generated PDF need to be comprehensive (including all topics and resources).
- [ ] **Roadmap Flow**: While the visual node graph exists, it's not fully integrated with the content engine (e.g., clicking a node takes you to a lesson, but the lesson doesn't always feel like part of a cohesive roadmap).

### 3. Topic-Specific Content
- [ ] **Cheatsheets**: `src/data/cheatsheets.ts` contains generic cheatsheets. They are not granular enough (e.g., "JavaScript" instead of "JavaScript Arrays"). Every topic needs its own structured revision sheet.
- [ ] **Interview Prep**: `src/data/interviews.ts` contains great questions, but they are organized by general category (e.g., "JavaScript Deep Dive") rather than being linked to the specific roadmap topic where that concept is taught.
- [ ] **Projects**: Project-based learning is largely missing. There are no structured project definitions tied to roadmap topics.

### 4. Article System
- [ ] **`src/data/articles.ts`**: Only metadata exists. No actual article bodies (MDX/HTML). The blog section is effectively an empty shell.

### 5. Learning Flow Gaps
- [ ] **Resource-to-Topic Mapping**: A user cannot easily find the "Official Docs" for a specific topic they are currently studying.
- [ ] **Practice-to-Topic Mapping**: Practice tasks in lessons are simple strings; they are not linked to real external platforms (LeetCode, Codewars) or internal project requirements.

### Summary of "Fake" Content
| Component | Status | Problem |
| :--- | :--- | :--- |
| Resources | ❌ Fake | No real URLs, just titles. |
| Articles | ❌ Fake | No content bodies, just metadata. |
| Cheatsheets | ⚠️ Partial | Too generic, not topic-specific. |
| Interviews | ⚠️ Partial | Not linked to roadmap topics. |
| Projects | ❌ Missing | No structured project engine. |
| PDF Export | ⚠️ Partial | Basic integration, lacks depth. |
