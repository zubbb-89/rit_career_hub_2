import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  uid: string; // Firebase UID
  email: string;
  role: 'admin' | 'student' | 'recruiter';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'student', 'recruiter'], default: 'student' },
  },
  { timestamps: true }
);

export default model<IUser>('User', UserSchema);
