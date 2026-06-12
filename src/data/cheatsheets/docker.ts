import type { CheatsheetCommand } from '../types'

export const dockerCheatsheet: CheatsheetCommand[] = [
  {
    command: 'docker run -d -p <host>:<container> <image>',
    description: 'Runs a container in detached mode mapping host ports to container ports.',
    example: 'docker run -d -p 8080:80 nginx',
    category: 'Containers',
  },
  {
    command: 'docker build -t <tag-name> .',
    description: 'Builds an image from a Dockerfile in the current directory.',
    example: 'docker build -t myapp:1.0 .',
    category: 'Images',
  },
  {
    command: 'docker-compose up -d',
    description: 'Starts and runs the entire multi-container service in detached background modes.',
    example: 'docker-compose up -d',
    category: 'Compose',
  },
  {
    command: 'docker exec -it <container-id> sh',
    description: 'Opens an interactive shell terminal session inside a running container.',
    example: 'docker exec -it web-server sh',
    category: 'Advanced',
  },
]
