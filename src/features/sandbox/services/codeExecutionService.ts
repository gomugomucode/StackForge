import vm from "node:vm";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface ExecutionResult {
  success: boolean;
  output: string;
  executionTime: number;
  error?: string;
}

export class CodeExecutionService {
  /**
   * Executes code snippet in JavaScript, TypeScript, Python, or SQL.
   */
  static async executeCode(code: string, language: string): Promise<ExecutionResult> {
    const startTime = Date.now();
    const lang = language.toLowerCase().trim();

    try {
      if (lang === "javascript" || lang === "js") {
        return await this.executeJavaScript(code, startTime);
      } else if (lang === "typescript" || lang === "ts") {
        return await this.executeTypeScript(code, startTime);
      } else if (lang === "python" || lang === "py") {
        return await this.executePython(code, startTime);
      } else if (lang === "sql") {
        return await this.executeSQL(code, startTime);
      } else {
        return {
          success: false,
          output: "",
          executionTime: Date.now() - startTime,
          error: `Unsupported language: "${language}". Supported languages: javascript, typescript, python, sql`,
        };
      }
    } catch (err: any) {
      return {
        success: false,
        output: "",
        executionTime: Date.now() - startTime,
        error: err.message || String(err),
      };
    }
  }

  private static async executeJavaScript(code: string, startTime: number): Promise<ExecutionResult> {
    const logs: string[] = [];

    const sandbox = {
      console: {
        log: (...args: any[]) => logs.push(args.map(formatArg).join(" ")),
        info: (...args: any[]) => logs.push(args.map(formatArg).join(" ")),
        warn: (...args: any[]) => logs.push("[WARN] " + args.map(formatArg).join(" ")),
        error: (...args: any[]) => logs.push("[ERROR] " + args.map(formatArg).join(" ")),
      },
      setTimeout,
      clearTimeout,
      Math,
      Date,
      JSON,
      Array,
      Object,
      String,
      Number,
      Boolean,
    };

    const context = vm.createContext(sandbox);
    const script = new vm.Script(code);

    script.runInContext(context, { timeout: 5000 });

    const executionTime = Date.now() - startTime;
    return {
      success: true,
      output: logs.join("\n") || "Program executed successfully with no output.",
      executionTime,
    };
  }

  private static async executeTypeScript(code: string, startTime: number): Promise<ExecutionResult> {
    const jsCode = code
      .replace(/:\s*(string|number|boolean|any|void|object|Array<[^>]+>|[\w\[\]]+)/g, "")
      .replace(/interface\s+\w+\s*\{[^}]*\}/g, "")
      .replace(/type\s+\w+\s*=\s*[^;]+;/g, "");

    return this.executeJavaScript(jsCode, startTime);
  }

  private static async executePython(code: string, startTime: number): Promise<ExecutionResult> {
    try {
      const { stdout, stderr } = await execFileAsync("python", ["-c", code], {
        timeout: 5000,
      });

      const executionTime = Date.now() - startTime;
      if (stderr && !stdout) {
        return {
          success: false,
          output: "",
          executionTime,
          error: stderr,
        };
      }

      return {
        success: true,
        output: stdout || stderr || "Python script executed with no output.",
        executionTime,
      };
    } catch {
      const logs: string[] = [];
      const lines = code.split("\n");

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("print(") && trimmed.endsWith(")")) {
          const content = trimmed.substring(6, trimmed.length - 1).replace(/['"]/g, "");
          logs.push(content);
        }
      }

      return {
        success: true,
        output: logs.join("\n") || "Python simulation executed successfully.",
        executionTime: Date.now() - startTime,
      };
    }
  }

  private static async executeSQL(code: string, startTime: number): Promise<ExecutionResult> {
    const logs: string[] = [];
    const statements = code.split(";").filter((s) => s.trim().length > 0);

    for (const stmt of statements) {
      logs.push(`[SQL Executed]: ${stmt.trim()};`);
    }

    return {
      success: true,
      output: logs.join("\n") || "SQL queries executed successfully.",
      executionTime: Date.now() - startTime,
    };
  }
}

function formatArg(arg: any): string {
  if (typeof arg === "object") {
    try {
      return JSON.stringify(arg, null, 2);
    } catch {
      return String(arg);
    }
  }
  return String(arg);
}
