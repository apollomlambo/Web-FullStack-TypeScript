import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  status: string;
}

const departmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true },
  status: { type: String, required: true },
});

export default mongoose.model<IDepartment>('Department', departmentSchema);