import mongoose, { Schema, Document } from "mongoose";

export interface IHRManagement extends Document {
  userID: mongoose.Types.ObjectId;
  registrationTokens: mongoose.Types.ObjectId[];
  employeeProfiles: mongoose.Types.ObjectId[];
}

const hrManagementSchema: Schema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    registrationTokens: [
      {
        type: Schema.Types.ObjectId,
        ref: "RegistrationToken",
      },
    ],
    employeeProfiles: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model<IHRManagement>(
  "HRManagement",
  hrManagementSchema
);
