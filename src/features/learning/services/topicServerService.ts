import { prisma } from "@/lib/prisma";
import { Topic } from "@/features/content/types";

export async function getTopicData(technology: string, slug: string) {
  const topic = await prisma.topic.findFirst({
    where: {
      slug,
      technology,
    },
    include: {
      content: true,
      examples: true,
      challenges: true,
      quizzes: true,
      interviews: true,
    },
  });

  if (!topic) return null;

  return {
    topic,
    content: topic.content,
    examples: topic.examples,
    challenges: topic.challenges,
    quizzes: topic.quizzes,
    interviews: topic.interviews,
  };
}
