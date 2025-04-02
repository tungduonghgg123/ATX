import { json } from "@remix-run/node";
import { LoaderFunction } from "@remix-run/node";
import { Auction } from "../models/auction.server";

export const loader: LoaderFunction = async () => {
  try {
    const auctions = await Auction.find();
    return json(auctions, { status: 200 });
  } catch (error) {
    return json({ error: "Failed to fetch auctions" }, { status: 500 });
  }
};
