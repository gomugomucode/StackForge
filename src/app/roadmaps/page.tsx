import { getAllRoadmaps } from "@/features/roadmaps/services/roadmapService";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";
import { ChevronRight, Code2 } from "lucide-react";

export default async function RoadmapsPage() {
  const roadmaps = await getAllRoadmaps();

  return (
    <div className="container mx-auto px-4 py-24 max-w-7xl">
      <SectionHeader 
        title="Learning Roadmaps" 
        subtitle="Curated, step-by-step engineering paths to build job-ready fullstack competence."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {roadmaps.map((roadmap) => (
          <Link 
            key={roadmap.slug} 
            href={`/roadmaps/${roadmap.slug}`} 
            className="group relative p-8 rounded-2xl border border-[#E8E1D8] dark:border-[#383028] bg-white dark:bg-[#1C1814] hover:border-emerald-600/40 shadow-[0_1px_3px_rgba(44,36,28,0.04)] hover:shadow-[0_4px_16px_rgba(5,150,105,0.08)] transition-all duration-200 overflow-hidden"
          >
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2C241C] dark:text-white mb-2">{roadmap.title}</h3>
                <p className="text-[#6C6257] dark:text-[#93887B] text-sm leading-relaxed">
                  {roadmap.description}
                </p>
              </div>
              <div className="flex items-center text-sm font-bold text-emerald-700 dark:text-emerald-400 gap-1 group-hover:gap-2 transition-all pt-2">
                <span>Explore Path</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
