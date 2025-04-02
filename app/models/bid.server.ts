import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  current_price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  status: { type: String, enum: ["success", "failed"], required: true },
});

export const Bid = mongoose.models.Bid || mongoose.model("Bid", bidSchema);

export interface IBid {
  email: string;
  amount: number;
  current_price: number;
  created_at: Date;
  status: "success" | "failed";
  _id: mongoose.Types.ObjectId;
}
