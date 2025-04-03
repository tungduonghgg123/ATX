# Welcome to Remix!

- 📖 [Auction flow](https://swimlanes.io/u/f8duO9PG02) (Em chưa kịp implement Kafka)

## Development

1. Run docker to have mongodb and redis ready

```shellscript
docker-compose up -d
```

2. Create the .env file from the .env.example file

3. Run the dev server:

```shellscript
npm run dev
```

4. To create the auction, make the POST API to /api/auction. You can use the attached postman collection in this repo for your convenience.

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
