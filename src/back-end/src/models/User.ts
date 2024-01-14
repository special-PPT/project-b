
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  registrationToken?: string;
  tokenExpiry?: Date;
  isActive: boolean;
  personalInformation?: mongoose.Types.ObjectId;
  onboardingApplication?: mongoose.Types.ObjectId;
  visaStatus?: mongoose.Types.ObjectId;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  registrationToken: { type: String },
  tokenExpiry: { type: Date },
  isActive: { type: Boolean, default: false },
  personalInformation: { type: Schema.Types.ObjectId, ref: 'PersonalInformation', default: null },
  onBoardingApplication: { type: Schema.Types.ObjectId, ref: 'OnboardingApplication' },
  visaStatus: { type: Schema.Types.ObjectId, ref: 'VisaStatus', default: null },
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
