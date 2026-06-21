# PROGRESS FLOW REPORT

## Architecture Overview
The progress system has been transitioned from a simple lesson-completion tracker to a comprehensive learning state engine that handles both Roadmap-based lessons and standalone Topics.

## Data Models
### 1. Progress (Lesson Progress)
Tracks completion of individual lessons within roadmaps.
- **Added Fields**: `lastAccessed` (DateTime), `completedAt` (DateTime?).
- **Flow**: Lesson Completion $\rightarrow$ Update `Progress` $\rightarrow$ Update `RoadmapCompletion` (completion percentage).

### 2. TopicProgress (Topic Progress)
A new dedicated model to track the learning journey through standalone Topics.
- **Fields**: `userId`, `topicId`, `completed`, `lastAccessed`, `completedAt`.
- **Flow**: 
    - `GET /api/progress?topicId=...` $\rightarrow$ Fetch current state.
    - `POST /api/learning/topic/access` $\rightarrow$ Update `lastAccessed`.
    - `POST /api/learning/topic/complete` $\rightarrow$ Update `completed` and `completedAt`.

### 3. RoadmapCompletion
Aggregates progress across all modules and lessons (or topics) in a roadmap.
- **Fields**: `userId`, `roadmapId`, `completionPercentage`.
- **Trigger**: Automatically updated whenever a linked lesson or topic is marked as completed.

## Integration Logic
### Topic Page Flow
1. **Mount**: `TopicPage` $\rightarrow$ `useEffect` $\rightarrow$ `/api/learning/topic/access` (Updates `lastAccessed`).
2. **Fetch**: `useTopicProgress` $\rightarrow$ `/api/progress?topicId=...` $\rightarrow$ Load completion state.
3. **Completion**: User clicks "Mark Topic as Completed" $\rightarrow$ `/api/learning/topic/complete` $\rightarrow$ 
    - Sets `completed: true`.
    - Updates `completedAt`.
    - Recalculates `completionPercentage` for the associated roadmap.
    - Awards XP via `XpTransaction`.

### Lesson Flow
1. **Completion**: API `/api/progress` (POST) $\rightarrow$ 
    - Sets `completed: true` in `Progress`.
    - Recalculates `completionPercentage` for the associated roadmap.
    - Awards XP.

## Real-time Updates
- `useTopicProgress` hook provides the current state of completion to the UI.
- API responses return the updated progress state, allowing the UI to reflect changes (e.g., disabling the "Complete" button) instantly without a full page reload.
