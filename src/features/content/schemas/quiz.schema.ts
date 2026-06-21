import * as z from "zod";

export const questionOptionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
});

export const questionSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  options: z.array(z.string().min(1)).min(2, "At least 2 options are required"),
  answer: z.string().min(1, "Answer is required"),
  explanation: z.string().nullable().optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  tags: z.array(z.string()).optional(),
});

export const quizSchema = z.object({
  title: z.string().min(2, "Quiz title is required"),
  description: z.string().nullable().optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  lessonId: z.string().nullable().optional(),
  roadmapId: z.string().nullable().optional(),
  topicId: z.string().nullable().optional(),
  questions: z.array(questionSchema).min(1, "At least one question is required"),
});

export const quizSubmissionSchema = z.object({
  quizId: z.string().min(1, "Quiz ID is required"),
  answers: z.array(z.string()).min(1, "At least one answer is required"),
});

export const quizAttemptSchema = z.object({
  userId: z.string().min(1),
  quizId: z.string().min(1),
  score: z.number().int().min(0).max(100),
  correctAnswers: z.number().int().min(0),
});
