'use client';

import React from 'react';

export function WorkspaceSkeleton() {
  return (
    <div className="w-full min-h-screen p-4 space-y-4 animate-pulse">
      {/* Top Header Block */}
      <div className="h-14 bg-slate-200/70 rounded-3xl w-full" />

      {/* Hero / Banner Block */}
      <div className="h-40 bg-slate-200/70 rounded-3xl w-full" />

      {/* 2x2 Bento Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="h-28 bg-slate-200/70 rounded-3xl" />
        <div className="h-28 bg-slate-200/70 rounded-3xl" />
        <div className="h-28 bg-slate-200/70 rounded-3xl" />
        <div className="h-28 bg-slate-200/70 rounded-3xl" />
      </div>

      {/* List Cards */}
      <div className="space-y-3 pt-2">
        <div className="h-24 bg-slate-200/70 rounded-3xl w-full" />
        <div className="h-24 bg-slate-200/70 rounded-3xl w-full" />
      </div>
    </div>
  );
}

export default WorkspaceSkeleton;
