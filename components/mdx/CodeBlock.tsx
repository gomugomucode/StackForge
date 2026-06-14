import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  code: string;
}

const CopyButton = ({ code }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="p-1.5 rounded-md bg-slate-800 text-slate-400 hover:text-white transition-colors"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  children?: React.ReactNode;
}

export const CodeBlock = ({ code, language: _language = 'typescript', title, children }: CodeBlockProps) => {
  // If children are provided, we use them instead of code string (for syntax highlighting libraries)
  const content = children || (
    <pre className="font-mono text-sm overflow-x-auto p-4 rounded-lg bg-slate-900 text-slate-100">
      <code>{code}</code>
    </pre>
  );

  return (
    <div className="my-6 group relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{title}</span>
          <CopyButton code={code || ''} />
        </div>
      )}
      {!title && (
        <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyButton code={code || ''} />
        </div>
      )}
      {content}
    </div>
  );
};
