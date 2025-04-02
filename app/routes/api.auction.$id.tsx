import { json } from "@remix-run/node";
import { LoaderFunction, ActionFunction } from "@remix-run/node";
import { Auction } from "../models/auction.server";

// Loader to get a single auction by ID
export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  try {
    const auction = await Auction.findById(id);
    if (!auction) {
      return json({ error: "Auction not found" }, { status: 404 });
    }
    return json(auction, { status: 200 });
  } catch (error) {
    return json({ error: "Failed to fetch auction" }, { status: 500 });
  }
};
