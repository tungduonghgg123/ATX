import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  startingPrice: { type: Number, required: true },
  gapPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  winner: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
});

auctionSchema.pre("save", function (next) {
  this.modified_at = new Date();
  next();
});

export const Auction =
  mongoose.models.Auction || mongoose.model("Auction", auctionSchema);

export interface IAuction {
  name: string;
  startTime: Date;
  endTime: Date;
  startingPrice: number;
  gapPrice: number;
  currentPrice: number;
  winner: string | null;
  created_at: Date;
  modified_at: Date;
  _id: mongoose.Types.ObjectId;
}
