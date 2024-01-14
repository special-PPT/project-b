import mongoose, { Schema, Document } from 'mongoose';

export interface IPersonalInformation extends Document {
  userID: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  profilePicture?: string;
  address: {
    building: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phoneNumbers: {
    cell: string;
    work?: string;
  };
  dateOfBirth: Date;
  gender: string;
  emergencyContacts: [{
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    email: string;
    relationship: string;
  }];
  workAuth: string;
  documents: [{
    type: string;
    url: string;
  }];
}

const personalInformationSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  preferredName: { type: String },
  profilePicture: { type: String },
  address: {
    building: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  phoneNumbers: {
    cell: { type: String, required: true },
    work: { type: String },
  },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  emergencyContacts: [{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: false },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    relationship: { type: String, required: true },
  }],
  workAuth: { type: String, required: true },
  documents: [{
    type: { type: String, required: true },
    url: { type: String, required: true },
  }],
}, { timestamps: true });

export default mongoose.model<IPersonalInformation>('PersonalInformation', personalInformationSchema);
