import type { ProjectDetails } from '../types'

export const awsProjects: ProjectDetails[] = [
  {
    title: 'Cloud-hosted Auto-scaling Server',
    difficulty: 'Advanced',
    description: 'Establish load balanced, auto-scaled VM compute resources hosting backend services, monitored by cloud log metrics.',
    skillsLearned: ['VPC Subnet boundaries', 'Application Load Balancing', 'Auto Scaling groups', 'CloudWatch log tracking'],
    technologies: ['AWS VPC', 'AWS EC2', 'AWS ALB', 'AWS CloudWatch'],
    sourceCodeStructure: `aws-architecture/
├── vpc-setup.tf
├── ec2-user-data.sh
└── alb-scaling-rules.json`,
    developmentRoadmap: [
      'Create VPC with 2 public subnets and 2 private subnets across availability zones.',
      'Configure Application Load Balancer listening to public traffic and forwarding requests.',
      'Provision Launch Templates deploying EC2 VMs with backend scripts loaded via user-data.',
      'Establish Auto Scaling Groups tracking CPU loads to automatically spin up/down VMs.',
    ],
  },
]
