import type { RoadmapData } from '../types'

export const gitRoadmap: RoadmapData = {
  overview: {
    title: 'Git',
    description: 'The industry-standard version control system. Track modifications, collaborate with team members, and manage releases.',
    whatIsIt: 'Git is a distributed version control system designed to track changes in source code during software development.',
    whyLearnIt: 'It is essential for team collaboration, codebase branching, reverting bugs, and CI/CD pipelines deployment integration.',
    careerOpportunities: 'A fundamental skill required for every developer position (Frontend, Backend, DevOps, etc.).',
    salaryInfo: 'Essential basic skill, acts as multiplier for team development velocity.',
    industryDemand: 'Ubiquitous. Virtually all software engineering teams require git.',
  },
  phases: [
    {
      title: 'Phase 1 - Basics',
      description: 'Initialize directories and commit local changes.',
      topics: [
        { name: 'Git Config & Init', description: 'Setting username/email globally and creating local repositories with git init.' },
        { name: 'Staging & Committing', description: 'Staging changes with git add, reviewing status, and committing changes with git commit.' },
        { name: 'Git Log & Diff', description: 'Reviewing commit logs history and comparing modified file lines.' },
      ],
    },
    {
      title: 'Phase 2 - Branching & Collaboration',
      description: 'Collaborate with remote repositories using branches.',
      topics: [
        { name: 'Branch Management', description: 'Creating branches, switching, deleting, and merging branches.' },
        { name: 'Remotes (Push/Pull)', description: 'Adding remote servers, pushing branches, and fetching/pulling updates from Github/Gitlab.' },
        { name: 'Merge Conflicts', description: 'Identifying, editing conflict markers, and final staging conflict resolution.' },
      ],
    },
    {
      title: 'Phase 3 - Advanced Operations',
      description: 'Rearrange histories and handle complex development tasks.',
      topics: [
        { name: 'Git Stash', description: 'Temporarily saving uncommitted changes to switch branches without committing.' },
        { name: 'Rebase vs Merge', description: 'Combining branches by rewriting parent commits timeline vs creating merge commits.' },
        { name: 'Cherry Pick & Reset', description: 'Applying individual commits to active branch, resetting files to index, soft/hard resets.' },
      ],
    },
  ],
}
