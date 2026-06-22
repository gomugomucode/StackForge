export type ResourceType = 'DOCS' | 'VIDEO' | 'BOOK' | 'PRACTICE';

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: ResourceType;
  technologySlug: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  
  // For BOOK type
  author?: string;
  purchaseUrl?: string;
}

export interface ResourceFilter {
  type?: ResourceType;
  technology?: string;
  difficulty?: string;
  search?: string;
}
