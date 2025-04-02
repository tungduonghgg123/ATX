import { Auction, IAuction } from "~/models/auction.server";

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
