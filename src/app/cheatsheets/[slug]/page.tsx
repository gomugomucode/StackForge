import { cheatsheets } from '@/data/cheatsheets'
import { CheatSheetView } from '@/components/cheatsheets/CheatSheetView'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return cheatsheets.map((sheet) => ({
    slug: sheet.slug,
  }))
}

export default async function CheatSheetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sheet = cheatsheets.find(s => s.slug === slug)

  if (!sheet) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-12">
        <SectionHeader 
          title={sheet.title} 
          description={sheet.description}
        />
      </div >
      <CheatSheetView sheet={sheet} />
    </div>
  )
}
