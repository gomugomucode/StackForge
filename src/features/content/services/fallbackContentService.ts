export interface StarterProject {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Enterprise";
  description: string;
  slug: string;
}

export class FallbackContentService {
  public static getRecommendedProjects(topicSlug: string): StarterProject[] {
    return [
      { id: "proj-1", title: `${topicSlug.toUpperCase()} Todo App`, difficulty: "Beginner", description: "Build a stateful Todo application.", slug: "todo-app" },
      { id: "proj-2", title: `${topicSlug.toUpperCase()} Weather Dashboard`, difficulty: "Intermediate", description: "Fetch real-time weather metrics.", slug: "weather-dashboard" },
      { id: "proj-3", title: `${topicSlug.toUpperCase()} Enterprise CMS`, difficulty: "Enterprise", description: "Production multi-tenant CMS.", slug: "enterprise-cms" },
    ];
  }

  public static getSmartSearchSuggestions(query: string): string[] {
    const catalog = ["React State Management", "React Hooks Deep Dive", "Virtual DOM & Fiber Engine", "Next.js App Router Architecture", "TypeScript Generics & Inference"];
    const q = query.toLowerCase();
    return catalog.filter((item) => item.toLowerCase().includes(q) || q.split(" ").some((word) => item.toLowerCase().includes(word)));
  }
}
