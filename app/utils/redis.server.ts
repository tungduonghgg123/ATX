import Redis from "ioredis";

let redis: Redis | null = null;
let pubSubRedis: Redis | null = null;

function getRedisInstance() {
  if (!redis) {
    try {
      redis = new Redis({
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: Number(process.env.REDIS_PORT) || 6380,
        username: process.env.REDIS_USERNAME,
        db: 0,
        connectTimeout: 1000, // Set timeout to max 1s
        maxRetriesPerRequest: null, // Disable request retries to avoid app crashes
        enableOfflineQueue: false, // Disable offline queue to avoid memory leaks
      });

      redis.on("error", (err: any) => {
        console.error("Redis error connection:");
        // redis?.quit(); // Clean up the connection in case of persistent errors
        // redis = null;
        if (err.name === "MaxRetriesPerRequestError") {
          console.error("Disabling Redis due to max retries exceeded");
          redis?.disconnect();
          redis = null;
        }
      });

      redis.on("end", () => {
        console.log("Redis connection closed");
      });
    } catch (error) {
      console.log("🚀 Redis initialization error:", error);
      redis = null;
    }
  }

  return redis;
}

function getPubSubRedisInstance() {
  if (!pubSubRedis) {
    try {
      pubSubRedis = new Redis({
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: Number(process.env.REDIS_PORT) || 6380,
        username: process.env.REDIS_USERNAME,
        db: 0,
        connectTimeout: 1000,
        maxRetriesPerRequest: null,
        enableOfflineQueue: false,
      });

      pubSubRedis.on("error", (err: any) => {
        console.error("Redis Pub/Sub error connection:");
        if (err.name === "MaxRetriesPerRequestError") {
          console.error("Disabling Redis Pub/Sub due to max retries exceeded");
          pubSubRedis?.disconnect();
          pubSubRedis = null;
        }
      });

      pubSubRedis.on("end", () => {
        console.log("Redis Pub/Sub connection closed");
      });
    } catch (error) {
      console.log("🚀 Redis Pub/Sub initialization error:", error);
      pubSubRedis = null;
    }
  }

  return pubSubRedis;
}
const PubSubRedisInstance = getPubSubRedisInstance() || new Redis();
export { getRedisInstance, PubSubRedisInstance };
export default getRedisInstance() || new Redis();
