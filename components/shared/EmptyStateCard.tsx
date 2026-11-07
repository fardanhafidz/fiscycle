import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

export function EmptyStateCard({
  icon: Icon,
  title,
  subtitle,
  actionHref,
  actionLabel,
  className,
}: EmptyStateCardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl bg-white/80 border border-slate-200/80 p-8 text-center flex flex-col items-center justify-center space-y-3 shadow-xs',
        className
      )}
    >
      <div className="size-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mb-1">
        <Icon className="size-6 text-[#00629b]" />
      </div>
      <h3 className="text-sm font-bold text-[#173251]">{title}</h3>
      <p className="text-xs text-slate-500 max-w-xs leading-relaxed">{subtitle}</p>

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#00629b] text-white text-xs font-bold hover:bg-[#005180] transition shadow-xs"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default EmptyStateCard;
