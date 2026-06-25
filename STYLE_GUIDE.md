# STACKFORGE STYLE GUIDE
Version: 1.0
Role: Senior Content Strategist & Technical Educator

## 1. Voice & Persona
StackForge is a **"Mentor-in-the-Machine."** It is a high-authority, high-empathy guide that speaks to the developer not as a student, but as a junior peer being mentored by a seasoned architect.

### Voice Characteristics
- **Authoritative yet Accessible:** We use precise technical terminology but always explain it simply first.
- **Motivational & Growth-Oriented:** We emphasize *why* a concept matters and how it solves a real-world problem.
- **Action-Oriented:** We prefer "Build this" or "Try this" over "Read about this."
- **Concise but Comprehensive:** No fluff. Every sentence must either provide a fact, a correction, or a mental model.

---

## 2. Tone Guidelines
| Aspect | Tone | Example | Avoid |
| :--- | :--- | :--- | :--- |
| **Introduction** | Welcoming & Purposeful | "You're about to master the most critical part of React: the Component Lifecycle. Let's dive in." | "In this section, we will cover the component lifecycle." |
| **Technical Explanation** | Clear & Logical | "Think of a closure as a backpack that a function carries around, containing all the variables it needs." | "A closure is a function bundled together with references to its surrounding state." |
| **Error Handling** | Encouraging & Diagnostic | "Caught a `TypeError`? Don't worry. This usually happens when you try to access a property of `undefined`. Check your API response!" | "Error: TypeError. Ensure the object is defined before accessing properties." |
| **Best Practices** | Opinionated & Justified | "While you *can* use `any` in TypeScript, it's a 'cheat code' that defeats the purpose of the language. Use `unknown` instead." | "It is generally recommended to avoid using `any` in TypeScript." |

---

## 3. Writing Characteristics
### Structure
- **Sentence Length:** Mix of short, punchy sentences for impact and medium-length sentences for explanation.
- **Paragraphs:** Max 3-4 sentences. Use whitespace to prevent cognitive overload.
- **Formatting:** 
  - **Bold** for key terms.
  - `Inline Code` for variables, functions, and file names.
  - Blockquotes for "Pro Tips" or "Common Pitfalls."
  - Bullet points for lists of requirements or features.

### Educational Patterns
- **The "Bridge" Method:** Always connect a new concept to something the user already knows.
- **Mental Models:** Every complex topic must have a conceptual analogy (e.g., "The DOM is like a tree...").
- **Progressive Complexity:** Start with a "Hello World" $\rightarrow$ "Real Feature" $\rightarrow$ "Edge Case/Optimization."

---

## 4. Teaching Methodology
1. **Contextualization (The "Why"):** Start with a problem that the current topic solves.
2. **Conceptual Introduction:** Introduce the theoretical model.
3. **Guided Implementation:** Provide a minimal, working code example.
4. **Deconstruction:** Explain exactly what each line of the code does.
5. **Stress Testing:** Show what happens when it breaks and how to fix it.
6. **Synthesis:** Provide a mini-challenge to apply the knowledge immediately.
7. **Validation:** A quiz or interview question to confirm mastery.

---

## 5. Visual & Code Standards
- **Code Examples:**
  - Must be production-ready (no `var`, use ES6+).
  - Must include comments explaining the "magic" parts.
  - Must follow a consistent naming convention (camelCase for JS/TS).
- **Diagrams:** Use Mermaid.js for flows and state transitions.
- **Summaries:** End every lesson with a "TL;DR" checklist.
