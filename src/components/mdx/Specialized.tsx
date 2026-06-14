import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Target, Layers, Zap, ExternalLink, Play, ChevronRight } from 'lucide-react';

interface RoadmapStepProps {
  title: string;
  description: string;
  isCompleted?: boolean;
  resources?: string[];
}

export const RoadmapStep = ({ title, description, isCompleted, resources }: RoadmapStepProps) => {
  return (
    <div className="relative pl-8 pb-8 group">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 group-last:bg-transparent"></div>
      <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full border-2 ${isCompleted ? 'bg-blue-500 border-blue-500' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700'}`}>
        {isCompleted && <CheckCircle2 className="w-4 h-4 text-white absolute -top-1 -left-1" />}
      </div>
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors">
        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{description}</p>
        {resources && (
          <div className="flex flex-wrap gap-2">
            {resources.map((res, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500">{res}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface InterviewQuestionProps {
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  answer: React.ReactNode;
}

export const InterviewQuestion = ({ question, difficulty, category, answer }: InterviewQuestionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex items-center justify-between bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
            difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
            difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
            'bg-red-100 text-red-700'
          }`}>
            {difficulty}
          </span>
          <span className="text-sm font-medium text-slate-500">{category}</span>
          <span className="text-slate-900 dark:text-slate-100 font-semibold">{question}</span>
        </div>
        <ArrowRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 animate-in slide-in-from-top-2">
          {answer}
        </div>
      )}
    </div>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  image?: string;
}

export const ProjectCard = ({ title, description, techStack, level, estimatedTime, image }: ProjectCardProps) => {
  return (
    <div className="group relative p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all hover:-translate-y-1">
      {image && (
        <div className="w-full h-40 rounded-lg mb-4 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
      )}
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">{level}</span>
        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Zap className="w-3 h-3" /> {estimatedTime}
        </span
      </div>
      <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{description}</p>
      <div className="flex flex-wrap gap-2">
        {techStack.map(tech => (
          <span key={tech} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs border border-slate-200 dark:border-slate-700">{tech}</span>
        ))}
      </div>
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  type: 'link' | 'video' | 'doc';
}

export const ResourceCard = ({ title, description, url, type }: ResourceCardProps) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 transition-colors group flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
          {type === 'video' ? <Play className="w-4 h-4 text-red-500" /> : <ExternalLink className="w-4 h-4 text-blue-500" />}
        </div>
        <div className="max-w-xs">
          <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h5>
          <p className="text-xs text-slate-500 line-clamp-1">{description}</p>
        </div>
      </div>
      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
    </a>
  );
};

export const VideoEmbed = ({ url, caption }: { url: string, caption?: string }) => {
  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black aspect-video relative">
      <iframe 
        src={url}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      />
      {caption && <p className="text-center text-sm text-slate-500 py-2 bg-slate-50 dark:bg-slate-900">{caption}</p>}
    </div>
  );
};

export const Accordion = ({ items }: { items: { title: string, content: React.ReactNode }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="my-6 space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
          <button 
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full p-4 text-left font-medium flex items-center justify-between bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {item.title}
            <ChevronRight className={`w-4 h-4 transition-transform ${openIndex === index ? 'rotate-90' : ''}`} />
          </button>
          {openIndex === index && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
