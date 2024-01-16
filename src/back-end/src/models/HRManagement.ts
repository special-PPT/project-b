
import mongoose, { Schema, Document } from 'mongoose';

export interface IHRManagement extends Document {
  userID: mongoose.Types.ObjectId;
  registrationTokens: [{
    name: string,
    token: string;
    email: string;
    expiry: Date;
    status: string;
  }];
  employeeProfiles: [mongoose.Types.ObjectId];
}

const hrManagementSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  registrationTokens: [{
    name: { type: String, required: true },
    token: { type: String, required: true },
    email: { type: String, required: true },
    expiry: { type: Date, required: true },
    status: { type: String, required: true },
  }],
  employeeProfiles: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model<IHRManagement>('HRManagement', hrManagementSchema);
