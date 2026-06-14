import React from 'react';
import { 
  Info, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle2 
} from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'tip' | 'success';

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
  title?: string;
}

const calloutStyles: Record<CalloutType, { icon: any, color: string, bgColor: string, borderColor: string }> = {
  info: {
    icon: Info,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
  tip: {
    icon: Lightbulb,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
  },
  success: {
    icon: CheckCircle2,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
  },
};

export const Callout = ({ type = 'info', children, title }: CalloutProps) => {
  const style = calloutStyles[type];
  const Icon = style.icon;

  return (
    <div className={`my-6 p-4 border-l-4 rounded-r-lg ${style.bgColor} ${style.borderColor} transition-colors`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${style.color}`} />
        <div className="flex-1">
          {title && <p className={`font-semibold mb-1 ${style.color}`}>{title}</p>}
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const InfoCallout = (props: CalloutProps) => <Callout type="info" {...props} />;
export const WarningCallout = (props: CalloutProps) => <Callout type="warning" {...props} />;
export const TipCallout = (props: CalloutProps) => <Callout type="tip" {...props} />;
export const SuccessCallout = (props: CalloutProps) => <Callout type="success" {...props} />;
