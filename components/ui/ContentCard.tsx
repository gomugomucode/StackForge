"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ContentMetadata } from '@/lib/core/types/content';
import { ChevronRight, Clock, Gauge, Tag } from 'lucide-react';
import Link from 'next/link';

interface ContentCardProps {
  item: ContentMetadata;
  link: string;
}

export const ContentCard: React.FC<ContentCardProps> = React.memo(({ item, link }) => {
  const levelColor: Record<string, string> = {
    Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
    Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    Advanced: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    Expert: 'text-red-400 bg-red-400/10 border-red-400/20',
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-indigo-500/50 hover:bg-white/10 hover:-translate-y-1 shadow-lg backdrop-blur-md"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl mb-4 bg-slate-800">
        {item.thumbnail ? (
          <Image 
            src={item.thumbnail} 
            alt={item.title} 
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 font-bold text-xl">
            {item.type.toUpperCase()}
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${levelColor[item.difficulty] || levelColor.Beginner}`}>
            {item.difficulty}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium uppercase tracking-wider">
          <span className="capitalize">{item.type}</span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {item.estimatedTime} min
          </span>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
          {item.title}
        </h3>
        
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {item.category} guide for professional developers.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 text-gray-400 text-xs border border-white/5">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Link 
          href={link} 
          className="flex items-center gap-1 text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors"
        >
          Explore <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Gauge size={12} />
          <span className="text-gray-600">{item.lastUpdated.split('T')[0]}</span>
        </div>
      </div>
    </div>
  );
});

ContentCard.displayName = 'ContentCard';
