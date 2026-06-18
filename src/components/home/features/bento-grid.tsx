'use client';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/SectionHeader';
import { getIcon } from '@/utils/icons';

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  size: 'small' | 'large';
  href: string;
  color: string;
}

export function FeatureBento({ items }: { items: FeatureItem[] }) {
  return (
    <section className="py-24 container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
        {items.map((item, idx) => {
          const Icon = getIcon(item.icon);
          return (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className={`${item.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'}`}
            >
            <Card className="spotlight-card group h-full p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden relative">
                <div className="flex flex-col h-full justify-between">
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.color} bg-opacity-20`}>
                      <Icon className={`w-6 h-6 ${item.color.replace('bg-', 'text-')}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center text-sm font-medium text-primary gap-1 group-hover:gap-2 transition-all relative z-10">
                    Learn More <span className="opacity-50">→</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
