import type { ProjectDetails } from '../types'

export const pythonProjects: ProjectDetails[] = [
  {
    title: 'Text-Based Quiz game',
    difficulty: 'Beginner',
    description: 'A console interface that loads questions from a dictionary, grades replies, and tracks total score.',
    skillsLearned: ['Loops & Conditionals', 'Data Collections', 'Console Input/Output', 'String formatting'],
    technologies: ['Python 3'],
    sourceCodeStructure: `quiz_game/
├── quiz.py
└── questions.json`,
    developmentRoadmap: [
      'Write a questions.json file holding questions keys and multiple choices arrays.',
      'Open and load questions using the json python module.',
      'Iterate questions, print choices, collect input answers, and evaluate.',
      'Display final results, grading statistics, and restart trigger.',
    ],
  },
  {
    title: 'Multi-threaded Port Scanner',
    difficulty: 'Intermediate',
    description: 'A fast systems utility that probes TCP port ranges on a target host to identify active endpoints.',
    skillsLearned: ['Sockets Networking', 'Threading & Concurrency', 'Command Line arguments (argparse)', 'IP Resolution'],
    technologies: ['Python 3', 'Socket Library', 'Threading Module'],
    sourceCodeStructure: `port_scanner/
└── scanner.py`,
    developmentRoadmap: [
      'Import socket and threading modules.',
      'Parse CLI host address and port boundary ranges using argparse.',
      'Create thread pool to launch concurrent socket connect_ex queries.',
      'Collect and log active open ports in a formatted list.',
    ],
  },
  {
    title: 'REST API Web Crawler',
    difficulty: 'Advanced',
    description: 'Scrapes data from blogs or websites recursively and compiles it into a structured SQL database with FastAPI endpoints.',
    skillsLearned: ['HTML parsing (BeautifulSoup)', 'HTTP Requests (httpx)', 'Databases (SQLite/SQLAlchemy)', 'REST design'],
    technologies: ['Python 3', 'FastAPI', 'BeautifulSoup4', 'SQLAlchemy'],
    sourceCodeStructure: `scraper_api/
├── main.py
├── database.py
├── models.py
└── crawler.py`,
    developmentRoadmap: [
      'Set up database schemas, connection engines, and data models using SQLAlchemy.',
      'Implement asynchronous crawler utility using httpx to download page contents.',
      'Extract content nodes from HTML using BeautifulSoup and save them to the database.',
      'Create FastAPI endpoints to trigger scans, filter results, and serve scraped data.',
    ],
  },
]
