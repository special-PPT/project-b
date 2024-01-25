import mongoose, { Schema, Document } from "mongoose";

interface IDocumentSub {
  type: string; // MIME type (e.g., 'application/pdf', 'image/jpeg')
  docType: string; // Document type (e.g., 'OPT Receipt', 'EAD')
  url: string;
  status: string;
  name: string;
  feedback?: string;
}

export interface IVisaStatus extends Document {
  userID: mongoose.Types.ObjectId;
  visaType: string;
  status: string;
  startDate: Date;
  endDate: Date;
  documents: IDocumentSub[];
}

const DocumentSubSchema = new Schema({
  type: { type: String, required: true },
  docType: { type: String, required: true },
  url: { type: String, required: true },
  status: { type: String, required: true },
  name: { type: String, require: true },
  feedback: { type: String, default: null },
},{ timestamps: true });

const visaStatusSchema: Schema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    visaType: { type: String, required: true },
    status: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    documents: [DocumentSubSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IVisaStatus>("VisaStatus", visaStatusSchema);
