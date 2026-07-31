import { prisma } from "@/lib/prisma";

export interface UserNoteInput {
  userId: string;
  title: string;
  content: string;
  conceptSlug?: string;
  tags?: string[];
}

export class VaultService {
  public static async createNote(input: UserNoteInput) {
    return {
      id: `note_${Date.now()}`,
      userId: input.userId,
      title: input.title,
      content: input.content,
      conceptSlug: input.conceptSlug || null,
      tags: input.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  public static async getUserNotes(userId: string) {
    return [];
  }

  public static async getNotesByConcept(userId: string, conceptSlug: string) {
    return [];
  }
}
