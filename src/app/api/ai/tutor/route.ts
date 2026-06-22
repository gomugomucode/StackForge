import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const prompt = `
      You are a JavaScript execution engine visualizer.
      Analyze the following code and generate a step-by-step execution trace.
      
      CODE:
      ${code}

      For each logical step of execution, provide:
      1. line: The line number currently being executed.
      2. variables: A JSON object representing the state of all variables in the current scope.
      3. callStack: An array of strings representing the current function call stack.
      4. output: The current value of console.log outputs (cumulative).
      5. explanation: A brief, clear explanation of what is happening in this step.

      Return ONLY a JSON array of these steps. Do not include any markdown or extra text.
      Format:
      [
        { "line": 1, "variables": {}, "callStack": ["global"], "output": "", "explanation": "Starting execution..." },
        ...
      ]
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }, // Request JSON mode if supported, or just use the prompt
      }),
    });

    const data = await response.json();
    
    // If the LLM returned a JSON object with a 'steps' key or just the array
    let steps = data.choices[0].message.content;
    try {
      const parsed = JSON.parse(steps);
      steps = parsed.steps || parsed;
    } catch (e) {
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    return NextResponse.json({ steps });
  } catch (error) {
    console.error("[API /ai/tutor] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
