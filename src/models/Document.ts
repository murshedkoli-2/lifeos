import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  fileUrl: string;
  uploadedAt: Date;
}

const DocumentSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);
