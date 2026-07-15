import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProjectFeature {
  name: string;
  completed: boolean;
}

export interface IProject extends Document {
  name: string;
  type: 'SaaS' | 'Enterprise' | 'AI' | 'Open Source' | 'Portfolio';
  description: string;
  techStack: string[];
  features: IProjectFeature[];
  githubUrl?: string;
  liveUrl?: string;
  demoVideoUrl?: string;
  status: 'Idea' | 'In Progress' | 'Completed' | 'Deployed';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['SaaS', 'Enterprise', 'AI', 'Open Source', 'Portfolio'], required: true },
    description: { type: String, default: '' },
    techStack: [{ type: String }],
    features: [
      {
        name: { type: String, required: true },
        completed: { type: Boolean, default: false }
      }
    ],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    demoVideoUrl: { type: String, default: '' },
    status: { 
      type: String, 
      enum: ['Idea', 'In Progress', 'Completed', 'Deployed'], 
      default: 'Idea' 
    },
  },
  { timestamps: true }
);

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
