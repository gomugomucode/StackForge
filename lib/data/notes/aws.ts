import type { NoteChapter } from '../types'

export const awsNotes: NoteChapter[] = [
  {
    id: 'aws-s3',
    title: 'Chapter 1: Cloud Storage with S3',
    content: 'Simple Storage Service (S3) provides highly durable, scalable object storage. It is structured as buckets containing keys and values (files and metadata), accessible via API, SDK, or HTTP URLs.',
    codeSnippet: {
      code: `# Uploading a file using AWS CLI
aws s3 cp localfile.txt s3://my-unique-bucket-name/destination.txt

# Setting up cross-origin resource sharing (CORS) policy
# Allows front-end apps to query files directly from S3`,
      language: 'bash',
    },
    summary: 'S3 provides 99.999999999% durability. Use bucket policies to govern bucket access controls and prevent data leakage.',
  },
]
