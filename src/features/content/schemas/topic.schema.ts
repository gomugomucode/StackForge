import * as z from "zod";

export const topicContentSchema = z.object({
  overview: z.string().min(10, "Overview must be at least 10 characters"),
  syntax: z.string().min(2, "Syntax is required"),
  explanation: z.string().min(10, "Explanation must be at least 10 characters"),
  bestPractices: z.array(z.string()).min(1, "At least one best practice is required"),
  commonMistakes: z.array(z.string()).min(1, "At least one common mistake is required"),
});

export const topicExampleSchema = z.object({
  title: z.string().min(2, "Example title is required"),
  code: z.string().min(2, "Example code is required"),
  output: z.string().min(1, "Expected output is required"),
  explanation: z.string().min(5, "Example explanation is required"),
});

export const challengeSchema = z.object({
  title: z.string().min(2, "Challenge title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  solution: z.string().min(2, "Solution is required"),
  hints: z.array(z.string()),
  expectedOutput: z.string().min(1, "Expected output is required"),
});

export const topicSchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric and hyphens only"),
  technology: z.string().min(2),
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  estimatedTime: z.number().int().positive().default(60),
  prerequisites: z.array(z.string()),
  nextTopics: z.array(z.string()),
  content: topicContentSchema.optional(),
  examples: z.array(topicExampleSchema).optional(),
  challenges: z.array(challengeSchema).optional(),
});
