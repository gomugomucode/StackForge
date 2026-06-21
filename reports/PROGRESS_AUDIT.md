# Progress Audit

**Hook**: `useTopicProgress.ts`
**API**: `src/app/api/progress/route.ts`

## Verification Checklist

| Check | Result | Notes |
| :--- | :---: | :--- |
| Progress saved? | 🟡 | `markTopicComplete` calls `TopicService.toggleTopicCompletion`. |
| Progress persisted? | ✅ | Saved in `Progress` table via Prisma. |
| User-specific? | ✅ | Uses `userId` from session. |
| Auth protected? | ✅ | API checks for user session. |
| Database connected? | ✅ | Uses Prisma `upsert`. |

## Critical Mismatches

1. **Data Format Mismatch**:
   - API `GET` returns `{ completedNodes: string[] }`.
   - Hook `useTopicProgress` expects an object: `{ completed: boolean, quizScore: number, ... }`.
   - This will cause the UI to show incorrect progress or crash.
2. **Missing Parameter**: The API `GET` route does not accept `topicId` as a parameter, making it impossible for the hook to fetch progress for a specific topic as intended.

## Conclusion
The backend persistence is there, but the frontend hook and the API are speaking different languages. The progress tracking is currently broken.
