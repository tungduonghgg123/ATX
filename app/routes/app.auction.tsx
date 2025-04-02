import {
  json,
  MetaFunction,
  Outlet,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { Auction, IAuction } from "~/models/auction.server"; // Import the type
import { addThousandSeparator } from "~/utils/numberFormatter";

export const meta: MetaFunction = () => {
  return [{ title: "ATX Auction" }];
};

export default function AuctionPage() {
  return <Outlet />;
}
