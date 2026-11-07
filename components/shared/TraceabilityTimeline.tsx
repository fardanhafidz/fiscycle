import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { formatWeightKg } from '@/lib/format';

interface TraceabilityTimelineProps {
  contributionId?: string;
  contributorName?: string;
  wasteKg?: number;
  bsfBatchId?: string;
  maggotYieldKg?: number;
  pondName?: string;
  buyerName?: string;
  activeStep: 1 | 2 | 3 | 4 | 5;
}

export function TraceabilityTimeline({
  contributionId = 'IN-0045',
  contributorName = 'ABC Restaurant',
  wasteKg = 42,
  bsfBatchId = 'BSF-04',
  maggotYieldKg = 9.2,
  pondName = 'Kolam 4 (Nila Super)',
  buyerName = 'ABC Restaurant',
  activeStep = 3,
}: TraceabilityTimelineProps) {
  const steps = [
    {
      num: 1,
      title: 'Setoran Limbah Organik',
      desc: `${contributionId} · ${contributorName} · ${formatWeightKg(wasteKg)} sisa dapur`,
    },
    {
      num: 2,
      title: 'Verifikasi Kualitas Admin',
      desc: 'Grade A · Terverifikasi timbang tara (+420 Poin diterbitkan)',
    },
    {
      num: 3,
      title: 'Biokonversi Maggot BSF',
      desc: `Batch ${bsfBatchId} · Asupan ${formatWeightKg(wasteKg)} → Estimasi ${maggotYieldKg} kg larva segar`,
    },
    {
      num: 4,
      title: 'Pakan Sirkular Kolam',
      desc: `${pondName} · Substitusi 35% pakan maggot berprotein 42%`,
    },
    {
      num: 5,
      title: 'Panen & Distribusi Pasar',
      desc: `Pasokan ikan segar panen terserap oleh ${buyerName}`,
    },
  ];

  return (
    <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <h4 className="text-xs font-bold text-[#1A365D] uppercase tracking-wider">
          Rantai Telusur Sirkular (Closed-Loop)
        </h4>
        <span className="font-mono text-[10px] bg-sky-50 text-[#00629b] px-2 py-0.5 rounded-full font-bold">
          {contributionId}
        </span>
      </div>

      <div className="relative pl-6 space-y-5">
        {/* Continuous vertical line */}
        <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-slate-200 -translate-x-1/2" />

        {steps.map((s) => {
          const isDone = s.num < activeStep;
          const isCurrent = s.num === activeStep;

          return (
            <div key={s.num} className="relative group">
              {/* Step indicator circle */}
              <div
                className={`absolute -left-6 top-0.5 size-5 rounded-full flex items-center justify-center font-bold text-[10px] transition-all ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : isCurrent
                    ? 'bg-[#008d91] text-white ring-4 ring-teal-100'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="size-3.5 stroke-[2.5]" />
                ) : isCurrent ? (
                  <Clock className="size-3 animate-pulse" />
                ) : (
                  <span>{s.num}</span>
                )}
              </div>

              <div>
                <p
                  className={`text-xs font-bold ${
                    isDone || isCurrent ? 'text-[#173251]' : 'text-slate-400'
                  }`}
                >
                  {s.title}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TraceabilityTimeline;
