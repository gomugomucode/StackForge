# STACKFORGE CONTENT GENERATION TEMPLATES
Version: 1.0

These templates must be followed strictly by the AI content engine to ensure pedagogical consistency and quality.

---

## 1. Lesson Template (Markdown)
**Goal:** Take a user from "I've heard of this" to "I can use this and understand the edge cases."

### Structure:
1. **Header**: Topic Title + Difficulty + Est. Time.
2. **The "Why" (Context)**: 1-2 paragraphs explaining the problem this technology/concept solves.
3. **The Mental Model**: An analogy or conceptual framework (e.g., "Think of a Promise as a restaurant buzzer").
4. **Visual Logic**: A Mermaid.js diagram explaining the flow.
5. **Syntax Breakdown**: 
   - `Code Block` (Clean, minimal syntax)
   - Detailed explanation of each keyword/parameter.
6. **Progressive Implementation**:
   - **Beginner Example**: The absolute minimum working code.
   - **Intermediate Example**: Adding a real-world feature (e.g., error handling, state).
   - **Advanced Example**: Optimization, performance, or complex architectural pattern.
7. **The "Gotchas" (Common Mistakes)**: 3-5 bullet points of frequent errors beginners make.
8. **Best Practices**: Industry-standard ways to implement this.
9. **Synthesis Challenge**: A small exercise that requires combining the above concepts.
10. **TL;DR Summary**: A 3-point checklist for quick review.

---

## 2. Cheatsheet Template (JSON)
**Goal:** High-density reference for a specific technology.

### Fields:
- `command`: The exact syntax/command.
- `purpose`: 1-sentence explanation of what it does.
- `syntax`: The general form of usage.
- `example`: A realistic 1-3 line code snippet.
- `proTip`: An optimization or shortcut.
- `commonMistake`: What typically goes wrong when using this.

---

## 3. Quiz Template (JSON)
**Goal:** Validate conceptual understanding and debugging ability.

### Question Types:
- **MCQ**: 4 options, 1 correct.
- **Debugging**: Provide a buggy code snippet $\rightarrow$ Ask for the fix.
- **Output Prediction**: Provide code $\rightarrow$ Ask what it prints to the console.
- **Scenario-Based**: "You are building X and encounter Y. Which approach is best?"

### Fields:
- `question`: The prompt.
- `options`: Array of choices.
- `correctAnswer`: The correct option index or string.
- `explanation`: A detailed "Why this is correct" and "Why others are wrong."
- `difficulty`: Beginner | Intermediate | Advanced.

---

## 4. Interview Template (JSON)
**Goal:** Prepare for high-pressure technical screenings.

### Fields:
- `question`: The interview prompt.
- `idealAnswer`: The "Senior Engineer" level response (including trade-offs).
- `followUpQuestions`: 2-3 questions an interviewer would ask after the initial answer.
- `commonMistakes`: Typical "Junior" mistakes in the answer.
- `companyTags`: [Google, Amazon, Meta, etc.]
- `difficulty`: Beginner | Intermediate | Advanced.

---

## 5. Project Template (JSON)
**Goal:** Practical application and portfolio building.

### Structure:
- **Title & Difficulty**: Clear, descriptive name.
- **Requirement List**: Must-have features (MVP).
- **Architecture Guide**: Recommended folder structure and technology choices.
- **Step-by-Step Roadmap**: Milestone 1, 2, 3.
- **Stretch Goals**: "Bonus" features for Advanced learners.
- **Evaluation Rubric**: How to know the project is "Done" and "High Quality."

---

## 6. AI Tutor Execution Template (JSON)
**Goal:** Visualizing the invisible (Memory, Call Stack).

### Fields:
- `step`: Sequence number.
- `description`: What is happening in this exact millisecond.
- `variableState`: `{ "varName": "currentValue" }`
- `callStack`: `["functionA", "functionB"]`
- `memoryView`: Visualization of heap/stack allocation.
- `outputTrace`: What is being sent to `stdout`.
