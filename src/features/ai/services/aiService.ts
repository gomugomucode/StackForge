/**
 * Unified AI Service for StackForge.
 *
 * Provides AI Tutor Execution Tracing, AI Mentor Assistant, and AI Interview Grading.
 * Automatically delegates to OpenAI API when OPENAI_API_KEY is configured, or provides
 * realistic structured fallbacks.
 */

export interface ExecutionStep {
  line: number;
  variables: Record<string, any>;
  callStack: string[];
  output: string;
  explanation: string;
}

export interface InterviewAnalysis {
  score: number;
  feedback: string;
  expertAnswer: string;
  grade: "A" | "B" | "C" | "F";
}

export class AIService {
  private static get apiKey(): string | undefined {
    return process.env.OPENAI_API_KEY;
  }

  /**
   * AI Tutor Execution Tracing
   */
  static async generateExecutionTrace(code: string): Promise<ExecutionStep[]> {
    if (this.apiKey) {
      try {
        const prompt = `
          You are a JavaScript execution engine visualizer.
          Analyze the following code and generate a step-by-step execution trace.
          
          CODE:
          ${code}

          Return ONLY a JSON object with a "steps" key containing an array of objects:
          [
            { "line": 1, "variables": {}, "callStack": ["global"], "output": "", "explanation": "Starting execution..." }
          ]
        `;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const parsed = JSON.parse(data.choices?.[0]?.message?.content || "{}");
          if (Array.isArray(parsed.steps)) return parsed.steps;
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (err) {
        console.warn("[AIService] OpenAI execution trace error, using fallback:", err);
      }
    }

    // Fallback Mock Execution Steps
    const lines = code.split("\n").filter((l) => l.trim().length > 0);
    return lines.map((lineText, idx) => ({
      line: idx + 1,
      variables: { lineContent: lineText.trim() },
      callStack: ["globalContext"],
      output: lineText.includes("console.log") ? lineText.replace(/.*console\.log\((.*)\).*/, "$1") : "",
      explanation: `Executing line ${idx + 1}: ${lineText.trim()}`,
    }));
  }

  /**
   * AI Mentor Interaction
   */
  static async generateMentorResponse(message: string, context: string = "General Learning"): Promise<string> {
    if (this.apiKey) {
      try {
        const prompt = `You are the Forge AI Mentor on StackForge, an elite engineering learning platform.
Current context: ${context}
User message: ${message}

Provide helpful, encouraging, and technically precise advice for senior software engineering concepts. Keep under 200 words.`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) return reply;
        }
      } catch (err) {
        console.warn("[AIService] OpenAI mentor error, using fallback:", err);
      }
    }

    // Contextual Fallback
    const msg = message.toLowerCase();
    if (msg.includes("explain") || msg.includes("what is")) {
      return `Based on [${context}], this concept is fundamental for software craftsmanship. Focus on understanding the core execution model and error boundaries.`;
    } else if (msg.includes("example") || msg.includes("code")) {
      return `For [${context}], robust implementations separate concerns into pure utility functions and declarative UI components.`;
    } else if (msg.includes("hard") || msg.includes("confused")) {
      return `Don't worry! [${context}] is a common hurdle. Try breaking down the problem into smaller functions and re-testing with edge cases.`;
    }
    return `I'm your Forge Mentor. How can I help you master [${context}] today?`;
  }

  /**
   * AI Interview Answer Grading & Feedback
   */
  static async analyzeInterviewResponse(
    question: string,
    expertAnswer: string,
    userResponse: string
  ): Promise<InterviewAnalysis> {
    if (this.apiKey) {
      try {
        const prompt = `You are a Principal Software Engineer evaluating a candidate's answer in a technical interview.

Question: "${question}"
Expert Answer Benchmark: "${expertAnswer}"
Candidate Answer: "${userResponse}"

Evaluate the candidate's answer. Return ONLY a JSON object with:
- score: number (0-100)
- grade: "A" | "B" | "C" | "F"
- feedback: detailed constructive feedback string`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const parsed = JSON.parse(data.choices?.[0]?.message?.content || "{}");
          if (typeof parsed.score === "number" && parsed.feedback) {
            return {
              score: parsed.score,
              feedback: parsed.feedback,
              expertAnswer,
              grade: parsed.grade || (parsed.score >= 80 ? "A" : parsed.score >= 60 ? "B" : parsed.score >= 40 ? "C" : "F"),
            };
          }
        }
      } catch (err) {
        console.warn("[AIService] OpenAI interview grading error, using fallback:", err);
      }
    }

    // Algorithmic Fallback Analysis
    const responseLen = userResponse.length;
    const containsKeywords = expertAnswer
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 4)
      .some((word) => userResponse.toLowerCase().includes(word));

    let score = 0;
    let feedback = "";

    if (responseLen < 20) {
      score = 20;
      feedback = "Your answer is too brief. Elaborate on the technical implementation and underlying architecture.";
    } else if (containsKeywords && responseLen > 100) {
      score = 95;
      feedback = "Excellent! You captured key technical nuances and provided sufficient depth.";
    } else if (containsKeywords) {
      score = 70;
      feedback = "Good response. Add real-world trade-off analysis or edge-case handling to reach senior level.";
    } else {
      score = 40;
      feedback = "You missed several core concepts. Compare your answer against the benchmark to refine your explanation.";
    }

    return {
      score,
      feedback,
      expertAnswer,
      grade: score >= 80 ? "A" : score >= 60 ? "B" : score >= 40 ? "C" : "F",
    };
  }
}
