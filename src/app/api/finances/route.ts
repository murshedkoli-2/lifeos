import connectDB from '@/lib/db';
import Finance from '@/models/Finance';
import { handleError, ok, fail, parseBody } from '@/lib/api';
import { createFinanceSchema, computeTotalSavings } from '@/lib/validation';

// GET: Fetch all transactions & compute total savings
export async function GET() {
  try {
    await connectDB();
    const transactions = await Finance.find({}).sort({ date: -1 });
    const totalSavings = computeTotalSavings(transactions);
    return ok({ transactions, totalSavings });
  } catch (error) {
    return handleError('GET /api/finances', error);
  }
}

// POST: Create a new transaction log
export async function POST(request: Request) {
  try {
    await connectDB();
    const { description, amount, type, category, date } = await parseBody(
      request,
      createFinanceSchema
    );

    const transaction = await Finance.create({
      description,
      amount,
      type,
      category,
      date: date ? new Date(date) : new Date(),
    });
    return ok({ transaction }, 201);
  } catch (error) {
    return handleError('POST /api/finances', error);
  }
}

// DELETE: Remove a transaction log
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const id = new URL(request.url).searchParams.get('id');
    if (!id) {
      return fail('Transaction ID is required', 400);
    }

    const deleted = await Finance.findByIdAndDelete(id);
    if (!deleted) {
      return fail('Transaction not found', 404);
    }
    return ok({ message: 'Transaction deleted successfully' });
  } catch (error) {
    return handleError('DELETE /api/finances', error);
  }
}
