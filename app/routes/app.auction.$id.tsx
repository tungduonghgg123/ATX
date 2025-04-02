import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Auction, IAuction } from "~/models/auction.server";
import AuctionTable from "~/components/AuctionTable";
import AuctionComponent from "~/components/AuctionComponent";

export const loader = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  if (!id) {
    throw new Response("Auction ID is required", { status: 400 });
  }

  const auction = await Auction.findById<IAuction>(id); // Use Auction.findById to fetch the auction
  if (!auction) {
    throw new Response("Auction not found", { status: 404 });
  }

  return json(auction); // Wrap the auction in a json response
};

export default function AuctionPage() {
  const auction = useLoaderData<typeof loader>();
  return (
    <>
      <AuctionTable auctions={[auction]} />
      <AuctionComponent auction={auction} />
    </>
  );
}
