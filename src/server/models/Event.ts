import { Schema, model, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  code: string;
  description: string;
  organizer: string;
  category: string;
  eventDate: Date;
  registrationDeadline: Date;
  venue: string;
  mode: 'offline' | 'online' | 'hybrid';
  fee: number;
  maxParticipants: number;
  teamSize: { min: number; max: number };
  rules: string[];
  bannerUrl?: string;
  status: 'upcoming' | 'open' | 'closed' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String, required: true },
    organizer: { type: String, default: 'GDG on Campus – RIT Hassan' },
    category: { type: String, default: 'Hackathon' },
    eventDate: { type: Date, default: () => new Date('2026-11-28') },
    registrationDeadline: { type: Date, default: () => new Date('2026-11-27') },
    venue: { type: String, default: 'RIT Hassan Campus, CSE Seminar Hall' },
    mode: { type: String, enum: ['offline', 'online', 'hybrid'], default: 'offline' },
    fee: { type: Number, default: 1.00 },
    maxParticipants: { type: Number, default: 100 },
    teamSize: {
      min: { type: Number, default: 1 },
      max: { type: Number, default: 4 },
    },
    rules: [{ type: String }],
    bannerUrl: { type: String },
    status: { type: String, enum: ['upcoming', 'open', 'closed', 'completed'], default: 'open' },
  },
  { timestamps: true }
);

export default model<IEvent>('Event', EventSchema);
