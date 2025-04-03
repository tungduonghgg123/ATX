import { useLoaderData, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Auction, IAuction } from "~/models/auction.server";
import AuctionTable from "~/components/AuctionTable";
import AuctionComponent from "~/components/AuctionComponent";
import { useEventSource } from "remix-utils/sse/react";
import { useEffect, useState } from "react";
import { getBidsByAuctionId } from "~/utils/mongodb.server";
import BidTable from "~/components/BidTable";

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
  const [liveAuction, setLiveAuction] = useState<IAuction | null>(null);
  const params = useParams(); // Get params in the component
  let data = useEventSource(`/api/auction/${params.id}/live`, {
    event: "auction",
  });
  const finalAuction = liveAuction || auction; // Use liveAuction if available, otherwise fallback to the initial auction
  useEffect(() => {
    if (data) {
      console.log("Received data from SSE:", data);
      setLiveAuction(JSON.parse(data));
    }
  }, [data]);
  return (
    <>
      <AuctionTable auctions={[finalAuction]} />
      <AuctionComponent auction={finalAuction} />
      <BidTable bids={bids} />
    </>
  );
}
