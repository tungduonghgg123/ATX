import { useEventSource } from "remix-utils/sse/react";
import { useEffect, useState } from "react";
import { IAuction } from "~/models/auction.server";
import { AUCTION_EVENT } from "~/routes/api.auction.$id.live";

export function useAuctionState(initialAuction: IAuction) {
  const [liveAuction, setLiveAuction] = useState<IAuction | null>(null);
  const auctionId = initialAuction._id; // Use the auction ID from the initial auction
  const data = useEventSource(`/api/auction/${auctionId}/live`, {
    event: AUCTION_EVENT,
  });

  useEffect(() => {
    if (data) {
      console.log("Received data from SSE:", data);
      setLiveAuction(JSON.parse(data));
    }
  }, [data]);

  const finalAuction = liveAuction || initialAuction; // Use liveAuction if available, otherwise fallback to the initial auction

  return { finalAuction };
}
