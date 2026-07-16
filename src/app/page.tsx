"use client";

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ToastProvider } from '@/components/ui/toast';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DbErrorScreen, SeedScreen } from '@/components/dashboard/StatusScreens';
import { FocusView } from '@/components/focus/FocusView';
import { GoalsView } from '@/components/goals/GoalsView';
import { ProjectsView } from '@/components/projects/ProjectsView';
import { FinanceView } from '@/components/finance/FinanceView';
import { DocumentsView } from '@/components/documents/DocumentsView';
import type { DashboardTab } from '@/types';

const TOTAL_WEEKS = 104;

function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('focus');
  const data = useDashboardData();

  const {
    loading, tasks, projects, transactions, totalSavings, uploadedDocs, uploadingDocTitle,
    activeTask, focusedTaskId, activeTaskNotes, isSavingNotes, dbError, isSeeding,
    setFocusedTaskId, setActiveTaskNotes,
    fetchData, handleSeedDatabase, handleCompleteActiveTask, handleSaveActiveNotes,
    handleToggleTaskComplete, handleAddTask, handleUpdateTask, handleDeleteTask,
    handleToggleProjectFeature, handleUpdateProjectUrls,
    handleUploadDocument, handleAddTransaction, handleDeleteTransaction, handleLogout,
  } = data;

  // Connection error overlay (before any data exists).
  if (dbError && tasks.length === 0) {
    return <DbErrorScreen error={dbError} onRetry={fetchData} />;
  }

  // Empty database — offer to seed.
  if (!loading && tasks.length === 0) {
    return <SeedScreen onSeed={handleSeedDatabase} isSeeding={isSeeding} />;
  }

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const overallProgressPercent = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;
  const activeWeekNum = activeTask ? activeTask.weekNumber : TOTAL_WEEKS + 1;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row font-sans">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeWeekNum={activeWeekNum}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <DashboardHeader overallProgressPercent={overallProgressPercent} totalSavings={totalSavings} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-xs text-muted-foreground font-medium">Loading Life OS Environment...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {activeTab === 'focus' && (
                <FocusView
                  tasks={tasks}
                  activeTask={activeTask}
                  focusedTaskId={focusedTaskId}
                  activeTaskNotes={activeTaskNotes}
                  isSavingNotes={isSavingNotes}
                  onFocusTask={setFocusedTaskId}
                  onNotesChange={setActiveTaskNotes}
                  onToggleTask={handleToggleTaskComplete}
                  onSaveNotes={handleSaveActiveNotes}
                  onCompleteActiveTask={handleCompleteActiveTask}
                />
              )}

              {activeTab === 'goals' && (
                <GoalsView
                  tasks={tasks}
                  activeTask={activeTask}
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              )}

              {activeTab === 'projects' && (
                <ProjectsView
                  projects={projects}
                  onToggleFeature={handleToggleProjectFeature}
                  onUpdateUrls={handleUpdateProjectUrls}
                />
              )}

              {activeTab === 'finance' && (
                <FinanceView
                  transactions={transactions}
                  totalSavings={totalSavings}
                  onAddTransaction={handleAddTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              )}

              {activeTab === 'docs' && (
                <DocumentsView
                  tasks={tasks}
                  uploadedDocs={uploadedDocs}
                  uploadingDocTitle={uploadingDocTitle}
                  onUpload={handleUploadDocument}
                />
              )}
            </div>
          )}
        </main>

        <footer className="border-t border-border bg-card py-6 text-center text-xs text-muted-foreground/80 mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <p>© 2026 Murshed Koli. All Rights Reserved. Built with Next.js, Shadcn UI, and MongoDB Atlas.</p>
            <p className="mt-1 text-[10px] text-muted-foreground/60">Strictly Linear Phase unlock tracking system active.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ToastProvider>
      <Dashboard />
    </ToastProvider>
  );
}
