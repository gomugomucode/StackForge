import type { InterviewQuestion } from '../types'

export const awsInterviews: InterviewQuestion[] = [
  {
    question: 'What is AWS EC2?',
    answer: 'Elastic Compute Cloud (EC2) provides resizable, on-demand virtual machines (instances) on the cloud. You configure the OS, memory size, storage volumes, and security network access properties.',
    level: 'Beginner',
  },
  {
    question: 'What is a VPC and what are public vs private subnets?',
    answer: 'A Virtual Private Cloud (VPC) is a logically isolated network segment inside AWS. A Public Subnet has a route table entry pointing to an Internet Gateway, allowing external network communication. A Private Subnet does not have an internet gateway route, isolating instances (e.g. database nodes) from raw incoming requests.',
    level: 'Intermediate',
  },
  {
    question: 'Explain IAM Roles and how they differ from IAM Users.',
    answer: 'An IAM User represents a persistent, human operator or program with permanent keys or passwords. An IAM Role is an identity with permission policies that can be assumed dynamically by any entity (like an EC2 instance or Lambda function) to request short-term, temporary AWS credentials, eliminating the need to hardcode keys.',
    level: 'Advanced',
  },
]
