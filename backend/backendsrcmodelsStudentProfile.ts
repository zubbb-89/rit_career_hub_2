import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface IStudentProfile extends Document {
  user: IUser['_id'];
  fullName: string;
  usn: string;
  collegeEmail: string;
  phone: string;
  department: string;
  section: string;
  academicYear: number;
  semester: number;
  photoUrl?: string;
  skills: string[];
  interests: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  careerGoals?: string;
}

const StudentProfileSchema = new Schema<IStudentProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    usn: { type: String, required: true, unique: true },
    collegeEmail: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    section: { type: String, required: true },
    academicYear: { type: Number, required: true },
    semester: { type: Number, required: true },
    photoUrl: String,
    skills: [{ type: String }],
    interests: [{ type: String }],
    githubUrl: String,
    linkedinUrl: String,
    careerGoals: String,
  },
  { timestamps: true }
);

export const StudentProfile = mongoose.model<IStudentProfile>("StudentProfile", StudentProfileSchema);