import { getMdxContent } from '@/lib/content-loader'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function RoadmapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const { source } = await getMdxContent(slug, 'roadmaps')
    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="prose prose-slate lg:prose-xl">
          <MDXRemote source={source} />
        </div>
      </div>
    )
  } catch (e) {
    notFound()
  }
}
