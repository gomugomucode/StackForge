"use client";

import { Progress } from "@/components/ui/Progress"; // I need to create this UI component

export function ProgressOverview() {
  const courses = [
    { name: "React Mastery", progress: 65, color: "bg-blue-500" },
    { name: "TypeScript Expert", progress: 40, color: "bg-blue-600" },
    { name: "Next.js 15", progress: 20, color: "bg-black dark:bg-white" },
  ];

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-semibold">Learning Progress</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{course.name}</span>
              <span className="text-muted-foreground">{course.progress}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${course.color} transition-all duration-500`} 
                style={{ width: `${course.progress}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
