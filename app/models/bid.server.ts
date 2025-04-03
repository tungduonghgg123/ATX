import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  auctionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction",
    required: true,
  },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  status: { type: String, enum: ["success", "failed"], required: true },
});

export const Bid = mongoose.models.Bid || mongoose.model("Bid", bidSchema);

export interface IBid {
  email: string;
  amount: number;
  currentPrice: number;
  created_at: Date;
  status: "success" | "failed";
  _id: mongoose.Types.ObjectId;
  auctionId: mongoose.Types.ObjectId;
}
