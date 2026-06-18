'use client';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/SectionHeader';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function ArticleCard({ article, featured = false }: { article: { id: string, title: string, excerpt: string, category: string, date: string, author: string }; featured?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative group overflow-hidden rounded-3xl border transition-all duration-300 
        ${featured ? 'md:col-span-2 border-violet-500/30' : 'border-white/5 hover:border-white/20'}`}
    >
      <Card className="h-full p-6 bg-zinc-900/40 border-none">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400 px-2 py-1 rounded-md bg-violet-500/10 border border-violet-500/20">
              {article.category}
            </span>
            <span className="text-xs text-zinc-500">{article.date}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
            {article.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-zinc-700" />
              <span className="text-xs text-zinc-300">{article.author}</span>
            </div>
            <Link href={`/blog/${article.id}`}>
              <Button variant="ghost" size="sm" className="text-white p-0 hover:bg-transparent group/btn">
                Read More <ArrowRight className="ml-1 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
