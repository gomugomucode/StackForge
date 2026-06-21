# USER_JOURNEY_VALIDATION.md

## Learning Journey Simulation

This report validates the end-to-end flow of a user interacting with the StackForge LMS.

### 1. User Onboarding
- **Action**: User signs up and logs in.
- **Expected Result**: `User` record created, `Profile` lazy-provisioned, `StreakTracking` initialized.
- **Status**: ✓ Verified.

### 2. Starting Learning
- **Action**: User navigates to a `TopicPage`.
- **Expected Result**: `POST /api/learning/topic/access` records the `lastAccessed` timestamp in `TopicProgress`.
- **Status**: ✓ Verified.

### 3. Progress Tracking
- **Action**: User clicks "Mark Topic as Completed".
- **Expected Result**: 
    1. `TopicProgress.completed` set to `true`.
    2. `RoadmapCompletion.completionPercentage` incremented.
    3. Dashboard "Continue Learning" section reflects the updated progress.
- **Status**: ✓ Verified.

### 4. Gamification Loop (XP & Streak)
- **Action**: Topic completion, Quiz pass, or Challenge completion.
- **Expected Result**: 
    1. `XpTransaction` record created.
    2. `Profile.xp` and `Profile.level` updated.
    3. `DailyActivity` record updated.
    4. `StreakTracking.currentStreak` incremented if applicable.
    5. Navbar `UserStatsBadge` updated instantly via `refreshStats()`.
- **Status**: ✓ Verified.

### 5. Assessment Mastery
- **Action**: User completes a Quiz with $\ge 80\%$.
- **Expected Result**: `QuizAttempt` stored, +50 XP awarded (first pass only).
- **Status**: ✓ Verified.

### 6. Practical Application
- **Action**: User submits a solution to a Practice Challenge.
- **Expected Result**: `ChallengeProgress` stored, +100 XP awarded.
- **Status**: ✓ Verified.

### 7. Roadmap Completion & Certification
- **Action**: User completes the final topic in a roadmap.
- **Expected Result**:
    1. `RoadmapCompletion.completionPercentage` reaches $100\%$.
    2. +500 XP awarded.
    3. `Certification` record created with a unique `verificationCode`.
    4. Certificate appears in the Dashboard.
- **Status**: ✓ Verified.

### 8. Public Verification
- **Action**: Guest visits `/verify/[code]`.
- **Expected Result**: The system queries `verifyCertificate(code)` and renders a professional certificate with the earner's name and roadmap title.
- **Status**: ✓ Verified.

## Final Conclusion
The StackForge LMS transition is complete. All mock data has been replaced with database-driven logic, and the learning journey is fully closed-loop from registration to certification.
