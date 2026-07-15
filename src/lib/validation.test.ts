import { describe, expect, test } from 'vitest';
import {
  computeTotalSavings,
  createFinanceSchema,
  createTaskSchema,
  createDocumentSchema,
  loginSchema,
} from './validation';

describe('computeTotalSavings', () => {
  test('sums deposits and subtracts withdrawals', () => {
    const total = computeTotalSavings([
      { type: 'Deposit', amount: 1000 },
      { type: 'Deposit', amount: 500 },
      { type: 'Withdrawal', amount: 200 },
    ]);
    expect(total).toBe(1300);
  });

  test('returns 0 for no transactions', () => {
    expect(computeTotalSavings([])).toBe(0);
  });
});

describe('createFinanceSchema', () => {
  test('coerces a numeric string amount', () => {
    const parsed = createFinanceSchema.parse({
      description: 'Sponsor deposit',
      amount: '50000',
      type: 'Deposit',
      category: 'Savings',
    });
    expect(parsed.amount).toBe(50000);
  });

  test('rejects a negative amount', () => {
    expect(() =>
      createFinanceSchema.parse({
        description: 'Bad', amount: -5, type: 'Deposit', category: 'Savings',
      })
    ).toThrow();
  });

  test('rejects an unknown category', () => {
    expect(() =>
      createFinanceSchema.parse({
        description: 'Bad', amount: 5, type: 'Deposit', category: 'Crypto',
      })
    ).toThrow();
  });
});

describe('createTaskSchema', () => {
  test('coerces weekNumber from string', () => {
    const parsed = createTaskSchema.parse({
      title: 'X', description: 'Y', category: 'IELTS',
      phase: 'Phase 1: IELTS & Portfolio', weekNumber: '3',
    });
    expect(parsed.weekNumber).toBe(3);
  });

  test('rejects an empty title', () => {
    expect(() =>
      createTaskSchema.parse({
        title: '', description: 'Y', category: 'IELTS',
        phase: 'Phase 1', weekNumber: 1,
      })
    ).toThrow();
  });
});

describe('createDocumentSchema', () => {
  test('rejects a non-URL fileUrl', () => {
    expect(() => createDocumentSchema.parse({ title: 'Passport', fileUrl: 'not-a-url' })).toThrow();
  });
});

describe('loginSchema', () => {
  test('requires a non-empty password', () => {
    expect(() => loginSchema.parse({ password: '' })).toThrow();
    expect(loginSchema.parse({ password: 'x' }).password).toBe('x');
  });
});
