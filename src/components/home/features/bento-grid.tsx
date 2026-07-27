'use client';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
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
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, idx) => {
          const Icon = getIcon(item.icon);
          return (
            <motion.div 
              key={idx}
              whileHover={{ y: -4 }}
              className={`${item.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'}`}
            >
              <Card variant="default" padding="md" className="group h-full flex flex-col justify-between hover:border-primary/50 transition-colors cursor-pointer">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-semibold text-primary gap-1 group-hover:gap-1.5 transition-all pt-4">
                  <span>Learn More</span> <span>→</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
