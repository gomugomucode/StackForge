'use client';

import { SectionHeader } from '../ui/SectionHeader';
import { ResourceGrid } from '@/features/resources/components/ResourceGrid';

export function ResourcesContent() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Resources"
          title="Free Learning"
          highlight="Resources & Tools"
          description="Download PDFs, cheat sheets, and use developer tools — all completely free."
        />
        <div className="max-w-6xl mx-auto mt-12">
          <ResourceGrid />
        </div>
      </div>
    </div>
  );
}
