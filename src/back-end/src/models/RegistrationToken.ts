import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistrationToken extends Document {
  name: string;
  token?: string;
  email: string;
  expiry?: Date;
  status: string;
  userId: mongoose.Types.ObjectId;
}

const registrationTokenSchema: Schema = new Schema({
  name: { type: String, required: true },
  token: { type: String, default: null },
  email: { type: String, required: true },
  expiry: { type: Date },
  status: { type: String, required: true, default: 'not send' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model<IRegistrationToken>('RegistrationToken', registrationTokenSchema);
