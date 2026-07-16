"use client";

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { ITransaction, NewTransactionForm } from '@/types';

const TARGET_SAVINGS = 1_500_000; // BDT 15 Lakh

const emptyTx = (): NewTransactionForm => ({
  description: '', amount: '', type: 'Deposit', category: 'Savings',
  date: new Date().toISOString().substring(0, 10),
});

interface FinanceViewProps {
  transactions: ITransaction[];
  totalSavings: number;
  onAddTransaction: (form: NewTransactionForm) => Promise<boolean>;
  onDeleteTransaction: (id: string) => void;
}

export function FinanceView({ transactions, totalSavings, onAddTransaction, onDeleteTransaction }: FinanceViewProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTx, setNewTx] = useState<NewTransactionForm>(emptyTx());

  const financePercent = Math.min((totalSavings / TARGET_SAVINGS) * 100, 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onAddTransaction(newTx);
    if (success) {
      setIsAddOpen(false);
      setNewTx(emptyTx());
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-border bg-card p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-foreground">Financial Support Progress</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Track sponsor support accounts and business income streams. Target: ৳15-20 Lakhs.
              </p>
            </div>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger render={<Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs h-8" />}>
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Log Deposit/Savings
              </DialogTrigger>
              <DialogContent className="border-border bg-card text-foreground sm:max-w-xs">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle className="text-foreground text-base">Log Transaction</DialogTitle>
                    <DialogDescription className="text-xs">Save deposit or business revenue amounts.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3 py-4 text-xs">
                    <div className="space-y-1.5">
                      <Label htmlFor="tx-desc" className="text-foreground/80">Description</Label>
                      <Input id="tx-desc" required value={newTx.description}
                        onChange={(e) => setNewTx((p) => ({ ...p, description: e.target.value }))}
                        placeholder="Freelance income, sponsor deposit..."
                        className="bg-background border-border h-8 text-xs text-foreground" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="tx-amount" className="text-foreground/80">Amount (BDT)</Label>
                        <Input id="tx-amount" type="number" required value={newTx.amount}
                          onChange={(e) => setNewTx((p) => ({ ...p, amount: e.target.value }))}
                          placeholder="e.g. 50000" className="bg-background border-border h-8 text-xs text-foreground" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="tx-date" className="text-foreground/80">Date</Label>
                        <Input id="tx-date" type="date" required value={newTx.date}
                          onChange={(e) => setNewTx((p) => ({ ...p, date: e.target.value }))}
                          className="bg-background border-border h-8 text-xs text-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="tx-type" className="text-foreground/80">Type</Label>
                        <Select value={newTx.type} onValueChange={(v) => setNewTx((p) => ({ ...p, type: v ?? '' }))}>
                          <SelectTrigger className="bg-background border-border h-8 text-xs text-muted-foreground">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border text-xs text-foreground">
                            <SelectItem value="Deposit">Deposit</SelectItem>
                            <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="tx-category" className="text-foreground/80">Category</Label>
                        <Select value={newTx.category} onValueChange={(v) => setNewTx((p) => ({ ...p, category: v ?? '' }))}>
                          <SelectTrigger className="bg-background border-border h-8 text-xs text-muted-foreground">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border text-xs text-foreground">
                            <SelectItem value="Savings">Savings</SelectItem>
                            <SelectItem value="Business Income">Business Income</SelectItem>
                            <SelectItem value="Sponsor">Sponsor</SelectItem>
                            <SelectItem value="Expenses">Expenses</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 text-xs font-semibold w-full">
                      Save Transaction
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Progress towards target</span>
              <span className="font-bold text-foreground">৳{totalSavings.toLocaleString()} / ৳1,500,000</span>
            </div>
            <Progress value={financePercent} className="h-3 bg-muted" />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="border-border bg-card p-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">Transaction History</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">List of savings inputs and withdrawals</p>
          </div>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {transactions.map((tx) => (
              <div key={tx._id} className="p-3 bg-muted/50 border border-border rounded-lg flex items-center justify-between gap-3 group">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      tx.type === 'Deposit' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                    }`}>
                      {tx.type}
                    </span>
                    <span className="text-xs font-bold text-foreground truncate">{tx.description}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground block mt-1">{new Date(tx.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold ${tx.type === 'Deposit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {tx.type === 'Deposit' ? '+' : '-'}৳{tx.amount.toLocaleString()}
                  </span>
                  <Button variant="ghost" size="icon-xs" onClick={() => onDeleteTransaction(tx._id)}
                    className="text-muted-foreground hover:text-rose-600 opacity-0 group-hover:opacity-100 transition h-6 w-6">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="text-xs text-muted-foreground/60 text-center py-8">No transaction logs logged yet.</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
