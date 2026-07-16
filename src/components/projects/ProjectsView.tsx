"use client";

import { useState } from 'react';
import { Globe, ExternalLink, Play, Check, Rocket } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import type { IProject } from '@/types';

const STATUS_STYLES: Record<IProject['status'], string> = {
  Idea: 'bg-slate-50 text-slate-600 border-slate-200',
  'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Deployed: 'bg-sky-50 text-sky-700 border-sky-200',
};

interface ProjectsViewProps {
  projects: IProject[];
  onToggleFeature: (project: IProject, featureIndex: number) => void;
  onUpdateUrls: (projectId: string, githubUrl: string, liveUrl: string, demoUrl: string) => Promise<void>;
}

export function ProjectsView({ projects, onToggleFeature, onUpdateUrls }: ProjectsViewProps) {
  return (
    <Card className="border-border bg-card p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Rocket className="h-4.5 w-4.5 text-primary" /> Portfolio Projects
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Track build progress across your portfolio, SaaS, and enterprise projects. Check off features to update each project&apos;s status automatically.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-xs text-muted-foreground/60 text-center py-12">No projects yet.</div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {projects.map((project) => {
            const completed = project.features.filter((f) => f.completed).length;
            const total = project.features.length;
            const percent = total > 0 ? (completed / total) * 100 : 0;

            return (
              <Card key={project._id} className="border-border bg-slate-50/40 p-5 space-y-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-foreground truncate">{project.name}</h3>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                        {project.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{project.description}</p>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${STATUS_STYLES[project.status]}`}>
                    {project.status}
                  </span>
                </div>

                {project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-[9px] font-medium text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                    <span>Feature Progress</span>
                    <span>{completed} / {total}</span>
                  </div>
                  <Progress value={percent} className="h-2 bg-muted" />
                </div>

                <div className="space-y-1.5">
                  {project.features.map((feature, index) => (
                    <label
                      key={feature._id ?? feature.name}
                      className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-100 transition cursor-pointer text-xs"
                    >
                      <Checkbox
                        checked={feature.completed}
                        onCheckedChange={() => onToggleFeature(project, index)}
                      />
                      <span className={`min-w-0 truncate ${feature.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                        {feature.name}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <ProjectUrlsManager
                    projectId={project._id}
                    initialGithub={project.githubUrl ?? ''}
                    initialLive={project.liveUrl ?? ''}
                    initialDemo={project.demoVideoUrl ?? ''}
                    onSave={onUpdateUrls}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </Card>
  );
}

interface ProjectUrlsProps {
  projectId: string;
  initialGithub: string;
  initialLive: string;
  initialDemo: string;
  onSave: (id: string, git: string, live: string, demo: string) => Promise<void>;
}

function ProjectUrlsManager({ projectId, initialGithub, initialLive, initialDemo, onSave }: ProjectUrlsProps) {
  const [git, setGit] = useState(initialGithub);
  const [live, setLive] = useState(initialLive);
  const [demo, setDemo] = useState(initialDemo);
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between w-full text-xs gap-2">
        <div className="flex gap-3 flex-wrap min-w-0">
          {git && (
            <a href={git} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" /> GitHub <ExternalLink className="h-2.5 w-2.5" />
            </a>
          )}
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ExternalLink className="h-3.5 w-3.5" /> Live Demo
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              <Play className="h-3.5 w-3.5" /> Video Walkthrough
            </a>
          )}
          {!git && !live && !demo && <span className="text-muted-foreground/80">No project URLs saved yet</span>}
        </div>
        <Button onClick={() => setIsEditing(true)} variant="ghost" className="h-7 text-xs text-muted-foreground hover:text-foreground hover:bg-muted shrink-0">
          Edit Links
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2.5 text-xs py-1">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground/80 font-semibold uppercase">GitHub URL</Label>
          <input value={git} onChange={(e) => setGit(e.target.value)} placeholder="https://github.com/..."
            className="w-full bg-background border border-border rounded px-2 py-1 text-foreground/80 focus:outline-none focus:border-border" />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground/80 font-semibold uppercase">Live URL</Label>
          <input value={live} onChange={(e) => setLive(e.target.value)} placeholder="https://my-saas.com"
            className="w-full bg-background border border-border rounded px-2 py-1 text-foreground/80 focus:outline-none focus:border-border" />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground/80 font-semibold uppercase">Demo Video URL</Label>
          <input value={demo} onChange={(e) => setDemo(e.target.value)} placeholder="https://youtube.com/..."
            className="w-full bg-background border border-border rounded px-2 py-1 text-foreground/80 focus:outline-none focus:border-border" />
        </div>
      </div>
      <div className="flex justify-end gap-1.5">
        <Button onClick={() => setIsEditing(false)} variant="ghost" className="h-7 text-xs text-muted-foreground/80 hover:text-foreground/80">
          Cancel
        </Button>
        <Button
          onClick={async () => { await onSave(projectId, git, live, demo); setIsEditing(false); }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-7 text-xs font-semibold px-3"
        >
          <Check className="mr-1 h-3 w-3" /> Save Links
        </Button>
      </div>
    </div>
  );
}
