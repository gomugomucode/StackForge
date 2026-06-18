'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Share2, Download, ShieldCheck } from 'lucide-react';
import { roadmaps } from '@/data/roadmaps';
import { Button } from '@/components/ui/Button';

export default function CertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  // In a real app, we'd fetch this from /api/certifications/[id]
  // For this demo, we'll mock a verified certificate
  const certId = resolvedParams.id;
  const roadmap = roadmaps[0]; // Default to Frontend for demo
  const userName = "Elite Learner"; // Mock name
  const issuedDate = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl aspect-[1.414/1] bg-white text-slate-900 rounded-sm shadow-2xl relative overflow-hidden border-[16px] border-double border-primary"
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        </div>

        {/* Certificate Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-between p-16 text-center">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10 text-primary border-2 border-primary">
                <Award className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-5xl font-serif font-black uppercase tracking-widest text-slate-800">
              Certificate of Mastery
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto my-4" />
            <p className="text-xl text-slate-600 italic">This is to certify that</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-6xl font-bold text-slate-900 border-b-2 border-slate-300 pb-2 px-8 inline-block">
              {userName}
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              has successfully completed the <span className="font-bold text-primary">{roadmap.title}</span> professional roadmap, 
              demonstrating expert proficiency in all required technical modules and passing the final mastery exam.
            </p>
          </div>

          <div className="grid grid-cols-3 w-full items-end gap-8 text-left">
            <div className="space-y-2">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Issued Date</p>
              <p className="font-medium text-slate-700">{issuedDate}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Verified Credential</p>
            </div>
            <div className="text-right space-y-2">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Certification ID</p>
              <p className="font-mono text-sm text-slate-700">{certId}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions Overlay */}
      <div className="fixed bottom-8 right-8 flex gap-3">
        <Button variant="outline" className="gap-2" onClick={() => window.print()}>
          <Download className="w-4 h-4" /> PDF
        </Button>
        <Button variant="primary" className="gap-2" onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Certificate link copied to clipboard!");
        }}>
          <Share2 className="w-4 h-4" /> Share
        </Button>
      </div>
    </div>
  );
}
