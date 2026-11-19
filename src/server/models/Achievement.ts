import { Schema, model, Document } from 'mongoose';

export interface IAchievement extends Document {
  student: Schema.Types.ObjectId; // reference to StudentProfile
  title: string;
  description?: string;
  category: string; // e.g., Hackathon, Sports, Publication
  issuingOrganization: string;
  date: Date;
  fileUrl?: string; // Cloudinary URL
  status: 'pending' | 'approved' | 'rejected' | 'correction_required';
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'StudentProfile', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    issuingOrganization: { type: String, required: true },
    date: { type: Date, required: true },
    fileUrl: { type: String },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'correction_required'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default model<IAchievement>('Achievement', AchievementSchema);
