# 🚶 USER JOURNEY REPORT: Friction & Flow

## 1. Journey Mapping

### A. The Visitor Journey (Conversion)
**Flow:** Landing $\rightarrow$ Hero $\rightarrow$ Featured Content $\rightarrow$ Roadmaps $\rightarrow$ specific node.
- **Current State:** Strong. The new "Featured Content" section and "Hero Visual" provide immediate value.
- **Friction Point:** The transition from "Looking" to "Learning" is a cliff. A user clicks a roadmap node and is presented with text, but there is no "Account" prompt to save their progress.
- **Drop-off Risk:** High, if the user feels they are just reading a blog post rather than using a platform.

### B. The Learner Journey (Retention)
**Flow:** Start Node $\rightarrow$ Read Content $\rightarrow$ Mark Complete $\rightarrow$ Unlock Next Node.
- **Current State:** Satisfying but shallow. The "lock/unlock" mechanism provides a basic dopamine hit.
- **Friction Point:** The "Content" in roadmap nodes is currently just a text block. There's no interactive element or "test your knowledge" quiz before unlocking the next step.
- **Missing Flow:** No "Daily Goal" or "Reminder" system to bring the learner back.

### C. The Returning User Journey (Loyalty)
**Flow:** Navbar $\rightarrow$ Cmd+K $\rightarrow$ Quick jump to CheatSheet or Project.
- **Current State:** Highly efficient. The search system is the strongest part of the returning experience.
- **Friction Point:** No "Continue Where You Left Off" prompt on the homepage. The user has to remember which roadmap they were on.
- **Missing System:** A personal dashboard.

### D. The Job-Seeker Journey (Outcome)
**Flow:** Interview Hub $\rightarrow$ Category $\rightarrow$ Question $\rightarrow$ Answer.
- **Current State:** Functional but static.
- **Friction Point:** The "View Answer" is a missing link. The user can see the question but cannot verify their answer.
- **Missing Flow:** No way to track "Mastered" vs "Struggled" questions.

---

## 2. Critical Friction Points Summary

| Point | Impact | Solution |
| :--- | :--- | :--- |
| **The "Cold Start"** | High | Implement a "Quick Onboarding" quiz to suggest the best roadmap. |
| **The "Void" (No Auth)** | Critical | Force a soft-sign-in when marking the first 3 nodes as complete. |
| **The "Static Wall"** | Medium | Replace static text nodes with a mix of MDX, interactive widgets, and quizzes. |
| **The "Memory Gap"** | Medium | Add a "Recently Viewed" or "Continue Learning" widget to the Homepage. |

---

## 3. Retention System Gaps
- **No Notification Loop:** No email/browser alerts for new content.
- **No Social Validation:** No way to share a "Completed Roadmap" on LinkedIn/Twitter.
- **No Competitive Drive:** No leaderboards or peer comparison.
