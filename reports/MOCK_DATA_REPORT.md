# Mock Data Report

This report identifies all areas where the application uses hardcoded or mock data instead of real database-driven values.

## Identified Mock Data

| File | Reason | Replacement Strategy |
| :--- | :--- | :--- |
| `src/features/profile/ActivityFeed.tsx` | Hardcoded `activities` array. | Query `XpTransaction` and `Progress` tables to build a real activity timeline. |
| `src/features/profile/ProgressOverview.tsx` | Hardcoded `courses` array with static progress %. | Calculate progress based on `Progress` and `RoadmapCompletion` tables. |
| `src/app/dashboard/page.tsx` | Hardcoded progress (45%) for roadmaps. | Fetch `RoadmapCompletion.completionPercentage` for the user. |
| `src/app/dashboard/page.tsx` | Static "No certificates yet" state. | Query `Certification` table for the current user. |
| `src/app/certificate/[id]/page.tsx` | Roadmap name is hardcoded to "Roadmap Certification". | Join `Certification` $\rightarrow$ `Roadmap` in the Prisma query. |
| `src/app/api/ai/interview/route.ts` | `mockInterviewsThisWeek` constant used for quota. | Implement a `Usage` table to track real interview counts. |
| `src/app/api/ai/mentor/route.ts` | `mockMessagesToday` constant used for quota. | Implement a `Usage` table to track real message counts. |

## Conclusion
The "shell" of the application is complete, but the **User-Data Loop** (doing something $\rightarrow$ seeing it on dashboard) is entirely broken. The application feels like a prototype rather than a production LMS.
