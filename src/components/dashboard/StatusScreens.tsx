"use client";

import { AlertCircle, RefreshCw, Sparkles, Loader2, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function DbErrorScreen({ error, onRetry }: { error: string | null; onRetry: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="max-w-md w-full border-border bg-card shadow-xl shadow-rose-100">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 border border-rose-200 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <CardTitle className="text-foreground text-2xl font-bold">Database Setup Required</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            We encountered a connection issue with MongoDB Atlas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-foreground/85">
            Please open the <code className="bg-muted text-amber-600 px-1 py-0.5 rounded text-xs">.env.local</code> file in your project directory and set your genuine MongoDB Atlas connection string:
          </p>
          <div className="bg-muted p-3 rounded-lg border border-border font-mono text-[10px] text-muted-foreground break-all select-all">
            MONGODB_URI=&quot;mongodb+srv://username:password@cluster0.abcde.mongodb.net/lifeos?retryWrites=true&amp;w=majority&quot;
          </div>
          <p className="text-xs text-muted-foreground/60">
            Make sure your MongoDB database allows connections from your current IP address (configure IP Access List in Atlas to allow all <code className="bg-muted text-muted-foreground/80 px-1 rounded">0.0.0.0/0</code> for testing).
          </p>
          {error && (
            <div className="bg-rose-50/50 p-2.5 rounded border border-rose-200 text-[11px] text-rose-700 font-mono overflow-auto max-h-32">
              <strong>Error Details:</strong> {error}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-muted text-foreground hover:bg-muted/80" onClick={onRetry}>
            <RefreshCw className="mr-2 h-4 w-4" /> Retry Connection
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function SeedScreen({ onSeed, isSeeding }: { onSeed: () => void; isSeeding: boolean }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="max-w-md w-full border-border bg-card shadow-xl shadow-rose-100">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 border border-rose-200 text-rose-600">
            <Sparkles className="h-6 w-6" />
          </div>
          <CardTitle className="text-foreground text-2xl font-bold">Welcome to Life OS</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Your database is connected, but empty. Let&apos;s initialize your 104-week goal roadmap!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-foreground/80 text-center">
            Click the button below to seed the database with all 104 weeks of sequential goals, university lists, and project templates.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold"
            onClick={onSeed}
            disabled={isSeeding}
          >
            {isSeeding ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Seeding Roadmap...</>
            ) : (
              <><Play className="mr-2 h-4 w-4" /> Initialize 104-Week Roadmap</>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
