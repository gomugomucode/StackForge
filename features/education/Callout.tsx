import React from 'react';
import { Info, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';

type CalloutVariant = 'info' | 'warning' | 'tip' | 'success';

interface CalloutProps {
  variant: CalloutVariant;
  title: string;
  children: React.ReactNode;
}

const variantStyles: Record<CalloutVariant, { icon: any, color: string, bg: string, border: string }> = {
  info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  tip: { icon: Lightbulb, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  success: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
};

export const Callout: React.FC<CalloutProps> = ({ variant, title, children }) => {
  const style = variantStyles[variant];
  const Icon = style.icon;

  return (
    <div className={`my-6 p-4 rounded-2xl border ${style.bg} ${style.border} relative overflow-hidden group`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`${style.color}`} size={20} />
        <h4 className={`font-bold text-sm ${style.color}`}>{title}</h4>
      </div>
      <div className="text-gray-300 text-sm leading-relaxed pl-8">
        {children}
      </div>
      <div className={`absolute top-0 right-0 w-1 h-full ${style.color.replace('text-', 'bg-')}`} />
    </div>
  );
};
