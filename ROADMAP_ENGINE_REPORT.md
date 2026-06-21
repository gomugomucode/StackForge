# ROADMAP_ENGINE_REPORT.md

## Roadmap Completion Engine Implementation

The roadmap completion engine automates the transition from individual topic mastery to overall roadmap certification.

### 1. Completion Logic
Roadmap completion is calculated dynamically whenever a topic is marked as completed.

- **Trigger**: `POST /api/learning/topic/complete`
- **Calculation**: 
    $\text{Completion \%} = \left( \frac{\text{Count of completed topics in roadmap}}{\text{Total topics in roadmap}} \right) \times 100$
- **Persistence**: The result is saved in the `RoadmapCompletion` model, tracking the user's total progress.

### 2. Milestone Trigger
When the `completionPercentage` reaches $100\%$, the engine triggers two primary rewards:
1. **XP Award**: +500 XP for completing the entire roadmap.
2. **Certification**: Calls the `generateCertificate` service to issue a unique professional certificate.

## Conclusion
The roadmap engine provides a scalable way to track aggregate progress and trigger high-value rewards upon completion.
