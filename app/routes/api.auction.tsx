import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";
import { Auction } from "../models/auction.server";

export const action: ActionFunction = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      name,
      startTime,
      endTime,
      startingPrice,
      gapPrice,
      currentPrice,
      winner,
    } = body;

    const newAuction = new Auction({
      name,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      startingPrice,
      gapPrice,
      currentPrice,
      winner,
    });

    await newAuction.save();
    return json(newAuction, { status: 201 });
  } catch (error) {
    console.log(error);
    return json({ error: "Failed to create auction" }, { status: 500 });
  }
};
