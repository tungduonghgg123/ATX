import { addThousandSeparator } from "~/utils/numberFormatter";
import { IBid } from "~/models/bid.server";

interface BidTableProps {
  bids: IBid[];
}

export default function BidTable({ bids }: BidTableProps) {
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
              {new Date(bid.created_at).toLocaleString("en-GB", {
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
              {bid.email}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
