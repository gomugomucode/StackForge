import * as z from "zod";

export const challengeSchema = z.object({
  title: z.string().min(2, "Challenge title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  solution: z.string().min(2, "Solution is required"),
  hints: z.array(z.string()),
  expectedOutput: z.string().min(1, "Expected output is required"),
  topicId: z.string().optional(),
});

export const challengeSubmissionSchema = z.object({
  challengeId: z.string().min(1, "Challenge ID is required"),
  solution: z.string().min(1, "Solution is required"),
});

export const challengeResultSchema = z.object({
  success: z.boolean(),
  isCorrect: z.boolean(),
  expectedOutput: z.string(),
  xpAwarded: z.number().int().min(0),
});
