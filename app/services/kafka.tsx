export const sendKafkaMessage = async (topic: string, message: any) => {
  return kafkaProducer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};
