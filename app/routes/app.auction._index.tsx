import {
  json,
  MetaFunction,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { Auction, IAuction } from "~/models/auction.server"; // Import the type
import { addThousandSeparator } from "~/utils/numberFormatter";

export const meta: MetaFunction = () => {
  return [{ title: "ATX Auction" }];
};

export const loader = async () => {
  const auctions = await Auction.find().lean<IAuction[]>();
  return json(auctions, { status: 200 });
};

export default function AuctionPage() {
  const auctions = useLoaderData<typeof loader>();
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div>
      <h2>All Auctions</h2>
      <table className="auction-table">
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                color: "black",
              }}
            >
              Name
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                color: "black",
              }}
            >
              Start Time
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                color: "black",
              }}
            >
              End Time
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                color: "black",
              }}
            >
              Starting Price
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                color: "black",
              }}
            >
              Gap Price
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                color: "black",
              }}
            >
              Current Price
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                color: "black",
              }}
            >
              Winner
            </th>
          </tr>
        </thead>
        <tbody>
          {auctions.map((auction) => (
            <tr
              key={auction._id}
              className="auction-row"
              onClick={() => navigate(`/app/auction/${auction._id}`)} // Navigate on click
            >
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: "black",
                }}
              >
                {auction.name}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: "black",
                }}
              >
                {new Date(auction.startTime).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: "black",
                }}
              >
                {new Date(auction.endTime).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: "black",
                }}
              >
                {addThousandSeparator(auction.startingPrice)}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: "black",
                }}
              >
                {addThousandSeparator(auction.gapPrice)}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: "black",
                }}
              >
                {addThousandSeparator(auction.currentPrice)}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: "black",
                }}
              >
                {auction.winner || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
