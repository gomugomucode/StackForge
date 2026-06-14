import type { ProjectDetails } from '../types'

export const nodejsProjects: ProjectDetails[] = [
  {
    title: 'Express REST Server',
    difficulty: 'Beginner',
    description: 'An API server mapping routing structures, query variables, parsing body inputs, and returning JSON responses.',
    skillsLearned: ['REST API architecture', 'Express routing', 'JSON parsing', 'Postman testing'],
    technologies: ['Node.js', 'Express', 'NPM'],
    sourceCodeStructure: `express-api/
├── package.json
├── server.js
└── data.json`,
    developmentRoadmap: [
      'Initialize npm package, install express, and configure main server script.',
      'Configure GET, POST, PUT, DELETE routes targeting a local JSON database.',
      'Add body-parser middleware to format incoming post payloads.',
      'Test server connections locally and return appropriate HTTP response status codes.',
    ],
  },
  {
    title: 'Collaborative Chat System',
    difficulty: 'Intermediate',
    description: 'A WebSockets multi-room server that facilitates instantaneous messaging transmission across connected browser clients.',
    skillsLearned: ['WebSockets API', 'Event-based programming', 'Connection pooling', 'Message serialization'],
    technologies: ['Node.js', 'ws library', 'HTTP server'],
    sourceCodeStructure: `ws-chat/
├── server.js
├── public/
│   ├── index.html
│   └── chat.js
└── package.json`,
    developmentRoadmap: [
      'Create HTTP server and bind WebSocket listener instance.',
      'Listen for client socket connection handshakes and manage user socket pools.',
      'Broadcast incoming events to all other socket connection descriptors.',
      'Incorporate disconnect listeners to remove inactive client descriptions and broadcast statuses.',
    ],
  },
]
