import { useNavigate } from "@remix-run/react";
import { addThousandSeparator } from "~/utils/numberFormatter";
import { IAuction } from "~/models/auction.server";
import { RelativeTime } from "./RelativeTime";
interface AuctionTableProps {
  auctions: IAuction[];
  disableOnClick?: boolean; // New prop to disable onClick
}

export default function AuctionTable({
  auctions,
  disableOnClick,
}: AuctionTableProps) {
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
          <th
            style={{ border: "1px solid #ddd", padding: "8px", color: "black" }}
          >
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {auctions.map((auction) => (
          <tr
            key={auction._id}
            className="auction-row"
            style={{
              cursor: disableOnClick ? "default" : "pointer",
            }}
            onClick={
              !disableOnClick
                ? () => navigate(`/app/auction/${auction._id}`)
                : undefined
            } // Conditional onClick
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
              <RelativeTime date={auction.startTime} />
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                color: "black",
              }}
            >
              <RelativeTime date={auction.endTime} />
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
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                color:
                  new Date() < new Date(auction.startTime)
                    ? "blue"
                    : new Date() <= new Date(auction.endTime)
                    ? "green"
                    : "red",
              }}
            >
              {new Date() < new Date(auction.startTime)
                ? "Not Started"
                : new Date() <= new Date(auction.endTime)
                ? "In Progress"
                : "Ended"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
