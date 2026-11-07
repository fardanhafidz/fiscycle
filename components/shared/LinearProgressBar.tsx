import React from 'react';
import { cn } from '@/lib/utils';

interface LinearProgressBarProps {
  value: number;
  max?: number;
  tone?: 'teal' | 'navy' | 'emerald' | 'amber' | 'rose';
  showLabel?: boolean;
  labelLeft?: string;
  labelRight?: string;
  heightClass?: string;
  className?: string;
}

export function LinearProgressBar({
  value,
  max = 100,
  tone = 'teal',
  showLabel = false,
  labelLeft,
  labelRight,
  heightClass = 'h-2',
  className,
}: LinearProgressBarProps) {
  const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  const toneBgClasses: Record<NonNullable<LinearProgressBarProps['tone']>, string> = {
    teal: 'bg-[#008d91]',
    navy: 'bg-[#1A365D]',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };

  return (
    <div className={cn('w-full space-y-1', className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
          <span>{labelLeft ?? `${Math.round(percentage)}%`}</span>
          {labelRight && <span>{labelRight}</span>}
        </div>
      )}
      <div className={cn('w-full bg-slate-100 rounded-full overflow-hidden', heightClass)}>
        <div
          className={cn('h-full rounded-full transition-all duration-300', toneBgClasses[tone])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default LinearProgressBar;
