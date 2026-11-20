import { Schema, model, Document } from 'mongoose';

export interface IPaymentTransaction extends Document {
  transactionId: string; // 12-digit UTR
  registrationId: string;
  eventId: string;
  eventName: string;
  studentId?: Schema.Types.ObjectId;
  studentName: string;
  usn: string;
  department: string;
  section: string;
  teamName?: string;
  teamSize?: string;
  year?: string;
  studentEmail?: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'verified' | 'failed' | 'rejected';
  proofUrl?: string;
  adminNotes?: string;
  verifiedBy?: string;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentTransactionSchema = new Schema<IPaymentTransaction>(
  {
    transactionId: { type: String, required: true, unique: true, uppercase: true, trim: true },
    registrationId: { type: String, required: true, trim: true },
    eventId: { type: String, default: 'CODESTORM-2026-CH01' },
    eventName: { type: String, default: 'CODESTORM 2026 – Challenge 01: Website Building' },
    studentId: { type: Schema.Types.ObjectId, ref: 'User' },
    studentName: { type: String, required: true },
    usn: { type: String, required: true, uppercase: true, trim: true },
    department: { type: String, required: true },
    section: { type: String, default: 'A' },
    teamName: { type: String, default: 'Solo Entry' },
    teamSize: { type: String, default: 'Solo Hacker' },
    year: { type: String, default: '3rd Year' },
    studentEmail: { type: String },
    amount: { type: Number, required: true, default: 1.00 },
    paymentMethod: { type: String, default: 'PhonePe UPI QR' },
    paymentStatus: {
      type: String,
      enum: ['pending', 'verified', 'failed', 'rejected'],
      default: 'pending',
    },
    proofUrl: { type: String },
    adminNotes: { type: String },
    verifiedBy: { type: String },
    verifiedAt: { type: Date },
  },
  { timestamps: true }
);

export default model<IPaymentTransaction>('PaymentTransaction', PaymentTransactionSchema);
