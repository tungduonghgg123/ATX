import type { Producer } from "kafkajs";
import { Kafka } from "kafkajs";
declare global {
  var kafkaProducer: Producer;
}

if (!global.kafkaProducer) {
  if (!process.env.KAFKA_BROKERS)
    throw new Error("KAFKA_BROKERS is not defined");
  const kafka = new Kafka({
    brokers: process.env.KAFKA_BROKERS
      ? process.env.KAFKA_BROKERS.split(",")
      : ["localhost:9092"],
  });
  global.kafkaProducer = kafka.producer();
  global.kafkaProducer.connect();
}
const kafkaProducer: Producer = global.kafkaProducer;

export default kafkaProducer;
