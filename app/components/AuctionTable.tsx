import { useNavigate } from "@remix-run/react";
import { addThousandSeparator } from "~/utils/numberFormatter";
import { IAuction } from "~/models/auction.server";

interface AuctionTableProps {
  auctions: IAuction[];
}

export default function AuctionTable({ auctions }: AuctionTableProps) {
  const navigate = useNavigate();

  return (
    <table className="auction-table">
      <thead>
        <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
          <th
            style={{ border: "1px solid #ddd", padding: "8px", color: "black" }}
          >
            Name
          </th>
          <th
            style={{ border: "1px solid #ddd", padding: "8px", color: "black" }}
          >
            Start Time
          </th>
          <th
            style={{ border: "1px solid #ddd", padding: "8px", color: "black" }}
          >
            End Time
          </th>
          <th
            style={{ border: "1px solid #ddd", padding: "8px", color: "black" }}
          >
            Starting Price
          </th>
          <th
            style={{ border: "1px solid #ddd", padding: "8px", color: "black" }}
          >
            Gap Price
          </th>
          <th
            style={{ border: "1px solid #ddd", padding: "8px", color: "black" }}
          >
            Current Price
          </th>
          <th
            style={{ border: "1px solid #ddd", padding: "8px", color: "black" }}
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
            onClick={() => navigate(`/app/auction/${auction._id}`)}
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
  );
}
