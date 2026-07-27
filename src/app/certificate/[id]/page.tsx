import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

async function getCertificate(id: string) {
  const cert = await prisma.certification.findUnique({
    where: { id },
    include: {
      user: {
        select: { name: true },
      },
      roadmap: true,
    },
  });
  return cert;
}

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = await getCertificate(id);

  if (!cert) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-3xl w-full bg-card text-card-foreground rounded-2xl p-8 sm:p-12 shadow-2xl border-4 border-primary/40 relative overflow-hidden">
        <div className="text-center space-y-6 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold">SF</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Certificate of Completion</h1>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground italic">This is to certify that</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-primary underline underline-offset-8 decoration-border">
              {cert.user?.name || "The Learner"}
            </h2>
          </div>

          <div className="space-y-1.5 py-4">
            <p className="text-sm text-muted-foreground">has successfully completed the roadmap</p>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              {cert.roadmap?.title || "Roadmap Certification"}
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 px-4 border-t border-border/40">
            <div className="text-left space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase">Issued Date</p>
              <p className="text-xs font-semibold text-foreground">
                {cert.issuedAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="text-center space-y-1">
              <div className="w-28 border-b border-border mx-auto h-6" />
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Academy Director</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase">Verification ID</p>
              <p className="text-xs font-mono text-foreground">
                {cert.id}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-muted-foreground">
            <span className="text-[10px] font-bold uppercase tracking-widest">Verified by StackForge Academy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
