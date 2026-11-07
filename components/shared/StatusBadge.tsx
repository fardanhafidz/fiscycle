import React from 'react';
import { cn } from '@/lib/utils';
import type { PondStatus, WasteStatus, OrderStatus, BsfBatchStatus } from '@/lib/types';

export type ExtendedStatus =
  | PondStatus
  | WasteStatus
  | OrderStatus
  | BsfBatchStatus
  | 'Online'
  | 'Perlu Kalibrasi'
  | 'Offline';

interface StatusBadgeProps {
  status: ExtendedStatus;
  pulse?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function StatusBadge({
  status,
  pulse = false,
  size = 'md',
  className,
}: StatusBadgeProps) {
  let colorStyles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';

  // Green
  if (['Baik', 'Diterima', 'Selesai', 'Siap Panen', 'Normal', 'Online'].includes(status)) {
    colorStyles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-emerald-500';
  }
  // Amber
  else if (
    [
      'Perhatian',
      'Menunggu Verifikasi',
      'Menunggu Alokasi',
      'Menunggu Panen',
      'Dijadwalkan',
      'Perlu Kalibrasi',
    ].includes(status)
  ) {
    colorStyles = 'bg-amber-50 text-amber-700 border-amber-200';
    dotColor = 'bg-amber-500';
  }
  // Blue/Teal
  else if (['Dialokasikan', 'Dalam Pengiriman', 'Dijemput Kurir'].includes(status)) {
    colorStyles = 'bg-sky-50 text-sky-700 border-sky-200';
    dotColor = 'bg-sky-500';
  }
  // Rose
  else if (['Kritis', 'Ditolak', 'Offline'].includes(status)) {
    colorStyles = 'bg-rose-50 text-rose-700 border-rose-200';
    dotColor = 'bg-rose-500';
  }

  const sizeStyles =
    size === 'sm'
      ? 'text-[9.5px] px-1.5 py-0.5 gap-1'
      : 'text-[11px] px-2.5 py-1 gap-1.5 font-medium';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-semibold leading-tight whitespace-nowrap',
        colorStyles,
        sizeStyles,
        className
      )}
    >
      <span
        className={cn('size-1.5 rounded-full shrink-0', dotColor, pulse && 'animate-pulse')}
      />
      <span>{status}</span>
    </span>
  );
}

export default StatusBadge;
