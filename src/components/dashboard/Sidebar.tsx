"use client";

import { CheckCircle2, BookOpen, Rocket, Wallet, FileText, Sparkles, LogOut } from 'lucide-react';
import type { DashboardTab } from '@/types';

interface NavItem {
  id: DashboardTab;
  label: string;
  icon: typeof CheckCircle2;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'focus', label: 'Homepage', icon: CheckCircle2 },
  { id: 'goals', label: 'Goals', icon: BookOpen },
  { id: 'projects', label: 'Projects', icon: Rocket },
  { id: 'finance', label: 'Savings', icon: Wallet },
  { id: 'docs', label: 'Documents', icon: FileText },
];

interface SidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  activeWeekNum: number;
  onLogout: () => void;
}

export function Sidebar({ activeTab, onTabChange, activeWeekNum, onLogout }: SidebarProps) {
  const weekLabel = activeWeekNum <= 104 ? activeWeekNum : '104+';

  return (
    <aside className="w-full lg:w-64 border-r border-border bg-card flex flex-col shrink-0 lg:sticky lg:top-0 lg:h-screen justify-between z-40">
      <div className="flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-950/15">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider uppercase block">LIFE OS</span>
              <span className="text-[10px] text-muted-foreground block font-medium">ITALY ROADMAP</span>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition duration-150 ${
                activeTab === id
                  ? 'bg-rose-50 text-rose-700 border border-rose-200/50'
                  : 'text-muted-foreground hover:bg-slate-50 hover:text-foreground border border-transparent'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border bg-slate-50/40 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
            M
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs font-bold text-foreground block truncate">Morshed Al Main</span>
            <span className="text-[10px] text-muted-foreground block truncate">Week {weekLabel} / 104</span>
          </div>
          <div className="h-6 w-6 rounded bg-rose-600 text-white text-[9px] font-extrabold flex items-center justify-center shrink-0 shadow shadow-rose-950/15">
            {weekLabel}
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-semibold text-muted-foreground hover:bg-rose-50 hover:text-rose-700 border border-transparent hover:border-rose-200/50 transition"
        >
          <LogOut className="h-3.5 w-3.5 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
