
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  personalInformation?: mongoose.Types.ObjectId;
  onboardingApplication?: mongoose.Types.ObjectId;
  visaStatus?: mongoose.Types.ObjectId;
  registrationToken?: mongoose.Types.ObjectId;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  personalInformation: { type: Schema.Types.ObjectId, ref: 'PersonalInformation', default: null },
  onboardingApplication: { type: Schema.Types.ObjectId, ref: 'OnboardingApplication', default: null },
  visaStatus: { type: Schema.Types.ObjectId, ref: 'VisaStatus', default: null },
  registrationToken: { type: Schema.Types.ObjectId, ref: 'RegistrationToken', default: null },
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
