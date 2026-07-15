import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITask extends Document {
  weekNumber: number;
  phase: string;
  title: string;
  description: string;
  category: string;
  isCompleted: boolean;
  completedAt?: Date;
  sequenceOrder: number; // For strictly linear unlocking: 1, 2, 3, etc.
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    weekNumber: { type: Number, required: true },
    phase: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date },
    sequenceOrder: { type: Number, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

// Prevent model recompilation errors during Next.js hot-reloads
const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
export default Task;
