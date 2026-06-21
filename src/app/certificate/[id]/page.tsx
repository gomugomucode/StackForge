import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Certification } from "@/features/content/types"; // Assuming types exist

async function getCertificate(id: string) {
  const cert = await prisma.certification.findUnique({
    where: { id },
    include: {
      user: {
        select: { name: true },
      },
      // We might need to link to roadmap for the title
    },
  });
  return cert;
}

export default async function CertificatePage({ params }: { params: { id: string } }) {
  const cert = await getCertificate(params.id);

  if (!cert) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <div className="max-w-3xl w-full bg-white text-black rounded-2xl p-12 shadow-2xl border-[16px] border-double border-primary relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-16 -translate-y-16 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full translate-x-16 translate-y-16 blur-3xl" />

        <div className="text-center space-y-8 relative z-10">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
              <span className="text-4xl font-bold">SF</span>
            </div>
          </div>

          <h1 className="text-4xl font-serif font-bold text-zinc-900">Certificate of Completion</h1>
          
          <div className="space-y-2">
            <p className="text-lg text-zinc-500 italic">This is to certify that</p>
            <h2 className="text-5xl font-bold text-primary underline underline-offset-8 decoration-zinc-300">
              {cert.user?.name || "The Learner"}
            </h2>
          </div>

          <div className="space-y-2 py-6">
            <p className="text-lg text-zinc-500">has successfully completed the roadmap</p>
            <h3 className="text-2xl font-bold text-zinc-800">
              {/* Since we don't have the roadmap name in the current include, we might need to fetch it */}
              Roadmap Certification
            </h3>
          </div>

          <div className="flex justify-between items-end pt-12 px-12">
            <div className="text-left space-y-1">
              <p className="text-sm font-bold text-zinc-800">Issued Date</p>
              <p className="text-sm text-zinc-500">
                {cert.issuedAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-32 border-b-2 border-zinc-300 mx-auto h-10" />
              <p className="text-xs font-bold text-zinc-400 uppercase">Academy Director</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm font-bold text-zinc-800">Verification ID</p>
              <p className="text-sm text-zinc-500 font-mono">
                {cert.id}
              </p>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-zinc-100 flex items-center justify-center gap-2 text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-widest">Verified by StackForge Academy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
