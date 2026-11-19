import { Schema, model, Document } from 'mongoose';

export interface IStudentProfile extends Document {
  user: Schema.Types.ObjectId;
  username: string; // for dynamic portfolio url: /student/:username
  fullName: string;
  usn: string;
  collegeEmail: string;
  phone: string;
  department: string;
  section: string;
  academicYear: number;
  semester: number;
  profilePhotoUrl?: string;
  portraitUrl?: string;
  bio?: string;
  skills: string[];
  interests: string[];
  githubUrl?: string;
  linkedInUrl?: string;
  careerGoals?: string;
  targetRole?: string;
  portfolioVisibility: 'public' | 'unlisted' | 'private';
  consentPublicDisplay: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StudentProfileSchema = new Schema<IStudentProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fullName: { type: String, required: true },
    usn: { type: String, required: true, unique: true, uppercase: true },
    collegeEmail: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true, default: 'Computer Science & Engineering' },
    section: { type: String, default: 'A' },
    academicYear: { type: Number, default: 2026 },
    semester: { type: Number, default: 6 },
    profilePhotoUrl: { type: String },
    portraitUrl: { type: String },
    bio: { type: String, default: 'Engineering undergraduate at Rajeev Institute of Technology, Hassan.' },
    skills: { type: [String], default: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB'] },
    interests: { type: [String], default: ['Full-Stack Development', 'AI/ML', 'Cloud Computing'] },
    githubUrl: { type: String, default: 'https://github.com' },
    linkedInUrl: { type: String, default: 'https://linkedin.com' },
    careerGoals: { type: String, default: 'Software Engineer at a high-growth tech enterprise.' },
    targetRole: { type: String, default: 'Software Developer' },
    portfolioVisibility: { type: String, enum: ['public', 'unlisted', 'private'], default: 'public' },
    consentPublicDisplay: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<IStudentProfile>('StudentProfile', StudentProfileSchema);
