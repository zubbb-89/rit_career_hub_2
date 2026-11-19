import { Schema, model, Document } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  code: string;
  sections: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    sections: { type: [String], default: ['A', 'B', 'C', 'D'] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<IDepartment>('Department', DepartmentSchema);
