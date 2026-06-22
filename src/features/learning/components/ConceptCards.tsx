"use client";

import React from "react";
import { Card } from "@/components/ui/SectionHeader"; // Using existing Card style or generic
import { Lightbulb, Target, Zap } from "lucide-react";

interface ConceptCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
}

export function ConceptCard({ title, description, icon, color = "text-primary" }: ConceptCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group">
      <div className={`w-10 h-10 rounded-lg bg-primary/10 ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export function VisualExplanation({ concepts }: { concepts: {title: string, description: string, iconType: 'bulb' | 'target' | 'zap'}[] }) {
  const iconMap = {
    bulb: <Lightbulb className="w-5 h-5" />,
    target: <Target className="w-5 h-5" />,
    zap: <Zap className="w-5 h-5" />,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {concepts.map((concept, idx) => (
        <ConceptCard 
          key={idx} 
          title={concept.title} 
          description={concept.description} 
          icon={iconMap[concept.iconType] || iconMap.bulb} 
        />
      ))}
    </div>
  );
}
