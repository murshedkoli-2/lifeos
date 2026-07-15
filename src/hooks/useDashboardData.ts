"use client";

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/toast';
import type {
  ITask, IUniversity, IProject, ITransaction, UploadedDoc,
  AddTaskForm, EditTaskForm, NewTransactionForm,
} from '@/types';

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unexpected error';
}

async function postJson(url: string, body: unknown, method = 'POST') {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

export function useDashboardData() {
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
  const [uploadingDocTitle, setUploadingDocTitle] = useState<string | null>(null);

  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const [focusedTaskId, setFocusedTaskId] = useState<string | null>(null);
  const [activeTaskNotes, setActiveTaskNotes] = useState('');
  const [notesSyncedFor, setNotesSyncedFor] = useState<string | null>(null);
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const [dbError, setDbError] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setDbError(null);

      // Fetch tasks first (drives the focus view), then the rest in parallel.
      const tasksRes = await fetch('/api/tasks');
      const tasksData = await tasksRes.json();
      if (!tasksData.success) {
        throw new Error(tasksData.error || 'Failed to fetch tasks');
      }
      const nextTasks: ITask[] = tasksData.tasks;
      setTasks(nextTasks);

      const active = nextTasks.find((t) => !t.isCompleted) || null;
      setActiveTask(active);

      const activeWeek = active ? active.weekNumber : 1;
      const weekTasks = nextTasks.filter((t) => t.weekNumber === activeWeek);
      const firstUncompletedInWeek = weekTasks.find((t) => !t.isCompleted) || weekTasks[0] || null;
      setFocusedTaskId((prev) => {
        if (prev && nextTasks.some((t) => t._id === prev)) return prev;
        return firstUncompletedInWeek ? firstUncompletedInWeek._id : null;
      });

      const [uni, proj, fin, docs] = await Promise.all([
        fetch('/api/universities').then((r) => r.json()),
        fetch('/api/projects').then((r) => r.json()),
        fetch('/api/finances').then((r) => r.json()),
        fetch('/api/documents').then((r) => r.json()),
      ]);

      if (uni.success) setUniversities(uni.universities);
      if (proj.success) setProjects(proj.projects);
      if (fin.success) {
        setTransactions(fin.transactions);
        setTotalSavings(fin.totalSavings);
      }
      if (docs.success) setUploadedDocs(docs.documents);
    } catch (err) {
      setDbError(getErrorMessage(err) || 'Database connection error.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial data load on mount (synchronizing with the server).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  // Seed the editable notes textarea whenever the focused task changes.
  // Done during render (React's recommended pattern for "adjust state when a
  // prop/value changes") rather than in an effect, to avoid cascading renders.
  if (focusedTaskId && focusedTaskId !== notesSyncedFor && tasks.length > 0) {
    const task = tasks.find((t) => t._id === focusedTaskId);
    setActiveTaskNotes(task?.notes || '');
    setNotesSyncedFor(focusedTaskId);
  }

  const refreshFinances = useCallback(async () => {
    const fin = await fetch('/api/finances').then((r) => r.json());
    if (fin.success) {
      setTransactions(fin.transactions);
      setTotalSavings(fin.totalSavings);
    }
  }, []);

  const handleSeedDatabase = useCallback(async () => {
    try {
      setIsSeeding(true);
      setDbError(null);
      const data = await postJson('/api/tasks', { action: 'seed' });
      if (data.success) {
        await fetchData();
      } else {
        throw new Error(data.error || 'Failed to seed database');
      }
    } catch (err) {
      setDbError(getErrorMessage(err));
    } finally {
      setIsSeeding(false);
    }
  }, [fetchData]);

  // --- Tasks ---------------------------------------------------------------

  const handleCompleteActiveTask = useCallback(async () => {
    if (!focusedTaskId) return;
    try {
      setIsSavingNotes(true);
      const focused = tasks.find((t) => t._id === focusedTaskId);
      const nextStatus = focused ? !focused.isCompleted : true;
      const data = await postJson(
        `/api/tasks/${focusedTaskId}/complete`,
        { isCompleted: nextStatus, notes: activeTaskNotes },
        'PATCH'
      );
      if (data.success) {
        await fetchData();
      } else {
        toast.error('Failed to update task: ' + data.error);
      }
    } catch (err) {
      toast.error('Error updating task: ' + getErrorMessage(err));
    } finally {
      setIsSavingNotes(false);
    }
  }, [focusedTaskId, tasks, activeTaskNotes, fetchData, toast]);

  const handleSaveActiveNotes = useCallback(async () => {
    if (!focusedTaskId) return;
    try {
      setIsSavingNotes(true);
      const data = await postJson(
        `/api/tasks/${focusedTaskId}/complete`,
        { notes: activeTaskNotes },
        'PATCH'
      );
      if (data.success) {
        setTasks((prev) =>
          prev.map((t) => (t._id === focusedTaskId ? { ...t, notes: activeTaskNotes } : t))
        );
        toast.success('Notes saved successfully!');
      } else {
        toast.error('Failed to save notes: ' + data.error);
      }
    } catch (err) {
      toast.error('Error saving notes: ' + getErrorMessage(err));
    } finally {
      setIsSavingNotes(false);
    }
  }, [focusedTaskId, activeTaskNotes, toast]);

  const handleToggleTaskComplete = useCallback(
    async (task: ITask) => {
      // Optimistic update, rolled back on failure.
      const nextStatus = !task.isCompleted;
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, isCompleted: nextStatus } : t))
      );
      try {
        const data = await postJson(
          `/api/tasks/${task._id}/complete`,
          { isCompleted: nextStatus },
          'PATCH'
        );
        if (data.success) {
          await fetchData();
        } else {
          setTasks((prev) =>
            prev.map((t) => (t._id === task._id ? { ...t, isCompleted: task.isCompleted } : t))
          );
          toast.error('Failed to toggle task: ' + data.error);
        }
      } catch (err) {
        setTasks((prev) =>
          prev.map((t) => (t._id === task._id ? { ...t, isCompleted: task.isCompleted } : t))
        );
        toast.error('Error: ' + getErrorMessage(err));
      }
    },
    [fetchData, toast]
  );

  const handleAddTask = useCallback(
    async (form: AddTaskForm): Promise<boolean> => {
      try {
        const data = await postJson('/api/tasks', form);
        if (data.success) {
          await fetchData();
          toast.success('Goal added to roadmap');
          return true;
        }
        toast.error('Error adding task: ' + data.error);
        return false;
      } catch (err) {
        toast.error('Error: ' + getErrorMessage(err));
        return false;
      }
    },
    [fetchData, toast]
  );

  const handleUpdateTask = useCallback(
    async (id: string, form: EditTaskForm): Promise<boolean> => {
      try {
        const data = await postJson(`/api/tasks/${id}`, form, 'PUT');
        if (data.success) {
          await fetchData();
          toast.success('Goal updated');
          return true;
        }
        toast.error('Error updating task: ' + data.error);
        return false;
      } catch (err) {
        toast.error('Error: ' + getErrorMessage(err));
        return false;
      }
    },
    [fetchData, toast]
  );

  const handleDeleteTask = useCallback(
    async (id: string): Promise<boolean> => {
      if (!confirm('Are you sure you want to delete this task? This will disrupt the 104-week chronological timeline.')) {
        return false;
      }
      try {
        const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          await fetchData();
          toast.success('Goal deleted');
          return true;
        }
        toast.error('Error deleting task: ' + data.error);
        return false;
      } catch (err) {
        toast.error('Error: ' + getErrorMessage(err));
        return false;
      }
    },
    [fetchData, toast]
  );

  // --- Universities --------------------------------------------------------

  const handleAddUniversity = useCallback(
    async (uni: IUniversity): Promise<boolean> => {
      try {
        const data = await postJson('/api/universities', uni);
        if (data.success) {
          setUniversities((prev) => [...prev, data.university]);
          toast.success('University added');
          return true;
        }
        toast.error('Error adding university: ' + data.error);
        return false;
      } catch {
        toast.error('Error adding university');
        return false;
      }
    },
    [toast]
  );

  const handleUpdateUniversityStatus = useCallback(
    async (id: string, status: IUniversity['status']) => {
      const previous = universities;
      setUniversities((prev) => prev.map((u) => (u._id === id ? { ...u, status } : u)));
      try {
        const data = await postJson('/api/universities', { _id: id, status }, 'PUT');
        if (!data.success) {
          setUniversities(previous);
          toast.error('Error updating status');
        }
      } catch {
        setUniversities(previous);
        toast.error('Error updating status');
      }
    },
    [universities, toast]
  );

  const handleDeleteUniversity = useCallback(
    async (id: string) => {
      if (!confirm('Are you sure you want to remove this university?')) return;
      const previous = universities;
      setUniversities((prev) => prev.filter((u) => u._id !== id));
      try {
        const res = await fetch(`/api/universities?id=${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (!data.success) {
          setUniversities(previous);
          toast.error('Error deleting university');
        }
      } catch {
        setUniversities(previous);
        toast.error('Error deleting university');
      }
    },
    [universities, toast]
  );

  // --- Projects ------------------------------------------------------------

  const handleToggleProjectFeature = useCallback(
    async (project: IProject, featureIndex: number) => {
      const updatedFeatures = project.features.map((f, i) =>
        i === featureIndex ? { ...f, completed: !f.completed } : f
      );
      const allCompleted = updatedFeatures.every((f) => f.completed);
      const someCompleted = updatedFeatures.some((f) => f.completed);
      const status: IProject['status'] = allCompleted
        ? 'Completed'
        : someCompleted
          ? 'In Progress'
          : 'Idea';

      setProjects((prev) =>
        prev.map((p) => (p._id === project._id ? { ...p, features: updatedFeatures, status } : p))
      );
      try {
        const data = await postJson(
          '/api/projects',
          { _id: project._id, features: updatedFeatures, status },
          'PUT'
        );
        if (!data.success) {
          setProjects((prev) => prev.map((p) => (p._id === project._id ? project : p)));
          toast.error('Error updating feature checklist');
        }
      } catch {
        setProjects((prev) => prev.map((p) => (p._id === project._id ? project : p)));
        toast.error('Error updating feature checklist');
      }
    },
    [toast]
  );

  const handleUpdateProjectUrls = useCallback(
    async (projectId: string, githubUrl: string, liveUrl: string, demoUrl: string) => {
      try {
        const data = await postJson(
          '/api/projects',
          { _id: projectId, githubUrl, liveUrl, demoVideoUrl: demoUrl },
          'PUT'
        );
        if (data.success) {
          setProjects((prev) =>
            prev.map((p) =>
              p._id === projectId ? { ...p, githubUrl, liveUrl, demoVideoUrl: demoUrl } : p
            )
          );
          toast.success('Project URLs updated!');
        } else {
          toast.error('Error updating project URLs');
        }
      } catch {
        toast.error('Error updating project URLs');
      }
    },
    [toast]
  );

  // --- Documents -----------------------------------------------------------

  const handleUploadDocument = useCallback(
    async (title: string, file: File) => {
      try {
        setUploadingDocTitle(title);
        const formData = new FormData();
        formData.append('file', file);

        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!uploadRes.ok) {
          const errData = await uploadRes.json().catch(() => ({}));
          throw new Error(errData.error || 'Server-side file upload failed.');
        }
        const uploadData = await uploadRes.json();
        const fileUrl = uploadData.secure_url;

        const dbData = await postJson('/api/documents', { title, fileUrl });
        if (dbData.success) {
          setUploadedDocs((prev) => [...prev.filter((d) => d.title !== title), { title, fileUrl }]);
          toast.success(`${title} uploaded and saved`);
        } else {
          toast.error('Failed to save document details: ' + dbData.error);
        }
      } catch (err) {
        toast.error('Upload Error: ' + getErrorMessage(err));
      } finally {
        setUploadingDocTitle(null);
      }
    },
    [toast]
  );

  // --- Finances ------------------------------------------------------------

  const handleAddTransaction = useCallback(
    async (form: NewTransactionForm): Promise<boolean> => {
      try {
        const data = await postJson('/api/finances', {
          description: form.description,
          amount: Number(form.amount),
          type: form.type,
          category: form.category,
          date: form.date,
        });
        if (data.success) {
          await refreshFinances();
          toast.success('Transaction saved');
          return true;
        }
        toast.error('Error adding transaction: ' + data.error);
        return false;
      } catch {
        toast.error('Error adding transaction');
        return false;
      }
    },
    [refreshFinances, toast]
  );

  const handleDeleteTransaction = useCallback(
    async (id: string) => {
      if (!confirm('Delete this transaction?')) return;
      try {
        const res = await fetch(`/api/finances?id=${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          await refreshFinances();
        } else {
          toast.error('Error deleting transaction');
        }
      } catch {
        toast.error('Error deleting transaction');
      }
    },
    [refreshFinances, toast]
  );

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.replace('/login');
      router.refresh();
    }
  }, [router]);

  return {
    // state
    loading, tasks, universities, projects, transactions, totalSavings,
    uploadedDocs, uploadingDocTitle, activeTask, focusedTaskId, activeTaskNotes,
    isSavingNotes, dbError, isSeeding,
    // setters
    setFocusedTaskId, setActiveTaskNotes,
    // actions
    fetchData, handleSeedDatabase, handleCompleteActiveTask, handleSaveActiveNotes,
    handleToggleTaskComplete, handleAddTask, handleUpdateTask, handleDeleteTask,
    handleAddUniversity, handleUpdateUniversityStatus, handleDeleteUniversity,
    handleToggleProjectFeature, handleUpdateProjectUrls, handleUploadDocument,
    handleAddTransaction, handleDeleteTransaction, handleLogout,
  };
}

export type DashboardData = ReturnType<typeof useDashboardData>;
