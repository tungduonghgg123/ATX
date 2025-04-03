import type { LoaderArgs } from "@remix-run/node";
import redis, { PubSubRedisInstance } from "../utils/redis.server"; // Adjust the import path as needed
import { eventStream } from "remix-utils/sse/server";

export const AUCTION_EVENT = "auction";
export const NEW_BID_EVENT = "new-bid";

export async function loader({ request, params }: LoaderArgs) {
  const auctionId = params.id; // Extract auction ID from route parameters
  if (!auctionId) {
    throw new Response("Auction ID is required", { status: 400 });
  }
  const redisKey = `auction:${auctionId}:updates`;
  PubSubRedisInstance.subscribe(redisKey, (message) => {
    console.log(message);
  });
  return eventStream(request.signal, function setup(send) {
    const redisKey = `auction:${auctionId}:updates`;
    const newBidKey = `auction:${auctionId}:new-bid`;

    const listener = (message: string) => {
      try {
        send({ event: AUCTION_EVENT, data: message });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };

    const newBidListener = (message: string) => {
      try {
        send({ event: NEW_BID_EVENT, data: message });
      } catch (error) {
        console.error("Error sending new bid message:", error);
      }
    };

    PubSubRedisInstance.subscribe(redisKey);
    PubSubRedisInstance.subscribe(newBidKey);

    PubSubRedisInstance.on("message", (channel, message) => {
      if (channel === redisKey) {
        listener(message);
      } else if (channel === newBidKey) {
        newBidListener(message);
      }
    });

    return function clear() {
      PubSubRedisInstance.unsubscribe(redisKey);
      PubSubRedisInstance.unsubscribe(newBidKey);
    };
  });
}
