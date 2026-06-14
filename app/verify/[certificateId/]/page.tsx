import { prisma } from '@/server/db/client'
import { notFound } from 'next/navigation'

export default async function VerifyPage({ params }: { params: Promise<{ certificateId: string }> }) {
  const { certificateId } = await params
  
  const certificate = await prisma.certificate.findUnique({
    where: { id: certificateId },
    include: { user: true },
  })

  if (!certificate) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto py-20 px-6 text-center">
      <div className="p-12 bg-white rounded-3xl shadow-2xl border-8 border-double border-gold-500">
        <h1 className="text-4xl font-serif font-bold mb-4 text-gray-900">Certificate of Completion</h1>
        <p className="text-xl text-gray-600 mb-8">This is to certify that</p>
        <h2 className="text-3xl font-bold mb-8 text-accent-purple">{certificate.user.name || 'The Learner'}</h2>
        <p className="text-lg text-gray-600 mb-12">
          has successfully completed the course
          <br />
          <span className="font-bold text-gray-900">{certificate.courseName}</span>
        </p>
        <div className="flex justify-between items-end mt-20">
          <div className="text-left">
            <p className="text-sm text-gray-500">Issued on</p>
            <p className="font-bold">{certificate.issueDate.toDateString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Verification Code</p>
            <p className="font-mono font-bold">{certificate.verificationCode}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
