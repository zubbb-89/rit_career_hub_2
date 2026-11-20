import { Schema, model, Document } from 'mongoose';

export interface IAchievement extends Document {
  student: Schema.Types.ObjectId;
  studentName: string;
  usn: string;
  title: string;
  description: string;
  category: 'Hackathon' | 'Competition' | 'Sports' | 'Workshop' | 'Internship' | 'Research' | 'Technical' | 'Cultural';
  issuingOrganization: string;
  date: Date;
  fileUrl: string;
  fileType?: 'pdf' | 'image';
  fileName?: string;
  verificationStatus: 'pending' | 'approved' | 'rejected' | 'correction_required';
  approvedBy?: string;
  approvalDate?: Date;
  verificationRef?: string;
  verificationNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    studentName: { type: String, required: true },
    usn: { type: String, required: true, uppercase: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['Hackathon', 'Competition', 'Sports', 'Workshop', 'Internship', 'Research', 'Technical', 'Cultural'],
      default: 'Hackathon',
    },
    issuingOrganization: { type: String, required: true },
    date: { type: Date, default: Date.now },
    fileUrl: { type: String, required: true },
    fileType: { type: String, enum: ['pdf', 'image'], default: 'image' },
    fileName: { type: String },
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'correction_required'],
      default: 'pending',
    },
    approvedBy: { type: String },
    approvalDate: { type: Date },
    verificationRef: { type: String },
    verificationNotes: { type: String },
  },
  { timestamps: true }
);

export default model<IAchievement>('Achievement', AchievementSchema);
