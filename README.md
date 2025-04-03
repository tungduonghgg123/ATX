# ATX Interview problem implementation

- 📖 [Auction flow design](https://swimlanes.io/u/f8duO9PG02) (Kafka integration is not implemented yet)

## Development

1. Create the .env file from the .env.example file (if the specified ports are occupied already in your computer, please specify the replacement and update in docker-compose accordingly as well)

2. Run docker to have mongodb and redis ready

```shellscript
docker-compose up -d
```

3. Run the dev server:

```shellscript
npm run dev
```

4. To create an auction, make the POST API to /api/auction. You can use the attached postman collection in this repo for your convenience.

   Sample payload:

```shellscript
{
      "name": "Audi car 2025 edition",
      "startTime": "2025-04-04T10:00:00",
      "endTime": "2025-04-04T10:17:00",
      "startingPrice": 5,
      "gapPrice": 3,
      "currentPrice": 5
}
```

5. Access to the /app/auction route in the website to browse the auctions and click on one to view detail and do your bidding
