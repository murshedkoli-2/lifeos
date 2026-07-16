"use client";

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  type ITask, type AddTaskForm, type EditTaskForm,
  TASK_CATEGORY_OPTIONS, TASK_PHASE_OPTIONS,
} from '@/types';

const EMPTY_ADD_FORM: AddTaskForm = {
  title: '', description: '', category: 'Skills', phase: 'Phase 1: IELTS & Portfolio', weekNumber: '1',
};

interface GoalsViewProps {
  tasks: ITask[];
  activeTask: ITask | null;
  onAddTask: (form: AddTaskForm) => Promise<boolean>;
  onUpdateTask: (id: string, form: EditTaskForm) => Promise<boolean>;
  onDeleteTask: (id: string) => Promise<boolean>;
}

export function GoalsView({ tasks, activeTask, onAddTask, onUpdateTask, onDeleteTask }: GoalsViewProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addForm, setAddForm] = useState<AddTaskForm>(EMPTY_ADD_FORM);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [editForm, setEditForm] = useState<EditTaskForm>({
    title: '', description: '', category: '', phase: '', weekNumber: '', isCompleted: false, notes: '',
  });

  const tasksByPhase = tasks.reduce<Record<string, ITask[]>>((acc, t) => {
    (acc[t.phase] ||= []).push(t);
    return acc;
  }, {});

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onAddTask(addForm);
    if (success) {
      setIsAddOpen(false);
      setAddForm(EMPTY_ADD_FORM);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    const success = await onUpdateTask(editingTask._id, editForm);
    if (success) setEditingTask(null);
  };

  const openEdit = (task: ITask) => {
    setEditingTask(task);
    setEditForm({
      title: task.title,
      description: task.description,
      category: task.category,
      phase: task.phase,
      weekNumber: String(task.weekNumber),
      isCompleted: task.isCompleted,
      notes: task.notes || '',
    });
  };

  return (
    <Card className="border-border bg-card p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Goals Management Dashboard</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your 104-week roadmap goals. Click any week to edit, skip, mark completed, or delete goals.
          </p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={<Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs h-8" />}>
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Add New Goal
          </DialogTrigger>
          <DialogContent className="border-border bg-card text-foreground sm:max-w-md">
            <form onSubmit={handleAddSubmit}>
              <DialogHeader>
                <DialogTitle className="text-foreground text-base">Add New Goal</DialogTitle>
                <DialogDescription className="text-xs">Create a new target week in your Life OS timeline.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 py-4 text-xs">
                <div className="space-y-1">
                  <Label htmlFor="add-title" className="text-foreground/80">Title</Label>
                  <Input id="add-title" required value={addForm.title}
                    onChange={(e) => setAddForm((p) => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Register for TOEFL or VFS Slot"
                    className="bg-background border-border h-8 text-xs text-foreground" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="add-desc" className="text-foreground/80">Description</Label>
                  <textarea id="add-desc" required value={addForm.description}
                    onChange={(e) => setAddForm((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Describe the steps to achieve this goal..." rows={3}
                    className="w-full text-xs bg-background border border-border rounded p-2 text-foreground focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="add-week" className="text-foreground/80">Week Number</Label>
                    <Input id="add-week" type="number" required value={addForm.weekNumber}
                      onChange={(e) => setAddForm((p) => ({ ...p, weekNumber: e.target.value }))}
                      className="bg-background border-border h-8 text-xs text-foreground" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="add-cat" className="text-foreground/80">Category</Label>
                    <Select value={addForm.category} onValueChange={(v) => setAddForm((p) => ({ ...p, category: v ?? '' }))}>
                      <SelectTrigger className="bg-background border-border h-8 text-xs text-muted-foreground">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border text-xs text-foreground">
                        {TASK_CATEGORY_OPTIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="add-phase" className="text-foreground/80">Phase</Label>
                  <Select value={addForm.phase} onValueChange={(v) => setAddForm((p) => ({ ...p, phase: v ?? '' }))}>
                    <SelectTrigger className="bg-background border-border h-8 text-xs text-muted-foreground">
                      <SelectValue placeholder="Phase" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-xs text-foreground">
                      {TASK_PHASE_OPTIONS.map((ph) => <SelectItem key={ph} value={ph}>{ph}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 text-xs font-semibold w-full">
                  Add Goal to Roadmap
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid of weeks grouped by phase */}
      <div className="space-y-6">
        {Object.entries(tasksByPhase).map(([phaseName, phaseTasks]) => {
          const isPhaseCompleted = phaseTasks.every((t) => t.isCompleted);
          return (
            <div key={phaseName} className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-xs font-bold text-foreground/80 flex items-center gap-1.5 font-sans">
                  <span className={`h-2 w-2 rounded-full ${isPhaseCompleted ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
                  {phaseName}
                </span>
                <span className="text-[10px] text-muted-foreground/80 font-semibold uppercase font-sans">
                  {phaseTasks.filter((t) => t.isCompleted).length} / {phaseTasks.length} WEEKS DONE
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2.5">
                {phaseTasks.map((task) => {
                  const isActive = activeTask?._id === task._id;
                  let bgStyle = 'bg-muted/60 border-border text-muted-foreground/70 hover:bg-muted cursor-pointer';
                  if (task.isCompleted) {
                    bgStyle = 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100/70 cursor-pointer shadow-sm';
                  } else if (isActive) {
                    bgStyle = 'bg-primary/10 border-primary/60 text-primary hover:bg-primary/15 cursor-pointer animate-pulse ring-2 ring-primary/30 font-extrabold';
                  }
                  return (
                    <button key={task._id} onClick={() => openEdit(task)}
                      className={`h-11 rounded-lg border text-xs font-bold flex flex-col items-center justify-center transition duration-150 ${bgStyle}`}>
                      <span className="text-[9px] font-medium block opacity-70">Wk</span>
                      <span className="text-xs -mt-0.5">{task.weekNumber}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit dialog */}
      <Dialog open={editingTask !== null} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent className="border-border bg-card text-foreground sm:max-w-md">
          <form onSubmit={handleEditSubmit}>
            <DialogHeader>
              <DialogTitle className="text-foreground text-base">Edit Roadmap Goal</DialogTitle>
              <DialogDescription className="text-xs">Modify or update this goal&apos;s roadmap details.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-4 text-xs">
              <div className="space-y-1">
                <Label htmlFor="edit-title" className="text-foreground/80">Title</Label>
                <Input id="edit-title" required value={editForm.title}
                  onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))}
                  className="bg-background border-border h-8 text-xs text-foreground" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-desc" className="text-foreground/80">Description</Label>
                <textarea id="edit-desc" required value={editForm.description}
                  onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))} rows={3}
                  className="w-full text-xs bg-background border border-border rounded p-2 text-foreground focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-week" className="text-foreground/80">Week Number</Label>
                  <Input id="edit-week" type="number" required value={editForm.weekNumber}
                    onChange={(e) => setEditForm((p) => ({ ...p, weekNumber: e.target.value }))}
                    className="bg-background border-border h-8 text-xs text-foreground" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-cat" className="text-foreground/80">Category</Label>
                  <Select value={editForm.category} onValueChange={(v) => setEditForm((p) => ({ ...p, category: v ?? '' }))}>
                    <SelectTrigger className="bg-background border-border h-8 text-xs text-muted-foreground">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-xs text-foreground">
                      {TASK_CATEGORY_OPTIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-phase" className="text-foreground/80">Phase</Label>
                <Select value={editForm.phase} onValueChange={(v) => setEditForm((p) => ({ ...p, phase: v ?? '' }))}>
                  <SelectTrigger className="bg-background border-border h-8 text-xs text-muted-foreground">
                    <SelectValue placeholder="Phase" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-xs text-foreground">
                    {TASK_PHASE_OPTIONS.map((ph) => <SelectItem key={ph} value={ph}>{ph}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-notes" className="text-foreground/80">Progress Logs / Journal Notes</Label>
                <textarea id="edit-notes" value={editForm.notes}
                  onChange={(e) => setEditForm((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Write down any notes or logs for this week's progress..." rows={3}
                  className="w-full text-xs bg-background border border-border rounded p-2 text-foreground focus:outline-none" />
              </div>
              <div className="flex items-center gap-2 pt-1.5">
                <Checkbox id="edit-completed" checked={editForm.isCompleted}
                  onCheckedChange={(checked) => setEditForm((p) => ({ ...p, isCompleted: !!checked }))} />
                <Label htmlFor="edit-completed" className="text-foreground/90 font-semibold cursor-pointer">
                  Mark this goal as completed
                </Label>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {editingTask && (
                <Button type="button" variant="outline"
                  onClick={async () => { const ok = await onDeleteTask(editingTask._id); if (ok) setEditingTask(null); }}
                  className="border-rose-200 text-rose-600 hover:bg-rose-50 h-8 text-xs font-semibold shrink-0">
                  <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete Goal
                </Button>
              )}
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 text-xs font-semibold flex-1">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
