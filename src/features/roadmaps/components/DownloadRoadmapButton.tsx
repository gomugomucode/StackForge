'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { Roadmap } from '@/data/roadmaps';
import { exportRoadmapToPDF } from '../services/pdfExport';

export function DownloadRoadmapButton({ roadmap }: { roadmap: Roadmap }) {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={() => exportRoadmapToPDF(roadmap)}
      className="gap-2 hover:bg-zinc-800 transition-colors"
    >
      <FileDown className="w-4 h-4" />
      Export PDF
    </Button>
  );
}
