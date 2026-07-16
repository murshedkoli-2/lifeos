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
    <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-border bg-card/95 backdrop-blur flex flex-col shrink-0 lg:sticky lg:top-0 lg:h-screen lg:justify-between z-40">
      <div className="flex flex-col">
        {/* Brand + (mobile) week badge */}
        <div className="px-4 sm:px-6 py-4 lg:py-6 lg:border-b border-border flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-emerald-900/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider uppercase block">LIFE OS</span>
              <span className="text-[10px] text-muted-foreground block font-medium">ITALY ROADMAP</span>
            </div>
          </div>

          {/* Mobile-only sign out (footer is lg-only) */}
          <button
            onClick={onLogout}
            aria-label="Sign out"
            className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-emerald-200/60 transition"
          >
            <LogOut className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

        {/* Nav — horizontal scroller on mobile, vertical list on desktop */}
        <nav className="flex flex-row lg:flex-col gap-1.5 lg:gap-1 px-3 sm:px-4 pb-3 lg:py-4 overflow-x-auto lg:overflow-visible scrollbar-none">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              aria-current={activeTab === id ? 'page' : undefined}
              className={`flex items-center gap-2 lg:gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition duration-150 shrink-0 lg:w-full ${
                activeTab === id
                  ? 'bg-accent text-accent-foreground border border-emerald-200/60 shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile footer — desktop only */}
      <div className="hidden lg:block p-4 border-t border-border bg-muted/40 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-accent border border-emerald-200/70 text-primary flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
            M
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs font-bold text-foreground block truncate">Morshed Al Main</span>
            <span className="text-[10px] text-muted-foreground block truncate">Week {weekLabel} / 104</span>
          </div>
          <div className="h-6 w-6 rounded bg-primary text-primary-foreground text-[9px] font-extrabold flex items-center justify-center shrink-0 shadow shadow-emerald-900/20">
            {weekLabel}
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-semibold text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-emerald-200/60 transition"
        >
          <LogOut className="h-3.5 w-3.5 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
