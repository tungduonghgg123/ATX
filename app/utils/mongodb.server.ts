import { Auction, IAuction } from "~/models/auction.server";
import { Bid, IBid } from "~/models/bid.server";

export async function getAuctionById(auctionId: string) {
  return Auction.findById<IAuction>(auctionId);
}

export async function updateAuctionPrice(
  auctionId: string,
  newPrice: number,
  winner: string
) {
  return Auction.updateOne(
    { _id: auctionId },
    { $set: { currentPrice: newPrice, winner } }
  );
}
export async function createBid(
  email: string,
  auctionId: string,
  amount: number,
  currentPrice: number,
  status: "success" | "failed"
) {
  const bid = new Bid({
    email,
    auctionId,
    amount,
    currentPrice,
    status,
  });
  return bid.save();
}
export async function getBidsByAuctionId(auctionId: string) {
  return Bid.find<IBid[]>({ auctionId });
}
