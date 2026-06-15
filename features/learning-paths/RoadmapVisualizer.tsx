import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';

export interface VisualizerNode {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  links: string[];
  dependencies: string[];
}

interface RoadmapVisualizerProps {
  nodes: VisualizerNode[];
}

const RoadmapVisualizer: React.FC<RoadmapVisualizerProps> = ({ nodes }) => {
  return (
    <div className="relative flex flex-col items-center py-10 px-4 max-w-4xl mx-auto">
      {/* Vertical Connection Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent -translate-x-1/2 hidden md:block" />

      <div className="space-y-12 w-full">
        {nodes.map((node, index) => (
          <motion.div 
            key={node.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            {/* Content Card */}
            <div className={`w-full md:w-5/12 p-6 rounded-2xl border transition-all duration-300 ${
              node.status === 'completed' 
                ? 'bg-indigo-500/10 border-indigo-500/30 text-white' 
                : node.status === 'current' 
                ? 'bg-white/10 border-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.2)] text-white' 
                : 'bg-white/5 border-white/10 text-gray-400 grayscale'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Step {index + 1}</span>
                {node.status === 'completed' && <CheckCircle2 className="text-indigo-400" size={20} />}
                {node.status === 'locked' && <Lock className="text-gray-500" size={20} />}
              </div>
              <h3 className="text-xl font-bold mb-2">{node.title}</h3>
              <p className="text-sm opacity-80 mb-4 leading-relaxed">{node.description}</p>
              <div className="flex flex-wrap gap-2">
                {node.links.map((link: string, i: number) => (
                  <Link 
                    key={i} 
                    href={link} 
                    className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
                  >
                    View Material
                  </Link>
                ))}
              </div>
            </div>

            {/* Center Node Icon */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-900 z-10">
              {node.status === 'completed' ? (
                <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              ) : node.status === 'current' ? (
                <div className="w-4 h-4 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              ) : (
                <div className="w-4 h-4 rounded-full bg-gray-700" />
              )}
            </div>

            {/* Spacer for the other side */}
            <div className="hidden md:block w-5/12" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapVisualizer;
