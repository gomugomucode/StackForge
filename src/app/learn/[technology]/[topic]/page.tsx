import { notFound } from "next/navigation";
import { TopicPage } from "@/features/learning/pages/TopicPage";
import { getTopicData } from "@/features/learning/services/topicServerService";

interface PageProps {
  params: Promise<{
    technology: string;
    topic: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { technology, topic: topicSlug } = await params;

  const data = await getTopicData(technology, topicSlug);

  if (!data) {
    return notFound();
  }

  return (
    <TopicPage 
      topic={data.topic as any}
      content={data.content as any}
      examples={data.examples as any}
      challenges={data.challenges as any}
      quizzes={data.quizzes as any}
      interviews={data.interviews as any}
    />
  );
}
