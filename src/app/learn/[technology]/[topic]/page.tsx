import { notFound } from "next/navigation";
import { TopicPage } from "@/features/learning/pages/TopicPage";
import { getTopicData } from "@/features/learning/services/topicServerService";

interface PageProps {
  params: {
    technology: string;
    topic: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { technology, topic: topicSlug } = params;

  const data = await getTopicData(technology, topicSlug);

  if (!data) {
    return notFound();
  }

  return (
    <TopicPage 
      topic={data.topic}
      content={data.content}
      examples={data.examples}
      challenges={data.challenges}
      quizzes={data.quizzes}
      interviews={data.interviews}
    />
  );
}
