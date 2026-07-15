import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUniversity extends Document {
  name: string;
  city: string;
  ranking: string;
  tuitionFees: string;
  scholarships: string;
  ieltsRequirement: string;
  deadline: string;
  duration: string;
  livingCost: string;
  status: 'Researching' | 'Applying' | 'Submitted' | 'Accepted' | 'Rejected';
  createdAt: Date;
  updatedAt: Date;
}

const UniversitySchema = new Schema<IUniversity>(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    ranking: { type: String, default: '' },
    tuitionFees: { type: String, default: '' },
    scholarships: { type: String, default: '' },
    ieltsRequirement: { type: String, default: '' },
    deadline: { type: String, default: '' },
    duration: { type: String, default: '' },
    livingCost: { type: String, default: '' },
    status: { 
      type: String, 
      enum: ['Researching', 'Applying', 'Submitted', 'Accepted', 'Rejected'], 
      default: 'Researching' 
    },
  },
  { timestamps: true }
);

const University: Model<IUniversity> = mongoose.models.University || mongoose.model<IUniversity>('University', UniversitySchema);
export default University;
