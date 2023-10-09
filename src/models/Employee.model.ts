// Employee.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
  password: string;
  firstName: string;
  lastName: string;
  telephoneNumber: string;
  emailAddress: string;
  employeeManager: mongoose.Types.ObjectId;
  status: string;
}

const employeeSchema = new Schema<IEmployee>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  telephoneNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  employeeManager: { type: Schema.Types.ObjectId, ref: 'Employee' }, // Use Schema.Types.ObjectId
  status: { type: String, required: true },
});

export default mongoose.model<IEmployee>('Employee', employeeSchema);