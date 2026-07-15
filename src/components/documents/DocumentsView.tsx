"use client";

import { FileText, TrendingUp, School, Check, Eye, ExternalLink, Loader2, Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { ITask, UploadedDoc } from '@/types';

interface DocItemProps {
  label: string;
  taskId: string;
  tasks: ITask[];
  uploadedDocs: UploadedDoc[];
  uploadingDocTitle: string | null;
  onUpload: (title: string, file: File) => Promise<void>;
}

function DocumentCheckItem({ label, taskId, tasks, uploadedDocs, uploadingDocTitle, onUpload }: DocItemProps) {
  const weekNum = Number(taskId);
  const task = tasks.find((t) => t.weekNumber === weekNum);
  const isChecked = task ? task.isCompleted : false;
  const savedDoc = uploadedDocs.find((d) => d.title === label);
  const isUploading = uploadingDocTitle === label;

  return (
    <div className="flex flex-col p-3.5 bg-white border border-border/80 rounded-xl space-y-3 shadow-sm hover:shadow transition duration-150">
      <div className="flex items-start justify-between gap-3 min-w-0">
        <div className="flex items-start gap-2.5 min-w-0">
          <div className={`mt-0.5 h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
            isChecked ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-border text-transparent bg-background'
          }`}>
            {isChecked && <Check className="h-2.5 w-2.5" />}
          </div>
          <div className="min-w-0">
            <span className={`text-[11px] font-bold block leading-tight ${isChecked ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
              {label}
            </span>
            <span className="text-[9px] text-muted-foreground mt-0.5 block">
              Required: Week {taskId} • {task ? task.category : 'General'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-50">
        <div className="min-w-0 flex-1">
          {savedDoc ? (
            <Dialog>
              <DialogTrigger render={
                <div className="group relative h-9 w-16 rounded border border-slate-200 overflow-hidden cursor-zoom-in shrink-0 bg-slate-100 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={savedDoc.fileUrl} alt={label} className="h-full w-full object-cover group-hover:scale-105 transition" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <Eye className="h-3 w-3 text-white" />
                  </div>
                </div>
              } />
              <DialogContent className="border-border bg-card text-foreground max-w-lg p-3">
                <DialogHeader className="pb-2 border-b border-border">
                  <DialogTitle className="text-sm font-bold">{label}</DialogTitle>
                </DialogHeader>
                <div className="aspect-video w-full rounded overflow-hidden mt-3 bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={savedDoc.fileUrl} alt={label} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex justify-between items-center mt-3 text-[10px] text-muted-foreground">
                  <span>Cloudinary Secure Photo Storage</span>
                  <a href={savedDoc.fileUrl} target="_blank" rel="noreferrer" className="text-rose-600 font-semibold hover:underline flex items-center gap-1">
                    Open Original <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <span className="text-[10px] text-slate-400 font-medium italic">No photo uploaded</span>
          )}
        </div>

        <div>
          {isUploading ? (
            <div className="flex items-center gap-1 text-[10px] font-bold text-rose-600 animate-pulse bg-rose-50 border border-rose-100 rounded px-2.5 py-1">
              <Loader2 className="h-3 w-3 animate-spin" /> Uploading...
            </div>
          ) : (
            <label className="text-[10px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded px-2.5 py-1 cursor-pointer transition flex items-center gap-1 hover:text-foreground">
              <Camera className="h-3.5 w-3.5 text-slate-500" />
              {savedDoc ? 'Change' : 'Upload'}
              <input type="file" accept="image/*" className="hidden"
                onChange={(e) => { const file = e.target.files?.[0]; if (file) onUpload(label, file); }} />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

interface DocSection {
  heading: string;
  accent: string;
  icon: typeof FileText;
  items: { label: string; taskId: string }[];
}

const SECTIONS: DocSection[] = [
  {
    heading: 'Academic Certificates', accent: 'rose', icon: FileText,
    items: [
      { label: 'Passport (Minimum 2 years validity)', taskId: '29' },
      { label: 'SSC Certificate & Marksheet', taskId: '30' },
      { label: 'HSC Certificate & Marksheet', taskId: '30' },
      { label: "Bachelor's Certificate & Transcript", taskId: '31' },
    ],
  },
  {
    heading: 'Professional Profile', accent: 'emerald', icon: TrendingUp,
    items: [
      { label: 'Recommendation Letters (2 Profs/Managers)', taskId: '32' },
      { label: 'ATS-Friendly Developer Resume', taskId: '33' },
      { label: 'Europass-Style Curriculum Vitae', taskId: '33' },
      { label: 'Statement of Purpose (SOP)', taskId: '34' },
      { label: 'Freelance Earning & Experience Certificates', taskId: '35' },
    ],
  },
  {
    heading: 'Visa & Universitaly Papers', accent: 'amber', icon: School,
    items: [
      { label: 'IELTS Language Test Report Card', taskId: '44' },
      { label: 'CIMEA Comparability Certificate', taskId: '50' },
      { label: 'Universitaly Pre-enrollment PDF Summary', taskId: '55' },
      { label: 'Sponsor Bank Solvency Statements', taskId: '45' },
      { label: 'DSU Regional Scholarship ISEE Parificato', taskId: '54' },
    ],
  },
];

const ACCENT_CLASSES: Record<string, string> = {
  rose: 'text-rose-600 border-rose-100',
  emerald: 'text-emerald-600 border-emerald-100',
  amber: 'text-amber-700 border-amber-100',
};

interface DocumentsViewProps {
  tasks: ITask[];
  uploadedDocs: UploadedDoc[];
  uploadingDocTitle: string | null;
  onUpload: (title: string, file: File) => Promise<void>;
}

export function DocumentsView({ tasks, uploadedDocs, uploadingDocTitle, onUpload }: DocumentsViewProps) {
  return (
    <Card className="border-border bg-card p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Pre-Flight Documents Checklist</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Verify that all required certificates, CV styles, and embassy papers are prepared. Upload photo copies using Cloudinary API.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.heading} className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-3">
              <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b pb-2 ${ACCENT_CLASSES[section.accent]}`}>
                <Icon className="h-4 w-4" /> {section.heading}
              </h3>
              <div className="space-y-4 pt-2">
                {section.items.map((item) => (
                  <DocumentCheckItem key={item.label} label={item.label} taskId={item.taskId}
                    tasks={tasks} uploadedDocs={uploadedDocs} uploadingDocTitle={uploadingDocTitle} onUpload={onUpload} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
