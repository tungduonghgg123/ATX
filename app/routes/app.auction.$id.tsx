import { useLoaderData, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Auction, IAuction } from "~/models/auction.server";
import AuctionTable from "~/components/AuctionTable";
import AuctionComponent from "~/components/AuctionComponent";
import { useAuctionState } from "~/hooks/useAuctionState"; // Import the new hook
import { getBidsByAuctionId } from "~/utils/mongodb.server";
import BidTable from "~/components/BidTable";
import { useBidsState } from "~/hooks/useBidsState";

export const loader = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  if (!id) {
    throw new Response("Auction ID is required", { status: 400 });
  }

  const auction = await Auction.findById<IAuction>(id); // Use Auction.findById to fetch the auction
  const bids = await getBidsByAuctionId(id); // Fetch bids for the auction
  if (!auction) {
    throw new Response("Auction not found", { status: 404 });
  }

  return json({ auction, bids }); // Wrap the auction in a json response
};

export default function AuctionPage() {
  const { auction, bids } = useLoaderData<typeof loader>();
  const { finalAuction } = useAuctionState(auction); // Use the new hook
  const { bids: finalBids } = useBidsState(bids, auction._id); // Use the new hook for bids
  return (
    <>
      <AuctionTable auctions={[finalAuction]} />
      <AuctionComponent auction={finalAuction} />
      <BidTable bids={finalBids} />
    </>
  );
}
