'use client';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function ArticleCard({ article, featured = false }: { article: { id: string, title: string, excerpt: string, category: string, date: string, author: string }; featured?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative group overflow-hidden ${featured ? 'md:col-span-2' : ''}`}
    >
      <Card variant="default" padding="md" className="h-full flex flex-col justify-between hover:border-primary/50 transition-colors">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="primary">
              {article.category}
            </Badge>
            <span className="text-[11px] text-muted-foreground">{article.date}</span>
          </div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>
        <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
              {article.author.charAt(0)}
            </div>
            <span className="text-xs font-semibold text-foreground">{article.author}</span>
          </div>
          <Link href={`/blog/${article.id}`}>
            <Button variant="ghost" size="sm" className="gap-1 p-0 hover:bg-transparent">
              <span>Read More</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
