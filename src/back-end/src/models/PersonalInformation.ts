import mongoose, { Schema, Document } from "mongoose";

interface IDocumentSubSchema {
  type: string;
  url: string;
  documentKey: string;
  name: string;
}

interface IEmergencyContact {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface IPersonalInformation extends Document {
  userID: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  profilePicture?: string;
  email: string;
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
  emergencyContacts: IEmergencyContact[];
  workAuth: string;
  documents: IDocumentSubSchema[];
}

const DocumentSubSchema = new Schema<IDocumentSubSchema>({
  type: { type: String, required: true },
  url: { type: String, required: true },
  documentKey: { type: String, required: true },
  name: { type: String, required: true }
},{ timestamps: true });

const EmergencyContactSchema = new Schema<IEmergencyContact>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: false },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  relationship: { type: String, required: true },
});

const personalInformationSchema: Schema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    preferredName: { type: String },
    profilePicture: { type: String },
    email: { type: String },
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
    emergencyContacts: [EmergencyContactSchema],
    workAuth: { type: String, required: true },
    documents: [DocumentSubSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IPersonalInformation>(
  "PersonalInformation",
  personalInformationSchema
);
