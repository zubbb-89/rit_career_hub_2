import { Schema, model, Document } from 'mongoose';
import crypto from 'crypto';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: 'admin' | 'student' | 'recruiter';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  verifyPassword(password: string): boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    role: { type: String, enum: ['admin', 'student', 'recruiter'], default: 'student' },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Method to verify password using native PBKDF2
UserSchema.methods.verifyPassword = function (password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.passwordHash === hash;
};

// Static helper to create salt & hash
export function hashPassword(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

export default model<IUser>('User', UserSchema);
