import { NEW_BID_EVENT } from "~/routes/api.auction.$id.live";
import { useEventSource } from "remix-utils/sse/react";
import { useEffect, useState } from "react";
import { IBid } from "~/models/bid.server"; // Assuming IBid is defined in this path

export function useBidsState(initialBids: IBid[], auctionId: string) {
  const [bids, setBids] = useState<IBid[]>(initialBids);
  const data = useEventSource(`/api/auction/${auctionId}/live`, {
    event: NEW_BID_EVENT,
  });

  useEffect(() => {
    if (data) {
      console.log("Received bid data from SSE:", data);
      const newBid = JSON.parse(data);
      setBids((prevBids) => [newBid, ...prevBids]);
    }
  }, [data]);

  return { bids };
}
