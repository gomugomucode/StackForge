# PROGRESS_FLOW_REPORT.md

## Progress System Architecture

The progress system is built on a set of specialized Prisma models to ensure high granularity and real-time updates.

### 1. Data Models
- `TopicProgress`: Tracks individual topic completion, last access time, and completion date.
- `RoadmapCompletion`: Stores the aggregate completion percentage for a roadmap.
- `QuizAttempt`: Records every quiz attempt with scores and pass status.
- `ChallengeProgress`: Tracks the completion of specific practical challenges.

### 2. Event Flows

#### Topic Access
- **Trigger**: User opens a `TopicPage`.
- **Action**: `POST /api/learning/topic/access`
- **Effect**: `TopicProgress` is upserted with the current timestamp in `lastAccessed`.

#### Topic Completion
- **Trigger**: User clicks "Mark Topic as Completed".
- **Action**: `POST /api/learning/topic/complete`
- **Effect**: 
    1. `TopicProgress.completed` set to `true`.
    2. `TopicProgress.completedAt` set to current timestamp.
    3. Roadmap completion percentage recalculated by counting completed topics in the roadmap.
    4. `RoadmapCompletion` record updated.
    5. XP awarded via `xpService`.

#### Quiz Completion
- **Trigger**: User submits quiz answers.
- **Action**: `POST /api/quiz/submit`
- **Effect**:
    1. `QuizAttempt` record created.
    2. If `passed === true`, XP is awarded.

#### Challenge Completion
- **Trigger**: User submits challenge solution.
- **Action**: `POST /api/learning/challenge/submit`
- **Effect**:
    1. `ChallengeProgress` record upserted to `completed: true`.
    2. XP is awarded.

### 3. Real-time Updates
- `useTopicProgress` hook fetches the current state from `/api/progress?topicId=...` on mount.
- Local state is updated optimistically or after successful API calls to ensure the UI reflects progress instantly.

## Conclusion
The progress system is fully database-driven, user-specific, and integrates roadmap-level aggregation with topic-level tracking.
