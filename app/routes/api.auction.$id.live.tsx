import type { LoaderArgs } from "@remix-run/node";
import redis, { PubSubRedisInstance } from "../utils/redis.server"; // Adjust the import path as needed
import { eventStream } from "remix-utils/sse/server";

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
    const listener = (message: string) => {
      try {
        send({ event: "auction", data: message });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };
    PubSubRedisInstance.subscribe(redisKey);

    PubSubRedisInstance.on("message", (channel, message) => {
      listener(message);
    });
    // Handle client disconnection
    // request.signal.addEventListener("abort", () => {
    //   PubSubRedisInstance.unsubscribe(redisKey, listener);
    // });

    return function clear() {
      PubSubRedisInstance.unsubscribe(redisKey);
    };
  });
}
