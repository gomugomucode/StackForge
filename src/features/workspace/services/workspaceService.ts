export interface ProjectTask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
  assignedTo?: string;
}

export class WorkspaceService {
  public static async getProjectWorkspace(projectId: string) {
    return {
      projectId,
      tasks: [
        {
          id: "task_1",
          projectId,
          title: "Setup Database Schema & Prisma Migrations",
          description: "Define core relational models and verify constraints",
          status: "DONE",
        },
        {
          id: "task_2",
          projectId,
          title: "Implement Auth & RBAC Security Middleware",
          description: "OAuth2 PKCE and JWT session token validation",
          status: "IN_PROGRESS",
        },
      ] as ProjectTask[],
      checklist: [
        { item: "Environment Configuration Hardened", completed: true },
        { item: "Docker Production Security Check", completed: false },
        { item: "OpenTelemetry Tracing Configured", completed: false },
      ],
    };
  }
}
