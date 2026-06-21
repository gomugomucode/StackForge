# STREAK_ENGINE_REPORT.md

## Streak Engine Implementation

The streak system tracks daily user activity and maintains a continuous count of consecutive active days.

### 1. Activity Tracking
Activity is tracked via the `trackDailyActivity` function in `src/features/gamification/services/streakService.ts`. 
An activity is registered when:
- A topic is marked as complete.
- A quiz is submitted.
- A challenge is completed.

Every activity increments the `xpEarned` for the current date in the `DailyActivity` table.

### 2. Streak Logic
The `updateStreak` function manages the `StreakTracking` record:
- **New User**: Initializes a streak of 1.
- **Same Day**: If the user is already active today, the streak remains unchanged.
- **Consecutive Day**: If the last activity was yesterday, `currentStreak` is incremented by 1.
- **Broken Streak**: If the last activity was before yesterday, `currentStreak` is reset to 1.
- **Longest Streak**: `longestStreak` is updated whenever `currentStreak` exceeds the previous record.

### 3. UI Integration
- **Global State**: `UserStatsContext` provides the current streak value.
- **Instant Feedback**: The `useTopicProgress` hook calls `refreshStats()` after any XP-earning action, forcing the `Navbar` to update the streak display immediately without a page reload.
- **Navbar Display**: The `UserStatsBadge` component renders the streak with a fire icon (🔥).

## Conclusion
The streak system is fully operational, persisting data in PostgreSQL and providing real-time feedback to the user.
