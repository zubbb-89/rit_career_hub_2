import { Schema, model, Document } from 'mongoose';

export interface IStudentProfile extends Document {
  user: Schema.Types.ObjectId; // reference to User
  fullName: string;
  usn: string;
  collegeEmail: string;
  phone: string;
  department: Schema.Types.ObjectId;
  section: string;
  academicYear: number;
  semester: number;
  profilePhotoUrl?: string;
  skills: string[];
  interests: string[];
  githubUrl?: string;
  linkedInUrl?: string;
  careerGoals?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentProfileSchema = new Schema<IStudentProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    usn: { type: String, required: true, unique: true },
    collegeEmail: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    section: { type: String, required: true },
    academicYear: { type: Number, required: true },
    semester: { type: Number, required: true },
    profilePhotoUrl: { type: String },
    skills: [{ type: String }],
    interests: [{ type: String }],
    githubUrl: { type: String },
    linkedInUrl: { type: String },
    careerGoals: { type: String },
  },
  { timestamps: true }
);

export default model<IStudentProfile>('StudentProfile', StudentProfileSchema);
