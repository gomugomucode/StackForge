import type { MarketplacePath, PathReview } from './types'

export const CURATED_PATHS: MarketplacePath[] = [
  {
    id: 'path-react-architect',
    title: 'Fullstack React Architect Path',
    description: 'Master advanced component patterns, clean design systems, state management performance, and Vercel edge deployment strategies.',
    tech_ids: ['react', 'typescript', 'nodejs'],
    tech_labels: ['React', 'TypeScript', 'Node.js'],
    duration: '6 weeks',
    level: 'Advanced',
    price_type: 'free',
    rating_avg: 4.8,
    review_count: 34,
    enrollment_count: 512,
    featured: true,
    thumbnail_gradient: 'from-accent-purple via-[#8b5cf6] to-accent-cyan',
    created_at: new Date().toISOString(),
    tags: ['react', 'architecture', 'fullstack'],
    author: {
      id: 'auth-1',
      display_name: 'lexdev',
      bio: 'Principal Frontend Engineer. Ex-Netflix UI core developer. Passionate about performant user interface patterns.',
      avatar_url: '',
      follower_count: 3420,
      path_count: 3,
      specialties: ['React', 'TypeScript', 'Node.js']
    },
    curriculum: [
      {
        title: 'Week 1: Advanced Component Design',
        duration: '6 hours',
        topics: ['Compound Component Pattern', 'Control Props Pattern', 'Render Props & Custom Hooks composition']
      },
      {
        title: 'Week 2: Custom React Frameworks & SSR',
        duration: '8 hours',
        topics: ['Next.js App Router mechanisms', 'Server Components vs Client Components', 'Streaming & Suspense architectures']
      },
      {
        title: 'Week 3: State Management Performance',
        duration: '10 hours',
        topics: ['Zustand micro-state store config', 'Redux Toolkit structures', 'Context selectors & re-render audits']
      }
    ]
  },
  {
    id: 'path-devops-frontend',
    title: 'DevOps & Containers for Frontend Devs',
    description: 'Bridge the gap between frontend code and operations. Dockerize Single Page Applications, configure Nginx, and build Github Actions workflows.',
    tech_ids: ['docker', 'git', 'aws'],
    tech_labels: ['Docker', 'Git', 'AWS'],
    duration: '4 weeks',
    level: 'Intermediate',
    price_type: 'free',
    rating_avg: 4.6,
    review_count: 18,
    enrollment_count: 247,
    featured: true,
    thumbnail_gradient: 'from-accent-cyan via-[#0ea5e9] to-emerald-400',
    created_at: new Date().toISOString(),
    tags: ['docker', 'devops', 'cicd'],
    author: {
      id: 'auth-2',
      display_name: 'sysops_jack',
      bio: 'DevOps Architect & Site Reliability Engineer. AWS Certified Professional developer. Enthusiastic about automation pipelines.',
      avatar_url: '',
      follower_count: 1240,
      path_count: 2,
      specialties: ['Docker', 'Kubernetes', 'CI/CD']
    },
    curriculum: [
      {
        title: 'Week 1: Containerizing React & Node Apps',
        duration: '5 hours',
        topics: ['Writing multi-stage Dockerfiles', 'Docker Compose for local services dependencies', 'Docker networks configuration']
      },
      {
        title: 'Week 2: Automated Pipelines (CI/CD)',
        duration: '6 hours',
        topics: ['Github Actions testing workflows', 'Docker Hub automated builds', 'Slack notifications integrations']
      },
      {
        title: 'Week 3: Production Cloud Hosting',
        duration: '8 hours',
        topics: ['AWS EC2 hosting configuration', 'Nginx reverse-proxy setup', 'SSL Certificates with Certbot']
      }
    ]
  },
  {
    id: 'path-python-analytics',
    title: 'Python Bootcamp for Analytics & Dashboards',
    description: 'Learn Python programming foundations, query databases, structure data pipelines with Pandas, and construct real-time web dashboards.',
    tech_ids: ['python', 'nodejs'],
    tech_labels: ['Python', 'Node.js'],
    duration: '8 weeks',
    level: 'Beginner',
    price_type: 'premium',
    rating_avg: 4.9,
    review_count: 82,
    enrollment_count: 1420,
    featured: false,
    thumbnail_gradient: 'from-amber-400 via-orange-500 to-rose-500',
    created_at: new Date().toISOString(),
    tags: ['python', 'analytics', 'dashboards'],
    author: {
      id: 'auth-3',
      display_name: 'brian_k',
      bio: 'Data Analyst & Python core contributor. Passionate about teaching clean code paradigms to junior programmers.',
      avatar_url: '',
      follower_count: 5820,
      path_count: 5,
      specialties: ['Python', 'Machine Learning', 'Big Data']
    },
    curriculum: [
      {
        title: 'Week 1: Python Core Foundations',
        duration: '7 hours',
        topics: ['Variables, Loops, and Lists Comprehensions', 'Custom Classes & Dunder methods', 'Error Handling workflows']
      },
      {
        title: 'Week 2: Data Wrangling with Pandas',
        duration: '9 hours',
        topics: ['Loading CSV & JSON data files', 'Dataframes filtering & aggregation', 'Merging SQL database data points']
      },
      {
        title: 'Week 3: Real-Time Streamlit Dashboards',
        duration: '10 hours',
        topics: ['Plotting interactive charts', 'User input sliders and parameters', 'Deploying on Streamlit Cloud']
      }
    ]
  }
]

export const MOCK_REVIEWS: Record<string, PathReview[]> = {
  'path-react-architect': [
    {
      id: 'rev-1',
      path_id: 'path-react-architect',
      username: 'annacodes',
      avatar_url: '',
      rating: 5,
      body: 'Incredible path! The Compound Component Pattern section explained React concepts more clearly than 90% of other online tutorials. Highly recommended.',
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      helpful_count: 12
    },
    {
      id: 'rev-2',
      path_id: 'path-react-architect',
      username: 'codehunter',
      avatar_url: '',
      rating: 4,
      body: 'Excellent material. The Zustand performance tuning tips saved me weeks of debugging in my corporate project.',
      created_at: new Date(Date.now() - 3600000 * 96).toISOString(),
      helpful_count: 7
    }
  ],
  'path-devops-frontend': [
    {
      id: 'rev-3',
      path_id: 'path-devops-frontend',
      username: 'lexdev',
      avatar_url: '',
      rating: 5,
      body: 'Docker multi-stage builds are explained perfectly here. Great for frontend developers looking to expand their skill sets.',
      created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
      helpful_count: 5
    }
  ]
}
