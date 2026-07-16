"use client";

import { CheckCircle2, TrendingUp, Globe } from 'lucide-react';

interface DashboardHeaderProps {
  overallProgressPercent: number;
  totalSavings: number;
}

export function DashboardHeader({ overallProgressPercent, totalSavings }: DashboardHeaderProps) {
  return (
    <header className="p-4 sm:p-6 lg:px-8 border-b border-border bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold font-sans">Dashboard</div>
          <h1 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-1">
            Welcome back, <span className="text-primary font-extrabold">Murshed</span>!
          </h1>
          <p className="text-xs text-muted-foreground">Ready to continue your 104-week journey? Destination: Italy 🇮🇹</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
            <CheckCircle2 className="h-3 w-3" /> {overallProgressPercent.toFixed(1)}% Done
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
            <TrendingUp className="h-3 w-3" /> ৳{(totalSavings / 100000).toFixed(1)}L / 15L
          </span>
          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
            <Globe className="h-3 w-3" /> Italy 🇮🇹
          </span>
        </div>
      </div>
    </header>
  );
}
