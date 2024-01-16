
import mongoose, { Schema, Document } from 'mongoose';

export interface IOnboardingApplication extends Document {
  userID: mongoose.Types.ObjectId;
  status: string;
  applicationData: mongoose.Types.ObjectId;
  feedback?: string;
  submittedDate: Date;
  reviewedDate?: Date;
}

const onboardingApplicationSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true },
  applicationData: { type: Schema.Types.ObjectId, ref: 'PersonalInformation', required: true, default: null },
  feedback: { type: String },
  submittedDate: { type: Date, required: true },
  reviewedDate: { type: Date },
}, { timestamps: true });

export default mongoose.model<IOnboardingApplication>('OnboardingApplication', onboardingApplicationSchema);
