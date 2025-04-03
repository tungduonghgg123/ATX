import { json } from "@remix-run/node";
import jwt from "jsonwebtoken";
import redis from "../utils/redis.server"; // Adjust the import path as needed
import {
  createBid,
  getAuctionById,
  updateAuctionPrice,
} from "../utils/mongodb.server"; // Add MongoDB utility functions
import { IAuction } from "~/models/auction.server";
import { IBid } from "~/models/bid.server";

function verifyToken(authHeader: string | null): string {
  if (!authHeader) {
    throw json({ error: "Authorization header is missing" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw json({ error: "Token is missing" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as { email: string };
    return decoded.email;
  } catch (err) {
    throw json({ error: "Invalid token" }, { status: 403 });
  }
}

export const action = async ({
  request,
  params,
}: {
  request: Request;
  params: { auctionId: string };
}) => {
  const authHeader = request.headers.get("Authorization");
  const email = verifyToken(authHeader);

  const auctionId = params.auctionId;
  if (!auctionId) {
    throw json({ error: "Auction ID is missing" }, { status: 400 });
  }

  const body = await request.json();
  const bid = body.bid;
  if (typeof bid !== "number") {
    throw json({ error: "Invalid bid value" }, { status: 400 });
  }

  // Fetch auction data from Redis
  const cachedAuction = await redis.get(`auction:${auctionId}`);
  let auction: IAuction | null = null;
  if (!cachedAuction) {
    // Fallback to MongoDB if not found in Redis
    auction = await getAuctionById(auctionId);
    if (!auction) {
      throw json({ error: "Auction not found" }, { status: 404 });
    }
    // Cache the auction data in Redis
    await redis.set(`auction:${auctionId}`, JSON.stringify(auction));
  } else {
    auction = JSON.parse(cachedAuction);
  }
  if (!auction) {
    return json({ error: "Auction not found" }, { status: 404 });
  }
  // Validate the bid
  if (bid < auction.startingPrice) {
    return json(
      { error: "Bid must not be less than the starting price." },
      { status: 400 }
    );
  }

  if (bid < auction.currentPrice + auction.gapPrice) {
    return json(
      {
        error: `Bid must not be less than the current price plus the gap price (${
          auction.currentPrice + auction.gapPrice
        }).`,
      },
      { status: 400 }
    );
  }

  // Update the new price in Redis and MongoDB
  auction.currentPrice = bid;
  auction.winner = email; // Update the winner
  auction.modified_at = new Date(); // Update the modified date

  // Cache the updated auction data in Redis
  await redis.set(`auction:${auctionId}`, JSON.stringify(auction));

  // Store the bid in a Redis list
  const bidDetails: Partial<IBid> = {
    email,
    amount: bid,
    created_at: new Date(),
  };
  await redis.rpush(`auction:${auctionId}:bids`, JSON.stringify(bidDetails));

  // Publish the update to a Redis channel
  await redis.publish(`auction:${auctionId}:updates`, JSON.stringify(auction));

  // Publish the new bid details to a Redis channel
  await redis.publish(
    `auction:${auctionId}:new-bid`,
    JSON.stringify(bidDetails)
  );

  // Update the auction price in MongoDB
  await updateAuctionPrice(auctionId, bid, email);
  await createBid(email, auctionId, bid, auction.currentPrice, "success");

  return json(
    { message: "Bid accepted", currentPrice: bid, email },
    { status: 200 }
  );
};
