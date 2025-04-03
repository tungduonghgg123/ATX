import { addThousandSeparator } from "~/utils/numberFormatter";
import { IBid } from "~/models/bid.server";
import { formatDistanceToNow } from "date-fns";
import { RelativeTime } from "./RelativeTime";
interface BidTableProps {
  bids: IBid[];
}

export default function BidTable({ bids }: BidTableProps) {
  if (!bids || bids.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h3>No bids available</h3>
      </div>
    );
  }
  return (
    <table className="bid-table">
      <thead>
        <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
          <th
            style={{ border: "1px solid #ddd", padding: "8px", color: "black" }}
          >
            Amount
          </th>
          <th
            style={{ border: "1px solid #ddd", padding: "8px", color: "black" }}
          >
            Time
          </th>
          <th
            style={{ border: "1px solid #ddd", padding: "8px", color: "black" }}
          >
            Bidder
          </th>
        </tr>
      </thead>
      <tbody>
        {bids.map((bid) => (
          <tr key={bid._id} className="bid-row">
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                color: "black",
              }}
            >
              {addThousandSeparator(bid.amount)}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                color: "black",
              }}
            >
              <RelativeTime date={bid.created_at} />
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                color: "black",
              }}
            >
              {bid.email}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
