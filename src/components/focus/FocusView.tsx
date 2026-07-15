"use client";

import { CheckCircle2, Calendar, Info, Check, Loader2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { ITask } from '@/types';

interface FocusViewProps {
  tasks: ITask[];
  activeTask: ITask | null;
  focusedTaskId: string | null;
  activeTaskNotes: string;
  isSavingNotes: boolean;
  onFocusTask: (id: string) => void;
  onNotesChange: (value: string) => void;
  onToggleTask: (task: ITask) => void;
  onSaveNotes: () => void;
  onCompleteActiveTask: () => void;
}

export function FocusView({
  tasks, activeTask, focusedTaskId, activeTaskNotes, isSavingNotes,
  onFocusTask, onNotesChange, onToggleTask, onSaveNotes, onCompleteActiveTask,
}: FocusViewProps) {
  if (!activeTask) {
    return (
      <div className="max-w-3xl mx-auto w-full py-4 space-y-6">
        <Card className="border-emerald-500/20 bg-card p-8 text-center shadow-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mb-4">
            <CheckCircle2 className="h-8 w-8 animate-bounce" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Congratulations, Murshed!</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            You have completed all 104 weeks of your Life OS Goals. You are ready for Italy and your career is set up!
          </p>
        </Card>
      </div>
    );
  }

  const activeWeekTasks = tasks.filter((t) => t.weekNumber === activeTask.weekNumber);
  const focusedTask = tasks.find((t) => t._id === focusedTaskId) || activeTask;

  return (
    <div className="max-w-3xl mx-auto w-full py-4 space-y-6">
      <div className="space-y-6">
        {/* Weekly checklist */}
        <Card className="border-border bg-card p-4 space-y-3 shadow-md">
          <div className="flex justify-between items-center border-b border-border pb-2">
            <span className="text-xs font-bold text-foreground/80 flex items-center gap-1.5 font-sans">
              <span className="h-2 w-2 rounded-full bg-rose-500"></span>
              Week {activeTask.weekNumber} Tasks Checklist
            </span>
            <span className="text-[10px] text-muted-foreground/85 font-semibold uppercase font-sans">
              {activeWeekTasks.filter((t) => t.isCompleted).length} / {activeWeekTasks.length} Completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {activeWeekTasks.map((t) => {
              const isFocused = t._id === focusedTask?._id;
              return (
                <div
                  key={t._id}
                  onClick={() => onFocusTask(t._id)}
                  className={`flex items-center justify-between p-3 rounded-lg border transition cursor-pointer text-xs ${
                    isFocused
                      ? 'bg-rose-50 border-rose-300 text-rose-900 shadow-sm'
                      : 'bg-slate-50 border-slate-100 hover:bg-slate-100/55 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <Checkbox
                      id={`chk-${t._id}`}
                      checked={t.isCompleted}
                      onCheckedChange={() => onToggleTask(t)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className={`truncate font-medium ${t.isCompleted ? 'line-through text-slate-400 font-normal' : ''}`}>
                      {t.title}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full shrink-0 ml-2">
                    {t.category}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Focused task card */}
        {focusedTask && (
          <Card className="border-border bg-card shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-rose-700 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200">
                  {focusedTask.phase}
                </span>
                <span className="text-xs text-muted-foreground/80 font-medium flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Week {focusedTask.weekNumber} of 104
                </span>
              </div>
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                {focusedTask.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Goal Instructions</h3>
                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{focusedTask.description}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Category:</span>
                <span className="text-xs bg-muted text-foreground/80 font-medium px-2 py-1 rounded border border-border">
                  {focusedTask.category}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="active-notes" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Task Notes &amp; Progress Logs
                  </Label>
                  <span className="text-[10px] text-muted-foreground/80">Saved to database</span>
                </div>
                <textarea
                  id="active-notes"
                  placeholder="Write down details, links, or logs about this week's progress..."
                  value={activeTaskNotes}
                  onChange={(e) => onNotesChange(e.target.value)}
                  rows={6}
                  className="w-full text-sm bg-white border border-border rounded-lg p-3 text-foreground focus:outline-none focus:ring-1 focus:ring-rose-500 placeholder-slate-400 transition"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={onSaveNotes}
                    disabled={isSavingNotes}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs py-1 h-8"
                  >
                    {isSavingNotes ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Save Notes'}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50/40 border-t border-border/60 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-muted-foreground/80 text-xs">
                <Info className="h-4 w-4 text-rose-600" />
                <span>Completing all tasks in this week unlocks the next week in chronological order.</span>
              </div>
              <Button
                onClick={onCompleteActiveTask}
                disabled={isSavingNotes}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-5 shadow-lg shadow-rose-100 w-full sm:w-auto"
              >
                {isSavingNotes ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                ) : (
                  <><Check className="mr-2 h-5 w-5" /> {focusedTask.isCompleted ? 'Mark Active' : 'Mark Completed & Move On'}</>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
