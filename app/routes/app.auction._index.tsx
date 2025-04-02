import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { Auction, IAuction } from "~/models/auction.server";
import AuctionTable from "~/components/AuctionTable";

export const meta: MetaFunction = () => {
  return [{ title: "ATX Auction" }];
};

export const loader = async () => {
  const auctions = await Auction.find().lean<IAuction[]>();
  return json(auctions, { status: 200 });
};

export default function AuctionPage() {
  const auctions = useLoaderData<typeof loader>();

  return (
    <div>
      <h2>All Auctions</h2>
      <AuctionTable auctions={auctions} />
    </div>
  );
}
