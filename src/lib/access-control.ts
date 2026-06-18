export type UserPlan = 'FREE' | 'PRO' | 'ENTERPRISE';

export const PLAN_LIMITS = {
  FREE: {
    aiMessagesPerDay: 5,
    mockInterviewsPerWeek: 1,
    certificationsLimit: 1,
    projectsSubmissionLimit: 3,
  },
  PRO: {
    aiMessagesPerDay: 100,
    mockInterviewsPerWeek: 20,
    certificationsLimit: 10,
    projectsSubmissionLimit: 50,
  },
  ENTERPRISE: {
    aiMessagesPerDay: Infinity,
    mockInterviewsPerWeek: Infinity,
    certificationsLimit: Infinity,
    projectsSubmissionLimit: Infinity,
  },
};

export function hasAccess(userPlan: UserPlan, feature: keyof typeof PLAN_LIMITS['FREE'], currentUsage: number): boolean {
  const limit = PLAN_LIMITS[userPlan][feature];
  if (limit === Infinity) return true;
  return currentUsage < limit;
}

export function getPlanBenefits(plan: UserPlan) {
  return {
    name: plan,
    benefits: Object.entries(PLAN_LIMITS[plan]).map(([key, value]) => ({
      feature: key.replace(/([A-Z])/g, ' $1').toLowerCase(),
      limit: value === Infinity ? 'Unlimited' : `${value} per period`
    }))
  };
}
