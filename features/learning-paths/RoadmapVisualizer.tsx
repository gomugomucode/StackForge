"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';

interface Node {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  links: string[];
  dependencies: string[];
}

interface RoadmapVisualizerProps {
  nodes: Node[];
}

export default function RoadmapVisualizer({ nodes }: RoadmapVisualizerProps) {
  return (
    <div className="relative py-10">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-purple via-accent-cyan to-accent-violet opacity-20 hidden md:block" />
      <div className="space-y-12 relative">
        {nodes.map((node, index) => (
          <div key={node.id} className={`flex items-center justify-center ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8`}>
            <div className="md:w-1/2 px-4">
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl border transition-all ${
                  node.status === 'completed' 
                    ? 'bg-accent-emerald/10 border-accent-emerald/30 shadow-lg shadow-accent-emerald/10' 
                    : node.status === 'current' 
                      ? 'bg-accent-purple/10 border-accent-purple/50 shadow-xl shadow-accent-purple/20 ring-2 ring-accent-purple/20' 
                      : 'bg-surface-800/50 border-white/10 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {node.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-accent-emerald" />}
                  {node.status === 'locked' && <Lock className="w-4 h-4 text-gray-500" />}
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    node.status === 'completed' ? 'text-accent-emerald' : node.status === 'current' ? 'text-accent-purple' : 'text-gray-500'
                  }`}>
                    {node.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{node.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{node.description}</p>
                <div className="flex flex-wrap gap-2">
                  {node.links.map((link, idx) => (
                    <Link 
                      key={idx} 
                      href={link} 
                      className="text-xs font-medium text-accent-cyan hover:text-white transition-colors underline underline-offset-4"
                    >
                      Resource {idx + 1}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="relative z-10 shrink-0">
              <div className={`w-10 h-10 rounded-full border-4 border-surface-950 flex items-center justify-center ${
                node.status === 'completed' ? 'bg-accent-emerald' : node.status === 'current' ? 'bg-accent-purple animate-pulse' : 'bg-gray-700'
              }`}>
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
            <div className="md:w-1/2 px-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
