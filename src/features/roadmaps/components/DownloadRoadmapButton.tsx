'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { FileDown, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Roadmap } from '@/data/roadmaps';
import { exportRoadmapToPDF } from '../services/pdfExport';

export function DownloadRoadmapButton({ roadmap, isCompleted }: { roadmap: Roadmap, isCompleted: boolean }) {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      disabled={!isCompleted}
      onClick={() => exportRoadmapToPDF(roadmap)}
      className={cn(
        "gap-2 transition-colors",
        isCompleted ? "hover:bg-zinc-800" : "opacity-50 cursor-not-allowed"
      )}
    >
      {isCompleted ? <FileDown className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
      {isCompleted ? "Export PDF" : "Complete Roadmap to Unlock PDF"}
    </Button>
  );
}
