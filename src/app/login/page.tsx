"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        router.replace('/');
        router.refresh();
      } else {
        setError(data.error || 'Sign in failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="max-w-sm w-full border-border bg-card shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-600 text-white shadow-md shadow-rose-950/15">
            <Sparkles className="h-6 w-6" />
          </div>
          <CardTitle className="text-foreground text-2xl font-bold">Life OS</CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            Enter your password to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-foreground/80 text-xs">Password</Label>
              <Input
                id="password"
                type="password"
                autoFocus
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-background border-border text-foreground"
              />
            </div>
            {error && (
              <p className="text-xs text-rose-600 font-medium bg-rose-50 border border-rose-200 rounded px-3 py-2">
                {error}
              </p>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold"
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>
              ) : (
                <><Lock className="mr-2 h-4 w-4" /> Sign In</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
