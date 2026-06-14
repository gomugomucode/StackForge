import React, { useState } from 'react';

interface TabProps {
  label: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

export const Tabs = ({ children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="my-6 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        {React.Children.map(children, ({ props }, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === index 
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {props.label}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white dark:bg-slate-950">
        {React.Children.map(children, ({ props }, index) => (
          <div key={index} className={activeTab === index ? 'block' : 'hidden'}>
            {props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Tab = ({ label, children }: TabProps) => {
  return <div className="invisible">{children}</div>; // Rendered by Tabs
};
