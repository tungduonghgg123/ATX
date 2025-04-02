import React, { useState } from "react";
import { IAuction } from "~/models/auction.server";

const AuctionComponent = ({ auction }: { auction: IAuction }) => {
  const [bidAmount, setBidAmount] = useState("");
  const currentTime = new Date();

  const isAuctionActive =
    currentTime >= new Date(auction.startTime) &&
    currentTime <= new Date(auction.endTime);

  const hasAuctionStarted = currentTime >= new Date(auction.startTime);
  const hasAuctionEnded = currentTime > new Date(auction.endTime);

  const handleBidSubmit = () => {
    // Handle bid submission logic here
    console.log(`Bid submitted: ${bidAmount}`);
  };

  return (
    <div>
      {!hasAuctionStarted && <p>The auction is not started yet.</p>}
      {hasAuctionEnded && <p>The auction has ended.</p>}
      {isAuctionActive && (
        <div>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Enter your bid"
          />
          <button onClick={handleBidSubmit} disabled={!isAuctionActive}>
            Submit Bid
          </button>
        </div>
      )}
    </div>
  );
};

export default AuctionComponent;
