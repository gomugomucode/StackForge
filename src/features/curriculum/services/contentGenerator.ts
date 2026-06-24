import { 
  CurriculumTopic, 
  CurriculumContent, 
  CurriculumQuiz, 
  CurriculumInterview, 
  CurriculumProject, 
  CurriculumCheatsheet, 
  CurriculumTutorExample 
} from '../types/curriculum.ts';

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
   * Mock AI caller. In a production environment, this would call OpenAI/Anthropic/etc.
   */
  private async callAI<T>(prompt: string): Promise<T> {
    console.log(`[AI Generator] Calling AI with prompt: ${prompt.substring(0, 100)}...`);
    
    if (process.env.MOCK_AI === 'true') {
      return this.generateMockResponse<T>();
    }

    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    throw new Error("AI Provider not configured. Please implement the callAI method with a real API key.");
  }

  private generateMockResponse<T>(): T {
    // Very basic mock response generator
    const mocks: any = {
      'CurriculumContent': {
        overview: 'This is a mock overview of the topic.',
        whyItMatters: 'This topic is essential for modern development.',
        visualExplanation: 'A diagram showing the flow of the concept.',
        syntaxGuide: 'const example = "syntax";',
        beginnerExample: 'console.log("Hello World");',
        intermediateExample: 'const data = await fetch("/api");',
        advancedExample: 'const complex = new Proxy({}, {});',
        commonMistakes: ['Forgetting to handle errors', 'Incorrect scoping'],
        bestPractices: ['Use meaningful names', 'Stay DRY'],
        summary: 'Mastering this topic enables you to build better apps.'
      },
      'CurriculumCheatsheet': {
        title: 'Mock Cheatsheet',
        sections: [{ title: 'Basics', items: [{ name: 'Item 1', code: 'code()', description: 'desc' }] }]
      },
      'CurriculumQuiz': {
        title: 'Mock Quiz',
        difficulty: 'beginner',
        type: 'quick',
        questions: [{ question: 'What is 1+1?', options: ['1', '2', '3', '4'], answer: '2', explanation: 'Basic math.', difficulty: 'easy' }]
      },
      'CurriculumInterview': {
        questions: [{ question: 'Why this tech?', answer: 'Because it is great.', explanation: 'Performance.', difficulty: 'beginner', companyTags: ['Google'] }]
      },
      'CurriculumProject': {
        title: 'Mock Project',
        description: 'Build something cool.',
        difficulty: 'beginner',
        requirements: ['Req 1', 'Req 2'],
        steps: ['Step 1', 'Step 2'],
        architecture: { overview: 'Simple', techStack: ['TS'], folderStructure: 'src/' },
        extensions: ['Ext 1'],
        rubric: [{ criteria: 'Correctness', weight: 100 }]
      },
      'CurriculumTutorExample': {
        examples: [{ title: 'Ex 1', input: '1+1', output: '2', explanation: 'Math', difficulty: 'beginner' }]
      }
    };

    // Try to match the type if possible, otherwise return an empty object
    return mocks['CurriculumContent'] || {};
  }
}
