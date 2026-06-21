import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';

export async function generateCertificate(userId: string, roadmapId: string) {
  // 1. Verify eligibility: Roadmap must be 100% complete
  const completion = await prisma.roadmapCompletion.findUnique({
    where: {
      userId_roadmapId: { userId, roadmapId },
    },
  });

  if (!completion || completion.completionPercentage < 100) {
    throw new Error('User is not eligible for this certificate');
  }

  // 2. Check if certificate already exists
  const existingCert = await prisma.certification.findUnique({
    where: {
      userId_roadmapId: { userId, roadmapId },
    },
  });

  if (existingCert) {
    return existingCert;
  }

  // 3. Create unique verification code
  const verificationCode = nanoid(12);

  // 4. Store certification
  const certificate = await prisma.certification.create({
    data: {
      userId,
      roadmapId,
      issuedAt: new Date(),
      score: completion.completionPercentage,
      verificationCode, // Note: I need to add this to the schema
    },
  });

  return certificate;
}

export async function verifyCertificate(code: string) {
  return await prisma.certification.findUnique({
    where: { verificationCode: code },
    include: {
      user: true,
      roadmap: true,
    },
  });
}
