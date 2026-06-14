import { supabase } from '../../lib/supabase'
import type { CommunityPost, PostComment, StudyGroup, Challenge, LeaderboardEntry } from './types'

// Keys for local sandbox storage fallback
const KEYS = {
  posts: 'stackforge_local_posts',
  comments: (postId: string) => `stackforge_local_comments_${postId}`,
  groups: 'stackforge_local_groups',
  challenges: 'stackforge_local_challenges',
}

// ─── Pre-Populated Mock Data ──────────────────────────────────────────────────
const MOCK_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    user_id: 'mock-user-1',
    title: 'How do you handle complex state in large React Apps?',
    content: `I'm building an e-commerce platform and finding that lifting state up is leading to prop drilling, but using Context is causing unnecessary re-renders. \n\nShould I move to Zustand or Redux Toolkit? What are your experiences?`,
    category: 'question',
    tags: ['react', 'state-management', 'architecture'],
    upvotes: 42,
    comment_count: 5,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    profiles: { username: 'lexdev', avatar_url: '', level: 8 }
  },
  {
    id: 'post-2',
    user_id: 'mock-user-2',
    title: 'Showcase: My custom CLI script built with Node & Commander',
    content: `Just published a small NPM package that automates project folder structures based on TSConfig. \n\nFeatures:\n- Automatic package.json generation\n- Tailwind configs integration\n- Github Action setups out-of-the-box.\n\nFeedback appreciated! Link in comments.`,
    category: 'showcase',
    tags: ['nodejs', 'cli', 'automation'],
    upvotes: 28,
    comment_count: 2,
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    profiles: { username: 'annacodes', avatar_url: '', level: 12 }
  },
  {
    id: 'post-3',
    user_id: 'mock-user-3',
    title: 'Tip: Always cleanup your event listeners in useEffect!',
    content: `A common source of memory leaks in React is registering a scroll listener or timer inside a useEffect and forgetting to return a cleanup function. \n\n\`\`\`jsx\nuseEffect(() => {\n  const handler = () => console.log('scroll');\n  window.addEventListener('scroll', handler);\n  // cleanup\n  return () => window.removeEventListener('scroll', handler);\n}, []);\n\`\`\``,
    category: 'tip',
    tags: ['react', 'hooks', 'performance'],
    upvotes: 67,
    comment_count: 3,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    profiles: { username: 'brian_k', avatar_url: '', level: 15 }
  }
]

const MOCK_GROUPS: StudyGroup[] = [
  { id: 'group-1', name: 'React Developers', description: 'Weekly discussions, code review, and portfolio advice for React developers.', tech_focus: 'React', created_by: 'lexdev', member_count: 24, is_public: true, created_at: new Date().toISOString() },
  { id: 'group-2', name: 'Algorithms & Data Structures', description: 'Cracking the coding interview together. Mock interviews & LeetCode problems review.', tech_focus: 'JavaScript', created_by: 'annacodes', member_count: 18, is_public: true, created_at: new Date().toISOString() },
  { id: 'group-3', name: 'Docker & Kubernetes Mastery', description: 'Exploring containers, Dockerfiles, volumes, networks, and cluster orchestration.', tech_focus: 'Docker', created_by: 'sysops_jack', member_count: 12, is_public: true, created_at: new Date().toISOString() }
]

const MOCK_CHALLENGES: Challenge[] = [
  { id: 'chal-1', title: 'Implement a custom debounce hook', description: 'Create a useDebounce hook in React that returns a debounced value, preventing excessive handler executions.', tech_id: 'react', tech_label: 'React', xp_reward: 150, deadline: new Date(Date.now() + 3600000 * 48).toISOString(), difficulty: 'medium', submission_count: 32 },
  { id: 'chal-2', title: 'Write an asynchronous retry function', description: 'Write a utility function in TS that wraps a promise-returning function and retries it N times with exponential backoff on failure.', tech_id: 'typescript', tech_label: 'TypeScript', xp_reward: 200, deadline: new Date(Date.now() + 3600000 * 96).toISOString(), difficulty: 'hard', submission_count: 14 },
  { id: 'chal-3', title: 'Containerize a Node.js REST API', description: 'Assemble a Dockerfile and docker-compose.yml for a Node backend that connects to a PostgreSQL database with health checks.', tech_id: 'docker', tech_label: 'Docker', xp_reward: 120, deadline: new Date(Date.now() + 3600000 * 12).toISOString(), difficulty: 'easy', submission_count: 47 }
]

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, user_id: 'l1', username: 'annacodes', xp: 14200, level: 15, streak: 22, completed_techs: 4 },
  { rank: 2, user_id: 'l2', username: 'brian_k', xp: 12850, level: 13, streak: 15, completed_techs: 3 },
  { rank: 3, user_id: 'l3', username: 'lexdev', xp: 9800, level: 10, streak: 8, completed_techs: 2 },
  { rank: 4, user_id: 'l4', username: 'codehunter', xp: 7550, level: 8, streak: 5, completed_techs: 2 },
  { rank: 5, user_id: 'l5', username: 'stackninja', xp: 5400, level: 6, streak: 12, completed_techs: 1 },
]

// ─── Storage Initializers ─────────────────────────────────────────────────────
function initLocalData() {
  if (!localStorage.getItem(KEYS.posts)) {
    localStorage.setItem(KEYS.posts, JSON.stringify(MOCK_POSTS))
  }
  if (!localStorage.getItem(KEYS.groups)) {
    localStorage.setItem(KEYS.groups, JSON.stringify(MOCK_GROUPS))
  }
  if (!localStorage.getItem(KEYS.challenges)) {
    localStorage.setItem(KEYS.challenges, JSON.stringify(MOCK_CHALLENGES))
  }
}

// ─── API Services ─────────────────────────────────────────────────────────────
export const communityService = {
  // --- POSTS ---
  async getPosts(category?: string): Promise<CommunityPost[]> {
    initLocalData()
    try {
      let query = supabase.from('posts').select('*, profiles(username, avatar_url, level)')
      if (category) {
        query = query.eq('category', category)
      }
      const { data, error } = await query.order('created_at', { ascending: false })
      if (!error && data) return data as unknown as CommunityPost[]
    } catch (e) {
      console.warn('Supabase query failed, falling back to local posts:', e)
    }

    const localPosts = JSON.parse(localStorage.getItem(KEYS.posts) || '[]') as CommunityPost[]
    if (category) {
      return localPosts.filter(p => p.category === category)
    }
    return localPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  },

  async createPost(
    title: string,
    content: string,
    category: string,
    tags: string[],
    username = 'Anonymous'
  ): Promise<CommunityPost> {
    initLocalData()
    const newPost: CommunityPost = {
      id: `post-${Math.random().toString(36).substring(2)}`,
      user_id: 'user-local-id',
      title,
      content,
      category: category as any,
      tags,
      upvotes: 0,
      comment_count: 0,
      created_at: new Date().toISOString(),
      profiles: { username, avatar_url: '', level: 1 }
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          title,
          content,
          category,
          tags
        })
        .select('*, profiles(username, avatar_url, level)')
        .single()
      if (!error && data) return data as unknown as CommunityPost
    } catch (e) {
      console.warn('Supabase insert failed, saving locally:', e)
    }

    const localPosts = JSON.parse(localStorage.getItem(KEYS.posts) || '[]') as CommunityPost[]
    localPosts.unshift(newPost)
    localStorage.setItem(KEYS.posts, JSON.stringify(localPosts))
    return newPost
  },

  async upvotePost(postId: string): Promise<number> {
    initLocalData()
    // Local voting simulation
    const localPosts = JSON.parse(localStorage.getItem(KEYS.posts) || '[]') as CommunityPost[]
    const found = localPosts.find(p => p.id === postId)
    if (found) {
      found.upvotes += 1
      localStorage.setItem(KEYS.posts, JSON.stringify(localPosts))
      return found.upvotes
    }
    return 0
  },

  // --- COMMENTS ---
  async getComments(postId: string): Promise<PostComment[]> {
    try {
      const { data, error } = await supabase
        .from('post_comments')
        .select('*, profiles(username, avatar_url)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

      if (!error && data) return data as unknown as PostComment[]
    } catch (e) {
      console.warn('Supabase comments select failed, checking local:', e)
    }

    const localKey = KEYS.comments(postId)
    return JSON.parse(localStorage.getItem(localKey) || '[]') as PostComment[]
  },

  async addComment(postId: string, content: string, username = 'Anonymous'): Promise<PostComment> {
    const newComment: PostComment = {
      id: `comm-${Math.random().toString(36).substring(2)}`,
      post_id: postId,
      user_id: 'user-local-id',
      content,
      upvotes: 0,
      created_at: new Date().toISOString(),
      profiles: { username, avatar_url: '' }
    }

    try {
      const { data, error } = await supabase
        .from('post_comments')
        .insert({
          post_id: postId,
          content
        })
        .select('*, profiles(username, avatar_url)')
        .single()
      if (!error && data) return data as unknown as PostComment
    } catch (e) {
      console.warn('Supabase comment insert failed, saving locally:', e)
    }

    // Save locally
    const localKey = KEYS.comments(postId)
    const list = JSON.parse(localStorage.getItem(localKey) || '[]') as PostComment[]
    list.push(newComment)
    localStorage.setItem(localKey, JSON.stringify(list))

    // Update post count
    const localPosts = JSON.parse(localStorage.getItem(KEYS.posts) || '[]') as CommunityPost[]
    const post = localPosts.find(p => p.id === postId)
    if (post) {
      post.comment_count += 1
      localStorage.setItem(KEYS.posts, JSON.stringify(localPosts))
    }

    return newComment
  },

  // --- STUDY GROUPS ---
  async getStudyGroups(): Promise<StudyGroup[]> {
    initLocalData()
    try {
      const { data, error } = await supabase.from('study_groups').select('*')
      if (!error && data) return data as StudyGroup[]
    } catch (e) {
      console.warn('Supabase group fetch failed, checking local:', e)
    }

    return JSON.parse(localStorage.getItem(KEYS.groups) || '[]') as StudyGroup[]
  },

  async toggleJoinGroup(groupId: string): Promise<boolean> {
    initLocalData()
    const localGroups = JSON.parse(localStorage.getItem(KEYS.groups) || '[]') as StudyGroup[]
    const found = localGroups.find(g => g.id === groupId)
    let joined = false
    if (found) {
      if (found.is_member) {
        found.member_count = Math.max(0, found.member_count - 1)
        found.is_member = false
        joined = false
      } else {
        found.member_count += 1
        found.is_member = true
        joined = true
      }
      localStorage.setItem(KEYS.groups, JSON.stringify(localGroups))
    }
    return joined
  },

  // --- CHALLENGES ---
  async getChallenges(): Promise<Challenge[]> {
    initLocalData()
    try {
      const { data, error } = await supabase.from('challenges').select('*')
      if (!error && data) return data as Challenge[]
    } catch (e) {
      console.warn('Supabase challenges fetch failed, checking local:', e)
    }

    return JSON.parse(localStorage.getItem(KEYS.challenges) || '[]') as Challenge[]
  },

  async submitChallenge(challengeId: string): Promise<boolean> {
    initLocalData()
    const localChals = JSON.parse(localStorage.getItem(KEYS.challenges) || '[]') as Challenge[]
    const found = localChals.find(c => c.id === challengeId)
    if (found) {
      found.submission_count += 1
      found.has_submitted = true
      localStorage.setItem(KEYS.challenges, JSON.stringify(localChals))
      return true
    }
    return false
  },

  // --- LEADERBOARD ---
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, xp, level, streak')
        .order('xp', { ascending: false })
        .limit(10)

      if (!error && data) {
        return data.map((d, index) => ({
          rank: index + 1,
          user_id: d.id,
          username: d.username || 'Anonymous',
          avatar_url: d.avatar_url || '',
          xp: d.xp || 0,
          level: d.level || 1,
          streak: d.streak || 0,
          completed_techs: 0
        }))
      }
    } catch (e) {
      console.warn('Supabase leaderboard fetch failed, falling back to mock:', e)
    }

    return MOCK_LEADERBOARD
  }
}
