export class TopicService {
  static async getTopic(technology: string, topicSlug: string): Promise<any> {
    try {
      const res = await fetch(`/api/learning/topic?technology=${technology}&slug=${topicSlug}`);
      if (!res.ok) {
        throw new Error(await res.text());
      }
      return await res.json();
    } catch (e) {
      console.error("[TopicService] getTopic error:", e);
      return null;
    }
  }

  static async submitQuiz(quizId: string, answers: string[]): Promise<any> {
    try {
      const res = await fetch(`/api/quiz/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, answers }),
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      return await res.json();
    } catch (e) {
      console.error("[TopicService] submitQuiz error:", e);
      throw e;
    }
  }

  static async submitChallenge(challengeId: string, userSolution: string): Promise<any> {
    try {
      const res = await fetch(`/api/learning/challenge/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, solution: userSolution }),
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      return await res.json();
    } catch (e) {
      console.error("[TopicService] submitChallenge error:", e);
      throw e;
    }
  }

  static async toggleTopicCompletion(topicId: string, completed: boolean): Promise<any> {
    try {
      const res = await fetch(`/api/learning/topic/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId, completed }),
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      return await res.json();
    } catch (e) {
      console.error("[TopicService] toggleTopicCompletion error:", e);
      throw e;
    }
  }
}
