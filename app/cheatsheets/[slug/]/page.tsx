import { getMdxContent } from '@/lib/content-loader'
import { notFound } from 'next/navigation'
import { MDXContent } from 'next-mdx-remote/compile'

export default async function CheatsheetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const { compiled } = await getMdxContent(slug, 'cheatsheets')
    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="prose prose-slate lg:prose-xl">
          <MDXContent compiled={compiled} />
        </div>
      </div>
    )
  } catch (e) {
    notFound()
  }
}
