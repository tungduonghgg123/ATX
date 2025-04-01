import { MetaFunction } from "@remix-run/react";
import { useState } from "react";
export const meta: MetaFunction = () => {
  return [{ title: "ATX Auction" }];
};
export default function AuctionPage() {
  const [currentBid, setCurrentBid] = useState(100);

  const placeBid = () => {
    setCurrentBid((prevBid) => prevBid + 10);
  };

  return (
    <div>
      <h1>Auction Page</h1>
      <p>Description: This is a simple auction for a valuable item.</p>
      <p>Current Bid: ${currentBid}</p>
      <button onClick={placeBid}>Place Bid</button>
    </div>
  );
}
