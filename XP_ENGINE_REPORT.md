# XP_ENGINE_REPORT.md

## XP Engine Implementation

The XP engine is designed as a centralized service that handles reward distribution, level calculation, and transaction logging.

### 1. Service Architecture
The core logic resides in `src/features/gamification/services/xpService.ts`. It uses a transaction-based approach to ensure that user profile updates and XP transaction logs are atomic.

### 2. Reward Matrix
| Event | Reward | Reference Key |
|---|---|---|
| Topic Completion | +25 XP | `TOPIC_COMPLETION:{topicId}` |
| Quiz Pass | +50 XP | `QUIZ_PASS:{quizId}` |
| Challenge Completion | +100 XP | `CHALLENGE_COMPLETION:{challengeId}` |
| Roadmap Completion | +500 XP | `ROADMAP_COMPLETION:{roadmapId}` |

### 3. Key Features
- **Duplicate Prevention**: Before awarding XP, the service checks the `XpTransaction` table for an existing record with the same `userId` and `reason`.
- **Atomic Updates**: Uses `prisma.$transaction` to update the `Profile` table and create an `XpTransaction` record simultaneously.
- **Level System**: Implements a non-linear level progression based on a quadratic formula: $n = \frac{-75 + \sqrt{5625 + 100xp}}{50} + 1$.
- **Daily Activity Integration**: Every XP award triggers a call to `trackDailyActivity` to maintain streaks.

### 4. Integration Points
- `/api/learning/topic/complete`: Awards `TOPIC_COMPLETION` and checks for `ROADMAP_COMPLETION`.
- `/api/quiz/submit`: Awards `QUIZ_PASS` if the percentage is $\ge 80\%$.
- `/api/learning/challenge/submit`: Awards `CHALLENGE_COMPLETION` upon first successful submission.

## Conclusion
The XP engine is fully implemented and connected to the database, providing a robust gamification layer for the LMS.
