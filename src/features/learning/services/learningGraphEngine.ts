import { prisma } from "@/lib/prisma";

export interface ConnectedGraphStep {
  entityType: "LESSON" | "ARTICLE" | "CHEATSHEET" | "QUIZ" | "CHALLENGE" | "PROJECT" | "INTERVIEW" | "CERTIFICATE";
  title: string;
  url: string;
  difficulty: string;
  reason: string;
}

export interface LearningGraphNodeRecommendation {
  currentNode: ConnectedGraphStep;
  nextSteps: ConnectedGraphStep[];
}

export class LearningGraphEngine {
  /**
   * Evaluates the connected DAG step sequence for a given topic/technology
   */
  static async getConnectedLearningPath(technology: string, userLevel = "Beginner"): Promise<LearningGraphNodeRecommendation> {
    const techLower = technology.toLowerCase();

    // 1. Current Lesson Node
    const currentNode: ConnectedGraphStep = {
      entityType: "LESSON",
      title: `${technology.toUpperCase()} Fundamentals & Core Concepts`,
      url: `/learn/${techLower}/overview`,
      difficulty: userLevel,
      reason: `Primary foundational node in your ${technology} learning graph.`,
    };

    // 2. Next DAG Sequential Steps
    const nextSteps: ConnectedGraphStep[] = [
      {
        entityType: "ARTICLE",
        title: `Deep-Dive: Production ${technology} Best Practices`,
        url: `/blog`,
        difficulty: userLevel,
        reason: `Enrich your conceptual understanding with real engineering walkthroughs.`,
      },
      {
        entityType: "CHEATSHEET",
        title: `${technology.toUpperCase()} Quick Reference Cheatsheet`,
        url: `/cheatsheets`,
        difficulty: "All Levels",
        reason: `Keep API definitions & syntax patterns readily available.`,
      },
      {
        entityType: "QUIZ",
        title: `${technology.toUpperCase()} Knowledge Diagnostics`,
        url: `/quizzes`,
        difficulty: userLevel,
        reason: `Validate retention and identify weak knowledge areas.`,
      },
      {
        entityType: "CHALLENGE",
        title: `Interactive Code Challenge: ${technology} Problem Solving`,
        url: `/learn/${techLower}/closure-scope`,
        difficulty: userLevel,
        reason: `Apply concept rules directly in the browser sandbox.`,
      },
      {
        entityType: "PROJECT",
        title: `Production Portfolio App with ${technology}`,
        url: `/projects`,
        difficulty: "Intermediate",
        reason: `Build a production-grade application featuring real-world requirements.`,
      },
      {
        entityType: "INTERVIEW",
        title: `${technology.toUpperCase()} System Design & Coding Interview Questions`,
        url: `/interview`,
        difficulty: "Advanced",
        reason: `Prepare for technical interview questions asked by top tech companies.`,
      },
      {
        entityType: "CERTIFICATE",
        title: `Verified ${technology.toUpperCase()} Skill Certificate`,
        url: `/cert`,
        difficulty: "All Levels",
        reason: `Earn a verifiable certificate backed by evidence of completed projects.`,
      },
    ];

    return {
      currentNode,
      nextSteps,
    };
  }
}
