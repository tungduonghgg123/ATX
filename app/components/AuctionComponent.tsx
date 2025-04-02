import React, { useState } from "react";
import { IAuction } from "~/models/auction.server";
import { addThousandSeparator } from "~/utils/numberFormatter";

const AuctionComponent = ({ auction }: { auction: IAuction }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error message
  const currentTime = new Date();

  const isAuctionActive =
    currentTime >= new Date(auction.startTime) &&
    currentTime <= new Date(auction.endTime);

  const hasAuctionStarted = currentTime >= new Date(auction.startTime);
  const hasAuctionEnded = currentTime > new Date(auction.endTime);

  const handleBidSubmit = () => {
    const bid = parseFloat(bidAmount);
    if (isNaN(bid)) {
      setErrorMessage("Please enter a valid number.");
      return;
    }

    if (bid <= auction.startingPrice) {
      setErrorMessage("Bid must be higher than the starting price.");
      return;
    }

    if (bid <= auction.currentPrice + auction.gapPrice) {
      setErrorMessage(
        `Bid must be higher than the current price plus the gap price (${addThousandSeparator(
          auction.currentPrice + auction.gapPrice
        )}).`
      );
      return;
    }

    setErrorMessage(""); // Clear error message if validation passes
    console.log(`Bid submitted: ${bidAmount}`);
    // Handle bid submission logic here
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
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default AuctionComponent;
