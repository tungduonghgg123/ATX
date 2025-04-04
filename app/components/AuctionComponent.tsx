import React, { useState } from "react";
import { IAuction } from "~/models/auction.server";
import { JWT_TOKEN_KEY } from "~/routes/app.login";
import {
  addThousandSeparator,
  checkAuctionActive,
} from "~/utils/numberFormatter";

const AuctionComponent = ({ auction }: { auction: IAuction }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentTime = new Date();
  const isAuctionActive = checkAuctionActive(
    auction.startTime,
    auction.endTime
  );
  const hasAuctionStarted = currentTime >= new Date(auction.startTime);
  const hasAuctionEnded = currentTime > new Date(auction.endTime);

  const handleBidSubmit = async () => {
    const bid = parseFloat(bidAmount);

    if (isNaN(bid)) {
      setErrorMessage("Please enter a valid number.");
      return;
    }

    if (bid < auction.startingPrice) {
      setErrorMessage("Bid must not be less than the starting price.");
      return;
    }

    if (bid < auction.currentPrice + auction.gapPrice) {
      setErrorMessage(
        `Bid must not be less than the current price plus the gap price (${addThousandSeparator(
          auction.currentPrice + auction.gapPrice
        )}).`
      );
      return;
    }

    setErrorMessage(""); // Clear error message if validation passes

    const token = localStorage.getItem(JWT_TOKEN_KEY);
    if (!token) {
      setErrorMessage("Authentication token is missing. Please log in.");
      return;
    }

    try {
      const response = await fetch(`/api/bid/${auction._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bid }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to submit bid.");
        return;
      }

      alert("Bid submitted successfully.");
      // Optionally, update the UI or auction state here
    } catch (error) {
      console.error("Error submitting bid:", error);
      setErrorMessage("An error occurred while submitting your bid.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {!hasAuctionStarted && (
        <p style={{ color: "gray", fontStyle: "italic" }}>
          The auction is not started yet.
        </p>
      )}
      {hasAuctionEnded && (
        <p style={{ color: "gray", fontStyle: "italic" }}>
          The auction has ended.
        </p>
      )}
      {isAuctionActive && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            maxWidth: "400px",
            margin: "0",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "16px",
              color: "black",
            }}
          >
            Place Your Bid
          </h2>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Enter your bid"
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={handleBidSubmit}
            disabled={!isAuctionActive}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: isAuctionActive ? "#007bff" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isAuctionActive ? "pointer" : "not-allowed",
            }}
          >
            Submit Bid
          </button>
          {errorMessage && (
            <p
              style={{
                color: "red",
                marginTop: "12px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {errorMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AuctionComponent;
