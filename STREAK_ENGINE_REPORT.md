# STREAK ENGINE REPORT

## Overview
The Streak Engine tracks user consistency by monitoring daily learning activities. It incentivizes daily engagement by calculating current and longest streaks based on validated learning events.

## Implementation Details
### 1. Activity Tracking
Activity is tracked via the `DailyActivity` model. A user is considered "active" for the day if they perform any of the following:
- Complete a Topic
- Pass a Quiz
- Complete a Challenge

The system uses a composite unique key `[userId, date]` (where date is `YYYY-MM-DD`) to ensure that only one activity record is created per user per day, while accumulating total XP earned that day.

### 2. Streak Logic
The `streakService.ts` handles the streak calculation:
- **Increment**: If the user was active yesterday, the `currentStreak` is incremented.
- **Reset**: If the user missed one or more days, the `currentStreak` is reset to 1.
- **Maintenance**: If the user is already active today, the streak remains unchanged.
- **Record Breaking**: If the `currentStreak` exceeds the `longestStreak`, the latter is updated.

### 3. Integration
The streak system is integrated directly into the `addXP` service. Every time XP is awarded for a significant learning event, `trackDailyActivity` is called, which in turn updates the user's streak.

## Data Flow
$\text{User Action} \rightarrow \text{addXP}() \rightarrow \text{trackDailyActivity}() \rightarrow \text{updateStreak}() \rightarrow \text{Profile/StreakTracking Table}$

## Success Criteria
- [x] Daily activity recorded in `DailyActivity`.
- [x] Current streak increments on consecutive days.
- [x] Streak resets after a gap of one day.
- [x] Longest streak is persisted and updated.
- [x] Integration with XP engine ensures all learning events count towards the streak.
