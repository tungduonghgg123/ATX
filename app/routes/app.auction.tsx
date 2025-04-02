import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { Auction, IAuction } from "~/models/auction.server"; // Import the type

export const meta: MetaFunction = () => {
  return [{ title: "ATX Auction" }];
};

export const loader = async () => {
  const auctions = await Auction.find().lean<IAuction[]>();
  return json(auctions, { status: 200 });
};

export default function AuctionPage() {
  const auctions = useLoaderData<typeof loader>();

  return (
    <div>
      <h2>All Auctions</h2>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Start Time
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              End Time
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Starting Price
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Gap Price
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Current Price
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Winner</th>
          </tr>
        </thead>
        <tbody>
          {auctions.map((auction, index) => (
            <tr
              key={auction._id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
              }}
            >
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {auction.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {new Date(auction.startTime).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {new Date(auction.endTime).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                ${auction.startingPrice}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                ${auction.gapPrice}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                ${auction.currentPrice}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {auction.winner || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
