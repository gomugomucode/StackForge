import { prisma } from "@/lib/prisma";
import { Topic, TopicContent, TopicExample, Challenge } from "../types/topic";

export class ContentService {
  static async getTopicBySlug(technology: string, slug: string): Promise<any> {
    try {
      const topic = await prisma.topic.findFirst({
        where: {
          technology: technology.toLowerCase(),
          slug: slug.toLowerCase(),
        },
        include: {
          content: true,
          examples: true,
          challenges: true,
          quizzes: {
            include: {
              questions: true,
            },
          },
          interviews: true,
        },
      });
      return topic;
    } catch (error) {
      console.error(`[ContentService] Error fetching topic by slug ${technology}/${slug}:`, error);
      return null;
    }
  }

  static async getTopicsByTechnology(technology: string): Promise<any[]> {
    try {
      return await prisma.topic.findMany({
        where: {
          technology: technology.toLowerCase(),
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } catch (error) {
      console.error(`[ContentService] Error fetching topics by technology ${technology}:`, error);
      return [];
    }
  }

  static async upsertTopic(data: any): Promise<any> {
    const { slug, technology, title, description, difficulty, estimatedTime, prerequisites, nextTopics, content, examples, challenges, quizzes, interviews } = data;
    
    try {
      return await prisma.$transaction(async (tx) => {
        // 1. Upsert Topic main record
        const topic = await tx.topic.upsert({
          where: { slug: slug.toLowerCase() },
          update: {
            technology: technology.toLowerCase(),
            title,
            description,
            difficulty,
            estimatedTime,
            prerequisites,
            nextTopics,
          },
          create: {
            slug: slug.toLowerCase(),
            technology: technology.toLowerCase(),
            title,
            description,
            difficulty,
            estimatedTime,
            prerequisites,
            nextTopics,
          },
        });

        // 2. Upsert Content
        if (content) {
          await tx.topicContent.upsert({
            where: { topicId: topic.id },
            update: {
              overview: content.overview,
              syntax: content.syntax,
              explanation: content.explanation,
              bestPractices: content.bestPractices,
              commonMistakes: content.commonMistakes,
            },
            create: {
              topicId: topic.id,
              overview: content.overview,
              syntax: content.syntax,
              explanation: content.explanation,
              bestPractices: content.bestPractices,
              commonMistakes: content.commonMistakes,
            },
          });
        }

        // 3. Recreate Examples
        if (examples && examples.length > 0) {
          await tx.topicExample.deleteMany({ where: { topicId: topic.id } });
          await tx.topicExample.createMany({
            data: examples.map((ex: any) => ({
              topicId: topic.id,
              title: ex.title,
              code: ex.code,
              output: ex.output,
              explanation: ex.explanation,
            })),
          });
        }

        // 4. Recreate Challenges
        if (challenges && challenges.length > 0) {
          await tx.challenge.deleteMany({ where: { topicId: topic.id } });
          await tx.challenge.createMany({
            data: challenges.map((ch: any) => ({
              topicId: topic.id,
              title: ch.title,
              description: ch.description,
              difficulty: ch.difficulty,
              solution: ch.solution,
              hints: ch.hints || [],
              expectedOutput: ch.expectedOutput,
            })),
          });
        }

        // 5. Recreate Quizzes
        if (quizzes && quizzes.length > 0) {
          for (const q of quizzes) {
            const quiz = await tx.quiz.upsert({
              where: { id: q.id || `quiz-${topic.slug}` },
              update: {
                title: q.title,
                description: q.description || null,
                difficulty: q.difficulty,
                topicId: topic.id,
              },
              create: {
                id: q.id || `quiz-${topic.slug}`,
                title: q.title,
                description: q.description || null,
                difficulty: q.difficulty,
                topicId: topic.id,
              },
            });

            if (q.questions && q.questions.length > 0) {
              await tx.question.deleteMany({ where: { quizId: quiz.id } });
              await tx.question.createMany({
                data: q.questions.map((qn: any) => ({
                  quizId: quiz.id,
                  question: qn.question,
                  options: qn.options,
                  answer: qn.answer,
                  explanation: qn.explanation || null,
                  difficulty: qn.difficulty || q.difficulty,
                })),
              });
            }
          }
        }

        // 6. Recreate Interviews
        if (interviews && interviews.length > 0) {
          await tx.interviewQuestion.deleteMany({ where: { topicId: topic.id } });
          await tx.interviewQuestion.createMany({
            data: interviews.map((iq: any) => ({
              topicId: topic.id,
              question: iq.question,
              answer: iq.answer,
              difficulty: iq.difficulty,
              tags: iq.tags || [],
              companyFrequency: iq.companyFrequency || 0,
            })),
          });
        }

        return topic;
      });
    } catch (error) {
      console.error(`[ContentService] Error upserting topic ${slug}:`, error);
      throw error;
    }
  }
}
