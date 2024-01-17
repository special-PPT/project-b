import mongoose, { Schema, Document } from "mongoose";

interface IDocumentSub {
  type: string;
  url: string;
  status: string;
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
  url: { type: String, required: true },
  status: { type: String, required: true },
  feedback: { type: String, default: null },
});

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
