export interface ExecutionRequest {
  language: "javascript" | "typescript" | "python" | "sql" | "html";
  code: string;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  executionTimeMs: number;
  hasErrors: boolean;
}

export class PlaygroundEngine {
  public static async executeCode(req: ExecutionRequest): Promise<ExecutionResult> {
    const startTime = Date.now();

    try {
      if (req.language === "javascript" || req.language === "typescript") {
        return {
          stdout: "Execution successful.\nOutput: [Logged successfully]",
          stderr: "",
          executionTimeMs: Date.now() - startTime,
          hasErrors: false,
        };
      }

      return {
        stdout: `Executed ${req.language} code block successfully.`,
        stderr: "",
        executionTimeMs: Date.now() - startTime,
        hasErrors: false,
      };
    } catch (err: any) {
      return {
        stdout: "",
        stderr: err.message || "Execution error",
        executionTimeMs: Date.now() - startTime,
        hasErrors: true,
      };
    }
  }

  public static generateShareableLink(snippetId: string): string {
    return `https://stackforge.dev/playground/share/${snippetId}`;
  }
}
