import { 
  CurriculumTopic, 
  CurriculumContent, 
  CurriculumQuiz, 
  CurriculumInterview, 
  CurriculumProject, 
  CurriculumCheatsheet, 
  CurriculumTutorExample 
} from '@/features/content/types/curriculum';

export class ContentGenerator {
  /**
   * Generates a comprehensive lesson for a topic.
   */
  async generateLesson(topic: CurriculumTopic): Promise<CurriculumContent> {
    const prompt = `Generate a large-scale, comprehensive learning lesson for the topic "${topic.title}" (${topic.technology}).
    Difficulty: ${topic.difficulty}
    Prerequisites: ${topic.prerequisites.join(', ')}
    
    TARGET LENGTH: 2000-5000 words.
    
    The output must be in structured JSON format with the following fields:
    - overview: High-level explanation (300+ words).
    - whyItMatters: The practical importance, business value, and real-world impact (200+ words).
    - visualExplanation: A highly detailed description of a visual aid (Mermaid diagram, flow chart, or architectural map) that explains this concept.
    - syntaxGuide: Exhaustive syntax rules, patterns, and edge cases (500+ words).
    - beginnerExample: Simple, annotated code example.
    - intermediateExample: Real-world scenario implementation (300+ words of explanation).
    - advancedExample: Highly optimized, industry-standard complex implementation with deep technical analysis.
    - commonMistakes: Array of 10+ typical pitfalls with 'Wrong' vs 'Right' code examples.
    - bestPractices: Array of 10+ industry standards with justifications.
    - summary: A comprehensive final takeaway and roadmap for next steps.`;

    return this.callAI<CurriculumContent>(prompt);
  }

  async generateCheatsheet(topic: CurriculumTopic): Promise<CurriculumCheatsheet> {
    const prompt = `Generate a PROFESSIONAL, COMPREHENSIVE cheatsheet for "${topic.title}" (${topic.technology}).
    Target: 100-300 high-utility commands, snippets, and patterns.
    
    Requirements:
    - Divide into granular sections (e.g., "Basic Setup", "Advanced Manipulation", "Troubleshooting", "Performance Patterns").
    - For each item, provide:
      - Name: Concise label.
      - Code: Exact, copy-pasteable code snippet.
      - Description: Clear, 1-sentence explanation of what it does and when to use it.
    - Include edge cases and "pro-tips".
    - Ensure total coverage of the technology's ecosystem from installation to deployment.`;

    return this.callAI<CurriculumCheatsheet>(prompt);
  }

  async generateQuiz(topic: CurriculumTopic): Promise<CurriculumQuiz> {
    const prompt = `Generate a comprehensive quiz system for "${topic.title}" (${topic.technology}).
    
    Deliverables:
    1. Quick Quiz: 5 High-impact questions for immediate validation.
    2. Mastery Quiz: 20 Deep-dive questions for full conceptual mastery.
    
    Question Diversity:
    - MCQ (Multiple Choice)
    - True/False
    - Code Analysis (Given code, what is the output?)
    - Output Prediction (Predict the behavior)
    - Debugging (Identify the error in a snippet)
    
    Difficulty Distribution:
    - Easy: 30%
    - Medium: 50%
    - Hard: 20%
    
    Each question must include a detailed 'explanation' field explaining WHY the correct answer is right and why others are wrong.`;

    return this.callAI<CurriculumQuiz>(prompt);
  }

  async generateInterviewQuestions(topic: CurriculumTopic): Promise<CurriculumInterview> {
    const prompt = `Generate an exhaustive interview question bank for "${topic.title}" (${topic.technology}).
    
    Levels:
    - Beginner: Focus on basics, terminology, and simple application.
    - Intermediate: Focus on patterns, trade-offs, and common architectural choices.
    - Advanced: Focus on internals, optimization, and complex system design.
    
    Company Tagging:
    Tag questions relevant to top-tier companies (Google, Amazon, Meta, Netflix, Microsoft).
    
    Format for each entry:
    - Question: The actual prompt.
    - Answer: The ideal technical answer.
    - Explanation: The 'why' and the conceptual framework.
    - Follow-up Question: A question an interviewer would ask after the candidate answers the first one to test depth.`;

    return this.callAI<CurriculumInterview>(prompt);
  }

  async generateProject(topic: CurriculumTopic): Promise<CurriculumProject> {
    const prompt = `Generate a professional-grade mini-project mapping to "${topic.title}" (${topic.technology}).
    
    The project should be designed such that it is impossible to complete without using the core concepts of the topic.
    
    Requirements:
    - Title & High-impact Description.
    - Strict Requirements: A list of 'Must-Haves' and 'Should-Haves'.
    - Step-by-Step Implementation Guide: Detailed phases of development.
    - Architecture:
      - High-level overview.
      - Tech Stack justification.
      - Detailed Folder Structure (tree format).
    - Extensions: 3-5 "Stretch Goals" for advanced users.
    - Rubric: Clear criteria for a 'Passing' vs 'Excellent' submission.`;

    return this.callAI<CurriculumProject>(prompt);
  }

  async generateTutorExamples(topic: CurriculumTopic): Promise<CurriculumTutorExample> {
    const prompt = `Generate a structured dataset for an AI Tutor visualizer for "${topic.title}" (${topic.technology}).
    
    Create 15 total examples: 5 Beginner, 5 Intermediate, 5 Advanced.
    
    For each example:
    - title: Clear name of the concept.
    - input: A concise code snippet that triggers the concept.
    - output: A 'step-by-step' execution trace or memory state representation (e.g., "Step 1: Variable x is allocated in stack...").
    - explanation: A narrative explaining the transition from input to output.
    
    Focus on making these examples "visualizable" (e.g., how an array map changes memory, how a closure captures a variable).`;

    return this.callAI<CurriculumTutorExample>(prompt);
  }

  async generateSummary(topic: CurriculumTopic): Promise<string> {
    const prompt = `Generate a concise, high-impact summary for the topic "${topic.title}" that reinforces the core value and key takeaways.`;
    return this.callAI<string>(prompt);
  }

  async generateVisualExplanation(topic: CurriculumTopic): Promise<string> {
    const prompt = `Describe a visual representation (like a Mermaid.js diagram or a conceptual map) for "${topic.title}". 
    Focus on the flow of data or the structural relationship of concepts.`;
    return this.callAI<string>(prompt);
  }

  /**
   * AI caller. Uses OpenAI API if OPENAI_API_KEY is configured, otherwise uses structured mock generator.
   */
  private async callAI<T>(prompt: string): Promise<T> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && process.env.MOCK_AI !== 'true') {
      try {
        console.log(`[AI Generator] Sending prompt to OpenAI API...`);
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "You are an expert developer educator. Respond ONLY with valid JSON.",
              },
              { role: "user", content: prompt },
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            return JSON.parse(content) as T;
          }
        } else {
          console.warn(`[AI Generator] OpenAI API call failed (${response.status}). Falling back to mock generator.`);
        }
      } catch (error) {
        console.warn(`[AI Generator] Error calling OpenAI API:`, error);
      }
    }

    return this.generateMockResponse<T>(prompt);
  }

  private generateMockResponse<T>(prompt: string): T {
    if (prompt.includes("CurriculumContent") || prompt.includes("comprehensive learning lesson")) {
      return {
        overview: "A comprehensive deep-dive into the foundational concepts, runtime execution context, and architectural principles.",
        whyItMatters: "Mastering this concept allows you to build scalable, high-performance applications with robust error boundaries and optimal resource utilization.",
        visualExplanation: "```mermaid\ngraph TD;\n    A[Input State] --> B{Processing Logic};\n    B -->|Success| C[Render Output];\n    B -->|Failure| D[Error Handler];\n```",
        syntaxGuide: "Follow language standards, avoid side effects, and adhere to type safety.",
        beginnerExample: "// Basic usage example\nconst result = performOperation('input');\nconsole.log(result);",
        intermediateExample: "// Intermediate implementation with error handling\nasync function handleTask(id) {\n  try {\n    const response = await fetch(`/api/task/${id}`);\n    return await response.json();\n  } catch (err) {\n    console.error('Task failed', err);\n  }\n}",
        advancedExample: "// Advanced optimized implementation with memoization\nconst cache = new Map();\nfunction memoizedCompute(key, fn) {\n  if (cache.has(key)) return cache.get(key);\n  const val = fn(key);\n  cache.set(key, val);\n  return val;\n}",
        commonMistakes: [
          "Forgetting to handle asynchronous rejections",
          "Mutating state directly instead of using immutable updates",
          "Ignoring memory leaks in long-running event listeners"
        ],
        bestPractices: [
          "Always handle boundary failure conditions",
          "Keep functions pure and single-purpose",
          "Enforce strict TypeScript interfaces for all payload schemas"
        ],
        summary: "This topic equips you with industry-standard patterns necessary for building production-ready applications."
      } as unknown as T;
    }

    if (prompt.includes("cheatsheet")) {
      return {
        title: "Quick Reference & Cheat Sheet",
        sections: [
          {
            title: "Core Mechanics",
            items: [
              { name: "Initialization", code: "const instance = new Service();", description: "Creates a new service instance." },
              { name: "Execute Action", code: "await instance.execute();", description: "Runs the primary operation asynchronously." }
            ]
          }
        ]
      } as unknown as T;
    }

    if (prompt.includes("quiz")) {
      return {
        title: "Check Point Quiz",
        difficulty: "intermediate",
        type: "full",
        questions: [
          {
            question: "What is the primary advantage of using immutable state updates?",
            options: [
              "Prevents unexpected side effects and makes state changes predictable",
              "Increases raw execution speed by 10x",
              "Disables all garbage collection",
              "Forces synchronous blocking execution"
            ],
            answer: "Prevents unexpected side effects and makes state changes predictable",
            explanation: "Immutability ensures that data references remain intact and state changes can be easily tracked and audited.",
            difficulty: "medium"
          }
        ]
      } as unknown as T;
    }

    if (prompt.includes("interview")) {
      return {
        questions: [
          {
            question: "How does the runtime handle asynchronous execution queues?",
            answer: "The event loop processes synchronous tasks on the call stack before picking microtasks (promises) and macrotasks (timers) from their respective queues.",
            explanation: "Understanding event loop microtask vs macrotask execution order is vital for performance debugging.",
            difficulty: "intermediate",
            companyTags: ["Google", "Meta", "Amazon"]
          }
        ]
      } as unknown as T;
    }

    if (prompt.includes("project")) {
      return {
        title: "Hands-on Capstone Application",
        description: "Build a production-grade application incorporating the core concepts covered in this topic.",
        difficulty: "intermediate",
        requirements: ["Implement data fetching and persistence", "Handle error state gracefully", "Write unit tests for core logic"],
        steps: ["Initialize repository structure", "Build business logic components", "Add user interface and styling", "Deploy to production"],
        architecture: {
          overview: "Modular client-server architecture with type-safe API boundaries.",
          techStack: ["TypeScript", "Next.js", "Prisma", "Tailwind CSS"],
          folderStructure: "src/\n  ├── components/\n  ├── features/\n  └── lib/"
        },
        extensions: ["Add user authentication", "Implement real-time updates"],
        rubric: [{ criteria: "Code quality and architecture", weight: 100 }]
      } as unknown as T;
    }

    return {
      examples: [
        {
          title: "Execution Step 1",
          input: "const a = 10;",
          output: "Memory: { a: 10 }",
          explanation: "Variable 'a' is allocated on the stack.",
          difficulty: "beginner"
        }
      ]
    } as unknown as T;
  }
}
