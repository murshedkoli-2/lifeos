import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFinance extends Document {
  date: Date;
  description: string;
  amount: number;
  type: 'Deposit' | 'Withdrawal';
  category: 'Sponsor' | 'Business Income' | 'Savings' | 'Expenses';
  createdAt: Date;
  updatedAt: Date;
}

const FinanceSchema = new Schema<IFinance>(
  {
    date: { type: Date, required: true, default: Date.now },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['Deposit', 'Withdrawal'], required: true },
    category: { 
      type: String, 
      enum: ['Sponsor', 'Business Income', 'Savings', 'Expenses'], 
      required: true 
    },
  },
  { timestamps: true }
);

const Finance: Model<IFinance> = mongoose.models.Finance || mongoose.model<IFinance>('Finance', FinanceSchema);
export default Finance;
