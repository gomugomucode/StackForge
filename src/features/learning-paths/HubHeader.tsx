import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Sparkles } from 'lucide-react';

const HubHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-20 pb-16 px-4 text-center">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-indigo-500/20 blur-[120px] rounded-full -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6"
      >
        <Sparkles size={14} />
        <span>Premium Developer Education</span>
      </motion.div>

      <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
        Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Modern Stack</span>
      </h1>
      
      <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
        Stop guessing. Start learning. Our curated paths, deep-dive tutorials, and 
        interactive cheatsheets are designed to take you from a beginner to a world-class engineer.
      </p>

      <div className="relative max-w-2xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center gap-2 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <div className="flex-1 flex items-center gap-3 px-4">
            <Search className="text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="What do you want to learn today? (e.g. 'React Server Components')" 
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-500"
            />
          </div>>
          <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold flex items-center gap-2 hover:bg-indigo-500 transition-all active:scale-95">
            Explore <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HubHeader;
